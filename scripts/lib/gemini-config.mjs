/**
 * Gemini-API-key en -model resolutie, gedeeld door plan-content.mjs en
 * generate-blog-post.mjs. GEMINI_TIER schakelt tussen de gratis en de betaalde
 * Gemini-key zonder secret-waarden te hoeven aanpassen — alleen de var omzetten
 * (lokaal in .env, in CI via vars.GEMINI_TIER in daily-blog-post.yml).
 */

export const GEMINI_TIER = (process.env.GEMINI_TIER || 'free').toLowerCase();

function resolveApiKey() {
  if (GEMINI_TIER === 'paid') {
    const key = process.env.GEMINI_API_KEY_PAID;
    if (!key) {
      console.error('MISLUKT — Reden: GEMINI_TIER=paid maar GEMINI_API_KEY_PAID ontbreekt als environment variable.');
      process.exit(1);
    }
    return key;
  }
  if (GEMINI_TIER !== 'free') {
    console.error(`MISLUKT — Reden: onbekende GEMINI_TIER "${process.env.GEMINI_TIER}" (verwacht "free" of "paid").`);
    process.exit(1);
  }
  // GEMINI_API_KEY blijft werken als fallback zodat bestaande lokale .env-bestanden
  // en al gezette secrets niet meteen breken bij de introductie van deze tier-switch.
  const key = process.env.GEMINI_API_KEY_FREE || process.env.GEMINI_API_KEY;
  if (!key) {
    console.error('MISLUKT — Reden: GEMINI_API_KEY_FREE (of GEMINI_API_KEY) ontbreekt als environment variable.');
    process.exit(1);
  }
  return key;
}

export const GEMINI_API_KEY = resolveApiKey();

// Kies zelf een model via de GEMINI_MODEL env var/secret, bv. 'gemini-1.5-flash'.
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
