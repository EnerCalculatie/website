# Producten / rekentool-modules

Bron: `src/content/services.ts` (`services[]`). Dit bestand is een samenvatting voor AI-context — bij twijfel over exacte claims, `services.ts` raadplegen (bevat metaDescription, features, FAQs per module).

## Zonnepanelen (`/zonnepanelen`, pakket: Business)
Rekenmodel bepaalt optimaal aantal panelen, piekvermogen (Wp) en jaaropbrengst uit dakoriëntatie + energierekening (pdf-upload met documentherkenning). Houdt rekening met 0%-btw en afbouw salderingsregeling (volledige afschaffing per 1 januari 2027). Rendementsberekening over 10 en 25 jaar.

## Thuisbatterij (`/thuisbatterij`, pakket: Business)
Dimensionering op basis van berekend opwekoverschot van de zonnepanelen-installatie. Toont stijging zelfconsumptie en impact op terugleverkosten. Altijd gekoppeld aan onderliggende zonnepanelen-berekening.

## Warmtepomp (`/warmtepomp`, pakket: Business PRO)
Rendementsberekening hybride of all-electric warmtepomp, inclusief geldende ISDE-subsidie. Neemt extra stroomvraag mee in totale energieprofiel. Levert technische onderbouwing (specificaties, vermogens, meldcodes) die RVO bij ISDE-aanvraag vraagt — de aanvraag zelf blijft aparte stap voor de klant.

## Airco (`/airco`, pakket: Compleet)
Berekent benodigd koelvermogen per ruimte en voegt extra stroomverbruik toe aan totale energieprofiel. Onderdeel van compleet verduurzamingsadvies naast zonnepanelen/batterij/warmtepomp.

## Laadpaal / EV (`/laadpaal`, pakket: Compleet)
Maakt laadprofiel inzichtelijk en controleert impact op maximale capaciteit netaansluiting. Combineerbaar met zonnepanelen-opwek in één energieprofiel.

## Calculatiesoftware (kernproduct)
Alle modules draaien op één doorlopend rekenmodel (opwek, opslag, verbruik). Output: Nederlandstalig digitaal adviesrapport per klantdossier.
