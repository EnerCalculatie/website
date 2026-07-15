import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { AppContent } from './App';
import { routePreloads } from './routePreloads';

// Geëxporteerd zodat scripts/prerender.mjs de blogdata uit dezelfde bron leest
// als de app zelf (single source of truth voor routes, sitemap en agent-bestanden).
export { blogPosts } from './content/blogPosts';
export { staticRoutes, notFoundRoute } from './content/staticRoutes';

// Lazy routemodules moeten geladen zijn vóór renderToString, anders rendert
// React de Suspense-fallback in plaats van de pagina-inhoud. Eén keer laden
// volstaat: React cachet resolved lazy components.
let preloaded: Promise<unknown> | null = null;
function preloadAllRoutes() {
  preloaded ??= Promise.all(Object.values(routePreloads).map((load) => load()));
  return preloaded;
}

export async function render(url: string) {
  await preloadAllRoutes();

  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppContent />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  return { html, helmet: helmetContext.helmet! };
}
