import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'fase-ongelijkheid-scheefbelasting-voorkomen-3-fasen')!;

const markdown0 = `
Een 1-fase omvormer of laadpaal van 16A vraagt op een standaard 3x25A huisaansluiting direct 3,68 kW van een enkele fase. Indien overige huishoudelijke apparaten op diezelfde fase zijn aangesloten, dreigt overbelasting van de fasezekering en het uitschakelen van de hoofdschakelaar, terwijl de overige twee fasen onbelast blijven. U voorkomt scheefbelasting door grote 1-fase vermogens fysiek te roteren over L1, L2 en L3, gecombineerd met actieve bewaking via Dynamic Load Balancing en een overstap naar 3-fase apparatuur zodra het vermogen de 3,68 kW overstijgt.

## Normen NEN 1010 en Netcode voor faseverdeling

De NEN 1010 schrijft voor dat het ontwerp van een elektrische installatie gericht dient te zijn op een zo gelijkmatig mogelijke verdeling van belastingen over de beschikbare fasen (L1, L2 en L3). Dit voorkomt scheefbelasting en overmatige stroom door de nulgeleider.

Voor invoeding door zonnepanelen stelt de Netcode Elektriciteit duidelijke grenzen aan enkelfasige apparatuur op kleinverbruikaansluitingen:
- **Maximale enkelfasige invoeding:** 16 Ampère (circa 3,68 kW / kVA) per fase.
- **Selectieve afzekering bij 3x25A:** Een maximale afzekering van 16A per fase (rekening houdend met de factor 1,6 voor selectiviteit).
- **Maximaal 3-fase vermogen bij 3x25A:** 3 × 16A = 48A totaal, oftewel circa 11 kW.

Boven een vermogen van 3,68 kW (16A) dient doorgaans een overstap te worden gemaakt naar een 3-fase omvormer om fase-onbalans op het net te vermijden.

`;
const markdown1 = `

## Wat zijn de risico's en gevolgen van scheefbelasting?

Wanneer 1-fase apparaten ondoordacht op een 3-fase aansluiting worden aangesloten, ontstaan er spanningsverschuivingen in de installatie. Dit heeft diverse technische consequenties:

- **Hoge nulstroom:** Langdurige scheefbelasting leidt tot een verhoogde stroomsterkte door de nulgeleider.
- **Opwarming en uitval:** Schakelapparatuur warmt onnodig op, wat kan leiden tot het voortijdig uitschakelen van de hoofdzekering of hoofdschakelaar.
- **Omvormeruitval door overspanning:** Spanningsstijging op een sterk invoedende fase veroorzaakt overspanning, waardoor de zonnepaneelomvormer uit veiligheid automatisch uitschakelt (terwijl een zwaar belaste fase juist leidt tot spanningsdaling).
- **Risico van somstromen op de verzamelrail:** Als een PV-omvormer of batterijsysteem via een eigen groep stroom invoert op de interne verdelerrail, telt deze invoedende stroom op bij de netstroom (bijvoorbeeld 25A net + 16A omvormer = 41A). Onderliggende aardlekschakelaars of de interne bedrading (vaak gedimensioneerd op max. 40A) kunnen hierdoor overbelast raken.

## 1-fase omvormer en laadpaal verdelen: fysiek roteren

Het verdelen van grote verbruikers en opwekkers over de fasen begint bij de fysieke indeling in de groepenkast. Het praktijkvoorschrift voor installateurs is om 1-fase apparaten doordacht te roteren:

| Component | Aangesloten fase | Vermogen / Beveiliging |
| :--- | :--- | :--- |
| 1-fase PV-omvormer | L1 | Max. 16A (3,68 kW) |
| 1-fase Laadpaal | L2 | Max. 16A (3,68 kW) |
| Overige zware verbruikers | L3 | Max. 16A (3,68 kW) |

Indien de stroomvraag op een enkele fase hoger wordt dan 16A of niet meer binnen de hoofdzekering van 3x25A past, is de inzet van een 3-fase omvormer of 3-fase laadpaal noodzakelijk.

## Dynamic Load Balancing en automatische fasewisseling

Naast een fysieke verdeling biedt slimme sturing aanvullende bescherming tegen fase-overbelasting:

- **Dynamic Load Balancing (DLB):** DLB meet via de P1-poort van de slimme meter of met externe CT-meetsensors continu de actuele stroomsterkte per fase. Dreigt een fasezekering overbelast te raken, dan schroeft de laadpaal de laadstroom in real-time terug.
- **Automatische fasewisseling:** Geavanceerde laadpalen kunnen dynamisch schakelen tussen 1-fase laden (vanaf 1,4 kW / 6A) en 3-fase laden (tot 11 kW / 16A of 22 kW / 32A). Zo wordt geoptimaliseerd op basis van het beschikbare zonne-overschot of de beschikbare capaciteit per fase.

### Praktijkcase: Fase-ongelijkheid oplossen bij 3x25A

In een residentiële installatie met een 3x25A aansluiting raakte de hoofdzekering regelmatig getript doordat een 1-fase omvormer van 3,68 kW en een 1-fase laadpaal van 16A op dezelfde fase L1 geplaatst waren.

**Oplossing en berekening:**
1. **Fysieke rotatie:** De omvormer is behouden op L1, terwijl de laadpaal is verplaatst naar L2.
2. **Inzet van DLB:** Via een P1-verbinding wordt de belasting op L1, L2 en L3 continu gemonitord.
3. **Resultaat:** De belasting per fase blijft ruim onder de maximale grens van 25A, waardoor trips van de hoofdzekering zijn verholpen zonder netverzwaring.

## Beslisboom voor faseverdeling bij installaties

| Situatie in de woning | Geadviseerde oplossing | Aandachtspunt |
| :--- | :--- | :--- |
| Enkele PV-installatie ≤ 3,68 kW | 1-fase omvormer op L1 | Maximaal 16A afzekeren op 3x25A |
| PV-installatie > 3,68 kW | 3-fase omvormer over L1, L2 en L3 | Boven 16A vereist volgens Netcode |
| 1-fase PV + 1-fase Laadpaal | Roteer apparaten over L1 en L2 | Pas Dynamic Load Balancing toe via P1/CT |
| Hoog laadvermogen (tot 11 kW) | 3-fase laadpaal met fasewisseling | Bewaak de maximale fasebelasting via Dynamic Load Balancing en waarborg selectiviteit van de beveiliging |

Hoe borgt u in uw huidige ontwerpen dat de fasebelasting ook bij toekomstige uitbreidingen van de klant in balans blijft?
`;

export function FaseOngelijkheidScheefbelastingVoorkomen3FasenArticle() {
  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
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
        }}>{markdown0}</ReactMarkdown>
      <ArticleVisual visual={{"type":"bar_chart","title":"Maximale vermogensgrens per fase vs 3-fase totaal op 3x25A","unit":"kW","items":[{"label":"Max 1-fase invoeding/afname (16A)","value":3.68},{"label":"Max 3-fase vermogen op 3x25A (3x16A)","value":11}],"illustrative":false}} />
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
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
        }}>{markdown1}</ReactMarkdown>
    </BlogPostLayout>
  );
}
