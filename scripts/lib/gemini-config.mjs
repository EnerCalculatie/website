/**
 * Gemini-API-key en -model resolutie, gedeeld door plan-content.mjs en
 * generate-blog-post.mjs. GEMINI_TIER schakelt tussen de gratis en de betaalde
 * Gemini-key zonder secret-waarden te hoeven aanpassen — alleen de var omzetten
 * (lokaal in .env, in CI via vars.GEMINI_TIER in daily-blog-post.yml).
 */

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('MISLUKT — Reden: GEMINI_API_KEY ontbreekt als environment variable.');
  process.exit(1);
}

// Kies zelf een model via de GEMINI_MODEL env var/secret, bv. 'gemini-1.5-flash'.
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
