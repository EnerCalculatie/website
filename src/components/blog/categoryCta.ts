// Categorie-specifieke CTA-copy — een laadpaal-lezer wil de SPRILA-subsidie
// checken, een warmtepomp-lezer de ISDE-bijdrage, niet allebei dezelfde
// generieke "genereer een rapport"-tekst. Onbekende/ontbrekende categorie
// valt terug op de generieke copy (laatste entry, key '').
const COPY: Record<string, { headline: string; body: string; button: string }> = {
  Zonnepanelen: {
    headline: 'Bereken de opbrengst voor dit dak',
    body: 'Vul postcode en jaarverbruik in en zie direct de verwachte opbrengst en terugverdientijd — gratis, geen account nodig.',
    button: 'Bereken opbrengst',
  },
  Laadpalen: {
    headline: 'Check de subsidie voor deze installatie',
    body: 'Vul postcode en jaarverbruik in en zie direct een echte berekening, inclusief de actuele SPRILA-subsidie — gratis, geen account nodig.',
    button: 'Check subsidie',
  },
  Thuisbatterijen: {
    headline: 'Reken de business case door',
    body: 'Vul postcode en jaarverbruik in en zie direct de verwachte besparing en terugverdientijd van een thuisbatterij — gratis, geen account nodig.',
    button: 'Bereken business case',
  },
  Warmtepompen: {
    headline: 'Check de ISDE-bijdrage en business case',
    body: 'Vul postcode en jaarverbruik in en zie direct een echte berekening, inclusief indicatieve ISDE-bijdrage — gratis, geen account nodig.',
    button: 'Check ISDE-bijdrage',
  },
  Airco: {
    headline: 'Reken dit zelf even door',
    body: 'Vul postcode en jaarverbruik in en zie direct een echte berekening — gratis, geen account nodig.',
    button: 'Probeer gratis',
  },
  Subsidies: {
    headline: 'Check welke subsidie hier van toepassing is',
    body: 'Vul postcode en jaarverbruik in en zie direct een echte berekening, inclusief actuele subsidies — gratis, geen account nodig.',
    button: 'Check subsidie',
  },
  '': {
    headline: 'Reken dit zelf even door',
    body: 'Vul postcode en jaarverbruik in en zie direct een echte berekening — gratis, geen account nodig.',
    button: 'Probeer gratis',
  },
};

export function categoryCta(category?: string) {
  return COPY[category ?? ''] ?? COPY[''];
}
