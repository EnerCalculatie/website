// Sommige modellen (bv. Llama) leveren geen geldige JSON in stringwaarden:
// rauwe newlines/tabs i.p.v. \n/\t, en ongeldige escapes zoals \' (geldig in
// JS, niet in JSON). Repareert beide vóór het parsen. Gedeeld door
// generate-blog-post.mjs en plan-content.mjs.
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
