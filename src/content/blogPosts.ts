export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  excerpt: string;
  tags: string[]; // gebruikt door de RSS-feed (rss.ts) als <category>, bv. voor LinkedIn-hashtags via Zapier
}

// Metadata van alle blogartikelen. Wordt gebruikt door de BlogIndex
// voor de overzichtskaarten, en door elk artikel zelf voor SEO/schema.
// Nieuw artikel toevoegen = hier een entry toevoegen + een eigen component
// in src/components/blog/, en de route registreren in App.tsx.
export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'salderingsregeling-2027',
    title: 'Salderingsregeling 2027: wat verandert er voor uw klanten met zonnepanelen?',
    description:
      'De salderingsregeling wordt per 1 januari 2027 in één keer volledig afgeschaft. Lees wat dit betekent voor terugverdientijd-berekeningen en uw adviesgesprek.',
    date: '2026-06-20',
    excerpt:
      'De afbouw is van de baan — in plaats daarvan verdwijnt de salderingsregeling per 1 januari 2027 in één keer volledig. Wat betekent dit voor de rendementsberekening die u uw klant voorlegt?',
    tags: ['Salderingsregeling', 'Zonnepanelen', 'EnergieAdvies', 'Installatiebranche'],
  },
  {
    slug: 'btw-zonnepanelen',
    title: '0% btw op zonnepanelen: wanneer geldt het nultarief, en wat moet er in de offerte staan?',
    description:
      'Sinds 1 januari 2023 geldt een 0%-btw-tarief op zonnepanelen op woningen. Lees wanneer het nultarief van toepassing is, wat erbuiten valt, en hoe u dit correct verwerkt in uw offerte.',
    date: '2026-06-20',
    excerpt:
      'Het 0%-btw-tarief op zonnepanelen scheelt uw klant direct geld op de offerte — maar alleen als aan de juiste voorwaarden is voldaan. Wanneer geldt het nultarief wel, en wanneer toch 21%?',
    tags: ['Zonnepanelen', 'BTW', 'Installatiebranche'],
  },
  {
    slug: 'terugleverkosten-thuisbatterij',
    title: 'Terugleverkosten: hoe rekent u ze door, en hoe compenseert een thuisbatterij dit voor uw klant?',
    description:
      'Energieleveranciers rekenen terugleverkosten door aan huishoudens met zonnepanelen. Lees hoe deze kosten worden berekend, wat de ACM hierover heeft vastgesteld, en hoe een thuisbatterij de teruglevering — en daarmee de kosten — verlaagt.',
    date: '2026-06-22',
    excerpt:
      'Terugleverkosten knagen aan het rendement van zonnepanelen, en de manier waarop leveranciers ze berekenen verschilt sterk. Hoe legt u dit uit aan uw klant, en welke rol speelt een thuisbatterij hierin?',
    tags: ['Terugleverkosten', 'Thuisbatterij', 'Zonnepanelen', 'Installatiebranche'],
  },
  {
    slug: 'isde-subsidie-warmtepompen',
    title: 'ISDE-subsidie voor warmtepompen: welke onderbouwing heeft de RVO nodig?',
    description:
      'De RVO beoordeelt ISDE-aanvragen voor warmtepompen op specifieke technische onderbouwing en meldcodes. Lees wat uw adviesrapport moet bevatten, en waar de grens ligt tussen advies en aanvraag.',
    date: '2026-06-22',
    excerpt:
      'Een onvolledig onderbouwd adviesrapport kan uw klant tijd of subsidie kosten. Welke technische specificaties en meldcodes vraagt de RVO precies, en wat is uw rol als installateur daarin?',
    tags: ['ISDE', 'Warmtepomp', 'Subsidie', 'Installatiebranche'],
  },
  {
    slug: 'warmtepomp-rendement-aannames',
    title: 'Warmtepomp-rendement: de Nederlandse standaardaannames die uw berekening onderbouwen',
    description:
      'Een warmtepomp-besparing wordt berekend op basis van drie vaste aannames over gasverbruik, ketelrendement en warmwaterverbruik. Lees welke dat zijn, hoe een hybride systeem de berekening verandert, en waarom transparantie hierover uw verkoopargument is.',
    date: '2026-06-24',
    excerpt:
      'Een klant die het getal achter de besparing niet begrijpt, vertrouwt het minder. Welke standaardaannames liggen aan een warmtepomp-rendementsberekening ten grondslag, en hoe legt u dit uit?',
    tags: ['Warmtepomp', 'EnergieAdvies', 'Duurzaamheid', 'Installatiebranche'],
  },
  {
    slug: 'van-excel-naar-geautomatiseerd-advies',
    title: 'Van Excel naar geautomatiseerd advies: wat verandert er in uw werkdag?',
    description:
      'Een eigen Excel-rekenmodel voor zonnepanelen, thuisbatterijen of warmtepompen werkt — tot een tarief wijzigt of een collega het overneemt. Lees wat er verandert in uw werkdag bij een overstap naar een geautomatiseerd adviestraject.',
    date: '2026-06-26',
    excerpt:
      'Een Excel-rekenmodel werkt, tot het moment dat een tarief wijzigt of een nieuwe medewerker het moet overnemen. Wat verandert er in uw werkdag bij een overstap naar een gestructureerd, geautomatiseerd adviestraject?',
    tags: ['EnergieAdvies', 'Automatisering', 'Excel', 'Installatiebranche'],
  },
  {
    slug: 'laadpaal-advies-thuis',
    title: 'Laadpaal-advies: welke factoren bepalen de juiste configuratie voor uw klant?',
    description:
      'Laadvermogen, load balancing en de capaciteit van de groepenkast bepalen samen welke laadpaal-configuratie bij een woning past. Lees hoe u dit technisch onderbouwt én uitlegt aan een klant die elektrisch rijden overweegt.',
    date: '2026-06-29',
    excerpt:
      'Een laadpaal-advies is meer dan een stekker aan de gevel: laadvermogen, load balancing en de resterende capaciteit van de groepenkast bepalen samen de juiste configuratie. Hoe legt u dit onderbouwd uit aan uw klant?',
    tags: ['Laadpaal', 'ElektrischRijden', 'EnergieAdvies', 'Installatiebranche'],
  },
  {
    slug: 'airco-vs-warmtepomp',
    title: 'Airco of (hybride) warmtepomp: wanneer is welke keuze de juiste verkoopargumentatie?',
    description:
      'Airco, hybride warmtepomp of volledig elektrische warmtepomp: de keuze hangt af van de bouwkundige situatie, het verwarmingssysteem en de wens van de klant. Lees hoe u de SCOP-norm gebruikt als verkoopargument en wanneer welke oplossing het beste past.',
    date: '2026-07-01',
    excerpt:
      'Airco of warmtepomp — voor veel klanten lijken het inwisselbare keuzes, maar de argumentatie verschilt sterk. Welke situatie vraagt om een lucht-lucht-airco, en wanneer is een (hybride) warmtepomp de betere keuze? De SCOP-norm maakt het verschil inzichtelijk.',
    tags: ['Airco', 'Warmtepomp', 'SCOP', 'EnergieAdvies', 'Installatiebranche'],
  },
  {
    slug: 'trends-verduurzaming-2026',
    title: 'Verduurzamingsmarkt 2026: trends in subsidies, regelgeving en marktvraag voor installateurs',
    description:
      'De Nederlandse verduurzamingsmarkt verandert in 2026: gewijzigde ISDE-bedragen voor warmtepompen, explosieve groei van thuisbatterijen, het nieuwe netcongestie-prioriteringskader en de naderende afschaffing van de salderingsregeling. Lees wat dit betekent voor uw adviesgesprek.',
    date: '2026-07-03',
    excerpt:
      'Gewijzigde ISDE-subsidies, een thuisbatterijmarkt die in 2025 met 140% groeide, een nieuw prioriteringskader voor netcongestie en de salderingsregeling die in 2027 verdwijnt: de verduurzamingsmarkt vraagt in 2026 om een bijgesteld advies. Wat zijn de belangrijkste ontwikkelingen?',
    tags: ['Verduurzaming', 'Trends', 'ISDE', 'Thuisbatterij', 'Netcongestie', 'Installatiebranche'],
  },
  {
    slug: 'thuisbatterij-capaciteit-kiezen',
    title: 'Thuisbatterij dimensioneren: hoe bepaalt u de juiste capaciteit voor uw klant?',
    description:
      'De juiste thuisbatterij-capaciteit hangt af van zelfconsumptieprofiel, zonnepaneelproductie en financieel doel van uw klant. Lees welke vuistregels gelden, wat het verschil is tussen kWh en kW, en hoe u onderbouwd adviseert.',
    date: '2026-07-06',
    excerpt:
      'Een thuisbatterij van 5 kWh of toch 10 kWh? Te kleine capaciteit mist opbrengst, te grote capaciteit betaalt zichzelf niet terug. Welke factoren bepalen de juiste dimensionering, en hoe legt u dat onderbouwd uit aan uw klant?',
    tags: ['Thuisbatterij', 'Zonnepanelen', 'EnergieAdvies', 'Installatiebranche'],
  },
  {
    slug: 'dakorientatie-zonnepanelen-opbrengst',
    title: 'Dakoriëntatie en hellingshoek: hoeveel opbrengst verliest uw klant bij een niet-ideaal dak?',
    description:
      'Een zuidgericht dak met 35° helling levert het meeste op — maar de meeste daken wijken daarvan af. Lees hoeveel opbrengstverlies realistisch is bij oost-, west- of noordoriëntatie, en hoe u dit onderbouwd uitlegt in het adviesgesprek.',
    date: '2026-07-06',
    excerpt:
      'Niet elk dak kijkt naar het zuiden. Hoeveel zonnepaneelrendement verliest een klant bij een oost-westdak, een vlak dak of gedeeltelijke schaduw — en wanneer loont een installatie toch?',
    tags: ['Zonnepanelen', 'Dakoriëntatie', 'EnergieAdvies', 'Installatiebranche'],
  },
  {
    slug: 'netcongestie-wachtlijst-zakelijk-2026',
    title:
      'Netcongestie 2026: wat betekent de wachtlijst voor kleinverbruikers vanaf 1 juli voor uw zakelijke klant?',
    description:
      'Vanaf 1 juli 2026 komen ook kleinverbruikers op de netcongestie-wachtlijst voor een nieuwe of zwaardere aansluiting. Lees wat dit betekent voor het aansluitadvies aan uw zakelijke klant, en welke alternatieven zoals een capaciteitsbeperkend contract en batterijopslag u kunt inzetten.',
    date: '2026-07-06',
    excerpt:
      'Ruim 15.000 grootverbruikers staan al op de wachtlijst voor netcapaciteit, en vanaf 1 juli 2026 komen kleinverbruikers daar in congestiegebieden bij. Wat betekent dit voor het aansluitadvies aan uw zakelijke klant, en welke alternatieven overbruggen de wachttijd?',
    tags: ['Netcongestie', 'Zakelijk', 'Batterijopslag', 'Installatiebranche'],
  },
];
