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

export const blogPosts: BlogPostMeta[] = [
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
