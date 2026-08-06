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
        content: "# Mock Artikel\n\nDit is een test artikel met *fake* content.",
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
    if (prompt.includes('Quality Gate')) {
      return JSON.stringify({ passed: true, confidence: 100, issues: [] });
    }
    
    // Default fallback
    return JSON.stringify({});
  }
}
