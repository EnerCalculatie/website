import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'buffervat-warmtepomp-inhoud-berekenen')!;

const markdown0 = `
De hoogste mechanische belasting en slijtage van een warmtepompcompressor treden op tijdens het opstarten. Om te voorkomen dat een warmtepomp door een te kleine waterinhoud continu in- en uitschakelt — het zogeheten pendelgedrag — is een correct gedimensioneerd buffervat in veel situaties onmisbaar. U berekent de benodigde inhoud door het thermisch vermogen van de warmtepomp te vermenigvuldigen met de specifieke volumegrens per kilowatt (meestal 10 tot 20 liter per kW voor modulerende en 30 tot 50 liter per kW voor aan/uit-systemen), verminderd met het al aanwezige cv-watervolume.

## Inhoud van het buffervat berekenen: vuistregels per kW

Een warmtepomp vereist een minimale waterinhoud in het cv-systeem om de opgewekte warmte goed te kunnen afvoeren en het aantal start/stop-cycli te beperken. Afhankelijk van het type warmtepomp gelden verschillende richtlijnen voor de volumeberekening:

- **Modulerende warmtepompen:** Hiervoor volstaat doorgaans een volume van 10 tot 20 liter per kW thermisch vermogen.
- **Aan/uit warmtepompen:** Bij deze systemen wordt als vuistregel 30 tot 50 liter per kW opgesteld vermogen gehanteerd.

| Type warmtepomp | Richtlijn waterinhoud per kW |
| :--- | :--- |
| Modulerend | 10 tot 20 liter / kW |
| Aan/uit | 30 tot 50 liter / kW |

`;
const markdown1 = `

Wanneer het bestaande leidingsysteem en de afgiftelichamen onvoldoende water bevatten om aan deze minimale volumestroom en inhoud te voldoen, vult een buffervat het tekort aan.

## Pendelgedrag en compressorslijtage bij een warmtepomp voorkomen

Pendelgedrag ontstaat wanneer de minimale vermogensafgifte van de warmtepomp groter is dan de actuele warmtevraag van het pand. De warmtepomp kan de geproduceerde warmte op dat moment niet snel genoeg kwijt, waardoor de temperatuur te snel stijgt en de regeling de compressor uitschakelt.

Omdat de hoogste mechanische slijtage van de compressor optreedt tijdens het opstarten, leidt een hoog aantal start/stop-cycli tot extra slijtage. Een goed gedimensioneerd buffervat werkt als thermische buffer: het vergroot de totale watermassa, rekt de draaitijd op en beperkt zo het aantal opstartmomenten.

## Serieel vs. parallel geschakeld buffervat: de verschillen

Bij het ontwerp van de installatie heeft de keuze voor een serieel of parallel buffervat directe invloed op de onderdelen en de hydraulische berekening:

### Serieel geschakeld buffervat
Een serieel buffervat wordt meestal in de retourleiding geplaatst en dient puur als volumevergroter van het cv-circuit.
- **Circulatiepomp:** Er is geen extra secundaire circulatiepomp nodig; de pomp van de warmtepomp verzorgt de doorstroming.
- **Toepassing:** Geschikt wanneer het afgiftesysteem voldoende open staat en een constante doorstroming waarborgt.

### Parallel geschakeld buffervat
Een parallel geschakeld buffervat werkt als hydraulische ontkoppeling tussen het primaire warmtepompcircuit en het secundaire afgiftecircuit.
- **Circulatiepomp:** Vereist een extra secundaire circulatiepomp aan de afgiftezijde.
- **Debietberekening:** Het benodigde volumeberekeningsdebiet is afhankelijk van het maximale verschil in volumestroom tussen het primaire en secundaire circuit. Dit helpt om menging en temperatuurverval tussen de circuits te minimaliseren.
- **Zoneregelingen:** Wanneer thermostatische kranen of zoneregelingen het afgiftesysteem gedeeltelijk dichtsturen, garandeert een parallel buffervat dat de warmtepomp de benodigde minimale volumestroom (het minimale debiet) kan behouden.

## Het buffervat technisch onderbouwen in de offerte

Een buffervat wordt door klanten soms gezien als een extra kostenpost. Met de juiste technische onderbouwing legt u de noodzaak en meerprijs uit in uw voorstel:

1. **Borging van de levensduur:** Het beperken van start/stop-cycli vermindert mechanische slijtage aan de compressor.
2. **Voorkomen van debietstoringen:** Het opnemen van een buffervat voorkomt storingsmeldingen door te lage doorstroming wanneer radiatoren of vloerverwarmingsgroepen dichtlopen.
3. **Continuïteit tijdens de ontdooicyclus (defrost):** Tijdens een ontdooicyclus van een lucht/water-warmtepomp wordt de werking omgekeerd en wordt er warmte onttrokken aan het cv-water. Het buffervat zorgt dat deze energie beschikbaar is zonder dat het interieur merkbaar afkoelt.

## Overzicht: Keuzehulp voor de installateur

| Situatie | Hydraulische keuze | Belangrijkste aandachtspunt |
| :--- | :--- | :--- |
| Open afgiftesysteem, te kleine waterinhoud | Serieel buffervat (retour) | Geen extra pomp nodig, puur volumevergroting |
| Naregeling / zones met thermostaatkranen | Parallel buffervat | Extra secundaire pomp vereist; stem volumestromen af om mengverliezen te beperken |
| Lucht/water-warmtepomp met defrost | Serieel of parallel buffervat | Energiereserve borgen voor de ontdooicyclus |

## Veelgestelde vragen over buffervaten bij warmtepompen

### Hoe bereken je de inhoud van een buffervat voor een warmtepomp?
Vermenigvuldig het thermisch vermogen van de warmtepomp met de vuistregel (10-20 l/kW voor modulerend, 30-50 l/kW voor aan/uit) en trek daar het al aanwezige cv-watervolume vanaf.

### Wat is het voordeel van een parallel geschakeld buffervat?
Een parallel buffervat dient als hydraulische ontkoppeling. Dit waarborgt de minimale volumestroom voor de warmtepomp, zelfs wanneer naregelingen of thermostaatkranen de afgiftezijde dichtsturen.

### Waarom helpt een buffervat bij de defrost-cyclus?
Tijdens het ontdooien onttrekt een lucht/water-warmtepomp warmte aan het cv-water. Een buffervat levert deze energie direct zonder dat het interieur merkbaar afkoelt.
`;

export function BuffervatWarmtepompInhoudBerekenenArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Richtlijn waterinhoud per kW thermisch vermogen","unit":"L/kW","items":[{"label":"Modulerend (minimaal)","value":10},{"label":"Modulerend (maximaal)","value":20},{"label":"Aan/uit (minimaal)","value":30},{"label":"Aan/uit (maximaal)","value":50}],"illustrative":false}} />
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
