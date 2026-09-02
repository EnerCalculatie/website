import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const { generateMock } = vi.hoisted(() => ({ generateMock: vi.fn() }));
vi.mock('../services/LLMService', () => ({
  LLMService: class {
    generate = generateMock;
    generateJSON = async (req) => JSON.parse(await generateMock(req));
  },
}));

import { MarketingGateAgent } from './MarketingGateAgent';

function scores(practicalUsefulness = 8) {
  return {
    practicalUsefulness,
    b2bRelevance: 7,
    visualImpact: 7,
    scanability: 7,
    conversionPotential: 7,
    socialRepurposability: 7,
  };
}

describe('MarketingGateAgent.run', () => {
  let dir: string;
  let seoJsonPath: string;
  let outputPath: string;

  beforeEach(() => {
    generateMock.mockReset();
    dir = mkdtempSync(path.join(tmpdir(), 'marketing-gate-test-'));
    seoJsonPath = path.join(dir, 'seo-optimized.json');
    outputPath = path.join(dir, 'marketing-report.json');
    writeFileSync(seoJsonPath, JSON.stringify({ title: 'T', content: 'body', faq: [] }), 'utf-8');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('herberekent passed zelf — negeert het LLM-passed-veld als de scores niet matchen', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ passed: false, scores: scores(9), feedback: 'ok' }));
    const agent = new MarketingGateAgent();
    const result = await agent.run(seoJsonPath, outputPath);
    expect(result.passed).toBe(true);
  });

  it('blokkeert bij lage practicalUsefulness, ongeacht wat het LLM als passed opgeeft', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ passed: true, scores: scores(1), feedback: 'te weinig bruikbaar' }));
    const agent = new MarketingGateAgent();
    const result = await agent.run(seoJsonPath, outputPath);
    expect(result.passed).toBe(false);
  });

  it('schrijft het resultaat naar outputPath', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ passed: true, scores: scores(), feedback: 'ok' }));
    const agent = new MarketingGateAgent();
    await agent.run(seoJsonPath, outputPath);
    const written = JSON.parse(readFileSync(outputPath, 'utf-8'));
    expect(written.scores.practicalUsefulness).toBe(8);
  });

  it('gooit een Zod-fout als een verplicht veld ontbreekt', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ scores: scores() })); // geen feedback
    const agent = new MarketingGateAgent();
    await expect(agent.run(seoJsonPath, outputPath)).rejects.toThrow();
  });
});
