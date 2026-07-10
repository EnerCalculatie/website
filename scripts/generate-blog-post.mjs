#!/usr/bin/env node
/**
 * Genereert dagelijks één nieuw kennisbank-blogartikel via OpenRouter (model-
 * agnostisch, geen lock-in op één LLM-provider), los van Claude Code / de
 * interactieve CLI. Bedoeld voor GitHub Actions cron.
 *
 * Vereist env var OPENROUTER_API_KEY. Optioneel: OPENROUTER_MODEL (default
 * hieronder) om zelf een model te kiezen, zie https://openrouter.ai/models.
 * Schrijft uitsluitend de drie bestanden die CLAUDE.md voorschrijft
 * (artikelcomponent, blogPosts.ts-entry, App.tsx-route), runt daarna de build
 * ter verificatie. Commit/push gebeurt in de workflow, niet in dit script.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BLOG_POSTS_PATH = path.join(ROOT, 'src/content/blogPosts.ts');
const APP_TSX_PATH = path.join(ROOT, 'src/App.tsx');
const BLOG_DIR = path.join(ROOT, 'src/components/blog');
const CLAUDE_MD_PATH = path.join(ROOT, 'CLAUDE.md');
const REFERENCE_ARTICLES = [
  'TrendsVerduurzaming2026Article.tsx',
  'LaadpaalAdviesArticle.tsx',
];

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error('MISLUKT — Reden: OPENROUTER_API_KEY ontbreekt als environment variable.');
  process.exit(1);
}

// Kies zelf een model via de OPENROUTER_MODEL env var/secret, bv.
// 'anthropic/claude-sonnet-4.5', 'openai/gpt-5', 'google/gemini-2.5-pro',
// 'deepseek/deepseek-chat'. Volledige lijst: https://openrouter.ai/models
const MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-sonnet-4.5';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function pascalCase(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

async function readReferenceArticles() {
  const contents = await Promise.all(
    REFERENCE_ARTICLES.map((f) => readFile(path.join(BLOG_DIR, f), 'utf8'))
  );
  return REFERENCE_ARTICLES.map((f, i) => `--- ${f} ---\n${contents[i]}`).join('\n\n');
}

async function callOpenRouter(system, user) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${OPENROUTER_API_KEY}`,
      // Vereist door OpenRouter voor attributie/rankings, mag een placeholder zijn.
      'HTTP-Referer': 'https://www.enercalculatie.nl',
      'X-Title': 'EnerCalculatie kennisbank-generator',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter API-fout (${res.status}, model ${MODEL}): ${text}`);
  }
  const data = await res.json();
  const message = data.choices?.[0]?.message?.content;
  if (!message) throw new Error(`Geen tekstantwoord ontvangen van OpenRouter (model ${MODEL}).`);
  return message;
}

function extractJson(raw) {
  const match = raw.match(/```json\s*([\s\S]*?)```/) || raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Kon geen JSON uit het model-antwoord halen.');
  return JSON.parse(match[1] ?? match[0]);
}

async function main() {
  const claudeMd = await readFile(CLAUDE_MD_PATH, 'utf8');
  const blogPostsSource = await readFile(BLOG_POSTS_PATH, 'utf8');
  const referenceArticles = await readReferenceArticles();

  const existingSlugs = [...blogPostsSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
  const existingTitles = [...blogPostsSource.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1]);

  const system = `Je bent een senior contentstrateeg voor EnerCalculatie, een SaaS voor energieadvies-berekeningen gericht op Nederlandse installateurs (zonnepanelen, thuisbatterijen, warmtepompen, laadpalen, airco's). Je schrijft blogartikelen voor de kennisbank, gericht op de installateur als B2B-lezer, in professioneel Nederlands, u-vorm. Volg de projectregels strikt:\n\n${claudeMd}`;

  const user = `Bestaande blogonderwerpen (slugs): ${existingSlugs.join(', ')}\nBestaande titels: ${existingTitles.join(' | ')}\n\nReferentie-artikelen (structuur, stijl en lengte exact aanhouden — gebruik BlogPostLayout, dezelfde Tailwind-classes, dezelfde opbouw met h2-secties en een "Hoe EnerCalculatie hiermee omgaat"-slot):\n\n${referenceArticles}\n\nSchrijf één nieuw, origineel Nederlands kennisbankartikel over een actueel onderwerp uit de Nederlandse installatie- en verduurzamingsbranche (zonnepanelen, thuisbatterijen, warmtepompen, laadpalen, airco's, subsidies, wet- en regelgeving, netcongestie, bedrijfsvoering) dat NOG NIET in de lijst hierboven voorkomt. Gebruik alleen feiten waarvan je zeker bent dat ze correct zijn (RVO/ISDE, ACM, Netbeheer Nederland, Techniek Nederland, Belastingdienst) — verzin geen bedragen, percentages of regelgeving. Vermijd absolute claims ("foutloos", "altijd correct", "0% foutmarge"); gebruik "gevalideerd" / "deterministisch berekend" / "kloppend" in plaats daarvan.\n\nAntwoord UITSLUITEND met een JSON-object (in een \`\`\`json codeblok), met exact deze velden:\n{\n  "slug": "kebab-case-slug",\n  "title": "...",\n  "description": "... (SEO meta description, max ~160 tekens)",\n  "excerpt": "...",\n  "tags": ["Tag1", "Tag2", "Tag3", "Installatiebranche"],\n  "keyPoints": ["...", "...", "...", "..."],\n  "componentBody": "de JSX-children van <BlogPostLayout post={post}> als raw string, exact zoals in de referentie-artikelen (met dezelfde Tailwind-classes, h2-koppen, en het slotstuk 'Hoe EnerCalculatie hiermee omgaat' met minimaal één interne link naar een bestaand /blog/<slug> of /rekentool-* pad)"\n}\n\nDe datum wordt automatisch ingevuld als vandaag (${todayISO()}), dus laat "date" weg uit je antwoord.`;

  console.log(`Genereer artikel via OpenRouter (${MODEL})...`);
  const raw = await callOpenRouter(system, user);
  const article = extractJson(raw);

  if (existingSlugs.includes(article.slug)) {
    throw new Error(`Gegenereerde slug '${article.slug}' bestaat al — model heeft duplicaat gekozen.`);
  }

  const componentName = `${pascalCase(article.slug)}Article`;
  const componentPath = path.join(BLOG_DIR, `${componentName}.tsx`);

  const componentSource = `import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === '${article.slug}')!;

export function ${componentName}() {

  return (
    <>
      <SEO
        title={\`\${post.title} | EnerCalculatie\`}
        description={post.description}
        canonical={\`https://www.enercalculatie.nl/blog/\${post.slug}\`}
      />

      <BlogPostLayout post={post}>
${article.componentBody}
      </BlogPostLayout>
    </>
  );
}
`;

  await writeFile(componentPath, componentSource, 'utf8');
  console.log(`Component geschreven: ${componentPath}`);

  const tagsJs = article.tags.map((t) => `'${t}'`).join(', ');
  const keyPointsJs = article.keyPoints.map((k) => `      '${k.replace(/'/g, "\\'")}',`).join('\n');
  const escape = (s) => s.replace(/'/g, "\\'");

  const entry = `  {
    slug: '${article.slug}',
    title: '${escape(article.title)}',
    description:
      '${escape(article.description)}',
    date: '${todayISO()}',
    excerpt:
      '${escape(article.excerpt)}',
    tags: [${tagsJs}],
    keyPoints: [
${keyPointsJs}
    ],
  },
];`;

  const updatedBlogPosts = blogPostsSource.replace(/\n\];\s*$/, `\n${entry}\n`);
  await writeFile(BLOG_POSTS_PATH, updatedBlogPosts, 'utf8');
  console.log('blogPosts.ts bijgewerkt.');

  let appSource = await readFile(APP_TSX_PATH, 'utf8');
  const lastLazyRouteMatch = [...appSource.matchAll(/^const \w+Article = lazyRoute\([^\n]+\n/gm)].pop();
  if (!lastLazyRouteMatch) throw new Error('Kon geen bestaande lazyRoute-declaratie vinden als ankerpunt in App.tsx.');
  const lazyImportLine = `const ${componentName} = lazyRoute('/blog/${article.slug}', () => import('./components/blog/${componentName}').then(m => ({ default: m.${componentName} })));\n`;
  appSource = appSource.slice(0, lastLazyRouteMatch.index + lastLazyRouteMatch[0].length)
    + lazyImportLine
    + appSource.slice(lastLazyRouteMatch.index + lastLazyRouteMatch[0].length);

  const lastRouteMatch = [...appSource.matchAll(/^(\s*)<Route path="\/blog\/[^"]+" element=\{<\w+Article \/>\} \/>\n/gm)].pop();
  if (!lastRouteMatch) throw new Error('Kon geen bestaande blog-<Route> vinden als ankerpunt in App.tsx.');
  const indent = lastRouteMatch[1];
  const routeLine = `${indent}<Route path="/blog/${article.slug}" element={<${componentName} />} />\n`;
  appSource = appSource.slice(0, lastRouteMatch.index + lastRouteMatch[0].length)
    + routeLine
    + appSource.slice(lastRouteMatch.index + lastRouteMatch[0].length);

  await writeFile(APP_TSX_PATH, appSource, 'utf8');
  console.log('App.tsx bijgewerkt.');

  console.log('Build verifiëren...');
  execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

  console.log(`GESLAAGD — Onderwerp: ${article.title} — Slug: ${article.slug}`);
}

main().catch((err) => {
  console.error(`MISLUKT — Reden: ${err.message}`);
  process.exit(1);
});
