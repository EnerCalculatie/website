import { sanitizeJsonString } from '../../lib/json-sanitizer.mjs';

/**
 * Haalt een JSON-object uit vrije modeltekst. Nodig bij grounded calls
 * (Google Search): daar staat JSON-modus uit, dus het model kan het object in
 * een ```json-blok of tussen losse tekst zetten.
 */
export function extractJson(raw: string): unknown {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced?.[1] ?? raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
  if (!candidate.trim()) {
    throw new Error(`Geen JSON gevonden in modelantwoord: ${raw.slice(0, 200)}`);
  }
  return JSON.parse(sanitizeJsonString(candidate));
}
