#!/usr/bin/env node
/**
 * Eenmalig backfill-script: voegt de "Bronnen"-sectie toe aan bestaande
 * blogposts die zijn geschreven vóór de fact-check-pipeline (generate-blog-post.mjs)
 * en dus geen claims/bronnen-koppeling hebben. Zelfde bron-registry en
 * fact-check-logica als de generator (ai-context/trusted-sources.json,
 * scripts/lib/fact-check.mjs) — hier toegepast op al gepubliceerde tekst
 * i.p.v. op een net gegenereerd concept.
 *
 * Idempotent: slaat bestanden over die al een "Bronnen"-sectie hebben, dus
 * veilig opnieuw te draaien op een deels bijgewerkte set artikelen.
 *
 * Alleen claims met status SUPPORTED komen in de bronnenlijst — geen
 * gok-citaten voor PARTIALLY_SUPPORTED/OUTDATED/CONFLICTING/NO_SOURCE, zelfde
 * harde eis als de generator zelf hanteert voor nieuwe artikelen.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { sanitizeJsonString } from './lib/json-sanitizer.mjs';
import { extractClaims } from './lib/claim-extractor.mjs';
import { loadTrustedSources, fetchSourcesForClaims } from './lib/source-validator.mjs';
import { factCheckClaims } from './lib/fact-check.mjs';
import { collectUsedSources, buildSourcesBlock } from './lib/citation-generator.mjs';
import { GEMINI_TIER, GEMINI_API_KEY, GEMINI_MODEL } from './lib/gemini-config.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const APP_TSX_PATH = path.join(ROOT, 'src/App.tsx');
const BLOG_DIR = path.join(ROOT, 'src/components/blog');

const RETRYABLE_STATUSES = new Set([429, 500, 503]);
const GEMINI_MAX_ATTEMPTS = 3;
const GEMINI_RETRY_DELAY_MS = 15000;
// Rate-limit-hygiëne tussen artikelen — vooral op de gratis Gemini-tier, die
// een lagere requests-per-minuut-limiet heeft dan de betaalde.
const DELAY_BETWEEN_ARTICLES_MS = 5000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini(system, user) {
  let lastError;
  for (let attempt = 1; attempt <= GEMINI_MAX_ATTEMPTS; attempt++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: user }] }],
        systemInstruction: { role: 'system', parts: [{ text: system }] },
        generationConfig: { maxOutputTokens: 4096 },
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      lastError = new Error(`Gemini API-fout (${res.status}, model ${GEMINI_MODEL}): ${text}`);
      if (RETRYABLE_STATUSES.has(res.status) && attempt < GEMINI_MAX_ATTEMPTS) {
        await sleep(GEMINI_RETRY_DELAY_MS * attempt);
        continue;
      }
      throw lastError;
    }
    const data = await res.json();
    const message = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const finishReason = data.candidates?.[0]?.finishReason;
    if (!message) throw new Error(`Geen tekstantwoord ontvangen van Gemini (model ${GEMINI_MODEL}, finishReason: ${finishReason}).`);
    return message;
  }
  throw lastError;
}

function extractJson(raw) {
  const match = raw.match(/```json\s*([\s\S]*?)```/) || raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Kon geen JSON uit het model-antwoord halen.');
  return JSON.parse(sanitizeJsonString(match[1] ?? match[0]));
}

// Zelfde isolatie-aanpak als backfill-reading-time.mjs: alleen de body tussen
// <BlogPostLayout>-tags, anders bevat de rest van het bestand (imports,
// functiedeclaratie) een ongepaarde JS-accolade die de opschoning hieronder
// laat doorlopen tot diep in de JSX-tekst.
function isolateJsxBody(fileSource) {
  const match = fileSource.match(/<BlogPostLayout[^>]*>([\s\S]*?)<\/BlogPostLayout>/);
  return match ? match[1] : null;
}

function plainText(jsx) {
  return jsx
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{`([^`]*)`\}/g, '$1')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function extractClaimsFromExistingArticle(articleText, trustedSourcesText) {
  const system = `Je bent een fact-check-assistent voor de EnerCalculatie-kennisbank. Je krijgt een AL GEPUBLICEERD blogartikel. Identificeer elke feitelijke claim die een bron nodig heeft (percentage, jaartal, regelgeving, norm, subsidie, wettelijke verplichting, technische specificatie).

Wijs voor elke claim een sourceKey toe UIT ONDERSTAANDE LIJST — verzin nooit een andere bron of URL. Past een claim bij geen enkele bron in de lijst? Sla die claim dan over (neem 'm niet op in je antwoord).

Beschikbare vertrouwde bronnen (gebruik alleen deze keys):
${trustedSourcesText}

Antwoord UITSLUITEND met een JSON-object (in een \`\`\`json codeblok):
{"claims": [{"text": "de exacte feitelijke claim uit het artikel", "sourceKey": "key uit de lijst"}]}

Lege array toegestaan als er geen claims zijn die aan een bron gekoppeld kunnen worden.`;

  const user = `Artikeltekst:\n${articleText}`;
  const raw = await callGemini(system, user);
  return extractJson(raw);
}

async function main() {
  console.log(`Gemini-tier: ${GEMINI_TIER}, model: ${GEMINI_MODEL}`);

  const appSource = await readFile(APP_TSX_PATH, 'utf8');
  const slugToFile = new Map();
  for (const m of appSource.matchAll(/lazyRoute\('\/blog\/([^']+)',\s*\(\)\s*=>\s*import\('\.\/components\/blog\/([^']+)'\)/g)) {
    slugToFile.set(m[1], `${m[2]}.tsx`);
  }

  const { sources, byKey } = await loadTrustedSources();
  const trustedSourcesText = sources.map((s) => `- key: "${s.key}" — ${s.title} (${s.publisher}, ${s.url})`).join('\n');

  const today = new Date().toISOString().slice(0, 10);
  const summary = { updated: [], skippedAlready: [], skippedNoClaims: [], failed: [] };

  for (const [slug, file] of slugToFile) {
    const filePath = path.join(BLOG_DIR, file);
    let source;
    try {
      source = await readFile(filePath, 'utf8');
    } catch {
      console.warn(`${slug}: bestand ${file} niet gevonden, overgeslagen.`);
      continue;
    }

    if (/>\s*Bronnen\s*</.test(source)) {
      summary.skippedAlready.push(slug);
      continue;
    }

    const jsxBody = isolateJsxBody(source);
    if (!jsxBody) {
      console.warn(`${slug}: kon <BlogPostLayout>-body niet isoleren, overgeslagen.`);
      summary.failed.push({ slug, reason: 'kon body niet isoleren' });
      continue;
    }

    console.log(`${slug}: claims extraheren...`);
    let extracted;
    try {
      extracted = await extractClaimsFromExistingArticle(plainText(jsxBody), trustedSourcesText);
    } catch (err) {
      console.warn(`${slug}: claim-extractie mislukt (${err.message}), overgeslagen.`);
      summary.failed.push({ slug, reason: `claim-extractie: ${err.message}` });
      await sleep(DELAY_BETWEEN_ARTICLES_MS);
      continue;
    }

    const { claims } = extractClaims({ claims: extracted.claims }, byKey);
    if (claims.length === 0) {
      summary.skippedNoClaims.push(slug);
      console.log(`${slug}: geen citeerbare claims gevonden.`);
      await sleep(DELAY_BETWEEN_ARTICLES_MS);
      continue;
    }

    let checkedClaims;
    try {
      const sourceTexts = await fetchSourcesForClaims(claims);
      const factCheck = await factCheckClaims(claims, sourceTexts, { callGemini, extractJson });
      checkedClaims = claims.map((c, i) => ({ ...c, status: factCheck.results[i]?.status ?? 'NO_SOURCE' }));
    } catch (err) {
      console.warn(`${slug}: fact-check mislukt (${err.message}), overgeslagen.`);
      summary.failed.push({ slug, reason: `fact-check: ${err.message}` });
      await sleep(DELAY_BETWEEN_ARTICLES_MS);
      continue;
    }

    const usedSources = collectUsedSources(checkedClaims);
    if (usedSources.length === 0) {
      summary.skippedNoClaims.push(slug);
      console.log(`${slug}: geen enkele claim SUPPORTED, geen bronnensectie toegevoegd.`);
      await sleep(DELAY_BETWEEN_ARTICLES_MS);
      continue;
    }

    const sourcesBlock = buildSourcesBlock(usedSources, today);
    const updatedSource = source.replace('</BlogPostLayout>', `${sourcesBlock}\n      </BlogPostLayout>`);
    await writeFile(filePath, updatedSource, 'utf8');
    summary.updated.push({ slug, sources: usedSources.length });
    console.log(`${slug}: ${usedSources.length} bron(nen) toegevoegd.`);

    await sleep(DELAY_BETWEEN_ARTICLES_MS);
  }

  console.log('\n=== Samenvatting ===');
  console.log(`Bijgewerkt: ${summary.updated.length}`);
  summary.updated.forEach((u) => console.log(`  - ${u.slug} (${u.sources} bron(nen))`));
  console.log(`Al aanwezig (overgeslagen): ${summary.skippedAlready.length}`);
  console.log(`Geen citeerbare/ondersteunde claims (overgeslagen): ${summary.skippedNoClaims.length}`);
  summary.skippedNoClaims.forEach((s) => console.log(`  - ${s}`));
  if (summary.failed.length > 0) {
    console.log(`Mislukt (overgeslagen, opnieuw draaien om te hertproberen): ${summary.failed.length}`);
    summary.failed.forEach((f) => console.log(`  - ${f.slug}: ${f.reason}`));
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`MISLUKT — Reden: ${err.message}`);
    process.exit(1);
  });
}
