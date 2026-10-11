// Tests voor NewsScoutAgent — categorie-rotatie, versheidscheck en het afwijzen van
// nieuws zonder bronnen of datum (zou anders een verzonnen nieuwsartikel opleveren).
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const { groundedMock } = vi.hoisted(() => ({ groundedMock: vi.fn() }));
vi.mock('../services/LLMService', () => ({
  LLMService: class {
    generateGrounded = groundedMock;
  },
}));

import { NewsScoutAgent, pickPreferredCategory, isStale } from './NewsScoutAgent';

describe('pickPreferredCategory', () => {
  it('kiest een categorie die nog nooit als nieuws is gepubliceerd', () => {
    const log = [
      { date: '2026-10-06', contentType: 'NEWS', category: 'Laadpalen' },
      { date: '2026-09-29', contentType: 'NEWS', category: 'Airco' },
    ];
    expect(['Zonnepanelen', 'Warmtepompen', 'Thuisbatterijen']).toContain(pickPreferredCategory(log));
  });

  it('kiest de categorie die het langst geleden is als alles al aan bod kwam', () => {
    const log = [
      { date: '2026-10-06', contentType: 'NEWS', category: 'Laadpalen' },
      { date: '2026-09-29', contentType: 'NEWS', category: 'Airco' },
      { date: '2026-09-22', contentType: 'NEWS', category: 'Zonnepanelen' },
      { date: '2026-09-15', contentType: 'NEWS', category: 'Warmtepompen' },
      { date: '2026-09-08', contentType: 'NEWS', category: 'Thuisbatterijen' },
    ];
    expect(pickPreferredCategory(log)).toBe('Thuisbatterijen');
  });

  it('negeert evergreen-artikelen', () => {
    const log = [{ date: '2026-10-06', contentType: 'EVERGREEN', category: 'Laadpalen' }];
    expect(pickPreferredCategory(log)).toBe('Laadpalen');
  });
});

describe('isStale', () => {
  const now = new Date('2026-10-13T06:00:00Z');
  it('vers nieuws is niet stale', () => expect(isStale('2026-10-08', now)).toBe(false));
  it('ouder dan 10 dagen is stale', () => expect(isStale('2026-09-30', now)).toBe(true));
  it('geen of onleesbare datum is stale', () => {
    expect(isStale(undefined, now)).toBe(true);
    expect(isStale('vorige week', now)).toBe(true);
  });
});

describe('NewsScoutAgent.run', () => {
  let dir: string;
  const today = new Date().toISOString().slice(0, 10);

  beforeEach(() => {
    groundedMock.mockReset();
    dir = mkdtempSync(path.join(tmpdir(), 'scout-test-'));
    mkdirSync(path.join(dir, 'ai-context'));
    writeFileSync(path.join(dir, 'ai-context/content-log.json'), '[]');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  const story = (overrides = {}) => '```json\n' + JSON.stringify({
    found: true, category: 'Warmtepompen', headline: 'Kop', summary: 'S', publishedDate: today, whyItMatters: 'W', ...overrides,
  }) + '\n```';

  it('geeft het bericht terug met de grounding-bronnen en schrijft het weg', async () => {
    groundedMock.mockResolvedValue({ text: story(), sources: [{ title: 'rvo.nl', url: 'https://rvo.nl/a' }] });
    const out = path.join(dir, 'news-story.json');
    const result = await new NewsScoutAgent().run(dir, out);
    expect(result.found).toBe(true);
    expect(result.sources).toEqual([{ title: 'rvo.nl', url: 'https://rvo.nl/a' }]);
    expect(JSON.parse(readFileSync(out, 'utf-8')).headline).toBe('Kop');
  });

  it('wijst een bericht zonder bronnen af', async () => {
    groundedMock.mockResolvedValue({ text: story(), sources: [] });
    const result = await new NewsScoutAgent().run(dir, path.join(dir, 'n.json'));
    expect(result.found).toBe(false);
  });

  it('wijst oud nieuws af', async () => {
    groundedMock.mockResolvedValue({ text: story({ publishedDate: '2020-01-01' }), sources: [{ title: 'x', url: 'https://x.nl' }] });
    const result = await new NewsScoutAgent().run(dir, path.join(dir, 'n.json'));
    expect(result.found).toBe(false);
  });

  it('geeft found:false door als het model niets vond', async () => {
    groundedMock.mockResolvedValue({ text: '{"found": false}', sources: [] });
    const result = await new NewsScoutAgent().run(dir, path.join(dir, 'n.json'));
    expect(result.found).toBe(false);
  });
});
