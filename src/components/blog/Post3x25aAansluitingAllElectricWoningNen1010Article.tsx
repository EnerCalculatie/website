import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === '3x25a-aansluiting-all-electric-woning-nen-1010')!;

const markdown = `
Een 3x25A-aansluiting levert een maximaal continu elektrisch vermogen van circa 17,25 kW (3 x 230V x 25A). Waar een overstap naar een verzwaarde 3x35A-aansluiting volgens de ACM leidt tot een significante stijging in de jaarlijkse netbeheerkosten, volstaat 3x25A in veel situaties voor een all-electric woning. Voor installateurs is het belangrijk om helder te onderbouwen dat met een correcte gelijktijdigheidsfactor en elektrotechnische beveiliging netverzwaring vaak onnodig is.

## Gelijktijdigheidsfactor volgens NEN 1010 bij Warmtepompen

Volgens de richtlijnen in de NEN 1010 mag bij het bepalen van het maximaal te verwachten vermogen van een installatie een gelijktijdigheidsfactor kleiner dan 1,0 worden toegepast. Elektrische apparaten in een woning vragen immers zelden op hetzelfde moment hun maximale vermogen.

Een all-electric warmtepomp voor een eengezinswoning heeft onder normale bedrijfsomstandigheden een typisch opgemeten elektrisch vermogen van 1,5 kW tot 3,5 kW. Het elektrische bijverwarmingselement (3 kW tot 6 kW) schakelt uitsluitend in bij extreme kou. Daarnaast vragen warmtepompen boven de 5 kW thermisch in veel gevallen om een 3-fase aansluiting voor een optimale verdeling van de belasting.

## Vermogensverdeling in de Praktijk: 3x25A vs. Verbruikers

Om te onderbouwen dat een 3x25A-aansluiting volstaat, kan de vermogensbehoefte van de zwaarste verbruikers in kaart worden gebracht:

| Component | Elektrisch vermogen / Kenmerk | Bron |
| :--- | :--- | :--- |
| **Hoofdaansluiting 3x25A** | Maximaal ~17,25 kW continu | Netbeheer Nederland |
| **Warmtepomp (normaal bedrijf)** | 1,5 kW – 3,5 kW elektrisch | Milieu Centraal |
| **Bijverwarmingselement warmtepomp** | 3 kW – 6 kW elektrisch (bij extreme kou) | Milieu Centraal |
| **Laadpaal (3-fase, ongestuurd)** | Maximaal 11 kW (3x16A) | Alfen |
| **Afzekering omvormer/laadpaal** | Maximaal 16A (3,68 kW per fase / ~11 kW totaal) | NEN 1010 |

Zonder slimme sturing zou de gelijktijdige vraag van een laadpaal (11 kW), elektrisch koken en een warmtepomp het maximale vermogen kunnen overschrijden. Door sturing toe te passen is verzwaring naar 3x35A echter in veel gevallen onnodig.

## De Rol van Dynamic Load Balancing en HEMS

Door de inzet van slimme energiemanagementsystemen (HEMS) en load balancing kan de gelijktijdigheid tussen de warmtepomp, elektrisch koken en het laden van een elektrisch voertuig actief worden teruggebracht.

- **Dynamic Load Balancing (DLB):** Dit past de laadstroom van een laadpaal automatisch aan op basis van de actuele totale belasting van de woning via de P1-poort of stroomtransformatoren. Hierdoor raken hoofdzekeringen niet overbelast.
- **Fase-schakeling:** Slimme laadstations ondersteunen automatische fase-schakeling en vermogensbegrenzing per fase om piekbelastingen binnen de 25A per fase-grens te houden.
- **Dynamische sturing:** Een EMS regelt de belasting in huis dynamisch (load balancing) om piekstromen en afschakeling van de hoofdzekering te voorkomen.

## Aandachtspunten voor Selectiviteit, Somstromen en Fase-onbalans

Naast de vermogenscapaciteit van de aansluiting moet rekening worden gehouden met de elektrotechnische beveiligingseisen uit de NEN 1010 en de Netcode Elektriciteit:

- **Selectiviteit:** Om selectiviteit ten opzichte van de 3x25A-hoofdzekering te waarborgen (met een veiligheidsfactor van 1,6), mag een omvormer of laadpaal op maximaal 16A worden afgezekerd. Dit komt overeen met maximaal 3,68 kW per fase of ~11 kW bij een 3-fase aansluiting.
- **Fase-onbalans:** Om fase-onbalans in het net te voorkomen, schrijft de Netcode Elektriciteit voor om invoeding van zonnepanelen boven 16A (3,68 kVA / ~3,68 kW) te verdelen over meerdere fases met een 3-fase omvormer. Vanaf dit vermogen is een 3-fase omvormer voorgeschreven.
- **Somstromen bij gelijktijdige invoeding:** Wanneer het net én een omvormer (PV of thuisbatterij) op dezelfde groep of aardlekschakelaar kunnen invoeden, telt de stroom van beide bronnen bij elkaar op. Bij een netstroom van 25A en een omvormerstroom van 16A ontstaat een somstroom van 41A. Een standaard 40A-aardlekschakelaar is daar niet op berekend, wat kan leiden tot overbelasting. De optelsom van actieve stromen dient daarom te worden getoetst aan de nominale stroom van elke gedeelde beveiliging.

Met een onderbouwing op basis van NEN 1010-gelijktijdigheid, Dynamic Load Balancing en de juiste selectiviteitsberekeningen toont u aan dat een woning op een standaard 3x25A-aansluiting kan blijven werken zonder dat een kostbare netverzwaring nodig is.

## Veelgestelde Vragen over 3x25A en All-Electric Woningen

### Is een 3x25A-aansluiting voldoende voor een all-electric woning?
Ja, in veel situaties volstaat een 3x25A-aansluiting (maximaal ~17,25 kW). Door het toepassen van de gelijktijdigheidsfactor volgens NEN 1010 en het inzetten van Dynamic Load Balancing kunnen piekbelastingen effectief worden opgevangen.

### Wat zijn de risico's van somstromen bij zonnepanelen op een 3x25A-aansluiting?
Wanneer de netstroom (25A) en de invoedingsstroom van een omvormer (bijv. 16A) samenkomen op dezelfde beveiliging, kan er een somstroom van 41A ontstaan. Een standaard 40A-aardlekschakelaar raakt hierdoor overbelast. Toetsing van gedeelde beveiligingen is daarom noodzakelijk.

### Waarom geldt een maximale afzekering van 16A voor groepen bij 3x25A?
Om selectiviteit te waarborgen ten opzichte van de 3x25A-hoofdzekering (met een factor 1,6 volgens NEN 1010), mag een eindgroep voor bijvoorbeeld een laadpaal of omvormer op maximaal 16A worden afgezekerd.
`;

export function Post3x25aAansluitingAllElectricWoningNen1010Article() {
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
