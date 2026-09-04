import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { KnowledgeBase } from '../services/KnowledgeBase';
import { SeoBriefOutput } from '../schemas/seo';

/** Splitst de Writer-respons in het pure Markdown-artikel en de optionele ```json-extras fenced
 * nevenoutput (visual-data, zie prompts/writer.md). Puur — geen I/O, apart testbaar. Geeft
 * `extras: undefined` terug als het blok ontbreekt of niet parseerbaar is (nooit een gooiende fout
 * — een kapot extras-blok mag het artikel zelf niet blokkeren, het artikel verschijnt dan gewoon
 * zonder visual). */
export function splitWriterResponse(responseText: string): { article: string; extras?: { visual?: unknown } } {
  const match = responseText.match(/```json-extras\s*\n([\s\S]*?)\n```/);
  if (!match) return { article: responseText.trimEnd() };

  const article = (responseText.slice(0, match.index) + responseText.slice((match.index ?? 0) + match[0].length)).trimEnd();
  try {
    const extras = JSON.parse(match[1]);
    return { article, extras };
  } catch (_e) {
    console.warn('[WriterAgent] Waarschuwing: json-extras-blok kon niet geparsed worden — artikel wordt zonder visual gepubliceerd.');
    return { article };
  }
}

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

  async run(
    topic: string,
    researchJsonPath: string,
    outputPath: string,
    feedback?: string,
    contentType?: 'SEO' | 'PRACTICAL',
    brief?: SeoBriefOutput
  ): Promise<string> {
    const startTime = Date.now();
    console.log(`[WriterAgent] Start schrijven artikel over: "${topic}"...`);

    // Laad input data
    
    let researchFacts: string;
    try {
      const raw = readFileSync(researchJsonPath, 'utf-8');
      researchFacts = `### ONDERZOEKSFEITEN VOOR DIT ARTIKEL ###\n${raw}`;
    } catch (_e) {
      throw new Error(`[WriterAgent] Kon research.json niet lezen op ${researchJsonPath}`, { cause: _e });
    }
    
    const kbContext = this.knowledgeBase.getCombinedContext(topic);
    const contentTypeLine = contentType ? `CONTENTTYPE: ${contentType}\n\n` : '';
    const briefLine = brief
      ? `SEO/GEO BRIEF:\n- Zoekintentie: ${brief.searchIntent}\n- Primaire zoekvraag: ${brief.primaryQuestion}\n- Secundaire zoekvragen: ${brief.secondaryQuestions.join('; ')}\n- Doelgroep/context: ${brief.audienceContext}\n\n`
      : '';

    let userPrompt: string;

    if (feedback && existsSync(outputPath)) {
      // Herschrijfmodus: stuur vorige draft + feedback mee
      const previousDraft = readFileSync(outputPath, 'utf-8');
      userPrompt = `
${contentTypeLine}${briefLine}Herschrijf het blogartikel over het onderwerp: "${topic}".
De kwaliteitscontrole heeft het vorige concept afgekeurd met de volgende feedback:

### FEEDBACK VAN KWALITEITSCONTROLE ###
${feedback}

### JOUW VORIGE CONCEPT (PAS DIT AAN) ###
${previousDraft}

### BRONMATERIAAL ###
${kbContext}

${researchFacts}

BELANGRIJK:
- Pas ALLEEN de passages aan die de feedback benoemt.
- Als een claim niet onderbouwd kan worden door het bronmateriaal: VERWIJDER de claim.
- Voeg GEEN nieuwe informatie toe die niet in de bronnen staat.
- Behoud de structuur en goede delen van het vorige concept.
      `;
    } else {
      // Eerste schrijfbeurt
      userPrompt = `
${contentTypeLine}${briefLine}Schrijf het blogartikel over het onderwerp: "${topic}".
Gebruik uitsluitend de volgende context. Mocht er informatie missen, verzin dan niks zelf.

${kbContext}

${researchFacts}
      `;
    }

    try {
      // responseFormat text omdat we markdown verwachten
      const responseText = await this.llm.generate({
        systemPrompt: this.systemPrompt,
        userPrompt,
        temperature: 0.3,
        responseFormat: 'text'
      });

      const duration = Date.now() - startTime;
      console.log(`[WriterAgent] Schrijven afgerond in ${duration}ms.`);

      const { article, extras } = splitWriterResponse(responseText);
      writeFileSync(outputPath, article, 'utf-8');

      const extrasPath = outputPath.replace(/\.md$/, '.extras.json');
      if (extras?.visual) {
        writeFileSync(extrasPath, JSON.stringify(extras, null, 2), 'utf-8');
        console.log(`[WriterAgent] Visual-data opgeslagen: ${extrasPath}`);
      } else if (existsSync(extrasPath)) {
        // Herschrijfmodus zonder visual dit keer — oude extras zijn dan stale, niet laten staan.
        writeFileSync(extrasPath, '{}', 'utf-8');
      }

      return article;
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
