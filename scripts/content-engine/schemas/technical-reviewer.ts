import { z } from 'zod';

export const TechnicalReviewIssueSchema = z.object({
  issue: z.string().describe("De gevonden technische tekortkoming of foutieve aanname."),
  severity: z.enum(['low', 'medium', 'high']).describe("De ernst van deze fout (bijv. brandgevaar is high)."),
  recommendation: z.string().describe("Advies van de elektrotechnisch inspecteur om de nuance te verbeteren."),
});

export const TechnicalReviewOutputSchema = z.array(TechnicalReviewIssueSchema).describe("Lijst van technische review punten.");

export type TechnicalReviewOutput = z.infer<typeof TechnicalReviewOutputSchema>;
