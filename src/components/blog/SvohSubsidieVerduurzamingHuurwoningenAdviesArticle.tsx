import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'svoh-subsidie-verduurzaming-huurwoningen-advies')!;

const markdown = `
De Subsidie verduurzaming en onderhoud huurwoningen (SVOH) is een landelijke regeling voor particuliere en zakelijke verhuurders van bestaande huurwoningen. Met deze subsidie stimuleert de overheid de verduurzaming van de huursector. Aanvragen voor de SVOH-subsidie kunnen tot en met 31 december 2029 worden ingediend.

## Voorwaarden en maximale subsidiebedragen SVOH

Bij het adviseren van verhuurders gelden specifieke financiële kaders en randvoorwaarden:

- **Maximale subsidie per woning:** Het subsidiebedrag per huurwoning voor verduurzamings- en onderhoudsmaatregelen bedraagt in de basis maximaal € 6.000.
- **Maximum per aanvrager:** Een aanvrager kan in totaal maximaal € 400.000 aan SVOH-subsidie ontvangen voor alle woningen gezamenlijk.
- **Verhuurstatus:** Een belangrijke voorwaarde voor de SVOH is dat de woningen op het moment van de aanvraag al worden verhuurd, of direct na het uitvoeren van de maatregelen verhuurd worden.
- **Aanvraagmoment:** Subsidie voor verduurzamingsmaatregelen dient te worden aangevraagd nadat de maatregelen volledig zijn uitgevoerd en betaald.

## Welke verduurzamingsmaatregelen vallen onder de SVOH?

De SVOH kan worden ingezet voor diverse verduurzamings- en onderhoudsmaatregelen. Binnen de regeling vallen onder meer:
- Spouwmuurisolatie
- Gevelisolatie
- Dakisolatie
- Vloer- en bodemisolatie
- Hoogrendementsglas
- Warmtepompen
- Zonneboilers

Bij het adviseren over de installatie van bijvoorbeeld een warmtepomp kan de technische infrastructuur een rol spelen. Een warmtepomp boven de 5 kW thermisch vraagt in veel gevallen om een 3-fase aansluiting voor een optimale verdeling van de belasting op het net.

## Subsidie voor maatwerk energieadvies

Naast de fysieke maatregelen kunnen verhuurders een tegemoetkoming krijgen voor professioneel advies. Voor een maatwerk energieadvies door een gecertificeerd adviseur kan 50% van de advieskosten worden vergoed. Hierbij geldt een maximum van € 400 per woning.

## Samenvatting

De SVOH-subsidie biedt particuliere en zakelijke verhuurders van bestaande huurwoningen financiële ondersteuning tot en met 31 december 2029. De regeling vergoedt maatregelen zoals isolatie, hoogrendementsglas, warmtepompen en zonneboilers (tot maximaal € 6.000 per woning en € 400.000 per aanvrager), evenals een deel van het maatwerk energieadvies. Aanvragen kunnen worden ingediend zodra de maatregelen zijn uitgevoerd en betaald.
`;

export function SvohSubsidieVerduurzamingHuurwoningenAdviesArticle() {
  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown
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
          blockquote: ({node: _node, ...props}) => <blockquote className="border-l-4 border-brand-primary pl-4 my-4 italic text-slate-600 bg-slate-50 py-2 pr-4 rounded-r" {...props} />
        }}
      >
        {markdown}
      </ReactMarkdown>
    </BlogPostLayout>
  );
}
