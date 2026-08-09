// Regressietests voor sanitizeJsonString. Doel: rauwe modeloutput (Llama e.a.)
// die geen geldige JSON is, moet na sanitizen parseerbaar worden.
import { describe, it, expect } from 'vitest';
import { sanitizeJsonString, extractCompleteJsonObjects } from './json-sanitizer.mjs';

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

// Regressietests voor het exacte scenario uit de plan-content.mjs-storing:
// Gemini kapt het antwoord af op maxOutputTokens vóórdat de array sluit.
describe('extractCompleteJsonObjects', () => {
  it('parset een complete array gewoon door (geen afkap-scenario)', () => {
    const src = '[{"title":"a","priority":1},{"title":"b","priority":2}]';
    expect(extractCompleteJsonObjects(src)).toEqual([
      { title: 'a', priority: 1 },
      { title: 'b', priority: 2 },
    ]);
  });

  it('redt complete objecten uit een array die midden in het tweede object afbreekt', () => {
    // Exact het patroon uit de gerapporteerde CI-storing: object 1 compleet,
    // object 2 breekt af zonder sluit-quote/brace/`]`.
    const src = '[\n  {\n    "title": "Volledig item",\n    "keyword": "x",\n    "intent": "informatief",\n    "priority": 9\n  },\n  {\n    "title": "AC-gekoppelde vs. DC-gekoppelde thuisbatterij: hoe onderbouwt u de keuze in uw offerte?",\n    ';
    const result = extractCompleteJsonObjects(src);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Volledig item');
  });

  it('gooit als geen enkel object compleet is', () => {
    const src = '[\n  {\n    "title": "half af';
    expect(() => extractCompleteJsonObjects(src)).toThrow();
  });

  it('gooit als er geen `[` in de tekst staat', () => {
    expect(() => extractCompleteJsonObjects('geen json hier')).toThrow();
  });

  it('negeert een accolade binnen een stringwaarde (telt niet mee voor de diepte)', () => {
    const src = '[{"title":"bevat { en } in tekst","priority":5}]';
    expect(extractCompleteJsonObjects(src)).toEqual([{ title: 'bevat { en } in tekst', priority: 5 }]);
  });
});
