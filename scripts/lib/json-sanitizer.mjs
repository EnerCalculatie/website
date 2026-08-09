// Sommige modellen (bv. Llama) leveren geen geldige JSON in stringwaarden:
// rauwe newlines/tabs i.p.v. \n/\t, en ongeldige escapes zoals \' (geldig in
// JS, niet in JSON). Repareert beide vóór het parsen. Gedeeld door
// generate-blog-post.mjs en plan-content.mjs.
//
// extractCompleteJsonObjects() lost een ander probleem op: een JSON-array die
// halverwege is afgekapt door maxOutputTokens (finishReason MAX_TOKENS) heeft
// geen sluit-`]` meer, dus JSON.parse() op de hele array faalt altijd — ook al
// bevat de tekst prima bruikbare, complete objecten vóór het afkappunt. Wordt
// gebruikt door plan-content.mjs als terugvalpad zodra de normale parse faalt.
const VALID_JSON_ESCAPES = new Set(['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u']);

export function sanitizeJsonString(text) {
  let result = '';
  let inString = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (!inString) {
      result += ch;
      if (ch === '"') inString = true;
      continue;
    }
    if (ch === '"') {
      result += ch;
      inString = false;
      continue;
    }
    if (ch.charCodeAt(0) < 0x20) {
      if (ch === '\n') result += '\\n';
      else if (ch === '\r') result += '\\r';
      else if (ch === '\t') result += '\\t';
      else result += `\\u${ch.charCodeAt(0).toString(16).padStart(4, '0')}`;
      continue;
    }
    if (ch === '\\') {
      const next = text[i + 1];
      if (VALID_JSON_ESCAPES.has(next)) {
        result += ch + next;
        i++;
      } else {
        result += '\\\\';
      }
      continue;
    }
    result += ch;
  }
  return result;
}

/**
 * Haalt zoveel mogelijk complete top-level `{...}`-objecten uit een string die
 * begint bij een `[` maar niet noodzakelijk sluit met een `]` (afgekapt
 * model-antwoord). Onvolledige laatste objecten (nog open brace/string op het
 * moment dat de tekst ophoudt) worden genegeerd, niet als kapot object
 * teruggegeven — beter een kleinere batch dan een parse-fout op de hele run.
 * Geeft de al-geparste objecten terug (niet de raw substrings), en gooit
 * alleen als er nul complete objecten gevonden zijn.
 */
export function extractCompleteJsonObjects(text) {
  const start = text.indexOf('[');
  if (start === -1) throw new Error('Geen `[` gevonden om een JSON-array te beginnen.');

  const objects = [];
  let depth = 0;
  let objectStart = -1;
  let inString = false;
  let escaped = false;

  for (let i = start + 1; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') {
      if (depth === 0) objectStart = i;
      depth++;
      continue;
    }
    if (ch === '}') {
      depth--;
      if (depth === 0 && objectStart !== -1) {
        const raw = text.slice(objectStart, i + 1);
        try {
          objects.push(JSON.parse(sanitizeJsonString(raw)));
        } catch {
          // Corrupt individueel object (bv. door een halfgeschreven escape
          // vlak vóór het afkappunt) — overslaan, niet de hele batch verliezen.
        }
        objectStart = -1;
      }
      continue;
    }
  }

  if (objects.length === 0) {
    throw new Error('Geen enkel compleet JSON-object gevonden in de (afgekapte) array.');
  }
  return objects;
}
