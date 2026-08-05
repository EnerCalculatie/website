import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export class KnowledgeBase {
  private knowledgeDir: string;

  constructor() {
    this.knowledgeDir = path.join(import.meta.dirname, '../knowledge');
  }

  /**
   * Leest alle statische Markdown-bestanden in de knowledge map en combineert ze
   * tot één context string die aan de WriterAgent meegegeven kan worden.
   */
  public getCombinedContext(): string {
    try {
      const files = readdirSync(this.knowledgeDir).filter(f => f.endsWith('.md'));
      
      let combined = '### STATISCHE KNOWLEDGE BASE FEITEN ###\n\n';
      
      for (const file of files) {
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
