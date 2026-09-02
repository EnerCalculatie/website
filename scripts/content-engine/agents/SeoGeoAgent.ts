import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import {
  SeoGeoOutputSchema, SeoGeoOutput,
  SeoBriefOutputSchema, SeoBriefOutput,
  SeoAuditOutputSchema, SeoAuditOutput,
  computeSeoAuditPassed
} from '../schemas/seo';

/**
 * Puur — geen I/O. Verwijdert een eigen FAQ-sectie uit de markdown-body, mocht het model
 * `seo.md`'s instructie ("FAQ uitsluitend in het `faq`-JSON-veld") toch negeren. Defensief
 * vangnet, niet de primaire fix (die zit in de prompt) — voorkomt dat een dubbele FAQ ooit
 * live komt, ook bij een promptregressie. Zoekt een "## Veelgestelde vragen"/"## FAQ"-kop
 * (H2 of H3, hoofdletterongevoelig) en knipt alles vanaf die kop tot het einde van de content —
 * een FAQ-sectie staat in de praktijk altijd als laatste sectie van het artikel.
 */
export function stripFaqSectionFromContent(content: string): { content: string; stripped: boolean } {
  const match = content.match(/\n#{2,3}\s*(veelgestelde vragen|faq)\b[^\n]*\n/i);
  if (!match || match.index === undefined) return { content, stripped: false };
  return { content: content.slice(0, match.index).trimEnd(), stripped: true };
}

/**
 * Puur — geen I/O. Verwijdert exacte en semantisch vrijwel identieke FAQ-vragen (behoudt de
 * eerste). "Semantisch vrijwel identiek": genormaliseerde (lowercase, leestekens weg,
 * whitespace-genormaliseerde) woordenset-overlap (Jaccard) boven 0.8 — geen embeddings/LLM-call
 * nodig voor dit soort bijna-letterlijke duplicaten.
 */
export function dedupeFaq<T extends { question: string; answer: string }>(faq: T[]): T[] {
  const normalize = (s: string) => new Set(s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(Boolean));
  const jaccard = (a: Set<string>, b: Set<string>) => {
    if (a.size === 0 && b.size === 0) return 1;
    const intersection = [...a].filter((w) => b.has(w)).length;
    const union = new Set([...a, ...b]).size;
    return union === 0 ? 1 : intersection / union;
  };

  const kept: T[] = [];
  const keptSets: Set<string>[] = [];
  for (const item of faq) {
    const itemSet = normalize(item.question);
    const isDuplicate = keptSets.some((s) => jaccard(s, itemSet) > 0.8);
    if (!isDuplicate) {
      kept.push(item);
      keptSets.push(itemSet);
    }
  }
  return kept;
}

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

    const rawJson = await this.llm.generateJSON({
      systemPrompt: this.briefPrompt,
      userPrompt,
      temperature: 0.2,
    });

    return SeoBriefOutputSchema.parse(rawJson);
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

    const rawJson = await this.llm.generateJSON({
      systemPrompt: this.auditPrompt,
      userPrompt,
      temperature: 0.1,
    });

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
      const rawJson = await this.llm.generateJSON({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.3,
      });

      let validatedData = SeoGeoOutputSchema.parse(rawJson);

      // Defensief vangnet tegen dubbele FAQ (zie prompts/seo.md) — negeert het model de
      // instructie toch, dan wordt een eigen FAQ-sectie in de body hier alsnog verwijderd
      // (BlogPostLayout rendert het `faq`-veld al als eigen zichtbaar blok) en worden
      // exacte/vrijwel-identieke FAQ-vragen in het `faq`-veld zelf gededupliceerd.
      const { content: contentWithoutFaqSection, stripped } = stripFaqSectionFromContent(validatedData.content);
      if (stripped) {
        console.warn('[SeoGeoAgent] Waarschuwing: eigen FAQ-sectie in de content-body gevonden en verwijderd (dubbele-FAQ-vangnet) — zie prompts/seo.md.');
      }
      const dedupedFaq = validatedData.faq ? dedupeFaq(validatedData.faq) : validatedData.faq;
      if (dedupedFaq && validatedData.faq && dedupedFaq.length < validatedData.faq.length) {
        console.warn(`[SeoGeoAgent] Waarschuwing: ${validatedData.faq.length - dedupedFaq.length} dubbele/vrijwel-identieke FAQ-vraag/vragen verwijderd.`);
      }
      validatedData = { ...validatedData, content: contentWithoutFaqSection, faq: dedupedFaq };

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
