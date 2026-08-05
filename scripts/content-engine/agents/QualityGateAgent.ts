import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { QualityGateOutputSchema, QualityGateOutput } from '../schemas/quality-gate';

export class QualityGateAgent {
  private llm: LLMService;
  private systemPrompt: string;

  constructor() {
    this.llm = new LLMService();
    const promptPath = path.join(import.meta.dirname, '../prompts/quality-gate.md');
    this.systemPrompt = readFileSync(promptPath, 'utf-8');
  }

  async run(articlePath: string, factCheckJsonPath: string, techReviewJsonPath: string, outputPath: string): Promise<QualityGateOutput> {
    const startTime = Date.now();
    console.log(`[QualityGateAgent] Start eindcontrole...`);

    let content = '';
    let factCheck = '';
    let techReview = '';
    try {
      const seoJson = JSON.parse(readFileSync(articlePath, 'utf-8'));
      content = seoJson.content;
      factCheck = readFileSync(factCheckJsonPath, 'utf-8');
      techReview = readFileSync(techReviewJsonPath, 'utf-8');
    } catch (_e) {
      console.warn('[QualityGateAgent] Waarschuwing: Niet alle inputbestanden gevonden. Zorg dat de pijplijn volledig is doorlopen.');
    }

    const userPrompt = `
Beoordeel of dit artikel klaar is voor publicatie.

### FACT CHECK STATUS ###
${factCheck}

### TECHNICAL REVIEW STATUS ###
${techReview}

### DEFINITIEVE ARTIKEL ###
${content}
    `;

    try {
      const responseText = await this.llm.generate({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.1,
        responseFormat: 'json_object'
      });

      const rawJson = JSON.parse(responseText);
      const validatedData = QualityGateOutputSchema.parse(rawJson);
      
      const duration = Date.now() - startTime;
      console.log(`[QualityGateAgent] Controle afgerond in ${duration}ms. Passed: ${validatedData.passed}`);

      writeFileSync(outputPath, JSON.stringify(validatedData, null, 2), 'utf-8');
      
      return validatedData;
    } catch (error) {
      console.error('[QualityGateAgent] Fout tijdens eindcontrole:', error);
      throw error;
    }
  }
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('QualityGateAgent.ts')) {
  const articlePath = path.join(process.cwd(), 'seo-optimized.json');
  const factCheckPath = path.join(process.cwd(), 'fact-check.json');
  const techReviewPath = path.join(process.cwd(), 'technical-review.json');
  const outputPath = path.join(process.cwd(), 'quality-report.json');
  
  const agent = new QualityGateAgent();
  
  agent.run(articlePath, factCheckPath, techReviewPath, outputPath).then((res) => {
    console.log(`✅ Opgeslagen in ${outputPath} (Passed: ${res.passed})`);
  }).catch(() => process.exit(1));
}
