// IndexNow-submission: meldt nieuwe/gewijzigde URL's aan bij Bing, Yandex en
// andere IndexNow-deelnemers (Google doet niet mee — die blijft op de sitemap).
//
// Gebruik:
//   node scripts/indexnow-submit.mjs --all           alle URL's uit dist/sitemap.xml
//   node scripts/indexnow-submit.mjs /blog/mijn-slug een of meer losse paden
//   node scripts/indexnow-submit.mjs --all --dry-run toon wat er zou worden gestuurd
//
// De sleutel is publiek (dat is het protocol): hij staat als los tekstbestand in
// public/ en moet op https://enercalculatie.nl/<key>.txt te bereiken zijn.
// Zonder dat bestand weigert IndexNow de submission — vandaar de check vooraf.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE = 'https://enercalculatie.nl';
const HOST = 'enercalculatie.nl';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// IndexNow accepteert maximaal 10.000 URL's per verzoek; ruim boven onze omvang,
// maar de batch houdt het netjes als de site groeit.
const BATCH_SIZE = 100;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const all = args.includes('--all');
const paths = args.filter((a) => !a.startsWith('--'));

/** Leest de sleutel uit de bestandsnaam in public/ — één bron, geen dubbele constante. */
function readKey() {
  const files = fs.readdirSync(path.join(root, 'public')).filter((f) => /^[a-f0-9]{8,128}\.txt$/.test(f));
  if (files.length === 0) {
    throw new Error('Geen IndexNow-sleutelbestand in public/ (verwacht <hex>.txt).');
  }
  if (files.length > 1) {
    throw new Error(`Meerdere IndexNow-sleutelbestanden in public/: ${files.join(', ')} — houd er één.`);
  }
  const key = path.basename(files[0], '.txt');
  const contents = fs.readFileSync(path.join(root, 'public', files[0]), 'utf-8').trim();
  if (contents !== key) {
    throw new Error(`Inhoud van ${files[0]} ("${contents}") is niet gelijk aan de bestandsnaam — IndexNow eist dat.`);
  }
  return key;
}

function urlsFromSitemap() {
  const sitemapPath = path.join(root, 'dist', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    throw new Error('dist/sitemap.xml ontbreekt — draai eerst `npm run build`.');
  }
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

let key;
try {
  key = readKey();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

let urlList;
if (all) {
  urlList = urlsFromSitemap();
} else if (paths.length > 0) {
  urlList = paths.map((p) => (p.startsWith('http') ? p : `${SITE}${p.startsWith('/') ? p : `/${p}`}`));
} else {
  console.error('Geef --all of één of meer paden op. Zie de kop van dit bestand.');
  process.exit(1);
}

if (urlList.length === 0) {
  console.error('Geen URL\'s om te submitten.');
  process.exit(1);
}

if (dryRun) {
  console.log(`[dry-run] Sleutel: ${key}`);
  console.log(`[dry-run] ${urlList.length} URL(s) zouden worden gesubmit:`);
  for (const u of urlList) console.log(`  ${u}`);
  process.exit(0);
}

// Het sleutelbestand moet live staan vóór de submission, anders krijgen we een
// 403. Bij een nieuwe deploy kan dat even duren, dus we proberen het een paar keer.
async function waitForKeyFile(attempts = 5, delayMs = 10_000) {
  const keyUrl = `${SITE}/${key}.txt`;
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(keyUrl);
      if (res.ok && (await res.text()).trim() === key) return true;
      console.log(`Sleutelbestand nog niet live (poging ${i}/${attempts}, status ${res.status}).`);
    } catch (err) {
      console.log(`Sleutelbestand nog niet bereikbaar (poging ${i}/${attempts}): ${err.message}`);
    }
    if (i < attempts) await new Promise((r) => setTimeout(r, delayMs));
  }
  return false;
}

if (!(await waitForKeyFile())) {
  console.error(`Sleutelbestand ${SITE}/${key}.txt is niet bereikbaar — IndexNow zou de submission weigeren. Is de deploy klaar?`);
  process.exit(1);
}

let failed = false;
for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
  const batch = urlList.slice(i, i + BATCH_SIZE);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList: batch }),
  });

  // 200 = geaccepteerd, 202 = geaccepteerd maar sleutel wordt nog gevalideerd.
  if (res.status === 200 || res.status === 202) {
    console.log(`Gesubmit: ${batch.length} URL(s) — status ${res.status}.`);
  } else {
    failed = true;
    console.error(`Submission gefaald — status ${res.status}: ${await res.text()}`);
  }
}

if (failed) process.exit(1);
console.log(`Klaar: ${urlList.length} URL(s) aangeboden aan IndexNow.`);
