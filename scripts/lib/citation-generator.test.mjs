import { describe, it, expect } from 'vitest';
import { collectUsedSources, buildSourcesBlock } from './citation-generator.mjs';

describe('collectUsedSources', () => {
  it('gebruikt alleen SUPPORTED claims', () => {
    const claims = [
      { status: 'SUPPORTED', source: { title: 'B', url: 'https://b.nl' } },
      { status: 'NO_SOURCE', source: { title: 'C', url: 'https://c.nl' } },
    ];
    expect(collectUsedSources(claims)).toEqual([{ title: 'B', url: 'https://b.nl' }]);
  });

  it('dedupliceert dezelfde bron', () => {
    const claims = [
      { status: 'SUPPORTED', source: { title: 'A', url: 'https://a.nl' } },
      { status: 'SUPPORTED', source: { title: 'A', url: 'https://a.nl' } },
    ];
    expect(collectUsedSources(claims)).toHaveLength(1);
  });

  it('sorteert op titel', () => {
    const claims = [
      { status: 'SUPPORTED', source: { title: 'Zebra', url: 'https://z.nl' } },
      { status: 'SUPPORTED', source: { title: 'Aap', url: 'https://a.nl' } },
    ];
    expect(collectUsedSources(claims).map((s) => s.title)).toEqual(['Aap', 'Zebra']);
  });
});

describe('buildSourcesBlock', () => {
  it('geeft lege string bij geen bronnen', () => {
    expect(buildSourcesBlock([])).toBe('');
  });

  it('rendert een JSX-lijst met geraadpleegd-datum', () => {
    const block = buildSourcesBlock([{ title: 'ISDE', url: 'https://rvo.nl/isde' }], '2026-08-03');
    expect(block).toContain('<h2');
    expect(block).toContain('ISDE');
    expect(block).toContain('https://rvo.nl/isde');
    expect(block).toContain('geraadpleegd 2026-08-03');
  });
});
