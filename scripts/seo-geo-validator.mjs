/**
 * SEO/GEO-kwaliteitscontrole voor een gegenereerd artikel, vóór het naar
 * schijf geschreven wordt. Geïmporteerd door generate-blog-post.mjs — geen
 * eigen CLI-entrypoint nodig.
 */

const APPROVAL_THRESHOLD = 80;

/**
 * @param {{title:string, description:string, excerpt:string, tags:string[], keyPoints:string[], componentBody:string}} article
 * @param {{callGemini: (system:string, user:string) => Promise<string>, extractJson: (raw:string) => any}} deps
 * @returns {Promise<{seoScore:number, geoScore:number, score:number, approved:boolean, improvements:string[]}>}
 */
export async function validateArticle(article, { callGemini, extractJson }) {
  const system = `Je bent een strikte SEO/GEO-kwaliteitscontroleur voor de EnerCalculatie-kennisbank. Je beoordeelt een concept-blogartikel op basis van onderstaande criteria en geeft NOOIT het voordeel van de twijfel — wees kritisch.

SEO-criteria:
- Titel bevat het primaire zoekwoord en is niet te lang/kort.
- Meta description (description) is pakkend, bevat zoekwoord, max ~160 tekens.
- Duidelijke koppenstructuur (h2-secties) die zoekintentie dekt.
- Minimaal één interne link naar een bestaande /blog/<slug> of /rekentool-* pagina.
- Leesbaarheid: korte alinea's, geen wollige zinnen.

GEO-criteria (geoptimaliseerd voor citatie door AI-engines zoals ChatGPT/Perplexity/Claude):
- Directe, citeerbare antwoorden vroeg in het artikel (geen lange inleiding voor het antwoord komt).
- Duidelijke definities van vaktermen.
- Korte paragrafen (geen muren tekst).
- Gebruik van tabellen en/of lijstjes waar relevant.
- Expertise-/E-E-A-T-signalen (verwijzing naar bronnen als RVO, ACM, Netbeheer Nederland; concrete, verifieerbare uitspraken i.p.v. vage claims).
- Geen absolute claims ("foutloos", "altijd correct", "0% foutmarge").

Antwoord UITSLUITEND met een JSON-object (in een \`\`\`json codeblok):
{
  "seoScore": 0-100 (op de SEO-criteria hierboven),
  "geoScore": 0-100 (op de GEO-criteria hierboven),
  "improvements": ["concrete, uitvoerbare verbeterpunten, leeg array als beide scores >= ${APPROVAL_THRESHOLD}"]
}`;

  const user = `Titel: ${article.title}
Meta description: ${article.description}
Excerpt: ${article.excerpt}
Tags: ${(article.tags ?? []).join(', ')}
Kernpunten: ${(article.keyPoints ?? []).join(' | ')}

Artikelinhoud (JSX-body):
${article.componentBody}`;

  const raw = await callGemini(system, user);
  const result = extractJson(raw);

  const seoScore = Number(result.seoScore) || 0;
  const geoScore = Number(result.geoScore) || 0;
  const score = Math.round((seoScore + geoScore) / 2);
  return {
    seoScore,
    geoScore,
    score,
    approved: seoScore >= APPROVAL_THRESHOLD && geoScore >= APPROVAL_THRESHOLD,
    improvements: Array.isArray(result.improvements) ? result.improvements : [],
  };
}

export { APPROVAL_THRESHOLD };
