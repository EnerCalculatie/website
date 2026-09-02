import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import {
  SeoGeoOutputSchema, SeoGeoOutput,
  SeoBriefOutputSchema, SeoBriefOutput,
  SeoAuditOutputSchema, SeoAuditOutput,
  computeSeoAuditPassed
} from '../schemas/seo';

export class SeoGeoAgent {
  private llm: LLMService;
  private systemPrompt: string;
  private briefPrompt: string;
  private auditPrompt: string;

  constructor() {
    this.llm = new LLMService();
    const promptPath = path.join(import.meta.dirname, '../prompts/seo.md');
    this.systemPrompt = readFileSync(promptPath, 'utf-8');
    this.briefPrompt = readFileSync(path.join(import.meta.dirname, '../prompts/seo-brief.md'), 'utf-8');
    this.auditPrompt = readFileSync(path.join(import.meta.dirname, '../prompts/seo-audit.md'), 'utf-8');
  }

  /** Stap 1 van 3 (vóór Research/Writer) — zie prompts/seo-brief.md. `topic`: de werktitel uit de
   * content-backlog. `keyword`/`intent` komen uit content-plan.json (plan-content.mjs kent ze al
   * toe, run-pipeline.ts gaf ze tot nu toe niet door — dit is het moment waarop ze weer gebruikt
   * worden i.p.v. weggegooid). */
  async brief(topic: string, keyword?: string, intent?: string): Promise<SeoBriefOutput> {
    console.log(`[SeoGeoAgent] Start SEO/GEO-brief voor: "${topic}"...`);
    const userPrompt = `Werktitel: "${topic}"\nPrimair zoekwoord: "${keyword ?? '(onbekend)'}"\nIntentie: "${intent ?? '(onbekend)'}"\n\nStel het content-brief op.`;

    const responseText = await this.llm.generate({
      systemPrompt: this.briefPrompt,
      userPrompt,
      temperature: 0.2,
      responseFormat: 'json_object'
    });

    return SeoBriefOutputSchema.parse(JSON.parse(responseText));
  }

  /** Stap 3 van 3 (na optimize) — zie prompts/seo-audit.md. `passed` wordt hier zelf herberekend uit
   * de scores (computeSeoAuditPassed) i.p.v. blind op het LLM-`passed`-veld te vertrouwen — zelfde
   * defensieve patroon als de vaste drempels in schemas/seo.ts bedoeld zijn af te dwingen. */
  async audit(seoJsonPath: string, brief: SeoBriefOutput, outputPath: string): Promise<SeoAuditOutput> {
    console.log(`[SeoGeoAgent] Start SEO/GEO-audit...`);
    const seoJson = JSON.parse(readFileSync(seoJsonPath, 'utf-8'));

    const userPrompt = `
### SEO/GEO BRIEF (toets hiertegen) ###
${JSON.stringify(brief, null, 2)}

### GEOPTIMALISEERD ARTIKEL ###
Title: ${seoJson.title}
SEO Title: ${seoJson.seoTitle}
Description: ${seoJson.description}
Slug: ${seoJson.slug}
FAQ: ${JSON.stringify(seoJson.faq ?? [])}

${seoJson.content}
    `;

    const responseText = await this.llm.generate({
      systemPrompt: this.auditPrompt,
      userPrompt,
      temperature: 0.1,
      responseFormat: 'json_object'
    });

    const rawJson = JSON.parse(responseText);
    const validated = SeoAuditOutputSchema.parse(rawJson);
    const result: SeoAuditOutput = { ...validated, passed: computeSeoAuditPassed(validated.scores) };

    writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`[SeoGeoAgent] Audit afgerond. Passed: ${result.passed}`);
    return result;
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
      let validatedData = SeoGeoOutputSchema.parse(rawJson);

      // WriterAgent schrijft optioneel een `<draft>.extras.json` naast draft.md met visual-data uit
      // zijn json-extras-nevenoutput (zie prompts/writer.md). SeoGeoAgent optimaliseert alleen de
      // Markdown-body; de visual-data zelf komt hier ongewijzigd bij — geen LLM-bemoeienis met cijfers.
      const extrasPath = draftPath.replace(/\.md$/, '.extras.json');
      try {
        const extras = JSON.parse(readFileSync(extrasPath, 'utf-8'));
        if (extras?.visual && !validatedData.content.includes('[[VISUAL]]')) {
          console.warn('[SeoGeoAgent] Waarschuwing: visual-data aanwezig maar [[VISUAL]]-marker ontbreekt in het geoptimaliseerde artikel — visual wordt niet gerenderd (PublishAgent plaatst hem alleen op een expliciete marker).');
        }
        if (extras?.visual) {
          validatedData = { ...validatedData, visual: extras.visual };
        }
      } catch (_e) {
        // Geen extras-bestand — normale situatie voor artikelen zonder visual.
      }

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
