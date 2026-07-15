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
 * Kort een tekst in op een woordgrens, met een leesbaar einde.
 *
 * Vangnet, geen eerste keus: een model dat zelf een goede korte titel schrijft
 * levert altijd beter werk dan afkappen. Maar de pipeline mag niet stukvallen
 * op een ontbrekend veld — dan publiceert de bot dagenlang niets terwijl de
 * backlog leegloopt op retryCount. Liever een afgekapte titel dan geen artikel.
 *
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
export function truncateAtWord(text, max) {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;

  const window = trimmed.slice(0, max);

  // Liefst knippen op een zinsgrens (': ' of ' — '), want dat levert een
  // afgeronde kop op: 'Hybride warmtepomp dimensioneren' i.p.v. het halve
  // 'Hybride warmtepomp dimensioneren: gasketel behouden of'. Alleen als er
  // genoeg tekst overblijft, anders wordt de titel nietszeggend.
  const clause = Math.max(window.lastIndexOf(': '), window.lastIndexOf(' — '), window.lastIndexOf(' – '));
  if (clause > max * 0.45) return window.slice(0, clause).replace(/[\s,;:.\-—–]+$/, '');

  // Anders op de laatste woordgrens, met leestekens van het einde af.
  const lastSpace = window.lastIndexOf(' ');
  const cut = lastSpace > max * 0.5 ? window.slice(0, lastSpace) : window;
  return cut.replace(/[\s,;:.\-—–]+$/, '');
}

/**
 * Vult een ontbrekende/te lange seoTitle aan uit de volledige titel.
 * @param {{title?:string, seoTitle?:string}} article
 * @returns {{seoTitle:string, derived:boolean}}
 */
export function deriveSeoTitle(article) {
  const current = article.seoTitle?.trim();
  if (current && current.length <= MAX_TITLE_LENGTH && !FOREIGN_SCRIPT.test(current)) {
    return { seoTitle: current, derived: false };
  }
  // Val terug op de volledige titel: die bevat het zoekwoord vooraan, wat een
  // afgekapte seoTitle van het model mogelijk niet meer doet.
  const base = current && current.length > MAX_TITLE_LENGTH ? current : (article.title ?? '');
  return { seoTitle: truncateAtWord(base, MAX_TITLE_LENGTH), derived: true };
}

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

// ---------------------------------------------------------------------------
// Duplicaatdetectie op onderwerp.
//
// De backlog dedupliceerde alleen op exacte slug. Daardoor bestaan er nu drie
// ISDE-warmtepomp-artikelen naast elkaar ('isde-subsidie-warmtepompen',
// 'warmtepompen-kopen-isde-subsidie', 'isde-subsidie-aanvragen'): andere slug,
// zelfde zoekintentie. Die concurreren met elkaar in de SERP.
// ---------------------------------------------------------------------------

// Woorden zonder onderscheidend vermogen: NL-stopwoorden plus termen die in
// vrijwel elke titel op deze site voorkomen ('installateur', 'advies', 'klant').
const STOPWORDS = new Set([
  'de', 'het', 'een', 'en', 'of', 'in', 'op', 'voor', 'van', 'met', 'te', 'bij', 'uit', 'aan', 'door',
  'wat', 'hoe', 'welke', 'wanneer', 'waarom', 'wie', 'dit', 'dat', 'die', 'deze', 'er', 'is', 'zijn',
  'wordt', 'worden', 'kan', 'kunnen', 'moet', 'moeten', 'heeft', 'hebben', 'uw', 'u', 'je', 'uw',
  'niet', 'als', 'dan', 'ook', 'nog', 'meer', 'tegen', 'over', 'naar', 'per', 'tot', 'gaan', 'echt',
  'installateur', 'installateurs', 'advies', 'adviseert', 'adviseren', 'klant', 'klanten', 'gids',
  'stap', 'praktisch', 'praktische', 'beste', 'juiste', 'verschillende', 'impact', 'rol', 'soorten',
]);

/**
 * Meervoud -> enkelvoud, genoeg voor onderwerpvergelijking (geen echte stemmer).
 *
 * Let op de klinkerverlenging: het Nederlandse meervoud kort een lange klinker
 * in ('laadpaal' -> 'laadpalen', 'zonnepaneel' -> 'zonnepanelen'). Alleen 'en'
 * strippen levert dan 'laadpal'/'zonnepanel', wat níét matcht met het enkelvoud
 * — juist bij de twee onderwerpen die op deze site het vaakst voorkomen.
 */
function singularize(word) {
  if (/(?:ie|oe)s$/.test(word)) return word.slice(0, -1); // 'subsidies' -> 'subsidie'
  if (!/(en|s)$/.test(word)) return word;
  const stem = word.replace(/(en|s)$/, '');
  // Eindigt de stam op medeklinker + enkele klinker + medeklinker, dan is de
  // klinker in het meervoud ingekort: verleng hem terug ('laadpal' -> 'laadpaal').
  return stem.replace(/([bcdfghjklmnpqrstvwxz])([aeou])([bcdfghjklmnpqrstvwxz])$/, '$1$2$2$3');
}

/** Titel/keyword -> set betekenisdragende tokens, genormaliseerd naar enkelvoud. */
function topicTokens(...parts) {
  const text = parts.filter(Boolean).join(' ').toLowerCase();
  return new Set(
    text
      .replace(/[^a-z0-9áàäâéèëêíìïîóòöôúùüûñç\s-]/g, ' ')
      .split(/[\s-]+/)
      .filter((w) => w.length > 3 && !STOPWORDS.has(w))
      .map(singularize)
      .filter((w) => w.length > 3)
  );
}

/**
 * Overlap tussen twee onderwerpen: |doorsnede| / |kleinste set|.
 * Deelt door de kleinste set, niet door de unie (Jaccard): een korte titel die
 * volledig opgaat in een lange is nog steeds een duplicaat.
 * @returns {number} 0..1
 */
export function topicOverlap(a, b) {
  const A = topicTokens(a.title, a.keyword);
  const B = topicTokens(b.title, b.keyword);
  if (A.size === 0 || B.size === 0) return 0;
  let shared = 0;
  for (const t of A) if (B.has(t)) shared++;
  return shared / Math.min(A.size, B.size);
}

/**
 * Boven deze overlap geldt een onderwerp als duplicaat.
 *
 * Afgestemd op de echte data in blogPosts.ts: de bestaande duplicaatparen
 * (3x ISDE-warmtepomp, 2x netcongestie) scoren 0,50-0,75, terwijl artikelen die
 * terecht naast elkaar bestaan niet boven 0,25 komen. 0,45 ligt in dat gat, met
 * marge aan beide kanten. Verlagen richting 0,25 blokkeert goede onderwerpen.
 */
export const DUPLICATE_THRESHOLD = 0.45;

/**
 * Zoekt het bestaande onderwerp waar een kandidaat te dicht tegenaan zit.
 * @param {{title:string, keyword?:string}} candidate
 * @param {{title:string, keyword?:string, slug?:string}[]} existing
 * @returns {{match:object, overlap:number} | null}
 */
export function findDuplicateTopic(candidate, existing) {
  let best = null;
  for (const item of existing) {
    const overlap = topicOverlap(candidate, item);
    if (overlap >= DUPLICATE_THRESHOLD && (!best || overlap > best.overlap)) {
      best = { match: item, overlap };
    }
  }
  return best;
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
