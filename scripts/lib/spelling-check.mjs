/**
 * Spelling-/grammaticacontrole via de publieke LanguageTool-API (nl-NL, geen
 * API-key nodig, gratis endpoint). Best-effort: als de publieke API niet
 * bereikbaar is of rate-limit geeft, wordt dat gelogd en de check overgeslagen
 * (lege array) — een derde-partij-storing mag een artikel niet blokkeren dat
 * verder aan alle eigen kwaliteitseisen voldoet.
 *
 * Alleen TYPOS/GRAMMAR/CASING/PUNCTUATION zijn blokkerend. STYLE-categorie
 * (bv. "deze zin kan korter") wordt genegeerd — te subjectief, te veel
 * fout-positieven op legitieme vaktaal.
 */

const LANGUAGETOOL_URL = 'https://api.languagetool.org/v2/check';
const BLOCKING_CATEGORIES = new Set(['TYPOS', 'GRAMMAR', 'CASING', 'PUNCTUATION']);
const MAX_REPORTED = 10;

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

  const blocking = (data.matches ?? []).filter((m) => BLOCKING_CATEGORIES.has(m.rule?.category?.id));
  if (blocking.length === 0) return [];

  return blocking.slice(0, MAX_REPORTED).map((m) => {
    const context = m.context?.text?.slice(
      Math.max(0, (m.context?.offset ?? 0) - 15),
      (m.context?.offset ?? 0) + (m.context?.length ?? 0) + 15
    ) ?? '';
    return `spelling/grammatica (${m.rule?.category?.id}): "${context.trim()}" — ${m.message}`;
  });
}
