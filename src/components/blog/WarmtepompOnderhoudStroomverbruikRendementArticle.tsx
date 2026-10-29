import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'warmtepomp-onderhoud-stroomverbruik-rendement')!;

const markdown0 = `
Een vervuilde warmtepomp kan tot 20% meer stroom verbruiken dan een goed onderhouden installatie. Regelmatig onderhoud voorkomt dit rendementsverlies, behoudt de SCOP en houdt de energierekening laag.

## Impact van onderhoud op het stroomverbruik en de SCOP

Vervuiling van filters en warmtewisselaars belemmert de lucht- en waterdoorstroming in de installatie. Hierdoor moet de compressor langere tijd op een hoger vermogen draaien om de woning op temperatuur te krijgen.

Dit leidt direct tot een daling van de Seizoensgebonden Prestatiecoëfficiënt (SCOP), het gemiddelde rendement over het stookseizoen. Door deze verminderde efficiëntie kan het totale stroomverbruik met 10% tot 20% toenemen.

| Situatie | Doorstroming & Warmteoverdracht | Impact op SCOP & Stroomverbruik |
| :--- | :--- | :--- |
| **Goed onderhouden** | Schone filters en verdamper, optimale waterflow | Behoud van SCOP, normaal stroomverbruik |
| **Achterstallig onderhoud** | Belemmerde lucht- en waterstroom door vuil | Daling van SCOP, 10% tot 20% hoger stroomverbruik |

`;
const markdown1 = `

## Noodzakelijke onderhoudstaken en de juiste frequentie

Een warmtepomp heeft doorgaans eens per 1 tot 2 jaar een professionele onderhoudsbeurt nodig. Het reinigen of vervangen van lucht- en vuilfilters dient minimaal 1 tot 2 keer per jaar te gebeuren om de doorstroming te garanderen.

Tijdens een servicebeurt staan de volgende onderdelen centraal voor de thermodynamische werking:
- Reinigen van de verdamper en de buitenunit
- Controleren van de koudemiddeldruk
- Afstellen van de cv-waterdruk en de waterdoorstroming

Daarnaast kent de Europese F-gassenverordening een periodieke, meestal jaarlijkse lekcontrole als wettelijke eis. Dit geldt voor systemen met een koudemiddelvulling vanaf 5 ton CO2-equivalent, of vanaf 10 ton bij hermetisch gesloten installaties.

## Waarde van warmtepomp onderhoud voor installateurs

Voor installateurs biedt het rendementsverlies een concreet argument bij het adviseren van een onderhoudscontract. Een berekening van het extra stroomverbruik en de terugverdientijd laat de klant direct de financiële meerwaarde zien.

Bovendien beschermt een juiste instelling van de waterflow en koudemiddeldruk de compressor tegen overmatige belasting. Dit voorkomt storingen en verlengt de levensduur van het systeem.

In EnerCalculatie reken je de impact van rendementsverlies en onderhoudsintervallen snel door. Zo onderbouw je het rendement en de ROI van een onderhoudscontract direct helder in je offerte.

Wanneer is jouw warmtepomp of die van je klant voor het laatst gecontroleerd op doorstroming en koudemiddeldruk?
`;

export function WarmtepompOnderhoudStroomverbruikRendementArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Relatief stroomverbruik bij achterstallig onderhoud","unit":"%","items":[{"label":"Goed onderhouden","value":100},{"label":"Achterstallig onderhoud","value":120}],"illustrative":false}} />
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
