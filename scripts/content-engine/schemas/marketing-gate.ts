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
  feedback: z.string()
});

export type MarketingGateOutput = z.infer<typeof MarketingGateOutputSchema>;
export type MarketingGateScores = z.infer<typeof MarketingGateScoresSchema>;

/** Enige blokkerende regel — zie prompts/marketing-gate.md. Los geëxporteerd zodat MarketingGateAgent
 * `passed` zelf herberekent i.p.v. op het LLM-oordeel te vertrouwen (zelfde patroon als seo.ts). */
export const MARKETING_GATE_PRACTICAL_USEFULNESS_MIN = 4;

export function computeMarketingGatePassed(scores: MarketingGateScores): boolean {
  return scores.practicalUsefulness >= MARKETING_GATE_PRACTICAL_USEFULNESS_MIN;
}
