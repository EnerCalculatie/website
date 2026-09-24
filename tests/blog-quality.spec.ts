import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/content/blogPosts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Kwaliteitsgates uit de funnel-herinrichting (2026-08-25, spec-sectie 22): CTA-naar-/gratis,
// FAQ-schema-correctheid, geen dubbele FAQ, afbeelding-aanwezigheid, H1/meta/canonical, en de
// di/do-scheduler. Draait tegen de lokaal gebouwde site (playwright.config.ts start `node server.js`
// met NODE_ENV=production op dist/), dus dit test exact wat de volgende deploy live zet. Vereist
// een voorafgaande `npm run build` (npm run test:e2e doet dit).

// Steekproef i.p.v. alle 76 artikelen: elke pipeline-run produceert dezelfde BlogPostLayout-
// structuur, dus een handvol artikelen dekt de generieke checks. Het pilot-artikel wordt altijd
// expliciet meegenomen (referentie-implementatie funnel-herinrichting), plus één artikel met een
// FAQ (de meeste steekproef-artikelen hebben er geen, dus zonder dit zou die check altijd skippen).
const PILOT_SLUG = 'zonnepanelen-meerdere-dakvlakken-jaaropbrengst-berekenen';
const sample = [
  'rendementsverlies-schaduw-vervuiling-zonnepanelen',
  PILOT_SLUG,
  ...blogPosts.filter((p) => p.slug !== PILOT_SLUG).slice(0, 7).map((p) => p.slug),
];

for (const slug of sample) {
  test.describe(`/blog/${slug}`, () => {
    test('heeft precies één H1 en canonical/meta-description', async ({ page }) => {
      const res = await page.goto(`/blog/${slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        new RegExp(`/blog/${slug}$`)
      );
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(0);
    });

    test('heeft een og:image (geen ontbrekende social-card)', async ({ page }) => {
      await page.goto(`/blog/${slug}`);
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();
      expect(ogImage).toMatch(/^https?:\/\//);
    });

    test('heeft een CTA-link naar /gratis met UTM-attributie', async ({ page }) => {
      await page.goto(`/blog/${slug}`);
      const ctaLinks = page.locator('a[href*="app.enercalculatie.nl/gratis"]');
      await expect(ctaLinks.first()).toBeVisible();
      const hrefs = await ctaLinks.evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));
      expect(hrefs.some((h) => h.includes('utm_source=blog'))).toBe(true);
      expect(hrefs.some((h) => h.includes(`utm_content=${slug}`))).toBe(true);
    });

    test('FAQ-schema (indien aanwezig) matcht het zichtbare FAQ-blok, geen dubbele FAQ-sectie', async ({
      page,
    }) => {
      await page.goto(`/blog/${slug}`);
      const post = blogPosts.find((p) => p.slug === slug)!;
      if (!post.faq || post.faq.length === 0) {
        test.skip();
        return;
      }

      // Zichtbaar FAQ-blok (BlogPostLayout) bevat elke vraag exact één keer.
      for (const { question } of post.faq) {
        await expect(page.getByText(question, { exact: false })).toHaveCount(1);
      }

      // JSON-LD FAQPage-schema bevat dezelfde vragen (geen drift tussen schema en zichtbaar blok).
      const jsonLdBlocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const faqSchema = jsonLdBlocks
        .map((t) => JSON.parse(t))
        .find((j) => j['@type'] === 'FAQPage');
      expect(faqSchema).toBeTruthy();
      const schemaQuestions = faqSchema.mainEntity.map((q: { name: string }) => q.name);
      expect(schemaQuestions.sort()).toEqual(post.faq.map((f) => f.question).sort());
    });
  });
}

test('scheduler draait op dinsdag + donderdag, niet op een ander dagenpaar', () => {
  const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'publish-blog-post.yml');
  const yml = readFileSync(workflowPath, 'utf-8');
  const cronLines = [...yml.matchAll(/- cron: '0 \d+ \* \* ([\d,]+)'/g)].map((m) => m[1]);
  expect(cronLines.length).toBeGreaterThan(0);
  for (const days of cronLines) {
    expect(days).toBe('2,4'); // 2 = dinsdag, 4 = donderdag
  }
});

test('pilot-artikel heeft een rekenvoorbeeld-tabel en het opbrengst-diagram', async ({ page }) => {
  await page.goto(`/blog/${PILOT_SLUG}`);
  await expect(page.locator('table')).toHaveCount(1);
  await expect(page.getByRole('img', { name: /Staafdiagram.*Jaaropbrengst per dakvlak/i })).toBeVisible();
});
