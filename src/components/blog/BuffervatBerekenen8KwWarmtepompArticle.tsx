import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'buffervat-berekenen-8-kw-warmtepomp')!;

const markdown0 = `
Om het benodigde buffervat volume voor een 8 kW warmtepomp te berekenen, vermenigvuldig je het opgesteld vermogen met 10 tot 30 liter per kW, afhankelijk van het systeemtype en de opbouw van het afgiftesysteem. Een warmtepomp van 8 kW heeft in veel gevallen een minimale waterinhoud nodig om de ontdooicyclus storingsvrij uit te voeren en pendelen te voorkomen. Wanneer de interne inhoud van het afgiftesysteem te klein is of naregelingen de leidingen dichtknijpen, valt het systeem snel in storing.

## Vuistregels voor de volumeberekening van het buffervat

Om het benodigde volume van een buffervat te bepalen, worden in de praktijk meerdere vuistregels gehanteerd. Als indicatieve richtwaarde geldt dat de voorschriften van de fabrikant en het specifieke systeemontwerp steeds leidend zijn.

* **Standaard vuistregel:** Een veelgebruikte richtwaarde is 10 tot 20 liter waterinhoud per kW opgesteld warmtepompvermogen voor het opvangen van de minimale doorstroming en de ontdooicyclus.
* **Lucht-water warmtepompen (ontdooicyclus):** Voor de automatische defrost-functie van een lucht-water warmtepomp geldt vaak een minimaal actief circulatievolume van 10 tot 15 liter per kW. Dit voorkomt dat het systeem in storing valt door bevriezing of een te sterke temperatuurdaling.
* **Parallel geschakeld buffervat:** Bij een parallel geschakelde opstelling (open verdeling) geldt voor een vakkundige inregeling een vuistregel van 20 tot 30 liter per kW opgesteld vermogen om voldoende systeemmassa te waarborgen.

### Rekenvoorbeeld: benodigd buffervolume bij een 8 kW warmtepomp

| Systeemtype / Toepassing | Richtwaarde per kW | Indicatief volume (8 kW warmtepomp) |
| :--- | :--- | :--- |
| Minimaal actief circulatievolume (defrost) | 10 - 15 liter / kW | 80 - 120 liter |
| Minimale doorstroming (algemeen) | 10 - 20 liter / kW | 80 - 160 liter |
| Parallel geschakeld (open verdeling) | 20 - 30 liter / kW | 160 - 240 liter |

## Wanneer is een buffervat noodzakelijk?

Het wel of niet toevoegen van een buffervat hangt direct samen met de opbouw van het afgiftesysteem.

### Noodzakelijk bij kleine waterinhoud of zoneregeling
Een buffervat is noodzakelijk wanneer de totale waterinhoud van het afgiftesysteem kleiner is dan het fabrikantvoorschrift, of wanneer naregelingen (zoals thermostaatknoppen of individuele zoneregelingen) de doorstroming kunnen dichtzetten. 

Radiatoren en convectoren beschikken over een relatief kleine waterinhoud. Bij hybride opstellingen, die primair op bestaande radiatoren zijn aangesloten, is een extra buffervolume of een bypass-ventiel daardoor vaker nodig dan bij all-electric nieuwbouw.

### Wanneer kun je een buffervat weglaten?
Een buffervat kan achterwege blijven bij een open verdelersysteem of wanneer er een gegarandeerd openstaande zone aanwezig is met voldoende volumestroom. Vloerverwarming beschikt over een grote interne waterinhoud en thermische massa. Mocht er ten minste één zone (zoals de vloerverwarming op de begane grond) gegarandeerd open blijven, dan is een buffervat in veel situaties niet vereist.

`;
const markdown1 = `

## Gevolgen van een verkeerd gedimensioneerd buffervat

Een juiste dimensionering is cruciaal voor de werking van de warmtepomp:

* **Te klein buffervat:** Veroorzaakt 'pendelen' (het te snel in- en uitschakelen van de warmtepomp). Dit leidt tot een hoger energieverbruik, extra slijtage aan de compressor en mogelijke storingen tijdens de ontdooicyclus.
* **Te groot buffervat:** Leidt tot hogere stilstandsverliezen door ongewenst warmteverlies uit het vat. Het resultaat is een lager seizoensrendement (SCOP), hogere aanschafkosten en onnodige ruimte-inname in de woning.

Hoe borg jij het minimale circulatievolume bij het uitwerken van een warmtepompofferte met zoneregeling?
`;

export function BuffervatBerekenen8KwWarmtepompArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Indicatief buffervolume per kW warmtepompvermogen","unit":"liter/kW","items":[{"label":"Defrost (minimaal)","value":10},{"label":"Standaard vuistregel (maximaal)","value":20},{"label":"Parallel geschakeld","value":30}],"illustrative":false}} />
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
