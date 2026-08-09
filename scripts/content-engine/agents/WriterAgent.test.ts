// Regressietests voor WriterAgent — had 0% dekking, inclusief de
// eerste-schrijfbeurt- vs. herschrijf-met-feedback-tak die run-pipeline.ts
// aanstuurt in de kwaliteitsloop.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const { generateMock } = vi.hoisted(() => ({ generateMock: vi.fn() }));
vi.mock('../services/LLMService', () => ({
  LLMService: class {
    generate = generateMock;
  },
}));

import { WriterAgent } from './WriterAgent';

describe('WriterAgent.run', () => {
  let dir: string;
  let researchPath: string;
  let outputPath: string;

  beforeEach(() => {
    generateMock.mockReset();
    dir = mkdtempSync(path.join(tmpdir(), 'writer-test-'));
    researchPath = path.join(dir, 'research.json');
    outputPath = path.join(dir, 'draft.md');
    writeFileSync(researchPath, JSON.stringify({ topic: 'warmtepomp', facts: [{ claim: 'SCOP 4.5', source: 'RVO', confidence: 90 }] }), 'utf-8');
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('schrijft de LLM-tekst (markdown, geen JSON-parse) naar outputPath', async () => {
    generateMock.mockResolvedValue('# Artikel\n\nDit is de body.');
    const agent = new WriterAgent();
    const result = await agent.run('warmtepomp rendement', researchPath, outputPath);
    expect(result).toBe('# Artikel\n\nDit is de body.');
    expect(readFileSync(outputPath, 'utf-8')).toBe('# Artikel\n\nDit is de body.');
  });

  it('gebruikt responseFormat text (geen JSON-parse/Zod-validatie op de output)', async () => {
    generateMock.mockResolvedValue('gewone tekst, geen json');
    const agent = new WriterAgent();
    await expect(agent.run('onderwerp', researchPath, outputPath)).resolves.toBe('gewone tekst, geen json');
  });

  it('eerste schrijfbeurt: stuurt de researchfeiten en kennisbank mee, geen feedback-sectie', async () => {
    generateMock.mockResolvedValue('draft');
    const agent = new WriterAgent();
    await agent.run('warmtepomp rendement', researchPath, outputPath);
    const prompt = generateMock.mock.calls[0][0].userPrompt as string;
    expect(prompt).toContain('SCOP 4.5');
    expect(prompt).not.toContain('FEEDBACK VAN KWALITEITSCONTROLE');
  });

  it('herschrijfmodus: als feedback + een bestaande outputPath meegegeven zijn, gaat de vorige draft + feedback mee', async () => {
    writeFileSync(outputPath, '# Oude draft\n\nMet een fout.', 'utf-8');
    generateMock.mockResolvedValue('# Nieuwe draft\n\nGecorrigeerd.');
    const agent = new WriterAgent();
    await agent.run('warmtepomp rendement', researchPath, outputPath, '- [FEITFOUT] "SCOP 6.0": te hoog.');
    const prompt = generateMock.mock.calls[0][0].userPrompt as string;
    expect(prompt).toContain('FEEDBACK VAN KWALITEITSCONTROLE');
    expect(prompt).toContain('SCOP 6.0');
    expect(prompt).toContain('Oude draft');
  });

  it('valt terug op eerste-schrijfbeurt-modus als feedback gegeven is maar er nog geen vorige draft bestaat', async () => {
    generateMock.mockResolvedValue('# Eerste draft');
    const agent = new WriterAgent();
    await agent.run('onderwerp', researchPath, outputPath, 'feedback zonder bestaande draft');
    const prompt = generateMock.mock.calls[0][0].userPrompt as string;
    expect(prompt).not.toContain('FEEDBACK VAN KWALITEITSCONTROLE');
  });

  it('gooit een duidelijke fout als research.json ontbreekt', async () => {
    const agent = new WriterAgent();
    await expect(
      agent.run('onderwerp', path.join(dir, 'ontbreekt.json'), outputPath)
    ).rejects.toThrow(/Kon research\.json niet lezen/);
  });
});
