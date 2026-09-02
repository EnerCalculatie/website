import path from 'node:path';
import { ResearchAgent } from './agents/ResearchAgent';
import { WriterAgent } from './agents/WriterAgent';
import { FactCheckerAgent } from './agents/FactCheckerAgent';
import { TechnicalReviewerAgent } from './agents/TechnicalReviewerAgent';
import { SeoGeoAgent } from './agents/SeoGeoAgent';
import { QualityGateAgent } from './agents/QualityGateAgent';
import { MarketingGateAgent } from './agents/MarketingGateAgent';
import { PublishAgent } from './agents/PublishAgent';
import { SeoBriefOutput } from './schemas/seo';

import { readFileSync, writeFileSync } from 'node:fs';

type ContentType = 'SEO' | 'PRACTICAL';
type PlanItem = {
  title?: string;
  status?: string;
  priority?: number;
  contentType?: ContentType;
  keyword?: string;
  intent?: string;
};

/**
 * Dinsdag = SEO (kennis/zoekgedrag), vrijdag = PRACTICAL (praktijk/commercieel) — zie
 * scripts/content-engine/prompts/writer.md. Europe/Amsterdam, niet UTC/serverlokaal: de
 * GitHub Actions-runner draait in UTC en de workflow heeft al een aparte DST-guard-stap
 * die deze functie pas op het juiste lokale moment laat draaien (zie publish-blog-post.yml).
 * Buiten di/vr (handmatige workflow_dispatch met een expliciet gekozen dag): geen
 * afgedwongen type, WriterAgent krijgt dan geen CONTENTTYPE-instructie.
 */
export function requiredContentType(date: Date = new Date()): ContentType | undefined {
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Amsterdam', weekday: 'short' }).format(date);
  if (weekday === 'Tue') return 'SEO';
  if (weekday === 'Fri') return 'PRACTICAL';
  return undefined;
}

/**
 * Kiest het hoogste-prioriteit 'planned' item. Bij een opgegeven `requiredType` (het
 * di/vr-contenttype) heeft een item met matchend `contentType` voorrang boven prioriteit alleen
 * — pas als geen enkel gepland item het gevraagde type heeft, valt dit terug op de hoogste
 * prioriteit ongeacht type (met een waarschuwing: dat is een signaal dat de backlog te weinig
 * variatie in contentType heeft, niet een normale situatie).
 */
export function pickNextPlannedItem(cwd: string, requiredType?: ContentType) {
  const planPath = path.join(cwd, 'ai-context/content-plan.json');
  try {
    const plan = JSON.parse(readFileSync(planPath, 'utf-8'));
    const planned: PlanItem[] = plan.filter((i: PlanItem) => i.status === 'planned');
    if (!planned.length) return null;

    const highestPriority = (items: PlanItem[]) =>
      items.reduce((best, item) => ((item.priority ?? 0) > (best.priority ?? 0) ? item : best));

    if (requiredType) {
      const matching = planned.filter((i) => i.contentType === requiredType);
      if (matching.length > 0) return highestPriority(matching);
      console.warn(
        `Waarschuwing: geen 'planned' backlog-item met contentType '${requiredType}' beschikbaar — val terug op de hoogste prioriteit ongeacht type. Vul de backlog aan met meer ${requiredType}-onderwerpen.`
      );
    }

    return highestPriority(planned);
  } catch (_e) {
    return null;
  }
}

/**
 * Definitieve publicatiebeslissing — puur, los testbaar. Drie onafhankelijke, harde gates
 * (BLOG_CONTENT_GUIDELINES.md, "Quality Gate — wat blokkeert, wat niet"):
 * 1. Factual/technical correctness (QualityGateAgent — ongewijzigd, minstens één 'high'-issue blokkeert).
 * 2. SEO/GEO (SeoGeoAgent.audit — vaste drempels, zie schemas/seo.ts).
 * 3. Practical usefulness (MarketingGateAgent — enige blokkerende dimensie daar).
 * Overige marketingdimensies zijn nooit blokkerend. De drie gates zijn onafhankelijk: SEO/GEO-falen
 * betekent nooit dat de factual gate faalt, en andersom.
 */
export interface PipelineGateResult {
  factualBlocking: boolean;
  seoBlocking: boolean;
  usefulnessBlocking: boolean;
  canPublish: boolean;
}

export function evaluateGates(
  qualityHighIssueCount: number,
  seoAuditPassed: boolean,
  marketingPassed: boolean
): PipelineGateResult {
  const factualBlocking = qualityHighIssueCount > 0;
  const seoBlocking = !seoAuditPassed;
  const usefulnessBlocking = !marketingPassed;
  return { factualBlocking, seoBlocking, usefulnessBlocking, canPublish: !factualBlocking && !seoBlocking && !usefulnessBlocking };
}

async function run() {
  const cwd = process.cwd();

  let topic = process.argv[2];
  // Alleen afdwingen bij automatische backlog-selectie — een expliciet CLI-onderwerp
  // (handmatige/backfill-run) is een bewuste uitzondering, geen di/vr-scheduler-run.
  const contentType = topic ? undefined : requiredContentType();
  let keyword: string | undefined;
  let intent: string | undefined;
  if (!topic) {
    const item = pickNextPlannedItem(cwd, contentType);
    if (!item) {
      console.log('Geen geplande onderwerpen gevonden in content-plan.json. Stop.');
      process.exit(0);
    }
    topic = item.title;
    keyword = item.keyword;
    intent = item.intent;
    console.log(`Gekozen onderwerp uit content-plan.json: "${topic}"${contentType ? ` (contentType: ${contentType})` : ''}`);
  }

  console.log(`\n🚀 Start Content Engine Pipeline voor onderwerp: "${topic}"\n`);

  try {
    // Definieer paden
    const briefPath = path.join(cwd, 'seo-brief.json');
    const researchPath = path.join(cwd, 'research.json');
    const draftPath = path.join(cwd, 'draft.md');
    const factCheckPath = path.join(cwd, 'fact-check.json');
    const techReviewPath = path.join(cwd, 'technical-review.json');
    const seoPath = path.join(cwd, 'seo-optimized.json');
    const seoAuditPath = path.join(cwd, 'seo-audit.json');
    const qualityPath = path.join(cwd, 'quality-report.json');
    const marketingPath = path.join(cwd, 'marketing-report.json');

    const seoAgent = new SeoGeoAgent();
    const writerAgent = new WriterAgent();
    const factChecker = new FactCheckerAgent();
    const techReviewer = new TechnicalReviewerAgent();

    // Stap 1: SEO/GEO-brief — vóór onderzoek en schrijven, zodat zoekintentie de hele pipeline
    // stuurt i.p.v. achteraf metadata toe te voegen (zie BLOG_CONTENT_GUIDELINES.md).
    const brief: SeoBriefOutput = await seoAgent.brief(topic, keyword, intent);
    writeFileSync(briefPath, JSON.stringify(brief, null, 2), 'utf-8');

    // Stap 2: Research — ResearchAgent zelf blijft ongewijzigd (accepteert alleen `topic: string`);
    // de brief wordt hier in die string gevouwen zodat het onderzoek de primaire/secundaire
    // zoekvragen en de vereiste informatie meekrijgt, niet alleen de kale werktitel.
    const researchAgent = new ResearchAgent();
    const researchTopic = `${topic}\n\nBeantwoord specifiek: ${brief.primaryQuestion}\nGerelateerde vragen: ${brief.secondaryQuestions.join('; ')}\nVerzamel expliciet: ${brief.requiredInformation.join('; ')}`;
    await researchAgent.run(researchTopic, researchPath);

    // Stap 3: Eerste draft schrijven (krijgt de brief mee)
    await writerAgent.run(topic, researchPath, draftPath, undefined, contentType, brief);

    // Stap 4: Kwaliteitscontrole-loop — fact check + tech review + SEO/GEO-audit delen dezelfde
    // retry-teller (max 2 iteraties totaal, niet per check). Volgorde per iteratie: eerst
    // feitelijke/technische issues oplossen (die veranderen de content het meest ingrijpend); pas
    // als die schoon zijn, SEO optimaliseren en auditen — een SEO-retry op een nog-foutieve tekst
    // zou zinloos werk zijn.
    let retries = 0;
    const maxRetries = 2;
    let seoOptimized: Awaited<ReturnType<typeof seoAgent.run>> | undefined;
    let auditResult: Awaited<ReturnType<typeof seoAgent.audit>> | undefined;

    while (retries < maxRetries) {
      const factCheckResult = await factChecker.run(draftPath, researchPath, factCheckPath);
      const techReviewResult = await techReviewer.run(draftPath, techReviewPath);

      const factErrors = factCheckResult.filter((f: { status: string }) => f.status === 'incorrect');
      const techHighIssues = techReviewResult.filter((t: { severity: string }) => t.severity === 'high');
      const hasBlockingContentIssues = factErrors.length > 0 || techHighIssues.length > 0;

      if (hasBlockingContentIssues) {
        retries++;
        if (retries >= maxRetries) {
          console.log(`\n⚠️ Maximaal aantal herschrijf-iteraties bereikt (${maxRetries}) met nog openstaande feitelijke/technische issues.`);
          break;
        }
        const feedbackLines: string[] = [];
        for (const f of factErrors) feedbackLines.push(`- [FEITFOUT] "${f.claim}": ${f.reason}. Suggestie: ${f.suggestion}`);
        for (const t of techHighIssues) feedbackLines.push(`- [TECHNISCH] ${t.issue}. Aanbeveling: ${t.recommendation}`);
        console.log(`\n⚠️ ${feedbackLines.length} blokkerende issue(s) gevonden, start herschrijven iteratie ${retries}...`);
        await writerAgent.run(topic, researchPath, draftPath, feedbackLines.join('\n'), contentType, brief);
        continue; // herstart de loop-iteratie op de herschreven draft, sla SEO nog over
      }

      console.log(`\n✅ Geen blokkerende feitelijke/technische issues gevonden.`);
      seoOptimized = await seoAgent.run(draftPath, seoPath);
      auditResult = await seoAgent.audit(seoPath, brief, seoAuditPath);

      if (auditResult.passed) {
        console.log(`\n✅ SEO/GEO-audit geslaagd.`);
        break;
      }

      retries++;
      if (retries >= maxRetries) {
        console.log(`\n⚠️ Maximaal aantal herschrijf-iteraties bereikt (${maxRetries}) met SEO/GEO nog onder de drempel.`);
        break;
      }
      console.log(`\n⚠️ SEO/GEO-audit onvoldoende, start herschrijven iteratie ${retries}...`);
      console.log(JSON.stringify(auditResult.blockingIssues, null, 2));
      await writerAgent.run(topic, researchPath, draftPath, auditResult.feedback, contentType, brief);
      // volgende iteratie doet fact-check/tech-review opnieuw op de herschreven tekst — noodzakelijk,
      // een herschrijving kan in theorie een nieuwe feitelijke fout introduceren.
    }

    // Veiligheidsnet: als de loop stopte terwijl er nog feitelijke/technische issues openstonden
    // (retries op), is er mogelijk nooit een SEO-optimalisatie/audit gedraaid — QualityGateAgent en
    // PublishAgent hebben seo-optimized.json wel nodig. Genereer 'm dan alsnog, puur voor rapportage
    // (de factual gate blokkeert toch al, dit voorkomt alleen een crash op een ontbrekend bestand).
    if (!seoOptimized) seoOptimized = await seoAgent.run(draftPath, seoPath);
    if (!auditResult) auditResult = await seoAgent.audit(seoPath, brief, seoAuditPath);

    // Stap 5: Quality Gate (factual/technical — ongewijzigd, enige bron voor factualBlocking)
    const qualityGate = new QualityGateAgent();
    const qualityOut = await qualityGate.run(seoPath, factCheckPath, techReviewPath, qualityPath);
    const highIssues = qualityOut.issues.filter((i: { severity: string }) => i.severity === 'high');

    // Stap 6: Marketing Gate (non-blocking behalve practicalUsefulness — zie schemas/marketing-gate.ts)
    const marketingGate = new MarketingGateAgent();
    const marketingOut = await marketingGate.run(seoPath, marketingPath);

    const gates = evaluateGates(highIssues.length, auditResult.passed, marketingOut.passed);

    if (gates.canPublish) {
      if (qualityOut.issues.length > 0 || marketingOut.feedback) {
        console.log(`\n⚠️ Niet-blokkerende suggesties (publicatie gaat door):`);
        console.log(`Quality: ${JSON.stringify(qualityOut.issues, null, 2)}`);
        console.log(`Marketing (practicalUsefulness ${marketingOut.scores.practicalUsefulness}/10): ${marketingOut.feedback}`);
      }
      console.log(`\n✅ Alle gates geslaagd. Start publicatie...`);
      const publisher = new PublishAgent();
      await publisher.run(seoPath, cwd, topic);
      console.log(`\n🎉 PIPELINE VOLTOOID. Artikel is gepubliceerd!`);
    } else {
      console.log(`\n❌ PIPELINE GESTOPT — publicatie geblokkeerd:`);
      if (gates.factualBlocking) console.log(`- Factual/technical: ${highIssues.length} blokkerende fout(en). ${JSON.stringify(highIssues, null, 2)}`);
      if (gates.seoBlocking) console.log(`- SEO/GEO onvoldoende: ${JSON.stringify(auditResult.blockingIssues, null, 2)}`);
      if (gates.usefulnessBlocking) console.log(`- Practical usefulness te laag (${marketingOut.scores.practicalUsefulness}/10, minimaal 4 vereist): ${marketingOut.feedback}`);
      process.exit(1);
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
