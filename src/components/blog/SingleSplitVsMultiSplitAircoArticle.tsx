import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'single-split-vs-multi-split-airco')!;

const markdown0 = `
Bij de keuze tussen drie afzonderlijke single-split airco's of één centrale multi-split buitenunit bepalen deellastrendement, geluidsnormen en leidinglengtes de beste oplossing. Een ondoordachte keuze leidt in de praktijk tot teleurstellend energieverbruik, geluidsoverlast op de perceelgrens of capaciteitsverlies. Om de keuze tussen single-split en multi-split onderbouwd te adviseren, berekent u de thermische koellast per zone, toetst u het deellastrendement (SEER) bij het verwachte gebruikspatroon en beoordeelt u de elektrische en bouwkundige randvoorwaarden.

## Koelvermogen berekenen per zone en de gelijktijdigheidsfactor

Het benodigde koelvermogen per zone wordt in de woningbouw indicatief berekend met een vuistregel van **30 tot 50 Watt per kubieke meter (W/m³)** ruimte-inhoud:
* **30 W/m³:** goed geïsoleerde ruimtes (energielabel A/B) met weinig direct glas op het zuiden of aanwezige buitenzonwering.
* **40 W/m³:** gemiddeld geïsoleerde ruimtes met een normaal glasoppervlak.
* **50 W/m³:** matig geïsoleerde ruimtes, woningen met een plat dak of veel beglazing op het zuiden/westen zonder zonwering.

Voor een exacte berekening volgens NEN/ISSO-normen onderbouwt u de warmtelast op basis van de thermische schil (Rc-waarden), de zontoetredingsfactor van de beglazing (g-waarde), de oriëntatie en interne warmtebronnen zoals apparatuur en bewoners.

`;
const markdown1 = `

Bij een multi-split systeem hoeft de buitenunit doorgaans niet de opgetelde maximale piekcapaciteit van de binnenunits te bezitten. Omdat de maximale koellast van een woonkamer (namiddag) zelden samenvalt met die van slaapkamers ('s nachts), wordt gewerkt met een **gelijktijdigheidsfactor**. De totale aangesloten capaciteit van de binnenunits kan de nominale capaciteit van de buitenunit overschrijden tot **120% tot 130%** (wat neerkomt op een dimensioneringsverhouding van 80% tot 100% ten opzichte van de som van de binnencapaciteiten).

## SEER-rendement bij deellast: Single-split versus multi-split

De energie-efficiëntie voor koeling wordt uitgedrukt in de **SEER** (Seasonal Energy Efficiency Ratio, conform EN 14825). Hoe een opstelling in de praktijk presteert, hangt sterk af van het deellastgedrag:

* **Single-split:** beschikt over een eigen inverter-buitenunit met een lage minimale modulatiegrens. Wanneer slechts één ruimte een lichte koelvraag heeft, regelt de compressor terug naar een zeer laag elektrisch vermogen. Dit levert in deellast vaak het hoogste seizoensrendement op.
* **Multi-split:** gebruikt één zwaardere buitenunit (bijvoorbeeld 7,0 kWth). Wanneer 's nachts uitsluitend één kleine slaapkamerunit (2,0 kWth) koeling vraagt, draait de grote buitenunit op zijn minimale modulatiegrens. Hierdoor treedt sneller een aan/uit-pendelgedrag op, wat het deellastrendement drukt.

Een multi-split is vooral energiezuinig wanneer meerdere zones gelijktijdig worden gekoeld. Wordt hoofdzakelijk één specifieke ruimte incidenteel gekoeld, dan behalen afzonderlijke single-split systemen doorgaans een gunstiger jaarlijks energieverbruik.

## Bouwkundige en elektrische randvoorwaarden bij installatie

Naast het vermogen bepalen de fysieke en elektrische randvoorwaarden de haalbaarheid op locatie:

| Randvoorwaarde | Norm / Richtlijn | Aandachtspunt voor de installateur |
| :--- | :--- | :--- |
| **Geluidseisen** | Besluit bouwwerken leefomgeving (BBL) | Maximaal **45 dB(A)** overdag en **40 dB(A)** 's nachts (23:00–07:00 uur) op de perceelgrens of gevel van buren. Één multi-split buitenunit vereist minder opstellingsruimte, maar produceert meer brongeluid dan een enkele lichte single-split. |
| **Leidinglengte & drukval** | Fabrikantvoorschrift / NEN | Overschrijding van de voorgevulde leidinglengte (meestal **7,5 tot 15 meter**) vereist het toevoegen van extra koudemiddel. Lange leidingtrajecten en grote hoogteverschillen verhogen de drukval, wat kan leiden tot capaciteitsverlies en een lagere SEER. |
| **Elektrische voeding** | NEN 1010 | Het elektrisch vermogen (kWe) is gelijk aan het koelvermogen (kWth) gedeeld door de SEER. Een single-split van 3,5 kWth verbruikt bij vollast circa 1,0 kWe (4,3 A) op een 1-fase 16A groep. Zware multi-splits (>10 kWth) vereisen een dedicated groep of een 3-fase aansluiting om overbelasting van de hoofdzekering te voorkomen. |

Om overbelasting van een specifieke fase-hoofdzekering (bijvoorbeeld bij een 3x25A aansluiting) te voorkomen, dient conform goed installateurschap en richtlijnen van de netbeheerder de elektrische belasting bij zwaardere afnemers zo gelijkmatig mogelijk over de fasen te worden verdeeld. Hoewel wettelijke normen voor fase-onbalans uit de Netcode primair gericht zijn op invoedingsapparatuur, kan ook bij afnameapparatuur een sterke scheefbelasting leiden tot het aanspreken van de hoofdzekering.

### Praktijkcase: Keuzeonderbouwing in een adviesgesprek

#### Uitgangssituatie
Een woning heeft een woonkamer (koellast 4,5 kWth) en twee slaapkamers (elk 2,0 kWth). Totale som van de binnenunits: 8,5 kWth.

#### Berekening & Keuze
1. **Multi-split optie:** Met een gelijktijdigheidsfactor van 80% volstaat een buitenunit van 6,8 kWth (8,5 kWth × 0,8). Dit bespaart gevelruimte en installatiewerk buiten.
2. **Single-split optie:** Als de klant aangeeft de slaapkamers uitsluitend 's nachts te koelen en de woonkamer alleen overdag, draait de multi-split buitenunit hoofdzakelijk in extreme deellast. In die situatie bieden losse single-split units per zone een hoger seizoensrendement en een lagere energierekening.

Door deze koellast, deellastprofielen en geluidsmetingen voorafgaand aan de offerte uit te werken, geeft u de klant een aantoonbaar en technisch onderbouwd advies.

Hoe onderbouwt u momenteel het deellastverbruik van een multi-split opstelling richting uw klanten wanneer slechts één zone actief is?
`;

export function SingleSplitVsMultiSplitAircoArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Indicatief koelvermogen per isolatiegraad (W/m³)","unit":"W/m³","items":[{"label":"Goed geïsoleerd (Label A/B)","value":30},{"label":"Gemiddeld geïsoleerd","value":40},{"label":"Matig geïsoleerd / Plat dak","value":50}],"illustrative":false}} />
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
