import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
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

  async run(topic: string, outputPath: string): Promise<ResearchOutput> {
    const startTime = Date.now();
    console.log(`[ResearchAgent] Start onderzoek naar: "${topic}"...`);

    const userPrompt = `Verzamel gedetailleerde, feitelijke informatie over het onderwerp: "${topic}".\nZorg ervoor dat alle beweringen rechtstreeks uit betrouwbare, in de systeeminstructie genoemde bronnen komen. Geef een zo compleet mogelijk overzicht van de feiten.`;

    try {
      const rawJson = await this.llm.generateJSON({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.1, // Laag voor feitelijkheid
      });

      // Valideer met Zod (JSON-parse-retry zit al in generateJSON)
      const validatedData = ResearchOutputSchema.parse(rawJson);
      
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
