import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'aanvoertemperatuur-warmtepomp-cop-vloerverwarming')!;

const markdown = `
Het verlagen van de aanvoertemperatuur met slechts 1°C levert bij een warmtepomp een rendementverbetering (COP) op van circa 2 tot 3 procent. Toch behalen warmtepompinstallaties in combinatie met vloerverwarming in de praktijk vaak niet de beoogde efficiëntie doordat een traditionele verdeler de aanvoer verder afkoelt. Voor u als installateur is het essentieel om de aanpassing van de verdeler en de aanvoertemperatuur technisch én cijfermatig te onderbouwen.

## Effect van de Aanvoertemperatuur op de Warmtepomp COP

Een warmtepomp behaalt het hoogste rendement bij een zo laag mogelijke aanvoertemperatuur. Voor vloerverwarming wordt idealiter een temperatuur van 35°C tot maximaal 40°C gehanteerd.

Omdat het verlagen van de aanvoertemperatuur met 1°C leidt tot een verbetering van de COP van circa 2 tot 3 procent, levert een lagere temperatuurinstelling direct een hoger rendement op.

| Aanvoertemperatuur | Rendementverbetering (COP) t.o.v. 40°C aanvoer |
| :--- | :--- |
| **40°C** | Basisniveau (0%) |
| **38°C** (2°C verlaging) | Circa 4% tot 6% hoger rendement |
| **35°C** (5°C verlaging) | Circa 10% tot 15% hoger rendement |

## Waarom een Mengverdeler Vervangen Moet Worden door een LTV-Verdeler

Traditionele mengverdelers met een eigen circulatiepomp mengen heet CV-water met retourwater. Bij toepassing van een warmtepomp zorgt deze werking voor een ongewenste verdere afkoeling van het toch al lage aanvoerwater van 35°C tot 40°C.

Daarnaast kunnen de circulatiepomp van de warmtepomp en de pomp van een traditionele mengverdeler elkaar hydraulisch tegenwerken. Om hydraulische conflicten tussen de circulatiepompen te voorkomen, is een verdeler zonder ingebouwde pomp (een pomploze verdeler of LTV-verdeler) vereist bij een directe aansluiting op de warmtepomp.

## Hogere Volumestroom en het Belang van Waterzijdig Inregelen

Bij het overstappen op lage aanvoertemperaturen verandert het benodigde waterdebiet door het systeem. Er is namelijk een grotere volumestroom (debiet) door de vloerverwarmingslussen nodig om dezelfde hoeveelheid warmte aan de ruimte af te geven vergeleken met hoge-temperatuursystemen.

Om deze grotere waterhoeveelheid goed te sturen, is het waterzijdig inregelen van het afgiftesysteem essentieel bij lage temperatuurverwarming. Hiermee worden de volumestromen over de afzonderlijke lussen correct verdeeld. Dit voorkomt energieverspilling en garandeert een goede verdeling van de warmte over de woning.

## Veelgestelde Vragen over Aanvoertemperatuur en Warmtepompen

### Hoeveel stijgt de COP bij een lagere aanvoertemperatuur?
Elke graad dat de aanvoertemperatuur wordt verlaagd, levert een rendementverbetering (COP) op van circa 2 tot 3 procent.

### Waarom is een traditionele mengverdeler ongeschikt voor warmtepompen?
Een traditionele mengverdeler mengt aanvoerwater met retourwater, waardoor de aanvoertemperatuur te laag wordt voor effectieve verwarming. Bovendien kunnen de pompen van de verdeler en de warmtepomp elkaar hydraulisch tegenwerken.

### Waarom is waterzijdig inregelen nodig bij lage temperatuurverwarming?
Bij een lage aanvoertemperatuur is een grotere volumestroom nodig. Waterzijdig inregelen zorgt voor de juiste debietverdeling over alle lussen, wat energieverspilling voorkomt en comfort garandeert.
`;

export function AanvoertemperatuurWarmtepompCopVloerverwarmingArticle() {
  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
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
        }}
      >
        {markdown}
      </ReactMarkdown>
    </BlogPostLayout>
  );
}
