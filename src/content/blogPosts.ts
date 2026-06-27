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
    tags: ['Salderingsregeling', 'Zonnepanelen', 'EnergieAdvies'],
  },
  {
    slug: 'btw-zonnepanelen',
    title: '0% btw op zonnepanelen: wanneer geldt het nultarief, en wat moet er in de offerte staan?',
    description:
      'Sinds 1 januari 2023 geldt een 0%-btw-tarief op zonnepanelen op woningen. Lees wanneer het nultarief van toepassing is, wat erbuiten valt, en hoe u dit correct verwerkt in uw offerte.',
    date: '2026-06-20',
    excerpt:
      'Het 0%-btw-tarief op zonnepanelen scheelt uw klant direct geld op de offerte — maar alleen als aan de juiste voorwaarden is voldaan. Wanneer geldt het nultarief wel, en wanneer toch 21%?',
    tags: ['Zonnepanelen', 'BTW', 'Installateurs'],
  },
  {
    slug: 'terugleverkosten-thuisbatterij',
    title: 'Terugleverkosten: hoe rekent u ze door, en hoe compenseert een thuisbatterij dit voor uw klant?',
    description:
      'Energieleveranciers rekenen terugleverkosten door aan huishoudens met zonnepanelen. Lees hoe deze kosten worden berekend, wat de ACM hierover heeft vastgesteld, en hoe een thuisbatterij de teruglevering — en daarmee de kosten — verlaagt.',
    date: '2026-06-22',
    excerpt:
      'Terugleverkosten knagen aan het rendement van zonnepanelen, en de manier waarop leveranciers ze berekenen verschilt sterk. Hoe legt u dit uit aan uw klant, en welke rol speelt een thuisbatterij hierin?',
    tags: ['Terugleverkosten', 'Thuisbatterij', 'Zonnepanelen'],
  },
  {
    slug: 'isde-subsidie-warmtepompen',
    title: 'ISDE-subsidie voor warmtepompen: welke onderbouwing heeft de RVO nodig?',
    description:
      'De RVO beoordeelt ISDE-aanvragen voor warmtepompen op specifieke technische onderbouwing en meldcodes. Lees wat uw adviesrapport moet bevatten, en waar de grens ligt tussen advies en aanvraag.',
    date: '2026-06-22',
    excerpt:
      'Een onvolledig onderbouwd adviesrapport kan uw klant tijd of subsidie kosten. Welke technische specificaties en meldcodes vraagt de RVO precies, en wat is uw rol als installateur daarin?',
    tags: ['ISDE', 'Warmtepomp', 'Subsidie'],
  },
  {
    slug: 'warmtepomp-rendement-aannames',
    title: 'Warmtepomp-rendement: de Nederlandse standaardaannames die uw berekening onderbouwen',
    description:
      'Een warmtepomp-besparing wordt berekend op basis van drie vaste aannames over gasverbruik, ketelrendement en warmwaterverbruik. Lees welke dat zijn, hoe een hybride systeem de berekening verandert, en waarom transparantie hierover uw verkoopargument is.',
    date: '2026-06-24',
    excerpt:
      'Een klant die het getal achter de besparing niet begrijpt, vertrouwt het minder. Welke standaardaannames liggen aan een warmtepomp-rendementsberekening ten grondslag, en hoe legt u dit uit?',
    tags: ['Warmtepomp', 'EnergieAdvies', 'Duurzaamheid'],
  },
  {
    slug: 'van-excel-naar-geautomatiseerd-advies',
    title: 'Van Excel naar geautomatiseerd advies: wat verandert er in uw werkdag?',
    description:
      'Een eigen Excel-rekenmodel voor zonnepanelen, thuisbatterijen of warmtepompen werkt — tot een tarief wijzigt of een collega het overneemt. Lees wat er verandert in uw werkdag bij een overstap naar een geautomatiseerd adviestraject.',
    date: '2026-06-26',
    excerpt:
      'Een Excel-rekenmodel werkt, tot het moment dat een tarief wijzigt of een nieuwe medewerker het moet overnemen. Wat verandert er in uw werkdag bij een overstap naar een gestructureerd, geautomatiseerd adviestraject?',
    tags: ['EnergieAdvies', 'Automatisering', 'Excel'],
  },
];
