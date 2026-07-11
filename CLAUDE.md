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
- **Geen Framer Motion mount-animaties above the fold (Hero/NavBar):** `initial={{ opacity: 0 }}` wordt mee-geprerenderd, waardoor de content onzichtbaar blijft tot de volledige JS-bundle geladen en gehydrateerd is (LCP-killer op mobiel). Gebruik daar de CSS-klassen `.animate-fade-up` + `.anim-delay-*` uit `index.css`. Framer Motion + `whileInView` is prima voor secties onder de vouw.
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
3. `src/App.tsx` — `lazyRoute('/blog/<slug>', () => import(...))`-declaratie + `<Route path="/blog/<slug>">`. Gebruik ALTIJD `lazyRoute` (niet een statische import): dat houdt de artikelcode uit de initiële bundle én registreert het pad in `routePreloads`, waarop `entry-server.tsx` (prerender) en `main.tsx` (hydration zonder content-flash) vertrouwen.

Al het overige wordt bij de build **gegenereerd uit `blogPosts.ts`** (single source of truth) door `scripts/prerender.mjs` en `server.ts`: prerender-route, server-routemapping, `sitemap.xml`, `blog-index.md`, `blog-<slug>.md` en de blogsectie in `llms.txt`. Voeg die dus NIET handmatig toe — geen entries in `server.ts`/`prerender.mjs`, geen bestanden in `public/`. De slug in `blogPosts.ts` moet exact overeenkomen met het `<Route>`-pad in `App.tsx`, anders prerendert de build een pagina die de router niet kent.

## Integraties & Claims
- **Alleen bevestigde integraties tonen als "Beschikbaar":** Op dit moment is alleen PDOK Kadaster live. Exact Online, Teamleader en AFAS zijn in ontwikkeling — toon als "Binnenkort" in `Integrations.tsx`.
- **Testimonials:** Gebruik uitsluitend echte klantquotes met toestemming. Geen placeholder-namen.

## Framer Motion TypeScript
- Gebruik `import type { Variants } from 'motion/react'` en typeer variant-objecten expliciet: `const myVariants: Variants = { ... }`. Dit voorkomt TS2322-fouten bij `type: 'spring'` in transition-objecten.

## SEO/GEO Content Engine (blog-automatisering)
De dagelijkse blog-cronjob (`.github/workflows/daily-blog-post.yml`, ma-vr 05:00 UTC) is uitgebreid met een gestuurde content-pipeline, niet langer vrije onderwerpkeuze door het model:

1. **`ai-context/`** — bevat `company.md`, `products.md`, `audience.md`, `topics.md` (bedrijfscontext, handmatig onderhouden), en drie gegenereerde/gelogde bestanden:
   - `content-plan.json` — backlog. Items hebben `status`: `planned` → `generated` | `rejected` (met `retryCount`, max 2 pogingen daarna `abandoned`) | `abandoned`. Git-getrackt.
   - `content-log.json` — append-only run-log (datum, topic, model, seoScore, geoScore, status, publicationStatus). Git-getrackt.
   - `content-map.json` — **niet** git-getrackt (`.gitignore`), puur afgeleid uit `blogPosts.ts`/`services.ts` bij elke run, voor interne-link-suggesties.
2. **`scripts/plan-content.mjs`** — vult `content-plan.json` aan zolang er <5 `planned`-items zijn, via OpenRouter + `ai-context/*.md`.
3. **`scripts/generate-blog-post.mjs`** — pakt het hoogste-prioriteit `planned`-item, genereert het artikel, valideert via `scripts/seo-geo-validator.mjs` (score-gate: SEO **én** GEO moeten ≥80, één auto-verbeterpoging), draait een JSX-preflight-check (esbuild transform) vóórdat er iets naar schijf gaat — voorkomt orphan-bestanden bij een ongeldige AI-output. Schrijft bij succes dezelfde 3 bestanden als de bestaande blog-flow (component/`blogPosts.ts`-entry/`App.tsx`-route) plus `category`, `faq[]` en `readingTimeMinutes` op de entry.
4. **`scripts/lib/json-sanitizer.mjs`** — gedeelde `sanitizeJsonString()`, want niet elk LLM-model (bv. Llama) levert geldige JSON: rauwe newlines/tabs en ongeldige escapes (`\'`) in stringwaarden worden hier gerepareerd vóór `JSON.parse`.
5. **`scripts/backfill-reading-time.mjs`** — eenmalig backfill-script + geëxporteerde `estimateReadingMinutes()` die ook `generate-blog-post.mjs` gebruikt voor nieuwe artikelen. **Let op:** isoleert eerst de body tussen `<BlogPostLayout>`-tags vóórdat het JS-expressies opschoont — anders vangt de niet-brace-matching `{...}`-regex de functie's eigen `{` en eet bijna de hele body op.
6. **Model:** `OPENROUTER_MODEL` env var/GitHub Actions variable, default `meta-llama/llama-3.3-70b-instruct` (hardcoded fallback in zowel `plan-content.mjs` als `generate-blog-post.mjs`).
7. **Regels voor AI-gegenereerde JSX:** nooit kale `<`/`>` als vergelijkingsteken in lopende tekst (bv. "< 10 jaar") — breekt de JSX-parser; schrijf "minder dan 10 jaar".
8. **Cloud-fallback:** er is een disabled Claude Code-routine (`trig_01XyrunYbmJQg9m7haGzfvv7`, zelfde cron-schema) die dezelfde pipeline **zonder OpenRouter** draait — de agent schrijft/beoordeelt het artikel zelf met zijn eigen model. Alleen te activeren als de GitHub Actions-workflow structureel kapot is; heeft geen eigen OPENROUTER_API_KEY nodig maar ook geen automatische toegang tot iets anders.

Windows-ontwikkelaars: dit repo gebruikt CRLF lokaal (`core.autocrlf=true` is gangbaar), maar de GitHub Actions-runner (Ubuntu) checkt uit met LF. Regexes in de scripts die met bestandsinhoud werken (App.tsx-route-anchors, content-map-parsing) moeten `\r?\n` gebruiken, niet kale `\n` — een eerdere bug werkte toevallig op CI maar faalde lokaal.

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