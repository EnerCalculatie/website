// Bouwt de JSON-LD-schema's voor de blog uit de blogPosts-metadata + de gedeelde
// auteuridentiteit. Eén bron: pas hier het schema aan, niet per artikel/pagina.
// BlogPostLayout emit het BlogPosting-schema, BlogIndex het Blog-listingschema,
// zodat elk (ook toekomstig) artikel automatisch het Person-/E-E-A-T-schema krijgt.
import { authorPerson } from './author';
import { blogPosts, type BlogPostMeta } from './blogPosts';

const SITE = 'https://www.enercalculatie.nl';

export function buildBlogPostingSchema(post: BlogPostMeta) {
  const pageUrl = `${SITE}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    inLanguage: 'nl-NL',
    author: authorPerson(),
    publisher: {
      '@type': 'Organization',
      name: 'EnerCalculatie',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    url: pageUrl,
  };
}

/**
 * Blog-listingschema voor /blog: een `Blog` met per artikel een lichte
 * BlogPosting-verwijzing. Geeft zoek-/AI-engines de volledige artikelindex in één
 * gestructureerd blok. Sorteert nieuwste eerst, gelijk aan de zichtbare lijst.
 */
export function buildBlogListingSchema() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog | EnerCalculatie',
    description:
      'Praktische uitleg over Nederlandse regelgeving en rekenmethodes voor verduurzamingsinstallateurs.',
    url: `${SITE}/blog`,
    inLanguage: 'nl-NL',
    publisher: {
      '@type': 'Organization',
      name: 'EnerCalculatie',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/logo.png`,
      },
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: authorPerson(),
      url: `${SITE}/blog/${post.slug}`,
    })),
  };
}
