import { z } from 'zod';

export const FactCheckIssueSchema = z.object({
  claim: z.string().describe("De letterlijke (of licht geparafraseerde) claim uit de tekst die fout of onnauwkeurig is."),
  status: z.enum(['incorrect', 'unsupported', 'imprecise']).describe("Het type probleem met de claim."),
  reason: z.string().describe("De reden waarom de claim wordt afgekeurd. Wat is er feitelijk onjuist?"),
  suggestion: z.string().describe("Suggestie hoe de claim aangepast moet worden om wel feitelijk correct te zijn."),
});

export const FactCheckOutputSchema = z.array(FactCheckIssueSchema).describe("Lijst van feitelijke onjuistheden in het artikel.");

export type FactCheckOutput = z.infer<typeof FactCheckOutputSchema>;
