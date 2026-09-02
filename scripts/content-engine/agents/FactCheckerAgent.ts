import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { KnowledgeBase } from '../services/KnowledgeBase';
import { FactCheckOutputSchema, FactCheckOutput } from '../schemas/factcheck';

export class FactCheckerAgent {
  private llm: LLMService;
  private knowledgeBase: KnowledgeBase;
  private systemPrompt: string;

  constructor() {
    this.llm = new LLMService();
    this.knowledgeBase = new KnowledgeBase();
    
    const promptPath = path.join(import.meta.dirname, '../prompts/fact-checker.md');
    this.systemPrompt = readFileSync(promptPath, 'utf-8');
  }

  async run(draftPath: string, researchJsonPath: string, outputPath: string): Promise<FactCheckOutput> {
    const startTime = Date.now();
    console.log(`[FactCheckerAgent] Start controle van artikel...`);

    
    
    let draftContent: string;
    let researchFacts: string;
    try {
      draftContent = readFileSync(draftPath, 'utf-8');
      researchFacts = readFileSync(researchJsonPath, 'utf-8');
    } catch (_e) {
      throw new Error(`[FactCheckerAgent] Kon bestanden niet inladen. Zorg dat draft en research.json bestaan.`, { cause: _e });
    }

    const kbContext = this.knowledgeBase.getCombinedContext();

    const userPrompt = `
Beoordeel het onderstaande blogartikel op feitelijke juistheid, gebruikmakend van de meegeleverde bronnen.

### DE BRONNEN (WAARHEID) ###
${kbContext}
---
### SPECIFIEKE RESEARCH FEITEN ###
${researchFacts}

### HET GESCHREVEN ARTIKEL ###
${draftContent}
    `;

    try {
      const rawJson = await this.llm.generateJSON({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.0, // Absoluut nulpunt voor maximale precisie
      });

      const validatedData = FactCheckOutputSchema.parse(rawJson);
      
      const duration = Date.now() - startTime;
      console.log(`[FactCheckerAgent] Fact-check afgerond in ${duration}ms. ${validatedData.length} fouten gevonden.`);

      writeFileSync(outputPath, JSON.stringify(validatedData, null, 2), 'utf-8');
      
      return validatedData;
    } catch (error) {
      console.error('[FactCheckerAgent] Fout tijdens fact-check:', error);
      throw error;
    }
  }
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('FactCheckerAgent.ts')) {
  const draftPath = path.join(process.cwd(), 'draft.md');
  const researchPath = path.join(process.cwd(), 'research.json');
  const outputPath = path.join(process.cwd(), 'fact-check.json');
  
  const agent = new FactCheckerAgent();
  
  agent.run(draftPath, researchPath, outputPath).then((res) => {
    console.log(`✅ Opgeslagen in ${outputPath} (${res.length} issues)`);
  }).catch(() => process.exit(1));
}
