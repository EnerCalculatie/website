import 'dotenv/config'; // Dit laadt de .env direct in tijdens de import-fase

import express from 'express';
import rateLimit from 'express-rate-limit';
import contactRouter from './contact';
import leadMagnetRouter from './leadMagnet';
import newsletterRouter from './newsletter';
import healthRouter from './health';
import rssRouter from './rss';
import { blogPosts } from './src/content/blogPosts';
import { staticRoutes } from './src/content/staticRoutes';
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
// Geen formLimiter op /api/health: monitortools pollen dit endpoint regelmatig
// en zouden anders zelf het formulier-quotum opmaken.
app.use('/api', healthRouter);
// Geen formLimiter op de RSS-feed: Zapier pollt dit regelmatig voor de LinkedIn-automatisering
// en zou anders zelf het formulier-quotum opmaken.
app.use(rssRouter);

// llms.txt heeft geen eigen route meer: het basisbestand staat in public/, de
// prerender-stap vult het aan met de bloglijst en de static middleware serveert het.

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
  // Volledig afgeleid: statische routes uit staticRoutes.ts, blogroutes uit
  // blogPosts.ts — dezelfde twee bronnen die prerender en sitemap gebruiken.
  // Handmatig bijhouden liet /over-ons hier ontbreken, waardoor die pagina een
  // 404 gaf terwijl hij wél in de sitemap en in elke footer stond.
  const prerenderedRoutes: Record<string, string> = {
    ...Object.fromEntries(staticRoutes.map((r) => [r.url, r.outFile])),
    '/blog': 'blog.html',
    ...Object.fromEntries(blogPosts.map((p) => [`/blog/${p.slug}`, `blog-${p.slug}.html`])),
  };

  // Permanente redirects. Twee groepen:
  // 1. De oude /kennisbank-URL's na de rename naar /blog.
  // 2. Samengevoegde blogartikelen: drie dunne artikelen die op hetzelfde
  //    zoekwoord mikten als een bestaand, uitgebreider artikel en dat in de
  //    zoekresultaten kannibaliseerden. 301 i.p.v. verwijderen, zodat bestaande
  //    links en eventuele opgebouwde SEO-waarde naar het canonieke artikel gaan.
  const legacyRedirects: Record<string, string> = {
    '/kennisbank': '/blog',
    '/kennisbank/salderingsregeling-2027': '/blog/salderingsregeling-2027',
    '/kennisbank/btw-zonnepanelen': '/blog/btw-zonnepanelen',
    '/kennisbank/terugleverkosten-thuisbatterij': '/blog/terugleverkosten-thuisbatterij',
    '/blog/warmtepompen-kopen-isde-subsidie': '/blog/isde-subsidie-warmtepompen',
    '/blog/isde-subsidie-aanvragen': '/blog/isde-subsidie-warmtepompen',
    '/blog/zonnepanelen-netcongestie-advies': '/blog/netcongestie-wachtlijst-zakelijk-2026',
    '/blog/thuisbatterij-vergelijking-merken-en-typen': '/blog/thuisbatterij-capaciteit-kiezen',
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
  console.info(`✅ Backend server luistert op http://localhost:${port}`);
});