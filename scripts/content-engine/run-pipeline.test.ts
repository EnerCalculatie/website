import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
// run-pipeline.ts importeert (via elke agent) LLMService.ts, dat op zijn beurt
// gemini-config.mjs importeert — die doet process.exit(1) zonder API-key in de
// env. Moet dus al gezet zijn vóórdat de (hoisted) import hieronder draait.
vi.hoisted(() => {
  process.env.GEMINI_API_KEY_PAID = 'test-key';
});
import { pickNextPlannedItem, requiredContentType, evaluateGates, runPipeline } from './run-pipeline';

describe('pickNextPlannedItem', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'pipeline-test-'));
    mkdirSync(path.join(dir, 'ai-context'));
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  function writePlan(items: unknown[]) {
    writeFileSync(path.join(dir, 'ai-context/content-plan.json'), JSON.stringify(items), 'utf-8');
  }

  it('kiest het planned-item met de hoogste priority', () => {
    writePlan([
      { title: 'laag', status: 'planned', priority: 3 },
      { title: 'hoog', status: 'planned', priority: 9 },
      { title: 'midden', status: 'planned', priority: 5 },
    ]);
    expect(pickNextPlannedItem(dir)?.title).toBe('hoog');
  });

  it('negeert items die niet de status planned hebben', () => {
    writePlan([
      { title: 'al gegenereerd', status: 'generated', priority: 10 },
      { title: 'nog te doen', status: 'planned', priority: 1 },
    ]);
    expect(pickNextPlannedItem(dir)?.title).toBe('nog te doen');
  });

  it('geeft null als er geen planned-items zijn', () => {
    writePlan([{ title: 'x', status: 'generated', priority: 5 }]);
    expect(pickNextPlannedItem(dir)).toBeNull();
  });

  it('geeft null als content-plan.json niet bestaat', () => {
    expect(pickNextPlannedItem(dir)).toBeNull();
  });

  it('behandelt een ontbrekende priority als 0', () => {
    writePlan([
      { title: 'zonder-priority', status: 'planned' },
      { title: 'met-priority', status: 'planned', priority: 1 },
    ]);
    expect(pickNextPlannedItem(dir)?.title).toBe('met-priority');
  });

  it('geeft bij een requiredType voorrang aan een matchend item, ook als het lagere prioriteit heeft', () => {
    writePlan([
      { title: 'seo-hoog', status: 'planned', priority: 9, contentType: 'SEO' },
      { title: 'practical-laag', status: 'planned', priority: 3, contentType: 'PRACTICAL' },
    ]);
    expect(pickNextPlannedItem(dir, 'PRACTICAL')?.title).toBe('practical-laag');
  });

  it('valt terug op hoogste prioriteit ongeacht type als geen enkel item het gevraagde type heeft', () => {
    writePlan([
      { title: 'seo-hoog', status: 'planned', priority: 9, contentType: 'SEO' },
      { title: 'seo-laag', status: 'planned', priority: 3, contentType: 'SEO' },
    ]);
    expect(pickNextPlannedItem(dir, 'PRACTICAL')?.title).toBe('seo-hoog');
  });

  it('kiest hoogste prioriteit zonder requiredType, ongeacht contentType (bestaand gedrag)', () => {
    writePlan([
      { title: 'a', status: 'planned', priority: 5, contentType: 'PRACTICAL' },
      { title: 'b', status: 'planned', priority: 8, contentType: 'SEO' },
    ]);
    expect(pickNextPlannedItem(dir)?.title).toBe('b');
  });
});

describe('requiredContentType', () => {
  it('geeft SEO op dinsdag (Europe/Amsterdam)', () => {
    expect(requiredContentType(new Date('2026-08-25T10:00:00Z'))).toBe('SEO'); // dinsdag
  });

  it('geeft PRACTICAL op donderdag (Europe/Amsterdam)', () => {
    expect(requiredContentType(new Date('2026-08-27T10:00:00Z'))).toBe('PRACTICAL'); // donderdag
  });

  it('geeft undefined op een andere dag', () => {
    expect(requiredContentType(new Date('2026-08-26T10:00:00Z'))).toBeUndefined(); // woensdag
  });

  it('volgt donderdag in zomer- en wintertijd, vrijdag heeft geen verplicht type', () => {
    expect(requiredContentType(new Date('2026-08-26T22:30:00Z'))).toBe('PRACTICAL');
    expect(requiredContentType(new Date('2026-01-07T23:30:00Z'))).toBe('PRACTICAL');
    expect(requiredContentType(new Date('2026-08-28T10:00:00Z'))).toBeUndefined();
    const workflow = readFileSync(new URL('../../.github/workflows/publish-blog-post.yml', import.meta.url), 'utf8');
    expect(workflow).toContain("* * 2,4'");
  });

  it('rekent in Europe/Amsterdam-lokale tijd, niet UTC (relevant rond middernacht)', () => {
    // 2026-08-24 23:30 UTC = 2026-08-25 01:30 CEST (Europe/Amsterdam) -> dinsdag lokaal
    expect(requiredContentType(new Date('2026-08-24T23:30:00Z'))).toBe('SEO');
  });
});

describe('evaluateGates', () => {
  it('canPublish=true als alle drie gates slagen', () => {
    const g = evaluateGates(0, true, true);
    expect(g).toEqual({ factualBlocking: false, seoBlocking: false, usefulnessBlocking: false, canPublish: true });
  });

  it('blokkeert op factual (high issues), ongeacht SEO/marketing', () => {
    const g = evaluateGates(1, true, true);
    expect(g.factualBlocking).toBe(true);
    expect(g.canPublish).toBe(false);
  });

  it('blokkeert op SEO/GEO, ook als factual en marketing ok zijn — onafhankelijke gate', () => {
    const g = evaluateGates(0, false, true);
    expect(g.seoBlocking).toBe(true);
    expect(g.factualBlocking).toBe(false);
    expect(g.canPublish).toBe(false);
  });

  it('blokkeert op practical usefulness, ook als factual en SEO ok zijn — onafhankelijke gate', () => {
    const g = evaluateGates(0, true, false);
    expect(g.usefulnessBlocking).toBe(true);
    expect(g.canPublish).toBe(false);
  });

  it('meerdere gates kunnen tegelijk blokkeren', () => {
    const g = evaluateGates(2, false, false);
    expect(g).toEqual({ factualBlocking: true, seoBlocking: true, usefulnessBlocking: true, canPublish: false });
  });
});

import { WriterAgent } from './agents/WriterAgent';
import { ResearchAgent } from './agents/ResearchAgent';
import { SeoGeoAgent } from './agents/SeoGeoAgent';
import { FactCheckerAgent } from './agents/FactCheckerAgent';
import { TechnicalReviewerAgent } from './agents/TechnicalReviewerAgent';
import { MarketingGateAgent } from './agents/MarketingGateAgent';
import { QualityGateAgent } from './agents/QualityGateAgent';
import { PublishAgent } from './agents/PublishAgent';

describe('begrensde herstelcyclus (zonder netwerk of publicatie)', () => {
  let dir: string;
  const high = { issue: 'Nulgeleiderstroom laat hoofdzekeringen trippen', severity: 'high' as const };
  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'recovery-test-'));
    vi.spyOn(SeoGeoAgent.prototype, 'brief').mockResolvedValue({ searchIntent: 'info', primaryQuestion: '?', secondaryQuestions: [], audienceContext: '', requiredInformation: [] });
    vi.spyOn(ResearchAgent.prototype, 'run').mockResolvedValue({ topic: 'test', facts: [] });
    vi.spyOn(WriterAgent.prototype, 'run').mockImplementation(async (_topic, _research, output) => { writeFileSync(output, 'draft'); return 'draft'; });
    vi.spyOn(SeoGeoAgent.prototype, 'run').mockImplementation(async (_draft, output) => {
      const result = { content: 'SEO publicatieversie', slug: 'test', title: 'Test', seoTitle: 'Test', description: '', excerpt: '', tags: [], keyPoints: [], faq: [{ question: 'FAQ?', answer: 'Ook controleren' }] };
      writeFileSync(output, JSON.stringify(result));
      return result;
    });
    vi.spyOn(FactCheckerAgent.prototype, 'run').mockResolvedValue([]);
    vi.spyOn(TechnicalReviewerAgent.prototype, 'run').mockResolvedValue([]);
    vi.spyOn(SeoGeoAgent.prototype, 'audit').mockResolvedValue({ passed: true, scores: {} as never, blockingIssues: [], feedback: '' });
    vi.spyOn(MarketingGateAgent.prototype, 'run').mockResolvedValue({ passed: true, scores: { practicalUsefulness: 9 } as never, visualOpportunity: false, visualProvided: false, feedback: '' });
    vi.spyOn(QualityGateAgent.prototype, 'run').mockResolvedValue({ passed: true, confidence: 95, issues: [] });
    vi.spyOn(PublishAgent.prototype, 'run').mockResolvedValue(undefined);
  });
  afterEach(() => { vi.restoreAllMocks(); rmSync(dir, { recursive: true, force: true }); });

  it('controleert de SEO-versie inclusief FAQ en publiceert zonder onnodige retries', async () => {
    await runPipeline(dir, 'test');
    const reviewPath = vi.mocked(FactCheckerAgent.prototype.run).mock.calls[0][0];
    expect(readFileSync(reviewPath, 'utf8')).toContain('SEO publicatieversie');
    expect(readFileSync(reviewPath, 'utf8')).toContain('Ook controleren');
    expect(TechnicalReviewerAgent.prototype.run).toHaveBeenCalledWith(reviewPath, expect.any(String));
    expect(WriterAgent.prototype.run).toHaveBeenCalledTimes(1);
    expect(QualityGateAgent.prototype.run).toHaveBeenCalledTimes(1);
    expect(PublishAgent.prototype.run).toHaveBeenCalledTimes(1);
  });

  it('herstelt een fout uit de eindgate en voert ALLE controles opnieuw uit', async () => {
    vi.mocked(QualityGateAgent.prototype.run).mockResolvedValueOnce({ passed: false, confidence: 40, issues: [high] });
    await runPipeline(dir, 'test');
    expect(vi.mocked(WriterAgent.prototype.run).mock.calls[1][3]).toContain(high.issue);
    for (const fn of [SeoGeoAgent.prototype.run, FactCheckerAgent.prototype.run, TechnicalReviewerAgent.prototype.run, SeoGeoAgent.prototype.audit, MarketingGateAgent.prototype.run, QualityGateAgent.prototype.run]) expect(fn).toHaveBeenCalledTimes(2);
    expect(ResearchAgent.prototype.run).toHaveBeenCalledTimes(1);
    expect(PublishAgent.prototype.run).toHaveBeenCalledTimes(1);
  });

  it('staat exact drie correcties toe en controleert ook de derde correctie', async () => {
    vi.mocked(QualityGateAgent.prototype.run).mockResolvedValue({ passed: false, confidence: 40, issues: [high] });
    await expect(runPipeline(dir, 'test')).rejects.toThrow('3 correctiepogingen');
    expect(WriterAgent.prototype.run).toHaveBeenCalledTimes(4);
    expect(QualityGateAgent.prototype.run).toHaveBeenCalledTimes(4);
    expect(PublishAgent.prototype.run).not.toHaveBeenCalled();
  });

  it.each(['fact', 'technical', 'seo', 'marketing'])('laat een openstaande %s-fout nooit overrulen door de eindgate', async (gate) => {
    if (gate === 'fact') vi.mocked(FactCheckerAgent.prototype.run).mockResolvedValue([{ status: 'incorrect', claim: 'fout', reason: 'onjuist', suggestion: 'verwijder' }]);
    if (gate === 'technical') vi.mocked(TechnicalReviewerAgent.prototype.run).mockResolvedValue([{ ...high, recommendation: 'verwijder' }]);
    if (gate === 'seo') vi.mocked(SeoGeoAgent.prototype.audit).mockResolvedValue({ passed: false, scores: {} as never, blockingIssues: ['zoekintentie'], feedback: 'herstel' });
    if (gate === 'marketing') vi.mocked(MarketingGateAgent.prototype.run).mockResolvedValue({ passed: false, scores: { practicalUsefulness: 3 } as never, visualOpportunity: false, visualProvided: false, feedback: 'herstel' });
    await expect(runPipeline(dir, 'test')).rejects.toThrow();
    expect(PublishAgent.prototype.run).not.toHaveBeenCalled();
    expect(WriterAgent.prototype.run).toHaveBeenCalledTimes(4);
  });

  it('gebruikt één budget voor opeenvolgende verschillende fouten, zonder oude SEO-goedkeuring', async () => {
    vi.mocked(QualityGateAgent.prototype.run).mockResolvedValueOnce({ passed: false, confidence: 40, issues: [high] });
    vi.mocked(SeoGeoAgent.prototype.audit).mockResolvedValueOnce({ passed: true, scores: {} as never, blockingIssues: [], feedback: '' }).mockResolvedValue({ passed: false, scores: {} as never, blockingIssues: ['nieuwe fout'], feedback: 'herstel' });
    await expect(runPipeline(dir, 'test')).rejects.toThrow();
    expect(WriterAgent.prototype.run).toHaveBeenCalledTimes(4);
    expect(PublishAgent.prototype.run).not.toHaveBeenCalled();
  });

  it('kan na de derde correctie alsnog publiceren', async () => {
    const rejected = { passed: false, confidence: 40, issues: [high] };
    vi.mocked(QualityGateAgent.prototype.run).mockResolvedValueOnce(rejected).mockResolvedValueOnce(rejected).mockResolvedValueOnce(rejected);
    await runPipeline(dir, 'test');
    expect(QualityGateAgent.prototype.run).toHaveBeenCalledTimes(4);
    expect(PublishAgent.prototype.run).toHaveBeenCalledTimes(1);
  });

  it('probeert een optionele visual slechts eenmaal en houdt medium/low non-blocking', async () => {
    vi.mocked(QualityGateAgent.prototype.run).mockResolvedValue({ passed: false, confidence: 80, issues: [{ issue: 'stijl', severity: 'medium' }] });
    vi.mocked(MarketingGateAgent.prototype.run).mockResolvedValue({ passed: true, scores: { practicalUsefulness: 9 } as never, visualOpportunity: true, visualProvided: false, feedback: '' });
    await runPipeline(dir, 'test');
    expect(WriterAgent.prototype.run).toHaveBeenCalledTimes(2);
    expect(PublishAgent.prototype.run).toHaveBeenCalledTimes(1);
  });

  it('stopt bij controlefouten zonder publicatie of extra schrijfpoging', async () => {
    vi.mocked(QualityGateAgent.prototype.run).mockRejectedValue(new Error('ongeldige input'));
    await expect(runPipeline(dir, 'test')).rejects.toThrow('ongeldige input');
    expect(PublishAgent.prototype.run).not.toHaveBeenCalled();
    expect(WriterAgent.prototype.run).toHaveBeenCalledTimes(1);
  });
});
