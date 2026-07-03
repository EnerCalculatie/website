// Prerendert de statische routes na de Vite client- en SSR-build.
// React 19 hoist <title>/<meta>/<link> tags (gerenderd via <SEO> / Helmet)
// automatisch naar het begin van de renderToString-output. Dit script
// splitst die gehoiste tags van de body-markup en zet ze in <head>,
// zodat crawlers die geen JavaScript draaien (o.a. GPTBot, ClaudeBot,
// PerplexityBot en social link-preview bots) de volledige content en
// metadata alsnog statisch zien.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const { render } = await import(path.join(root, 'dist-ssr', 'entry-server.js'));

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const routes = [
  { url: '/', outFile: 'index.html' },
  { url: '/privacy', outFile: 'privacy.html' },
  { url: '/nieuwsbrief-bevestigd', outFile: 'nieuwsbrief-bevestigd.html' },
  { url: '/voorwaarden', outFile: 'voorwaarden.html' },
  { url: '/verwerkersovereenkomst', outFile: 'verwerkersovereenkomst.html' },
  { url: '/blog', outFile: 'blog.html' },
  { url: '/blog/salderingsregeling-2027', outFile: 'blog-salderingsregeling-2027.html' },
  { url: '/blog/btw-zonnepanelen', outFile: 'blog-btw-zonnepanelen.html' },
  { url: '/blog/terugleverkosten-thuisbatterij', outFile: 'blog-terugleverkosten-thuisbatterij.html' },
  { url: '/blog/isde-subsidie-warmtepompen', outFile: 'blog-isde-subsidie-warmtepompen.html' },
  { url: '/blog/warmtepomp-rendement-aannames', outFile: 'blog-warmtepomp-rendement-aannames.html' },
  { url: '/blog/van-excel-naar-geautomatiseerd-advies', outFile: 'blog-van-excel-naar-geautomatiseerd-advies.html' },
  { url: '/blog/laadpaal-advies-thuis', outFile: 'blog-laadpaal-advies-thuis.html' },
  { url: '/blog/airco-vs-warmtepomp', outFile: 'blog-airco-vs-warmtepomp.html' },
  { url: '/blog/trends-verduurzaming-2026', outFile: 'blog-trends-verduurzaming-2026.html' },
  { url: '/rekentool-zonnepanelen', outFile: 'rekentool-zonnepanelen.html' },
  { url: '/rekentool-thuisbatterij', outFile: 'rekentool-thuisbatterij.html' },
  { url: '/rekentool-warmtepomp', outFile: 'rekentool-warmtepomp.html' },
  { url: '/rekentool-airco', outFile: 'rekentool-airco.html' },
  { url: '/rekentool-laadpaal', outFile: 'rekentool-laadpaal.html' },
  { url: '/__not-found__', outFile: '404.html' },
];

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
  const { html } = render(route.url);
  const finalHtml = buildHtml(template, html);
  fs.writeFileSync(path.join(distDir, route.outFile), finalHtml, 'utf-8');
  console.log(`✅ Prerendered ${route.url} -> dist/${route.outFile}`);
}
