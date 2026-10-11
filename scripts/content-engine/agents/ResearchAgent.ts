import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { extractJson } from '../services/extractJson';
import { ResearchOutputSchema, ResearchOutput } from '../schemas/research';

export class ResearchAgent {
  private llm: LLMService;
  private systemPrompt: string;

  constructor() {
    this.llm = new LLMService();
    
    // Lees de prompt file
    const promptPath = path.join(import.meta.dirname, '../prompts/research.md');
    this.systemPrompt = readFileSync(promptPath, 'utf-8');
  }

  /**
   * `news: true` (dinsdag-nieuwsartikel): onderzoek met Google Search-grounding, zodat de feiten
   * uit actuele bronnen komen i.p.v. uit het trainingsgeheugen van het model. Zonder grounding
   * kan een nieuwsartikel niet — het model kent het nieuws van deze week simpelweg niet.
   */
  async run(topic: string, outputPath: string, options: { news?: boolean } = {}): Promise<ResearchOutput> {
    const startTime = Date.now();
    console.log(`[ResearchAgent] Start ${options.news ? 'nieuws' : ''}onderzoek naar: "${topic}"...`);

    try {
      let validatedData: ResearchOutput;
      if (options.news) {
        const userPrompt = `NIEUWSONDERZOEK\n\nVerzamel met Google Search de feiten over dit actuele nieuws:\n${topic}\n\nVolg de regels onder "Nieuwsonderzoek" in je instructies.`;
        const { text, sources, searchQueries } = await this.llm.generateGrounded({
          systemPrompt: this.systemPrompt,
          userPrompt,
          temperature: 0.1,
        });
        // Zonder zoekopdrachten komen de "feiten" uit het modelgeheugen — voor nieuws onbruikbaar.
        if (searchQueries.length === 0) {
          throw new Error('[ResearchAgent] Nieuwsonderzoek zonder Google Search — afgebroken om verzonnen feiten te voorkomen.');
        }
        validatedData = { ...ResearchOutputSchema.parse(extractJson(text)), sources };
      } else {
        const userPrompt = `Verzamel gedetailleerde, feitelijke informatie over het onderwerp: "${topic}".\nZorg ervoor dat alle beweringen rechtstreeks uit betrouwbare, in de systeeminstructie genoemde bronnen komen. Geef een zo compleet mogelijk overzicht van de feiten.`;
        const rawJson = await this.llm.generateJSON({
          systemPrompt: this.systemPrompt,
          userPrompt,
          temperature: 0.1, // Laag voor feitelijkheid
        });
        // Valideer met Zod (JSON-parse-retry zit al in generateJSON)
        validatedData = ResearchOutputSchema.parse(rawJson);
      }
      
      const duration = Date.now() - startTime;
      console.log(`[ResearchAgent] Onderzoek afgerond in ${duration}ms. ${validatedData.facts.length} feiten gevonden.`);

      // Output wegschrijven
      writeFileSync(outputPath, JSON.stringify(validatedData, null, 2), 'utf-8');
      
      return validatedData;
    } catch (error) {
      console.error('[ResearchAgent] Fout tijdens onderzoek:', error);
      throw error;
    }
  }
}

// CLI runner if executed directly
if (process.argv[1] && process.argv[1].endsWith('ResearchAgent.ts')) {
  const topic = process.argv[2];
  if (!topic) {
    console.error("Gebruik: npx tsx ResearchAgent.ts '<onderwerp>'");
    process.exit(1);
  }
  
  const agent = new ResearchAgent();
  const outputPath = path.join(process.cwd(), 'research.json');
  
  agent.run(topic, outputPath).then(() => {
    console.log(`✅ Opgeslagen in ${outputPath}`);
  }).catch(() => process.exit(1));
}
