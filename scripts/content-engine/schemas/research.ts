import { z } from 'zod';

export const ResearchFactSchema = z.object({
  claim: z.string().describe("De harde feitelijke claim zonder opsmuk."),
  source: z.string().describe("De specifieke en toegestane bron waar dit feit vandaan komt (bijv. 'Netbeheer Nederland')."),
  confidence: z.number().min(0).max(100).describe("Zekerheidsscore van 0 tot 100."),
  datum: z.string().optional().describe("Eventuele datum of jaartal van de bron/feit."),
});

export const ResearchOutputSchema = z.object({
  topic: z.string().describe("Het hoofdonderwerp van de research."),
  facts: z.array(ResearchFactSchema).describe("Lijst met geëxtraheerde feitelijke claims."),
});

export type ResearchOutput = z.infer<typeof ResearchOutputSchema>;
