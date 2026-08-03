#!/usr/bin/env node
/**
 * Vult ai-context/content-plan.json aan met nieuwe SEO/GEO content-backlog-items
 * via OpenRouter, op basis van ai-context/*.md en de bestaande blogonderwerpen.
 * Draait los van generate-blog-post.mjs, dat alleen items met status 'planned'
 * consumeert. Vereist env var GEMINI_API_KEY.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { sanitizeJsonString } from './lib/json-sanitizer.mjs';
import { findDuplicateTopic, checkPlanItem } from './lib/content-checks.mjs';
import { GEMINI_TIER, GEMINI_API_KEY, GEMINI_MODEL } from './lib/gemini-config.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTEXT_DIR = path.join(ROOT, 'ai-context');
const PLAN_PATH = path.join(CONTEXT_DIR, 'content-plan.json');
const BLOG_POSTS_PATH = path.join(ROOT, 'src/content/blogPosts.ts');

console.log(`Gemini-tier: ${GEMINI_TIER}, model: ${GEMINI_MODEL}`);

// Zoveel 'planned' items houdt de backlog minimaal aan; wordt aangevuld als dit zakt.
const MIN_PLANNED = 5;
// Zoveel nieuwe items worden per aanvulling gevraagd.
const BATCH_SIZE = 5;

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function readContext() {
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

async function callGemini(system, user) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: user }] }],
      systemInstruction: { role: 'system', parts: [{ text: system }] },
      generationConfig: { maxOutputTokens: 3000 },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API-fout (${res.status}, model ${GEMINI_MODEL}): ${text}`);
  }
  const data = await res.json();
  const candidate = data.candidates?.[0];
  const message = candidate?.content?.parts?.[0]?.text;
  if (!message) {
    throw new Error(
      `Geen tekstantwoord ontvangen van Gemini (model ${GEMINI_MODEL}, finishReason: ${candidate?.finishReason ?? 'onbekend'}).`
    );
  }
  if (candidate.finishReason === 'MAX_TOKENS') {
    console.warn(`Waarschuwing: Gemini-antwoord afgekapt op maxOutputTokens (model ${GEMINI_MODEL}).`);
  }
  return message;
}

function extractJsonArray(raw) {
  const match = raw.match(/```json\s*([\s\S]*?)```/) || raw.match(/\[[\s\S]*\]/);
  if (!match) {
    console.error(`Model-antwoord (geen JSON-array gevonden):\n${raw}`);
    throw new Error('Kon geen JSON-array uit het model-antwoord halen.');
  }
  return JSON.parse(sanitizeJsonString(match[1] ?? match[0]));
}

async function main() {
  const plan = await readPlan();
  const plannedCount = plan.filter((i) => i.status === 'planned').length;

  if (plannedCount >= MIN_PLANNED) {
    console.log(`Backlog heeft al ${plannedCount} 'planned' items (minimum ${MIN_PLANNED}) — geen aanvulling nodig.`);
    return;
  }

  const context = await readContext();
  const blogPostsSource = await readFile(BLOG_POSTS_PATH, 'utf8');
  const existingSlugs = [...blogPostsSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
  const existingTitles = [...blogPostsSource.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1]);
  const plannedTitles = plan.map((i) => i.title);

  const system = `Je bent een SEO/GEO-contentstrateeg voor EnerCalculatie. Gebruik uitsluitend onderstaande bedrijfscontext als bron voor doelgroep, producten en toon. Verzin geen feiten, cijfers of regelgeving buiten wat hierin staat.\n\n${context}`;

  const user = `Reeds gepubliceerd (titels): ${existingTitles.join(' | ') || '(geen)'}\nAl in backlog gepland (titels): ${plannedTitles.join(' | ') || '(geen)'}\n\nStel een content-backlog samen van ${BATCH_SIZE} NIEUWE artikel-ideeën, elk over een onderwerp dat nog niet gepubliceerd of gepland is. Kies onderwerpen uit topics.md die de doelgroep (installateur) daadwerkelijk zoekt.\n\nAntwoord UITSLUITEND met een JSON-array (in een \`\`\`json codeblok) van objecten met exact deze velden:\n[{\n  "title": "werktitel van het artikel",\n  "keyword": "primair zoekwoord waar dit artikel op moet scoren",\n  "intent": "informatief" | "commercieel" | "transactioneel",\n  "priority": 1-10 (10 = hoogste zoekvolume/commerciële waarde voor de doelgroep)\n}]`;

  console.log(`Vul content-plan aan via Gemini (${GEMINI_MODEL})...`);
  const raw = await callGemini(system, user);
  const newItems = extractJsonArray(raw);

  const usedSlugs = new Set([...existingSlugs, ...plan.map((i) => i.slug)]);

  // Onderwerpen om tegen te vergelijken: alles wat gepubliceerd is plus alles wat
  // al in de backlog staat (inclusief wat we in déze ronde toevoegen — anders
  // levert één batch alsnog twee varianten van hetzelfde onderwerp).
  const knownTopics = [
    ...existingTitles.map((title) => ({ title, source: 'gepubliceerd' })),
    ...plan
      .filter((i) => i.status === 'planned' || i.status === 'generated')
      .map((i) => ({ title: i.title, keyword: i.keyword, source: `backlog (${i.status})` })),
  ];

  const additions = [];
  for (const item of newItems) {
    // Corruptie eerst: een kapotte titel de backlog in laten glippen kost later
    // retry-pogingen op een item dat nooit had mogen bestaan.
    const corruption = checkPlanItem(item);
    if (corruption.length > 0) {
      console.warn(`Sla corrupt backlog-item over: ${corruption.join(' | ')}`);
      continue;
    }

    const slug = slugify(item.title);
    if (usedSlugs.has(slug)) {
      console.warn(`Sla dubbel onderwerp over (slug '${slug}' bestaat al): ${item.title}`);
      continue;
    }

    // De slug-check hierboven vangt alleen exacte dubbelen. Near-duplicates
    // ('ISDE-subsidie voor warmtepompen' vs 'Warmtepompen kopen met ISDE-subsidie')
    // krijgen een andere slug en glipten er zo langs — vandaar deze overlap-check.
    const dup = findDuplicateTopic(item, knownTopics);
    if (dup) {
      console.warn(
        `Sla dubbel onderwerp over (${Math.round(dup.overlap * 100)}% overlap met ${dup.match.source}: "${dup.match.title}"): ${item.title}`
      );
      continue;
    }

    usedSlugs.add(slug);
    knownTopics.push({ title: item.title, keyword: item.keyword, source: 'backlog (deze ronde)' });
    additions.push({
      title: item.title,
      keyword: item.keyword,
      intent: item.intent,
      priority: item.priority,
      slug,
      status: 'planned',
      createdAt: new Date().toISOString(),
    });
  }

  const updatedPlan = [...plan, ...additions].sort((a, b) => {
    if (a.status === 'planned' && b.status !== 'planned') return -1;
    if (a.status !== 'planned' && b.status === 'planned') return 1;
    return (b.priority ?? 0) - (a.priority ?? 0);
  });

  await writeFile(PLAN_PATH, `${JSON.stringify(updatedPlan, null, 2)}\n`, 'utf8');
  console.log(`content-plan.json bijgewerkt: ${additions.length} nieuwe items toegevoegd (totaal ${updatedPlan.length}).`);
}

main().catch((err) => {
  console.error(`MISLUKT — Reden: ${err.message}`);
  process.exit(1);
});
