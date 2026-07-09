import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const API_KEY = process.env.LLM_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/components/blog');
const CONTENT_FILE = path.join(__dirname, '../src/content/blogPosts.ts');

async function generateBlog() {
  if (!API_KEY) {
    console.error("Fout: Geen LLM_API_KEY geconfigureerd in GitHub Secrets.");
    process.exit(1);
  }

  let existingContent = "";
  try {
    existingContent = fs.readFileSync(CONTENT_FILE, 'utf-8');
  } catch (e) {
    console.log("blogPosts.ts niet gevonden of leesfout. We gaan door zonder context.");
  }

  const prompt = `
Je werkt in de repository enercalculatie-website.
Taak: schrijf EEN nieuw, origineel Nederlands blogartikel voor de kennisbank, gericht op installateurs in de verduurzamingsbranche (zonnepanelen, thuisbatterijen, warmtepompen).

Instructies:
- Het onderwerp mag NIET al voorkomen in deze lijst: ${existingContent.substring(0, 1000)}...
- Gebruik actuele thema's: RVO (ISDE), ACM, Netbeheer Nederland.
- Schrijf in professioneel Nederlands, u-vorm, gericht op de installateur.
- Genereer UITSLUITEND de rauwe React/TypeScript code voor het component. Geen markdown blokken (\`\`\`tsx), geen uitleg, alleen de code.
- Gebruik exacte BlogPostLayout structuur en exporteer het als een default function.
- Typ Framer Motion variants expliciet en gebruik geen 'any'.

CRUCIALE EISEN VOOR DE CODE:
1. Gebruik EXACT deze import voor de layout bovenaan:
   import BlogPostLayout from '@/components/BlogPostLayout';
2. Neem ook de benodigde interface/type-imports mee als je die gebruikt.
3. Genereer bovenaan het bestand een geëxporteerde constante 'meta' van het type 'BlogPostMeta' (zorg dat de interface in dit bestand is gedeclareerd of geïmporteerd). Vul de velden in zoals in de huidige blogPosts.ts: slug, title, description, date (gebruik de datum van vandaag), excerpt, tags (array van strings) en keyPoints (array van 3-4 strings).
`;

  console.log("Verbinding maken met OpenRouter API...");
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat', 
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      console.error("API Foutmelding:", data);
      process.exit(1);
    }

    let code = data.choices[0].message.content;
    code = code.replace(/```tsx?\n/g, '').replace(/```/g, '').trim();

    if (!fs.existsSync(BLOG_DIR)){
        fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const fileName = `BlogInstallatie_${dateStr}.tsx`;
    const filePath = path.join(BLOG_DIR, fileName);

    fs.writeFileSync(filePath, code);
    console.log(`✅ Succesvol weggeschreven naar: ${filePath}`);

  } catch (error) {
    console.error("Netwerk- of verwerkingsfout:", error);
    process.exit(1);
  }
}

generateBlog();
