import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

// Trefwoorden per kennisbestand, tegen het onderwerp gematcht om alleen relevante
// bestanden mee te geven — voorkomt dat bv. warmtepomp-vermogens in een
// airco-artikel terechtkomen (zie 2026-09-04, workflow-run 33822495555: een
// SEER/SCOP-airco-artikel werd geblokkeerd omdat de Writer ongerelateerde
// warmtepomp-/Netcode-feiten uit de altijd-gecombineerde context oppikte).
// NEN1010.md staat niet in deze lijst — die bevat generieke elektrische-
// installatieregels (fase/ampere/zekering) die voor bijna elk EnerCalculatie-
// onderwerp kunnen gelden, dus die blijft altijd meegaan.
const TOPIC_KEYWORDS: Record<string, string[]> = {
  'airco.md': ['airco', 'seer', 'scop', ' eer', ' cop', 'koeling', 'koelvermogen', 'airconditioning'],
  'warmtepompen.md': ['warmtepomp'],
  'zonnepanelen.md': ['zonnepaneel', 'zonnepanelen', ' pv ', 'omvormer', 'salder', 'zonne-energie'],
  'laadpalen.md': ['laadpaal', 'laadpalen', 'laadstroom', 'laden', 'elektrische auto', 'ev-'],
  'thuisbatterijen.md': ['batterij', 'thuisbatterij', 'accu'],
  'EMS.md': ['ems', 'energiemanagementsysteem', 'sturing', 'dynamisch energiecontract'],
  'netbeheer.md': ['netbeheer', 'netcongestie', 'capaciteitstarief', 'wachtlijst'],
};
const ALWAYS_INCLUDE = ['NEN1010.md'];

/** Puur — geen I/O, apart testbaar. Kiest welke kennisbestanden relevant zijn
 * voor het onderwerp. Zonder `topic`, of als geen enkel bestand een
 * trefwoordmatch heeft (nieuw onderwerp zonder eigen kennisbestand), vallen we
 * terug op alle bestanden — geen context is erger dan te brede context. */
export function selectRelevantKnowledgeFiles(files: string[], topic?: string): string[] {
  if (!topic) return files;

  const topicLower = ` ${topic.toLowerCase()} `;
  const matched = files.filter((file) => {
    if (ALWAYS_INCLUDE.includes(file)) return true;
    const keywords = TOPIC_KEYWORDS[file];
    if (!keywords) return true; // onbekend bestand (nog geen keyword-mapping) — voor de zekerheid meenemen
    return keywords.some((kw) => topicLower.includes(kw.toLowerCase()));
  });

  // Geen enkele topic-specifieke match (alleen ALWAYS_INCLUDE zou overblijven
  // of zelfs dat niet) — val terug op alles i.p.v. de Writer met te weinig
  // context achter te laten.
  const hasTopicMatch = matched.some((f) => !ALWAYS_INCLUDE.includes(f));
  return hasTopicMatch ? matched : files;
}

export class KnowledgeBase {
  private knowledgeDir: string;

  constructor() {
    this.knowledgeDir = path.join(import.meta.dirname, '../knowledge');
  }

  /**
   * Leest de relevante statische Markdown-bestanden in de knowledge map en
   * combineert ze tot één context string voor de WriterAgent/FactCheckerAgent.
   */
  public getCombinedContext(topic?: string): string {
    try {
      const files = readdirSync(this.knowledgeDir).filter(f => f.endsWith('.md'));
      const selected = selectRelevantKnowledgeFiles(files, topic);

      let combined = '### STATISCHE KNOWLEDGE BASE FEITEN ###\n\n';

      for (const file of selected) {
        const filePath = path.join(this.knowledgeDir, file);
        const content = readFileSync(filePath, 'utf-8');
        combined += `--- Bestand: ${file} ---\n${content}\n\n`;
      }

      return combined;
    } catch (error) {
      console.warn('[KnowledgeBase] Kon knowledge map niet inladen:', error);
      return '';
    }
  }
}
