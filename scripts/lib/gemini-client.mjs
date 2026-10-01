/**
 * Gedeelde Gemini-client voor alle content-engine-scripts (LLMService.ts,
 * plan-content.mjs, generate-social.mjs).
 *
 * Aanleiding (2026-10-01): sinds de overstap naar uitsluitend de gratis key
 * faalden 29-09, 30-09 en 01-10 alle runs op `503 UNAVAILABLE` ("model is
 * overloaded"). De oude retry (2s/4s/8s, 3 pogingen, één model) is op de free
 * tier veel te kort: een overbelast model blijft vaak minuten overbelast, en
 * één mislukte call van de ~10 in de pipeline gooit het hele artikel weg.
 *
 * Deze client:
 *  - retryt tijdelijke fouten (408/429/500/502/503/504 + netwerkfouten/timeouts)
 *    met exponentiële backoff + jitter, en respecteert een `retryDelay` die
 *    Gemini zelf in een 429-respons meegeeft;
 *  - valt bij aanhoudende overbelasting, een uitgeput dagquotum of een
 *    onbekend model (404) terug op een ander gratis flash-model. Welke modellen
 *    beschikbaar zijn, wordt bij de eerste fallback live opgevraagd via
 *    ListModels (of expliciet via GEMINI_FALLBACK_MODELS, komma-gescheiden) —
 *    geen hardgecodeerde modelnamen die over een paar maanden niet meer bestaan;
 *  - blijft daarna bij het model dat werkte, zodat de rest van de run niet
 *    steeds opnieuw het overbelaste primaire model probeert.
 */
import { GEMINI_API_KEY, GEMINI_MODEL } from './gemini-config.mjs';

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const RETRYABLE_STATUSES = new Set([408, 429, 500, 502, 503, 504]);

const MAX_ATTEMPTS_PER_MODEL = Number(process.env.GEMINI_MAX_ATTEMPTS_PER_MODEL || 5);
const BASE_DELAY_MS = Number(process.env.GEMINI_RETRY_BASE_MS || 5000);
const MAX_DELAY_MS = 60000;
const REQUEST_TIMEOUT_MS = 180000;
const MAX_FALLBACK_MODELS = 3;

export class GeminiApiError extends Error {
  constructor(status, model, body) {
    super(`Gemini API Error (${status}, model ${model}): ${body}`);
    this.status = status;
    this.model = model;
    this.body = body;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Exponentiële backoff met jitter, begrensd op MAX_DELAY_MS. */
export function backoffDelay(attempt, base = BASE_DELAY_MS) {
  const exp = Math.min(MAX_DELAY_MS, base * 2 ** (attempt - 1));
  return Math.round(exp * (0.75 + Math.random() * 0.5));
}

/** Leest `retryDelay` ("17s") uit een Gemini-foutrespons, in ms. */
export function parseRetryDelay(body) {
  const m = /"retryDelay"\s*:\s*"(\d+(?:\.\d+)?)s"/.exec(body ?? '');
  return m ? Math.min(MAX_DELAY_MS, Math.ceil(Number(m[1]) * 1000)) : null;
}

/** Dagquotum op (free tier: per model per dag) — retryen op hetzelfde model heeft geen zin. */
function isDailyQuota(status, body) {
  return status === 429 && /PerDay|per day|daily/i.test(body ?? '');
}

/**
 * Kiest fallback-modellen uit een ListModels-respons: generateContent-capabele
 * flash-modellen, geen gespecialiseerde varianten (image/tts/audio/live/...),
 * stabiel vóór preview, hoogste versie eerst, '-lite' achteraan.
 */
export function pickFallbackModels(models, primary, max = MAX_FALLBACK_MODELS) {
  const version = (name) => Number(/gemini-(\d+(?:\.\d+)?)/.exec(name)?.[1] ?? 0);
  return models
    .filter((m) => (m.supportedGenerationMethods ?? []).includes('generateContent'))
    .map((m) => m.name.replace(/^models\//, ''))
    .filter((n) => n !== primary && /^gemini-.*flash/.test(n))
    .filter((n) => !/(image|tts|audio|live|embedding|vision|thinking-exp|computer-use|robotics)/.test(n))
    .sort((a, b) =>
      Number(/preview|exp/.test(a)) - Number(/preview|exp/.test(b)) ||
      Number(/lite/.test(a)) - Number(/lite/.test(b)) ||
      version(b) - version(a)
    )
    .slice(0, max);
}

let fallbackModelsPromise = null;
async function getFallbackModels() {
  if (!fallbackModelsPromise) {
    fallbackModelsPromise = (async () => {
      if (process.env.GEMINI_FALLBACK_MODELS) {
        return process.env.GEMINI_FALLBACK_MODELS.split(',').map((s) => s.trim()).filter(Boolean);
      }
      try {
        const res = await fetch(`${API_BASE}/models?pageSize=1000&key=${GEMINI_API_KEY}`, {
          signal: AbortSignal.timeout(30000),
        });
        if (!res.ok) throw new Error(`ListModels ${res.status}`);
        const data = await res.json();
        const picked = pickFallbackModels(data.models ?? [], GEMINI_MODEL);
        console.log(`[gemini-client] Fallback-modellen: ${picked.join(', ') || '(geen gevonden)'}`);
        return picked;
      } catch (err) {
        console.warn(`[gemini-client] Kon fallback-modellen niet ophalen: ${err.message}`);
        return [];
      }
    })();
  }
  return fallbackModelsPromise;
}

/** Model dat in dit proces als laatste werkte — volgende calls beginnen daar. */
let stickyModel = null;

/** Alleen voor tests: reset module-state. */
export function _resetGeminiClientState() {
  stickyModel = null;
  fallbackModelsPromise = null;
}

async function callModel(model, body) {
  const url = `${API_BASE}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_MODEL; attempt++) {
    let res;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (err) {
      // Netwerkfout of timeout: altijd tijdelijk.
      lastError = new GeminiApiError(0, model, `netwerkfout: ${err.message}`);
      if (attempt < MAX_ATTEMPTS_PER_MODEL) {
        const delay = backoffDelay(attempt);
        console.warn(`[gemini-client] ${model}: netwerkfout (${err.message}) — poging ${attempt}/${MAX_ATTEMPTS_PER_MODEL}, retry over ${delay}ms.`);
        await sleep(delay);
        continue;
      }
      break;
    }

    if (res.ok) return res.json();

    const text = await res.text();
    lastError = new GeminiApiError(res.status, model, text);
    if (res.status === 404 || isDailyQuota(res.status, text)) break; // volgend model
    if (!RETRYABLE_STATUSES.has(res.status)) throw lastError; // 400/401/403: configuratie-/promptfout
    if (attempt < MAX_ATTEMPTS_PER_MODEL) {
      const delay = parseRetryDelay(text) ?? backoffDelay(attempt);
      console.warn(`[gemini-client] ${model}: API-fout ${res.status} — poging ${attempt}/${MAX_ATTEMPTS_PER_MODEL}, retry over ${delay}ms.`);
      await sleep(delay);
    }
  }
  lastError.exhausted = true;
  throw lastError;
}

/**
 * Doet een generateContent-call met retry + modelfallback. Geeft de ruwe
 * Gemini-respons (`{ candidates: [...] }`) terug, plus het gebruikte model.
 * @param {object} body generateContent-request-body
 * @returns {Promise<{data: any, model: string}>}
 */
export async function geminiGenerate(body) {
  const tried = new Set();
  let lastError;
  const order = async function* () {
    if (stickyModel) yield stickyModel;
    yield GEMINI_MODEL;
    for (const m of await getFallbackModels()) yield m;
  };
  for await (const model of order()) {
    if (tried.has(model)) continue;
    tried.add(model);
    try {
      const data = await callModel(model, body);
      if (model !== GEMINI_MODEL && stickyModel !== model) {
        console.warn(`[gemini-client] Uitgeweken naar fallback-model ${model}.`);
      }
      stickyModel = model;
      return { data, model };
    } catch (err) {
      if (!(err instanceof GeminiApiError) || !err.exhausted) throw err;
      lastError = err;
      console.warn(`[gemini-client] ${model} blijft falen (${err.status}) — volgend model proberen.`);
    }
  }
  throw lastError;
}
