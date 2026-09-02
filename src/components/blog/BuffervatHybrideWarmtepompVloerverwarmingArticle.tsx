import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'buffervat-hybride-warmtepomp-vloerverwarming')!;

const markdown0 = `
Een hybride warmtepomp met vloerverwarming lijkt op het eerste gezicht een ideale combinatie waarin een buffervat overbodig is. Toch kan een te lage waterinhoud leiden tot frequent in- en uitschakelen (pendelen) of storingen tijdens de ontdooicyclus. Het dimensioneren van een buffervat gebeurt door de gegarandeerde open waterinhoud af te stemmen op het warmtepompvermogen en het gekozen hydraulische schema (serieel of parallel).

## Is een buffervat noodzakelijk bij een hybride warmtepomp met vloerverwarming?

Een buffervat is niet in elke situatie noodzakelijk, mits er continu voldoende onbelemmerde waterinhoud en doorstroming gegarandeerd is. Dit kan bijvoorbeeld worden gerealiseerd met een open zone zonder dichtsturende thermostaatkranen.

Fabrikanten schrijven een minimale volumestroom voor om een veilige warmteoverdracht over de platenwisselaar te garanderen. Voor een hybride warmtepomp van 6 tot 8 kW ligt deze eis doorgaans tussen de 12 en 18 liter per minuut. Zodra naregelingen de vloerverwarmingslussen kunnen afsluiten, neemt de beschikbare doorstroming af en wordt een buffervat alsnog noodzakelijk.

## Hoe voorkomt de juiste inhoud pendelen en ontdooiproblemen?

Het frequent in- en uitschakelen van de warmtepomp (pendelen) ontstaat wanneer het systeem de opgewekte warmte niet snel genoeg kwijt kan. Om pendelen te voorkomen, is een minimale runtime van vaak 10 tot 15 minuten gewenst. Voldoende thermische massa en waterinhoud zorgen ervoor dat deze draaitijd gehaald wordt.

Daarnaast heeft een lucht-water warmtepomp tijdens de ontdooicyclus (defrost) kortstondig een minimale waterinhoud nodig van circa 10 tot 15 liter per kW vermogen. Deze inhoud levert de benodigde verdampingswarmte. Bij een te klein watervolume koelt de installatie te snel af, wat kan leiden tot storingen.

## Verschil in dimensionering: serieel vs. parallel buffervat

De hydraulische aansluiting bepaalt op welke manier de inhoud van het vat berekend wordt:

- **Serieel aangesloten buffervat:** Dit vat staat in-line in de retourleiding. Het volume wordt gedimensioneerd op het verschil tussen de door de fabrikant geëiste minimale systeeminhoud en het effectief beschikbare open afgiftevolume.
- **Parallel aangesloten buffervat:** Een parallel vat fungeert als hydraulische scheiding en vereist een secundaire pomp. Dit leidt tot een grotere inhoudsbehoefte ten opzichte van een seriële opstelling.

Als indicatieve richtwaarde wordt voor een parallel aangesloten vat vaak 15 tot 20 liter per kW vermogen van de warmtepomp genoemd, maar de fabrikantvoorschriften en het specifieke systeemontwerp zijn leidend.

## Rekenvoorbeelden voor de inhoud van het buffervat

Om het volume van de installatie te bepalen, kan de waterinhoud van de leidingen berekend worden. Vloerverwarmingsslangen met een diameter van 16x2 mm bevatten circa 0,113 liter water per strekkende meter. Bij een hart-op-hart afstand van 10 cm komt dit neer op ongeveer 1,13 liter water per m² vloeroppervlak.

In onderstaande tabel staan twee rekenvoorbeelden uitgewerkt:

| Kenmerk | Scenario A: Serieel vat | Scenario B: Parallel vat |
| :--- | :--- | :--- |
| **Warmtepompvermogen** | 6 kW | 8 kW |
| **Opstelling** | Serieel (retourleiding) | Parallel (hydraulische scheiding) |
| **Systeemeis / Richtwaarde** | Minimaal 50 liter systeeminhoud | Richtwaarde 15 L/kW |
| **Beschikbaar open volume** | 30 liter (open zone) | Geen (zone-naregeling op lussen) |
| **Berekening** | 50 liter - 30 liter | 8 kW × 15 L/kW |
| **Benodigde vatinhoud** | **20 liter** | **120 liter** |

`;
const markdown1 = `

### Praktijkcase: Zekerheid vóór de offerte

> Een installateur ontwerpt een hybride systeem met een 8 kW warmtepomp voor een woning waar naregeling wordt toegepast op de vloerverwarming. Omdat er geen gegarandeerde open zone is, kiest hij voor een parallel buffervat. Met de richtwaarde van 15 liter per kW selecteert hij een vat van 120 liter. Hiermee borgen het ontkoppelingsprincipe en de secundaire pomp de minimale doorstroming van 12 tot 18 liter per minuut, ongeacht welke zones dichtsturen.

Let bij de voorbereiding van de installatie ook op de elektrotechnische voeding: een warmtepomp boven de 5 kW thermisch vraagt in veel gevallen om een 3-fase aansluiting voor een optimale verdeling van de belasting.

Hoe controleert u momenteel tijdens de voorbereiding of de beschikbare waterinhoud van het afgiftesysteem voldoende is voor de defrost-cyclus van de gekozen warmtepomp?
`;

export function BuffervatHybrideWarmtepompVloerverwarmingArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Benodigde buffervatcapaciteit per rekenvoorbeeld","unit":"liter","items":[{"label":"Serieel (6 kW, 30L open zone)","value":20},{"label":"Parallel (8 kW, richtwaarde 15 L/kW)","value":120}],"illustrative":false}} />
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
