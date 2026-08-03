import { describe, it, expect, vi } from 'vitest';
import { fetchSourceText, fetchSourcesForClaims } from './source-validator.mjs';

describe('fetchSourceText', () => {
  it('geeft platte tekst terug bij succes', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '<html><head><script>x</script></head><body><p>Saldering stopt in 2027.</p></body></html>',
    });
    const result = await fetchSourceText('https://rvo.nl/x', { fetchImpl });
    expect(result.ok).toBe(true);
    expect(result.text).toContain('Saldering stopt in 2027.');
    expect(result.text).not.toContain('script');
  });

  it('geeft ok:false bij een non-2xx response', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    const result = await fetchSourceText('https://rvo.nl/x', { fetchImpl });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(404);
  });

  it('geeft ok:false bij een netwerkfout', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('network down'));
    const result = await fetchSourceText('https://rvo.nl/x', { fetchImpl });
    expect(result.ok).toBe(false);
    expect(result.error).toContain('network down');
  });
});

describe('fetchSourcesForClaims', () => {
  it('fetcht elke unieke bron maar één keer', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200, text: async () => '<p>tekst</p>' });
    const claims = [
      { sourceKey: 'a', source: { url: 'https://rvo.nl/a' } },
      { sourceKey: 'a', source: { url: 'https://rvo.nl/a' } },
      { sourceKey: 'b', source: { url: 'https://rvo.nl/b' } },
      { sourceKey: null, source: null },
    ];
    const result = await fetchSourcesForClaims(claims, { fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(result.get('a').ok).toBe(true);
    expect(result.get('b').ok).toBe(true);
  });
});
