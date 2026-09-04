import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'seer-scop-waarde-airco-verbruik-berekenen')!;

const markdown0 = `
Een klant vraagt tijdens een adviesgesprek wat een lucht-lucht warmtepomp op jaarbasis aan elektriciteit verbruikt. Wie enkel afgaat op een statische COP-waarde uit de brochure, noemt al snel een getal dat in de praktijk flink kan afwijken. Met een heldere onderbouwing op basis van de seizoensrendementen SEER en SCOP berekent u als installateur het verwachte stroomverbruik in kilowattuur (kWh) realistisch door. Dit geeft uw klant directe duidelijkheid en voorkomt misverstanden over een onverwacht hoge energierekening.

## Wat is het verschil tussen EER/COP en SEER/SCOP?

Bij het beoordelen van het rendement van airconditioning en warmtepompen worden twee typen kengetallen gebruikt:

- **EER (Energy Efficiency Ratio) en COP (Coefficient of Performance):** Deze geven het rendement weer op één specifiek testpunt bij nominale vollast (bijvoorbeeld bij een vaste buiten- en binnentemperatuur).
- **SEER (Seasonal Energy Efficiency Ratio) en SCOP (Seasonal Coefficient of Performance):** Deze berekenen het gemiddelde seizoensrendement over een heel jaar. Hierin worden deellastwerking, opstart- en stopverliezen, ontdooicycli en temperatuurschommelingen meegenomen.

De Europese norm NEN-EN 14825 definieert hiervoor de testomstandigheden, deellastcondities en rekenmethodes per klimaatzone. Op Nederlandse productbladen wordt doorgaans de "gemiddelde" klimaatzone gebruikt.

## Formule: Jaarlijks stroomverbruik airco berekenen (EN 14825)

Om van het seizoensrendement naar een verwacht jaarlijks elektriciteitsverbruik te komen, gebruikt u de formules uit de Europese normering:

- **Jaarverbruik koelen (kWh) =** (Ontwerplast koelen Pdesignc in kW × Vollasturen koelen) / SEER
- **Jaarverbruik verwarmen (kWh) =** (Ontwerplast verwarmen Pdesignh in kW × Vollasturen verwarmen) / SCOP

Volgens de EN 14825-normering wordt voor de gemiddelde klimaatzone gerekend met vaste referentiewaarden voor het aantal vollasturen:
- **350 vollasturen** voor koelen per jaar.
- **1400 vollasturen** voor verwarmen per jaar.

## Rekenvoorbeelden: Jaarverbruik koelen en verwarmen in kWh

Om deze systematiek toe te passen in een offerte, kijken we naar twee concrete rekenvoorbeelden:

1. **Koelverbruik:** Een airco met een ontwerplast (Pdesignc) van 3,5 kW en een SEER van 8,5 verbruikt op jaarbasis:
   (3,5 kW × 350 uur) / 8,5 = **144,12 kWh per jaar**.

2. **Verwarmingsverbruik:** Een lucht-lucht warmtepomp met een ontwerplast (Pdesignh) van 4,0 kW en een SCOP van 4,6 verbruikt op jaarbasis:
   (4,0 kW × 1400 uur) / 4,6 = **1217,39 kWh per jaar**.

| Toepassing | Ontwerplast (kW) | Rendement (SEER/SCOP) | Genormeerde vollasturen | Berekend jaarverbruik (kWh) |
| :--- | :--- | :--- | :--- | :--- |
| **Koelen** | 3,5 kW (Pdesignc) | 8,5 (SEER) | 350 uur | 144,12 kWh |
| **Verwarmen** | 4,0 kW (Pdesignh) | 4,6 (SCOP) | 1400 uur | 1217,39 kWh |

`;
const markdown1 = `

## Invloedsfactoren op het werkelijke elektriciteitsverbruik

Het theoretische jaarverbruik op basis van NEN-EN 14825 geeft een goede onderlinge vergelijking tussen toestellen. Het daadwerkelijke praktijkverbruik kan hiervan afwijken door verschillende factoren:

- **Isolatiegraad van het pand:** Een matige schilisolatie verhoogt de benodigde warmte- of koelvraag.
- **Gebruiksgedrag en temperatuurinstelling:** De gekozen binnentemperatuur beïnvloedt direct de belasting van de compressor.
- **Buitentemperatuurverloop:** Bij zeer lage buitentemperaturen neemt het momentane stroomverbruik toe en het rendement af, wat invloed heeft op het totale stroomverbruik wanneer de installatie als hoofdverwarming dient.
- **Invertertechnologie en dimensionering:** Inverter-systemen passen hun vermogen aan op de deellastvraag, wat een gunstiger rendement oplevert dan frequent in- en uitschakelen bij verkeerde dimensionering.

## Nauwkeurig onderbouwen tijdens het offertetraject

In een advies- of offertetraject onderbouwt u het verwachte verbruik helder door de theoretische normberekening als uitgangspunt te nemen, en daarbij de invloed van de specifieke woonsituatie toe te lichten. Zo weet de klant precies waar de cijfers vandaan komen.

Door verschillende scenario's vooraf nauwkeurig door te rekenen, biedt u als installateur zekerheid vóór het uitbrengen van de offerte. EnerCalculatie helpt installateurs om deze berekeningen en scenariovergelijkingen snel, gestructureerd en onderbouwd uit te voeren in het dagelijkse adviesproces.

Op welke wijze onderbouwt u momenteel het jaarlijkse energieverbruik in uw offertes richting de klant?
`;

export function SeerScopWaardeAircoVerbruikBerekenenArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Berekend jaarlijks elektriciteitsverbruik volgens EN 14825","unit":"kWh","items":[{"label":"Koelen (3,5 kW, SEER 8,5)","value":144.12},{"label":"Verwarmen (4,0 kW, SCOP 4,6)","value":1217.39}],"illustrative":false}} />
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
