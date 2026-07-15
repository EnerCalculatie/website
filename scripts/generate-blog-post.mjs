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
import { validateArticle, APPROVAL_THRESHOLD } from './seo-geo-validator.mjs';
import { buildContentMap } from './build-content-map.mjs';
import { estimateReadingMinutes } from './backfill-reading-time.mjs';
import { sanitizeJsonString } from './lib/json-sanitizer.mjs';
import { checkArticleMeta, checkComponentBody } from './lib/content-checks.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BLOG_POSTS_PATH = path.join(ROOT, 'src/content/blogPosts.ts');
const APP_TSX_PATH = path.join(ROOT, 'src/App.tsx');
const BLOG_DIR = path.join(ROOT, 'src/components/blog');
const CLAUDE_MD_PATH = path.join(ROOT, 'CLAUDE.md');
const CONTEXT_DIR = path.join(ROOT, 'ai-context');
const PLAN_PATH = path.join(CONTEXT_DIR, 'content-plan.json');
const LOG_PATH = path.join(CONTEXT_DIR, 'content-log.json');
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
const MODEL = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct';

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

async function readAiContext() {
  const files = ['company.md', 'products.md', 'audience.md', 'topics.md'];
  const contents = await Promise.all(files.map((f) => readFile(path.join(CONTEXT_DIR, f), 'utf8')));
  return files.map((f, i) => `--- ${f} ---\n${contents[i]}`).join('\n\n');
}

async function readPlan() {
  try {
    const raw = await readFile(PLAN_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writePlan(plan) {
  await writeFile(PLAN_PATH, `${JSON.stringify(plan, null, 2)}\n`, 'utf8');
}

async function appendLogEntry(entry) {
  let log = [];
  try {
    log = JSON.parse(await readFile(LOG_PATH, 'utf8'));
  } catch {
    log = [];
  }
  log.push(entry);
  await writeFile(LOG_PATH, `${JSON.stringify(log, null, 2)}\n`, 'utf8');
}

function pickNextPlannedItem(plan) {
  const planned = plan.filter((i) => i.status === 'planned');
  if (!planned.length) return null;
  return planned.reduce((best, item) => ((item.priority ?? 0) > (best.priority ?? 0) ? item : best));
}

// Zoveel keer wordt een afgekeurd item opnieuw geprobeerd (volgende run) voordat
// het definitief 'abandoned' raakt. Elke afkeuring verlaagt ook de prioriteit,
// zodat andere backlog-items eerst aan de beurt komen.
const MAX_RETRIES = 2;

function rejectPlanItem(planItem, reason) {
  const retryCount = (planItem.retryCount ?? 0) + 1;
  planItem.retryCount = retryCount;
  planItem.lastRejectionReason = reason;
  planItem.lastRejectedAt = new Date().toISOString();
  if (retryCount <= MAX_RETRIES) {
    planItem.status = 'planned';
    planItem.priority = Math.max(1, (planItem.priority ?? 5) - 1);
  } else {
    planItem.status = 'abandoned';
  }
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
  return JSON.parse(sanitizeJsonString(match[1] ?? match[0]));
}

async function main() {
  const claudeMd = await readFile(CLAUDE_MD_PATH, 'utf8');
  const aiContext = await readAiContext();
  const blogPostsSource = await readFile(BLOG_POSTS_PATH, 'utf8');
  const referenceArticles = await readReferenceArticles();

  const existingSlugs = [...blogPostsSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
  const existingTitles = [...blogPostsSource.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1]);

  const plan = await readPlan();
  const planItem = pickNextPlannedItem(plan);
  if (!planItem) {
    throw new Error(
      "Geen 'planned' items in ai-context/content-plan.json — draai eerst `npm run plan:content` om de backlog aan te vullen."
    );
  }
  console.log(`Backlog-item gekozen: "${planItem.title}" (keyword: ${planItem.keyword}, prioriteit: ${planItem.priority})`);

  const contentMap = await buildContentMap();
  const contentMapText = contentMap
    .map((e) => `${e.url} — "${e.title}" (${e.type}, onderwerp: ${e.topic})`)
    .join('\n');

  const system = `Je bent een senior contentstrateeg voor EnerCalculatie, een SaaS voor energieadvies-berekeningen gericht op Nederlandse installateurs (zonnepanelen, thuisbatterijen, warmtepompen, laadpalen, airco's). Je schrijft blogartikelen voor de kennisbank, gericht op de installateur als B2B-lezer, in professioneel Nederlands, u-vorm. Gebruik onderstaande bedrijfscontext als bron voor feiten over EnerCalculatie zelf; verzin niets daarbuiten. Volg de projectregels strikt:\n\n${claudeMd}\n\n${aiContext}`;

  const user = `Schrijf het artikel voor dit vooraf geplande backlog-item — het onderwerp staat vast, kies GEEN ander onderwerp:\nWerktitel: ${planItem.title}\nPrimair zoekwoord: ${planItem.keyword}\nZoekintentie: ${planItem.intent}\n\nBestaande blogonderwerpen (slugs, ter voorkoming van duplicaten in interne links): ${existingSlugs.join(', ')}\nBestaande titels: ${existingTitles.join(' | ')}\n\nBeschikbare interne pagina's om naar te linken (kies 2-3 die inhoudelijk relevant zijn voor DIT artikel, niet willekeurig):\n${contentMapText}\n\nReferentie-artikelen (structuur, stijl en lengte exact aanhouden — gebruik BlogPostLayout, dezelfde Tailwind-classes, dezelfde opbouw met h2-secties en een "Hoe EnerCalculatie hiermee omgaat"-slot):\n\n${referenceArticles}\n\nGebruik alleen feiten waarvan je zeker bent dat ze correct zijn (RVO/ISDE, ACM, Netbeheer Nederland, Techniek Nederland, Belastingdienst) — verzin geen bedragen, percentages of regelgeving. Vermijd absolute claims ("foutloos", "altijd correct", "0% foutmarge"); gebruik "gevalideerd" / "deterministisch berekend" / "kloppend" in plaats daarvan.\n\nAntwoord UITSLUITEND met een JSON-object (in een \`\`\`json codeblok), met exact deze velden:\n{\n  "slug": "kebab-case-slug (mag afwijken van werktitel-slug indien een betere SEO-slug logischer is)",\n  "title": "... (volledige titel, gebruikt als H1; mag de werktitel verfijnen, moet het primaire zoekwoord bevatten)",\n  "seoTitle": "... (titel voor de <title>-tag. HARDE EIS: maximaal 60 tekens, tel ze na. Primair zoekwoord vooraan. GEEN merksuffix zoals ' | EnerCalculatie' — die wordt niet toegevoegd. Mag korter/anders zijn dan title.)",\n  "description": "... (SEO meta description. HARDE EIS: maximaal 155 tekens, tel ze na. Bevat het primaire zoekwoord.)",\n  "excerpt": "...",\n  "tags": ["Tag1", "Tag2", "Tag3", "Installatiebranche"],\n  "keyPoints": ["...", "...", "...", "..."],\n  "category": "één hoofdcategorie, bv. Zonnepanelen / Thuisbatterijen / Warmtepompen / Laadpalen / Subsidies",\n  "faq": [{"question": "...", "answer": "..."}] (array van minimaal 3, maximaal 5 vraag/antwoord-objecten die de zoekintentie direct beantwoorden, citeerbaar door AI-engines),\n  "componentBody": "de JSX-children van <BlogPostLayout post={post}> als raw string, exact zoals in de referentie-artikelen (met dezelfde Tailwind-classes, h2-koppen, en het slotstuk 'Hoe EnerCalculatie hiermee omgaat' met minimaal 2 interne links uit de lijst hierboven, als <a href=\\"...\\"> binnen de bestaande Tailwind-linkstijl). KRITIEK — geldig JSX: gebruik NOOIT een kale < of > als vergelijkingsteken in lopende tekst (bv. '< 10 jaar', '> 15 jaar' breekt de JSX-parser). Schrijf dit altijd als woorden ('minder dan 10 jaar', 'meer dan 15 jaar') of als HTML-entity (&lt; &gt;). Gebruik je een <table> (bv. bij een vergelijking), wrap die dan ALTIJD in <div className=\\"overflow-x-auto mb-6\\"> en geef table de classes \\"w-full border-collapse border border-slate-300 text-sm\\", elke <th> en <td> de classes \\"border border-slate-300 px-4 py-2 text-left\\" (th extra: \\"font-semibold text-slate-800\\", td extra: \\"text-slate-700\\"), en de <thead><tr> de class \\"bg-slate-100\\" — nooit een kale <table className=\\"table-auto\\"> zonder deze classes en zonder de overflow-x-auto container."\n}\n\nDe datum wordt automatisch ingevuld als vandaag (${todayISO()}), dus laat "date" weg uit je antwoord.`;

  console.log(`Genereer artikel via OpenRouter (${MODEL})...`);
  const raw = await callOpenRouter(system, user);
  const article = extractJson(raw);

  if (existingSlugs.includes(article.slug)) {
    throw new Error(`Gegenereerde slug '${article.slug}' bestaat al — model heeft duplicaat gekozen.`);
  }

  console.log('SEO/GEO-controle...');
  let validation = await validateArticle(article, { callOpenRouter, extractJson });
  console.log(`SEO: ${validation.seoScore}/100, GEO: ${validation.geoScore}/100 (beide moeten >= ${APPROVAL_THRESHOLD})`);

  if (!validation.approved) {
    console.log(`Score onvoldoende — één verbeterpoging met feedback:\n- ${validation.improvements.join('\n- ')}`);
    const improveUser = `${user}\n\nJe vorige concept scoorde SEO ${validation.seoScore}/100, GEO ${validation.geoScore}/100 (beide moeten >= ${APPROVAL_THRESHOLD}). Verwerk deze verbeterpunten en lever een volledig herzien artikel (zelfde JSON-structuur):\n- ${validation.improvements.join('\n- ')}`;
    const improvedRaw = await callOpenRouter(system, improveUser);
    const improvedArticle = extractJson(improvedRaw);
    Object.assign(article, improvedArticle);

    validation = await validateArticle(article, { callOpenRouter, extractJson });
    console.log(`Score na verbetering — SEO: ${validation.seoScore}/100, GEO: ${validation.geoScore}/100`);
  }

  if (!validation.approved) {
    planItem.lastScore = validation.score;
    planItem.lastImprovements = validation.improvements;
    rejectPlanItem(planItem, `SEO/GEO-score onvoldoende (SEO ${validation.seoScore}, GEO ${validation.geoScore})`);
    await writePlan(plan);
    await appendLogEntry({
      date: todayISO(),
      topic: planItem.title,
      slug: article.slug ?? null,
      model: MODEL,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      status: planItem.status === 'abandoned' ? 'abandoned' : 'rejected',
      publicationStatus: 'not-published',
    });
    throw new Error(
      `Artikel afgekeurd na verbeterpoging (SEO ${validation.seoScore}/${APPROVAL_THRESHOLD}, GEO ${validation.geoScore}/${APPROVAL_THRESHOLD} — beide moeten voldoen) — backlog-item op '${planItem.status}' gezet (poging ${planItem.retryCount}/${MAX_RETRIES}), geen bestanden geschreven.`
    );
  }

  const componentName = `${pascalCase(article.slug)}Article`;
  const componentPath = path.join(BLOG_DIR, `${componentName}.tsx`);

  // Geen <SEO>-call meer: BlogPostLayout regelt title/description/canonical
  // centraal uit de post-metadata (zie BlogPostLayout.tsx).
  const componentSource = `import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === '${article.slug}')!;

export function ${componentName}() {

  return (
    <BlogPostLayout post={post}>
${article.componentBody}
    </BlogPostLayout>
  );
}
`;

  // Harde contentgate vóór de JSX-preflight: tekenlimieten en corruptie zijn
  // te tellen, niet te beoordelen — de prompt vragen om 'max 60 tekens' is geen
  // garantie. Faalt dit, dan gaat het item terug de backlog in, net als bij
  // ongeldige JSX: geen half artikel op schijf.
  const metaErrors = [
    ...checkArticleMeta(article),
    ...checkComponentBody(article.componentBody),
  ];
  if (metaErrors.length > 0) {
    planItem.lastScore = validation.score;
    rejectPlanItem(planItem, `Contentchecks gefaald: ${metaErrors.join(' | ')}`);
    await writePlan(plan);
    await appendLogEntry({
      date: todayISO(),
      topic: planItem.title,
      slug: article.slug,
      model: MODEL,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      status: planItem.status === 'abandoned' ? 'abandoned-failed-checks' : 'rejected-failed-checks',
      publicationStatus: 'not-published',
    });
    throw new Error(
      `Contentchecks gefaald — backlog-item op '${planItem.status}' gezet (poging ${planItem.retryCount}/${MAX_RETRIES}), geen bestanden geschreven:\n- ${metaErrors.join('\n- ')}`
    );
  }

  try {
    const esbuild = await import('esbuild');
    await esbuild.transform(componentSource, { loader: 'tsx', jsx: 'automatic' });
  } catch (err) {
    planItem.lastScore = validation.score;
    rejectPlanItem(planItem, `Ongeldige JSX: ${err.message}`);
    await writePlan(plan);
    await appendLogEntry({
      date: todayISO(),
      topic: planItem.title,
      slug: article.slug,
      model: MODEL,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      status: planItem.status === 'abandoned' ? 'abandoned-invalid-jsx' : 'rejected-invalid-jsx',
      publicationStatus: 'not-published',
    });
    throw new Error(`Gegenereerde componentBody bevat ongeldige JSX — backlog-item op '${planItem.status}' gezet (poging ${planItem.retryCount}/${MAX_RETRIES}), geen bestanden geschreven. Details: ${err.message}`);
  }

  await writeFile(componentPath, componentSource, 'utf8');
  console.log(`Component geschreven: ${componentPath}`);

  const tagsJs = article.tags.map((t) => `'${t}'`).join(', ');
  const keyPointsJs = article.keyPoints.map((k) => `      '${k.replace(/'/g, "\\'")}',`).join('\n');
  const escape = (s) => s.replace(/'/g, "\\'");

  const faqItems = Array.isArray(article.faq) ? article.faq : [];
  const faqJs = faqItems
    .map(
      (f) => `      { question: '${escape(f.question)}', answer: '${escape(f.answer)}' },`
    )
    .join('\n');
  const readingTimeMinutes = estimateReadingMinutes(article.componentBody);

  const entry = `  {
    slug: '${article.slug}',
    readingTimeMinutes: ${readingTimeMinutes},
    title: '${escape(article.title)}',
    seoTitle: '${escape(article.seoTitle)}',
    description:
      '${escape(article.description)}',
    date: '${todayISO()}',
    excerpt:
      '${escape(article.excerpt)}',
    tags: [${tagsJs}],
    keyPoints: [
${keyPointsJs}
    ],${article.category ? `\n    category: '${escape(article.category)}',` : ''}${faqItems.length ? `\n    faq: [\n${faqJs}\n    ],` : ''}
  },
];`;

  const updatedBlogPosts = blogPostsSource.replace(/\n\];\s*$/, `\n${entry}\n`);
  await writeFile(BLOG_POSTS_PATH, updatedBlogPosts, 'utf8');
  console.log('blogPosts.ts bijgewerkt.');

  let appSource = await readFile(APP_TSX_PATH, 'utf8');
  const lastLazyRouteMatch = [...appSource.matchAll(/^const \w+Article = lazyRoute\([^\n]+\n/gm)].pop();
  if (!lastLazyRouteMatch) throw new Error('Kon geen bestaande lazyRoute-declaratie vinden als ankerpunt in App.tsx.');
  const appLineEnding = lastLazyRouteMatch[0].endsWith('\r\n') ? '\r\n' : '\n';
  const lazyImportLine = `const ${componentName} = lazyRoute('/blog/${article.slug}', () => import('./components/blog/${componentName}').then(m => ({ default: m.${componentName} })));${appLineEnding}`;
  appSource = appSource.slice(0, lastLazyRouteMatch.index + lastLazyRouteMatch[0].length)
    + lazyImportLine
    + appSource.slice(lastLazyRouteMatch.index + lastLazyRouteMatch[0].length);

  const lastRouteMatch = [...appSource.matchAll(/^(\s*)<Route path="\/blog\/[^"]+" element=\{<\w+Article \/>\} \/>\r?\n/gm)].pop();
  if (!lastRouteMatch) throw new Error('Kon geen bestaande blog-<Route> vinden als ankerpunt in App.tsx.');
  const indent = lastRouteMatch[1];
  const lineEnding = lastRouteMatch[0].endsWith('\r\n') ? '\r\n' : '\n';
  const routeLine = `${indent}<Route path="/blog/${article.slug}" element={<${componentName} />} />${lineEnding}`;
  appSource = appSource.slice(0, lastRouteMatch.index + lastRouteMatch[0].length)
    + routeLine
    + appSource.slice(lastRouteMatch.index + lastRouteMatch[0].length);

  await writeFile(APP_TSX_PATH, appSource, 'utf8');
  console.log('App.tsx bijgewerkt.');

  console.log('Build verifiëren...');
  execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

  planItem.status = 'generated';
  planItem.generatedSlug = article.slug;
  planItem.generatedAt = new Date().toISOString();
  planItem.seoGeoScore = validation.score;
  await writePlan(plan);
  console.log('content-plan.json bijgewerkt: item op status "generated" gezet.');

  await appendLogEntry({
    date: todayISO(),
    topic: article.title,
    slug: article.slug,
    model: MODEL,
    seoScore: validation.seoScore,
    geoScore: validation.geoScore,
    status: 'generated',
    publicationStatus: 'pending-deploy',
  });
  console.log('content-log.json bijgewerkt.');

  console.log(`GESLAAGD — Onderwerp: ${article.title} — Slug: ${article.slug}`);
}

main().catch((err) => {
  console.error(`MISLUKT — Reden: ${err.message}`);
  process.exit(1);
});
