// Regressietests voor QualityGateAgent — had 0% dekking. Dit is de laatste
// check vóór PublishAgent draait; `passed: true` hier betekent live publicatie.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const { generateMock } = vi.hoisted(() => ({ generateMock: vi.fn() }));
vi.mock('../services/LLMService', () => ({
  LLMService: class {
    generate = generateMock;
  },
}));

import { QualityGateAgent } from './QualityGateAgent';

describe('QualityGateAgent.run', () => {
  let dir: string;
  let articlePath: string;
  let factCheckPath: string;
  let techReviewPath: string;
  let outputPath: string;

  beforeEach(() => {
    generateMock.mockReset();
    dir = mkdtempSync(path.join(tmpdir(), 'qualitygate-test-'));
    articlePath = path.join(dir, 'seo-optimized.json');
    factCheckPath = path.join(dir, 'fact-check.json');
    techReviewPath = path.join(dir, 'technical-review.json');
    outputPath = path.join(dir, 'quality-report.json');
    writeFileSync(articlePath, JSON.stringify({ content: '# Artikel\n\nBody.' }), 'utf-8');
    writeFileSync(factCheckPath, '[]', 'utf-8');
    writeFileSync(techReviewPath, '[]', 'utf-8');
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('parset en valideert een geslaagd oordeel', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ passed: true, confidence: 95, issues: [] }));
    const agent = new QualityGateAgent();
    const result = await agent.run(articlePath, factCheckPath, techReviewPath, outputPath);
    expect(result.passed).toBe(true);
    expect(result.confidence).toBe(95);
  });

  it('parset en valideert een afgekeurd oordeel met issues', async () => {
    generateMock.mockResolvedValue(
      JSON.stringify({ passed: false, confidence: 40, issues: [{ issue: 'Onvolledige onderbouwing', severity: 'high' }] })
    );
    const agent = new QualityGateAgent();
    const result = await agent.run(articlePath, factCheckPath, techReviewPath, outputPath);
    expect(result.passed).toBe(false);
    expect(result.issues[0].severity).toBe('high');
  });

  it('gooit een Zod-fout als confidence buiten 0-100 valt', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ passed: true, confidence: 150, issues: [] }));
    const agent = new QualityGateAgent();
    await expect(agent.run(articlePath, factCheckPath, techReviewPath, outputPath)).rejects.toThrow();
  });

  // Dit is het huidige, bestaande gedrag — géén regressietest voor gewenst gedrag.
  // Anders dan de andere 5 agents (die hard falen als hun inputbestanden ontbreken)
  // logt QualityGateAgent alleen een waarschuwing en gaat door met een LEGE prompt
  // naar de LLM als seo-optimized.json/fact-check.json/technical-review.json
  // ontbreken. Een LLM die op een lege prompt toch `passed: true` teruggeeft, zou
  // een artikel zonder inhoud kunnen laten publiceren. Vastgelegd zodat een
  // toekomstige wijziging hier bewust is, niet per ongeluk.
  it('documenteert: gaat door met een LEGE prompt als de inputbestanden ontbreken, i.p.v. te falen', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ passed: true, confidence: 100, issues: [] }));
    const agent = new QualityGateAgent();
    const result = await agent.run(
      path.join(dir, 'ontbreekt.json'),
      path.join(dir, 'ontbreekt.json'),
      path.join(dir, 'ontbreekt.json'),
      outputPath
    );
    expect(generateMock).toHaveBeenCalled();
    expect(result.passed).toBe(true);
  });
});
