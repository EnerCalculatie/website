// Single source of truth voor de niet-blog routes. Blogroutes komen uit
// blogPosts.ts; deze lijst dekt de rest. Zowel scripts/prerender.mjs (welke
// pagina's worden voorgerenderd + wat komt er in sitemap.xml) als server.ts
// (welk pad serveert welk HTML-bestand met status 200) leest hieruit.
//
// Waarom één bron: /over-ons stond wél in App.tsx, prerender.mjs en de sitemap,
// maar niet in de handmatige routetabel van server.ts. Gevolg: elke hit op
// /over-ons kreeg de 404-pagina met status 404, terwijl de footer er vanaf
// élke pagina naartoe linkt en de sitemap hem aanbood aan crawlers.

export interface StaticRoute {
  /** Client-side pad, exact gelijk aan het <Route path> in App.tsx. */
  url: string;
  /** Bestandsnaam van de voorgerenderde HTML in dist/. */
  outFile: string;
  /** Weglaten = niet in sitemap.xml (noindex-pagina's, de 404). */
  sitemap?: false;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export const staticRoutes: StaticRoute[] = [
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
  { url: '/offerte-software', outFile: 'offerte-software.html', lastmod: '2026-08-16', changefreq: 'monthly', priority: '0.7' },
];

/** Voorgerenderde 404: fallback in server.ts, nooit in de sitemap. */
export const notFoundRoute: StaticRoute = {
  url: '/__not-found__',
  outFile: '404.html',
  sitemap: false,
};
