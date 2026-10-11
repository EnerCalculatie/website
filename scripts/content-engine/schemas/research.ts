import { z } from 'zod';

export const ResearchFactSchema = z.object({
  claim: z.string().describe("De harde feitelijke claim zonder opsmuk."),
  source: z.string().describe("De specifieke en toegestane bron waar dit feit vandaan komt (bijv. 'Netbeheer Nederland')."),
  confidence: z.number().min(0).max(100).describe("Zekerheidsscore van 0 tot 100."),
  datum: z.string().optional().describe("Eventuele datum of jaartal van de bron/feit."),
  url: z.string().optional().describe("URL van de bron — alleen bij nieuwsonderzoek met Google Search."),
});

export const ResearchOutputSchema = z.object({
  topic: z.string().describe("Het hoofdonderwerp van de research."),
  facts: z.array(ResearchFactSchema).describe("Lijst met geëxtraheerde feitelijke claims."),
  sources: z.array(z.object({ title: z.string(), url: z.string() })).optional()
    .describe("Door Google Search-grounding geraadpleegde bronnen (door de code toegevoegd, niet door het model)."),
});

export type ResearchOutput = z.infer<typeof ResearchOutputSchema>;
