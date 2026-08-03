/**
 * Rendert het "Bronnen"-blok dat automatisch onderaan elk artikel komt.
 * Onderdeel van componentBody (JSX-tekst), geen apart blogPosts.ts-veld —
 * simpeler, geen wijziging aan BlogPostLayout nodig.
 */

/**
 * @param {Array<{id:string, sourceKey:string|null, source: {title:string,url:string}|null, status:string}>} claims
 * @returns {Array<{title:string, url:string}>} gededuplceerde bronnen van SUPPORTED claims, gesorteerd op titel.
 */
export function collectUsedSources(claims) {
  const seen = new Map();
  for (const claim of claims) {
    if (claim.status !== 'SUPPORTED' || !claim.source) continue;
    if (!seen.has(claim.source.url)) {
      seen.set(claim.source.url, { title: claim.source.title, url: claim.source.url });
    }
  }
  return [...seen.values()].sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * @param {Array<{title:string, url:string}>} usedSources
 * @param {string} [accessDate] - YYYY-MM-DD, default vandaag
 * @returns {string} JSX-fragment, leeg als er geen bronnen zijn.
 */
export function buildSourcesBlock(usedSources, accessDate = new Date().toISOString().slice(0, 10)) {
  if (!usedSources.length) return '';

  const items = usedSources
    .map(
      (s) =>
        `  <li className="mb-2"><a href="${s.url}" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">${s.title}</a> — geraadpleegd ${accessDate}</li>`
    )
    .join('\n');

  return `
<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
${items}
</ol>`;
}
