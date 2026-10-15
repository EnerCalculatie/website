import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'peak-shaving-zakelijke-laadpalen-ems')!;

const markdown = `
Een zakelijke klant met een grootverbruikaansluiting betaalt flink extra door één enkel piekkwartier per maand. Met peak shaving voorkom je die vermogenspieken zonder dat het wagenpark stil komt te staan.

## Slimme sturing tussen zonnepanelen, laders en opslag

Dynamic Load Balancing past het laadvermogen van laadpalen in real-time aan op de actuele belasting van de aansluiting. Een Energiemanagementsysteem (EMS) verbindt laadpalen, zonnepanelen en accubatterijen via Modbus TCP/RTU en REST-API's. Via OCPP (1.6J of 2.0.1) ontvangt de laadpaal specifieke stroomlimieten, terwijl het ISO 15118-protocol de communicatie tussen voertuig en lader regelt.

Directe inzet van zonne-energie voor laadpalen voorkomt teruglevering en verlaagt de stroomvraag uit het net. Dreigt het verbruik toch boven het gecontracteerd vermogen te komen? Dan ontlaadt een stationaire batterij automatisch om de piek op te vangen.

Voor de technische betrouwbaarheid heeft het systeem een hardwarematige of softwarematige fail-safe (safe state) nodig. Bij uitval van de netwerkverbinding of het EMS vallen laadpalen direct terug naar een vooraf ingesteld minimaal vermogen, wat doorgeslagen hoofdbeveiligingen en contractoverschrijdingen voorkomt.

## Financiële onderbouwing van de businesscase

Bij grootverbruikaansluitingen (boven 3x80A) bepalen het gecontracteerd vermogen en de hoogste gemeten kwartierpiek het capaciteitstarief. Bij een overschrijding van dit gecontracteerd vermogen rekent de netbeheerder een overschrijdingsboete per kW.

Een sluitende onderbouwing begint bij het opvragen van de historische 15-minuten meetdata (EAN-data). Met deze data bereken je precies welke pieken je afschaaft, wat de besparing op het vastrecht is en welke netuitbreidingskosten je voorkomt. Investeringen in het EMS, de laadinfrastructuur en bijbehorende actuatoren komen vaak in aanmerking voor fiscale stimulering via MIA en VAMIL.

## Advies voor de installateur bij netcongestie

Als installateur onderbouw je het advies door vooraf de kwartierwaarden door te rekenen. Laat de klant zien dat slimme sturing, een geborgde safe state en batterij-opslag de aansluiting binnen de contractgrenzen houden. Zo help je bedrijven die vastlopen door netcongestie of lange wachttijden voor netverzwaring direct verder.

Welke piekkwartieren uit de EAN-data van jouw klant leveren direct de grootste besparing op?
`;

export function PeakShavingZakelijkeLaadpalenEmsArticle() {
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
