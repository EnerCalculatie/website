// Regressietests voor /rss.xml (Zapier-trigger voor de LinkedIn-automatisering).
// Had 0% dekking, inclusief escapeXml — een titel/excerpt met & of < zou zonder
// escaping ongeldige XML opleveren en de hele feed (dus ook alle latere posts)
// laten breken voor Zapier's parser.
import { describe, it, expect, vi } from 'vitest';
import { getRouteHandler, mockResponse } from './routeTestHelpers';

vi.mock('./src/content/blogPosts', () => ({
  blogPosts: [
    {
      slug: 'oudste-post',
      title: 'Oudste post',
      excerpt: 'Excerpt van de oudste post.',
      date: '2026-01-01',
      tags: ['zonnepanelen'],
    },
    {
      slug: 'nieuwste-post',
      title: 'Titel met & en <tags>',
      excerpt: 'Excerpt met "quotes" en een \'apostrof\'.',
      date: '2026-06-01',
      tags: ['warmtepomp', 'subsidie'],
    },
  ],
}));

describe('GET /rss.xml', () => {
  async function callHandler() {
    const { default: router } = await import('./rss');
    const handler = getRouteHandler(router, 'get', '/rss.xml');
    const res = mockResponse();
    await handler({}, res);
    return res;
  }

  it('sorteert posts van nieuw naar oud', async () => {
    const res = await callHandler();
    const xml = res.body as string;
    expect(xml.indexOf('nieuwste-post')).toBeLessThan(xml.indexOf('oudste-post'));
  });

  it('escaped & en < in title/excerpt tegen ongeldige XML', async () => {
    const res = await callHandler();
    const xml = res.body as string;
    expect(xml).toContain('Titel met &amp; en &lt;tags&gt;');
    expect(xml).not.toContain('Titel met & en <tags>');
    expect(xml).toContain('&quot;quotes&quot;');
    expect(xml).toContain('&apos;apostrof&apos;');
  });

  it('zet de tags om naar <category>-elementen (Zapier-hashtag-bron)', async () => {
    const res = await callHandler();
    const xml = res.body as string;
    expect(xml).toContain('<category>warmtepomp</category>');
    expect(xml).toContain('<category>subsidie</category>');
  });

  it('zet het juiste content-type-header', async () => {
    const res = await callHandler();
    expect(res.headers?.['Content-Type']).toBe('application/rss+xml; charset=utf-8');
  });

  it('produceert geldige RSS-envelop (xml-declaratie + rss/channel-tags)', async () => {
    const res = await callHandler();
    const xml = res.body as string;
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0">');
    expect(xml).toContain('</rss>');
  });
});
