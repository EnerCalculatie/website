// Gedeelde, deterministische contentchecks. Gebruikt door:
//  - scripts/generate-blog-post.mjs  -> gate vóór er iets naar schijf gaat
//  - scripts/qc-seo.mjs              -> gate op elke push (CI)
//
// Bewust géén LLM: dit zijn harde limieten die je telt, niet beoordeelt. De
// seo-geo-validator scoort kwaliteit; dit bestand controleert feiten.

/** Google kapt de <title> af rond 60 tekens. */
export const MAX_TITLE_LENGTH = 60;
/** Google kapt de meta description af rond 155 tekens. */
export const MAX_DESCRIPTION_LENGTH = 155;

// Tekens die niet in Nederlandse content horen: CJK, Cyrillisch, Arabisch,
// Hebreeuws. Een LLM lekt die af en toe middenin een woord — zie de 'Chinese
// karakters'-bug (commit 1cb19cc). Latin-1/Latin Extended-A blijft toegestaan
// voor accenten (é, ë, ï), net als de gangbare typografische leestekens.
const FOREIGN_SCRIPT = /[Ѐ-ӿ֐-׿؀-ۿ　-ヿ一-鿿가-힯]/;

// Losse tokens die uit modeloutput lekken en er als gewone tekst uitzien.
// 'ptrdiff' stond live middenin een gepubliceerde titel. Uitbreiden zodra er
// een nieuwe variant opduikt — een exacte lijst is betrouwbaarder dan een
// heuristiek die echte woorden als corruptie aanmerkt.
const CORRUPTION_TOKENS = ['ptrdiff', 'undefined', 'NaN', '[object Object]', 'lorem ipsum'];

/**
 * Controleert de metadata van één artikel.
 * @param {{title?:string, seoTitle?:string, description?:string, slug?:string}} article
 * @returns {string[]} lege array = akkoord
 */
export function checkArticleMeta(article) {
  const errors = [];
  const { title, seoTitle, description, slug } = article;

  if (!title?.trim()) errors.push('title ontbreekt of is leeg.');
  if (!description?.trim()) errors.push('description ontbreekt of is leeg.');
  if (!seoTitle?.trim()) errors.push('seoTitle ontbreekt of is leeg.');

  if (seoTitle && seoTitle.length > MAX_TITLE_LENGTH) {
    errors.push(`seoTitle is ${seoTitle.length} tekens, max ${MAX_TITLE_LENGTH}: "${seoTitle}"`);
  }
  if (description && description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`description is ${description.length} tekens, max ${MAX_DESCRIPTION_LENGTH}: "${description}"`);
  }
  if (seoTitle && / \| EnerCalculatie\s*$/.test(seoTitle)) {
    errors.push('seoTitle bevat het merksuffix; dat wordt niet meer toegevoegd en eet de tekenlimiet op.');
  }
  if (slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    errors.push(`slug is geen schone kebab-case: "${slug}"`);
  }

  for (const [field, value] of Object.entries({ title, seoTitle, description })) {
    if (!value) continue;
    if (FOREIGN_SCRIPT.test(value)) {
      errors.push(`${field} bevat niet-Latijnse tekens (modelcorruptie): "${value}"`);
    }
    for (const token of CORRUPTION_TOKENS) {
      if (value.toLowerCase().includes(token.toLowerCase())) {
        errors.push(`${field} bevat corruptie-token "${token}": "${value}"`);
      }
    }
  }

  return errors;
}

/**
 * Controleert de gegenereerde JSX-body op fouten die esbuild's syntaxcheck
 * niet ziet, omdat het geldige JSX is met een ongeldige betekenis.
 * @param {string} body
 * @returns {string[]} lege array = akkoord
 */
export function checkComponentBody(body) {
  const errors = [];

  // 'clase='/'class=' i.p.v. 'className=': geldige JSX, maar React dropt de prop
  // stilzwijgend -> ongestylede content live. Stond op main (commit 251269e).
  for (const attr of ['clase', 'class', 'clasName', 'classname']) {
    const re = new RegExp(`<[a-zA-Z][^>]*\\s${attr}=`, 'g');
    const hits = body.match(re);
    if (hits) errors.push(`${hits.length}x '${attr}=' gebruikt i.p.v. 'className=' — React negeert die prop.`);
  }

  if (FOREIGN_SCRIPT.test(body)) {
    errors.push('body bevat niet-Latijnse tekens (modelcorruptie).');
  }
  for (const token of CORRUPTION_TOKENS) {
    if (body.toLowerCase().includes(token.toLowerCase())) {
      errors.push(`body bevat corruptie-token "${token}".`);
    }
  }

  if (!/<h2\b/.test(body)) errors.push('body bevat geen enkele <h2> — artikel zonder koppenstructuur.');
  // H1 hoort exact 1x per pagina en komt uit BlogPostLayout (post.title).
  if (/<h1\b/.test(body)) errors.push('body bevat een <h1>; BlogPostLayout rendert die al -> dubbele H1.');

  return errors;
}

/**
 * Haalt de root-relatieve interne links uit JSX/HTML.
 * @param {string} source
 * @returns {string[]} unieke paden, zonder #anchors en query
 */
export function extractInternalLinks(source) {
  const links = [...source.matchAll(/href=["']([^"'#][^"']*)["']/g)].map((m) => m[1]);
  return [
    ...new Set(
      links
        .filter((l) => l.startsWith('/'))
        .map((l) => l.split('#')[0].split('?')[0])
        .filter(Boolean)
    ),
  ];
}
