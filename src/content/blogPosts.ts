export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  excerpt: string;
}

// Metadata van alle kennisbank-artikelen. Wordt gebruikt door de BlogIndex
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
  },
];
