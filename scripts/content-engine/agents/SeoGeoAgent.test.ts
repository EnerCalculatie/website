// Regressietests voor SeoGeoAgent — had 0% dekking. Output-schema hiervan
// (SeoGeoOutputSchema) is direct de input voor PublishAgent, dus een gemiste
// validatiefout hier zou pas bij het publiceren zelf opvallen.
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

import { SeoGeoAgent } from './SeoGeoAgent';

function validSeoOutput(overrides: Record<string, unknown> = {}) {
  return {
    content: '# Artikel\n\nBody.',
    slug: 'test-slug',
    title: 'Titel',
    seoTitle: 'SEO titel',
    description: 'Beschrijving.',
    excerpt: 'Korte intro.',
    tags: ['tag1'],
    keyPoints: ['punt1'],
    ...overrides,
  };
}

describe('SeoGeoAgent.run', () => {
  let dir: string;
  let draftPath: string;
  let outputPath: string;

  beforeEach(() => {
    generateMock.mockReset();
    dir = mkdtempSync(path.join(tmpdir(), 'seogeo-test-'));
    draftPath = path.join(dir, 'draft.md');
    outputPath = path.join(dir, 'seo-optimized.json');
    writeFileSync(draftPath, '# Artikel\n\nBody.', 'utf-8');
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('parset en valideert een compleet, geldig SEO-object', async () => {
    generateMock.mockResolvedValue(JSON.stringify(validSeoOutput()));
    const agent = new SeoGeoAgent();
    const result = await agent.run(draftPath, outputPath);
    expect(result.slug).toBe('test-slug');
    expect(JSON.parse(readFileSync(outputPath, 'utf-8'))).toEqual(result);
  });

  it('accepteert category/faq als optioneel ontbrekend', async () => {
    generateMock.mockResolvedValue(JSON.stringify(validSeoOutput()));
    const agent = new SeoGeoAgent();
    const result = await agent.run(draftPath, outputPath);
    expect(result.category).toBeUndefined();
    expect(result.faq).toBeUndefined();
  });

  it('gooit een Zod-fout als een verplicht veld ontbreekt (bv. slug)', async () => {
    const withoutSlug: Record<string, unknown> = validSeoOutput();
    delete withoutSlug.slug;
    generateMock.mockResolvedValue(JSON.stringify(withoutSlug));
    const agent = new SeoGeoAgent();
    await expect(agent.run(draftPath, outputPath)).rejects.toThrow();
  });

  it('gooit een duidelijke fout als draft.md ontbreekt', async () => {
    const agent = new SeoGeoAgent();
    await expect(agent.run(path.join(dir, 'weg.md'), outputPath)).rejects.toThrow(/Kon concept blog niet inladen/);
  });
});
