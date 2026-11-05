import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'omvormer-begrenzen-overspanning-253v')!;

const markdown = `
Wanneer de netspanning gemiddeld boven 253 Volt (110% van 230V) komt, schakelt een omvormer volgens de NEN-EN 50549-1 norm automatisch uit of regelt hij zijn vermogen terug. Het begrenzen of aftoppen van het omvormervermogen is een slimme oplossing zodra een zonne-installatie uitvalt door overspanning op het net, of wanneer de netbeheerder nog geen netversterking heeft uitgevoerd.

## Kabeldimensionering ter voorkoming van overspanning

Een te hoge spanningsstijging over de AC-kabel tussen de omvormer en de groepenkast is in veel gevallen de oorzaak van 253V-storingen. Installateurs moeten conform NEN 1010 het leidingtraject controleren en de kabeldoorsnede voldoende ruim dimensioneren om spanningsval en spanningsstijging te beperken. Softwarematige begrenzing is een logische vervolgstap wanneer de netspanning op het overdrachtspunt bij de hoofdzekering al zo hoog is dat de omvormer dreigt uit te vallen.

## Statisch aftoppen versus dynamisch begrenzen

Bij statisch aftoppen stel je het maximale AC-vermogen van de omvormer vast op een lager vermogen (bijvoorbeeld 70% tot 80%) dan het totale DC-vermogen van de zonnepanelen. Bij verhoogde netcongestie wordt een DC/AC-verhouding (oversizing) van 120% tot 150% geadviseerd. Zo produceert de omvormer op momenten met minder zon efficiënter, terwijl hij tijdens piekuren gecontroleerd begrenst.

Dynamisch begrenzen past het uitgangsvermogen van de omvormer in realtime aan. Dit gebeurt op basis van de actuele netspanning, de lokale energievraag of instructies van een Energy Management System (EMS).

| Methode | Werking | Sturing |
| :--- | :--- | :--- |
| **Statisch aftoppen** | Vast ingesteld vermogensplafond (bijv. 70%) | Eenmalige instelling op de omvormer |
| **Dynamisch begrenzen** | Vermogen past zich continu aan de situatie aan | Realtime sturing via netspanning of EMS |

## Rendement, de rol van een EMS en batterijen

In het Nederlandse klimaat leidt het statisch aftoppen van een omvormer op 70% van het piekvermogen tot een beperkt opbrengstverlies van gemiddeld 2% tot 5% per jaar. Het verlagen van de terugleverstroom vermindert de lokale spanningsstijging in de kabel, wat uitschakeling voorkomt. Doordraaien op een begrensd vermogen levert doorgaans meer op dan een omvormer die op zonnige uren compleet uitschakelt.

Een EMS kan bij dreigende overspanning overtollige zonne-energie omleiden naar een batterijsysteem, warmtepomp of laadpaal. Vanwege de Netcode Elektriciteit moet je invoeding boven 16A (3,68 kVA) over meerdere fases verdelen via een 3-fase omvormer om fase-onbalans te voorkomen.

## Stappenplan voor de installateur bij netcongestie

Controleer bij overspanningsklachten eerst het leidingtraject en de kabeldiameter tussen omvormer en meterkast volgens de NEN 1010 norm. Blijft de spanning op het overdrachtspunt van de netbeheerder hoog? Combineer dan oversizing (120% tot 150%) met dynamische begrenzing of EMS-sturing om uitval te voorkomen zonder te wachten op netversterking.

Hoe richt jij de kabeldimensionering en omvormercapaciteit in wanneer de netspanning in de wijk oploopt?
`;

export function OmvormerBegrenzenOverspanning253vArticle() {
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
        }}>{markdown}</ReactMarkdown>
    </BlogPostLayout>
  );
}
