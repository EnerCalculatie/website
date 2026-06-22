# AI Assistant Guidelines - EnerCalculatie Website

Dit bestand bevat de belangrijkste architectuur- en stijlregels voor de EnerCalculatie marketingwebsite. Raadpleeg deze regels voordat je code wijzigt of toevoegt.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React, Framer Motion (`motion/react`).
- **Backend:** Node.js, Express, TypeScript (via `tsx` in dev, `esbuild` voor productie).
- **Diensten:** Resend (E-mail API), Railway (Hosting).

## Commando's & Scripts
- `npm run start:dev` - Start beide servers lokaal (Frontend op :3000, Backend op :3001).
- `npm run dev` - Start alléén de frontend (Vite).
- `npm run dev:backend` - Start alléén de backend (Express via tsx).
- `npm run build` - Compileer frontend (`/dist`) en backend (`server.js`) voor de live omgeving.
- `npm run start` - Start de gecombineerde productie server (nodig voor Railway).

## Architectuur & Flow
1. **API Communicatie:** De frontend communiceert altijd via `/api/...` (bijv. `/api/contact`). Lokaal vangt de Vite proxy dit af en stuurt het naar poort 3001. In productie handelt de Express server dit direct af.
2. **Geheimen:** Gebruik áltijd `.env` voor keys (zoals `RESEND_API_KEY`). Plaats geen keys of credentials in de code.
3. **Productie Routing:** In `NODE_ENV=production` serveert de Express server de frontend vanuit de `/dist` map en fallbackt onbekende routes naar `index.html`.

## Design & Code Regels
- **Tablet/Mobile-First:** Raakvlakken (buttons, links) moeten minimaal 48px hoog/breed zijn. Tekst minimaal 16px voor leesbaarheid. Gebruik `aria-label` op icon-knoppen.
- **Animaties:** Houd animaties professioneel en subtiel. Gebruik `staggerChildren` en `spring` overgangen voor lijsten en grids via Framer Motion.
- **Console Logs:** Laat geen `console.log()` achter in productiecode. Vang errors netjes af in `try/catch` blokken en geef betekenisvolle UI feedback aan de gebruiker.
- **TypeScript:** Vermijd het gebruik van `any`. Definieer interfaces voor props en state.
- **Mock-data:** Plaats geen tijdelijke/mock-data of test-credentials in de uiteindelijke code.

## Veiligheid
- Alle formulieren moeten beschermd zijn met een (onzichtbare) 'honeypot' tegen bots.
- Gegevens in contactformulieren tijdelijk veiligstellen in `sessionStorage` voorkomt frustratie bij per ongeluk herladen.

## SEO & Metadata Regels
- **Titel-sync:** De `<title>` in `index.html` en de default `title` prop in `SEO.tsx` moeten altijd identiek zijn. Google indexeert de server-rendered title in index.html totdat React geladen is.
- **Meta description-sync:** elke route krijgt zijn eigen statische description via de prerendering-pipeline (`scripts/prerender.mjs`) — niet alleen de homepage-default in `SEO.tsx` aanpassen, want dat werkt pas na een nieuwe build/prerender-run. Voeg bij een nieuwe route altijd een eigen `description`-prop toe aan de `<SEO />`-call van die pagina.
- **Canonical:** Alle inner routes (privacy, voorwaarden) moeten hun eigen canonical URL meekrijgen via de `canonical` prop van `<SEO />` — niet de homepage-canonical hergebruiken.
- **Schema:** `SEO.tsx` bevat Organization + BreadcrumbList schema. Voeg per pagina-type aanvullende schema's toe (SoftwareApplication voor de homepage, FAQPage in FAQ.tsx).
- **Geen absolute claims in copy of meta:** "foutloos", "altijd correct", "0% foutmarge" zijn juridisch riskant. Gebruik "gevalideerd", "deterministisch berekend" of "kloppend".
- **Publieke bestanden vereist:** `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` en `public/pricing.md` moeten aanwezig zijn. Zie de open-taken backlog in memory.

## Integraties & Claims
- **Alleen bevestigde integraties tonen als "Beschikbaar":** Op dit moment is alleen PDOK Kadaster live. Exact Online, Teamleader en AFAS zijn in ontwikkeling — toon als "Binnenkort" in `Integrations.tsx`.
- **Testimonials:** Gebruik uitsluitend echte klantquotes met toestemming. Geen placeholder-namen.

## Framer Motion TypeScript
- Gebruik `import type { Variants } from 'motion/react'` en typeer variant-objecten expliciet: `const myVariants: Variants = { ... }`. Dit voorkomt TS2322-fouten bij `type: 'spring'` in transition-objecten.

## Observability & Systeem Schema's
- **Health Endpoint (`GET /api/health`):**
  Het endpoint retouneert altijd een 200 OK response (zodat monitortools de JSON kunnen parsen) en bevat nooit PII of secrets. 
  ```json
  {
    "status": "ok" | "degraded" | "down",
    "db": { "ok": boolean, "latencyMs": number },
    "auth": { "ok": boolean },
    "ai": { "ok": boolean, "provider": string, "model": string },
    "system": { "uptime": number, "memoryMb": number, "env": string, "commit": string }
  }
  ```
  *Regel:* De status aggregatie logt naar `system_logs` uitsluitend wanneer er een wijziging in de globale status optreedt (bijv. ok → degraded).