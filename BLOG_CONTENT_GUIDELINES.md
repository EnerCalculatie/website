# EnerCalculatie — Blog Content Guidelines

> **Wat dit is:** de standaard voor HOE een blogartikel wordt gemaakt (structuur, marketing, UX, SEO/GEO).
> **Wat dit niet is:** feitenbron. Technische/normatieve feiten komen uitsluitend uit `scripts/content-engine/knowledge/*.md`
> en `research.json`. Deze twee bronnen blijven strikt gescheiden — KNOWLEDGE = wat waar is, GUIDELINES = hoe het wordt verteld.
>
> Ingevoerd 2026-09-02 na een contentkwaliteits-audit (zie PR die dit bestand toevoegt). Benchmark voor "wat niet moet":
> het 3×25A-artikel (`/blog/3x25a-aansluiting-all-electric-woning-nen-1010`) vóór deze upgrade — droge definitie-opening,
> geen visual, geen praktijkcase, EnerCalculatie als losse reclame.

## Doelgroep en kernvraag

Primair: Nederlandse zzp-installateurs, kleine en MKB-installatiebedrijven, actief in zonnepanelen, thuisbatterijen,
warmtepompen, airco, laadpalen, energiemanagement.

Elke alinea toetst aan: **"Welke technische of commerciële beslissing kan deze installateur beter nemen na het lezen
van dit artikel?"** Geen antwoord op die vraag = de alinea voegt niets toe.

## Informatiearchitectuur: 10 seconden → 2 minuten → verdieping

Elk artikel volgt deze volgorde, ongeacht onderwerp:

1. **10 seconden** — direct zichtbaar: het probleem, waarom het relevant is voor een installateur, de belangrijkste
   conclusie/het belangrijkste cijfer, en (waar zinvol) een visueel element. Dit is de hook — zie ook `writer.md`'s
   10-secondentest.
2. **2 minuten** — praktijkvoorbeeld, rekenvoorbeeld, scenario's, risico's, concrete aanbevelingen.
3. **Verdieping** — pas hierna: normen, technische details, uitzonderingen, bronnen, achtergrond.

Een artikel dat met een droge definitie of normverwijzing opent, faalt deze structuur — ongeacht hoe correct de
definitie is.

## WOW-element (visual)

Elk artikel overweegt een visueel element via `ArticleVisual` (`src/components/blog/ArticleVisual.tsx`):
`bar_chart` of `comparison` (huidige implementatie). Kies een visual als de inhoud zich ervoor leent (vergelijking,
verdeling, scenario's naast elkaar) — **niet ter decoratie**, en **nooit met verzonnen cijfers**. Illustratieve
cijfers (bijv. binnen een fictieve praktijkcase) worden expliciet als zodanig gemarkeerd (`illustrative: true` in de
visual-spec, en in de tekst zelf benoemd als voorbeeld, niet als gemeten feit).

Niet elk artikel heeft een zinvolle visual — dat is een bewuste, expliciete keuze per artikel, geen verplichting.

## Praktijkcase

Waar het onderwerp zich ervoor leent: een realistische installateurscase (bijv. "een woning met 3×25A, warmtepomp,
inductie en 11 kW laadpaal"). Structuur: uitgangssituatie → probleem → berekening → oplossing → conclusie. Schrijf dit
als een herkenbaar, apart tekstblok (bijvoorbeeld als blockquote of onder een duidelijke `### Praktijkcase`-kop) — geen
losse zin ergens halverwege een alinea.

Gebruik alleen cijfers uit `research.json`/de kennisbank, of markeer expliciet als illustratief (zie hierboven) als een
case een gestileerd voorbeeld is.

## Beslisinformatie

Waar mogelijk geeft het artikel antwoord op **"wat moet de installateur nu doen?"** — via een tabel, checklist, of
scenariovergelijking (Markdown-tabel/bullets, geen los component nodig). De lezer moet een concrete vervolgstap
hebben, niet alleen achtergrondkennis.

## Technische en normatieve claims (NEN, NEN1010, NEN3140, ISSO, ACM, netbeheerders, regelgeving)

Dit is high-risk. Bij elke claim die naar een norm/regelgeving verwijst:

1. Formuleer de claim exact — geen parafrase die de norm ruimer laat klinken dan hij is.
2. Controleer of de bron (kennisbank/research.json) de claim daadwerkelijk ondersteunt.
3. Maak onderscheid tussen een algemene regel en een specifieke situatie — een norm die één situatie regelt, is geen
   bewijs voor een algemene conclusie.
4. Trek nooit een algemene conclusie uit een specifieke normbepaling.
5. Bij onzekerheid: markeer voor review (FactCheckerAgent), gok nooit.

Dit is al deels afgedwongen door `fact-checker.md` — dit document is de expliciete, voor mensen leesbare versie van
diezelfde regel.

## EnerCalculatie-positionering

Structuur: **Probleem → inzicht → oplossing → toepassing → EnerCalculatie.** EnerCalculatie verschijnt nooit als losse
advertentie halverwege of aan het eind zonder opbouw.

Positionering: **"zekerheid vóór de offerte"** — niet "software met veel functies". Gebruik waar relevant: berekenen,
controleren, onderbouwen, scenario's vergelijken, klantadvies, offerte, technische onderbouwing. Geen onbewezen
claims over het product.

De daadwerkelijke CTA-link/component wordt niet door de Writer geschreven (zie `writer.md`) — dit gaat over de
content die de brug naar de CTA logisch maakt.

## CTA

Volgt logisch uit het probleem, geeft één duidelijke vervolgstap. Voorbeeldpatroon:

> Twijfelt u welke oplossing bij deze klant past? Bereken de situatie voordat u de offerte opstelt.

## SEO/GEO — verplichte contentstandaard, geen nice-to-have

SEO en GEO zijn **niet** "meer keywords toevoegen". Het is: de duidelijkste, technisch betrouwbaarste beantwoording
van de zoekintentie. Geborgd op drie niveaus — zie `prompts/seo-brief.md` (vóór het schrijven), `writer.md` +
dit document (tijdens het schrijven), `prompts/seo-audit.md` (na het schrijven, met harde minimumdrempels).

SEO/GEO mag **nooit** ten koste gaan van technische juistheid of leesbaarheid. Bij conflict wint de techniek.

## Outputstructuur

Zie `scripts/content-engine/schemas/seo.ts` (`SeoGeoOutputSchema`) voor de machineleesbare velden. Kort:
`content` (artikel), `visual` (optioneel), `faq`, `keyPoints`, plus de bestaande metadata-velden. Praktijkcase en
beslisinformatie zijn bewust **onderdeel van `content`** (herkenbare Markdown-structuur, hergebruikt bestaande
blockquote/tabel-styling in `PublishAgent.buildComponentSource`) — geen aparte velden, om geen parallelle
render-architectuur te bouwen naast wat al bestaat.

## Quality Gate — wat blokkeert, wat niet

1. **Factual/technical correctness** — hard, `QualityGateAgent`, ongewijzigd.
2. **Practical usefulness** — hard, ondergrens, `MarketingGateAgent`.
3. **SEO/GEO** — verplicht, `SeoGeoAgent.audit()`. Bij onvoldoende: terug naar Writer/SeoGeo-optimalisatie
   (zelfde retry-mechanisme als de bestaande fact-check-loop, max 2 iteraties). Na de laatste iteratie zonder
   voldoende score: blokkeert publicatie.
4. **Overige marketingdimensies** (B2B-relevantie, visual impact, scanability, conversion, social repurposability) —
   non-blocking feedback, nooit een publicatiestop.
