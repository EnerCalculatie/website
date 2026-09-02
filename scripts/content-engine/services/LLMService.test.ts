// Regressietests voor LLMService — de gedeelde Gemini-client van alle 6
// content-engine-agents. Had 0% dekking, inclusief de retry/backoff-logica die
// bepaalt of de pipeline een tijdelijke 429/503 overleeft of meteen faalt.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// gemini-config.mjs (geimporteerd door LLMService.ts) doet process.exit(1) op
// module-load als er geen API-key in de env staat — moet dus al gezet zijn
// vóórdat de (hoisted) import hieronder draait.
vi.hoisted(() => {
  process.env.GEMINI_API_KEY = 'test-key';
});
import { LLMService } from './LLMService';

const fetchMock = vi.fn();

function jsonResponse(body: unknown, ok = true, status = 200) {
  return { ok, status, json: () => Promise.resolve(body), text: () => Promise.resolve(JSON.stringify(body)) };
}

describe('LLMService.generate', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    delete process.env.MOCK_LLM;
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('geeft de tekst uit candidates[0].content.parts[0].text terug', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ candidates: [{ content: { parts: [{ text: 'antwoord' }] } }] })
    );
    const service = new LLMService();
    const result = await service.generate({ userPrompt: 'vraag' });
    expect(result).toBe('antwoord');
  });

  it('geeft lege string terug als de response geen candidates bevat', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ candidates: [] }));
    const service = new LLMService();
    const result = await service.generate({ userPrompt: 'vraag' });
    expect(result).toBe('');
  });

  it('zet responseMimeType alleen bij responseFormat json_object', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ candidates: [{ content: { parts: [{ text: '{}' }] } }] }));
    const service = new LLMService();
    await service.generate({ userPrompt: 'vraag', responseFormat: 'json_object' });
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody.generationConfig.responseMimeType).toBe('application/json');
  });

  it('voegt systemInstruction alleen toe als systemPrompt is meegegeven', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ candidates: [{ content: { parts: [{ text: '{}' }] } }] }));
    const service = new LLMService();
    await service.generate({ userPrompt: 'vraag' });
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody.systemInstruction).toBeUndefined();
  });

  it('retryt bij een 503 en slaagt daarna alsnog', async () => {
    vi.useFakeTimers();
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ error: 'overloaded' }, false, 503))
      .mockResolvedValueOnce(jsonResponse({ candidates: [{ content: { parts: [{ text: 'ok na retry' }] } }] }));
    const service = new LLMService();
    const promise = service.generate({ userPrompt: 'vraag' });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toBe('ok na retry');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('retryt bij een 429', async () => {
    vi.useFakeTimers();
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ error: 'rate limited' }, false, 429))
      .mockResolvedValueOnce(jsonResponse({ candidates: [{ content: { parts: [{ text: 'ok' }] } }] }));
    const service = new LLMService();
    const promise = service.generate({ userPrompt: 'vraag' });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toBe('ok');
    vi.useRealTimers();
  });

  it('gooit direct bij een niet-tijdelijke fout (bv. 400), zonder te retryen', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ error: 'bad request' }, false, 400));
    const service = new LLMService();
    await expect(service.generate({ userPrompt: 'vraag' })).rejects.toThrow(/Gemini API Error \(400\)/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('gooit na uitputting van alle retries bij aanhoudende 503', async () => {
    vi.useFakeTimers();
    fetchMock.mockResolvedValue(jsonResponse({ error: 'overloaded' }, false, 503));
    const service = new LLMService();
    const promise = service.generate({ userPrompt: 'vraag' });
    // Rejection-handler meteen vastzetten, vóór de timers verlopen — anders is
    // er een moment waarop de promise "unhandled" rejecteert.
    const assertion = expect(promise).rejects.toThrow(/Gemini API Error \(503\)/);
    await vi.runAllTimersAsync();
    await assertion;
    // 1 initiële poging + 3 retries = 4 calls.
    expect(fetchMock).toHaveBeenCalledTimes(4);
    vi.useRealTimers();
  });

  it('MOCK_LLM=true roept fetch niet aan en geeft een stub-response passend bij de prompt', async () => {
    process.env.MOCK_LLM = 'true';
    const service = new LLMService();
    // Bewust de exacte trefzin uit prompts/quality-gate.md, niet de losse woorden "Quality Gate" —
    // die matchten per ongeluk ook prompts/seo-audit.md (die zelf naar "de ... Quality Gate"
    // verwijst in zijn eigen tekst), zie de mock-branch-volgorde-bugfix in LLMService.ts.
    const result = await service.generate({ userPrompt: 'iets over de eindredacteur en Quality Gate' });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(JSON.parse(result)).toMatchObject({ passed: true });
  });

  it('MOCK_LLM=true: SEO/GEO-audit-prompt (die zelf naar "Quality Gate" verwijst) matcht niet per ongeluk de Quality Gate-stub', async () => {
    process.env.MOCK_LLM = 'true';
    const service = new LLMService();
    const result = await service.generate({
      userPrompt: 'Je bent de SEO/GEO Auditor. ... heeft geen effect op de aparte, onafhankelijke Quality Gate.',
    });
    const parsed = JSON.parse(result);
    expect(parsed).toHaveProperty('scores');
    expect(parsed).not.toHaveProperty('confidence'); // confidence is uniek voor de Quality Gate-stub
  });
});

describe('LLMService.generateJSON', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    delete process.env.MOCK_LLM;
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('geeft het geparste object terug bij geldige JSON', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ candidates: [{ content: { parts: [{ text: '{"foo":"bar"}' }] } }] }));
    const service = new LLMService();
    const result = await service.generateJSON({ userPrompt: 'vraag' });
    expect(result).toEqual({ foo: 'bar' });
  });

  it('forceert responseFormat json_object, ongeacht wat de caller meegeeft', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ candidates: [{ content: { parts: [{ text: '{}' }] } }] }));
    const service = new LLMService();
    await service.generateJSON({ userPrompt: 'vraag' });
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody.generationConfig.responseMimeType).toBe('application/json');
  });

  it('regenereert bij ongeldige JSON en slaagt als de tweede poging wel geldig is', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ candidates: [{ content: { parts: [{ text: '{niet geldige json' }] } }] }))
      .mockResolvedValueOnce(jsonResponse({ candidates: [{ content: { parts: [{ text: '{"foo":"ok na retry"}' }] } }] }));
    const service = new LLMService();
    const result = await service.generateJSON({ userPrompt: 'vraag' });
    expect(result).toEqual({ foo: 'ok na retry' });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('gooit een duidelijke fout na uitputting van alle pogingen bij aanhoudend ongeldige JSON', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ candidates: [{ content: { parts: [{ text: 'geen json' }] } }] }));
    const service = new LLMService();
    await expect(service.generateJSON({ userPrompt: 'vraag' })).rejects.toThrow(/Kon geen geldige JSON krijgen na 2 pogingen/);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('respecteert een aangepast maxAttempts', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ candidates: [{ content: { parts: [{ text: 'geen json' }] } }] }));
    const service = new LLMService();
    await expect(service.generateJSON({ userPrompt: 'vraag' }, 3)).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
