// Regressietests voor ResearchAgent — had 0% dekking. LLMService gemockt (geen
// echte Gemini-call), echte tmp-bestanden voor I/O (geen fs-mock nodig).
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const { generateMock, groundedMock } = vi.hoisted(() => ({ generateMock: vi.fn(), groundedMock: vi.fn() }));
vi.mock('../services/LLMService', () => ({
  LLMService: class {
    generate = generateMock;
    generateJSON = async (req) => JSON.parse(await generateMock(req));
    generateGroundedJSON = groundedMock;
  },
}));

import { ResearchAgent } from './ResearchAgent';

describe('ResearchAgent.run', () => {
  let dir: string;
  let outputPath: string;

  beforeEach(() => {
    generateMock.mockReset();
    groundedMock.mockReset();
    dir = mkdtempSync(path.join(tmpdir(), 'research-agent-test-'));
    outputPath = path.join(dir, 'research.json');
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('parset en valideert het LLM-antwoord met Zod, en schrijft het naar outputPath', async () => {
    generateMock.mockResolvedValue(
      JSON.stringify({
        topic: 'warmtepomp-rendement',
        facts: [{ claim: 'SCOP 4.5 gemiddeld', source: 'RVO', confidence: 90 }],
      })
    );
    const agent = new ResearchAgent();
    const result = await agent.run('warmtepomp-rendement', outputPath);

    expect(result.topic).toBe('warmtepomp-rendement');
    expect(result.facts).toHaveLength(1);
    const written = JSON.parse(readFileSync(outputPath, 'utf-8'));
    expect(written).toEqual(result);
  });

  it('gooit als het LLM-antwoord geen geldige JSON is', async () => {
    generateMock.mockResolvedValue('dit is geen JSON');
    const agent = new ResearchAgent();
    await expect(agent.run('onderwerp', outputPath)).rejects.toThrow();
  });

  it('gooit een Zod-validatiefout als een verplicht veld ontbreekt (bv. confidence)', async () => {
    generateMock.mockResolvedValue(
      JSON.stringify({ topic: 'x', facts: [{ claim: 'y', source: 'z' }] })
    );
    const agent = new ResearchAgent();
    await expect(agent.run('onderwerp', outputPath)).rejects.toThrow();
  });

  it('geeft de systemPrompt (prompts/research.md) en het onderwerp door aan de LLM', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ topic: 't', facts: [] }));
    const agent = new ResearchAgent();
    await agent.run('mijn specifieke onderwerp', outputPath);
    const call = generateMock.mock.calls[0][0];
    expect(call.systemPrompt.length).toBeGreaterThan(0);
    expect(call.userPrompt).toContain('mijn specifieke onderwerp');
    // responseFormat: 'json_object' wordt nu altijd door LLMService.generateJSON zelf afgedwongen
    // (zie LLMService.test.ts) — ResearchAgent geeft het niet meer los mee.
  });

  it('nieuwsmodus: gebruikt grounding en voegt de bronnen toe', async () => {
    groundedMock.mockResolvedValue({
      text: '',
      json: { topic: 'nieuws', facts: [{ claim: 'c', source: 'RVO', confidence: 90, url: 'https://rvo.nl/a' }] },
      sources: [{ title: 'rvo.nl', url: 'https://rvo.nl/a' }],
      searchQueries: ['q'],
    });
    const result = await new ResearchAgent().run('nieuws', outputPath, { news: true });
    expect(generateMock).not.toHaveBeenCalled();
    expect(result.sources).toEqual([{ title: 'rvo.nl', url: 'https://rvo.nl/a' }]);
    expect(result.facts[0].url).toBe('https://rvo.nl/a');
  });

  it('nieuwsmodus: vult topic aan uit de eerste regel van de opdracht als de omzetting het mist', async () => {
    groundedMock.mockResolvedValue({ text: '', json: { facts: [] }, sources: [], searchQueries: ['q'] });
    const result = await new ResearchAgent().run('Kop van het nieuws\nmeer context', outputPath, { news: true });
    expect(result.topic).toBe('Kop van het nieuws');
  });

  it('nieuwsmodus: breekt af als het model niet zocht (feiten zouden uit geheugen komen)', async () => {
    groundedMock.mockResolvedValue({ text: '', json: { topic: 'n', facts: [] }, sources: [], searchQueries: [] });
    await expect(new ResearchAgent().run('nieuws', outputPath, { news: true })).rejects.toThrow('zonder Google Search');
  });
});
