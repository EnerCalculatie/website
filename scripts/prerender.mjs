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

const SITE = 'https://enercalculatie.nl';

// pathToFileURL: een kaal Windows-pad (c:\...) is geen geldige ESM-specifier
const { render, blogPosts, staticRoutes, notFoundRoute } = await import(
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
// Routes: statische routes uit staticRoutes.ts, blogroutes uit blogPosts.ts —
// dezelfde bronnen die server.ts gebruikt om deze bestanden te serveren.
// ---------------------------------------------------------------------------

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
  notFoundRoute,
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

  // GitHub Pages is puur statisch en kent geen server-side route→bestand-mapping
  // (die bestaat alleen in server.ts, voor de Railway-hosting). GH Pages' eigen
  // extensionless-lookup (probeert /pad, dan /pad.html) matcht prima voor de
  // platte bestandsnamen hierboven zolang de route zelf ook plat is (bv.
  // /over-ons -> over-ons.html), maar niet voor geneste routes als
  // /blog/<slug> -> blog-<slug>.html: die bestandsnaam staat niet op het
  // geneste pad dat GH Pages voor die URL zoekt. Schrijf daarom voor geneste
  // routes ook een kopie op het geneste pad zelf.
  const segments = route.url.split('/').filter(Boolean);
  if (segments.length > 1) {
    const nestedFile = `${path.join(distDir, ...segments)}.html`;
    fs.mkdirSync(path.dirname(nestedFile), { recursive: true });
    fs.writeFileSync(nestedFile, finalHtml, 'utf-8');
    console.log(`✅ Ook op GH Pages-pad gezet: dist/${segments.join('/')}.html`);
  }
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
// Genereer rss.xml. Voorheen server.ts/rss.ts (Express, live per request) —
// dat draait niet meer sinds de site op GitHub Pages (static) staat. Content
// hangt toch alleen af van blogPosts.ts (build-time), dus hier statisch
// gegenereerd net als sitemap.xml. Trigger-bron voor Zapier (nieuwe blogpost
// -> LinkedIn-post met hashtags); de <category>-tags per item komen uit
// blogPosts.ts se tags.
function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const rssItems = sortedPosts
  .map((post) => {
    const link = `${SITE}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    const categories = post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ');
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${categories}
    </item>`;
  })
  .join('\n');

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>EnerCalculatie Kennisbank</title>
    <link>${SITE}/blog</link>
    <description>Kennisbank-artikelen van EnerCalculatie over zonnepanelen, thuisbatterijen, warmtepompen en energieadvies.</description>
    <language>nl-NL</language>
${rssItems}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(distDir, 'rss.xml'), rssFeed, 'utf-8');
console.log(`✅ Gegenereerd: dist/rss.xml (${sortedPosts.length} items)`);

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
