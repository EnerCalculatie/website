/**
 * Bronkwaliteit voor de fact-check-pipeline. Vaste domeinscores, geen dynamische
 * beoordeling — de bronnenlijst zelf (ai-context/trusted-sources.json) is al
 * handmatig gecureerd, dus dit is defense-in-depth: een bron die (per ongeluk of
 * bij toekomstige uitbreiding van de registry) onder REJECTED_QUALITY_THRESHOLD
 * scoort, wordt nooit gebruikt, ongeacht wat de registry zegt.
 */

export const DOMAIN_QUALITY = {
  'rvo.nl': 100,
  'rijksoverheid.nl': 100,
  'belastingdienst.nl': 100,
  'cbs.nl': 98,
  'acm.nl': 98,
  'consument.acm.nl': 98,
  'netbeheernederland.nl': 95,
  'tno.nl': 95,
  'nen.nl': 95,
  'isso.nl': 95,
  'ec.europa.eu': 95,
};

/** Publicatiegate: alleen bronnen op of boven dit niveau tellen mee voor de "SOURCE QUALITY"-eis. */
export const MIN_SOURCE_QUALITY = 90;

/** Bronnen onder dit niveau worden nooit gebruikt, punt. */
export const REJECTED_QUALITY_THRESHOLD = 80;

/**
 * @param {string} url
 * @returns {number} 0 als het domein niet in DOMAIN_QUALITY staat (= onbekende/niet-vertrouwde bron).
 */
export function scoreForUrl(url) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return DOMAIN_QUALITY[hostname] ?? 0;
  } catch {
    return 0;
  }
}

/**
 * @param {{qualityScore?: number, domain?: string, url?: string}} source
 * @returns {number}
 */
export function scoreForSource(source) {
  if (!source) return 0;
  if (typeof source.qualityScore === 'number') return source.qualityScore;
  if (source.domain && source.domain in DOMAIN_QUALITY) return DOMAIN_QUALITY[source.domain];
  if (source.url) return scoreForUrl(source.url);
  return 0;
}
