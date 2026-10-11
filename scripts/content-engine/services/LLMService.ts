import 'dotenv/config';
import { geminiGenerate } from '../../lib/gemini-client.mjs';

export interface LLMRequest {
  systemPrompt?: string;
  userPrompt: string;
  temperature?: number;
  responseFormat?: 'json_object' | 'text';
  /** Gemini-grounding met Google Search aan — zie generateGrounded(). */
  googleSearch?: boolean;
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface GroundedResponse {
  text: string;
  sources: GroundingSource[];
  /** Zoekopdrachten die Gemini uitvoerde — leeg betekent: het model heeft niet gezocht. */
  searchQueries: string[];
}

/**
 * Grounding-chunks verwijzen naar een vertexaisearch-redirect, niet naar het artikel zelf.
 * Volg de redirect één keer voor de echte URL (die hoort in research.json en de bronnenlijst).
 * Lukt dat niet, dan blijft de redirect-URL staan — beter een omweg dan geen bron.
 */
export async function resolveGroundingUrl(uri: string): Promise<string> {
  if (!uri.includes('grounding-api-redirect')) return uri;
  try {
    const res = await fetch(uri, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(10000) });
    return res.headers?.get('location') || uri;
  } catch {
    return uri;
  }
}

export class LLMService {
  async generate(request: LLMRequest): Promise<string> {
    if (process.env.MOCK_LLM === 'true') {
      console.log(`[LLMService] MOCK MODE: returning stubbed response...`);
      const combinedPrompt = (request.systemPrompt || '') + ' ' + (request.userPrompt || '');
      return this.getMockResponse(combinedPrompt);
    }

    // Retry/backoff en modelfallback zitten in de gedeelde client — zie gemini-client.mjs
    // voor de aanleiding (free-tier-503's die de hele pipeline lieten falen).
    const { data } = await geminiGenerate(this.buildBody(request));
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  private buildBody(request: LLMRequest): Record<string, unknown> {
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

    if (request.googleSearch) {
      body.tools = [{ google_search: {} }];
    }

    // JSON-modus niet combineren met grounding: niet elk Gemini-model ondersteunt die combinatie,
    // en een JSON-eis onderdrukt het zoeken (zie generateGroundedJSON).
    if (request.responseFormat === 'json_object' && !request.googleSearch) {
      (body.generationConfig as Record<string, unknown>).responseMimeType = 'application/json';
    }

    return body;
  }

  /**
   * Zoals generate(), maar met Google Search-grounding: het model zoekt live op het web i.p.v.
   * uit zijn trainingsgeheugen te antwoorden. Nodig voor nieuwsartikelen. Geeft ook de bronnen
   * terug die Gemini daadwerkelijk raadpleegde (groundingMetadata.groundingChunks).
   */
  async generateGrounded(request: Omit<LLMRequest, 'googleSearch' | 'responseFormat'>, maxAttempts = 3): Promise<GroundedResponse> {
    if (process.env.MOCK_LLM === 'true') {
      const text = await this.generate(request);
      return { text, sources: [{ title: 'rvo.nl', url: 'https://www.rvo.nl/mock-nieuws' }], searchQueries: ['mock'] };
    }

    // Gemini mag zelf beslissen of het zoekt, en antwoordt soms toch uit zijn geheugen (testrun
    // 2026-10-11: 0 zoekopdrachten, verzonnen nieuws met een 404-URL). Dan opnieuw, met nadruk.
    let result: GroundedResponse | undefined;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const userPrompt = attempt === 1
        ? request.userPrompt
        : `${request.userPrompt}\n\nLET OP: je vorige antwoord gebruikte Google Search niet. Voer eerst zoekopdrachten uit en baseer je antwoord uitsluitend op de zoekresultaten.`;
      result = await this.groundedCall({ ...request, userPrompt });
      if (result.searchQueries.length > 0) return result;
      console.warn(`[LLMService] Model gebruikte Google Search niet (poging ${attempt}/${maxAttempts}).`);
    }
    return result as GroundedResponse;
  }

  /**
   * Zoeken én gestructureerde output, in twee stappen. Gemini slaat Google Search grotendeels over
   * zodra de prompt "antwoord alleen in JSON" eist (meting 2026-10-11: 1 van 6 keer gezocht, zonder
   * JSON-eis 6 van 6). Daarom: stap 1 zoekt en antwoordt in vrije tekst, stap 2 (zonder grounding,
   * wél JSON-modus) zet die tekst om. `search.systemPrompt` mag dus géén JSON-uitvoer vragen.
   */
  async generateGroundedJSON(
    search: Omit<LLMRequest, 'googleSearch' | 'responseFormat'>,
    formatPrompt: string
  ): Promise<GroundedResponse & { json: unknown }> {
    const grounded = await this.generateGrounded(search);
    if (process.env.MOCK_LLM === 'true') return { ...grounded, json: JSON.parse(grounded.text) };

    const json = await this.generateJSON({
      systemPrompt: `Je zet een tekst om naar JSON. Neem uitsluitend informatie over die letterlijk in de tekst staat — verzin niets, vul niets aan. Ontbreekt een veld, laat het weg.\n\n${formatPrompt}`,
      userPrompt: grounded.text,
      temperature: 0,
    });
    return { ...grounded, json };
  }

  private async groundedCall(request: Omit<LLMRequest, 'googleSearch' | 'responseFormat'>): Promise<GroundedResponse> {
    const { data, model } = await geminiGenerate(this.buildBody({ ...request, googleSearch: true }));
    const candidate = data.candidates?.[0];
    if (!candidate?.groundingMetadata?.webSearchQueries?.length) {
      // Diagnose: waarom zocht het model niet? Toont model, finishReason en wat er wél aan metadata terugkwam.
      console.warn(`[LLMService] Geen zoekopdrachten — model ${model}, finishReason ${candidate?.finishReason}, groundingMetadata: ${JSON.stringify(candidate?.groundingMetadata ?? null).slice(0, 300)}, usage: ${JSON.stringify(data.usageMetadata ?? null).slice(0, 300)}`);
    }
    // Bij grounding kan het antwoord over meerdere parts verdeeld zijn.
    const text = (candidate?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? '').join('');

    const sources: GroundingSource[] = [];
    const seen = new Set<string>();
    const chunks: Array<{ web?: { uri?: string; title?: string } }> = candidate?.groundingMetadata?.groundingChunks ?? [];
    for (const chunk of chunks) {
      if (!chunk.web?.uri) continue;
      const url = await resolveGroundingUrl(chunk.web.uri);
      if (seen.has(url)) continue;
      seen.add(url);
      sources.push({ title: chunk.web.title ?? url, url });
    }
    return { text, sources, searchQueries: candidate?.groundingMetadata?.webSearchQueries ?? [] };
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
    if (prompt.includes('News Scout')) {
      return JSON.stringify({
        found: true,
        category: 'Thuisbatterijen',
        headline: 'Mock nieuws over thuisbatterijen',
        summary: 'Mock samenvatting.',
        publishedDate: new Date().toISOString().slice(0, 10),
        whyItMatters: 'Mock relevantie.',
      });
    }
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
