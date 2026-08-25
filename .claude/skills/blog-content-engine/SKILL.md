---
name: blog-content-engine
description: Regels en workflow voor blogartikelen op de EnerCalculatie website — nieuw artikel toevoegen, titel/meta-limieten, QC-gates op AI-content, samenvoegen van artikelen (301-redirects), IndexNow, de multi-agent content-pipeline (publish-blog-post.yml, scripts/content-engine/) en de LinkedIn-repurposing erna. Gebruik deze skill bij het schrijven, reviewen of debuggen van blogartikelen of de content-generatie-pipeline.
---

## Nieuw Blogartikel — Verplichte Checklist
Een nieuw blogartikel vereist wijzigingen op precies drie plekken:
1. `src/components/blog/<Naam>Article.tsx` — artikelcomponent. **Geen `<SEO />`-call**: `BlogPostLayout` regelt title/description/canonical centraal uit de metadata. **Geen `<h1>`**: die rendert `BlogPostLayout` uit `post.title` — een eigen h1 geeft een dubbele H1 en faalt de QC. **Geen dubbele FAQ in markdown**: als `faq` in de metadata is ingevuld, tekent `BlogPostLayout` dit al als een mooi opgemaakt FAQ-blok onderaan; zet dit dus niet óók in de raw markdown body. **Tailwind via ReactMarkdown**: Omdat de site Tailwind v4 gebruikt zónder `@tailwindcss/typography` plugin, moeten HTML-elementen (`p`, `h2`, `ul`, `a`, etc.) in de `components` prop van `<ReactMarkdown>` expliciet gestyled worden met classes (bijv. `text-slate-700 leading-relaxed mb-4` voor `p`), anders rendert de tekst zonder enige witruimte of styling.
2. `src/content/blogPosts.ts` — metadata-entry (slug/title/seoTitle/description/excerpt/tags/date).
3. `src/App.tsx` — `lazyRoute('/blog/<slug>', () => import(...))`-declaratie + `<Route path="/blog/<slug>">`. Gebruik ALTIJD `lazyRoute` (niet een statische import): dat houdt de artikelcode uit de initiële bundle én registreert het pad in `routePreloads`, waarop `entry-server.tsx` (prerender) en `main.tsx` (hydration zonder content-flash) vertrouwen.

Al het overige wordt bij de build **gegenereerd uit `blogPosts.ts`** (single source of truth) door `scripts/prerender.mjs` en `server.ts`: prerender-route, server-routemapping, `sitemap.xml`, `blog-index.md`, `blog-<slug>.md` en de blogsectie in `llms.txt`. Voeg die dus NIET handmatig toe — geen entries in `server.ts`/`prerender.mjs`, geen bestanden in `public/`. De slug in `blogPosts.ts` moet exact overeenkomen met het `<Route>`-pad in `App.tsx`, anders prerendert de build een pagina die de router niet kent.

## Titels & Meta — harde limieten
- **`title`** = de volledige, beschrijvende titel. Wordt de H1 en vult de kaarten/RSS. Mag lang zijn.
- **`seoTitle`** = de `<title>`-tag, **max 60 tekens**, zoekwoord vooraan, **zonder merksuffix**. Het oude `` `${post.title} | EnerCalculatie` ``-patroon at 17 tekens op en duwde 26 van de 27 artikelen over de limiet. **Let op HTML-escaping**: een `&` in de titel wordt in de gerenderde `<title>`-tag `&amp;` (5 tekens i.p.v. 1) — `checkArticleMeta`/`deriveSeoTitle` in `content-checks.mjs` tellen daarom de HTML-gerenderde lengte, niet de raw string.
- **`description`** = **max 155 tekens**.
- Deze limieten worden geteld, niet gevraagd: `scripts/lib/content-checks.mjs` gate't ze in de generator én in de CI. Een prompt die om "max 60 tekens" vraagt is geen garantie — dat was precies de bestaande situatie.

## QC — `npm run qc:seo`
`scripts/qc-seo.mjs` draait op de geprerenderde `dist/`, niet op de bron: dat is wat de crawler krijgt. Checkt interne links, title/meta-lengtes, JSON-LD (parseerbaar + `@context`/`@type`), exact één H1, canonical, en de sitemap in beide richtingen (geen 4XX erin, geen indexable pagina eruit).

Draait in `ci.yml` op elke push/PR naar main, én in `publish-blog-post.yml` vóór de push — faalt die, dan worden de artikelbestanden teruggedraaid en publiceert de bot niets. **Verwijder deze gate niet:** tussen 13 en 15 juli 2026 stond `ci.yml` uit, en in dat gat ging een artikel live met `clase=` in plaats van `className=` (11 typecheck-errors op main) en een `ptrdiff`-token middenin de titel. De esbuild-preflight in de generator checkt alleen syntax, geen JSX-props of tekenlimieten.

## E2E-kwaliteitsgates — `npm run test:e2e` (Playwright, 2026-08-25)

`tests/blog-quality.spec.ts` draait tegen de daadwerkelijk gebouwde site (`npm run build` +
`node server.js` met `NODE_ENV=production`, zie `playwright.config.ts`), niet tegen bron-JSX zoals
`qc:seo` — dus browser-gerenderd DOM, echte JSON-LD-parsing, echte link-navigatie. Checkt per
steekproef-artikel: exact 1 H1, canonical/meta-description aanwezig, `og:image` aanwezig, een
CTA-link naar `app.enercalculatie.nl/gratis` met `utm_source=blog` + per-slug `utm_content`
(regressietest op de `blogCtaUrl()`-attributie), en — waar `post.faq` bestaat — dat de zichtbare
FAQ en het JSON-LD FAQPage-schema exact dezelfde vragen bevatten (geen drift, geen duplicaat-FAQ).
Los daarvan: een statische check dat `publish-blog-post.yml` op dinsdag+vrijdag (`2,5`) cront, en
dat het pilot-artikel zijn tabel/SVG-diagram behoudt.

- **`webServer.port` i.p.v. `url`:** server.ts forceert `https` via `x-forwarded-proto` (Railway's
  proxy zet die header normaal) — een lokale request zonder die header krijgt altijd een 301, dus
  een URL-gebaseerde readiness-check zou nooit "klaar" zien. Een kale TCP-poortcheck volstaat.
  Playwright's browser-requests krijgen de header zelf mee via `use.extraHTTPHeaders`.
- **`node server.js`, niet `npm run start`:** de npm-wrapper vertraagde/verstoorde Playwright's
  poort-detectie op Windows.
- **Steekproef, geen alle 76 artikelen:** elke pipeline-run produceert dezelfde
  `BlogPostLayout`-structuur, dus een handvol artikelen dekt de generieke checks; het pilot-artikel
  en één FAQ-artikel zitten er expliciet in zodat die paden niet altijd skippen.
- **`vite.config.ts` `test.exclude` bevat `tests/**` en `.claude/**`:** zonder die exclude pakt
  vitest's default glob (`**/*.{test,spec}.ts`) ook de Playwright-specs en de losse
  `ui-ux-pro-max-skill`-agent-skill op, en faalt daar hard op een ontbrekende/verkeerde runtime.
- CI (`ci.yml`) draait `npx playwright install --with-deps chromium` + `npx playwright test` ná
  `qc:seo` — nog niet live geverifieerd op GitHub Actions, want de Actions-minuten van de org waren
  op tijdens deze sessie (herstel verwacht 1 september 2026, zie dagnotities).

## Kwaliteitsgates op AI-content
`scripts/lib/content-checks.mjs` bevat de deterministische checks; ze voeden de verbeterlus in `generate-blog-post.mjs` (2 pogingen) en keuren daarna hard af.

- **`MIN_WORD_COUNT` (1000):** de SEO/GEO-validator draait op hetzelfde model dat het artikel schreef en zette stukken van 120-300 woorden probleemloos op 80+. Woordental tel je dus. Met Gemini Pro genereren we artikelen van rond de 1000 woorden (5 minuten leestijd). **Loopt de pipeline vast op lengte: verhoog `GEMINI_MODEL`, niet deze drempel verlagen.**
- **`checkSavingsClaims`:** blokkeert een percentage naast besparingstaal ("besparing van meer dan 40% op de energiekosten"), laat marges ("20-60%, afhankelijk van isolatie") en rekenvoorbeelden staan. Bewust smal: een bredere superlatief-regel vlagde "een rendementsverlies van ruim 15% in de voormiddag" — de uitkomst van een rekenvoorbeeld in het beste AI-artikel.
- **`seoTitle`:** moet met een hoofdletter beginnen en mag niet gelijk zijn aan het zoekwoord. Het model leverde ooit letterlijk `hybride warmtepomp business case` als `<title>`.
- **`checkPlanItem`:** controleert backlog-items op vreemde schriften, corruptietokens (zoals `ptrdiff`), en anderstalige woorden om te voorkomen dat corrupte onderwerpen in de backlog belanden.
- **`checkAiLanguage` (`scripts/lib/ai-language-check.mjs`):** blokkeert bekende AI-tells (dezelfde lijst als de `/anti-ai-writing`-skill: "in de wereld van", "naadloos", "wij begrijpen dat"...), een geforceerde samenvattende afsluiter ("Kortom/Al met al/Samenvattend/Tot slot" als opener van de laatste alinea), en overmatig gedachtestreepje-gebruik (>3 per 150 woorden).
- **`checkSpellingGrammar` (`scripts/lib/spelling-check.mjs`):** spelling/grammatica via de publieke LanguageTool-API (nl, geen key nodig). Alleen **GRAMMAR/PUNCTUATION** zijn blokkerend. **TYPOS/CASING bewust niet-blokkerend** (alleen gelogd, niet geretourneerd): drie testruns lieten zien dat TYPOS bijna uitsluitend false positives geeft op Engelse vaktermen ("Dynamic Load Balancing", "Smart Charging") en legitieme NL-samenstellingen ("laadpaaltechnologie", "app-sturing") die niet in het woordenboek zitten — een allowlist bijhouden is daar whack-a-mole. Zelfde precisie-boven-recall-afweging als `checkSavingsClaims`. **Best-effort:** is de publieke API onbereikbaar/rate-limited, wordt dat gelogd en de check overgeslagen in plaats van de hele pipeline te blokkeren op een derde-partij-storing. **`ai-context/known-terms.json`** filtert ook de blokkerende categorieën alvast op bekend jargon/afkortingen (MIA, VAMIL, OCPP...) — uitbreidbaar zonder codewijziging.

## Backfill bronnensectie op bestaande artikelen
Nieuwe artikelen krijgen automatisch een "Bronnen"-sectie (`citation-generator.mjs`, onderdeel van de fact-check-fase hieronder). Artikelen geschreven vóór die pipeline bestond, missen 'm. `scripts/backfill-sources.mjs` haalt dat in: extraheert claims uit al gepubliceerde tekst via Gemini, fact-checkt ze tegen `ai-context/trusted-sources.json` (zelfde logica als de generator), en voegt alleen een Bronnen-sectie toe als er minstens één SUPPORTED-claim is. Idempotent (skipt bestanden die al `Bronnen` bevatten), dus veilig opnieuw te draaien.

Draait via een losse workflow, **`.github/workflows/backfill-sources.yml`** (`workflow_dispatch` alleen, geen schedule) — in tegenstelling tot `publish-blog-post.yml` pusht die NIET direct naar main maar opent een PR: dit raakt in één run tientallen al gepubliceerde artikelen, dat verdient een reviewmoment. Trigger met `gh workflow run backfill-sources.yml`.

## Geen bedragen in AI-content
De generator wijst elk artikel af dat een geldbedrag noemt (`checkNoAmounts` in `scripts/lib/content-checks.mjs`) — body, FAQ, description en keyPoints. Verwijs naar de bron ("de actuele ISDE-bedragen staan op rvo.nl") in plaats van een bedrag te noemen.

**Waarom alleen bedragen, en niet ook percentages of data:** bedragen zijn óf subsidie-/regelgevingsclaims die het model niet betrouwbaar uit zijn geheugen haalt, óf marktprijzen die verouderen. Percentages zijn vaak technisch en legitiem ("85% van het licht bereikt het paneel"); data zijn hier juist de kern ("saldering vervalt per 1 januari 2027"). Die blokkeren zou te veel goede content tegenhouden.

De check geldt **alleen voor de generator**, niet voor `qc:seo`: handgeschreven artikelen noemen bedragen die geverifieerd zijn.

Aanleiding: twee artikelen noemden tegelijk "ISDE bedraagt maximaal €5.000" en "eenmalig €1.025 plus €225 per kW" — die spraken elkaar tegen, dus minstens één stond fout live in FAQPage-schema. Een derde bevatte een verzonnen prijstabel met zilver-zink (AgZn) als thuisbatterij. Alle drie zijn samengevoegd met een 301.

## Samengevoegde artikelen (301)
Staan in `legacyRedirects` in `server.ts`. Bij het samenvoegen van een artikel: entry uit `blogPosts.ts`, component weg, route uit `App.tsx`, 301 toevoegen, en het backlog-item in `content-plan.json` op `abandoned` met een reden — anders pakt de generator het onderwerp opnieuw op.

Bestaande samenvoegingen (301):
- `/blog/warmtepompen-kopen-isde-subsidie` -> `/blog/isde-subsidie-warmtepompen`
- `/blog/isde-subsidie-aanvragen` -> `/blog/isde-subsidie-warmtepompen`
- `/blog/zonnepanelen-netcongestie-advies` -> `/blog/netcongestie-wachtlijst-zakelijk-2026`
- `/blog/thuisbatterij-vergelijking-merken-en-typen` -> `/blog/thuisbatterij-capaciteit-kiezen`
- `/blog/dynamisch-energiecontract-sturing-thuisbatterij-warmtepomp` -> `/blog/dynamische-energiecontracten-adviseren-sturing-batterij-warmtepomp` (2026-08-25, content-inventarisatie funnel-herinrichting. **Correctie**: de eerste analyse noemde hier ten onrechte "geen deterministische dedup-check" — die bestaat al sinds 2026-07-15 (`findDuplicateTopic`, zie hieronder) en werkte op zichzelf correct. De echte oorzaak was een matching-bug in `PublishAgent.ts` die het gegenereerde artikel aan het verkeerde backlog-item koppelde, waardoor het echte item op 'planned' bleef staan en de volgende run hetzelfde onderwerp opnieuw genereerde — gefixt, zie `matchPlanItem()` hieronder)
- `/blog/afgiftesysteem-warmtepomp-lage-temperatuur-radiatoren` -> `/blog/radiatoren-geschikt-warmtepomp-lage-temperatuur` (2026-08-25, content-inventarisatie: 100% topic-overlap-paar, beide gegenereerd op 2026-08-03 vanuit hetzelfde plan-item — de verwijderde versie stond in `content-log.json` genoteerd als `status: "rejected-failed-factcheck"` (`factScore: 0`) maar was toch live gepubliceerd, uit de oudere pre-pipeline generator (vóór 2026-08-07, plain `<p>`-tags i.p.v. het huidige markdown+ReactMarkdown-patroon, met bovendien ongerenderde LaTeX-notatie `$\Delta T$` zichtbaar als kapotte tekst). Behouden artikel had wél `factScore: 100`)

## IndexNow
Sleutelbestand `public/<hex>.txt` (publiek by design — het protocol vereist dat de inhoud gelijk is aan de bestandsnaam). `npm run indexnow -- --all` submit alle sitemap-URL's; `npm run indexnow -- /blog/<slug>` een losse. De blogworkflow meldt nieuwe artikelen automatisch aan. Google doet niet mee aan IndexNow en blijft op de sitemap.

`npm run indexnow -- --all` leest URL's uit lokale `dist/sitemap.xml` (build-time snapshot) — bij een lokale ongebouwde checkout mist die de nieuwste artikelen die al wél live staan via Railway. Vergelijk zo nodig met de live sitemap (`curl https://www.enercalculatie.nl/sitemap.xml`) vóór een handmatige bulk-submit.

## Cloudflare kan AI-crawlers blokkeren, los van robots.txt
Cloudflare's "AI bot access"-instelling (dashboard: Security → AI Crawl Control → Security, of de oudere "Block AI bots"-toggle in Security → Settings) blokkeert op edge-niveau — vóórdat robots.txt ooit gelezen wordt. Op 23-07-2026 bleek deze op **Block** te staan voor Search/Agent/Training, wat BingBot, GPTBot, ClaudeBot, Googlebot en anderen structureel weerde ondanks dat `robots.txt` ze expliciet toestaat. Gevolg: nul AI-citaties/crawls gemeten, IndexNow-submissies kwamen wel aan maar de crawler die erop afkwam werd geblokkeerd.

Check bij twijfel over crawler-/indexeringsproblemen altijd eerst Cloudflare **Security → Analytics → Events** (filter op `Block`, service "Managed rules", rule "Block AI training crawlers") vóór je in robots.txt of code gaat zoeken. Fix staat in AI Crawl Control → Security → "AI bot access": Search/Agent/Training op "Allow (do not block)".

## Google Search Console — sitemap moet je zelf indienen
GSC pakt een sitemap niet automatisch op, ook niet als hij prima bereikbaar is en in `robots.txt` staat. Op 23-07-2026 bleek de sitemap **nooit ingediend** in de bestaande property (`sc-domain:enercalculatie.nl`) — slechts 4 bekende pagina's/9 clicks totaal ondanks 47 live URL's. Check dit via **Search Console → Indexeren → Sitemaps**; staat er niks in "Verzonden sitemaps", dien `https://www.enercalculatie.nl/sitemap.xml` daar handmatig in.

Na indienen toont GSC eerst "Sitemap kan niet worden gelezen" — dat is normaal en tijdelijk (Google moet nog voor het eerst fetchen, kan uren duren), geen technisch defect. Valideer pas als reëel probleem als de fout na 24+ uur blijft staan.

## Bing Webmaster Tools — los van robots.txt/IndexNow
Bing-verificatie (HTML meta tag of XML-bestand) kan falen met misleidende foutmeldingen ("Incorrect authentication key", "Body tag not found") terwijl content en bestand kloppen — check dan eerst de Cloudflare AI-bot-block hierboven, niet de verificatiemethode zelf.

Los van IndexNow (auto per artikel via de workflow) heeft Bing WMT een **URL Submission**-tool (Configuration → URL Submission) voor handmatige bulk-indiening, max 100 URL's/dag, los quotum van IndexNow. Handig bij een backlog van meerdere artikelen tegelijk of na het herstellen van een crawler-block.

## Content Engine (blog-automatisering) — multi-agent TS-pipeline

**Vervangt de oudere, losstaande scripts** (`generate-blog-post.mjs`, `scripts/seo-geo-validator.mjs`,
`claim-extractor.mjs`/`source-validator.mjs`/`fact-check.mjs` als los aangeroepen stappen).
Die bestaan nog in de repo maar worden door `publish-blog-post.yml` niet meer aangeroepen — deze
sectie beschreef tot 2026-08-07 nog de oude flow, was niet meegesynct met de vervanging.
Opruimen van de dode bestanden staat nog open.

De blog-cronjob (`.github/workflows/publish-blog-post.yml`, di+vr 05:00 UTC) draait nu
`npx tsx scripts/content-engine/run-pipeline.ts` (`scripts/content-engine/`, TypeScript,
`run-pipeline.ts` orkestreert 7 agents onder `agents/`):

1. **`scripts/plan-content.mjs`** — vult `ai-context/content-plan.json` aan zolang er <5
   `planned`-items zijn, via Gemini + `ai-context/*.md` (bedrijfscontext). Draait vóór
   `run-pipeline.ts` als losse stap in de workflow. Sinds 2026-08-25 vraagt de LLM-prompt ook een
   `contentType: 'SEO' | 'PRACTICAL'` per item (gevalideerd, anders `undefined` + waarschuwing) —
   zie punt 3a hieronder voor hoe dit wordt afgedwongen.

### Dinsdag = SEO, vrijdag = PRACTICAL (2026-08-25)

`run-pipeline.ts` bepaalt via `requiredContentType()` (Europe/Amsterdam-lokale weekdag, niet UTC)
of de run dinsdag (`SEO`) of vrijdag (`PRACTICAL`) is — alleen bij automatische backlog-selectie,
niet bij een expliciet CLI-onderwerp (handmatige/backfill-run). `pickNextPlannedItem(cwd,
requiredType)` geeft dan voorrang aan een `planned`-item met matchend `contentType`, ook als dat
een lagere prioriteit heeft dan een niet-matchend item; alleen als de backlog géén item van het
gevraagde type heeft, valt het terug op hoogste-prioriteit-ongeacht-type (met een waarschuwing —
dat is het signaal dat de backlog te weinig variatie heeft, geen normale situatie). Het gekozen
`contentType` gaat als extra parameter naar `WriterAgent.run()` (beide aanroepen: eerste
schrijfbeurt én herschrijf-op-feedback), die het als `CONTENTTYPE: SEO`/`CONTENTTYPE: PRACTICAL`
in de userPrompt zet — `writer.md` bevat de twee bijbehorende checklists (zoekintentie/hook/interne
links voor SEO; herkenbaar praktijkprobleem/installateurcontext/commerciële brug voor PRACTICAL).
Backwards compatible: zonder `contentType`-argument (bestaande handmatige aanroepen) gebeurt er
niets — geen `CONTENTTYPE`-regel, gedrag exact zoals vóór 2026-08-25.
2. **`ResearchAgent`** — verzamelt feiten over het gekozen onderwerp (hoogste-prioriteit
   `planned`-item, of een expliciet meegegeven onderwerp), schrijft `research.json`. Vraagt het
   model feiten te putten uit "betrouwbare bronnen genoemd in de systeeminstructie"
   (`prompts/research.md`) — geen live fetch, geen zoekmachine-API.
3. **`WriterAgent`** — schrijft `draft.md`, uitsluitend op basis van de statische kennisbank
   (`scripts/content-engine/knowledge/*.md` — EMS, NEN1010, laadpalen, netbeheer,
   thuisbatterijen, warmtepompen, zonnepanelen; via `services/KnowledgeBase.ts`,
   `getCombinedContext()` leest alle `.md`-bestanden in die map) en de researchfeiten uit stap 2.
   Mag niets verzinnen buiten die twee bronnen.
4. **Kwaliteitsloop (max 2 herschrijf-iteraties):** `FactCheckerAgent` (checkt de draft tegen
   kennisbank + researchfeiten, `fact-check.json`) en `TechnicalReviewerAgent`
   (`technical-review.json`) draaien parallel aan elkaar. Blokkerende issues (`status: 'incorrect'`
   resp. `severity: 'high'`) gaan als feedback terug naar `WriterAgent` voor een herschrijfronde.
   Na 2 pogingen gaat de pipeline door met de beste versie, ook als er nog issues open staan.
5. **`SeoGeoAgent`** — optimaliseert title/meta/slug/FAQ ná de inhoudelijke loop, schrijft
   `seo-optimized.json`. Genereert hier ook `category` (optioneel veld, vrije modelkeuze — zie
   `schemas/seo.ts`) en `keyPoints`.
6. **`QualityGateAgent`** — definitief oordeel (`passed`/`confidence`), leest `seo-optimized.json`
   + de fact-check/tech-review-uitkomsten, schrijft `quality-report.json`. Alleen high-severity
   issues blokkeren publicatie na alle iteraties; medium/low publiceert door met een waarschuwing
   in de workflow-log.
7. **`PublishAgent`** — schrijft bij een `passed`-oordeel het React-component
   (`src/components/blog/<Naam>Article.tsx`, componentnaam = `pascalCase(slug) + 'Article'`),
   werkt `blogPosts.ts`-entry en `App.tsx`-route bij (`lazyRoute` + `<Route>`, zie checklist
   bovenaan dit document), en verifieert de build (`vite build` + prerender) vóórdat er iets
   gecommit wordt.

**Gedeeld met de rest van de pipeline:** `scripts/lib/gemini-config.mjs` (tier/key-resolutie,
zie hieronder), `scripts/lib/json-sanitizer.mjs` (LLM-JSON-reparatie), regels voor AI-JSX (geen
kale `<`/`>` als vergelijkingsteken in lopende tekst — breekt de JSX-parser, schrijf "minder dan
10 jaar"). Windows-ontwikkelaars: repo gebruikt CRLF lokaal, CI (Ubuntu) checkt uit met LF —
regexes op bestandsinhoud (bv. App.tsx-route-anchors) moeten `\r?\n` gebruiken, niet kale `\n`.

**Model & tier-switch:** key-resolutie zit in `scripts/lib/gemini-config.mjs`. `GEMINI_TIER`
(GitHub Actions variable, `free` default of `paid`) bepaalt welke secret gebruikt wordt: `free` →
`GEMINI_API_KEY_FREE` (met `GEMINI_API_KEY` als fallback), `paid` → `GEMINI_API_KEY_PAID`. Cron
draait altijd op `free`; `workflow_dispatch` laat je kiezen (default `free`) — nooit via de losse
repo-variabele `vars.GEMINI_TIER` (staat op `paid`, zou de geplande run anders per ongeluk op de
betaalde key laten draaien). Optionele `GEMINI_MODEL`-variable. Calls naar
`generativelanguage.googleapis.com`.

**Cloud-fallback:** er is een disabled Claude Code-routine (`trig_01XyrunYbmJQg9m7haGzfvv7`,
zelfde cron-schema) die dezelfde pipeline **zonder Gemini** draait — de agent schrijft/beoordeelt
het artikel zelf met zijn eigen model. Alleen te activeren als de GitHub Actions-workflow
structureel kapot is.

**Bronnen-fact-check (`checkNoAmounts`, "Bronnen"-sectie):** de oudere evidence-based
fact-check-fase (`ai-context/trusted-sources.json`, `claim-extractor.mjs`/`source-validator.mjs`/
`fact-check.mjs`/`citation-generator.mjs`, live URL-fetch per claim) draait **niet** meer als
onderdeel van de dagelijkse generatie — die logica leefde in `generate-blog-post.mjs`, dat niet
meer wordt aangeroepen. Wél nog actief: `scripts/backfill-sources.mjs` (zie hieronder), dat
dezelfde `trusted-sources.json`-registry en fact-check-aanpak gebruikt, maar als losse,
handmatig-getriggerde workflow. De huidige `FactCheckerAgent` (stap 4 hierboven) checkt tegen de
statische kennisbank, niet tegen live-gefetchte bronnen — geen aparte "Bronnen"-sectie-generatie
in de dagelijkse flow.

## LinkedIn-repurposing (na publicatie)

Na een geslaagde publicatie (nieuwe slug bekend) zet `scripts/generate-social.mjs` het artikel om
in 3 LinkedIn-posts (Gemini) en committeert dat apart naar `src/content/social/<Naam>Article-social.md`
(twee losse stappen ná IndexNow in `publish-blog-post.yml`, `continue-on-error: true` — mislukt de
repurposing, dan blijft het artikel zelf gewoon gepubliceerd).

- **Slug-lookup via `App.tsx`**, niet via bestandsnaam-conventie: de route-registratie
  (`lazyRoute('/blog/<slug>', () => import('./components/blog/<Naam>')...)`) is de enige bron die
  gegarandeerd klopt. Een pascalCase(slug)-conversie faalt voor 11 van de 54 (oudere, pre-pipeline)
  artikelen waarvan de componentnaam niet 1-op-1 uit de slug volgt (bv. slug
  `salderingsregeling-2027` → component `SalderingsregelingArticle.tsx`, zonder jaartal).
- **`maxOutputTokens: 4000`, niet 1000:** `gemini-3.6-flash` denkt standaard
  (`thoughtsTokenCount`, niet uitzetbaar voor dit model — `thinkingBudget: 0` geeft een 400
  INVALID_ARGUMENT), en dat verbruikt het `maxOutputTokens`-budget vóórdat er ook maar iets van de
  3 posts gegenereerd is. Op 1000 stopte de call op `finishReason: MAX_TOKENS` tijdens het denken
  zelf — output was een afgekapt fragment van de interne redenering, niet bruikbaar. Een expliciete
  check op `finishReason === 'MAX_TOKENS'` laat een toekomstige afgekapte response hard falen i.p.v.
  half publiceren.
- Handmatig testen: `node scripts/generate-social.mjs <slug>` (vereist `GEMINI_API_KEY` — staat
  niet in dit Railway-project maar in `EnerCalculatie` (app-repo, service `enercalculatie`); ophalen
  via `railway run` in die project-link).

## CTA naar /gratis — al automatisch, niet in WriterAgent-prompt zetten (2026-08-25)

`BlogPostLayout` plaatst op **elk** artikel automatisch en onvoorwaardelijk een `InlineCTA`
halverwege de tekst en een `FreeIntakeCTA` onderaan — beide via `blogCtaUrl()`
(`src/components/blogCtaUrl.ts`) met per-artikel UTM-attributie (`utm_source=blog`,
`utm_content=<slug>`, `utm_campaign=inline|bottom`). Dit was al gebouwd vóórdat de
funnel-herinrichting (2026-08-25) startte — niet opnieuw uitvinden. `writer.md` instrueert de
Writer daarom expliciet om **geen eigen CTA-link** te schrijven: een handmatige markdown-link zou
dubbelop zijn en (zonder per-slug `utm_content`) slechtere attributie geven dan de bestaande
componenten.

## Visuals in artikelen — SVG-diagram, geen AI-image-generation (2026-08-25)

Onderzocht als onderdeel van de funnel-herinrichting: er bestaat **geen** AI-image-generation in
deze pipeline. Elk artikel hergebruikt één van een handjevol generieke categorie-stockfoto's
(`/og-zonnepanelen.jpg`, `/og-warmtepomp.jpg`, etc. in `src/content/blogPosts.ts`, veld `image`) —
puur voor OG/meta, niet inline in de body. Bewuste keuze, geen losse eind: **geen AI-hero-image
bouwen**, wél inline SVG-diagrammen voor cijfermatige content.

- **Waarom geen AI-image-generation:** nieuwe kosten/secret/faalmodus in de pipeline, én een
  fotorealistische AI-afbeelding kan technisch onjuiste details tonen (paneel-oriëntatie,
  bekabeling) — risicovol op een technisch kennisplatform waar feitelijke juistheid de kernbelofte
  is.
- **Waarom wél inline SVG:** gratis, geen dependency-risico, blijft per definitie in sync met de
  cijfers in het artikel (data-gedreven component, geen los plaatje dat kan verouderen).
- **Niet automatiseerbaar per artikel:** een SVG-diagram vraagt per onderwerp een eigen
  layout/databinding-keuze (welke categorieën, welke as, welke eenheid) — in tegenstelling tot een
  generieke Markdown-tabel kan de tekst-only Writer/SeoGeo-pipeline dit niet zelf genereren. Dit is
  dus **geen** automatische stap voor elk van de 2x/week artikelen, maar een bewuste, handmatige
  toevoeging per uitgelicht artikel (voorbeeld:
  `ZonnepanelenMeerdereDakvlakkenJaaropbrengstBerekenenArticle.tsx`, component
  `DakvlakOpbrengstDiagram`).
- **Tabellen wél generiek automatisch:** `remark-gfm` + `table`/`thead`/`th`/`td`-componenten
  zitten sinds 2026-08-25 in zowel de handmatige artikelen als `PublishAgent.buildComponentSource`
  (de template die de pipeline gebruikt) — Markdown-tabellen renderen dus voor elk toekomstig
  pipeline-artikel out-of-the-box.

## Redactionele categorie (`category`-veld)

Alle 54 artikelen hebben sinds 2026-08-07 een `category` (voedt het filter en de
categorie-specifieke CTA op `/blog`, zie `categoryCta.ts`) — de 18 die dit misten (grotendeels
pre-pipeline artikelen) zijn handmatig ingedeeld op basis van titel/tags, consistent met de
bestaande indeling (bv. ISDE-getagde warmtepomp-artikelen vallen onder `Warmtepompen`, niet
`Subsidies`). Nieuwe artikelen krijgen dit veld automatisch van `SeoGeoAgent` (stap 5 hierboven,
optioneel modelveld) — geen handmatige actie meer nodig, maar niet gegarandeerd gevuld: check bij
een nieuw artikel of `category` echt is meegekomen in de `blogPosts.ts`-entry.
