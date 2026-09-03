// SEO-QC over de geprerenderde output in dist/. Draait in CI na `npm run build`
// en faalt de push bij een overtreding (exit 1).
//
// Bewust op dist/ en niet op de bron: dit is exact wat een crawler krijgt,
// inclusief wat pas tijdens het renderen ontstaat. De audit van 15-07-2026 vond
// juist fouten die je in de bron niet ziet — /over-ons stond overal correct,
// maar viel in de gerenderde routing weg.
//
// Checks:
//   1. Elke interne link resolvet naar een bestaande route of een bestand in dist/.
//   2. <title> en meta description binnen de limiet, en aanwezig.
//   3. Elke JSON-LD is parseerbaar en heeft @context + @type.
//   4. Exact één <h1> per pagina.
//   5. Elke indexable pagina staat in sitemap.xml, en niets anders.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  MAX_TITLE_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  LATEX_NOTATION,
} from './lib/content-checks.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const SITE = 'https://enercalculatie.nl';

if (!fs.existsSync(distDir)) {
  console.error('dist/ ontbreekt — draai eerst `npm run build`.');
  process.exit(1);
}

const { blogPosts, staticRoutes, notFoundRoute } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

// ---------------------------------------------------------------------------
// Bekende routes + bestanden, om interne links tegen te resolven.
// ---------------------------------------------------------------------------

const routeToFile = new Map([
  ...staticRoutes.map((r) => [r.url, r.outFile]),
  ['/blog', 'blog.html'],
  ...blogPosts.map((p) => [`/blog/${p.slug}`, `blog-${p.slug}.html`]),
]);

/** Root-relatieve paden die geen route zijn maar wel moeten bestaan in dist/. */
function distFileExists(urlPath) {
  return fs.existsSync(path.join(distDir, decodeURIComponent(urlPath).replace(/^\//, '')));
}

// Cloudflare schrijft e-mailadressen om naar /cdn-cgi/l/email-protection; die
// route bestaat alleen op de edge, niet in dist/.
const IGNORED_PREFIXES = ['/cdn-cgi/'];

const failures = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);

// ---------------------------------------------------------------------------
// Per pagina.
// ---------------------------------------------------------------------------

const pages = [...routeToFile.entries()];
// De 404 hoort noindex te zijn: wel op links/JSON-LD checken, niet op canonical.
pages.push([notFoundRoute.url, notFoundRoute.outFile]);

for (const [url, outFile] of pages) {
  const filePath = path.join(distDir, outFile);
  if (!fs.existsSync(filePath)) {
    fail(outFile, `route ${url} heeft geen voorgerenderd bestand — server.ts serveert hier een 404.`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf-8');
  const isNoindex = /<meta name="robots" content="noindex/.test(html);

  // -- 1. interne links ------------------------------------------------------
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (!href.startsWith('/')) continue; // extern, anchor of mailto/tel
    if (IGNORED_PREFIXES.some((p) => href.startsWith(p))) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean || clean === '/') continue;
    if (routeToFile.has(clean)) continue;
    if (distFileExists(clean)) continue;
    fail(outFile, `interne link naar niet-bestaande route/bestand: ${href}`);
  }

  // -- 2. title + meta description -------------------------------------------
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title) {
    fail(outFile, 'geen <title>.');
  } else if (title.length > MAX_TITLE_LENGTH) {
    fail(outFile, `<title> is ${title.length} tekens, max ${MAX_TITLE_LENGTH}: "${title}"`);
  }

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) {
    fail(outFile, 'geen meta description.');
  } else if (desc.length > MAX_DESCRIPTION_LENGTH) {
    fail(outFile, `meta description is ${desc.length} tekens, max ${MAX_DESCRIPTION_LENGTH}.`);
  }

  // -- 3. JSON-LD ------------------------------------------------------------
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  if (blocks.length === 0 && !isNoindex) {
    fail(outFile, 'geen JSON-LD.');
  }
  for (const block of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(block);
    } catch (err) {
      fail(outFile, `JSON-LD is niet parseerbaar: ${err.message}`);
      continue;
    }
    if (!parsed['@context']) fail(outFile, `JSON-LD zonder @context: ${JSON.stringify(parsed).slice(0, 80)}`);
    if (!parsed['@type']) fail(outFile, `JSON-LD zonder @type: ${JSON.stringify(parsed).slice(0, 80)}`);
  }

  // -- 4. exact één H1 -------------------------------------------------------
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fail(outFile, `${h1s} <h1>-elementen, verwacht precies 1.`);

  // -- 5. canonical ----------------------------------------------------------
  if (!isNoindex && !html.includes('<link rel="canonical"')) {
    fail(outFile, 'indexable pagina zonder canonical.');
  }

  // -- 6. ongerenderde LaTeX/MathJax-notatie ---------------------------------
  // Deze pipeline heeft geen LaTeX-renderer: $\Delta T$-achtige notatie komt als
  // kale tekst (dollartekens, backslashes) op de live pagina. checkComponentBody()
  // in content-checks.mjs zou dit al vóór publicatie moeten vangen, maar was tot
  // 2026-08-25 nergens aangeroepen — vandaar deze extra, wél daadwerkelijk actieve
  // check op de geprerenderde output zelf.
  const latexHits = html.match(LATEX_NOTATION);
  if (latexHits) {
    fail(outFile, `${latexHits.length}x ongerenderde LaTeX-notatie op de pagina (bv. "${latexHits[0]}").`);
  }
}

// ---------------------------------------------------------------------------
// Sitemap: alles wat indexable is staat erin, en niets wat dat niet is.
// ---------------------------------------------------------------------------

const sitemapPath = path.join(distDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  fail('sitemap.xml', 'ontbreekt.');
} else {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  for (const loc of locs) {
    const urlPath = loc.replace(SITE, '') || '/';
    const normalised = urlPath === '/' ? '/' : urlPath.replace(/\/$/, '');
    const outFile = routeToFile.get(normalised);
    if (!outFile) {
      fail('sitemap.xml', `bevat ${loc}, maar die route bestaat niet -> 4XX in de sitemap.`);
      continue;
    }
    const html = fs.readFileSync(path.join(distDir, outFile), 'utf-8');
    if (/<meta name="robots" content="noindex/.test(html)) {
      fail('sitemap.xml', `bevat ${loc}, maar die pagina is noindex.`);
    }
  }

  // Andersom: indexable route die niet in de sitemap staat.
  const locPaths = new Set(locs.map((l) => (l.replace(SITE, '') || '/').replace(/(.)\/$/, '$1')));
  for (const [url, outFile] of routeToFile) {
    const html = fs.readFileSync(path.join(distDir, outFile), 'utf-8');
    if (/<meta name="robots" content="noindex/.test(html)) continue;
    if (!locPaths.has(url)) {
      fail('sitemap.xml', `indexable route ${url} ontbreekt in de sitemap.`);
    }
  }
}

// ---------------------------------------------------------------------------

if (failures.length > 0) {
  console.error(`\nSEO-QC gefaald — ${failures.length} probleem(en):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('');
  process.exit(1);
}

console.log(`SEO-QC geslaagd: ${pages.length} pagina's gecontroleerd op links, title/meta, JSON-LD, H1 en sitemap.`);
