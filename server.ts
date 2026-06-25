import 'dotenv/config'; // Dit laadt de .env direct in tijdens de import-fase

import express from 'express';
import rateLimit from 'express-rate-limit';
import leadMagnetRouter from './leadMagnet';
import newsletterRouter from './newsletter';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Railway zet zelf de X-Forwarded-For header (1 proxy-hop); vertrouw alleen die laag,
// anders kan express-rate-limit niet betrouwbaar het echte client-IP bepalen.
app.set('trust proxy', 1);
app.use(express.json());

// Begrens formulier-inzendingen tegen spam/misbruik (contact, lead-magnet en nieuwsbrief delen dit quotum).
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  // Default-handler stuurt plain text, terwijl de frontend altijd response.json() parsed.
  handler: (_req, res) => {
    res.status(429).json({ error: 'Te veel aanvragen. Probeer het over een paar minuten opnieuw.' });
  },
});

// Gebruik de contact, lead-magnet en nieuwsbrief routers voor alle /api routes
app.use('/api', formLimiter, contactRouter);
app.use('/api', formLimiter, leadMagnetRouter);
app.use('/api', formLimiter, newsletterRouter);
 
// Serveer llms.txt vanuit de project root, vóór de static middleware voor productie.
app.get('/llms.txt', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'llms.txt'));
});

// Serveer de frontend in productie
if (process.env.NODE_ENV === 'production') {
  // Dwing https af, en op het eigen domein ook www (www.enercalculatie.nl is canonical,
  // zie SEO.tsx/sitemap.xml/robots.txt: enercalculatie.nl zonder www heeft geen DNS-record).
  // Alleen voor enercalculatie.nl zelf — niet voor de Railway-fallback-host, anders breekt die.
  app.use((req, res, next) => {
    const isHttps = req.header('x-forwarded-proto') === 'https';
    const host = req.header('host') || '';
    const isOwnDomain = host === 'enercalculatie.nl' || host === 'www.enercalculatie.nl';
    const canonicalHost = isOwnDomain && !host.startsWith('www.') ? `www.${host}` : host;
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
    '/nieuwsbrief-bevestigd': 'nieuwsbrief-bevestigd.html',
    '/voorwaarden': 'voorwaarden.html',
    '/verwerkersovereenkomst': 'verwerkersovereenkomst.html',
    '/blog': 'blog.html',
    '/blog/salderingsregeling-2027': 'blog-salderingsregeling-2027.html',
    '/blog/btw-zonnepanelen': 'blog-btw-zonnepanelen.html',
    '/blog/terugleverkosten-thuisbatterij': 'blog-terugleverkosten-thuisbatterij.html',
    '/blog/isde-subsidie-warmtepompen': 'blog-isde-subsidie-warmtepompen.html',
    '/blog/warmtepomp-rendement-aannames': 'blog-warmtepomp-rendement-aannames.html',
    '/rekentool-zonnepanelen': 'rekentool-zonnepanelen.html',
    '/rekentool-thuisbatterij': 'rekentool-thuisbatterij.html',
    '/rekentool-warmtepomp': 'rekentool-warmtepomp.html',
    '/rekentool-airco': 'rekentool-airco.html',
    '/rekentool-laadpaal': 'rekentool-laadpaal.html',
  };

  // Permanente redirects van de oude /kennisbank-URL's naar /blog (URL-rename, behoud SEO-waarde).
  const legacyRedirects: Record<string, string> = {
    '/kennisbank': '/blog',
    '/kennisbank/salderingsregeling-2027': '/blog/salderingsregeling-2027',
    '/kennisbank/btw-zonnepanelen': '/blog/btw-zonnepanelen',
    '/kennisbank/terugleverkosten-thuisbatterij': '/blog/terugleverkosten-thuisbatterij',
  };
  app.get(Object.keys(legacyRedirects), (req, res) => {
    res.redirect(301, legacyRedirects[req.path]);
  });

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