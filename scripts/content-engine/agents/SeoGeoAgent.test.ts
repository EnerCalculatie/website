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
    generateJSON = async (req) => JSON.parse(await generateMock(req));
  },
}));

import { SeoGeoAgent, stripFaqSectionFromContent, dedupeFaq } from './SeoGeoAgent';

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

  it('voegt visual-data uit draft.extras.json toe aan het geoptimaliseerde resultaat', async () => {
    writeFileSync(draftPath, '# Artikel\n\n[[VISUAL]]\n\nBody.', 'utf-8');
    writeFileSync(
      draftPath.replace(/\.md$/, '.extras.json'),
      JSON.stringify({ visual: { type: 'bar_chart', unit: 'kWh', items: [{ label: 'A', value: 1 }] } }),
      'utf-8'
    );
    generateMock.mockResolvedValue(JSON.stringify(validSeoOutput({ content: '# Artikel\n\n[[VISUAL]]\n\nBody geoptimaliseerd.' })));
    const agent = new SeoGeoAgent();
    const result = await agent.run(draftPath, outputPath);
    expect(result.visual?.type).toBe('bar_chart');
  });

  it('laat visual weg als er geen extras.json bestaat', async () => {
    generateMock.mockResolvedValue(JSON.stringify(validSeoOutput()));
    const agent = new SeoGeoAgent();
    const result = await agent.run(draftPath, outputPath);
    expect(result.visual).toBeUndefined();
  });

  it('regressie: verwijdert een eigen FAQ-sectie in content én dedupliceert het faq-veld, ook als het LLM de seo.md-instructie negeert', async () => {
    generateMock.mockResolvedValue(JSON.stringify(validSeoOutput({
      content: '# Artikel\n\nBody.\n\n## Veelgestelde vragen\n\n### Vraag 1?\nAntwoord.',
      faq: [
        { question: 'Vraag 1?', answer: 'Antwoord.' },
        { question: 'Vraag 1?', answer: 'Antwoord.' },
      ],
    })));
    const agent = new SeoGeoAgent();
    const result = await agent.run(draftPath, outputPath);
    expect(result.content).not.toContain('Veelgestelde vragen');
    expect(result.faq).toHaveLength(1);
  });
});

describe('SeoGeoAgent.brief', () => {
  beforeEach(() => generateMock.mockReset());

  it('parset en valideert een geldig brief-object', async () => {
    generateMock.mockResolvedValue(JSON.stringify({
      searchIntent: 'wil weten wat 3x25A betekent',
      primaryQuestion: 'Wat is 3x25A?',
      secondaryQuestions: ['Wat is de max belasting?'],
      audienceContext: 'tijdens offertetraject',
      requiredInformation: ['normwaarden'],
    }));
    const agent = new SeoGeoAgent();
    const result = await agent.brief('3x25A aansluiting', 'kwh keyword', 'informatief');
    expect(result.primaryQuestion).toBe('Wat is 3x25A?');
  });

  it('geeft topic/keyword/intent door in de userPrompt', async () => {
    generateMock.mockResolvedValue(JSON.stringify({
      searchIntent: 's', primaryQuestion: 'p', secondaryQuestions: [], audienceContext: 'a', requiredInformation: [],
    }));
    const agent = new SeoGeoAgent();
    await agent.brief('Mijn Onderwerp', 'mijn-keyword', 'commercieel');
    const prompt = generateMock.mock.calls[0][0].userPrompt as string;
    expect(prompt).toContain('Mijn Onderwerp');
    expect(prompt).toContain('mijn-keyword');
    expect(prompt).toContain('commercieel');
  });
});

describe('SeoGeoAgent.audit', () => {
  let dir2: string;
  let seoJsonPath: string;
  let auditOutputPath: string;
  const validBrief = {
    searchIntent: 's', primaryQuestion: 'p', secondaryQuestions: [], audienceContext: 'a', requiredInformation: [],
  };

  beforeEach(() => {
    generateMock.mockReset();
    dir2 = mkdtempSync(path.join(tmpdir(), 'seogeo-audit-test-'));
    seoJsonPath = path.join(dir2, 'seo-optimized.json');
    auditOutputPath = path.join(dir2, 'seo-audit.json');
    writeFileSync(seoJsonPath, JSON.stringify({ title: 'T', seoTitle: 'ST', description: 'D', slug: 's', content: 'body', faq: [] }), 'utf-8');
  });
  afterEach(() => rmSync(dir2, { recursive: true, force: true }));

  const highScores = Object.fromEntries(
    ['searchIntentCoverage', 'primaryQuestionAnswered', 'secondaryQuestionsCovered', 'earlyValueDelivery',
      'headingStructure', 'semanticTopicCoverage', 'entitiesAndDefinitions', 'featuredSnippetPotential',
      'geoReadability', 'faqCoverage', 'internalLinks', 'titleAndMeta', 'intentConsistency'].map((k) => [k, 8])
  );

  it('herberekent passed zelf uit de scores — vertrouwt niet blind op het LLM-passed-veld', async () => {
    // LLM zegt passed:false, maar alle scores zijn ruim boven de drempel — computeSeoAuditPassed
    // moet dit corrigeren naar true (zie schemas/seo.ts).
    generateMock.mockResolvedValue(JSON.stringify({ passed: false, scores: highScores, blockingIssues: [], feedback: 'ok' }));
    const agent = new SeoGeoAgent();
    const result = await agent.audit(seoJsonPath, validBrief, auditOutputPath);
    expect(result.passed).toBe(true);
  });

  it('schrijft het resultaat naar outputPath', async () => {
    generateMock.mockResolvedValue(JSON.stringify({ passed: true, scores: highScores, blockingIssues: [], feedback: 'ok' }));
    const agent = new SeoGeoAgent();
    await agent.audit(seoJsonPath, validBrief, auditOutputPath);
    const written = JSON.parse(readFileSync(auditOutputPath, 'utf-8'));
    expect(written.passed).toBe(true);
  });
});

describe('stripFaqSectionFromContent', () => {
  it('verwijdert een "## Veelgestelde vragen"-sectie en alles erna', () => {
    const content = 'Alinea 1.\n\n## Een kop\n\nAlinea 2.\n\n## Veelgestelde vragen over X\n\n### Vraag 1?\nAntwoord 1.';
    const { content: result, stripped } = stripFaqSectionFromContent(content);
    expect(stripped).toBe(true);
    expect(result).toBe('Alinea 1.\n\n## Een kop\n\nAlinea 2.');
    expect(result).not.toContain('Veelgestelde vragen');
  });

  it('verwijdert ook een "## FAQ"-kop, hoofdletterongevoelig', () => {
    const content = 'Body tekst.\n\n## faq\n\nVraag en antwoord.';
    const { stripped, content: result } = stripFaqSectionFromContent(content);
    expect(stripped).toBe(true);
    expect(result).toBe('Body tekst.');
  });

  it('laat content zonder FAQ-kop ongewijzigd', () => {
    const content = 'Gewoon een artikel zonder FAQ-sectie.\n\n## Een andere kop\n\nMeer tekst.';
    const { stripped, content: result } = stripFaqSectionFromContent(content);
    expect(stripped).toBe(false);
    expect(result).toBe(content);
  });

  it('is geen false-positive op het woord "veelgestelde" midden in een zin', () => {
    const content = 'Dit beantwoordt een veelgestelde vraag over buffervaten in lopende tekst, geen kop.';
    const { stripped } = stripFaqSectionFromContent(content);
    expect(stripped).toBe(false);
  });
});

describe('dedupeFaq', () => {
  it('laat unieke vragen ongemoeid', () => {
    const faq = [
      { question: 'Hoeveel liter buffervat per kW?', answer: 'A' },
      { question: 'Wat is het verschil serieel/parallel?', answer: 'B' },
    ];
    expect(dedupeFaq(faq)).toHaveLength(2);
  });

  it('verwijdert een exacte duplicaat-vraag', () => {
    const faq = [
      { question: 'Hoeveel liter buffervat per kW?', answer: 'A' },
      { question: 'Hoeveel liter buffervat per kW?', answer: 'A' },
    ];
    expect(dedupeFaq(faq)).toHaveLength(1);
  });

  it('verwijdert een semantisch vrijwel identieke vraag (regressie: dubbele FAQ-sectie in buffervat-artikel)', () => {
    const faq = [
      { question: 'Hoeveel liter buffervat per kW warmtepomp is nodig?', answer: 'A' },
      { question: 'Hoeveel liter buffervat is er per kW warmtepomp nodig?', answer: 'B' },
    ];
    expect(dedupeFaq(faq)).toHaveLength(1);
  });

  it('behoudt vragen die inhoudelijk duidelijk verschillen, ook met overlappende woorden', () => {
    const faq = [
      { question: 'Wat is de minimale compressor-run-time van een warmtepomp?', answer: 'A' },
      { question: 'Wat is het verschil tussen een serieel en parallel geschakeld buffervat?', answer: 'B' },
    ];
    expect(dedupeFaq(faq)).toHaveLength(2);
  });

  it('behoudt de eerste van twee duplicaten, niet de tweede', () => {
    const faq = [
      { question: 'Vraag?', answer: 'Eerste antwoord' },
      { question: 'Vraag?', answer: 'Tweede antwoord' },
    ];
    expect(dedupeFaq(faq)[0].answer).toBe('Eerste antwoord');
  });
});
