import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { KnowledgeBase } from '../services/KnowledgeBase';

export class WriterAgent {
  private llm: LLMService;
  private knowledgeBase: KnowledgeBase;
  private systemPrompt: string;

  constructor() {
    this.llm = new LLMService();
    this.knowledgeBase = new KnowledgeBase();
    
    const promptPath = path.join(import.meta.dirname, '../prompts/writer.md');
    this.systemPrompt = readFileSync(promptPath, 'utf-8');
  }

  async run(topic: string, researchJsonPath: string, outputPath: string): Promise<string> {
    const startTime = Date.now();
    console.log(`[WriterAgent] Start schrijven artikel over: "${topic}"...`);

    // Laad input data
    let researchFacts = '';
    try {
      const raw = readFileSync(researchJsonPath, 'utf-8');
      researchFacts = `### ONDERZOEKSFEITEN VOOR DIT ARTIKEL ###\n${raw}`;
    } catch (e) {
      throw new Error(`[WriterAgent] Kon research.json niet lezen op ${researchJsonPath}`);
    }
    
    const kbContext = this.knowledgeBase.getCombinedContext();

    const userPrompt = `
Schrijf het blogartikel over het onderwerp: "${topic}".
Gebruik uitsluitend de volgende context. Mocht er informatie missen, verzin dan niks zelf.

${kbContext}

${researchFacts}
    `;

    try {
      // responseFormat text omdat we markdown verwachten
      const responseText = await this.llm.generate({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.3, // Iets hoger dan research, maar nog steeds laag voor feitelijke striktheid
        responseFormat: 'text'
      });

      const duration = Date.now() - startTime;
      console.log(`[WriterAgent] Schrijven afgerond in ${duration}ms.`);

      writeFileSync(outputPath, responseText, 'utf-8');
      
      return responseText;
    } catch (error) {
      console.error('[WriterAgent] Fout tijdens schrijven:', error);
      throw error;
    }
  }
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('WriterAgent.ts')) {
  const topic = process.argv[2];
  if (!topic) {
    console.error("Gebruik: npx tsx WriterAgent.ts '<onderwerp>'");
    process.exit(1);
  }
  
  const agent = new WriterAgent();
  const researchPath = path.join(process.cwd(), 'research.json');
  const outputPath = path.join(process.cwd(), 'draft.md');
  
  agent.run(topic, researchPath, outputPath).then(() => {
    console.log(`✅ Opgeslagen in ${outputPath}`);
  }).catch(() => process.exit(1));
}
