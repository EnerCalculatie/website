import 'dotenv/config'; // Dit laadt de .env direct in tijdens de import-fase

import express from 'express';
import contactRouter from './contact';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Gebruik de contact router voor alle /api routes
app.use('/api', contactRouter);
 
// Serveer de frontend in productie
if (process.env.NODE_ENV === 'production') {
  // Dwing https + non-www af richting de canonical host, tegen duplicate-content via twee URL-varianten.
  app.use((req, res, next) => {
    const isHttps = req.header('x-forwarded-proto') === 'https';
    const host = req.header('host') || '';
    const canonicalHost = host.replace(/^www\./, '');
    if (!isHttps || host !== canonicalHost) {
      return res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
    }
    next();
  });

  // Serveer de statische bestanden uit de 'dist' map
  app.use(express.static(path.join(__dirname, 'dist')));
 
  // Elke bekende client-side route heeft een eigen voorgerenderde HTML
  // (met de juiste title/meta/canonical/schema al ingebakken — zie scripts/prerender.mjs).
  const prerenderedRoutes: Record<string, string> = {
    '/': 'index.html',
    '/privacy': 'privacy.html',
    '/voorwaarden': 'voorwaarden.html',
    '/verwerkersovereenkomst': 'verwerkersovereenkomst.html',
  };

  // Voor alle andere requests: serveer de voorgerenderde 404-pagina
  // met een echte 404-status, zodat crawlers geen soft-404 zien.
  app.get('*', (req, res) => {
    const file = prerenderedRoutes[req.path] ?? '404.html';
    const status = prerenderedRoutes[req.path] ? 200 : 404;
    res.status(status).sendFile(path.join(__dirname, 'dist', file));
  });
} else {
  // Simpele welkomstpagina voor de backend in development
  app.get('/', (req, res) => {
    res.send('✅ EnerCalculatie Backend API draait succesvol! Open http://localhost:3000 in je browser om de website te bekijken.');
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Backend server luistert op http://localhost:${port}`);
});