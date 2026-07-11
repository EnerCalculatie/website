/**
 * Bouwt ai-context/content-map.json af uit bestaande single sources of truth
 * (src/content/blogPosts.ts, src/content/services.ts) — zelfde filosofie als
 * scripts/prerender.mjs: geen handmatig bijgehouden bestand, puur afgeleid.
 * Geïmporteerd door generate-blog-post.mjs; ook los draaibaar voor debugging.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const BLOG_POSTS_PATH = path.join(ROOT, 'src/content/blogPosts.ts');
const SERVICES_PATH = path.join(ROOT, 'src/content/services.ts');
const CONTENT_MAP_PATH = path.join(ROOT, 'ai-context/content-map.json');

export async function buildContentMap() {
  const blogPostsSource = await readFile(BLOG_POSTS_PATH, 'utf8');
  const servicesSource = await readFile(SERVICES_PATH, 'utf8');

  const blogEntries = [...blogPostsSource.matchAll(/slug:\s*'([^']+)'[\s\S]*?title:\s*'((?:[^'\\]|\\.)*)'/g)].map(
    (m) => ({
      url: `/blog/${m[1]}`,
      title: m[2].replace(/\\'/g, "'"),
      topic: m[1],
      type: 'blog',
    })
  );

  const serviceBlocks = servicesSource.split(/(?=\{\s*slug:)/g).slice(1);
  const serviceEntries = serviceBlocks.map((block) => {
    const slug = block.match(/slug:\s*'([^']+)'/)?.[1];
    const headline = block.match(/headline:\s*\n?\s*'((?:[^'\\]|\\.)*)'/)?.[1];
    return {
      url: `/rekentool-${slug}`,
      title: headline?.replace(/\\'/g, "'") ?? slug,
      topic: slug,
      type: 'rekentool',
    };
  }).filter((e) => e.topic);

  const contentMap = [...serviceEntries, ...blogEntries];
  await writeFile(CONTENT_MAP_PATH, `${JSON.stringify(contentMap, null, 2)}\n`, 'utf8');
  return contentMap;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildContentMap().then((map) => {
    console.log(`content-map.json bijgewerkt: ${map.length} pagina's (${map.filter((e) => e.type === 'rekentool').length} rekentool, ${map.filter((e) => e.type === 'blog').length} blog).`);
  });
}
