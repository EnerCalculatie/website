import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'nctv-cyberrisicos-thuisbatterijen-omvormers')!;

const markdown = `
De Nationaal Coördinator Terrorismebestrijding en Veiligheid (NCTV) waarschuwt in het Cybersecuritybeeld Nederland 2026 dat cyberaanvallen op thuisbatterijen en omvormers kunnen leiden tot grootschalige stroomuitval. Bij een gecoördineerde hack op doorgeschakelde installaties kan plotseling 3 gigawatt aan vermogen wegvallen of inschakelen, wat het elektriciteitsnet ontregelt.

## Waarom cyberaanvallen op thuisbatterijen het stroomnet bedreigen

De NCTV en de Rijksinspectie Digitale Infrastructuur (RDI) duiden aanstuurbare apparaten zoals thuisbatterijen en omvormers aan als 'high-power IoT'. Deze systemen zijn via centrale cloudplatforms, aggregators of energiemanagementsystemen vaak op afstand koppelbaar.

Wanneer een cyberaanval 3 gigawatt of meer aan vermogen gelijktijdig laat wegvallen of opstarten, raakt de netfrequentie buiten de marge van 49,99 tot 50,01 hertz. Dit veroorzaakt directe netinstabiliteit. Daarnaast signaleert de NCTV dat hacks op het batterijmanagementsysteem (BMS) fysieke oververhitting en brand kunnen veroorzaken.

In Nederland heeft 89 procent van de huishoudens slimme apparatuur in huis. Doordat een derde beveiligingsupdates te laat of niet uitvoert, blijven minstens 2,5 miljoen apparaten digitaal kwetsbaar.

## Wat betekenen de cyberrisico's en nieuwe wetgeving voor jou?

Als eigenaar van een thuisbatterij of omvormer kan een gebrekkige beveiliging directe gevolgen hebben voor je apparatuur. Een gemanipuleerd batterijmanagementsysteem kan schade aan de accu toebrengen.

Daarnaast veranderen de regels voor apparaten die op de markt komen. Sinds 1 augustus 2025 stelt de Europese Radioapparatuurrichtlijn (RED 3.3) basiseisen aan draadloze omvormers, zoals unieke wachtwoorden en versleutelde verbindingen.

Sinds 11 september 2026 geldt onder Artikel 14 van de Cyber Resilience Act (CRA) een meldplicht voor fabrikanten bij actief misbruikte kwetsbaarheden binnen 24 tot 72 uur. Vanaf 11 december 2027 volgen de volledige CE-eisen voor cyberveiligheid onder deze wetgeving.

## Welke rol hebben installateurs bij digitale veiligheid?

Voor installateurs wordt digitale veiligheid een vast onderdeel van de oplevering en het advies. Het opleveren van een thuisbatterij stopt niet bij het aansluiten van de kabels in de meterkast.

Door klanten te ondersteunen bij de eerste netwerkinstellingen voorkom je dat systemen met standaardinstellingen online gaan. Toezichthouders adviseren om energie-installaties standaard te scheiden van het gewone thuisnetwerk van de klant.

## Hoe beveiligen eigenaren hun thuisbatterij of omvormer?

- Zet automatische software- en firmware-updates aan op de omvormer en het batterijsysteem.
- Wijzig standaard fabriekswachtwoorden direct in een uniek en sterk wachtwoord.
- Sluit thuisbatterijen en slimme omvormers aan op een gescheiden netwerk, zoals een gastnetwerk.
- Let bij aanschaf van nieuwe apparatuur op ondersteuning voor de RED 3.3-richtlijn.
`;

export function NctvCyberrisicosThuisbatterijenOmvormersArticle() {
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
