import 'dotenv/config'; // Dit laadt de .env direct in tijdens de import-fase

import express from 'express';
import rateLimit from 'express-rate-limit';
import contactRouter from './contact';
import leadMagnetRouter from './leadMagnet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Begrens formulier-inzendingen tegen spam/misbruik (beide endpoints versturen e-mail via Resend).
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

// Gebruik de contact en lead-magnet routers voor alle /api routes
app.use('/api', formLimiter, contactRouter);
app.use('/api', formLimiter, leadMagnetRouter);
 
// Serveer de frontend in productie
if (process.env.NODE_ENV === 'production') {
  // Dwing alleen https af. Geen www/non-www herschrijving hier: enercalculatie.nl
  // (zonder www) heeft momenteel geen DNS-record, alleen www.enercalculatie.nl
  // resolvet. Een host-redirect zou bezoekers naar een niet-bestaand domein sturen.
  app.use((req, res, next) => {
    const isHttps = req.header('x-forwarded-proto') === 'https';
    if (!isHttps) {
      return res.redirect(301, `https://${req.header('host')}${req.originalUrl}`);
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
    '/kennisbank': 'kennisbank.html',
    '/kennisbank/salderingsregeling-2027': 'kennisbank-salderingsregeling-2027.html',
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