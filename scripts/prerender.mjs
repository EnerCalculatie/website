// Prerendert de statische routes na de Vite client- en SSR-build, en genereert
// alle blog-afgeleide bestanden (sitemap.xml, blog-index.md, blog-<slug>.md en de
// blogsectie in llms.txt) uit src/content/blogPosts.ts — de single source of truth.
// Een nieuw blogartikel vereist daardoor alleen nog: artikelcomponent, entry in
// blogPosts.ts en een <Route> in App.tsx. De rest volgt automatisch bij de build.
//
// React 19 hoist <title>/<meta>/<link> tags (gerenderd via <SEO> / Helmet)
// automatisch naar het begin van de renderToString-output. Dit script
// splitst die gehoiste tags van de body-markup en zet ze in <head>,
// zodat crawlers die geen JavaScript draaien (o.a. GPTBot, ClaudeBot,
// PerplexityBot en social link-preview bots) de volledige content en
// metadata alsnog statisch zien.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import Beasties from 'beasties';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const SITE = 'https://www.enercalculatie.nl';

// pathToFileURL: een kaal Windows-pad (c:\...) is geen geldige ESM-specifier
const { render, blogPosts } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

let template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Prerender is niet idempotent: route '/' overschrijft dist/index.html met de
// geprerenderde homepage. Een tweede losse run zou die output als template
// gebruiken en de homepage in élke pagina bakken. Vereis een schone template.
if (!template.includes('<div id="root"></div>')) {
  throw new Error(
    'dist/index.html is geen schone Vite-template (root-div is niet leeg). ' +
    'Draai eerst `npm run build:frontend` — prerender kan niet op zijn eigen output draaien.'
  );
}

// ---------------------------------------------------------------------------
// Font-preloads: de meest gebruikte gewichten (Inter 400 bodytekst, Inter 700
// koppen, Space Grotesk 700 display-koppen) alvast laden, parallel aan de CSS.
// De bestandsnamen zijn gehasht, dus we zoeken ze op in dist/assets.
// ---------------------------------------------------------------------------

const assetFiles = fs.readdirSync(path.join(distDir, 'assets'));
const preloadFonts = ['inter-latin-400-normal', 'inter-latin-700-normal', 'space-grotesk-latin-700-normal']
  .map((base) => assetFiles.find((f) => f.startsWith(base) && f.endsWith('.woff2')))
  .filter(Boolean);
if (preloadFonts.length !== 3) {
  throw new Error(`Verwachtte 3 woff2-preloadfonts in dist/assets, vond ${preloadFonts.length} — zijn de @fontsource-imports in index.css gewijzigd?`);
}
const fontPreloadTags = preloadFonts
  .map((f) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${f}" />`)
  .join('\n    ');
template = template.replace('</head>', `  ${fontPreloadTags}\n  </head>`);

// ---------------------------------------------------------------------------
// Critical CSS: Beasties inlinet per pagina de boven-de-vouw-regels en laadt
// de volledige stylesheet async (media="print" + onload-swap, met noscript-
// fallback). Daardoor blokkeert de 64 KB stylesheet de first paint niet meer.
// inlineFonts zet de gebruikte @font-face-declaraties mee in de kritieke CSS,
// zodat de gepreloade fonts direct toegepast kunnen worden (minder verschuiving).
// ---------------------------------------------------------------------------

const beasties = new Beasties({
  path: distDir,
  preload: 'media',
  inlineFonts: true,
  preloadFonts: false, // preloads staan hierboven al expliciet in de template
  pruneSource: false,
  logLevel: 'warn',
});

// ---------------------------------------------------------------------------
// Routes: statische pagina's handmatig, blogroutes afgeleid uit blogPosts.ts.
// ---------------------------------------------------------------------------

const staticRoutes = [
  { url: '/', outFile: 'index.html', lastmod: '2026-06-20', changefreq: 'weekly', priority: '1.0' },
  { url: '/privacy', outFile: 'privacy.html', lastmod: '2026-06-17', changefreq: 'monthly', priority: '0.5' },
  { url: '/over-ons', outFile: 'over-ons.html', lastmod: '2026-07-06', changefreq: 'monthly', priority: '0.6' },
  { url: '/nieuwsbrief-bevestigd', outFile: 'nieuwsbrief-bevestigd.html', sitemap: false },
  { url: '/voorwaarden', outFile: 'voorwaarden.html', lastmod: '2026-06-17', changefreq: 'monthly', priority: '0.5' },
  { url: '/verwerkersovereenkomst', outFile: 'verwerkersovereenkomst.html', lastmod: '2026-06-17', changefreq: 'monthly', priority: '0.5' },
  { url: '/rekentool-zonnepanelen', outFile: 'rekentool-zonnepanelen.html', lastmod: '2026-06-22', changefreq: 'monthly', priority: '0.7' },
  { url: '/rekentool-thuisbatterij', outFile: 'rekentool-thuisbatterij.html', lastmod: '2026-06-22', changefreq: 'monthly', priority: '0.7' },
  { url: '/rekentool-warmtepomp', outFile: 'rekentool-warmtepomp.html', lastmod: '2026-06-22', changefreq: 'monthly', priority: '0.7' },
  { url: '/rekentool-airco', outFile: 'rekentool-airco.html', lastmod: '2026-06-22', changefreq: 'monthly', priority: '0.7' },
  { url: '/rekentool-laadpaal', outFile: 'rekentool-laadpaal.html', lastmod: '2026-06-22', changefreq: 'monthly', priority: '0.7' },
];

const newestPostDate = blogPosts.map((p) => p.updated ?? p.date).sort().at(-1);

const blogListingRoute = {
  url: '/blog',
  outFile: 'blog.html',
  lastmod: newestPostDate,
  changefreq: 'weekly',
  priority: '0.7',
};

const blogRoutes = blogPosts.map((p) => ({
  url: `/blog/${p.slug}`,
  outFile: `blog-${p.slug}.html`,
  lastmod: p.updated ?? p.date,
  changefreq: 'monthly',
  priority: '0.6',
}));

const routes = [
  ...staticRoutes,
  blogListingRoute,
  ...blogRoutes,
  { url: '/__not-found__', outFile: '404.html', sitemap: false },
];

// ---------------------------------------------------------------------------
// Prerender alle routes.
// ---------------------------------------------------------------------------

// Markeert het begin van de werkelijke body-markup (de buitenste div van AppContent).
// Alles vóór dit punt in de renderToString-output is door React gehoiste head-metadata.
const BODY_MARKER = '<div class="min-h-screen bg-white">';

function buildHtml(template, html) {
  const splitIndex = html.indexOf(BODY_MARKER);
  if (splitIndex === -1) {
    throw new Error('BODY_MARKER niet gevonden in de gerenderde HTML — is de root-div in App.tsx aangepast?');
  }
  const headExtras = html.slice(0, splitIndex);
  const bodyHtml = html.slice(splitIndex);

  let out = template;

  // Verwijder de statische title/description placeholders — de gerenderde versie is de echte, per-route versie.
  out = out.replace(/\s*<title>.*?<\/title>\n?/s, '\n');
  out = out.replace(/\s*<meta name="description"[^>]*\/>\n?/s, '\n');

  out = out.replace('</head>', `    ${headExtras}\n  </head>`);
  out = out.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  return out;
}

for (const route of routes) {
  const { html } = await render(route.url);
  const finalHtml = await beasties.process(buildHtml(template, html));
  fs.writeFileSync(path.join(distDir, route.outFile), finalHtml, 'utf-8');
  console.log(`✅ Prerendered ${route.url} -> dist/${route.outFile}`);
}

// ---------------------------------------------------------------------------
// Genereer sitemap.xml.
// ---------------------------------------------------------------------------

const sitemapEntries = routes
  .filter((r) => r.sitemap !== false)
  .map((r) => {
    const loc = r.url === '/' ? `${SITE}/` : `${SITE}${r.url}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${r.lastmod}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority}</priority>`,
      '  </url>',
    ].join('\n');
  });

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries,
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');
console.log(`✅ Gegenereerd: dist/sitemap.xml (${sitemapEntries.length} URLs)`);

// ---------------------------------------------------------------------------
// Genereer agent-leesbare markdownbestanden: blog-index.md + blog-<slug>.md.
// ---------------------------------------------------------------------------

const mdTags = (tags) => tags.map((t) => t.toLowerCase().replace(/\s+/g, '-')).join(', ');

for (const p of blogPosts) {
  const md = `---
type: Article
title: ${p.title}
description: ${p.description}
resource: ${SITE}/blog/${p.slug}
timestamp: ${p.date}
tags: [${mdTags(p.tags)}]
---

# ${p.title}

${p.excerpt}

*Dit is een samenvatting. Het volledige artikel is te vinden op de [website](${SITE}/blog/${p.slug}).*
`;
  fs.writeFileSync(path.join(distDir, `blog-${p.slug}.md`), md, 'utf-8');
}
console.log(`✅ Gegenereerd: dist/blog-<slug>.md (${blogPosts.length} artikelen)`);

const blogIndex = `---
type: WebPage
title: Blog | EnerCalculatie
description: Artikelen over de energiemarkt, Nederlandse wetgeving en rendementsberekeningen voor installateurs.
resource: ${SITE}/blog
timestamp: ${newestPostDate}
tags: [blog, kennisbank]
---

# Blog & Kennisbank

Een overzicht van onze artikelen over de energiemarkt, Nederlandse wetgeving en rendementsberekeningen voor installateurs.

${blogPosts.map((p) => `* [${p.title}](blog-${p.slug}.md)`).join('\n')}
`;

fs.writeFileSync(path.join(distDir, 'blog-index.md'), blogIndex, 'utf-8');
console.log('✅ Gegenereerd: dist/blog-index.md');

// ---------------------------------------------------------------------------
// Vul llms.txt aan met de actuele bloglijst (basisbestand staat in public/).
// ---------------------------------------------------------------------------

const llmsPath = path.join(distDir, 'llms.txt');
const llmsBase = fs.readFileSync(llmsPath, 'utf-8');
const blogSection = `## Blog & Kennisbank

Overzicht: ${SITE}/blog-index.md

${blogPosts.map((p) => `- [${p.title}](${SITE}/blog-${p.slug}.md)`).join('\n')}

## Laatste update

${newestPostDate}
`;

fs.writeFileSync(llmsPath, `${llmsBase.trimEnd()}\n\n${blogSection}`, 'utf-8');
console.log('✅ Gegenereerd: dist/llms.txt (basis + blogsectie)');
