/**
 * Toetst claims tegen live gefetchte brontekst via één gebundelde Gemini-call
 * (niet per claim — scheelt kosten/latency op een pipeline die toch al meerdere
 * Gemini-calls per run doet). Zie ai-context/trusted-sources.json voor de
 * grens: NEN/ISSO-bronnen zijn overzichtspagina's, dus claims die daarnaar
 * verwijzen kunnen alleen op "norm bestaat, naam klopt" getoetst worden, niet
 * op gedetailleerde normwaarden — dat is een harde grens, geen bug.
 */

export const VALID_STATUSES = ['SUPPORTED', 'PARTIALLY_SUPPORTED', 'OUTDATED', 'CONFLICTING', 'NO_SOURCE'];

/**
 * @param {Array<{id:string, text:string, sourceKey:string|null, source:object|null}>} claims
 * @param {Map<string, {ok:boolean, text:string, error?:string}>} sourceTexts - sourceKey -> fetch result
 * @param {{callGemini: (system:string, user:string) => Promise<string>, extractJson: (raw:string) => any}} deps
 * @returns {Promise<{results: Array<{id:string, status:string, reasoning:string}>, factScore:number}>}
 */
export async function factCheckClaims(claims, sourceTexts, { callGemini, extractJson }) {
  // Claims zonder (geldige) sourceKey of met een onbereikbare bron hoeven niet
  // naar het model — die zijn al NO_SOURCE, ongeacht wat er in de brontekst staat.
  const checkable = [];
  const results = [];

  for (const claim of claims) {
    if (!claim.sourceKey || !claim.source) {
      results.push({ id: claim.id, status: 'NO_SOURCE', reasoning: 'Geen (geldige) sourceKey opgegeven.' });
      continue;
    }
    const fetched = sourceTexts.get(claim.sourceKey);
    if (!fetched?.ok || !fetched.text) {
      results.push({
        id: claim.id,
        status: 'NO_SOURCE',
        reasoning: `Bron niet bereikbaar (${fetched?.error ?? 'onbekende fout'}).`,
      });
      continue;
    }
    checkable.push({ claim, sourceText: fetched.text });
  }

  if (checkable.length > 0) {
    const system = `Je bent een strikte fact-checker. Je krijgt een lijst claims uit een blogartikel, elk met de live gefetchte tekst van de bron waar de claim naar verwijst. Beoordeel per claim of de brontekst de claim ondersteunt.

Mogelijke statussen:
- SUPPORTED: de brontekst bevestigt de claim expliciet.
- PARTIALLY_SUPPORTED: de brontekst bevestigt een deel, maar niet alles (bv. een detail ontbreekt of wijkt af).
- OUTDATED: de brontekst spreekt de claim tegen omdat de regelgeving/situatie inmiddels anders is.
- CONFLICTING: de brontekst spreekt de claim direct tegen.
- NO_SOURCE: de brontekst bevat helemaal geen informatie over dit onderwerp.

Wees streng — geef nooit het voordeel van de twijfel. Een claim die niet letterlijk of ondubbelzinnig door de brontekst wordt gedekt, is niet SUPPORTED.

Antwoord UITSLUITEND met een JSON-object (in een \`\`\`json codeblok):
{
  "results": [{"id": "claim-001", "status": "SUPPORTED", "reasoning": "korte onderbouwing"}]
}`;

    const user = checkable
      .map(
        ({ claim, sourceText }) =>
          `Claim ${claim.id}: "${claim.text}"\nBron (${claim.source.title}, ${claim.source.url}):\n${sourceText.slice(0, 4000)}\n---`
      )
      .join('\n\n');

    const raw = await callGemini(system, user);
    const parsed = extractJson(raw);
    const byId = new Map((Array.isArray(parsed.results) ? parsed.results : []).map((r) => [r.id, r]));

    for (const { claim } of checkable) {
      const r = byId.get(claim.id);
      const status = VALID_STATUSES.includes(r?.status) ? r.status : 'NO_SOURCE';
      results.push({ id: claim.id, status, reasoning: r?.reasoning ?? 'Geen beoordeling ontvangen van het model.' });
    }
  }

  const supportedCount = results.filter((r) => r.status === 'SUPPORTED').length;
  const factScore = results.length === 0 ? 100 : Math.round((100 * supportedCount) / results.length);

  return { results, factScore };
}

/**
 * Publicatiegate: FACT == 100 betekent hier letterlijk "elke claim SUPPORTED",
 * niet een gemiddelde — zie plan-context.
 * @param {Array<{status:string}>} results
 */
export function allClaimsSupported(results) {
  return results.length === 0 || results.every((r) => r.status === 'SUPPORTED');
}
