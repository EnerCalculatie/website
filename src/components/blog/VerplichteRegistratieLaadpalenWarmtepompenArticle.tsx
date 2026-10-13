import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'verplichte-registratie-laadpalen-warmtepompen')!;

const markdown = `
Netbeheer Nederland roept in een nieuwe systeemanalyse op tot een wettelijk verplichte registratie van laadpalen en warmtepompen op kleinverbruikaansluitingen tot 3x80 ampère (55 kW). Netbeheerders beschikken momenteel niet over inzicht in het vermogen en de locaties van deze apparaten op adresniveau.

## Waarom is verplichte registratie nodig bij netoverbelasting?
Zonder adresinvoer van net-intensieve apparaten kunnen netbeheerders bij dreigende overbelasting enkel complete netdelen afschakelen of het risico op uitval nemen. Door verplichte registratie te koppelen aan data uit de slimme meter, kunnen netbeheerders het beschikbare flexvermogen op drukke momenten gericht en op afstand aansturen.

Per 1 juli 2026 vallen kleinverbruikaansluitingen onder het nieuwe prioriteringskader van de ACM, wat de noodzaak tot flexibele sturing op het laagspanningsnet vergroot. Daarnaast bereidt het kabinet voor 2029 een verplichting voor op slimme, hybride warmtepompen die volgens NTA 8171:2026 kunnen communiceren over hun vermogensbehoefte.

## Wat betekent de registratieplicht voor huiseigenaren?
De juridische verantwoordelijkheid voor de netaansluiting ligt bij de aansluithouder of huiseigenaar. Het aanvragen, wijzigen of verzwaren van netaansluitingen ten behoeve van laadpalen en warmtepompen verloopt via het landelijke portaal Mijnaansluiting.nl.

Voor zonnepanelen en thuisbatterijen bestaat al een meldplicht via energieleveren.nl, maar volgens schattingen van netbeheerders wordt momenteel slechts 30 tot 40 procent van de thuisbatterijen geregistreerd. Het ontbreken van registratie verhoogt het risico op lokaal netfrequentieverlies, wijkstroomstoringen en langere wachttijden voor netverzwaringen.

## Wat verandert er voor installateurs en netbelasting?
Hoewel de huiseigenaar juridisch verantwoordelijk is, voert de installateur in de praktijk de oplevering en melding technisch uit. Techniek Nederland werkt aan een nieuw, geautomatiseerd registratiesysteem voor installateurs om de onderregistratie van apparatuur terug te dringen.

Bij het adviseren van een installatie moet de belasting op het net vooraf goed worden ingeschat. Een warmtepomp boven 5 kW thermisch vermogen vraagt in veel gevallen om een 3-fase aansluiting voor een optimale verdeling. Op een standaard 3x25A aansluiting is het maximale vermogen voor een laadpaal doorgaans 11 kW per lader zonder slimme sturing.

## Stappenplan: wat kun je nu al doen?
- Controleer voor de installatie de beschikbare capaciteit van de hoofdzekering en aansluiting.
- Vraag benodigde verzwaringen voor laadpalen of warmtepompen aan via Mijnaansluiting.nl.
- Meld al aanwezige zonnepanelen of thuisbatterijen direct aan via energieleveren.nl.
- Houd bij het selecteren van warmtepompen rekening met toekomstige standaarden voor netcommunicatie.
`;

export function VerplichteRegistratieLaadpalenWarmtepompenArticle() {
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
