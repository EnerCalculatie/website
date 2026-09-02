import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'buffervat-warmtepomp-inhoud-berekenen-pendelgedrag')!;

const markdown0 = `
Een juist gedimensioneerd buffervat bij een warmtepomp voorkomt pendelgedrag (short-cycling) en borgt een minimale compressor-run-time van 10 tot 15 minuten per start. Als vuistregel voor een parallel geschakeld buffervat geldt **10 tot 20 liter inhoud per kW geïnstalleerd warmtepompvermogen**. Hiermee garandeert u voldoende waterbedrijfsvolume, borgt u de ontdooi-energie en beschermt u het seizoensrendement (COP/SCOP) én de levensduur van de compressor.

## Impact van pendelgedrag op COP, SCOP en levensduur

Wanneer een warmtepomp te vaak kortstondig aanslaat, veroorzaakt dit extra mechanische slijtage aan de compressor. Hierdoor kan de verwachte levensduur van het toestel aanzienlijk worden verkort.

Daarnaast verlaagt dit frequente starten en stoppen het seizoensrendement (de COP en SCOP) van de totale installatie. Om een goede olieretour naar de compressor te garanderen en onnodige slijtage te voorkomen, wordt in het ontwerp gestreefd naar een minimale ononderbroken compressor-run-time van 10 tot 15 minuten per start.

## Wanneer is een buffervat bij een warmtepomp noodzakelijk?

Een buffervat kan in verschillende situaties noodzakelijk zijn om een stabiele werking van de warmtepomp te garanderen:

- **Borging van het minimale waterbedrijfsvolume:** Wanneer thermostaatkranen of zonerestricties dichtsturen, kan het beschikbare cv-watervolume in de woning te klein worden. Een buffervat voorkomt dat de warmtepomp haar warmte niet kwijt kan.
- **Ontdooi-energie:** Bij lucht-water warmtepompen is voldoende systeeminhoud nodig om tijdens de ontdooicyclus warmte te leveren zonder dat de temperatuur in het afgiftesysteem te sterk daalt.

### Serieel versus parallel geschakeld buffervat

Afhankelijk van de hydraulische situatie wordt gekozen voor een specifieke inpassing:

- **Serieel geschakeld:** Verhoogt uitsluitend het totale waterinhoudsvolume van het systeem. Dit type vat wordt doorgaans opgesteld in de retourleiding.
- **Parallel geschakeld:** Dient als hydraulische scheiding tussen de primaire stroom van de warmtepomp en de secundaire stroom van het afgiftesysteem.

## Buffervat inhoud berekenen: vuistregels en ISSO-richtlijnen

De richtlijnen voor het dimensioneren en hydraulisch inpassen van warmtepompinstallaties in woningen staan beschreven in ISSO-publicaties (zoals ISSO-publicatie 72 en ISSO-publicatie 98).

Een gangbare vuistregel voor het berekenen van de inhoud van een parallel geschakeld buffervat is **10 tot 20 liter inhoud per kW geïnstalleerd warmtepompvermogen**.

In de onderstaande tabel staat hoe deze vuistregel uitpakt bij verschillende thermische vermogens:

| Thermisch vermogen warmtepomp | Aanbevolen inhoud parallel buffervat (min - max) |
| :--- | :--- |
| 5 kW thermisch | 50 tot 100 liter |
| 8 kW thermisch | 80 tot 160 liter |
| 12 kW thermisch | 120 tot 240 liter |

`;
const markdown1 = `

## Meerwaarde van een buffervat onderbouwen in de offerte

Een klant kan vragen hebben over de meerkosten en de benodigde opstelruimte voor een buffervat. Door de technische noodzaak helder te vertalen naar lange-termijnvoordelen, maakt u het advies in de offerte transparant.

| Situatie in het afgiftesysteem | Risico zonder buffervat | Oplossing & onderbouwing met buffervat |
| :--- | :--- | :--- |
| Dichtsturende thermostaatkranen / zoneregeling | Te klein waterbedrijfsvolume, wat kan leiden tot pendelgedrag en snelle slijtage van de compressor | Garandeert voldoende waterinhoud om de minimale compressor-run-time van 10 tot 15 minuten te behalen. |
| Lucht-water warmtepomp (ontdooislag) | Onvoldoende direct beschikbare warmte voor de ontdooicyclus | Levert de benodigde ontdooi-energie met behoud van comfort in de woning. |
| Verschil tussen primaire en secundaire volumestroom | Hydraulische onbalans tussen warmtepomp en afgiftesysteem | Zorgt bij een parallelle opstelling voor een effectieve hydraulische scheiding. |

Met deze onderbouwing toont u aan dat een buffervat een gerichte investering is ter bescherming van het seizoensrendement (COP/SCOP) en voor het behoud van de compressor op de lange termijn.

## Veelgestelde vragen over buffervaten bij warmtepompen

### Hoeveel liter buffervat per kW warmtepomp is nodig?
Voor een parallel geschakeld buffervat geldt als gangbare vuistregel 10 tot 20 liter inhoud per kW geïnstalleerd warmtepompvermogen.

### Wat is de minimale compressor-run-time van een warmtepomp?
Om onnodige slijtage te voorkomen en een goede olieretour te garanderen, wordt in het ontwerp gestreefd naar een minimale ononderbroken compressor-run-time van 10 tot 15 minuten per start.

### Wat is het verschil tussen een serieel en parallel geschakeld buffervat?
Een serieel geschakeld buffervat verhoogt uitsluitend het totale waterinhoudsvolume van het systeem, terwijl een parallel geschakeld buffervat dient als hydraulische scheiding tussen de primaire en secundaire volumestroom.
`;

export function BuffervatWarmtepompInhoudBerekenenPendelgedragArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Aanbevolen inhoud parallel buffervat per thermisch vermogen","unit":"liter (minimaal)","items":[{"label":"5 kW thermisch","value":50},{"label":"8 kW thermisch","value":80},{"label":"12 kW thermisch","value":120}],"illustrative":false}} />
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
