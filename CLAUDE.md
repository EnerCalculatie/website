# AI Assistant Guidelines - EnerCalculatie Website

Dit bestand bevat de belangrijkste architectuur- en stijlregels voor de EnerCalculatie marketingwebsite. Raadpleeg deze regels voordat je code wijzigt of toevoegt.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React, Framer Motion (`motion/react`).
- **Backend:** Node.js, Express, TypeScript (via `tsx` in dev, `esbuild` voor productie).
- **Diensten:** Resend (E-mail API contact/lead-magnet), Brevo (nieuwsbrief, double opt-in), Railway (Hosting).

## Commando's & Scripts
- `npm run start:dev` - Start beide servers lokaal (Frontend op :3000, Backend op :3001).
- `npm run dev` - Start alléén de frontend (Vite).
- `npm run dev:backend` - Start alléén de backend (Express via tsx).
- `npm run build` - Compileer frontend (`/dist`) en backend (`server.js`) voor de live omgeving.
- `npm run start` - Start de gecombineerde productie server (nodig voor Railway).

## Architectuur & Flow
1. **API Communicatie:** De frontend communiceert altijd via `/api/...` (bijv. `/api/contact`). Lokaal vangt de Vite proxy dit af en stuurt het naar poort 3001. In productie handelt de Express server dit direct af.
2. **Geheimen:** Gebruik áltijd `.env` voor keys (zoals `RESEND_API_KEY`, `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_TEMPLATE_ID`). Plaats geen keys of credentials in de code.
3. **Nieuwsbrief (Brevo):** `/api/newsletter` (`newsletter.ts`) registreert e-mailadressen via Brevo's `doubleOptinConfirmation`-endpoint — geen directe inschrijving, de abonnee moet eerst een bevestigingsmail (Brevo-template) accepteren. De lijst/template wordt beheerd in het Brevo-dashboard, niet in code.
4. **Productie Routing:** In `NODE_ENV=production` serveert de Express server de frontend vanuit de `/dist` map en fallbackt onbekende routes naar `index.html`.

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
- **Publieke bestanden vereist:** `public/robots.txt`, `public/llms.txt`, `public/llms-full.txt` en `public/pricing.md` moeten aanwezig zijn. `sitemap.xml`, `blog-index.md` en `blog-<slug>.md` staan NIET in `public/` — die genereert `scripts/prerender.mjs` bij de build in `dist/` uit `blogPosts.ts`. De blogsectie van `llms.txt` wordt eveneens bij de build aangevuld; het bestand in `public/` is de basis zonder bloglijst.

## Nieuw Blogartikel — Verplichte Checklist
Een nieuw blogartikel vereist wijzigingen op precies drie plekken:
1. `src/components/blog/<Naam>Article.tsx` — artikelcomponent.
2. `src/content/blogPosts.ts` — metadata-entry (slug/title/description/excerpt/tags/date).
3. `src/App.tsx` — import + `<Route path="/blog/<slug>">`.

Al het overige wordt bij de build **gegenereerd uit `blogPosts.ts`** (single source of truth) door `scripts/prerender.mjs` en `server.ts`: prerender-route, server-routemapping, `sitemap.xml`, `blog-index.md`, `blog-<slug>.md` en de blogsectie in `llms.txt`. Voeg die dus NIET handmatig toe — geen entries in `server.ts`/`prerender.mjs`, geen bestanden in `public/`. De slug in `blogPosts.ts` moet exact overeenkomen met het `<Route>`-pad in `App.tsx`, anders prerendert de build een pagina die de router niet kent.

## Integraties & Claims
- **Alleen bevestigde integraties tonen als "Beschikbaar":** Op dit moment is alleen PDOK Kadaster live. Exact Online, Teamleader en AFAS zijn in ontwikkeling — toon als "Binnenkort" in `Integrations.tsx`.
- **Testimonials:** Gebruik uitsluitend echte klantquotes met toestemming. Geen placeholder-namen.

## Framer Motion TypeScript
- Gebruik `import type { Variants } from 'motion/react'` en typeer variant-objecten expliciet: `const myVariants: Variants = { ... }`. Dit voorkomt TS2322-fouten bij `type: 'spring'` in transition-objecten.

## Observability & Systeem Schema's
- **Health Endpoint (`GET /api/health`, `health.ts`):**
  Het endpoint retourneert altijd een 200 OK response (zodat monitortools de JSON kunnen parsen) en bevat nooit PII of secrets. Het checkt Resend (`/api-keys`, niet `/v1/keys` of `/v1/domains` — die geven een 405 op GET) en Brevo (`/v3/account`) met een 2s timeout per call.
  ```json
  {
    "status": "ok" | "degraded",
    "message": "Backend API is running.",
    "email": {
      "resend": { "ok": boolean, "error"?: string },
      "brevo": { "ok": boolean, "error"?: string }
    }
  }
  ```
  *Regel:* `status` wordt `degraded` als Resend of Brevo niet bereikbaar is. Dit endpoint loopt buiten de `formLimiter` in `server.ts` — monitortools pollen het regelmatig en zouden anders het formulier-quotum opmaken. Er is geen los admin-dashboard of login meer voor deze data (die superadmin-aanpak is teruggedraaid, zie git-historie rond `597032b`); roep de URL direct aan of koppel een externe uptime-monitor erop.