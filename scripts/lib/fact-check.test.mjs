import { describe, it, expect, vi } from 'vitest';
import { factCheckClaims, allClaimsSupported } from './fact-check.mjs';

const source = { title: 'ISDE', url: 'https://rvo.nl/isde' };

describe('factCheckClaims', () => {
  it('markeert claims zonder bereikbare bron direct als NO_SOURCE, zonder Gemini-call', async () => {
    const callGemini = vi.fn();
    const claims = [{ id: 'claim-001', text: 'x', sourceKey: null, source: null }];
    const { results, factScore } = await factCheckClaims(claims, new Map(), { callGemini, extractJson: vi.fn() });
    expect(callGemini).not.toHaveBeenCalled();
    expect(results[0].status).toBe('NO_SOURCE');
    expect(factScore).toBe(0);
  });

  it('markeert claims met een onbereikbare bron als NO_SOURCE', async () => {
    const claims = [{ id: 'claim-001', text: 'x', sourceKey: 'k', source }];
    const sourceTexts = new Map([['k', { ok: false, text: '', error: 'HTTP 404' }]]);
    const { results } = await factCheckClaims(claims, sourceTexts, { callGemini: vi.fn(), extractJson: vi.fn() });
    expect(results[0].status).toBe('NO_SOURCE');
  });

  it('vraagt Gemini om een oordeel voor claims met bereikbare bron', async () => {
    const claims = [{ id: 'claim-001', text: 'Saldering stopt in 2027.', sourceKey: 'k', source }];
    const sourceTexts = new Map([['k', { ok: true, text: 'De salderingsregeling stopt per 1 januari 2027.' }]]);
    const callGemini = vi.fn().mockResolvedValue('raw');
    const extractJson = vi.fn().mockReturnValue({
      results: [{ id: 'claim-001', status: 'SUPPORTED', reasoning: 'Bron bevestigt dit expliciet.' }],
    });
    const { results, factScore } = await factCheckClaims(claims, sourceTexts, { callGemini, extractJson });
    expect(callGemini).toHaveBeenCalledTimes(1);
    expect(results[0].status).toBe('SUPPORTED');
    expect(factScore).toBe(100);
  });

  it('valt terug op NO_SOURCE als het model geen geldige status teruggeeft', async () => {
    const claims = [{ id: 'claim-001', text: 'x', sourceKey: 'k', source }];
    const sourceTexts = new Map([['k', { ok: true, text: 'iets' }]]);
    const callGemini = vi.fn().mockResolvedValue('raw');
    const extractJson = vi.fn().mockReturnValue({ results: [{ id: 'claim-001', status: 'ONZIN' }] });
    const { results } = await factCheckClaims(claims, sourceTexts, { callGemini, extractJson });
    expect(results[0].status).toBe('NO_SOURCE');
  });
});

describe('allClaimsSupported', () => {
  it('true bij lege lijst', () => {
    expect(allClaimsSupported([])).toBe(true);
  });
  it('true als alles SUPPORTED is', () => {
    expect(allClaimsSupported([{ status: 'SUPPORTED' }, { status: 'SUPPORTED' }])).toBe(true);
  });
  it('false zodra één claim niet SUPPORTED is', () => {
    expect(allClaimsSupported([{ status: 'SUPPORTED' }, { status: 'PARTIALLY_SUPPORTED' }])).toBe(false);
  });
});
