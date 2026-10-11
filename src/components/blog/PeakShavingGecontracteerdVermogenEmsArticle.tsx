import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'peak-shaving-gecontracteerd-vermogen-ems')!;

const markdown = `
Overschrijdt een zakelijke klant met een grootverbruikaansluiting (>3x80A) zijn gecontracteerd vermogen? Dan rekent de netbeheerder direct forse overschrijdingstarieven aan. Met een combinatie van zonnepanelen, slimme laadpalen en een Energy Management System (EMS) voorkom je deze piekbelastingen op de netaansluiting.

## Wat is de winst van peak shaving bij gecontracteerd vermogen?

Het maandelijkse capaciteitstarief voor zakelijke grootverbruikers wordt berekend op basis van het gecontracteerd vermogen en de hoogst gemeten kW-piek in dat tijdvak. Trekken apparaten of laadpalen tijdelijk meer vermogen dan afgesproken, dan volgt een boete van de netbeheerder. Peak shaving vlakt deze verbruikspieken af door flexibele bronnen in te zetten.

De financiële onderbouwing in je offerte rust op drie pijlers:
- Het vermijden van overschrijdingstarieven en boetes op het gecontracteerd vermogen.
- Het verlagen van het vaste maandelijkse capaciteitstarief.
- Het voorkomen van lange wachttijden en hoge kosten voor een fysieke netverzwaring.


## Hoe werken EMS, slimme laadpalen en zonnepanelen samen?

Een EMS koppelt zonnepanelen, laadinfrastructuur en eventuele batterijen via standaarden zoals Modbus en OCPP. Dynamic Load Balancing (DLB) monitort continu het totale stroomverbruik van de bedrijfslocatie. Dreigt de stroomvraag de gecontracteerde grens te naderen, dan schaalt het systeem het laadvermogen van de laadpalen automatisch terug.

Smart charging stemt het laden primair af op het aanbod van eigen zonnestroom. Door voertuigen te laden op direct beschikbare zonne-energie koopt het bedrijf minder duur netvermogen aan. Zo blijft de totale stroomvraag binnen de afgesproken grenzen.

## Wanneer zet je een batterij (BESS) in voor peak shaving?

Als flexibel laadvermogen en zonnestroom samen onvoldoende zijn om een piek op te vangen, is een stationair batterij-opslagsysteem (BESS) noodzakelijk. Dit gebeurt bijvoorbeeld tijdens het snelladen van voertuigen of op momenten zonder zonlicht. De batterij springt dan direct bij om het extra benodigde vermogen te leveren.

Omdat netbeheerders aanvragen voor netverzwaring door netcongestie vaak weigeren of langdurig vertragen, is decentrale sturing vaak de enige manier om bedrijfsuitbreiding mogelijk te maken. Neem voor een gunstige terugverdientijd ook fiscale voordelen mee in je offerte. Investeringen in een EMS en slimme batterij-opslag komen onder voorwaarden in aanmerking voor MIA en VAMIL.

## Hoe adviseer je peak shaving als installateur?

Als installateur adviseer je geen losse apparaten, maar een totale oplossing voor netcongestie en piekbelasting. Onderbouw in je advies niet alleen de installatiekosten, maar bereken expliciet de vermeden boetes op de kW-piek en de besparing op het capaciteitstarief. Hiermee geef je zakelijke klanten direct garanties op continuïteit en lagere netkosten.

Hoeveel capaciteit op het gecontracteerd vermogen kun je bij je volgende zakelijke klant vrijmaken met slimme sturing?
`;

export function PeakShavingGecontracteerdVermogenEmsArticle() {
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
