// computeSeoAuditPassed is de enige plek waar de vaste SEO/GEO-drempels daadwerkelijk worden
// afgedwongen — het LLM-oordeel (`passed` in de ruwe respons) wordt door SeoGeoAgent.audit()
// genegeerd en hiermee overschreven, zodat de drempels nooit "subjectief" kunnen verschuiven.
import { describe, it, expect } from 'vitest';
import { computeSeoAuditPassed, SEO_AUDIT_DEFAULT_THRESHOLD, SEO_AUDIT_STRICT_THRESHOLD, type SeoAuditScores } from './seo';

function scores(overrides: Partial<SeoAuditScores> = {}): SeoAuditScores {
  return {
    searchIntentCoverage: 8,
    primaryQuestionAnswered: 8,
    secondaryQuestionsCovered: 8,
    earlyValueDelivery: 8,
    headingStructure: 8,
    semanticTopicCoverage: 8,
    entitiesAndDefinitions: 8,
    featuredSnippetPotential: 8,
    geoReadability: 8,
    faqCoverage: 8,
    internalLinks: 8,
    titleAndMeta: 8,
    intentConsistency: 8,
    ...overrides,
  };
}

describe('computeSeoAuditPassed', () => {
  it('passed als alle scores boven de drempel zitten', () => {
    expect(computeSeoAuditPassed(scores())).toBe(true);
  });

  it('faalt als één gewone dimensie exact op de drempel-1 zit', () => {
    expect(computeSeoAuditPassed(scores({ headingStructure: SEO_AUDIT_DEFAULT_THRESHOLD - 1 }))).toBe(false);
  });

  it('slaagt precies op de drempel (inclusief)', () => {
    expect(computeSeoAuditPassed(scores({ headingStructure: SEO_AUDIT_DEFAULT_THRESHOLD }))).toBe(true);
  });

  it('primaryQuestionAnswered heeft de strengere drempel — een score die de gewone drempel haalt is niet genoeg', () => {
    const s = scores({ primaryQuestionAnswered: SEO_AUDIT_DEFAULT_THRESHOLD });
    expect(SEO_AUDIT_DEFAULT_THRESHOLD).toBeLessThan(SEO_AUDIT_STRICT_THRESHOLD);
    expect(computeSeoAuditPassed(s)).toBe(false);
  });

  it('internalLinks heeft dezelfde strengere drempel', () => {
    expect(computeSeoAuditPassed(scores({ internalLinks: SEO_AUDIT_DEFAULT_THRESHOLD }))).toBe(false);
    expect(computeSeoAuditPassed(scores({ internalLinks: SEO_AUDIT_STRICT_THRESHOLD }))).toBe(true);
  });
});
