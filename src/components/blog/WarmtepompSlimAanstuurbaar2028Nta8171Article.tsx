import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'warmtepomp-slim-aanstuurbaar-2028-nta-8171')!;

const markdown = `
Vanaf 2028 worden nieuw geproduceerde hybride en all-electric warmtepompen van aangesloten fabrikanten standaard technisch slim aanstuurbaar. Dat hebben Netbeheer Nederland, TNO, de Vereniging voor Duurzame Warmte en de Coalitie Slimme Warmtepompen op 5 november 2026 afgesproken in de Slimme Warmtepompen-deal om het stroomnet beter te balanceren.

## Afspraken over slimme sturing in de Slimme Warmtepompen-deal
Tijdens de Klimaattop Gebouwde Omgeving spraken marktpartijen af dat nieuw gefabriceerde warmtepompen vanaf 2028 geschikt moeten zijn voor slimme sturing. De technische eisen en communicatieprotocollen hiervoor staan vastgelegd in de afspraak NTA 8171, meldt TNO.

De afspraak geldt voor de aangesloten fabrikanten en heeft geen terugwerkende kracht voor al geïnstalleerde warmtepompen. Volgens Solar Magazine kunnen sommige bestaande toestellen via software-updates achteraf geschikt worden gemaakt. De sectorafspraak loopt vooruit op de aangekondigde kabinetsnormering per 2029 bij cv-ketelvervanging voor woningen zonder warmtenet.

Netbeheerders leveren de benodigde net- en capaciteitssignalen over de beschikbare netruimte. Energieleveranciers of energiebeheersystemen (HEMS) voeren de sturing uit via dynamische of tijdsafhankelijke tarieven. Dit sluit aan bij de tijdsafhankelijke nettarieven waaraan toezichthouder ACM werkt voor 2029.

## Wat merk je van een slim aanstuurbare warmtepomp?
Het systeem verschuift de stroomvraag automatisch naar momenten met ruim stroomaanbod. Bij all-electric warmtepompen gebeurt dit door de woning vooraf op te warmen, terwijl bij hybride systemen de cv-ketel tijdelijk bijspringt.

Deze sturing vindt plaats binnen de comfortgrenzen die de gebruiker vooraf instelt. Reeds aanwezige installaties veranderen niet automatisch mee, tenzij de fabrikant een software-update uitrolt.

## De impact van NTA 8171 op warmtepompinstallateurs
Installateurs krijgen te maken met apparatuur die communiceert via de NTA 8171-standaard. Bij het adviseren over hybride en all-electric installaties wordt de koppeling met een energiebeheersysteem of dynamisch contract een vast onderdeel van het advies.

Daarnaast vraagt de capaciteit van de installatie om een juiste elektrotechnische afstemming. Zo vereist een warmtepomp met een thermisch vermogen boven 5 kW in veel gevallen een 3-fase aansluiting voor een optimale verdeling van de belasting, meldt RVO.

## Praktische stappen voor de praktijk
- Controleer bij opdrachten of fabrikanten aansturing volgens NTA 8171 ondersteunen.
- Informeer klanten over de sturing binnen hun eigen ingestelde comfortgrenzen.
- Houd rekening met de geplande tijdsafhankelijke nettarieven vanaf 2029 bij het adviseren over energiebeheersystemen.
- Toets bij toestellen boven 5 kW thermisch vermogen tijdig of een 3-fase aansluiting aanwezig is.
`;

export function WarmtepompSlimAanstuurbaar2028Nta8171Article() {
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
