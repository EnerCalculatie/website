import path from 'node:path';
import { ResearchAgent } from './agents/ResearchAgent';
import { WriterAgent } from './agents/WriterAgent';
import { FactCheckerAgent } from './agents/FactCheckerAgent';
import { TechnicalReviewerAgent } from './agents/TechnicalReviewerAgent';
import { SeoGeoAgent } from './agents/SeoGeoAgent';
import { QualityGateAgent } from './agents/QualityGateAgent';
import { PublishAgent } from './agents/PublishAgent';

import { readFileSync } from 'node:fs';

export function pickNextPlannedItem(cwd: string) {
  const planPath = path.join(cwd, 'ai-context/content-plan.json');
  try {
    const plan = JSON.parse(readFileSync(planPath, 'utf-8'));
    const planned = plan.filter((i: { title?: string, status?: string, priority?: number }) => i.status === 'planned');
    if (!planned.length) return null;
    return planned.reduce((best: { title?: string, status?: string, priority?: number }, item: { title?: string, status?: string, priority?: number }) => ((item.priority ?? 0) > (best.priority ?? 0) ? item : best));
  } catch (_e) {
    return null;
  }
}

async function run() {
  const cwd = process.cwd();
  
  let topic = process.argv[2];
  if (!topic) {
    const item = pickNextPlannedItem(cwd);
    if (!item) {
      console.log('Geen geplande onderwerpen gevonden in content-plan.json. Stop.');
      process.exit(0);
    }
    topic = item.title;
    console.log(`Gekozen onderwerp uit content-plan.json: "${topic}"`);
  }

  console.log(`\n🚀 Start Content Engine Pipeline voor onderwerp: "${topic}"\n`);

  try {
    // Definieer paden
    const researchPath = path.join(cwd, 'research.json');
    const draftPath = path.join(cwd, 'draft.md');
    const factCheckPath = path.join(cwd, 'fact-check.json');
    const techReviewPath = path.join(cwd, 'technical-review.json');
    const seoPath = path.join(cwd, 'seo-optimized.json');
    const qualityPath = path.join(cwd, 'quality-report.json');

    // Stap 1: Research
    const researchAgent = new ResearchAgent();
    await researchAgent.run(topic, researchPath);

    // Stap 2: Eerste draft schrijven
    const writerAgent = new WriterAgent();
    await writerAgent.run(topic, researchPath, draftPath);

    // Stap 3: Kwaliteitscontrole loop (fact check + tech review → feedback → herschrijven)
    const factChecker = new FactCheckerAgent();
    const techReviewer = new TechnicalReviewerAgent();

    let retries = 0;
    const maxRetries = 2;

    while (retries < maxRetries) {
      // Fact Check
      const factCheckResult = await factChecker.run(draftPath, researchPath, factCheckPath);
      
      // Technical Review
      const techReviewResult = await techReviewer.run(draftPath, techReviewPath);

      // Verzamel alleen blokkerende issues (high severity of feitelijk incorrect)
      const factErrors = factCheckResult.filter((f: { status: string }) => f.status === 'incorrect');
      const techHighIssues = techReviewResult.filter((t: { severity: string }) => t.severity === 'high');

      const hasBlockingIssues = factErrors.length > 0 || techHighIssues.length > 0;

      if (!hasBlockingIssues) {
        console.log(`\n✅ Geen blokkerende issues gevonden na controle.`);
        break;
      }

      retries++;
      if (retries >= maxRetries) {
        console.log(`\n⚠️ Maximaal aantal herschrijf-iteraties bereikt (${maxRetries}). Ga door met beste versie.`);
        break;
      }

      // Bouw feedback op uit concrete issues
      const feedbackLines: string[] = [];
      for (const f of factErrors) {
        feedbackLines.push(`- [FEITFOUT] "${f.claim}": ${f.reason}. Suggestie: ${f.suggestion}`);
      }
      for (const t of techHighIssues) {
        feedbackLines.push(`- [TECHNISCH] ${t.issue}. Aanbeveling: ${t.recommendation}`);
      }

      console.log(`\n⚠️ ${feedbackLines.length} blokkerende issue(s) gevonden, start herschrijven iteratie ${retries}...`);
      await writerAgent.run(topic, researchPath, draftPath, feedbackLines.join('\n'));
    }

    // Stap 4: SEO / GEO Optimizer (één keer, na de inhoudelijke loop)
    const seoAgent = new SeoGeoAgent();
    await seoAgent.run(draftPath, seoPath);

    // Stap 5: Quality Gate (definitieve check)
    const qualityGate = new QualityGateAgent();
    const qualityOut = await qualityGate.run(seoPath, factCheckPath, techReviewPath, qualityPath);

    if (qualityOut.passed) {
      console.log(`\n✅ Kwaliteitscontrole geslaagd (confidence: ${qualityOut.confidence}%). Start publicatie...`);
      const publisher = new PublishAgent();
      await publisher.run(seoPath, cwd, topic);
      console.log(`\n🎉 PIPELINE VOLTOOID. Artikel is gepubliceerd!`);
    } else {
      // Log de issues maar publiceer NIET — dit is een echte blokkade
      const highIssues = qualityOut.issues.filter((i: { severity: string }) => i.severity === 'high');
      if (highIssues.length === 0) {
        // Alleen medium/low issues — publiceer alsnog met waarschuwing
        console.log(`\n⚠️ Kwaliteitscontrole heeft suggesties maar geen blokkerende fouten. Publicatie gaat door.`);
        console.log(`Suggesties voor handmatige review:`);
        console.log(JSON.stringify(qualityOut.issues, null, 2));
        const publisher = new PublishAgent();
        await publisher.run(seoPath, cwd, topic);
        console.log(`\n🎉 PIPELINE VOLTOOID. Artikel is gepubliceerd (met suggesties).`);
      } else {
        console.log(`\n❌ PIPELINE GESTOPT: ${highIssues.length} blokkerende fout(en) na alle iteraties. Handmatige controle vereist.`);
        console.log(JSON.stringify(highIssues, null, 2));
        process.exit(1);
      }
    }

  } catch (err) {
    console.error('\n💥 FATALE FOUT in pipeline:', err);
    process.exit(1);
  }
}

// Alleen automatisch draaien bij directe CLI-aanroep (npx tsx run-pipeline.ts),
// niet bij een import — anders triggert bv. een test die pickNextPlannedItem
// importeert de hele live pipeline als bijwerking van het importeren.
if (process.argv[1] && process.argv[1].endsWith('run-pipeline.ts')) {
  run();
}
