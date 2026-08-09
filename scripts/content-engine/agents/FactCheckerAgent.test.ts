// Regressietests voor FactCheckerAgent — had 0% dekking.
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

import { FactCheckerAgent } from './FactCheckerAgent';

describe('FactCheckerAgent.run', () => {
  let dir: string;
  let draftPath: string;
  let researchPath: string;
  let outputPath: string;

  beforeEach(() => {
    generateMock.mockReset();
    dir = mkdtempSync(path.join(tmpdir(), 'factchecker-test-'));
    draftPath = path.join(dir, 'draft.md');
    researchPath = path.join(dir, 'research.json');
    outputPath = path.join(dir, 'fact-check.json');
    writeFileSync(draftPath, '# Artikel\n\nEen SCOP van 4.5 is gemiddeld.', 'utf-8');
    writeFileSync(researchPath, JSON.stringify({ topic: 't', facts: [] }), 'utf-8');
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('parset en valideert een lege issue-lijst (artikel is feitelijk correct)', async () => {
    generateMock.mockResolvedValue('[]');
    const agent = new FactCheckerAgent();
    const result = await agent.run(draftPath, researchPath, outputPath);
    expect(result).toEqual([]);
    expect(JSON.parse(readFileSync(outputPath, 'utf-8'))).toEqual([]);
  });

  it('parset en valideert gevonden fact-check-issues', async () => {
    generateMock.mockResolvedValue(
      JSON.stringify([
        { claim: 'SCOP van 6.0', status: 'incorrect', reason: 'Niet realistisch', suggestion: 'Gebruik 4.5' },
      ])
    );
    const agent = new FactCheckerAgent();
    const result = await agent.run(draftPath, researchPath, outputPath);
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('incorrect');
  });

  it('gooit een Zod-fout bij een ongeldige status-waarde', async () => {
    generateMock.mockResolvedValue(
      JSON.stringify([{ claim: 'x', status: 'compleet-verzonnen-status', reason: 'y', suggestion: 'z' }])
    );
    const agent = new FactCheckerAgent();
    await expect(agent.run(draftPath, researchPath, outputPath)).rejects.toThrow();
  });

  it('gooit een duidelijke fout als draft.md of research.json ontbreken', async () => {
    const agent = new FactCheckerAgent();
    await expect(
      agent.run(path.join(dir, 'bestaat-niet.md'), researchPath, outputPath)
    ).rejects.toThrow(/Kon bestanden niet inladen/);
  });

  it('geeft zowel de bronnen-context als het conceptartikel door aan de LLM', async () => {
    generateMock.mockResolvedValue('[]');
    const agent = new FactCheckerAgent();
    await agent.run(draftPath, researchPath, outputPath);
    const call = generateMock.mock.calls[0][0];
    expect(call.userPrompt).toContain('SCOP van 4.5 is gemiddeld');
    expect(call.temperature).toBe(0);
  });
});
