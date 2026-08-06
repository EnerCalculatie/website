import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(rootDir, '.env') });
dotenv.config({ path: path.join(rootDir, '.env.local') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

if (!GEMINI_API_KEY) {
  console.error('MISLUKT — Reden: GEMINI_API_KEY ontbreekt als environment variable.');
  process.exit(1);
}

const BLOG_DIR = path.join(rootDir, 'src', 'components', 'blog');
const SOCIAL_DIR = path.join(rootDir, 'src', 'content', 'social');

async function getLatestBlogPost() {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const tsxFiles = files.filter(f => f.endsWith('.tsx') && f.includes('Article'));
    if (tsxFiles.length === 0) return null;
    
    tsxFiles.sort().reverse();
    const latestFile = tsxFiles[0];
    
    const content = await fs.readFile(path.join(BLOG_DIR, latestFile), 'utf-8');
    return { name: latestFile, content };
  } catch (error) {
    console.error("Kon blog directory niet uitlezen:", error);
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
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
      })
    });
    
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`API Error ${res.status}: ${errText}`);
    }
    
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("❌ Fout bij Gemini API:", err.message);
    process.exit(1);
  }
}

async function run() {
  console.log("🚀 Start Social Media Repurposing Pipeline...");
  
  await fs.mkdir(SOCIAL_DIR, { recursive: true });
  
  const blog = await getLatestBlogPost();
  if (!blog) {
    console.log("Geen blog posts gevonden om te verwerken.");
    return;
  }
  
  console.log(`📝 Nieuwste blog gevonden: ${blog.name}`);
  const socialPosts = await generateSocialPosts(blog.content);
  
  const outputFileName = blog.name.replace('.tsx', '-social.md');
  const outputPath = path.join(SOCIAL_DIR, outputFileName);
  
  await fs.writeFile(outputPath, socialPosts, 'utf-8');
  console.log(`✅ Succes! 3 LinkedIn posts gegenereerd in: src/content/social/${outputFileName}`);
}

run();
