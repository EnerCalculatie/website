/**
 * Laadt de vaste bronnenlijst (ai-context/trusted-sources.json) en fetcht
 * brontekst live voor fact-checking. Geen zoekmachine: alleen de exacte URL's
 * uit de registry worden gefetcht, nooit een door het model verzonnen URL.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { buildSourceLookup } from './claim-extractor.mjs';

const DEFAULT_SOURCES_PATH = path.resolve(import.meta.dirname, '..', '..', 'ai-context', 'trusted-sources.json');

/**
 * @param {string} [sourcesPath]
 * @returns {Promise<{sources: object[], byKey: Map<string, object>}>}
 */
export async function loadTrustedSources(sourcesPath = DEFAULT_SOURCES_PATH) {
  const raw = await readFile(sourcesPath, 'utf8');
  const parsed = JSON.parse(raw);
  const sources = Array.isArray(parsed.sources) ? parsed.sources : [];
  return { sources, byKey: buildSourceLookup(sources) };
}

/** Ruwe HTML naar platte tekst — geen DOM-parser-dependency, alleen genoeg voor een fact-check-prompt. */
function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&(lt|gt|quot|#39);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * @param {string} url
 * @param {{fetchImpl?: typeof fetch, maxChars?: number}} [opts]
 * @returns {Promise<{ok:boolean, text:string, status?:number, error?:string}>}
 */
export async function fetchSourceText(url, { fetchImpl = fetch, maxChars = 20000 } = {}) {
  try {
    const res = await fetchImpl(url, {
      headers: { 'user-agent': 'EnerCalculatie-FactCheck/1.0 (+https://enercalculatie.nl)' },
    });
    if (!res.ok) {
      return { ok: false, text: '', status: res.status, error: `HTTP ${res.status}` };
    }
    const html = await res.text();
    return { ok: true, text: stripHtml(html).slice(0, maxChars), status: res.status };
  } catch (err) {
    return { ok: false, text: '', error: err.message };
  }
}

/**
 * Fetcht brontekst voor een set claims, met een in-memory cache per run zodat
 * meerdere claims op dezelfde bron niet dubbel worden gefetcht.
 * @param {Array<{sourceKey: string|null, source: object|null}>} claims
 * @param {{fetchImpl?: typeof fetch}} [opts]
 * @returns {Promise<Map<string, {ok:boolean, text:string, error?:string}>>} sourceKey -> fetch result
 */
export async function fetchSourcesForClaims(claims, opts = {}) {
  const cache = new Map();
  const uniqueSources = new Map();
  for (const claim of claims) {
    if (claim.sourceKey && claim.source && !uniqueSources.has(claim.sourceKey)) {
      uniqueSources.set(claim.sourceKey, claim.source);
    }
  }
  await Promise.all(
    [...uniqueSources.entries()].map(async ([key, source]) => {
      cache.set(key, await fetchSourceText(source.url, opts));
    })
  );
  return cache;
}
