import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { SeoGeoOutputSchema, SeoGeoOutput } from '../schemas/seo';

export class SeoGeoAgent {
  private llm: LLMService;
  private systemPrompt: string;

  constructor() {
    this.llm = new LLMService();
    const promptPath = path.join(import.meta.dirname, '../prompts/seo.md');
    this.systemPrompt = readFileSync(promptPath, 'utf-8');
  }

  async run(draftPath: string, outputPath: string): Promise<SeoGeoOutput> {
    const startTime = Date.now();
    console.log(`[SeoGeoAgent] Start optimalisatie...`);

    
    let draftContent: string;
    try {
      draftContent = readFileSync(draftPath, 'utf-8');
    } catch (_e) {
      throw new Error(`[SeoGeoAgent] Kon concept blog niet inladen.`, { cause: _e });
    }

    const userPrompt = `
Optimaliseer het onderstaande artikel voor SEO en GEO.
Raak berekeningen en technische feiten niet aan.

### ARTIKEL ###
${draftContent}
    `;

    try {
      const responseText = await this.llm.generate({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.3,
        responseFormat: 'json_object'
      });

      const rawJson = JSON.parse(responseText);
      const validatedData = SeoGeoOutputSchema.parse(rawJson);
      
      const duration = Date.now() - startTime;
      console.log(`[SeoGeoAgent] Optimalisatie afgerond in ${duration}ms.`);

      writeFileSync(outputPath, JSON.stringify(validatedData, null, 2), 'utf-8');
      
      return validatedData;
    } catch (error) {
      console.error('[SeoGeoAgent] Fout tijdens optimalisatie:', error);
      throw error;
    }
  }
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('SeoGeoAgent.ts')) {
  const draftPath = path.join(process.cwd(), 'draft.md');
  const outputPath = path.join(process.cwd(), 'seo-optimized.json');
  
  const agent = new SeoGeoAgent();
  
  agent.run(draftPath, outputPath).then(() => {
    console.log(`✅ Opgeslagen in ${outputPath}`);
  }).catch(() => process.exit(1));
}
