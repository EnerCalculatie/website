/**
 * Gemini-API-key en -model resolutie, gedeeld door alle content-engine-scripts
 * (plan-content.mjs, backfill-sources.mjs, scripts/content-engine/services/
 * LLMService.ts). GEMINI_TIER schakelt daadwerkelijk tussen de gratis en de
 * betaalde Gemini-key (2026-08-07 — hiervoor las dit bestand alleen de losse
 * GEMINI_API_KEY env var en werd GEMINI_TIER nergens gebruikt, ondanks dat de
 * comment hier al wél beweerde dat het zo werkte).
 *
 * - 'paid'   → GEMINI_API_KEY_PAID (secret bestaat, geen fallback: een
 *              expliciete paid-run zonder die key moet hard falen, niet
 *              stil terugvallen op de gratis key).
 * - default  → GEMINI_API_KEY_FREE, met fallback op de oude GEMINI_API_KEY
 *              (secret GEMINI_API_KEY_FREE bestaat momenteel niet — de
 *              bestaande GEMINI_API_KEY ís de facto de gratis key).
 *
 * Welke tier een run gebruikt, wordt per workflow-trigger bepaald in
 * daily-blog-post.yml (cron = altijd 'free', workflow_dispatch = keuze via
 * input, default 'free') — nooit via de losse repo-variabele vars.GEMINI_TIER,
 * die staat op dit moment op 'paid' en zou anders de geplande di/do-run per
 * ongeluk op de betaalde key laten draaien.
 */

export const GEMINI_TIER = process.env.GEMINI_TIER || 'free';

export const GEMINI_API_KEY = GEMINI_TIER === 'paid'
  ? process.env.GEMINI_API_KEY_PAID
  : (process.env.GEMINI_API_KEY_FREE || process.env.GEMINI_API_KEY);

if (!GEMINI_API_KEY) {
  console.error(`MISLUKT — Reden: geen API-key gevonden voor GEMINI_TIER='${GEMINI_TIER}'. Verwacht ${GEMINI_TIER === 'paid' ? 'GEMINI_API_KEY_PAID' : 'GEMINI_API_KEY_FREE of GEMINI_API_KEY'} als environment variable.`);
  process.exit(1);
}

// Kies zelf een model via de GEMINI_MODEL env var/secret, bv. 'gemini-3.6-flash'.
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
