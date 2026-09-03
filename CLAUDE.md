# AI Assistant Guidelines - EnerCalculatie Website

Dit bestand bevat de belangrijkste architectuur- en stijlregels voor de EnerCalculatie marketingwebsite. Raadpleeg deze regels voordat je code wijzigt of toevoegt.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React, Framer Motion (`motion/react`).
- **Hosting:** GitHub Pages (statisch, custom domain `enercalculatie.nl` via `public/CNAME`), gedeployed door `.github/workflows/deploy.yml` bij elke push naar `main`. **Geen Express/Node-backend meer** — die draaide t/m 2026-09 op Railway (`server.ts`), is per 2026-09-03 volledig verwijderd (was al dood: GH Pages kan geen server-side code draaien, formulieren gaven 405 in productie).
- **Formulieren/API:** Cloudflare Worker (`cloudflare-worker/index.js`, script `enercalculatie-forms`) — intercepteert `/api/contact`, `/api/lead-magnet`, `/api/newsletter`, `/api/health` via Cloudflare Routes vóór GitHub Pages. Los deploy-proces, niet gekoppeld aan de GH Pages-build: wijzigingen in `cloudflare-worker/` vereisen handmatig `wrangler deploy` (zie map zelf voor secrets/KV-binding).
- **Diensten:** Resend (contact/lead-magnet-mail), Brevo (nieuwsbrief double opt-in), Cloudflare (DNS, Worker-hosting, WAF).

## Commando's & Scripts
- `npm run dev` - Start de frontend (Vite). Formulieren werken lokaal niet meer tegen een lokale backend — test die tegen de live Worker of met `wrangler dev` in `cloudflare-worker/`.
- `npm run build` - Compileer frontend + SSR + prerender (`/dist`) — dit is wat GH Pages deployt. Geen backend-buildstap meer.

## Architectuur & Flow
1. **API Communicatie:** De frontend roept `/api/...` aan (bijv. `/api/contact`) op hetzelfde domein. Cloudflare Routes sturen die paden naar de Worker (`cloudflare-worker/index.js`); alle andere paden gaan naar GitHub Pages. Geen Vite-devproxy meer (verwijderd uit `vite.config.ts`).
2. **Geheimen:** Worker-secrets (`RESEND_API_KEY`, `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_TEMPLATE_ID`) staan in Cloudflare, gezet via `wrangler secret put` — niet in `.env`/code. Zie `cloudflare-worker/wrangler.toml`.
3. **Nieuwsbrief (Brevo):** `/api/newsletter`-handler in de Worker registreert e-mailadressen via Brevo's `doubleOptinConfirmation`-endpoint — geen directe inschrijving, de abonnee moet eerst een bevestigingsmail (Brevo-template `#4`) accepteren. Lijst (`#3`) en template worden beheerd in het Brevo-dashboard, niet in code.
4. **Productie Routing:** GitHub Pages serveert statische bestanden uit `/dist` direct; `scripts/prerender.mjs` genereert per route een eigen HTML-bestand (incl. geneste GH-Pages-paden voor `/blog/<slug>`). Onbekende routes vallen terug op `dist/404.html`.

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

## Blogartikelen & content-engine
Nieuw artikel toevoegen, titel/meta-limieten, QC-gates op AI-content, samenvoegen van artikelen (301), IndexNow, en de geautomatiseerde SEO/GEO-pipeline: zie skill `blog-content-engine` (`.claude/skills/blog-content-engine/SKILL.md`).
- **JSX-Componentnamen:** Als de gegenereerde slug begint met een getal (bijv. `1-fase-...`), moet de React-componentnaam starten met de prefix `Post` (bijv. `Post1Fase...`) om SyntaxErrors te voorkomen (componentnamen mogen in JS/JSX niet met een getal beginnen).
- **Fact-check (LLM-herstel):** Wanneer het model tijdens de fact-check claims afkeurt die niet letterlijk in `trusted-sources.json` staan (bijv. expliciete "NEN 1010" vermeldingen), is de harde eis in de herstelprompt dat deze specifieke norm/naam of getal *volledig wordt verwijderd* uit de lopende tekst, en niet louter anders geformuleerd.

## Integraties & Claims
- **Alleen bevestigde integraties tonen als "Beschikbaar":** Op dit moment is alleen PDOK Kadaster live. Exact Online, Teamleader en AFAS zijn in ontwikkeling — toon als "Binnenkort" in `Integrations.tsx`.
- **Testimonials:** Gebruik uitsluitend echte klantquotes met toestemming. Geen placeholder-namen.

## Framer Motion TypeScript
- Gebruik `import type { Variants } from 'motion/react'` en typeer variant-objecten expliciet: `const myVariants: Variants = { ... }`. Dit voorkomt TS2322-fouten bij `type: 'spring'` in transition-objecten.

## Observability & Systeem Schema's
- **Health Endpoint (`GET /api/health`):** sinds 2026-09-03 in de Cloudflare Worker (`cloudflare-worker/index.js`), niet meer in Express. Zelfde contract als voorheen: altijd 200 OK (zodat monitortools de JSON kunnen parsen), nooit PII/secrets, checkt Resend (`/api-keys`) en Brevo (`/v3/account`) met een 2s timeout per call, `status` wordt `degraded` bij een onbereikbare dienst. Loopt buiten de form-rate-limiter. Er is geen los admin-dashboard of login meer voor deze data; roep de URL direct aan of koppel een externe uptime-monitor erop.