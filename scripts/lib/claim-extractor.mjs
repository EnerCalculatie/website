/**
 * Normaliseert de `claims`-array die het model verplicht meelevert in de
 * artikel-JSON (zie prompt in generate-blog-post.mjs). Geen aparte NLP-claim-
 * extractie: het model wordt gedwongen elke feitelijke claim zelf te labelen
 * met een sourceKey uit ai-context/trusted-sources.json, dit hier valideert en
 * normaliseert dat alleen.
 */

/**
 * @param {{claims?: Array<{text?: string, sourceKey?: string}>}} article
 * @param {Map<string, object>} sourcesByKey - key -> entry uit trusted-sources.json
 * @returns {{claims: Array<{id:string, text:string, sourceKey:string|null, source: object|null}>, issues: string[]}}
 */
export function extractClaims(article, sourcesByKey) {
  const raw = Array.isArray(article?.claims) ? article.claims : [];
  const issues = [];

  if (raw.length === 0) {
    issues.push(
      'Geen claims-array geleverd — elke feitelijke claim (percentage, jaartal, regelgeving, norm, subsidie) moet in "claims" staan met een geldige sourceKey.'
    );
  }

  const seen = new Set();
  const claims = [];
  let counter = 0;

  for (const entry of raw) {
    const text = (entry?.text ?? '').trim();
    if (!text) {
      issues.push('Claim zonder tekst overgeslagen.');
      continue;
    }
    const dedupeKey = text.toLowerCase();
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    counter += 1;
    const id = `claim-${String(counter).padStart(3, '0')}`;
    const sourceKey = (entry?.sourceKey ?? '').trim() || null;
    const source = sourceKey ? sourcesByKey.get(sourceKey) ?? null : null;

    if (!sourceKey) {
      issues.push(`${id} ("${text}") heeft geen sourceKey.`);
    } else if (!source) {
      issues.push(`${id} ("${text}") verwijst naar onbekende sourceKey "${sourceKey}" — niet in trusted-sources.json.`);
    }

    claims.push({ id, text, sourceKey, source });
  }

  return { claims, issues };
}

/**
 * @param {Array<{key:string, [k:string]: any}>} sources - trusted-sources.json .sources
 * @returns {Map<string, object>}
 */
export function buildSourceLookup(sources) {
  return new Map((sources ?? []).map((s) => [s.key, s]));
}
