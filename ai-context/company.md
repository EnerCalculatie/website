# EnerCalculatie — bedrijfscontext

Bron: `src/content/services.ts`, `src/content/author.ts`, `CLAUDE.md`. Bij wijziging van bedrijfsfeiten: eerst die bronnen updaten, dan dit bestand.

## Wat is EnerCalculatie
SaaS-platform (offerte- en adviessoftware) voor Nederlandse installatiebedrijven in de verduurzamingssector. Automatiseert rendementsberekeningen en adviesrapporten voor zonnepanelen, thuisbatterijen, warmtepompen, airco's en laadpalen.

## Doelgroep
B2B: Nederlandse installatiebedrijven en energieadviseurs (niet de eindconsument/huiseigenaar direct). Content spreekt de installateur aan als professional die zijn klant (de huiseigenaar) adviseert.

## Producten / pakketten
- **Business** — instappakket: zonnepanelen- en thuisbatterij-module.
- **Business PRO** — + warmtepomp-module (ISDE-onderbouwing).
- **Compleet** — + airco- en laadpaal-module.

Zie `src/content/services.ts` voor exacte feature- en FAQ-copy per module.

## Tone of voice
- Formeel Nederlands, "u"-vorm (geen "je/jij").
- Zakelijk, feitelijk, geen overdrijving.
- **Verboden:** absolute claims ("foutloos", "altijd correct", "0% foutmarge") — juridisch risico. Gebruik "gevalideerd", "deterministisch berekend", "kloppend".
- Geen verzonnen cijfers, tarieven of regelgeving. Alleen bronnen: RVO/ISDE, ACM, Netbeheer Nederland, Techniek Nederland, Belastingdienst.
- E-E-A-T: auteur is altijd Pascal van Eijden (oprichter/ontwikkelaar), zie `src/content/author.ts` — geen andere auteursnamen verzinnen.

## Auteur / expertise-signaal
Pascal van Eijden — Oprichter & ontwikkelaar EnerCalculatie. Bouwde het rekenmodel zelf. Aantoonbare kennis: salderingsregeling, rendementsberekening zonnepanelen, thuisbatterij-dimensionering, warmtepomp-rendement (SCOP), ISDE-subsidie, netcongestie.
