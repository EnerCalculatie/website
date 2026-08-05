import { z } from 'zod';

export const QualityIssueSchema = z.object({
  issue: z.string(),
  severity: z.enum(['low', 'medium', 'high'])
});

export const QualityGateOutputSchema = z.object({
  passed: z.boolean().describe("True als de publicatie veilig is, False als er blokkerende problemen zijn."),
  confidence: z.number().min(0).max(100).describe("Totale betrouwbaarheidsscore."),
  issues: z.array(QualityIssueSchema).describe("Lijst van overgebleven bezwaren.")
});

export type QualityGateOutput = z.infer<typeof QualityGateOutputSchema>;
