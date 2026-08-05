import path from 'node:path';
import { ResearchAgent } from './agents/ResearchAgent';
import { WriterAgent } from './agents/WriterAgent';
import { FactCheckerAgent } from './agents/FactCheckerAgent';
import { TechnicalReviewerAgent } from './agents/TechnicalReviewerAgent';
import { SeoGeoAgent } from './agents/SeoGeoAgent';
import { QualityGateAgent } from './agents/QualityGateAgent';
import { PublishAgent } from './agents/PublishAgent';

import { readFileSync } from 'node:fs';

function pickNextPlannedItem(cwd: string) {
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

    // Stap 2 & 3: Knowledge Base & Writer
    const writerAgent = new WriterAgent();
    await writerAgent.run(topic, researchPath, draftPath);

    // Stap 4-7: Kwaliteitscontrole en Feedback Loop
    const factChecker = new FactCheckerAgent();
    const techReviewer = new TechnicalReviewerAgent();
    const seoAgent = new SeoGeoAgent();
    const qualityGate = new QualityGateAgent();

    let passed = false;
    let retries = 0;
    const maxRetries = 2;
    let qualityOut;

    while (!passed && retries <= maxRetries) {
      // Stap 4: Fact Checker
      await factChecker.run(draftPath, researchPath, factCheckPath);

      // Stap 5: Technical Reviewer
      await techReviewer.run(draftPath, techReviewPath);

      // Stap 6: SEO / GEO Optimizer
      await seoAgent.run(draftPath, seoPath);

      // Stap 7: Quality Gate
      qualityOut = await qualityGate.run(seoPath, factCheckPath, techReviewPath, qualityPath);

      if (qualityOut.passed) {
        passed = true;
      } else {
        retries++;
        if (retries > maxRetries) {
          console.log(`\n❌ PIPELINE GEFAALD in Quality Gate na maximaal aantal iteraties (${maxRetries}). Handmatige controle vereist.`);
          console.log(JSON.stringify(qualityOut.issues, null, 2));
          process.exit(1);
        }
        console.log(`\n⚠️ Kwaliteitsproblemen gevonden, start herschrijven iteratie ${retries}...`);
        
        // Herschrijf met feedback
        const feedback = qualityOut.issues.map((i: { severity: string, issue: string }) => `- [${i.severity}] ${i.issue}`).join('\n');
        await writerAgent.run(topic, researchPath, draftPath, feedback);
      }
    }

    if (passed) {
      console.log(`\n✅ Kwaliteitscontrole geslaagd. Start publicatie...`);
      const publisher = new PublishAgent();
      await publisher.run(seoPath, cwd);
      console.log(`\n🎉 PIPELINE VOLTOOID. Artikel is gepubliceerd!`);
    }

  } catch (err) {
    console.error('\n💥 FATALE FOUT in pipeline:', err);
    process.exit(1);
  }
}

run();
