import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { TechnicalReviewOutputSchema, TechnicalReviewOutput } from '../schemas/technical-reviewer';

export class TechnicalReviewerAgent {
  private llm: LLMService;
  private systemPrompt: string;

  constructor() {
    this.llm = new LLMService();
    const promptPath = path.join(import.meta.dirname, '../prompts/technical-reviewer.md');
    this.systemPrompt = readFileSync(promptPath, 'utf-8');
  }

  async run(draftPath: string, outputPath: string): Promise<TechnicalReviewOutput> {
    const startTime = Date.now();
    console.log(`[TechnicalReviewerAgent] Start review door Senior Inspecteur...`);

    let draftContent = '';
    try {
      draftContent = readFileSync(draftPath, 'utf-8');
    } catch (e) {
      throw new Error(`[TechnicalReviewerAgent] Kon concept blog niet inladen.`);
    }

    const userPrompt = `
Beoordeel het onderstaande blogartikel met een strenge elektrotechnische blik.

### HET GESCHREVEN ARTIKEL ###
${draftContent}
    `;

    try {
      const responseText = await this.llm.generate({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.1, // Zeer laag, we willen geen creatieve reviews
        responseFormat: 'json_object'
      });

      const rawJson = JSON.parse(responseText);
      const validatedData = TechnicalReviewOutputSchema.parse(rawJson);
      
      const duration = Date.now() - startTime;
      console.log(`[TechnicalReviewerAgent] Review afgerond in ${duration}ms. ${validatedData.length} verbeterpunten gevonden.`);

      writeFileSync(outputPath, JSON.stringify(validatedData, null, 2), 'utf-8');
      
      return validatedData;
    } catch (error) {
      console.error('[TechnicalReviewerAgent] Fout tijdens review:', error);
      throw error;
    }
  }
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('TechnicalReviewerAgent.ts')) {
  const draftPath = path.join(process.cwd(), 'draft.md');
  const outputPath = path.join(process.cwd(), 'technical-review.json');
  
  const agent = new TechnicalReviewerAgent();
  
  agent.run(draftPath, outputPath).then((res) => {
    console.log(`✅ Opgeslagen in ${outputPath} (${res.length} issues)`);
  }).catch(() => process.exit(1));
}
