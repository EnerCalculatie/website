/**
 * Blokkeert bekende AI-tells in gegenereerde blogcontent — dezelfde verboden-
 * woordenlijst als de `/anti-ai-writing`-skill (vault: .claude/skills/anti-ai-writing),
 * hier toegepast als deterministische, blokkerende check in plaats van een
 * handmatige schrijffilter. De SEO/GEO-validator (seo-geo-validator.mjs) draait
 * op hetzelfde model dat het artikel schreef en herkent zijn eigen tics niet —
 * vandaar regex in plaats van nog een LLM-oordeel.
 */

const BANNED_PHRASES = [
  /in de wereld van/i,
  /in het huidige landschap/i,
  /in dit digitale tijdperk/i,
  /het is belangrijk om te vermelden dat/i,
  /het is de moeite waard om/i,
  /duik(en)? (er)?in/i,
  /laten we duiken in/i,
  /naadloos/i,
  /moeiteloos/i,
  /ontketen(t)?/i,
  /ontgrendel(t)?/i,
  /til\s.+\snaar een hoger niveau/i,
  /game-changer/i,
  /revolutionair/i,
  /baanbrekend/i,
  /of je nu .+ of .+, (wij|we) hebben je gedekt/i,
  /wij begrijpen dat/i,
  /wij zijn er trots op/i,
  /in een notendop/i,
  /de kers op de taart/i,
];

// Verplichte, generieke outro — precies het probleem uit "goede afsluiters":
// een alinea die begint met een samenvattend woord herhaalt de inleiding i.p.v.
// af te sluiten met een concreet advies, vraag of vervolgstap. Matcht na een
// zinseinde (. ! ?) of aan het absolute begin — HTML-tags zijn op dat punt al
// naar spaties platgeslagen, dus er is geen newline meer om op te matchen.
const FORCED_OUTRO = /(?:^|[.!?]\s+)(?:kortom|al met al|samenvattend|tot slot)\b,?/i;

/**
 * @param {string} text (HTML/JSX toegestaan, wordt gestript)
 * @returns {string[]} lege array = akkoord
 */
export function checkAiLanguage(text) {
  const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const errors = [];

  for (const pattern of BANNED_PHRASES) {
    const match = plain.match(pattern);
    if (match) {
      errors.push(`AI-tell "${match[0]}" — herschrijf deze zin, dit klinkt als een taalmodel, niet als een vakexpert.`);
    }
  }

  if (FORCED_OUTRO.test(plain)) {
    const match = plain.match(FORCED_OUTRO);
    errors.push(`geforceerde samenvattende afsluiter ("${match[0].trim()}") — sluit af met een concreet advies, een vraag, of een volgende stap, niet met een samenvatting van wat al gezegd is.`);
  }

  // Drie of meer em-dashes per ~150 woorden is een stijltic, niet incidenteel gebruik.
  // Ondergrens van 4 voorkomt dat een enkel legitiem gedachtestreepje in een kort
  // stuk tekst al als "overmatig" wordt gelezen.
  const wordCount = plain.split(/\s+/).filter(Boolean).length;
  const dashCount = (plain.match(/—/g) ?? []).length;
  if (dashCount >= 4 && wordCount > 0 && dashCount / wordCount > 3 / 150) {
    errors.push(`${dashCount} gedachtestreepjes (—) op ${wordCount} woorden — overmatig gebruik, herschrijf een deel als gewone zinnen met een punt.`);
  }

  return errors;
}
