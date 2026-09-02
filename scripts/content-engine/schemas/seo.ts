import { z } from 'zod';

/** Zelfde vorm als VisualSpec/BarChartVisual/ComparisonVisual in src/components/blog/ArticleVisual.tsx —
 * bewust gedupliceerd (Zod-schema, geen TS-type) omdat dat bestand geen build-dependency van de
 * content-engine is en dit los valideerbaar/testbaar moet blijven. Bij wijziging van ArticleVisual's
 * VisualSpec-vorm: hier meenemen. */
export const VisualSpecSchema = z.object({
  type: z.enum(['bar_chart', 'comparison']),
  title: z.string().optional(),
  caption: z.string().optional(),
  unit: z.string().optional().describe("Verplicht voor bar_chart, niet gebruikt bij comparison."),
  items: z.array(z.object({ label: z.string(), value: z.number(), kleur: z.string().optional() })).optional()
    .describe("Verplicht voor bar_chart."),
  columns: z.tuple([z.string(), z.string()]).optional().describe("Verplicht voor comparison."),
  rows: z.array(z.object({ label: z.string(), left: z.string(), right: z.string() })).optional()
    .describe("Verplicht voor comparison."),
  illustrative: z.boolean().optional().describe("True als de waarden een illustratief voorbeeld zijn, geen gemeten feit.")
});

export const SeoGeoOutputSchema = z.object({
  content: z.string().describe("Het volledig geoptimaliseerde Markdown artikel (enkel de body, zonder metadata)."),
  slug: z.string().describe("URL slug voor het artikel (kebab-case)."),
  title: z.string().describe("Korte leesbare titel (H1)."),
  seoTitle: z.string().describe("SEO geoptimaliseerde title tag (< 60 chars)."),
  description: z.string().describe("Meta description tag (< 155 chars)."),
  excerpt: z.string().describe("Korte inleiding voor op de overzichtspagina."),
  tags: z.array(z.string()).describe("3-5 relevante categorie/SEO tags."),
  keyPoints: z.array(z.string()).describe("3-5 bullet points met belangrijkste takeaways."),
  category: z.string().optional().describe("Hoofdcategorie, bijv. 'Kennisbank' of 'Nieuws'."),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional().describe("Veelgestelde vragen voor structured data."),
  visual: VisualSpecSchema.optional().describe("WOW-visual, optioneel — uit de WriterAgent-nevenoutput, hier alleen doorgegeven.")
});

export type SeoGeoOutput = z.infer<typeof SeoGeoOutputSchema>;

export const SeoBriefOutputSchema = z.object({
  searchIntent: z.string(),
  primaryQuestion: z.string(),
  secondaryQuestions: z.array(z.string()),
  audienceContext: z.string(),
  requiredInformation: z.array(z.string())
});

export type SeoBriefOutput = z.infer<typeof SeoBriefOutputSchema>;

const SeoAuditScoresSchema = z.object({
  searchIntentCoverage: z.number().min(0).max(10),
  primaryQuestionAnswered: z.number().min(0).max(10),
  secondaryQuestionsCovered: z.number().min(0).max(10),
  earlyValueDelivery: z.number().min(0).max(10),
  headingStructure: z.number().min(0).max(10),
  semanticTopicCoverage: z.number().min(0).max(10),
  entitiesAndDefinitions: z.number().min(0).max(10),
  featuredSnippetPotential: z.number().min(0).max(10),
  geoReadability: z.number().min(0).max(10),
  faqCoverage: z.number().min(0).max(10),
  internalLinks: z.number().min(0).max(10),
  titleAndMeta: z.number().min(0).max(10),
  intentConsistency: z.number().min(0).max(10)
});

export const SeoAuditOutputSchema = z.object({
  passed: z.boolean(),
  scores: SeoAuditScoresSchema,
  blockingIssues: z.array(z.string()),
  feedback: z.string()
});

export type SeoAuditOutput = z.infer<typeof SeoAuditOutputSchema>;
export type SeoAuditScores = z.infer<typeof SeoAuditScoresSchema>;

/** Vaste, niet-onderhandelbare drempels — zie prompts/seo-audit.md. Los geëxporteerd zodat
 * SeoGeoAgent.audit() `passed` zelf herberekent i.p.v. blind op het LLM-oordeel te vertrouwen
 * (zelfde defensieve patroon als de harde ondergrens in MarketingGateAgent). */
export const SEO_AUDIT_DEFAULT_THRESHOLD = 6;
export const SEO_AUDIT_STRICT_THRESHOLD = 7;
export const SEO_AUDIT_STRICT_DIMENSIONS: (keyof SeoAuditScores)[] = ['primaryQuestionAnswered', 'internalLinks'];

export function computeSeoAuditPassed(scores: SeoAuditScores): boolean {
  return (Object.keys(scores) as (keyof SeoAuditScores)[]).every((key) => {
    const threshold = SEO_AUDIT_STRICT_DIMENSIONS.includes(key) ? SEO_AUDIT_STRICT_THRESHOLD : SEO_AUDIT_DEFAULT_THRESHOLD;
    return scores[key] >= threshold;
  });
}
