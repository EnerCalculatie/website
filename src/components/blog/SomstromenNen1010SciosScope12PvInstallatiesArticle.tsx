import { AlertTriangle, ArrowRight, ShieldCheck, GitBranch, Layers, Ruler, ClipboardCheck } from 'lucide-react';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import { ArticleVisual } from './ArticleVisual';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'somstromen-nen-1010-scios-scope-12-pv-installaties')!;

// Markdown-fragmenten — opgesplitst zodat de visuals (hero/somstroom-diagram/
// procesflow) op de juiste plek in het betoog landen i.p.v. altijd onderaan.
const intro = `
## Hoe ontstaat een somstroom?

Een somstroom ontstaat wanneer meerdere stroombronnen gelijktijdig invoeden op hetzelfde deel van de installatie. Bij een PV-installatie is dat typisch het net én de omvormer, die allebei via dezelfde aardlekschakelaar lopen.

De stromen tellen dan gewoon bij elkaar op. Een netvoeding van 25A plus een PV-invoeding van 16A geeft op papier 41A — meer dan de nominale stroom van een standaard 40A-aardlekschakelaar.

Dit is een **vereenvoudigd rekenvoorbeeld**, geen automatische diagnose. Of dit bij een specifieke installatie ook echt gebeurt, hangt af van de exacte configuratie: welke belastingen dezelfde beveiliging delen, de gelijktijdigheidsfactor, en hoe lang beide bronnen daadwerkelijk samen op vol vermogen draaien.

| Situatie               | Voorbeeld |
| ---------------------- | --------: |
| Netvoeding             |      25 A |
| PV-invoeding           |      16 A |
| Gecombineerde situatie |      41 A |
| Nominale beveiliging   |      40 A |

Een aardlekschakelaar die structureel boven zijn nominale stroom belast wordt, is niet ontworpen om dat vol te houden — dat is een reëel aandachtspunt, geen theoretische bijzaak. Reken het na in plaats van het te schatten.
`;

const checklistIntro = `
## Welke vier dingen moet je controleren?

Vier punten die in de praktijk het vaakst over het hoofd worden gezien bij een PV-aansluiting op een bestaande installatie:
`;

const scope12Intro = `
## Wat heeft Scope 12 hiermee te maken?

SCIOS Scope 12 is een inspectieschema gericht op het beoordelen van brandrisico bij (met name bestaande) PV-installaties — thermografisch en technisch onderzoek van aansluitingen, bekabeling en beveiligingen. Het is geen synoniem voor "voldoet aan NEN 1010": Scope 12 ís een inspectie, NEN 1010 is de installatienorm waar de installatie aan hoort te voldoen. Een Scope 12-inspecteur toetst dus mede óf dat is gebeurd.

Steeds meer verzekeraars vragen om een geldig Scope 12-rapport bij zakelijke PV-installaties boven een bepaald vermogen, vaak als voorwaarde voor dekking. *Welke verzekeraar dat exact eist, en vanaf welk vermogen, verschilt per polis — controleer dit bij de verzekeraar van de klant, niet als vaste regel.*

Belangrijk: een Scope 12-rapport garandeert geen afwezigheid van risico. Het is een momentopname van de inspecteur, geen vervanging van een correct ontwerp, installatie en oplevering daarvoor.
`;

const comparisonIntro = `
## Een goede offerte is meer dan een prijs

Een offerte die alleen componenten en een totaalprijs toont, laat de klant zelf gissen naar wat er technisch is gecontroleerd. Een offerte met expliciete technische onderbouwing maakt dat verschil zichtbaar:
`;

const enercalcSection = `
## Van technische controle naar offerte

[Bij het uitbreiden van een bestaande PV-installatie](/blog/zonnepanelen-installatie-uitbreiden-omvormer-regels) of het combineren met een [laadpaal op dezelfde 3x25A-aansluiting](/blog/laadpaal-netaansluiting-capaciteit-3x25a) speelt dezelfde vraag: is er nog ruimte, en waar zit die grens? EnerCalculatie helpt installateurs om technische uitgangspunten, berekeningen en klantadvies gestructureerd vast te leggen in het offertetraject — niet om NEN 1010- of Scope 12-compliance automatisch te garanderen. De beoordeling van de installatie blijft bij de installateur.
`;

export function SomstromenNen1010SciosScope12PvInstallatiesArticle() {
  return (
    <BlogPostLayout post={post}>
      {/* Badges + hero-schema. not-prose zodat Tailwind's prose-stijlen de
          custom layout niet overschrijven — zelfde patroon als de Kernpunten-
          box in BlogPostLayout. */}
      <div className="not-prose mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {['NEN 1010', 'Somstromen', 'Scope 12'].map((label) => (
            <span key={label} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary-text border border-brand-primary/20">
              {label}
            </span>
          ))}
        </div>

        {/* Hero: net + PV op gedeelde beveiliging → 41A over een 40A-grens.
            Bewust HTML/flex i.p.v. losse SVG-paden — responsive zonder
            viewBox-gereken, en leesbaar in licht/donker via Tailwind-tokens. */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-4">
            <div className="rounded-xl border-2 border-slate-300 bg-white p-4 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Net</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">25 A</p>
            </div>
            <div className="rounded-xl border-2 border-brand-primary/40 bg-white p-4 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">PV-omvormer</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">16 A</p>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-6 bg-slate-300" />
          </div>
          <div className="rounded-xl border-2 border-slate-400 bg-white p-4 text-center mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Gedeelde aardlekschakelaar</p>
            <p className="text-lg font-bold text-slate-700">nominaal 40 A</p>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-6 bg-slate-300" />
          </div>
          <div className="flex items-center justify-center gap-3 rounded-xl border-2 border-amber-400 bg-amber-50 p-4">
            <AlertTriangle size={28} className="text-amber-600 shrink-0" aria-hidden="true" />
            <p className="text-xl sm:text-2xl font-black text-amber-800">41 A door een 40 A-beveiliging</p>
          </div>
        </div>
      </div>

      {/* De kern in 30 seconden */}
      <div className="not-prose mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">De kern in 30 seconden</h2>
        <div className="rounded-2xl bg-slate-900 p-6 sm:p-8 text-center mb-4">
          <p className="text-2xl sm:text-4xl font-black text-white">25A net + 16A PV = <span className="text-brand-primary">41A</span></p>
        </div>
        <p className="text-slate-700 leading-relaxed">
          Als beide bronnen dezelfde aardlekschakelaar delen, telt hun stroom op. Bij een 40A-beveiliging is 41A een overschrijding die u vóór de offerte moet doorrekenen, niet pas bij de oplevering ontdekken. De exacte impact hangt af van de configuratie van de installatie.
        </p>
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {intro}
      </ReactMarkdown>

      <ArticleVisual
        visual={{
          type: 'bar_chart',
          title: 'Somstroom versus nominale beveiliging',
          caption: 'Rekenvoorbeeld: gecombineerde stroom (41A) tegen de nominale stroom van de beveiliging (40A). Werkelijke waarden zijn installatie-afhankelijk.',
          unit: 'A',
          items: [
            { label: 'Netvoeding', value: 25, kleur: '#94a3b8' },
            { label: 'PV-invoeding', value: 16, kleur: '#0ea5e9' },
            { label: 'Gecombineerd', value: 41, kleur: '#f59e0b' },
            { label: 'Nominale beveiliging', value: 40, kleur: '#ef4444' },
          ],
        }}
      />

      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {checklistIntro}
      </ReactMarkdown>

      {/* Vier controlekaarten */}
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: ShieldCheck, title: '1. Beveiliging', body: 'Welke beveiliging wordt daadwerkelijk belast, en wat is de nominale stroom daarvan?' },
          { icon: Layers, title: '2. Somstromen', body: 'Kunnen verschillende bronnen gelijktijdig stroom leveren aan hetzelfde deel van de installatie?' },
          { icon: GitBranch, title: '3. Faseverdeling', body: 'Hoe zijn netvoeding, PV-invoeding en overige belastingen verdeeld over de fasen?' },
          { icon: Ruler, title: '4. Selectiviteit', body: 'Blijft de beveiligingsketen correct functioneren bij een fout of overbelasting?' },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Icon size={22} className="text-brand-primary-text mb-3" aria-hidden="true" />
            <p className="font-bold text-slate-900 mb-1">{title}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div className="not-prose mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardCheck size={20} className="text-brand-primary-text" aria-hidden="true" />
          <p className="font-bold text-slate-900">Checklist vóór je de PV-offerte verstuurt</p>
        </div>
        <ul className="space-y-2 mb-3">
          {[
            'Hoofdaansluiting gecontroleerd',
            'Omvormervermogen gecontroleerd',
            'Faseverdeling gecontroleerd',
            'Somstromen beoordeeld',
            'Beveiligingen gecontroleerd',
            'Selectiviteit beoordeeld',
            'Relevante opleverdocumentatie bepaald',
            'Eventuele Scope 12-eisen gecontroleerd',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-slate-700">
              <span className="w-4 h-4 rounded border-2 border-slate-400 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500">
          Praktische controle voor eigen gebruik — geen vervanging van de toepasselijke normen, aansluitvoorwaarden of inspectie-eisen.
        </p>
      </div>

      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {scope12Intro}
      </ReactMarkdown>

      {/* Procesflow: ontwerp -> berekening -> installatie -> oplevering -> inspectie */}
      <div className="not-prose mb-10">
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          {['Ontwerp', 'Technische berekening', 'Installatie', 'Oplevercontrole', 'Inspectie / Scope 12'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-center">
                <p className="text-sm font-bold text-slate-800">{step}</p>
              </div>
              {i < arr.length - 1 && (
                <ArrowRight size={18} className="text-slate-300 shrink-0 rotate-90 sm:rotate-0" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {comparisonIntro}
      </ReactMarkdown>

      <ArticleVisual
        visual={{
          type: 'comparison',
          columns: ['Alleen een prijs', 'Technisch onderbouwde offerte'],
          rows: [
            { label: 'Beveiliging', left: 'Losse componenten beoordeeld', right: 'Somstroom getoetst aan nominale beveiliging' },
            { label: 'Faseverdeling', left: 'Niet expliciet benoemd', right: 'Verdeling over fasen onderbouwd' },
            { label: 'Documentatie', left: 'Geen opleverdocumentatie', right: 'Relevante normen/inspectie-eisen benoemd' },
          ],
        }}
      />

      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {enercalcSection}
      </ReactMarkdown>

      {/* TODO (Pascal): screenshot EnerCalculatie hier toevoegen — zie briefing
          in de chatrespons voor voorkeur (calculatie/advies/technische gegevens/
          rapport) + voorgestelde alt-tekst en caption. Bewust geen placeholder-
          <img> ingevoegd — geen bestaand asset in deze repo om naar te wijzen. */}
    </BlogPostLayout>
  );
}

const markdownComponents: Components = {
  h2: ({ node: _node, ...props }) => <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4" {...props} />,
  h3: ({ node: _node, ...props }) => <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3" {...props} />,
  p: ({ node: _node, ...props }) => <p className="text-slate-700 leading-relaxed mb-4" {...props} />,
  ul: ({ node: _node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700" {...props} />,
  ol: ({ node: _node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-700" {...props} />,
  li: ({ node: _node, ...props }) => <li className="leading-relaxed" {...props} />,
  strong: ({ node: _node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
  em: ({ node: _node, ...props }) => <em className="text-slate-600" {...props} />,
  a: ({ node: _node, ...props }) => <a className="text-brand-primary-text hover:underline font-semibold" {...props} />,
  hr: ({ node: _node, ...props }) => <hr className="my-8 border-slate-200" {...props} />,
  blockquote: ({ node: _node, ...props }) => <blockquote className="border-l-4 border-brand-primary pl-4 my-4 italic text-slate-600 bg-slate-50 py-2 pr-4 rounded-r" {...props} />,
  table: ({ node: _node, ...props }) => <div className="overflow-x-auto mb-6"><table className="w-full border-collapse text-sm" {...props} /></div>,
  thead: ({ node: _node, ...props }) => <thead className="bg-slate-100" {...props} />,
  th: ({ node: _node, ...props }) => <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-900" {...props} />,
  td: ({ node: _node, ...props }) => <td className="border border-slate-200 px-3 py-2 text-slate-700" {...props} />,
};
