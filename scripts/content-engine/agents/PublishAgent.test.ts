// Regressietests voor de pure logica in PublishAgent — het enige onderdeel van de
// content-engine-agents dat vóór deze tests 0% dekking had, terwijl het de
// React-component/blogPosts.ts/App.tsx-broncode genereert die zonder menselijke
// review naar main gepusht wordt. execSync/fs-I/O (stap 5, build+qc:seo) is bewust
// niet hier getest — dat wordt elke di/vr-run al live geverifieerd; deze tests
// dekken de stringly-typed codegeneratie die een kapotte template anders pas bij
// zo'n live run zou laten opvallen.
import { describe, it, expect } from 'vitest';
import {
  estimateReadingMinutes,
  truncateAtWord,
  pascalCase,
  escapeJsString,
  buildComponentSource,
  splitOnVisualMarker,
  buildBlogPostsEntry,
  insertBlogPostsEntry,
  insertAppRoutes,
  matchPlanItem,
  type SeoJson,
  type VisualSpec,
} from './PublishAgent';

describe('estimateReadingMinutes', () => {
  it('rondt naar boven af en nooit onder 1 minuut', () => {
    expect(estimateReadingMinutes('een twee drie')).toBe(1);
  });
  it('225 wpm, rondt naar boven af', () => {
    const text = new Array(226).fill('woord').join(' ');
    expect(estimateReadingMinutes(text)).toBe(2);
  });
});

describe('truncateAtWord', () => {
  it('laat korte strings ongewijzigd', () => {
    expect(truncateAtWord('korte tekst', 50)).toBe('korte tekst');
  });
  it('knipt af op de laatste spatie vóór de limiet, met ellipsis', () => {
    expect(truncateAtWord('een lange zin die te lang is voor de limiet', 20)).toBe('een lange zin die...');
  });
  it('valt terug op harde afkap als er geen spatie in het eerste deel zit', () => {
    expect(truncateAtWord('éénheelanglangwoordzondrspaties', 10)).toBe('éénheelang...');
  });
});

describe('pascalCase', () => {
  it('zet een kebab-case slug om naar PascalCase', () => {
    expect(pascalCase('warmtepomp-rendement-scop')).toBe('WarmtepompRendementScop');
  });
  it('prefixt met Post als het resultaat met een cijfer begint (ongeldige JS-identifier anders)', () => {
    expect(pascalCase('2027-saldering-einde')).toBe('Post2027SalderingEinde');
  });
  it('single-woord slug', () => {
    expect(pascalCase('pvt-panelen')).toBe('PvtPanelen');
  });
});

describe('escapeJsString', () => {
  it('escaped enkele quotes', () => {
    expect(escapeJsString("installateur's advies")).toBe("installateur\\'s advies");
  });
  it('laat tekst zonder quotes ongemoeid', () => {
    expect(escapeJsString('gewone tekst')).toBe('gewone tekst');
  });
});

describe('buildComponentSource', () => {
  it('bevat de component-functienaam en het slug-lookup', () => {
    const src = buildComponentSource('TestArtikelArticle', 'test-artikel', 'Body tekst.');
    expect(src).toContain('export function TestArtikelArticle()');
    expect(src).toContain("p.slug === 'test-artikel'");
  });
  it('escaped backticks en dollartekens in de body — anders breekt de template literal of loopt een ${} mee als interpolatie', () => {
    const src = buildComponentSource('X', 'x', 'Prijs: `${99}` per maand.');
    expect(src).toContain('Prijs: \\`\\${99}\\` per maand.');
    // Geen onbedoelde template-interpolatie: de losse rauwe `${99}` mag niet meer voorkomen.
    expect(src).not.toContain('`${99}`');
  });
  it('gebruikt _node-prefix in alle ReactMarkdown-component-overrides (lint-regressie 2026-08-09)', () => {
    const src = buildComponentSource('X', 'x', 'body');
    const bareNodeDestructure = /\{node,\s*\.\.\.props\}/;
    expect(bareNodeDestructure.test(src)).toBe(false);
    expect((src.match(/\{node: _node, \.\.\.props\}/g) || []).length).toBeGreaterThanOrEqual(12);
  });

  const visual: VisualSpec = { type: 'bar_chart', title: 'Test', unit: 'kWh', items: [{ label: 'A', value: 1 }] };

  it('splitst de markdown op [[VISUAL]] en rendert ArticleVisual ertussen, als marker + visual beide aanwezig zijn', () => {
    const content = 'Alinea 1.\n\n[[VISUAL]]\n\nAlinea 2.';
    const src = buildComponentSource('X', 'x', content, visual);
    expect(src).toContain("import { ArticleVisual } from './ArticleVisual';");
    expect(src).toContain('const markdown0 = `');
    expect(src).toContain('const markdown1 = `');
    expect(src).toContain('<ArticleVisual visual={');
    // De volgorde in de JSX-body moet markdown0 -> visual -> markdown1 zijn.
    const idx0 = src.indexOf('{markdown0}');
    const idxVisual = src.indexOf('<ArticleVisual');
    const idx1 = src.indexOf('{markdown1}');
    expect(idx0).toBeLessThan(idxVisual);
    expect(idxVisual).toBeLessThan(idx1);
  });

  it('rendert GEEN visual als er wel een spec is maar geen [[VISUAL]]-marker in de content', () => {
    const src = buildComponentSource('X', 'x', 'Gewone tekst zonder marker.', visual);
    expect(src).not.toContain('ArticleVisual');
    expect(src).toContain('const markdown = `');
  });

  it('rendert GEEN visual als er wel een marker is maar geen visual-spec', () => {
    const src = buildComponentSource('X', 'x', 'Tekst.\n\n[[VISUAL]]\n\nMeer tekst.', undefined);
    expect(src).not.toContain('ArticleVisual');
  });

  it('splitOnVisualMarker splitst exact op de marker-regel, negeert omringende whitespace', () => {
    expect(splitOnVisualMarker('A\n\n[[VISUAL]]\n\nB')).toEqual(['A\n', '\nB']);
    expect(splitOnVisualMarker('Geen marker hier.')).toEqual(['Geen marker hier.']);
    expect(splitOnVisualMarker('A\n[[VISUAL]]\nB\n[[VISUAL]]\nC')).toHaveLength(3);
  });
});

describe('matchPlanItem', () => {
  const plan = [
    { title: 'Zakelijke laadpalen en fiscale stimulering: MIA en VAMIL', status: 'planned' },
    { title: 'Dynamische energiecontracten adviseren: sturing batterij en warmtepomp', status: 'planned' },
  ];

  it('matcht exact op het originele onderwerp, niet op het eerste planned item (regressie 2026-08-25)', () => {
    const match = matchPlanItem(plan, 'Dynamische energiecontracten adviseren: sturing batterij en warmtepomp');
    expect(match?.title).toBe('Dynamische energiecontracten adviseren: sturing batterij en warmtepomp');
  });

  it('geeft undefined i.p.v. een verkeerd item als de SEO-herschreven titel niet meer matcht', () => {
    // Root cause van het echte duplicaat-artikel: SeoGeoAgent herschreef de titel, de oude
    // matching viel dan terug op "het eerste planned item" (hier het laadpalen-item) en markeerde
    // dat ten onrechte als gegenereerd. Nu: geen match, geen fallback, item blijft 'planned'.
    const match = matchPlanItem(plan, 'Een compleet andere, SEO-herschreven titel die niet in de backlog staat');
    expect(match).toBeUndefined();
  });

  it('geeft undefined zonder originalTopic (handmatige CLI-run zonder backlog-koppeling)', () => {
    expect(matchPlanItem(plan, undefined)).toBeUndefined();
  });

  it('matcht niet op een item dat al niet meer planned is', () => {
    const withGenerated = [{ title: 'Al gepubliceerd onderwerp', status: 'generated' }];
    expect(matchPlanItem(withGenerated, 'Al gepubliceerd onderwerp')).toBeUndefined();
  });
});

describe('buildBlogPostsEntry', () => {
  const baseSeo: SeoJson = {
    content: 'body',
    slug: 'test-slug',
    title: "Titel met een 'quote'",
    excerpt: 'Korte samenvatting.',
    tags: ['zonnepanelen', "installateur's gids"],
    keyPoints: ['Punt een', 'Punt twee'],
  };

  it('escaped enkele quotes in title/tags/keyPoints zodat het gegenereerde JS geldig blijft', () => {
    const entry = buildBlogPostsEntry(baseSeo, 3);
    expect(entry).toContain("title: 'Titel met een \\'quote\\''");
    expect(entry).toContain("'installateur\\'s gids'");
  });
  it('valt terug op title als seoTitle ontbreekt', () => {
    const entry = buildBlogPostsEntry(baseSeo, 3);
    expect(entry).toContain("seoTitle: 'Titel met een \\'quote\\''");
  });
  it('laat category/faq weg als ze niet zijn meegegeven', () => {
    const entry = buildBlogPostsEntry(baseSeo, 3);
    expect(entry).not.toContain('category:');
    expect(entry).not.toContain('faq:');
  });
  it('neemt category en faq op als ze zijn meegegeven', () => {
    const entry = buildBlogPostsEntry(
      { ...baseSeo, category: 'Warmtepomp', faq: [{ question: 'Vraag?', answer: 'Antwoord.' }] },
      3
    );
    expect(entry).toContain("category: 'Warmtepomp'");
    expect(entry).toContain("{ question: 'Vraag?', answer: 'Antwoord.' }");
  });
  it('knipt een te lange description af op woordgrens (max 155 tekens)', () => {
    const longDesc = new Array(30).fill('woord').join(' ');
    const entry = buildBlogPostsEntry({ ...baseSeo, description: longDesc }, 3);
    const match = entry.match(/description:\s*\n\s*'([^']*)'/);
    expect(match?.[1].length).toBeLessThanOrEqual(155);
  });
});

describe('insertBlogPostsEntry', () => {
  it('voegt het entry toe vóór de afsluitende `];` (entry-vorm zoals buildBlogPostsEntry oplevert, zelf eindigend op `];`)', () => {
    const source = `export const blogPosts = [\n  { slug: 'bestaand' },\n];\n`;
    const entry = "  { slug: 'nieuw' },\n];";
    const result = insertBlogPostsEntry(source, entry);
    expect(result).toBe(`export const blogPosts = [\n  { slug: 'bestaand' },\n  { slug: 'nieuw' },\n];\n`);
  });
});

describe('insertAppRoutes', () => {
  const fixture = [
    "const FooArticle = lazyRoute('/blog/foo', () => import('./components/blog/FooArticle').then(m => ({ default: m.FooArticle })));",
    '<Routes>',
    '  <Route path="/blog/foo" element={<FooArticle />} />',
    '</Routes>',
    '',
  ].join('\n');

  it('voegt de lazyRoute-import toe ná de laatst bestaande', () => {
    const result = insertAppRoutes(fixture, 'BarArticle', 'bar');
    expect(result).toContain(
      "const BarArticle = lazyRoute('/blog/bar', () => import('./components/blog/BarArticle').then(m => ({ default: m.BarArticle })));"
    );
    // Nieuwe import staat ná de bestaande, niet ervoor.
    expect(result.indexOf('FooArticle = lazyRoute')).toBeLessThan(result.indexOf('BarArticle = lazyRoute'));
  });

  it('voegt de <Route>-regel toe ná de laatst bestaande, met behoud van indentatie', () => {
    const result = insertAppRoutes(fixture, 'BarArticle', 'bar');
    expect(result).toContain('  <Route path="/blog/bar" element={<BarArticle />} />');
    expect(result.indexOf('path="/blog/foo"')).toBeLessThan(result.indexOf('path="/blog/bar"'));
  });

  it('gooit een duidelijke fout als het lazyRoute-ankerpunt ontbreekt', () => {
    expect(() => insertAppRoutes('geen ankerpunt hier', 'X', 'x')).toThrow(/lazyRoute-declaratie/);
  });

  it('gooit een duidelijke fout als het <Route>-ankerpunt ontbreekt', () => {
    const onlyLazyRoute = "const FooArticle = lazyRoute('/blog/foo', () => null);\n";
    expect(() => insertAppRoutes(onlyLazyRoute, 'X', 'x')).toThrow(/blog-<Route>/);
  });
});
