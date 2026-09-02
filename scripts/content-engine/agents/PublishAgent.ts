import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

export function estimateReadingMinutes(text: string) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

export function truncateAtWord(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  const sub = str.slice(0, maxLen);
  const lastSpace = sub.lastIndexOf(' ');
  return lastSpace > 0 ? sub.slice(0, lastSpace) + '...' : sub + '...';
}

export function pascalCase(slug: string) {
  const c = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  return /^\d/.test(c) ? `Post${c}` : c;
}

/** Escaped voor gebruik binnen een enkelquote-JS-string-literal in blogPosts.ts. */
export function escapeJsString(s: string) {
  return s.replace(/'/g, "\\'");
}

export interface PlanItem {
  title?: string;
  status?: string;
  [key: string]: unknown;
}

/**
 * Vindt het backlog-item dat bij deze pipeline-run hoort — puur op het ORIGINELE onderwerp
 * (`originalTopic`, exact `item.title` zoals run-pipeline.ts het uit content-plan.json koos),
 * nooit op `seoJson.title` (SeoGeoAgent herschrijft die). Geen fallback op "eender welk planned
 * item": dat verkeerd-markeren was de root cause van een echt duplicaat-artikel (2026-08-07/08,
 * samengevoegd 2026-08-25) — het echte gegenereerde item bleef daardoor op 'planned' staan en
 * werd de volgende run opnieuw opgepikt en opnieuw gegenereerd, terwijl een totaal ongerelateerd
 * item ten onrechte als 'generated' werd gemarkeerd.
 */
export function matchPlanItem(plan: PlanItem[], originalTopic: string | undefined): PlanItem | undefined {
  if (!originalTopic) return undefined;
  return plan.find((i) => i.title === originalTopic && i.status === 'planned');
}

export interface VisualSpec {
  type: 'bar_chart' | 'comparison';
  title?: string;
  caption?: string;
  unit?: string;
  items?: { label: string; value: number; kleur?: string }[];
  columns?: [string, string];
  rows?: { label: string; left: string; right: string }[];
  illustrative?: boolean;
}

export interface SeoJson {
  content: string;
  slug: string;
  title: string;
  seoTitle?: string;
  description?: string;
  excerpt: string;
  tags?: string[];
  keyPoints?: string[];
  category?: string;
  faq?: Array<{ question: string; answer: string }>;
  visual?: VisualSpec;
}

const MARKDOWN_COMPONENTS_PROPS = `{
          h2: ({node: _node, ...props}) => <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4" {...props} />,
          h3: ({node: _node, ...props}) => <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3" {...props} />,
          p: ({node: _node, ...props}) => <p className="text-slate-700 leading-relaxed mb-4" {...props} />,
          ul: ({node: _node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700" {...props} />,
          ol: ({node: _node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-700" {...props} />,
          li: ({node: _node, ...props}) => <li className="leading-relaxed" {...props} />,
          strong: ({node: _node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
          a: ({node: _node, ...props}) => <a className="text-brand-primary-text hover:underline font-semibold" {...props} />,
          hr: ({node: _node, ...props}) => <hr className="my-8 border-slate-200" {...props} />,
          blockquote: ({node: _node, ...props}) => <blockquote className="border-l-4 border-brand-primary pl-4 my-4 italic text-slate-600 bg-slate-50 py-2 pr-4 rounded-r" {...props} />,
          table: ({node: _node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full border-collapse text-sm" {...props} /></div>,
          thead: ({node: _node, ...props}) => <thead className="bg-slate-100" {...props} />,
          th: ({node: _node, ...props}) => <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-900" {...props} />,
          td: ({node: _node, ...props}) => <td className="border border-slate-200 px-3 py-2 text-slate-700" {...props} />
        }`;

/** Splitst de markdown-body op de literal marker \`[[VISUAL]]\` (op een eigen regel, whitespace
 * genegeerd) in segmenten. Puur — geen I/O. Gebruikt door buildComponentSource om de visual op de
 * exacte plek te plaatsen die de WriterAgent koos, i.p.v. een vaste positie (zie ArticleVisual.tsx-
 * doc-comment: "een diagram hoort op een specifieke plek in het betoog"). */
export function splitOnVisualMarker(content: string): string[] {
  return content.split(/\n[ \t]*\[\[VISUAL\]\][ \t]*\n/);
}

/** Genereert de .tsx-broncode voor een blogartikel-component. Puur — geen I/O.
 * `visual`: optioneel, uit SeoJson.visual — als aanwezig én de content een \`[[VISUAL]]\`-marker
 * bevat, wordt de markdown op die plek gesplitst en <ArticleVisual> ertussen gerenderd. Ontbreekt
 * de marker maar is er wel een visual (of andersom): render de visual niet — een onduidelijke
 * plek is erger dan geen visual (zie ook de test hiervoor). */
export function buildComponentSource(componentName: string, slug: string, content: string, visual?: VisualSpec) {
  const segments = splitOnVisualMarker(content);
  const useVisual = Boolean(visual) && segments.length === 2;

  const escape = (s: string) => s.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  const markdownBlocks = useVisual
    ? segments.map((seg, i) => `const markdown${i} = \`\n${escape(seg)}\n\`;`).join('\n')
    : `const markdown = \`\n${escape(content)}\n\`;`;

  const visualImport = useVisual ? `import { ArticleVisual } from './ArticleVisual';\n` : '';
  const visualPropJson = useVisual ? JSON.stringify(visual) : '';

  const body = useVisual
    ? `<ReactMarkdown remarkPlugins={[remarkGfm]} components={${MARKDOWN_COMPONENTS_PROPS}}>{markdown0}</ReactMarkdown>
      <ArticleVisual visual={${visualPropJson}} />
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={${MARKDOWN_COMPONENTS_PROPS}}>{markdown1}</ReactMarkdown>`
    : `<ReactMarkdown remarkPlugins={[remarkGfm]} components={${MARKDOWN_COMPONENTS_PROPS}}>{markdown}</ReactMarkdown>`;

  return `import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
${visualImport}
const post = blogPosts.find((p) => p.slug === '${slug}')!;

${markdownBlocks}

export function ${componentName}() {
  return (
    <BlogPostLayout post={post}>
      ${body}
    </BlogPostLayout>
  );
}
`;
}

/** Genereert het blogPosts.ts-array-entry voor een artikel. Puur — geen I/O. */
export function buildBlogPostsEntry(seo: SeoJson, readingTimeMinutes: number) {
  const { slug, title, seoTitle, description, excerpt, tags, keyPoints, category, faq } = seo;
  const tagsJs = (tags || []).map((t: string) => `'${escapeJsString(t)}'`).join(', ');
  const keyPointsJs = (keyPoints || []).map((k: string) => `      '${escapeJsString(k)}',`).join('\n');

  const faqItems = Array.isArray(faq) ? faq : [];
  const faqJs = faqItems
    .map((f) => `      { question: '${escapeJsString(f.question)}', answer: '${escapeJsString(f.answer)}' },`)
    .join('\n');

  const safeDesc = truncateAtWord(description || excerpt || '', 155);

  return `  {
    slug: '${slug}',
    readingTimeMinutes: ${readingTimeMinutes},
    title: '${escapeJsString(title)}',
    seoTitle: '${escapeJsString(seoTitle || title)}',
    description:
      '${escapeJsString(safeDesc)}',
    date: '${new Date().toISOString().slice(0, 10)}',
    excerpt:
      '${escapeJsString(excerpt)}',
    tags: [${tagsJs}],
    keyPoints: [
${keyPointsJs}
    ],${category ? `\n    category: '${escapeJsString(category)}',` : ''}${faqItems.length ? `\n    faq: [\n${faqJs}\n    ],` : ''}
  },
];`;
}

/** Voegt een nieuw blogPosts.ts-entry toe vóór de afsluitende `];`. Puur — geen I/O. */
export function insertBlogPostsEntry(blogPostsSource: string, entry: string) {
  return blogPostsSource.replace(/\n\];\s*$/, `\n${entry}\n`);
}

/**
 * Puur — geen I/O. True als deze slug al in blogPosts.ts staat. Voorkomt de destructieve
 * failure-mode die tijdens het testen van de content-engine-upgrade optrad: bij een
 * slug-botsing schreef PublishAgent naar hetzelfde componentbestand als het bestaande
 * artikel, en verwijderde de cleanup-`rm` bij een build-fout vervolgens dat bestaande
 * artikel in plaats van alleen het nieuwe. `plan-content.mjs` voorkomt botsingen al bij
 * het aanvullen van de backlog (title/keyword-dedup), maar `run-pipeline.ts`/PublishAgent
 * zelf hadden geen eigen guard — nodig voor elke run die niet via die backlog-planning
 * gaat (handmatige/CLI-run met een reeds-gepubliceerd onderwerp, bv. per ongeluk een
 * near-duplicate titel van een bestaand artikel).
 */
export function slugExistsInBlogPosts(blogPostsSource: string, slug: string): boolean {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`slug:\\s*'${escaped}'`).test(blogPostsSource);
}

/**
 * Voegt de lazyRoute-import en de <Route>-regel voor een nieuw artikel toe aan
 * App.tsx, na de laatst bestaande van elk als ankerpunt. Puur — geen I/O. Gooit
 * als een van beide ankerpunten niet gevonden wordt (App.tsx-structuur gewijzigd).
 */
export function insertAppRoutes(appSource: string, componentName: string, slug: string) {
  const lastLazyRouteMatch = [...appSource.matchAll(/^const \w+Article = lazyRoute\([^\n]+\n/gm)].pop();
  if (!lastLazyRouteMatch) throw new Error('Kon geen bestaande lazyRoute-declaratie vinden als ankerpunt in App.tsx.');
  const appLineEnding = lastLazyRouteMatch[0].endsWith('\r\n') ? '\r\n' : '\n';
  const lazyImportLine = `const ${componentName} = lazyRoute('/blog/${slug}', () => import('./components/blog/${componentName}').then(m => ({ default: m.${componentName} })));${appLineEnding}`;

  let updated = appSource.slice(0, (lastLazyRouteMatch.index as number) + lastLazyRouteMatch[0].length)
    + lazyImportLine
    + appSource.slice((lastLazyRouteMatch.index as number) + lastLazyRouteMatch[0].length);

  const lastRouteMatch = [...updated.matchAll(/^(\s*)<Route path="\/blog\/[^"]+" element=\{<\w+Article \/>\} \/>\r?\n/gm)].pop();
  if (!lastRouteMatch) throw new Error('Kon geen bestaande blog-<Route> vinden als ankerpunt in App.tsx.');
  const indent = lastRouteMatch[1];
  const lineEnding = lastRouteMatch[0].endsWith('\r\n') ? '\r\n' : '\n';
  const routeLine = `${indent}<Route path="/blog/${slug}" element={<${componentName} />} />${lineEnding}`;

  updated = updated.slice(0, (lastRouteMatch.index as number) + lastRouteMatch[0].length)
    + routeLine
    + updated.slice((lastRouteMatch.index as number) + lastRouteMatch[0].length);

  return updated;
}

export class PublishAgent {
  /** `originalTopic`: zie `matchPlanItem` hierboven — geef `topic` uit run-pipeline.ts door. */
  async run(seoJsonPath: string, rootDir: string, originalTopic?: string) {
    console.log(`[PublishAgent] Start publicatie...`);

    const seoJson: SeoJson = JSON.parse(readFileSync(seoJsonPath, 'utf-8'));
    const { content, slug, title, visual } = seoJson;

    const componentName = `${pascalCase(slug)}Article`;
    const blogDir = path.join(rootDir, 'src/components/blog');
    const componentPath = path.join(blogDir, `${componentName}.tsx`);
    const blogPostsPath = path.join(rootDir, 'src/content/blogPosts.ts');
    const appTsxPath = path.join(rootDir, 'src/App.tsx');

    // 0. Guard: weiger te publiceren als deze slug al bestaat — vóór er iets geschreven
    // wordt. Zie slugExistsInBlogPosts hierboven voor de aanleiding (data-verlies-risico).
    const existingBlogPostsSource = readFileSync(blogPostsPath, 'utf-8');
    if (slugExistsInBlogPosts(existingBlogPostsSource, slug)) {
      throw new Error(
        `[PublishAgent] Publicatie geweigerd: slug '${slug}' bestaat al in blogPosts.ts. ` +
        `Geen bestanden aangeraakt. Dit voorkomt overschrijven/verwijderen van een bestaand artikel ` +
        `bij een latere build-fout. Kies een ander onderwerp of, als dit een bewuste content-herziening ` +
        `is, werk het bestaande artikel handmatig bij i.p.v. via de automatische pipeline.`
      );
    }

    // 1. Maak React Component
    const componentSource = buildComponentSource(componentName, slug, content, visual);
    writeFileSync(componentPath, componentSource, 'utf-8');
    console.log(`[PublishAgent] Component geschreven: ${componentPath}`);

    // 2. Update blogPosts.ts
    const readingTimeMinutes = estimateReadingMinutes(content);
    const entry = buildBlogPostsEntry(seoJson, readingTimeMinutes);
    writeFileSync(blogPostsPath, insertBlogPostsEntry(existingBlogPostsSource, entry), 'utf-8');
    console.log('[PublishAgent] blogPosts.ts bijgewerkt.');

    // 3. Update App.tsx
    const appSource = readFileSync(appTsxPath, 'utf-8');
    writeFileSync(appTsxPath, insertAppRoutes(appSource, componentName, slug), 'utf-8');
    console.log('[PublishAgent] App.tsx bijgewerkt.');

    // 4. Update content-plan.json and content-log.json
    const planPath = path.join(rootDir, 'ai-context/content-plan.json');
    const logPath = path.join(rootDir, 'ai-context/content-log.json');
    try {
      const plan = JSON.parse(readFileSync(planPath, 'utf-8'));
      const planItem = matchPlanItem(plan, originalTopic);
      if (planItem) {
        planItem.status = 'generated';
        planItem.generatedSlug = slug;
        planItem.generatedAt = new Date().toISOString();
        writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf-8');
        console.log('[PublishAgent] content-plan.json bijgewerkt.');
      } else {
        console.warn(
          `[PublishAgent] Waarschuwing: geen 'planned' backlog-item gevonden voor origineel onderwerp "${originalTopic ?? '(onbekend)'}" — content-plan.json NIET bijgewerkt. Dit onderwerp kan een volgende run opnieuw oppikken; controleer handmatig.`
        );
      }
      
      let log = [];
      try { log = JSON.parse(readFileSync(logPath, 'utf-8')); } catch(_e) { /* ignore */ }
      log.push({
        date: new Date().toISOString().slice(0, 10),
        topic: title,
        slug: slug,
        status: 'generated'
      });
      writeFileSync(logPath, JSON.stringify(log, null, 2), 'utf-8');
      console.log('[PublishAgent] content-log.json bijgewerkt.');
    } catch (_e) {
      console.error('[PublishAgent] Kon plan/log niet bijwerken:', _e);
    }

    // 5. Verifieer build + SEO-QC
    //
    // qc:seo draait hier bewust ook — niet alleen in de losse CI-workflow. De
    // dagelijkse pipeline commit't/pusht met de standaard GITHUB_TOKEN, en
    // GitHub Actions triggert geen vervolgworkflows (dus ook niet de CI-workflow
    // met de qc:seo-gate) op pushes die met dat token zijn gedaan — de CI-check
    // valideert de eigen output van deze pipeline dus nooit. Ontdekt 2026-08-09
    // toen een vers gegenereerd artikel dezelfde /kennisbank/*-fantoomlinks,
    // te lange title en dubbele <h1> bleek te hebben als twee eerdere, alleen
    // bij toeval gevonden via een handmatige workflow_dispatch-run.
    console.log('[PublishAgent] Build verifiëren...');
    try {
      execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
      console.log('[PublishAgent] Build geslaagd. SEO-QC verifiëren...');
      execSync('npm run qc:seo', { cwd: rootDir, stdio: 'inherit' });
      console.log(`✅ Publicatie succesvol, build en SEO-QC geslaagd!`);
    } catch (err) {
      console.error('[PublishAgent] Build of SEO-QC gefaald! Reverting files...');
      execSync(`git checkout -- ${appTsxPath} ${blogPostsPath} ${planPath} ${logPath}`, { cwd: rootDir });
      execSync(`rm ${componentPath}`, { cwd: rootDir });
      throw new Error(`Build of SEO-QC gefaald na integratie: ${err}`, { cause: err });
    }
  }
}
