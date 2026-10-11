import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'nationaal-laadonderzoek-2026-ev-rijder-thuis-laden')!;

const markdown0 = `
Maar liefst 62 procent van alle elektrisch gereden kilometers wordt inmiddels thuis geladen. Dat blijkt uit het Nationaal Laadonderzoek 2026, dat is uitgevoerd door RVO, ElaadNL, de Vereniging Elektrische Rijders (VER) en de Rijksuniversiteit Groningen onder 2.399 Nederlandse EV-rijders.

## Uitkomsten Nationaal Laadonderzoek 2026: Thuisladen en slim laden
Uit het onderzoek blijkt dat het aandeel thuisladen is gestegen van 54 procent naar 62 procent van alle geladen kilometers. In totaal beschikt 76 procent van de deelnemende EV-rijders over een eigen thuislaadpunt. Door de grotere actieradius van moderne auto's hoeft 53 procent van de rijders onderweg nooit meer bij te laden.

Van de EV-rijders met een thuislaadpunt past 90 procent één of meerdere vormen van slim laden toe. Zo heeft 47 procent een dynamisch energiecontract en overweegt nog eens 13 procent dit aan te schaffen. Daarnaast geeft 66 procent aan piekuren op het stroomnet actief te vermijden. Ook thuisbatterijen en bidirectioneel laden komen op: 26 procent heeft al een thuisbatterij en 24 procent wil binnen een jaar starten met bidirectioneel laden.

`;
const markdown1 = `

## Voordelen van thuis en slim laden voor de EV-rijder
Als EV-rijder laad je je auto het liefst op de eigen oprit. De voornaamste redenen om over te stappen op slim laden zijn het verlagen van je energiekosten, het benutten van je eigen zonnestroom en het mijden van netpieken.

Ondanks berichten over netcongestie verwacht 71 procent van de EV-rijders weinig tot geen invloed op hun laadmogelijkheden. Slechts 3 procent geeft aan vanwege netcongestie bij een volgende auto voor een brandstofauto te kiezen. Laad je wel eens openbaar? Daar ervaart 43 procent van de rijders een gebrek aan transparante prijzen, terwijl 77 procent graag de prijs per kWh op het display van de laadpaal ziet.

## Belangrijke inzichten voor laadpaal installateurs
Klanten vragen niet meer om een eenvoudige lader, maar om een slim opgebouwd thuisnetwerk. Je advies verschuift naar de integratie van dynamische uurprijzen, load balancing en slimme sturing met zonnepanelen of een thuisbatterij. Zorg bij grotere afstanden van de meterkast naar de laadpaal voor voldoende kabeldiameter (bijvoorbeeld 4 mm² vanaf 35 meter of 6 mm² vanaf 60 meter) om spanningsval, warmteverlies en laadstoringen te voorkomen.

## Actiepunten voor slim laden thuis
- Controleer of je laadpaal kan laden op basis van daluren of dynamische uurprijzen.
- Stem de laadtijden af op de opbrengst van je zonnepanelen om meer eigen stroom direct te verbruiken.
- Vraag je installateur om dynamic load balancing in te stellen zodat je hoofdzekering niet overbelast raakt.
- Laat de kabeldiameter goed doorrekenen bij een lang kabeltraject om laadonderbrekingen door spanningsval te vermijden.
`;

export function NationaalLaadonderzoek2026EvRijderThuisLadenArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Aandeel geladen kilometers thuis","unit":"%","items":[{"label":"Vorige meting","value":54},{"label":"Onderzoek 2026","value":62}],"illustrative":false}} />
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
