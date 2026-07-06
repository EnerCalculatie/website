import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import {routePreloads} from './routePreloads';
import './index.css';

const rootElement = document.getElementById('root')!;

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

async function start() {
  if (rootElement.hasChildNodes()) {
    // Prerenderde HTML aanwezig: laad eerst de lazy module van de huidige
    // route, anders vervangt de Suspense-fallback de al zichtbare content
    // tijdens hydration (flash naar blanco pagina).
    const preload = routePreloads[window.location.pathname.replace(/\/+$/, '') || '/'];
    if (preload) {
      try {
        await preload();
      } catch {
        // Module laden mislukt (bv. offline of oude chunk-hash na deploy):
        // hydrateer alsnog; Suspense haalt de module daarna zelf op.
      }
    }
    hydrateRoot(rootElement, app);
  } else {
    // Fallback voor development mode of als prerendering faalt.
    createRoot(rootElement).render(app);
  }
}

void start();
