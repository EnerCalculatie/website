import 'dotenv/config';
import { GEMINI_API_KEY, GEMINI_MODEL } from '../../lib/gemini-config.mjs';

export interface LLMRequest {
  systemPrompt?: string;
  userPrompt: string;
  temperature?: number;
  responseFormat?: 'json_object' | 'text';
}

export class LLMService {
  async generate(request: LLMRequest): Promise<string> {
    if (process.env.MOCK_LLM === 'true') {
      console.log(`[LLMService] MOCK MODE: returning stubbed response...`);
      const combinedPrompt = (request.systemPrompt || '') + ' ' + (request.userPrompt || '');
      return this.getMockResponse(combinedPrompt);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    
    const body: Record<string, unknown> = {
      contents: [{ role: 'user', parts: [{ text: request.userPrompt }] }],
      generationConfig: {
        temperature: request.temperature ?? 0.2,
      },
    };

    if (request.systemPrompt) {
      (body as Record<string, unknown>).systemInstruction = {
        parts: [{ text: request.systemPrompt }]
      };
    }

    if (request.responseFormat === 'json_object') {
      (body.generationConfig as Record<string, unknown>).responseMimeType = 'application/json';
    }

    let retries = 3;
    let delayMs = 2000;

    while (retries >= 0) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const isTemporary = response.status === 503 || response.status === 429;
        
        if (isTemporary && retries > 0) {
          console.warn(`[LLMService] Gemini API overloaded (${response.status}). Retrying in ${delayMs}ms... (${retries} attempts left)`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          retries--;
          delayMs *= 2; // Exponential backoff
          continue;
        }
        
        throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }
    
    throw new Error('LLMService failed after max retries.');
  }

  /**
   * Als `generate()`, maar retryt bij ongeldige JSON in de respons door de call opnieuw te
   * doen (regenereren, niet herparsen — de tekst zelf is kapot, dat repareert zichzelf niet).
   * Ontdekt 2026-09-02: een live paid-tier-run gaf één keer niet-strikt-geldige JSON terug
   * (`SyntaxError` op `JSON.parse`), een tweede poging op hetzelfde onderwerp slaagde meteen —
   * dus incidenteel LLM-output-ruis, geen structurele fout. Vóór deze fix deed elke agent
   * (Research/FactChecker/TechReviewer/SeoGeo/QualityGate/MarketingGate) een kale `JSON.parse`
   * zonder vangnet; dit is nu de ene gedeelde plek voor die robuustheid i.p.v. duplicate logic
   * in elke agent. `responseFormat` wordt altijd op `'json_object'` gezet, ongeacht wat de
   * caller meegeeft.
   */
  async generateJSON(request: Omit<LLMRequest, 'responseFormat'>, maxAttempts = 2): Promise<unknown> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const text = await this.generate({ ...request, responseFormat: 'json_object' });
      try {
        return JSON.parse(text);
      } catch (err) {
        lastError = err;
        const willRetry = attempt < maxAttempts;
        console.warn(
          `[LLMService] Ongeldige JSON in respons (poging ${attempt}/${maxAttempts}): ${(err as Error).message}.` +
          (willRetry ? ' Opnieuw genereren...' : ' Geen pogingen meer over.')
        );
      }
    }
    throw new Error(`[LLMService] Kon geen geldige JSON krijgen na ${maxAttempts} pogingen: ${(lastError as Error)?.message}`);
  }

  private getMockResponse(prompt: string): string {
    if (prompt.includes('Research Agent')) {
      return JSON.stringify({ 
        topic: "mock onderwerp",
        facts: [{ 
          claim: "Mock fact", 
          source: "NEN1010", 
          exactQuote: "Mock quote",
          confidence: 95
        }] 
      });
    }
    if (prompt.includes('Jouw taak is om een SEO-geoptimaliseerd')) {
      // Writer Agent returns raw markdown
      return "# Mock Artikel\n\nDit is een test artikel met *fake* content.";
    }
    if (prompt.includes('Fact Checker') || prompt.includes('Fact-Checker') || prompt.includes('Fact-Check')) {
      return JSON.stringify([]);
    }
    if (prompt.includes('Senior Elektrotechnisch Inspecteur')) {
      return JSON.stringify([]);
    }
    if (prompt.includes('SEO en GEO Optimizer')) {
      return JSON.stringify({
        // Geen eigen `# Titel`-H1 in content — die rendert BlogPostLayout al vanuit `title`
        // (zie prompts/seo.md, "Wat pas je wél aan?"). Een tweede H1 hier faalt qc:seo net zo
        // hard als bij een echte LLM-respons met dezelfde fout.
        content: "Dit is een test artikel met *fake* content.",
        slug: "mock-artikel-test",
        title: "Mock Artikel Test",
        seoTitle: "Mock Artikel Test | EnerCalculatie",
        description: "Dit is een mock description.",
        excerpt: "Mock excerpt voor de overview page.",
        tags: ["mock", "test"],
        keyPoints: ["point 1", "point 2"],
        category: "Kennisbank",
        faq: []
      });
    }
    if (prompt.includes('de eindredacteur en Quality Gate')) {
      return JSON.stringify({ passed: true, confidence: 100, issues: [] });
    }
    if (prompt.includes('SEO/GEO Strateeg')) {
      return JSON.stringify({
        searchIntent: "Mock zoekintentie",
        primaryQuestion: "Mock primaire vraag?",
        secondaryQuestions: ["Mock secundaire vraag?"],
        audienceContext: "Mock context",
        requiredInformation: ["Mock benodigde info"]
      });
    }
    if (prompt.includes('SEO/GEO Auditor')) {
      const s = 8;
      return JSON.stringify({
        passed: true,
        scores: {
          searchIntentCoverage: s, primaryQuestionAnswered: s, secondaryQuestionsCovered: s,
          earlyValueDelivery: s, headingStructure: s, semanticTopicCoverage: s,
          entitiesAndDefinitions: s, featuredSnippetPotential: s, geoReadability: s,
          faqCoverage: s, internalLinks: s, titleAndMeta: s, intentConsistency: s
        },
        blockingIssues: [],
        feedback: "Mock: SEO/GEO in orde."
      });
    }
    if (prompt.includes('Marketing/Contentkwaliteit-beoordelaar')) {
      return JSON.stringify({
        passed: true,
        scores: {
          practicalUsefulness: 8, b2bRelevance: 7, visualImpact: 6,
          scanability: 7, conversionPotential: 6, socialRepurposability: 6
        },
        visualOpportunity: false,
        feedback: "Mock: marketingkwaliteit in orde."
      });
    }

    // Default fallback
    return JSON.stringify({});
  }
}
