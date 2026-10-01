/**
 * Gemini-API-key en -model resolutie, gedeeld door alle content-engine-scripts
 * (plan-content.mjs, generate-social.mjs, backfill-sources.mjs,
 * scripts/content-engine/services/LLMService.ts via gemini-client.mjs).
 *
 * Uitsluitend de betaalde key (GEMINI_API_KEY_PAID). De gratis AI Studio-key
 * en de GEMINI_TIER-schakelaar zijn per 2026-10-01 verwijderd: de free tier gaf
 * structureel 503 "model overloaded" en blokkeerde dagenlang elke publicatie.
 * Geen fallback op een andere key — ontbreekt de betaalde key, dan faalt de
 * run hard i.p.v. stil op iets anders te draaien.
 */

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY_PAID;

if (!GEMINI_API_KEY) {
  console.error('MISLUKT — Reden: GEMINI_API_KEY_PAID ontbreekt als environment variable.');
  process.exit(1);
}

// Kies zelf een model via de GEMINI_MODEL env var/secret, bv. 'gemini-3.6-flash'.
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
