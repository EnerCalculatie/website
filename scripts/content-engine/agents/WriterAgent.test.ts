// Regressietests voor WriterAgent — had 0% dekking, inclusief de
// eerste-schrijfbeurt- vs. herschrijf-met-feedback-tak die run-pipeline.ts
// aanstuurt in de kwaliteitsloop.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const { generateMock } = vi.hoisted(() => ({ generateMock: vi.fn() }));
vi.mock('../services/LLMService', () => ({
  LLMService: class {
    generate = generateMock;
  },
}));

import { WriterAgent, splitWriterResponse } from './WriterAgent';

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

  it('stuurt CONTENTTYPE mee als het is meegegeven (di/vr-contenttype-afdwinging)', async () => {
    generateMock.mockResolvedValue('draft');
    const agent = new WriterAgent();
    await agent.run('warmtepomp rendement', researchPath, outputPath, undefined, 'PRACTICAL');
    const prompt = generateMock.mock.calls[0][0].userPrompt as string;
    expect(prompt).toContain('CONTENTTYPE: PRACTICAL');
  });

  it('bevat geen CONTENTTYPE-regel als geen contentType is meegegeven (backwards compatible)', async () => {
    generateMock.mockResolvedValue('draft');
    const agent = new WriterAgent();
    await agent.run('warmtepomp rendement', researchPath, outputPath);
    const prompt = generateMock.mock.calls[0][0].userPrompt as string;
    expect(prompt).not.toContain('CONTENTTYPE:');
  });

  it('gooit een duidelijke fout als research.json ontbreekt', async () => {
    const agent = new WriterAgent();
    await expect(
      agent.run('onderwerp', path.join(dir, 'ontbreekt.json'), outputPath)
    ).rejects.toThrow(/Kon research\.json niet lezen/);
  });

  it('stuurt de SEO/GEO-brief mee als die is meegegeven', async () => {
    generateMock.mockResolvedValue('draft');
    const agent = new WriterAgent();
    await agent.run('warmtepomp rendement', researchPath, outputPath, undefined, undefined, {
      searchIntent: 'wil weten of SCOP realistisch is',
      primaryQuestion: 'Wat is een realistische SCOP?',
      secondaryQuestions: ['Hoe wordt SCOP gemeten?'],
      audienceContext: 'tijdens offertetraject',
      requiredInformation: ['SCOP-normwaarden'],
    });
    const prompt = generateMock.mock.calls[0][0].userPrompt as string;
    expect(prompt).toContain('SEO/GEO BRIEF');
    expect(prompt).toContain('Wat is een realistische SCOP?');
  });

  it('splitst het json-extras-blok van de LLM-respons af en schrijft alleen het artikel naar outputPath', async () => {
    generateMock.mockResolvedValue(
      '# Artikel\n\nBody met [[VISUAL]] erin.\n\n```json-extras\n{"visual": {"type": "bar_chart", "unit": "kWh", "items": [{"label": "A", "value": 1}]}}\n```'
    );
    const agent = new WriterAgent();
    const result = await agent.run('onderwerp', researchPath, outputPath);
    expect(result).toBe('# Artikel\n\nBody met [[VISUAL]] erin.');
    expect(readFileSync(outputPath, 'utf-8')).toBe('# Artikel\n\nBody met [[VISUAL]] erin.');
    const extras = JSON.parse(readFileSync(outputPath.replace(/\.md$/, '.extras.json'), 'utf-8'));
    expect(extras.visual.type).toBe('bar_chart');
  });

  it('schrijft geen extras.json als er geen json-extras-blok in de respons zit', async () => {
    generateMock.mockResolvedValue('# Artikel zonder visual.');
    const agent = new WriterAgent();
    await agent.run('onderwerp', researchPath, outputPath);
    expect(existsSync(outputPath.replace(/\.md$/, '.extras.json'))).toBe(false);
  });
});

describe('splitWriterResponse', () => {
  it('geeft de tekst ongewijzigd terug als er geen json-extras-blok is', () => {
    expect(splitWriterResponse('Gewoon een artikel.')).toEqual({ article: 'Gewoon een artikel.' });
  });

  it('splitst artikel en extras correct, ongeacht positie van het blok', () => {
    const result = splitWriterResponse('Artikel tekst.\n\n```json-extras\n{"visual": {"type": "comparison"}}\n```');
    expect(result.article).toBe('Artikel tekst.');
    expect(result.extras).toEqual({ visual: { type: 'comparison' } });
  });

  it('valt terug op alleen het artikel als het json-extras-blok kapotte JSON bevat', () => {
    const result = splitWriterResponse('Artikel.\n\n```json-extras\n{niet geldige json\n```');
    expect(result.article).toBe('Artikel.');
    expect(result.extras).toBeUndefined();
  });
});
