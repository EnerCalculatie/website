import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { MarketingGateOutputSchema, MarketingGateOutput, computeMarketingGatePassed } from '../schemas/marketing-gate';

/** Beoordeelt marketing/contentkwaliteit — apart van, en onafhankelijk van, de factual/technical
 * QualityGateAgent (die blijft ongewijzigd de enige harde gate voor feitelijke juistheid). Enige
 * blokkerende regel hier: practicalUsefulness < 4/10 (zie schemas/marketing-gate.ts). Alle overige
 * dimensies zijn non-blocking signaal. Zie BLOG_CONTENT_GUIDELINES.md. */
export class MarketingGateAgent {
  private llm: LLMService;
  private systemPrompt: string;

  constructor() {
    this.llm = new LLMService();
    const promptPath = path.join(import.meta.dirname, '../prompts/marketing-gate.md');
    this.systemPrompt = readFileSync(promptPath, 'utf-8');
  }

  async run(seoJsonPath: string, outputPath: string): Promise<MarketingGateOutput> {
    const startTime = Date.now();
    console.log(`[MarketingGateAgent] Start marketing/contentkwaliteit-beoordeling...`);

    const seoJson = JSON.parse(readFileSync(seoJsonPath, 'utf-8'));

    const userPrompt = `
Beoordeel dit artikel op marketing/contentkwaliteit.

### ARTIKEL ###
Title: ${seoJson.title}
Heeft visual: ${seoJson.visual ? 'ja (' + seoJson.visual.type + ')' : 'nee'}
FAQ-aantal: ${(seoJson.faq ?? []).length}

${seoJson.content}
    `;

    try {
      const rawJson = await this.llm.generateJSON({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.2,
      });

      const validated = MarketingGateOutputSchema.parse(rawJson);
      const result: MarketingGateOutput = { ...validated, passed: computeMarketingGatePassed(validated.scores) };

      const duration = Date.now() - startTime;
      console.log(`[MarketingGateAgent] Beoordeling afgerond in ${duration}ms. Passed: ${result.passed} (practicalUsefulness: ${result.scores.practicalUsefulness}/10)`);

      writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
      return result;
    } catch (error) {
      console.error('[MarketingGateAgent] Fout tijdens beoordeling:', error);
      throw error;
    }
  }
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('MarketingGateAgent.ts')) {
  const seoJsonPath = path.join(process.cwd(), 'seo-optimized.json');
  const outputPath = path.join(process.cwd(), 'marketing-report.json');

  const agent = new MarketingGateAgent();
  agent.run(seoJsonPath, outputPath).then((res) => {
    console.log(`✅ Opgeslagen in ${outputPath} (Passed: ${res.passed})`);
  }).catch(() => process.exit(1));
}
