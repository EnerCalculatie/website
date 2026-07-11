#!/usr/bin/env node
/**
 * Eenmalig script: berekent readingTimeMinutes voor bestaande blogartikelen
 * (woordental van de artikel-body binnen <BlogPostLayout> / 200 wpm) en
 * schrijft het veld in src/content/blogPosts.ts. Nieuwe artikelen krijgen dit
 * automatisch van generate-blog-post.mjs — dit script is alleen voor de
 * eenmalige backfill van al bestaande posts zonder dit veld.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const APP_TSX_PATH = path.join(ROOT, 'src/App.tsx');
const BLOG_POSTS_PATH = path.join(ROOT, 'src/content/blogPosts.ts');
const BLOG_DIR = path.join(ROOT, 'src/components/blog');

const WORDS_PER_MINUTE = 200;

export function estimateReadingMinutes(fileSource) {
  // Isoleer alléén de body tussen <BlogPostLayout> tags — anders bevat de
  // rest van het bestand (imports, functiedeclaratie) een ongepaarde JS-
  // accolade ('{' van de functiebody) die de niet-brace-matching {...}
  // opschoning hieronder laat doorlopen tot de eerstvolgende '}' diep in de
  // JSX-tekst, en zo bijna de hele body wegvreet.
  const match = fileSource.match(/<BlogPostLayout[^>]*>([\s\S]*?)<\/BlogPostLayout>/);
  const jsxBody = match ? match[1] : fileSource;
  const text = jsxBody
    .replace(/<[^>]+>/g, ' ') // tags eruit
    .replace(/\{`([^`]*)`\}/g, '$1') // template-literal expressies: inhoud behouden
    .replace(/\{[^}]*\}/g, ' ') // overige JS-expressies eruit
    .replace(/&[a-z]+;/gi, ' ') // HTML-entities
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = text ? text.split(' ').length : 0;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

async function main() {
  const appSource = await readFile(APP_TSX_PATH, 'utf8');
  const blogPostsSource = await readFile(BLOG_POSTS_PATH, 'utf8');

  const slugToFile = new Map();
  for (const m of appSource.matchAll(/lazyRoute\('\/blog\/([^']+)',\s*\(\)\s*=>\s*import\('\.\/components\/blog\/([^']+)'\)/g)) {
    slugToFile.set(m[1], `${m[2]}.tsx`);
  }

  const existingSlugs = [...blogPostsSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

  let updated = blogPostsSource;
  let count = 0;
  for (const slug of existingSlugs) {
    const file = slugToFile.get(slug);
    if (!file) {
      console.warn(`Geen component-bestand gevonden voor slug '${slug}' in App.tsx — overgeslagen.`);
      continue;
    }
    const componentSource = await readFile(path.join(BLOG_DIR, file), 'utf8');
    const minutes = estimateReadingMinutes(componentSource);
    const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const withFieldPattern = new RegExp(`(slug:\\s*'${escapedSlug}',\\s*\\n\\s*)readingTimeMinutes:\\s*\\d+,`);
    const slugOnlyPattern = new RegExp(`(slug:\\s*'${escapedSlug}',)`);
    if (withFieldPattern.test(updated)) {
      updated = updated.replace(withFieldPattern, `$1readingTimeMinutes: ${minutes},`);
    } else if (slugOnlyPattern.test(updated)) {
      updated = updated.replace(slugOnlyPattern, `$1\n    readingTimeMinutes: ${minutes},`);
    } else {
      console.warn(`Kon slug-regel voor '${slug}' niet vinden om te patchen — overgeslagen.`);
      continue;
    }
    count++;
    console.log(`${slug}: ${minutes} min`);
  }

  await writeFile(BLOG_POSTS_PATH, updated, 'utf8');
  console.log(`Klaar: ${count} artikelen bijgewerkt.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`MISLUKT — Reden: ${err.message}`);
    process.exit(1);
  });
}
