export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  tags: string[];
  updated?: string;
  image?: string;
  popular?: boolean;
  keyPoints?: string[];
}

export const blogPosts: BlogPostMeta[
  {
  "slug": "rvo-isde-2026-wijzigingen",
  "title": "ISDE 2026: belangrijke wijzigingen voor installateurs in de verduurzamingsbranche",
  "description": "Ontdek de belangrijkste wijzigingen in de ISDE-regeling voor 2026 en hoe u uw klanten optimaal kunt adviseren over warmtepompen en isolatie.",
  "date": "2026-07-15",
  "excerpt": "De ISDE-regeling ondergaat in 2026 enkele belangrijke wijzigingen waar u als installateur rekening mee moet houden.",
  "tags": [
    "ISDE",
    "RVO",
    "Warmtepompen",
    "Verduurzaming"
  ],
  "keyPoints": [
    "Verhoogde subsidiebedragen voor hybride warmtepompen",
    "Nieuwe eisen voor isolatie bij warmtepompinstallaties",
    "Vereenvoudigde aanvraagprocedure via MijnISDE"
  ]
},] = [
  {
    slug: 'salderingsregeling-2027',
    title: 'Salderingsregeling 2027: wat verandert er voor uw klanten met zonnepanelen?',
    description: 'De salderingsregeling wordt per 1 januari 2027 in één keer volledig afgeschaft.',
    date: '2026-06-20',
    excerpt: 'De afbouw is van de baan — in plaats daarvan verdwijnt de salderingsregeling per 1 januari 2027 in één keer volledig.',
    tags: ['Salderingsregeling', 'Zonnepanelen', 'EnergieAdvies', 'Installatiebranche'],
    popular: true,
    keyPoints: [
      'De geleidelijke afbouw is van de baan.',
      'Tot 2027 blijft teruggeleverde stroom verrekend tegen het leveringstarief.',
      'Reken in offertes altijd het 2027-scenario mee.',
      'Zelfconsumptie wordt na 2027 het belangrijkste rendementsargument.'
    ]
  },
  {
    slug: 'btw-zonnepanelen',
    title: '0% btw op zonnepanelen: wanneer geldt het nultarief?',
    description: 'Sinds 1 januari 2023 geldt een 0%-btw-tarief op zonnepanelen op woningen.',
    date: '2026-06-20',
    excerpt: 'Het 0%-btw-tarief op zonnepanelen scheelt uw klant direct geld op de offerte.',
    tags: ['Zonnepanelen', 'BTW', 'Installatiebranche'],
    keyPoints: [
      '0% btw geldt voor levering en installatie op of bij woningen.',
      'Onder het nultarief vallen panelen, omvormer, optimizers en installatie-uren.',
      'Buiten het nultarief (21%): thuisbatterij, laadpaal, zonneboiler.',
      'Vermeld het installatieadres en het btw-tarief per regel.'
    ]
  }
  // ... (voeg hier je andere items toe, zorg dat ze gescheiden zijn door komma's en eindig met ] )
];
