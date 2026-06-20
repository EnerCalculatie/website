import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  // Als er al HTML is (geleverd door de prerenderer), hydrateer deze dan voor optimale performance.
  hydrateRoot(rootElement, app);
} else {
  // Fallback voor development mode of als prerendering faalt.
  createRoot(rootElement).render(app);
}
