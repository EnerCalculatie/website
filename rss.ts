import { Router } from 'express';
import { blogPosts } from './src/content/blogPosts';

const SITE_URL = 'https://www.enercalculatie.nl';

// Escape voor XML text nodes (titel/excerpt kunnen & of < bevatten).
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const router = Router();

// RSS-feed van de kennisbank, bedoeld als trigger-bron voor Zapier (nieuwe blogpost -> LinkedIn-post
// met hashtags). De <category>-tags per item zijn afkomstig uit blogPosts.ts en zijn precies de
// hashtags die in de Zapier-actie gebruikt kunnen worden.
router.get('/rss.xml', (_req, res) => {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const items = sortedPosts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const categories = post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ');
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${categories}
    </item>`;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>EnerCalculatie Kennisbank</title>
    <link>${SITE_URL}/blog</link>
    <description>Kennisbank-artikelen van EnerCalculatie over zonnepanelen, thuisbatterijen, warmtepompen en energieadvies.</description>
    <language>nl-NL</language>
${items}
  </channel>
</rss>`;

  res.set('Content-Type', 'application/rss+xml; charset=utf-8');
  res.status(200).send(feed);
});

export default router;
