export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceMeta {
  slug: string;
  title: string;
  metaDescription: string;
  badge: string;
  headline: string;
  intro: string;
  features: ServiceFeature[];
  pricingTier: string;
  relatedBlogSlug?: string;
  relatedBlogLabel?: string;
}

// Metadata voor de long-tail rekentool-landingspagina's, één per dienst/module.
// Content is direct afgeleid uit reeds goedgekeurde copy in Features.tsx en
// Pricing.tsx — geen nieuwe claims, alleen herschikt voor een eigen URL per
// dienst (long-tail zoekverkeer, zie [[marketing_seo_advies_2026_06_22]]).
export const services: ServiceMeta[] = [
  {
    slug: 'zonnepanelen',
    title: 'Rekentool zonnepanelen voor installateurs | EnerCalculatie',
    metaDescription:
      'Automatiseer de offerte voor zonnepanelen: optimaal aantal panelen, piekvermogen en jaaropbrengst direct berekend uit dakoriëntatie en energierekening. Inclusief 0%-btw en saldering 2027.',
    badge: 'Rekentool zonnepanelen',
    headline: 'Offertes voor zonnepanelen, automatisch onderbouwd',
    intro:
      'Van dakoriëntatie tot rendementsberekening: EnerCalculatie berekent het optimale aantal panelen, het piekvermogen (Wp) en de jaaropbrengst, en houdt daarbij rekening met het 0%-btw-tarief en de aankomende afschaffing van de salderingsregeling per 2027.',
    features: [
      {
        title: 'Rekenmodel zonnepanelen',
        description:
          'Invoer van dakoriëntatie en beschikbare ruimte voedt direct het rekenmodel. U krijgt exact het optimale aantal panelen, het piekvermogen (Wp) en de jaaropbrengst.',
      },
      {
        title: 'Exacte rendementsberekening',
        description:
          'Het rekenmodel houdt strikt rekening met complexe wetgeving, zoals de afbouw van de salderingsregeling. Genereer betrouwbare rendementsberekeningen over 10 en 25 jaar.',
      },
      {
        title: 'Slimme documentherkenning',
        description:
          'Upload een pdf van de energierekening. Het systeem leest direct het actuele gasverbruik en de stroomvraag in piek/daltarief uit — geen rekenfouten door handmatig overtypen.',
      },
    ],
    pricingTier: 'Beschikbaar vanaf het Solo-pakket.',
    relatedBlogSlug: 'btw-zonnepanelen',
    relatedBlogLabel: '0% btw op zonnepanelen: wanneer geldt het nultarief?',
  },
  {
    slug: 'thuisbatterij',
    title: 'Rekentool thuisbatterij voor installateurs | EnerCalculatie',
    metaDescription:
      'Dimensioneer thuisbatterijen op basis van het berekende opwekoverschot. Direct inzicht in de stijging van zelfconsumptie en de impact op terugleverkosten.',
    badge: 'Rekentool thuisbatterij',
    headline: 'Thuisbatterij-advies onderbouwd met het werkelijke opwekprofiel',
    intro:
      'EnerCalculatie dimensioneert thuisbatterijen aan de hand van het berekende opwekoverschot van de zonnepanelen, en toont direct wat de stijging van de zelfconsumptie oplevert — inclusief de impact op terugleverkosten.',
    features: [
      {
        title: 'Rekenmodel thuisbatterijen',
        description:
          'Optimaliseer en dimensioneer batterijen aan de hand van het berekende opwekoverschot. Direct inzicht in de stijging van het eigen verbruik ter ondervanging van terugleverkosten.',
      },
      {
        title: 'Rekenmodel zonnepanelen',
        description:
          'Een thuisbatterij wordt altijd berekend in combinatie met de onderliggende zonnepanelen-installatie — opwek, opslag en verbruik in één doorlopend rekenmodel.',
      },
      {
        title: 'Exacte rendementsberekening',
        description:
          'De terugverdientijd van een thuisbatterij wordt berekend over 10 en 25 jaar, met de salderingsregeling en terugleverkosten als onderliggende variabelen.',
      },
    ],
    pricingTier: 'Beschikbaar vanaf het Solo-pakket.',
    relatedBlogSlug: 'terugleverkosten-thuisbatterij',
    relatedBlogLabel: 'Terugleverkosten: hoe rekent u ze door naar uw klant?',
  },
  {
    slug: 'warmtepomp',
    title: 'Rekentool warmtepomp & ISDE-subsidie | EnerCalculatie',
    metaDescription:
      'Bereken het rendement van een hybride of all-electric warmtepomp, inclusief de geldende ISDE-subsidie en de technische onderbouwing die de RVO vraagt.',
    badge: 'Rekentool warmtepomp',
    headline: 'Warmtepomp-rendement en ISDE-onderbouwing in één rapport',
    intro:
      'Ondersteun uw adviesgesprek met een hybride of all-electric warmtepompberekening. EnerCalculatie neemt de extra stroomvraag mee in het totale energieprofiel, en de geldende ISDE-subsidie in de netto investering.',
    features: [
      {
        title: 'Warmtepomp-configuratie',
        description:
          'Ondersteun uw adviesgesprek met een hybride of all-electric warmtepompberekening. Het model neemt de extra stroomvraag direct mee in het totale energieprofiel, ter voorkoming van dubbeltellingen.',
      },
      {
        title: 'Subsidie (ISDE) inzicht',
        description:
          'Neem automatisch de geldende ISDE-subsidies voor warmtepompen mee in de berekening. Zo ziet de klant direct de lagere netto investering.',
      },
      {
        title: 'Technische opname',
        description:
          'Verwerk tijdens of direct na de inspectie alle technische specificaties die de RVO bij een ISDE-aanvraag vraagt, in een strak werkvoorbereidingsrapport.',
      },
    ],
    pricingTier: 'Beschikbaar vanaf het Pro-pakket.',
    relatedBlogSlug: 'isde-subsidie-warmtepompen',
    relatedBlogLabel: 'ISDE-subsidie voor warmtepompen: welke onderbouwing heeft de RVO nodig?',
  },
  {
    slug: 'airco',
    title: 'Rekentool airco-dimensionering | EnerCalculatie',
    metaDescription:
      'Bereken het benodigde koelvermogen per ruimte en de impact op het totale energieprofiel van de woning. Onderdeel van het complete verduurzamingsadvies.',
    badge: 'Rekentool airco',
    headline: 'Compleet klimaatadvies, inclusief energieprofiel',
    intro:
      'Bied een compleet klimaatadvies naast zonnepanelen, batterij en warmtepomp. EnerCalculatie berekent het benodigde koelvermogen per ruimte en voegt het extra stroomverbruik naadloos toe aan het totale energieprofiel.',
    features: [
      {
        title: 'Airco-dimensionering',
        description:
          'Bereken eenvoudig het benodigde koelvermogen per ruimte en voeg het extra stroomverbruik naadloos toe aan het verwachte totale energieprofiel.',
      },
      {
        title: 'Exacte rendementsberekening',
        description:
          'Een airco-installatie wordt meegenomen in dezelfde rendementsberekening over 10 en 25 jaar als de rest van het verduurzamingsadvies.',
      },
      {
        title: 'Professioneel adviesrapport',
        description:
          'Genereer een Nederlandstalig digitaal adviesrapport waarin airco samen met de overige maatregelen wordt gepresenteerd aan de klant.',
      },
    ],
    pricingTier: 'Beschikbaar vanaf het Complete-pakket.',
  },
  {
    slug: 'laadpaal',
    title: 'Rekentool laadpaal (EV) voor installateurs | EnerCalculatie',
    metaDescription:
      'Maak het laadprofiel van een laadpaal inzichtelijk en controleer direct de impact op de maximale capaciteit van de netaansluiting.',
    badge: 'Rekentool laadpaal',
    headline: 'Laadpaal-advies met directe capaciteitscontrole',
    intro:
      'Integreer elektrisch rijden in het verduurzamingsadvies. EnerCalculatie maakt het specifieke laadprofiel inzichtelijk voor de klant en controleert direct de impact op de maximale capaciteit van de netaansluiting.',
    features: [
      {
        title: 'Laadpaal (EV) configuratie',
        description:
          'Integreer elektrisch rijden in uw advies. Maak het specifieke laadprofiel inzichtelijk voor de klant en controleer direct de impact op de maximale capaciteit van de netaansluiting.',
      },
      {
        title: 'Rekenmodel zonnepanelen',
        description:
          'Combineer de laadpaal met de zonnepanelen-installatie in één energieprofiel, zodat de klant ziet hoeveel van het laden met eigen opwek kan worden gedekt.',
      },
      {
        title: 'Professioneel adviesrapport',
        description:
          'Genereer een Nederlandstalig digitaal adviesrapport waarin de laadpaal samen met de overige maatregelen wordt gepresenteerd aan de klant.',
      },
    ],
    pricingTier: 'Beschikbaar vanaf het Complete-pakket.',
  },
];
