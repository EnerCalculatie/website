import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { LLMService } from '../services/LLMService';
import { extractJson } from '../services/extractJson';
import { NEWS_CATEGORIES, NewsCategory, NewsStory, NewsStorySchema } from '../schemas/news';

/** Ouder dan dit = geen nieuws meer. Iets ruimer dan de 7 dagen uit de prompt (weekend, late indexering). */
export const MAX_NEWS_AGE_DAYS = 10;

type LogEntry = { date?: string; topic?: string; contentType?: string; category?: string };

/**
 * Puur. Kiest de nieuwscategorie die het langst niet aan bod kwam (nooit = eerst), zodat de
 * dinsdagen over de vijf onderwerpen rouleren i.p.v. elke week thuisbatterijen.
 */
export function pickPreferredCategory(log: LogEntry[]): NewsCategory {
  const lastSeen = new Map<string, string>();
  for (const entry of log) {
    if (entry.contentType !== 'NEWS' || !entry.category || !entry.date) continue;
    if ((lastSeen.get(entry.category) ?? '') < entry.date) lastSeen.set(entry.category, entry.date);
  }
  return [...NEWS_CATEGORIES].sort((a, b) => (lastSeen.get(a) ?? '').localeCompare(lastSeen.get(b) ?? ''))[0];
}

/** Puur. True als publishedDate (YYYY-MM-DD) ontbreekt, onleesbaar is of ouder dan maxAgeDays. */
export function isStale(publishedDate: string | undefined, now: Date = new Date(), maxAgeDays = MAX_NEWS_AGE_DAYS): boolean {
  if (!publishedDate) return true;
  const published = Date.parse(publishedDate);
  if (Number.isNaN(published)) return true;
  return (now.getTime() - published) / 86_400_000 > maxAgeDays;
}

/**
 * Zoekt (via Google Search-grounding) één actueel nieuwsbericht over laadpalen, airco,
 * zonnepanelen, warmtepompen of thuisbatterijen. Geeft `found: false` als er niets bruikbaars
 * is — run-pipeline.ts valt dan terug op een evergreen-artikel uit de backlog.
 */
export class NewsScoutAgent {
  private llm: LLMService;
  private systemPrompt: string;

  constructor() {
    this.llm = new LLMService();
    this.systemPrompt = readFileSync(path.join(import.meta.dirname, '../prompts/news-scout.md'), 'utf-8');
  }

  async run(rootDir: string, outputPath: string): Promise<NewsStory> {
    let log: LogEntry[] = [];
    try { log = JSON.parse(readFileSync(path.join(rootDir, 'ai-context/content-log.json'), 'utf-8')); } catch (_e) { /* geen log = geen historie */ }

    const preferred = pickPreferredCategory(log);
    const recent = log.slice(-30).map((e) => e.topic).filter(Boolean);
    const today = new Date().toISOString().slice(0, 10);
    console.log(`[NewsScoutAgent] Zoek nieuws (voorkeurscategorie: ${preferred})...`);

    const userPrompt = `Vandaag is het ${today}.
Voorkeurscategorie: ${preferred}

Recent gepubliceerd (niet herhalen):
${recent.map((t) => `- ${t}`).join('\n') || '(nog niets)'}

Zoek het beste nieuwsbericht volgens je instructies.`;

    const { text, sources } = await this.llm.generateGrounded({
      systemPrompt: this.systemPrompt,
      userPrompt,
      temperature: 0.2,
    });

    const parsed = NewsStorySchema.parse(extractJson(text));
    let story: NewsStory = { ...parsed, sources };

    if (story.found && isStale(story.publishedDate)) {
      console.warn(`[NewsScoutAgent] Gevonden bericht is te oud of zonder datum (${story.publishedDate ?? 'geen datum'}) — afgewezen.`);
      story = { found: false };
    }
    if (story.found && sources.length === 0) {
      console.warn('[NewsScoutAgent] Geen grounding-bronnen bij het bericht — afgewezen (niet verifieerbaar).');
      story = { found: false };
    }

    writeFileSync(outputPath, JSON.stringify(story, null, 2), 'utf-8');
    console.log(story.found
      ? `[NewsScoutAgent] Gekozen: [${story.category}] ${story.headline} (${story.publishedDate}, ${sources.length} bronnen)`
      : '[NewsScoutAgent] Geen bruikbaar nieuws gevonden.');
    return story;
  }
}
