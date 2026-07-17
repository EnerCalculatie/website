// Regressietests voor sanitizeJsonString. Doel: rauwe modeloutput (Llama e.a.)
// die geen geldige JSON is, moet na sanitizen parseerbaar worden.
import { describe, it, expect } from 'vitest';
import { sanitizeJsonString } from './json-sanitizer.mjs';

describe('sanitizeJsonString', () => {
  it('laat geldige JSON ongewijzigd parsebaar', () => {
    const src = '{"a":"b","c":1}';
    expect(JSON.parse(sanitizeJsonString(src))).toEqual({ a: 'b', c: 1 });
  });

  it('escapet een rauwe newline in een stringwaarde', () => {
    const src = '{"body":"regel1\nregel2"}';
    expect(JSON.parse(sanitizeJsonString(src)).body).toBe('regel1\nregel2');
  });

  it('escapet een rauwe tab in een stringwaarde', () => {
    const src = '{"body":"kolom1\tkolom2"}';
    expect(JSON.parse(sanitizeJsonString(src)).body).toBe('kolom1\tkolom2');
  });

  it("maakt een ongeldige \\' escape parseerbaar (backslash blijft, wordt downstream gestript)", () => {
    // \' is geldig in JS maar niet in JSON. De sanitizer moet de string vooral
    // weer PARSEERBAAR maken; de resterende backslash haalt generate-blog-post
    // later uit de componentBody (commit a2b5ee6).
    const src = "{\"body\":\"auto\\'s laden\"}";
    expect(() => JSON.parse(sanitizeJsonString(src))).not.toThrow();
    expect(JSON.parse(sanitizeJsonString(src)).body).toBe("auto\\'s laden");
  });

  it('behoudt geldige escapes zoals \\" en \\n', () => {
    const src = '{"body":"hij zei \\"hoi\\"\\nklaar"}';
    expect(JSON.parse(sanitizeJsonString(src)).body).toBe('hij zei "hoi"\nklaar');
  });

  it('raakt speciale tekens buiten strings niet aan', () => {
    const src = '{\n  "a": "x"\n}';
    expect(JSON.parse(sanitizeJsonString(src))).toEqual({ a: 'x' });
  });
});
