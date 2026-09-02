import { z } from 'zod';

const MarketingGateScoresSchema = z.object({
  practicalUsefulness: z.number().min(0).max(10),
  b2bRelevance: z.number().min(0).max(10),
  visualImpact: z.number().min(0).max(10),
  scanability: z.number().min(0).max(10),
  conversionPotential: z.number().min(0).max(10),
  socialRepurposability: z.number().min(0).max(10)
});

export const MarketingGateOutputSchema = z.object({
  passed: z.boolean(),
  scores: MarketingGateScoresSchema,
  /** LLM-oordeel: bevat de content een duidelijke kans voor een bar_chart/comparison-visual?
   * Onafhankelijk van of er al een visual aanwezig is — dat bepaalt MarketingGateAgent.run()
   * zelf programmatisch (visualProvided), geen LLM-gok over een feit dat al bekend is. */
  visualOpportunity: z.boolean(),
  feedback: z.string()
});

export type MarketingGateOutput = z.infer<typeof MarketingGateOutputSchema>;
export type MarketingGateScores = z.infer<typeof MarketingGateScoresSchema>;

/** `visualProvided` komt nooit van het LLM — MarketingGateAgent.run() berekent het zelf
 * (`Boolean(seoJson.visual)`, een bekend feit, geen LLM-oordeel) en voegt het toe aan de output. */
export type MarketingGateOutputWithVisualStatus = MarketingGateOutput & { visualProvided: boolean };

/** Enige blokkerende regel — zie prompts/marketing-gate.md. Los geëxporteerd zodat MarketingGateAgent
 * `passed` zelf herberekent i.p.v. op het LLM-oordeel te vertrouwen (zelfde patroon als seo.ts). */
export const MARKETING_GATE_PRACTICAL_USEFULNESS_MIN = 4;

export function computeMarketingGatePassed(scores: MarketingGateScores): boolean {
  return scores.practicalUsefulness >= MARKETING_GATE_PRACTICAL_USEFULNESS_MIN;
}
