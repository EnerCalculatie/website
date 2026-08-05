import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

function estimateReadingMinutes(text: string) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

function truncateAtWord(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  const sub = str.slice(0, maxLen);
  const lastSpace = sub.lastIndexOf(' ');
  return lastSpace > 0 ? sub.slice(0, lastSpace) + '...' : sub + '...';
}

function pascalCase(slug: string) {
  const c = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  return /^\d/.test(c) ? `Post${c}` : c;
}

export class PublishAgent {
  async run(seoJsonPath: string, rootDir: string) {
    console.log(`[PublishAgent] Start publicatie...`);

    const seoJson = JSON.parse(readFileSync(seoJsonPath, 'utf-8'));
    const { content, slug, title, seoTitle, description, excerpt, tags, keyPoints, category, faq } = seoJson;

    const componentName = `${pascalCase(slug)}Article`;
    const blogDir = path.join(rootDir, 'src/components/blog');
    const componentPath = path.join(blogDir, `${componentName}.tsx`);
    const blogPostsPath = path.join(rootDir, 'src/content/blogPosts.ts');
    const appTsxPath = path.join(rootDir, 'src/App.tsx');

    // 1. Maak React Component
    const bodyEscaped = content.replace(/\\'/g, "'");
    const componentSource = `import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === '${slug}')!;

export function ${componentName}() {

  return (
    <BlogPostLayout post={post}>
${bodyEscaped}
    </BlogPostLayout>
  );
}
`;
    writeFileSync(componentPath, componentSource, 'utf-8');
    console.log(`[PublishAgent] Component geschreven: ${componentPath}`);

    // 2. Update blogPosts.ts
    const escape = (s: string) => s.replace(/'/g, "\\'");
    const tagsJs = (tags || []).map((t: string) => `'${escape(t)}'`).join(', ');
    const keyPointsJs = (keyPoints || []).map((k: string) => `      '${escape(k)}',`).join('\n');
    
    const faqItems = Array.isArray(faq) ? faq : [];
    const faqJs = faqItems
      .map((f: { question: string, answer: string }) => `      { question: '${escape(f.question)}', answer: '${escape(f.answer)}' },`)
      .join('\n');
      
    const safeDesc = truncateAtWord(description || excerpt || '', 155);
    const readingTimeMinutes = estimateReadingMinutes(content);

    const entry = `  {
    slug: '${slug}',
    readingTimeMinutes: ${readingTimeMinutes},
    title: '${escape(title)}',
    seoTitle: '${escape(seoTitle || title)}',
    description:
      '${escape(safeDesc)}',
    date: '${new Date().toISOString().slice(0, 10)}',
    excerpt:
      '${escape(excerpt)}',
    tags: [${tagsJs}],
    keyPoints: [
${keyPointsJs}
    ],${category ? `\n    category: '${escape(category)}',` : ''}${faqItems.length ? `\n    faq: [\n${faqJs}\n    ],` : ''}
  },
];`;

    let blogPostsSource = readFileSync(blogPostsPath, 'utf-8');
    blogPostsSource = blogPostsSource.replace(/\n\];\s*$/, `\n${entry}\n`);
    writeFileSync(blogPostsPath, blogPostsSource, 'utf-8');
    console.log('[PublishAgent] blogPosts.ts bijgewerkt.');

    // 3. Update App.tsx
    let appSource = readFileSync(appTsxPath, 'utf-8');
    const lastLazyRouteMatch = [...appSource.matchAll(/^const \w+Article = lazyRoute\([^\n]+\n/gm)].pop();
    if (!lastLazyRouteMatch) throw new Error('Kon geen bestaande lazyRoute-declaratie vinden als ankerpunt in App.tsx.');
    const appLineEnding = lastLazyRouteMatch[0].endsWith('\r\n') ? '\r\n' : '\n';
    const lazyImportLine = `const ${componentName} = lazyRoute('/blog/${slug}', () => import('./components/blog/${componentName}').then(m => ({ default: m.${componentName} })));${appLineEnding}`;
    
    appSource = appSource.slice(0, (lastLazyRouteMatch.index as number) + lastLazyRouteMatch[0].length)
      + lazyImportLine
      + appSource.slice((lastLazyRouteMatch.index as number) + lastLazyRouteMatch[0].length);

    const lastRouteMatch = [...appSource.matchAll(/^(\s*)<Route path="\/blog\/[^"]+" element=\{<\w+Article \/>\} \/>\r?\n/gm)].pop();
    if (!lastRouteMatch) throw new Error('Kon geen bestaande blog-<Route> vinden als ankerpunt in App.tsx.');
    const indent = lastRouteMatch[1];
    const lineEnding = lastRouteMatch[0].endsWith('\r\n') ? '\r\n' : '\n';
    const routeLine = `${indent}<Route path="/blog/${slug}" element={<${componentName} />} />${lineEnding}`;
    
    appSource = appSource.slice(0, (lastRouteMatch.index as number) + lastRouteMatch[0].length)
      + routeLine
      + appSource.slice((lastRouteMatch.index as number) + lastRouteMatch[0].length);

    writeFileSync(appTsxPath, appSource, 'utf-8');
    console.log('[PublishAgent] App.tsx bijgewerkt.');

    // 4. Update content-plan.json and content-log.json
    const planPath = path.join(rootDir, 'ai-context/content-plan.json');
    const logPath = path.join(rootDir, 'ai-context/content-log.json');
    try {
      const plan = JSON.parse(readFileSync(planPath, 'utf-8'));
      const planItem = plan.find((i: Record<string, unknown>) => i.title === title) || plan.find((i: Record<string, unknown>) => i.status === 'planned');
      if (planItem) {
        planItem.status = 'generated';
        planItem.generatedSlug = slug;
        planItem.generatedAt = new Date().toISOString();
        writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf-8');
        console.log('[PublishAgent] content-plan.json bijgewerkt.');
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

    // 5. Verifieer build
    console.log('[PublishAgent] Build verifiëren...');
    try {
      execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
      console.log(`✅ Publicatie succesvol, build geslaagd!`);
    } catch (err) {
      console.error('[PublishAgent] Build gefaald! Reverting files...');
      execSync(`git checkout -- ${appTsxPath} ${blogPostsPath} ${planPath} ${logPath}`, { cwd: rootDir });
      execSync(`rm ${componentPath}`, { cwd: rootDir });
      throw new Error(`Build gefaald na integratie: ${err}`, { cause: err });
    }
  }
}
