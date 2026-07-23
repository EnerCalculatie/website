---
name: blog-content-engine
description: Regels en workflow voor blogartikelen op de EnerCalculatie website — nieuw artikel toevoegen, titel/meta-limieten, QC-gates op AI-content, samenvoegen van artikelen (301-redirects), IndexNow, en de geautomatiseerde SEO/GEO content-pipeline (daily-blog-post.yml). Gebruik deze skill bij het schrijven, reviewen of debuggen van blogartikelen of de content-generatie-pipeline.
---

## Nieuw Blogartikel — Verplichte Checklist
Een nieuw blogartikel vereist wijzigingen op precies drie plekken:
1. `src/components/blog/<Naam>Article.tsx` — artikelcomponent. **Geen `<SEO />`-call**: `BlogPostLayout` regelt title/description/canonical centraal uit de metadata. **Geen `<h1>`**: die rendert `BlogPostLayout` uit `post.title` — een eigen h1 geeft een dubbele H1 en faalt de QC.
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

Draait in `ci.yml` op elke push/PR naar main, én in `daily-blog-post.yml` vóór de push — faalt die, dan worden de artikelbestanden teruggedraaid en publiceert de bot niets. **Verwijder deze gate niet:** tussen 13 en 15 juli 2026 stond `ci.yml` uit, en in dat gat ging een artikel live met `clase=` in plaats van `className=` (11 typecheck-errors op main) en een `ptrdiff`-token middenin de titel. De esbuild-preflight in de generator checkt alleen syntax, geen JSX-props of tekenlimieten.

## Kwaliteitsgates op AI-content
`scripts/lib/content-checks.mjs` bevat de deterministische checks; ze voeden de verbeterlus in `generate-blog-post.mjs` (2 pogingen) en keuren daarna hard af.

- **`MIN_WORD_COUNT` (1000):** de SEO/GEO-validator draait op hetzelfde model dat het artikel schreef en zette stukken van 120-300 woorden probleemloos op 80+. Woordental tel je dus. Met Gemini Pro genereren we artikelen van rond de 1000 woorden (5 minuten leestijd). **Loopt de pipeline vast op lengte: verhoog `GEMINI_MODEL`, niet deze drempel verlagen.**
- **`checkSavingsClaims`:** blokkeert een percentage naast besparingstaal ("besparing van meer dan 40% op de energiekosten"), laat marges ("20-60%, afhankelijk van isolatie") en rekenvoorbeelden staan. Bewust smal: een bredere superlatief-regel vlagde "een rendementsverlies van ruim 15% in de voormiddag" — de uitkomst van een rekenvoorbeeld in het beste AI-artikel.
- **`seoTitle`:** moet met een hoofdletter beginnen en mag niet gelijk zijn aan het zoekwoord. Het model leverde ooit letterlijk `hybride warmtepomp business case` als `<title>`.
- **`checkPlanItem`:** controleert backlog-items op vreemde schriften, corruptietokens (zoals `ptrdiff`), en anderstalige woorden om te voorkomen dat corrupte onderwerpen in de backlog belanden.

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

## IndexNow
Sleutelbestand `public/<hex>.txt` (publiek by design — het protocol vereist dat de inhoud gelijk is aan de bestandsnaam). `npm run indexnow -- --all` submit alle sitemap-URL's; `npm run indexnow -- /blog/<slug>` een losse. De blogworkflow meldt nieuwe artikelen automatisch aan. Google doet niet mee aan IndexNow en blijft op de sitemap.

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
