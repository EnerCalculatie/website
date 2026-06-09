import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

if (rootElement.hasChildNodes()) {
  // Als er al HTML is (geleverd door de prerenderer), hydrateer deze dan voor optimale performance.
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Fallback voor development mode of als prerendering faalt.
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
