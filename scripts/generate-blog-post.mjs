#!/usr/bin/env node
/**
 * Genereert op dinsdag en donderdag één nieuw kennisbank-blogartikel via OpenRouter (model-
 * agnostisch, geen lock-in op één LLM-provider), los van Claude Code / de
 * interactieve CLI. Bedoeld voor GitHub Actions cron.
 *
 * Vereist env var GEMINI_API_KEY. Optioneel: GEMINI_MODEL (default
 * hieronder) om zelf een model te kiezen.
 * Schrijft uitsluitend de drie bestanden die CLAUDE.md voorschrijft
 * (artikelcomponent, blogPosts.ts-entry, App.tsx-route), runt daarna de build
 * ter verificatie. Commit/push gebeurt in de workflow, niet in dit script.
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { validateArticle, APPROVAL_THRESHOLD } from './seo-geo-validator.mjs';
import { buildContentMap } from './build-content-map.mjs';
import { estimateReadingMinutes } from './backfill-reading-time.mjs';
import { sanitizeJsonString } from './lib/json-sanitizer.mjs';
import {
  checkArticleMeta,
  checkComponentBody,
  checkNoAmounts,
  checkSavingsClaims,
  countBodyWords,
  deriveSeoTitle,
  truncateAtWord,
  MAX_DESCRIPTION_LENGTH,
  MIN_WORD_COUNT,
} from './lib/content-checks.mjs';
import { extractClaims } from './lib/claim-extractor.mjs';
import { loadTrustedSources, fetchSourcesForClaims } from './lib/source-validator.mjs';
import { factCheckClaims, allClaimsSupported } from './lib/fact-check.mjs';
import { scoreForSource, MIN_SOURCE_QUALITY } from './lib/source-quality.mjs';
import { collectUsedSources, buildSourcesBlock } from './lib/citation-generator.mjs';
import { buildAudit, writeAuditFile } from './lib/article-audit.mjs';
import { GEMINI_TIER, GEMINI_API_KEY, GEMINI_MODEL } from './lib/gemini-config.mjs';

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

console.log(`Gemini-tier: ${GEMINI_TIER}, model: ${GEMINI_MODEL}`);

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
/** Verbeterpogingen binnen één run, vóór het artikel definitief wordt afgekeurd. */
const MAX_IMPROVE_ATTEMPTS = 2;
/** Zelfherstel-pogingen voor de fact-check-fase (los van MAX_IMPROVE_ATTEMPTS hierboven). */
const MAX_FACTCHECK_ATTEMPTS = 3;

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

const RETRYABLE_STATUSES = new Set([429, 500, 503]);
const GEMINI_MAX_ATTEMPTS = 3;
const GEMINI_RETRY_DELAY_MS = 15000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini(system, user) {
  let lastError;
  for (let attempt = 1; attempt <= GEMINI_MAX_ATTEMPTS; attempt++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: user }] }],
        systemInstruction: { role: 'system', parts: [{ text: system }] },
        generationConfig: { maxOutputTokens: 16384 },
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
    if (!message) throw new Error(`Geen tekstantwoord ontvangen van Gemini (model ${GEMINI_MODEL}, finishReason: ${finishReason}). API Response: ${JSON.stringify(data)}`);
    if (finishReason === 'MAX_TOKENS') throw new Error(`Gemini-antwoord afgekapt op maxOutputTokens (model ${GEMINI_MODEL}) — output was niet compleet.`);
    return message;
  }
  throw lastError;
}

function extractJson(raw) {
  const match = raw.match(/```json\s*([\s\S]*?)```/) || raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Kon geen JSON uit het model-antwoord halen.');
  
  let parsed;
  try {
    parsed = JSON.parse(sanitizeJsonString(match[1] ?? match[0]));
  } catch (err) {
    throw new Error(`JSON parsing gefaald: ${err.message}`);
  }

  // Als de componentBody ontbreekt in JSON, zoek hem in een apart JSX of HTML blok
  // (alleen bij artikel-generatie waar 'title' aanwezig is, niet bij de validator)
  if (parsed.title && (!parsed.componentBody || parsed.componentBody.trim() === '')) {
    const jsxMatch = raw.match(/```(?:jsx|tsx|html)\s*([\s\S]*?)```/);
    if (jsxMatch) {
      parsed.componentBody = jsxMatch[1].trim();
    } else {
      throw new Error('Kon geen componentBody vinden (niet in JSON en niet in een ```jsx blok).');
    }
  }
  
  return parsed;
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

  const { byKey: trustedSourcesByKey, sources: trustedSources } = await loadTrustedSources();
  const trustedSourcesText = trustedSources
    .map((s) => `- key: "${s.key}" — ${s.title} (${s.publisher}, ${s.url})`)
    .join('\n');

  const system = `Je bent een senior contentstrateeg, SEO-specialist en technisch copywriter voor EnerCalculatie, een Nederlandse SaaS-oplossing voor energieadviesberekeningen. Je schrijft hoogwaardige kennisbankartikelen voor een zakelijke doelgroep van Nederlandse installateurs die actief zijn in zonnepanelen, thuisbatterijen, warmtepompen, laadpalen, airconditioningsystemen en hybride energiesystemen.

De lezer is een vakprofessional die op zoek is naar praktische kennis, technische verdieping, actuele regelgeving en concrete handvatten om klanten beter te adviseren. De artikelen moeten vertrouwen opbouwen, expertise uitstralen en tegelijkertijd bijdragen aan organische vindbaarheid (SEO).

Gebruik uitsluitend de aangeleverde bedrijfscontext als bron voor informatie over EnerCalculatie zelf. Verzin geen functionaliteiten, voordelen, integraties, prijzen, klanten, certificeringen of toekomstplannen die niet expliciet in de context staan.

Je volgt alle projectregels, schrijfrichtlijnen en SEO-richtlijnen strikt. Wanneer informatie ontbreekt, geef dit aan in plaats van aannames te doen.

Het doel is om artikelen te schrijven die:
- hoog scoren in Google;
- inhoudelijk beter zijn dan concurrerende artikelen;
- daadwerkelijk waarde toevoegen voor installateurs;
- autoriteit uitstralen;
- subtiel laten zien waar EnerCalculatie binnen het onderwerp relevant is, zonder commercieel of promotioneel te worden.

Schrijf altijd in professioneel Nederlands (Nederland), gebruik de u-vorm en houd rekening met de vakkennis van de doelgroep.

Volg de projectregels strikt:\n\n${claudeMd}\n\n${aiContext}`;

  const user = `Schrijf het artikel voor dit vooraf geplande backlog-item — het onderwerp staat vast, kies GEEN ander onderwerp:
Werktitel: ${planItem.title}
Primair zoekwoord: ${planItem.keyword}
Zoekintentie: ${planItem.intent}

Bestaande blogonderwerpen (slugs, ter voorkoming van duplicaten in interne links): ${existingSlugs.join(', ')}
Bestaande titels: ${existingTitles.join(' | ')}

Beschikbare interne pagina's om naar te linken (kies 2-3 die inhoudelijk relevant zijn voor DIT artikel, niet willekeurig):
${contentMapText}

Referentie-artikelen (structuur, stijl en lengte exact aanhouden — gebruik BlogPostLayout, dezelfde Tailwind-classes, dezelfde opbouw met h2-secties en een "Hoe EnerCalculatie hiermee omgaat"-slot):

${referenceArticles}

# RESPONSE GUIDELINES
Werk volgens onderstaande SEO- en structuur-richtlijnen:

1. Analyseer en beantwoord de zoekintentie volledig.
2. Verwerk op natuurlijke wijze het hoofdzoekwoord, secundaire zoekwoorden en synoniemen (geen keyword stuffing).
3. Schrijf een sterke introductie die direct het probleem benoemt en het zoekwoord bevat. Geen clichés, geen marketing.
4. Schrijf iedere sectie volledig uit: leg het mechanisme uit, benoem de afweging die de installateur maakt, en geef een concreet praktijkvoorbeeld.
5. Schrijf vanuit de installateur: richt je op adviesgesprekken, offertes, rendement, regelgeving, subsidies, dimensionering en klantvragen. Schrijf niet vanuit het consumentenperspectief.
6. Verwerk EnerCalculatie subtiel waar relevant, zonder verkooppraat.
7. Optimaliseer leesbaarheid: actieve schrijfstijl, korte alinea's, vakinhoudelijke toon. Gebruik opsommingen wanneer dit de leesbaarheid verbetert.
8. Voeg praktische elementen toe waar passend: checklist, stappenplan, vergelijkingstabel (binnen de componentBody).
9. Controleer: geen feitelijke onjuistheden, logische opbouw, professioneel niveau.

HARDE EIS — LENGTE: de componentBody telt minimaal ${MIN_WORD_COUNT} woorden en maximaal 1500 woorden om een leestijd van minimaal 5 minuten te garanderen. Een artikel van 200-300 woorden dat de kop herhaalt in andere woorden wordt afgekeurd. Voeg liever diepte toe aan bestaande secties dan nieuwe lege secties.

HARDE EIS — GEEN KALE BESPARINGSCLAIMS: schrijf nooit 'een besparing van meer dan 40% op de energiekosten' of vergelijkbaar: één getal bij besparing/kosten zonder bron. Gebruik een marge ('20-60%, afhankelijk van isolatie en stooklijn') of laat het percentage weg. Technische percentages in een kloppend rekenvoorbeeld mogen wel.

HARDE EIS — GEEN BEDRAGEN: noem nergens een concreet geldbedrag (geen euro-bedragen, geen prijzen, geen subsidiebedragen, geen prijstabellen), niet in de body, niet in de FAQ, niet in de keyPoints. Je kunt die niet betrouwbaar uit je geheugen ophalen en ze verouderen. Verwijs in plaats daarvan naar de bron: 'de actuele ISDE-bedragen staan op rvo.nl', 'kijk voor de actuele tarieven op acm.nl'. Een artikel mét een bedrag wordt automatisch afgekeurd.

Gebruik verder alleen feiten waarvan je zeker bent dat ze correct zijn (RVO/ISDE, ACM, Netbeheer Nederland, Techniek Nederland, Belastingdienst) — verzin geen percentages of regelgeving. Noem geen productmerken of celchemieën die je niet zeker weet. Vermijd absolute claims ("foutloos", "altijd correct", "0% foutmarge"); gebruik "gevalideerd" / "deterministisch berekend" / "kloppend" in plaats daarvan.

HARDE EIS — CLAIMS EN BRONNEN: elke feitelijke claim in het artikel (percentage, jaartal, regelgeving, norm, subsidie, wettelijke verplichting, technische specificatie) moet expliciet opgenomen worden in de "claims"-array (zie OUTPUT FORMAT) met een "sourceKey" die EXACT overeenkomt met één van onderstaande vertrouwde bronnen. Gebruik GEEN sourceKey die niet in deze lijst staat, en verzin GEEN URL's. Past een claim bij geen enkele bron in de lijst? Schrijf de claim dan generiek/zonder het specifieke cijfer of de specifieke regelnaam (bv. "de gasvraag kan afnemen" i.p.v. een percentage), of laat hem weg. Elke claim die niet aan een geldige sourceKey hangt, wordt automatisch afgekeurd en het hele artikel wordt teruggestuurd voor herziening — dit is een harde publicatie-eis, geen suggestie.

Beschikbare vertrouwde bronnen (gebruik alleen deze keys):
${trustedSourcesText}

# OUTPUT FORMAT
Geef je antwoord in TWEE APARTE DELEN (gescheiden door witregels).

DEEL 1: Een valide JSON-object (in een \`\`\`json codeblok). Zorg dat alle dubbele aanhalingstekens goed ge-escaped zijn. Laat het veld 'componentBody' LEEG in de JSON. Gebruik exact deze velden:

- slug: kebab-case-slug (mag afwijken van werktitel-slug indien een betere SEO-slug logischer is)
- title: volledige titel, gebruikt als H1; mag de werktitel verfijnen, moet het primaire zoekwoord bevatten
- seoTitle: titel voor de <title>-tag. HARDE EIS: maximaal 60 tekens (reken elk teken mee, dus tel exact voordat je antwoordt). Primair zoekwoord vooraan. GEEN merksuffix. GEEN "&" (wordt in HTML "&amp;", dat kost 5 tekens in plaats van 1 en duwt je over de limiet) — schrijf "en" voluit.
- description: SEO meta description. HARDE EIS: maximaal 155 tekens. Bevat het primaire zoekwoord.
- excerpt: Korte samenvatting.
- tags: Array van strings, bv. ["Zonnepanelen", "Installatiebranche"]
- keyPoints: Array van 3-5 strings met de belangrijkste punten.
- category: één hoofdcategorie (Zonnepanelen / Thuisbatterijen / Warmtepompen / Laadpalen / Subsidies)
- faq: Array van minimaal 3, maximaal 5 vraag/antwoord-objecten ({"question": "...", "answer": "..."}). Dit dekt de aanvullende zoekvragen af.
- claims: Array van objecten {"text": "de exacte feitelijke claim uit het artikel", "sourceKey": "key uit de vertrouwde-bronnenlijst hierboven"}. Leeg array toegestaan als het artikel geen feitelijke claims bevat die een bron nodig hebben (zeldzaam bij dit onderwerp).

DEEL 2: Een apart JSX codeblok (in een \`\`\`jsx codeblok) met de daadwerkelijke componentBody (de JSX-children van <BlogPostLayout>). Omdat dit géén JSON is, hoef je dubbele aanhalingstekens (zoals in \`className="my-class"\`) NIET te escapen. Schrijf hier het volledige, uitgewerkte artikel.
KRITIEK — geldig JSX:
- Gebruik NOOIT een kale < of > als vergelijkingsteken in lopende tekst, schrijf dit als woorden ('minder dan', 'groter dan').
- Schrijf ALLEEN de inhoud (de tags zoals <h2>, <p>), schrijf NOOIT een \`export function\` of \`return (...)\` eromheen!
- Gebruik je een <table>, wrap die dan ALTIJD in <div className="overflow-x-auto mb-6"> en geef table de classes "w-full border-collapse border border-slate-300 text-sm".

Voorbeeld van het verwachte antwoord:

\`\`\`json
{
  "slug": "...",
  "title": "...",
  "seoTitle": "...",
  "description": "...",
  "excerpt": "...",
  "tags": ["..."],
  "keyPoints": ["..."],
  "category": "...",
  "faq": [{"question": "...", "answer": "..."}],
  "claims": [{"text": "...", "sourceKey": "..."}]
}
\`\`\`

\`\`\`jsx
<h2>Voorbeeldkop</h2>
<p>Hier komt de tekst van de componentBody...</p>
\`\`\`

De datum wordt automatisch ingevuld als vandaag (${todayISO()}), dus laat "date" weg uit de JSON.`;

  async function generateWithRetries(systemPrompt, userPrompt, contextLabel) {
    let result;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const raw = await callGemini(systemPrompt, userPrompt);
        result = extractJson(raw);
        break;
      } catch (err) {
        if (attempt === 3) throw err;
        console.log(`Generatie of JSON parsing gefaald in ${contextLabel} (poging ${attempt}/3): ${err.message}. Opnieuw proberen...`);
      }
    }
    return result;
  }

  console.log(`Genereer artikel via Gemini (${GEMINI_MODEL})...`);
  let article = await generateWithRetries(system, user, "initiële generatie");

  if (existingSlugs.includes(article.slug)) {
    throw new Error(`Gegenereerde slug '${article.slug}' bestaat al — model heeft duplicaat gekozen.`);
  }

  // Deterministische bezwaren náást de LLM-score. De validator draait op
  // hetzelfde model dat het artikel schreef en zette artikelen van 120-300
  // woorden probleemloos op 80+; woordental en verzonnen cijfers moet je dus
  // tellen, niet laten beoordelen.
  const collectIssues = (a) => {
    const words = countBodyWords(a.componentBody ?? '');
    const faqText = (a.faq ?? []).map((f) => `${f.question} ${f.answer}`).join(' ');
    return [
      ...(words < MIN_WORD_COUNT
        ? [`De body is ${words} woorden, minimaal ${MIN_WORD_COUNT} vereist. Werk elke h2-sectie inhoudelijk uit met uitleg, afwegingen en een concreet voorbeeld uit de praktijk van een installateur — voeg geen secties toe die niets zeggen.`]
        : []),
      ...checkNoAmounts(a.componentBody ?? '').map((e) => `Body ${e}`),
      ...checkNoAmounts(faqText).map((e) => `FAQ ${e}`),
      ...checkSavingsClaims(a.componentBody ?? ''),
      ...checkSavingsClaims(faqText),
      ...checkArticleMeta({ ...a, keyword: planItem.keyword, seoTitle: a.seoTitle ?? '' }).filter((e) =>
        e.startsWith('seoTitle')
      ),
    ];
  };

  console.log('SEO/GEO-controle...');
  let validation = await validateArticle(article, { callGemini, extractJson });
  let issues = collectIssues(article);
  console.log(`SEO: ${validation.seoScore}/100, GEO: ${validation.geoScore}/100 (beide moeten >= ${APPROVAL_THRESHOLD}) | contentchecks: ${issues.length} bezwaar(en)`);

  // Twee verbeterpogingen, geen één. Het model reageert aantoonbaar op de
  // lengte-feedback (een meetrun ging van 229 naar 564 woorden, met de GEO-score
  // van 80 naar 90 mee omhoog), maar haalt 700 zelden in één keer. Met één poging
  // strandt zo'n artikel net vóór de streep en loopt het backlog-item na twee
  // runs dood op 'abandoned', terwijl het bij een tweede poging gewoon slaagt.
  for (let poging = 1; poging <= MAX_IMPROVE_ATTEMPTS && (!validation.approved || issues.length > 0); poging++) {
    const feedback = [...validation.improvements, ...issues];
    console.log(`Nog niet publicabel — verbeterpoging ${poging}/${MAX_IMPROVE_ATTEMPTS} met feedback:\n- ${feedback.join('\n- ')}`);
    const improveUser = `${user}\n\nJe vorige concept scoorde SEO ${validation.seoScore}/100, GEO ${validation.geoScore}/100 (beide moeten >= ${APPROVAL_THRESHOLD}). Verwerk deze verbeterpunten en lever een volledig herzien artikel (zelfde JSON-structuur):\n- ${feedback.join('\n- ')}`;
    const improvedArticle = await generateWithRetries(system, improveUser, `verbeterpoging ${poging}`);
    Object.assign(article, improvedArticle);

    validation = await validateArticle(article, { callGemini, extractJson });
    issues = collectIssues(article);
    console.log(`Na poging ${poging} — SEO: ${validation.seoScore}/100, GEO: ${validation.geoScore}/100 | contentchecks: ${issues.length} bezwaar(en)`);
    if (issues.length > 0) console.log(`Resterend:\n- ${issues.join('\n- ')}`);
  }

  // Deterministische bezwaren zijn hard: ze gaan over feiten en lengte, niet over smaak.
  if (issues.length > 0) {
    validation = { ...validation, approved: false, improvements: [...validation.improvements, ...issues] };
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
      model: GEMINI_MODEL,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      status: planItem.status === 'abandoned' ? 'abandoned' : 'rejected',
    });
    throw new Error(
      `Artikel afgekeurd na verbeterpoging (SEO ${validation.seoScore}/${APPROVAL_THRESHOLD}, GEO ${validation.geoScore}/${APPROVAL_THRESHOLD} — beide moeten voldoen) — backlog-item op '${planItem.status}' gezet (poging ${planItem.retryCount}/${MAX_RETRIES}), geen bestanden geschreven.`
    );
  }

  // Fact-check-fase: elke claim moet aan een vertrouwde bron hangen (zie
  // ai-context/trusted-sources.json) én die bron moet de claim daadwerkelijk
  // ondersteunen. Correctheid boven snelheid: een artikel met ook maar één
  // niet-ondersteunde claim wordt afgekeurd, geen gemiddelde-score-gate zoals
  // bij SEO/GEO hierboven.
  console.log('Claim-extractie en bronverificatie...');
  let { claims, issues: claimIssues } = extractClaims(article, trustedSourcesByKey);
  let sourceTexts = await fetchSourcesForClaims(claims);
  let factCheck = await factCheckClaims(claims, sourceTexts, { callGemini, extractJson });
  claims = claims.map((c, i) => ({ ...c, status: factCheck.results[i]?.status ?? 'NO_SOURCE' }));

  const lowQualitySources = () =>
    claims.filter((c) => c.status === 'SUPPORTED' && c.source && scoreForSource(c.source) < MIN_SOURCE_QUALITY);

  const factCheckFailing = () => !allClaimsSupported(claims) || claimIssues.length > 0 || lowQualitySources().length > 0;

  for (let poging = 1; poging <= MAX_FACTCHECK_ATTEMPTS && factCheckFailing(); poging++) {
    const failing = claims.filter((c) => c.status !== 'SUPPORTED');
    const feedback = [
      ...claimIssues,
      ...failing.map((c) => `Claim "${c.text}" (status ${c.status}) — verwijder deze claim of herschrijf hem generiek zonder het specifieke cijfer/regelnaam, tenzij een andere bron uit de lijst hem wél ondersteunt.`),
    ];
    console.log(`Fact-check niet geslaagd — herstelpoging ${poging}/${MAX_FACTCHECK_ATTEMPTS}:\n- ${feedback.join('\n- ')}`);

    const factCheckUser = `${user}\n\nJe vorige concept bevatte claims die niet (volledig) door een vertrouwde bron ondersteund werden. Verwerk deze correcties en lever een volledig herzien artikel (zelfde JSON-structuur, incl. claims-array):\n- ${feedback.join('\n- ')}`;
    const repaired = await generateWithRetries(system, factCheckUser, `fact-check-herstel ${poging}`);
    Object.assign(article, repaired);

    ({ claims, issues: claimIssues } = extractClaims(article, trustedSourcesByKey));
    sourceTexts = await fetchSourcesForClaims(claims);
    factCheck = await factCheckClaims(claims, sourceTexts, { callGemini, extractJson });
    claims = claims.map((c, i) => ({ ...c, status: factCheck.results[i]?.status ?? 'NO_SOURCE' }));
    console.log(`Na fact-check-poging ${poging} — FACT: ${factCheck.factScore}/100, ${claims.length} claim(s)`);
  }

  if (factCheckFailing()) {
    const details = [
      ...claimIssues,
      ...claims.filter((c) => c.status !== 'SUPPORTED').map((c) => `${c.id} ("${c.text}"): ${c.status}`),
      ...lowQualitySources().map((c) => `${c.id}: bronkwaliteit onder ${MIN_SOURCE_QUALITY}`),
    ];
    planItem.lastScore = validation.score;
    rejectPlanItem(planItem, `Fact-check gefaald: ${details.join(' | ')}`);
    await writePlan(plan);
    await appendLogEntry({
      date: todayISO(),
      topic: planItem.title,
      slug: article.slug ?? null,
      model: GEMINI_MODEL,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      factScore: factCheck.factScore,
      claimsCount: claims.length,
      sourcesCount: collectUsedSources(claims).length,
      repairAttempts: MAX_FACTCHECK_ATTEMPTS,
      status: planItem.status === 'abandoned' ? 'abandoned-failed-factcheck' : 'rejected-failed-factcheck',
    });
    throw new Error(
      `Fact-check gefaald — backlog-item op '${planItem.status}' gezet (poging ${planItem.retryCount}/${MAX_RETRIES}), geen bestanden geschreven:\n- ${details.join('\n- ')}`
    );
  }

  const usedSources = collectUsedSources(claims);
  const sourcesBlock = buildSourcesBlock(usedSources, todayISO());
  article.componentBody = `${article.componentBody}\n${sourcesBlock}`;

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
${article.componentBody.replace(/\\'/g, "'")}
    </BlogPostLayout>
  );
}
`;

  // Lengtes zijn te repareren, corruptie niet. Kort daarom eerst deterministisch
  // in wat te lang is (of ontbreekt), en gate daarna pas op wat écht fout is.
  // Zonder deze stap sneuvelt een verder prima artikel op één te lang veld, en
  // loopt het backlog-item na twee pogingen dood op 'abandoned'.
  const { seoTitle, derived } = deriveSeoTitle(article);
  article.seoTitle = seoTitle;
  if (derived) {
    console.warn(`seoTitle door het model niet bruikbaar geleverd — afgeleid uit de titel: "${seoTitle}"`);
  }
  if (article.description && article.description.length > MAX_DESCRIPTION_LENGTH) {
    const before = article.description.length;
    article.description = truncateAtWord(article.description, MAX_DESCRIPTION_LENGTH);
    console.warn(`description was ${before} tekens — ingekort naar ${article.description.length}.`);
  }

  // Harde contentgate vóór de JSX-preflight: corruptie en structuurfouten zijn
  // te tellen, niet te beoordelen. Faalt dit, dan gaat het item terug de backlog
  // in, net als bij ongeldige JSX: geen half artikel op schijf.
  // Laatste gate vóór schrijven. Bedragen/woordental/seoTitle zijn hierboven al
  // door de verbeterlus gegaan; wat hier nog staat is niet meer te repareren.
  const metaErrors = [
    ...checkArticleMeta(article),
    ...checkComponentBody(article.componentBody),
    ...checkNoAmounts(`${article.description} ${(article.keyPoints ?? []).join(' ')}`).map(
      (e) => `description/keyPoints ${e}`
    ),
  ];
  if (metaErrors.length > 0) {
    planItem.lastScore = validation.score;
    rejectPlanItem(planItem, `Contentchecks gefaald: ${metaErrors.join(' | ')}`);
    await writePlan(plan);
    await appendLogEntry({
      date: todayISO(),
      topic: planItem.title,
      slug: article.slug,
      model: GEMINI_MODEL,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      status: planItem.status === 'abandoned' ? 'abandoned-failed-checks' : 'rejected-failed-checks',
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
      model: GEMINI_MODEL,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      status: planItem.status === 'abandoned' ? 'abandoned-invalid-jsx' : 'rejected-invalid-jsx',
    });
    throw new Error(`Gegenereerde componentBody bevat ongeldige JSX — backlog-item op '${planItem.status}' gezet (poging ${planItem.retryCount}/${MAX_RETRIES}), geen bestanden geschreven. Details: ${err.message}`);
  }

  await writeFile(componentPath, componentSource, 'utf8');
  console.log(`Component geschreven: ${componentPath}`);

  // Alles wat als JS-string in blogPosts.ts belandt moet hier langs: een
  // apostrof in de waarde sluit anders de string en breekt het bestand. Tags
  // gingen er ongeëscaped doorheen, waardoor de tag 'Elektrische auto's' een
  // kapotte blogPosts.ts opleverde die de build sloopte.
  const escape = (s) => s.replace(/'/g, "\\'");
  const tagsJs = article.tags.map((t) => `'${escape(t)}'`).join(', ');
  const keyPointsJs = article.keyPoints.map((k) => `      '${escape(k)}',`).join('\n');

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

  // Build-verificatie draait ná het schrijven — anders valt er niets te bouwen.
  // Faalt hij, dan moeten de geschreven bestanden wéér weg: de workflow committeert
  // met `if: always()` wat er op schijf staat, en zou anders kapotte code naar main
  // pushen. Dat is precies wat er gebeurde met de tag 'Elektrische auto's': build
  // stuk, bestanden bleven staan, bot pushte ze alsnog.
  console.log('Build verifiëren...');
  try {
    execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });
  } catch (err) {
    execSync(`git checkout -- ${APP_TSX_PATH} ${BLOG_POSTS_PATH}`, { cwd: ROOT });
    await rm(componentPath, { force: true });
    console.error('Build gefaald — App.tsx, blogPosts.ts en het artikelcomponent teruggedraaid.');

    planItem.lastScore = validation.score;
    rejectPlanItem(planItem, `Build gefaald na schrijven: ${err.message}`);
    await writePlan(plan);
    await appendLogEntry({
      date: todayISO(),
      topic: planItem.title,
      slug: article.slug,
      model: GEMINI_MODEL,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      status: planItem.status === 'abandoned' ? 'abandoned-build-failed' : 'rejected-build-failed',
    });
    throw new Error(
      `Build gefaald na het schrijven van de bestanden — alles teruggedraaid, backlog-item op '${planItem.status}' gezet (poging ${planItem.retryCount}/${MAX_RETRIES}).`
    );
  }

  planItem.status = 'generated';
  planItem.generatedSlug = article.slug;
  planItem.generatedAt = new Date().toISOString();
  planItem.seoGeoScore = validation.score;
  await writePlan(plan);
  console.log('content-plan.json bijgewerkt: item op status "generated" gezet.');

  const minSourceQuality = usedSources.length
    ? Math.min(...claims.filter((c) => c.status === 'SUPPORTED' && c.source).map((c) => scoreForSource(c.source)))
    : 100;

  await appendLogEntry({
    date: todayISO(),
    topic: article.title,
    slug: article.slug,
    model: GEMINI_MODEL,
    seoScore: validation.seoScore,
    geoScore: validation.geoScore,
    factScore: factCheck.factScore,
    claimsCount: claims.length,
    sourcesCount: usedSources.length,
    sourceQuality: minSourceQuality,
    repairAttempts: 0,
    status: 'generated',
  });
  console.log('content-log.json bijgewerkt.');

  await writeAuditFile(
    buildAudit({
      article,
      seoScore: validation.seoScore,
      geoScore: validation.geoScore,
      factScore: factCheck.factScore,
      sourceQuality: minSourceQuality,
      claims,
    })
  );
  console.log('ai-context/article-audit.json bijgewerkt.');

  console.log(`GESLAAGD — Onderwerp: ${article.title} — Slug: ${article.slug}`);
}

main().catch((err) => {
  console.error(`MISLUKT — Reden: ${err.message}`);
  process.exit(1);
});
