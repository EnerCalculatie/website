/**
 * Spelling-/grammaticacontrole via de publieke LanguageTool-API (nl-NL, geen
 * API-key nodig, gratis endpoint). Best-effort: als de publieke API niet
 * bereikbaar is of rate-limit geeft, wordt dat gelogd en de check overgeslagen
 * (lege array) — een derde-partij-storing mag een artikel niet blokkeren dat
 * verder aan alle eigen kwaliteitseisen voldoet.
 *
 * Alleen GRAMMAR/PUNCTUATION zijn blokkerend. TYPOS/CASING/STYLE zijn dat
 * bewust niet: drie testruns op echte EnerCalculatie-content lieten zien dat
 * TYPOS bijna uitsluitend false positives geeft op Engelse vaktermen ("Dynamic
 * Load Balancing", "Smart Charging", "peak shaving") en legitieme NL-
 * samenstellingen ("laadpaaltechnologie", "winstbelastingvoordeel",
 * "app-sturing") die simpelweg niet in het NL-woordenboek zitten — een
 * allowlist bijhouden is daar whack-a-mole, elk artikel introduceert nieuwe
 * jargon. Zelfde precisie-boven-recall-afweging als `checkSavingsClaims`
 * hieronder in content-checks.mjs. TYPOS/CASING worden wél gelogd (niet
 * geretourneerd) zodat een echte fout — bv. een taalfout die als TYPOS
 * binnenkwam in een testrun (het model schreef "Neben" i.p.v. "Naast") — nog
 * zichtbaar is in de Actions-log voor een mens, zonder de pipeline te blokkeren.
 *
 * `ai-context/known-terms.json` filtert ook de blokkerende categorieën alvast
 * op bekend jargon/afkortingen (MIA, VAMIL, OCPP...) — Pascal breidt zelf uit,
 * geen code-wijziging nodig.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const LANGUAGETOOL_URL = 'https://api.languagetool.org/v2/check';
const BLOCKING_CATEGORIES = new Set(['GRAMMAR', 'PUNCTUATION']);
const LOGGED_ONLY_CATEGORIES = new Set(['TYPOS', 'CASING']);
const MAX_REPORTED = 10;
const KNOWN_TERMS_PATH = path.join(import.meta.dirname, '..', '..', 'ai-context', 'known-terms.json');

let knownTermsCache;
async function loadKnownTerms() {
  if (knownTermsCache) return knownTermsCache;
  try {
    knownTermsCache = JSON.parse(await readFile(KNOWN_TERMS_PATH, 'utf8'));
  } catch {
    knownTermsCache = [];
  }
  return knownTermsCache;
}

function isKnownTerm(flagged, knownTerms) {
  const lower = flagged.toLowerCase();
  return knownTerms.some((term) => lower.startsWith(term.toLowerCase()));
}

/**
 * @param {string} text (HTML/JSX toegestaan, wordt gestript)
 * @returns {Promise<string[]>} lege array = akkoord of check niet beschikbaar
 */
export async function checkSpellingGrammar(text) {
  const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!plain) return [];

  let data;
  try {
    const res = await fetch(LANGUAGETOOL_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ text: plain, language: 'nl' }),
    });
    if (!res.ok) {
      console.warn(`Spellingcheck overgeslagen — LanguageTool gaf ${res.status}.`);
      return [];
    }
    data = await res.json();
  } catch (err) {
    console.warn(`Spellingcheck overgeslagen — LanguageTool onbereikbaar: ${err.message}`);
    return [];
  }

  const knownTerms = await loadKnownTerms();
  const notKnownTerm = (m) => {
    const flagged = m.context?.text?.slice(m.context.offset, m.context.offset + m.context.length) ?? '';
    return !isKnownTerm(flagged, knownTerms);
  };

  const loggedOnly = (data.matches ?? []).filter((m) => LOGGED_ONLY_CATEGORIES.has(m.rule?.category?.id) && notKnownTerm(m));
  if (loggedOnly.length > 0) {
    console.log(`Spellingcheck (niet-blokkerend, ter info): ${loggedOnly.length} TYPOS/CASING-treffer(s) — ${loggedOnly.slice(0, MAX_REPORTED).map((m) => `"${m.context?.text?.slice(m.context.offset, m.context.offset + m.context.length)}"`).join(', ')}`);
  }

  const blocking = (data.matches ?? []).filter((m) => BLOCKING_CATEGORIES.has(m.rule?.category?.id) && notKnownTerm(m));
  if (blocking.length === 0) return [];

  return blocking.slice(0, MAX_REPORTED).map((m) => {
    const context = m.context?.text?.slice(
      Math.max(0, (m.context?.offset ?? 0) - 15),
      (m.context?.offset ?? 0) + (m.context?.length ?? 0) + 15
    ) ?? '';
    return `spelling/grammatica (${m.rule?.category?.id}): "${context.trim()}" — ${m.message}`;
  });
}
