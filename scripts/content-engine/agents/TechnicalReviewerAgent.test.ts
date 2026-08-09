// Regressietests voor TechnicalReviewerAgent — had 0% dekking.
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

import { TechnicalReviewerAgent } from './TechnicalReviewerAgent';

describe('TechnicalReviewerAgent.run', () => {
  let dir: string;
  let draftPath: string;
  let outputPath: string;

  beforeEach(() => {
    generateMock.mockReset();
    dir = mkdtempSync(path.join(tmpdir(), 'techreview-test-'));
    draftPath = path.join(dir, 'draft.md');
    outputPath = path.join(dir, 'technical-review.json');
    writeFileSync(draftPath, '# Artikel\n\nEen omvormer op 16A is altijd veilig.', 'utf-8');
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('parset en valideert gevonden technische issues, inclusief severity', async () => {
    generateMock.mockResolvedValue(
      JSON.stringify([
        {
          issue: 'Selectiviteit niet genoemd',
          severity: 'high',
          recommendation: 'Verwijs naar NEN 1010 selectiviteitseisen.',
        },
      ])
    );
    const agent = new TechnicalReviewerAgent();
    const result = await agent.run(draftPath, outputPath);
    expect(result).toHaveLength(1);
    expect(result[0].severity).toBe('high');
    expect(JSON.parse(readFileSync(outputPath, 'utf-8'))).toEqual(result);
  });

  it('gooit een Zod-fout bij een ongeldige severity-waarde', async () => {
    generateMock.mockResolvedValue(JSON.stringify([{ issue: 'x', severity: 'catastrofaal', recommendation: 'y' }]));
    const agent = new TechnicalReviewerAgent();
    await expect(agent.run(draftPath, outputPath)).rejects.toThrow();
  });

  it('gooit een duidelijke fout als draft.md ontbreekt', async () => {
    const agent = new TechnicalReviewerAgent();
    await expect(agent.run(path.join(dir, 'bestaat-niet.md'), outputPath)).rejects.toThrow(
      /Kon concept blog niet inladen/
    );
  });

  it('gebruikt temperature 0.1 (weinig creatieve ruimte voor een technische review)', async () => {
    generateMock.mockResolvedValue('[]');
    const agent = new TechnicalReviewerAgent();
    await agent.run(draftPath, outputPath);
    expect(generateMock.mock.calls[0][0].temperature).toBe(0.1);
  });
});
