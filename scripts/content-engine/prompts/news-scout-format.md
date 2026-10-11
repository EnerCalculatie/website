# Omzetten: nieuwsbericht naar JSON

Geeft de tekst aan dat er geen nieuws is gevonden, antwoord dan `{"found": false}`.
Anders, in exact dit formaat:

```json
{
  "found": true,
  "category": "Laadpalen | Airco | Zonnepanelen | Warmtepompen | Thuisbatterijen",
  "headline": "<Feitelijke kop van het nieuws, max 90 tekens>",
  "summary": "<Wat is er gebeurd, 2-3 zinnen, met concrete cijfers en data>",
  "publishedDate": "<YYYY-MM-DD van het oorspronkelijke bericht>",
  "whyItMatters": "<Wat verandert er voor huiseigenaren en installateurs, 1-2 zinnen>"
}
```
