import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GEMINI_API_KEY, GEMINI_MODEL } from './lib/gemini-config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(rootDir, '.env') });
dotenv.config({ path: path.join(rootDir, '.env.local') });

const BLOG_DIR = path.join(rootDir, 'src', 'components', 'blog');
const SOCIAL_DIR = path.join(rootDir, 'src', 'content', 'social');
const APP_TSX_PATH = path.join(rootDir, 'src', 'App.tsx');

// Zoekt het componentbestand voor een slug via de route-registratie in App.tsx
// (`lazyRoute('/blog/<slug>', () => import('./components/blog/<Naam>')...)`) i.p.v.
// de slug zelf om te zetten naar een bestandsnaam: 11 van de 54 bestaande artikelen
// (legacy, van vóór de PublishAgent-conventie) hebben een componentnaam die niet
// 1-op-1 uit de slug volgt (bv. slug 'salderingsregeling-2027' → component
// 'SalderingsregelingArticle.tsx', zonder het jaartal). App.tsx is de bron die de
// router zelf gebruikt, dus deze koppeling kan niet uit de pas lopen.
async function getBlogPostBySlug(slug) {
  const appTsx = await fs.readFile(APP_TSX_PATH, 'utf-8');
  const routeRegex = new RegExp(
    `lazyRoute\\('/blog/${slug}',\\s*\\(\\)\\s*=>\\s*import\\('\\./components/blog/([^']+)'\\)`
  );
  const match = appTsx.match(routeRegex);
  if (!match) {
    console.error(`Geen route voor slug '${slug}' gevonden in App.tsx.`);
    return null;
  }

  const fileName = `${match[1]}.tsx`;
  try {
    const content = await fs.readFile(path.join(BLOG_DIR, fileName), 'utf-8');
    return { name: fileName, content };
  } catch (error) {
    console.error(`Kon ${fileName} niet lezen voor slug '${slug}':`, error.message);
    return null;
  }
}

async function generateSocialPosts(blogContent) {
  const systemPrompt = `Je bent een expert B2B social media manager voor de duurzame installatiebranche. 
Jouw doel is om het aangeleverde artikel om te zetten in 3 krachtige, converterende LinkedIn posts.
De doelgroep: Installateurs van zonnepanelen en warmtepompen.
Regels:
1. Maak 3 afzonderlijke posts (Post 1, Post 2, Post 3).
2. Gebruik geen cringe emojis, houd het zakelijk maar vlot.
3. Post 1: Focus op het 'probleem/pijn' en de oplossing.
4. Post 2: Focus op een interessant data-punt of inzicht uit het artikel.
5. Post 3: Korte, punchy post gericht op meningsvorming of discussie.
6. Sluit elke post af met een call-to-action om het hele artikel te lezen op enercalculatie.nl/kennisbank.
Geef ALTIJD pure Markdown tekst terug (zonder extra uitleg).`;

  try {
    console.log(`🤖 Gemini (${GEMINI_MODEL}) wordt aangeroepen voor social media posts...`);
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n--- ARTIKEL ---\n${blogContent}` }] }],
        // 4000 i.p.v. 1000: gemini-3.6-flash denkt standaard (thoughtsTokenCount, niet
        // uit te zetten voor dit model — thinkingBudget: 0 gaf een 400 INVALID_ARGUMENT
        // bij een testrun 2026-08-07) en telt dat mee in maxOutputTokens. Op 1000 stopte
        // de call op MAX_TOKENS tijdens het denken zelf, vóór er ook maar iets van de
        // 3 posts gegenereerd was — data.candidates[0].content.parts[0].text bevatte dan
        // een afgekapt fragment van de interne redenering i.p.v. bruikbare output.
        generationConfig: { temperature: 0.7, maxOutputTokens: 4000 }
      })
    });
    
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`API Error ${res.status}: ${errText}`);
    }
    
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error(`Geen tekst in Gemini-response (mogelijk geblokkeerd door safety-filter): ${JSON.stringify(data).slice(0, 500)}`);
    }
    if (data.candidates[0].finishReason === 'MAX_TOKENS') {
      throw new Error('Response afgekapt op MAX_TOKENS — output is onvolledig, niet bruikbaar als LinkedIn-post.');
    }
    return text;
  } catch (err) {
    console.error("❌ Fout bij Gemini API:", err.message);
    process.exit(1);
  }
}

async function run() {
  const slug = process.argv[2];
  if (!slug) {
    console.error('MISLUKT — Reden: geen slug meegegeven. Gebruik: node scripts/generate-social.mjs <slug>');
    process.exit(1);
  }

  console.log(`🚀 Start Social Media Repurposing Pipeline voor '${slug}'...`);

  await fs.mkdir(SOCIAL_DIR, { recursive: true });

  const blog = await getBlogPostBySlug(slug);
  if (!blog) {
    process.exit(1);
  }

  console.log(`📝 Artikel gevonden: ${blog.name}`);
  const socialPosts = await generateSocialPosts(blog.content);

  const outputFileName = blog.name.replace('.tsx', '-social.md');
  const outputPath = path.join(SOCIAL_DIR, outputFileName);

  await fs.writeFile(outputPath, socialPosts, 'utf-8');
  console.log(`✅ Succes! 3 LinkedIn posts gegenereerd in: src/content/social/${outputFileName}`);
}

run();
