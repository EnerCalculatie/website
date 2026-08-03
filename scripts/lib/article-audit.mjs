/**
 * Bouwt en schrijft ai-context/article-audit.json na elke run — overschreven
 * per run (single snapshot van de laatste generatie), in tegenstelling tot het
 * append-only content-log.json.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_AUDIT_PATH = path.resolve(import.meta.dirname, '..', '..', 'ai-context', 'article-audit.json');

/**
 * @param {{
 *   article: {title:string},
 *   seoScore: number,
 *   geoScore: number,
 *   factScore: number,
 *   sourceQuality: number,
 *   claims: Array<{id:string, text:string, status:string, source: {title:string,url:string,qualityScore?:number}|null}>
 * }} params
 */
export function buildAudit({ article, seoScore, geoScore, factScore, sourceQuality, claims }) {
  return {
    title: article.title,
    generatedAt: new Date().toISOString(),
    seoScore,
    geoScore,
    factScore,
    sourceQuality,
    claims: claims.map((c) => ({
      claim: c.text,
      status: c.status,
      sources: c.source
        ? [{ title: c.source.title, url: c.source.url, quality: c.source.qualityScore ?? null }]
        : [],
    })),
  };
}

/**
 * @param {object} audit
 * @param {string} [auditPath]
 */
export async function writeAuditFile(audit, auditPath = DEFAULT_AUDIT_PATH) {
  await writeFile(auditPath, `${JSON.stringify(audit, null, 2)}\n`, 'utf8');
}
