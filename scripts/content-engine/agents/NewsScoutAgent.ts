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

/**
 * Controleert of een door het model genoemde URL echt bestaat (2xx/3xx). Vangnet voor als Gemini
 * geen groundingMetadata meestuurt: een verzonnen URL valt hier af.
 */
export async function verifyUrl(url: string): Promise<boolean> {
  if (!/^https?:\/\//.test(url)) return false;
  try {
    // Browser-User-Agent: sommige nieuwssites weigeren de standaard Node-UA, wat een echte bron als 'kapot' zou afwijzen.
    const res = await fetch(url, {
      method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnerCalculatieBot/1.0; +https://www.enercalculatie.nl)' },
    });
    return res.ok;
  } catch {
    return false;
  }
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

    const { text, sources: groundingSources, searchQueries } = await this.llm.generateGrounded({
      systemPrompt: this.systemPrompt,
      userPrompt,
      temperature: 0.2,
    });

    console.log(`[NewsScoutAgent] Google Search: ${searchQueries.length} zoekopdracht(en), ${groundingSources.length} grounding-bron(nen).`);
    const parsed = NewsStorySchema.parse(extractJson(text));

    // Grounding-bronnen hebben voorrang. Ontbreken die (Gemini stuurt niet altijd groundingMetadata
    // mee), dan tellen alleen door het model genoemde URL's die live bereikbaar blijken.
    let sources = groundingSources;
    if (parsed.found && sources.length === 0 && parsed.sourceUrls?.length) {
      const checked = await Promise.all(parsed.sourceUrls.map(async (url) => ((await verifyUrl(url)) ? url : null)));
      sources = checked.filter((u): u is string => !!u).map((url) => ({ title: new URL(url).hostname, url }));
      console.log(`[NewsScoutAgent] ${sources.length}/${parsed.sourceUrls.length} door het model genoemde URL's bereikbaar.`);
    }

    let story: NewsStory = { ...parsed, sources };
    const reject = (reason: string) => {
      console.warn(`[NewsScoutAgent] Afgewezen: ${reason}`);
      story = { found: false, rejectedReason: reason, headline: parsed.headline, publishedDate: parsed.publishedDate, sourceUrls: parsed.sourceUrls };
    };

    if (story.found && isStale(story.publishedDate)) {
      reject(`te oud of zonder datum (${story.publishedDate ?? 'geen datum'})`);
    } else if (story.found && sources.length === 0) {
      reject('geen verifieerbare bronnen');
    }

    writeFileSync(outputPath, JSON.stringify(story, null, 2), 'utf-8');
    console.log(story.found
      ? `[NewsScoutAgent] Gekozen: [${story.category}] ${story.headline} (${story.publishedDate}, ${sources.length} bronnen)`
      : '[NewsScoutAgent] Geen bruikbaar nieuws gevonden.');
    return story;
  }
}
