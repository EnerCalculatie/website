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
 * Dinsdag = SEO (kennis/zoekgedrag), donderdag = PRACTICAL (praktijk/commercieel) — zie
 * scripts/content-engine/prompts/writer.md. Europe/Amsterdam, niet UTC/serverlokaal: de
 * GitHub Actions-runner draait in UTC en de workflow heeft al een aparte DST-guard-stap
 * die deze functie pas op het juiste lokale moment laat draaien (zie publish-blog-post.yml).
 * Buiten di/do (handmatige workflow_dispatch met een expliciet gekozen dag): geen
 * afgedwongen type, WriterAgent krijgt dan geen CONTENTTYPE-instructie.
 */
export function requiredContentType(date: Date = new Date()): ContentType | undefined {
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Amsterdam', weekday: 'short' }).format(date);
  if (weekday === 'Tue') return 'SEO';
  if (weekday === 'Thu') return 'PRACTICAL';
  return undefined;
}

/**
 * Kiest het hoogste-prioriteit 'planned' item. Bij een opgegeven `requiredType` (het
 * di/do-contenttype) heeft een item met matchend `contentType` voorrang boven prioriteit alleen
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
 * 1. Factual/technical correctness (factcheck + technische review + eindgate; open fouten blokkeren).
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

export const MAX_REPAIR_ATTEMPTS = 3;

export async function runPipeline(cwd = process.cwd(), topic = process.argv[2]) {
  // Alleen afdwingen bij automatische backlog-selectie — een expliciet CLI-onderwerp
  // (handmatige/backfill-run) is een bewuste uitzondering, geen di/do-scheduler-run.
  const contentType = topic ? undefined : requiredContentType();
  let keyword: string | undefined;
  let intent: string | undefined;
  if (!topic) {
    const item = pickNextPlannedItem(cwd, contentType);
    if (!item) {
      console.log('Geen geplande onderwerpen gevonden in content-plan.json. Stop.');
      return;
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

    // Eén gedeeld budget: maximaal drie echte herschrijvingen en vier beoordelingen.
    // Iedere ronde beoordeelt exact de publicatieversie, inclusief SEO-nevenvelden.
    // Brief/research blijven gelijk; geen extra calls voor alleen rapportage na uitputting.
    const marketingGate = new MarketingGateAgent();
    const qualityGate = new QualityGateAgent();
    const reviewPath = path.join(cwd, 'review-article.md');
    let repairs = 0;
    let visualRepairAttempted = false;

    while (true) {
      const seoOptimized = await seoAgent.run(draftPath, seoPath);
      writeFileSync(reviewPath, JSON.stringify(seoOptimized, null, 2), 'utf-8');
      const factCheckResult = await factChecker.run(reviewPath, researchPath, factCheckPath, topic);
      const techReviewResult = await techReviewer.run(reviewPath, techReviewPath);
      const auditResult = await seoAgent.audit(seoPath, brief, seoAuditPath);
      const marketingOut = await marketingGate.run(seoPath, marketingPath);
      const qualityOut = await qualityGate.run(seoPath, factCheckPath, techReviewPath, qualityPath);

      const factErrors = factCheckResult.filter(f => f.status === 'incorrect');
      const techHighIssues = techReviewResult.filter(t => t.severity === 'high');
      const highIssues = qualityOut.issues.filter(i => i.severity === 'high');
      // Een gunstig eindredacteur-oordeel mag openstaande fouten niet overrulen.
      const gates = evaluateGates(
        factErrors.length + techHighIssues.length + highIssues.length,
        auditResult.passed, marketingOut.passed
      );
      const feedbackLines = [
        ...factErrors.map(f => `- [FEITFOUT] "${f.claim}": ${f.reason}. Suggestie: ${f.suggestion}`),
        ...techHighIssues.map(t => `- [TECHNISCH] ${t.issue}. Aanbeveling: ${t.recommendation}`),
        ...highIssues.map(i => `- [EINDCONTROLE HIGH] ${i.issue}`),
      ];
      if (!auditResult.passed) feedbackLines.push(`[SEO/GEO] ${auditResult.blockingIssues.join('; ')}. ${auditResult.feedback}`);
      if (!marketingOut.passed) feedbackLines.push(`[BRUIKBAARHEID] ${marketingOut.feedback}`);
      const missedVisual = marketingOut.visualOpportunity && !marketingOut.visualProvided;
      // Een optionele visual krijgt hoogstens één poging, alleen nadat harde gates slagen.
      const repairVisual = gates.canPublish && missedVisual && !visualRepairAttempted;
      if (repairs < MAX_REPAIR_ATTEMPTS && (!gates.canPublish || repairVisual)) {
        if (repairVisual) {
          visualRepairAttempted = true;
          feedbackLines.push(`[VISUAL-KANS] Voeg een [[VISUAL]]-marker + onderbouwde visual-data toe. ${marketingOut.feedback}`);
        }
        repairs++;
        console.log(`\nGerichte correctie ${repairs}/${MAX_REPAIR_ATTEMPTS}:\n${feedbackLines.join('\n')}`);
        // Herstel de versie waarop de feedback betrekking heeft, niet een oudere draft.
        writeFileSync(draftPath, seoOptimized.content, 'utf-8');
        writeFileSync(draftPath.replace(/\.md$/, '.extras.json'), JSON.stringify({ visual: seoOptimized.visual }), 'utf-8');
        await writerAgent.run(topic, researchPath, draftPath,
          `${feedbackLines.join('\n')}\n\nControleer dezelfde claims ook in deze SEO-nevenvelden; verwerk noodzakelijke correcties in het artikel zodat SEO ze opnieuw kan afleiden:\n${JSON.stringify({ ...seoOptimized, content: undefined })}`,
          contentType, brief);
        continue; // alle controles opnieuw; geen rapporten van een eerdere versie hergebruiken
      }

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
        if (gates.factualBlocking) console.log(`- Factual/technical: ${factErrors.length + techHighIssues.length + highIssues.length} blokkerende fout(en). ${JSON.stringify({ factErrors, techHighIssues, highIssues }, null, 2)}`);
        if (gates.seoBlocking) console.log(`- SEO/GEO onvoldoende: ${JSON.stringify(auditResult.blockingIssues, null, 2)}`);
        if (gates.usefulnessBlocking) console.log(`- Practical usefulness te laag (${marketingOut.scores.practicalUsefulness}/10, minimaal 4 vereist): ${marketingOut.feedback}`);
        throw new Error(`Publicatie geblokkeerd na ${repairs} correctiepogingen.`);
      }

      return;
    }
  } catch (err) {
    console.error('\n💥 FATALE FOUT in pipeline:', err);
    throw err;
  }
}

// Alleen automatisch draaien bij directe CLI-aanroep (npx tsx run-pipeline.ts),
// niet bij een import — anders triggert bv. een test die pickNextPlannedItem
// importeert de hele live pipeline als bijwerking van het importeren.
if (process.argv[1] && process.argv[1].endsWith('run-pipeline.ts')) {
  runPipeline().catch(() => { process.exitCode = 1; });
}
