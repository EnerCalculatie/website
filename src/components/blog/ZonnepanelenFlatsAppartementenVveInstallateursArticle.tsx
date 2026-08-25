import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'zonnepanelen-flats-appartementen-vve-installateurs')!;

const markdown = `
Het plaatsen van zonnepanelen op appartementencomplexen en flatgebouwen vraagt om een specifieke aanpak. Installateurs krijgen te maken met zowel bestuurlijke processen (VvE) als technische eisen rondom bouwkunde (NEN 7250), brandveiligheid en de elektrische infrastructuur (NEN 1010).

## Besluitvorming en financiële kaders bij de VvE

Voor het realiseren van een zonnestroominstallatie op het gemeenschappelijke dak van een appartementencomplex is doorgaans een formeel besluit van de Vereniging van Eigenaars (VvE) vereist. Dit besluit wordt genomen op basis van de toepasselijke splitsingsakte en de daarin vastgelegde stemverhoudingen.

Daarnaast kunnen VvE's en appartementseigenaren in veel gevallen gebruikmaken van de Subsidie verduurzaming voor Verenigingen van Eigenaars (SVVE). Deze regeling van de RVO biedt subsidie voor verduurzamingsmaatregelen en oplaadpuntenadvies. Zie [verduurzamingsadvies voor een VvE-collectief](/blog/verduurzamingsadvies-vve-collectief-plan) voor hoe u dit besluitvormingstraject breder aanpakt dan alleen de zonnepanelen.

## Bouwkundige eisen en brandveiligheid op platte daken

De bouwkundige integratie van zonne-energiesystemen op platte daken van hoge gebouwen vraagt om nauwkeurige berekeningen. De norm NEN 7250 geeft hiervoor de normen en rekenmethodes met betrekking tot de bouwkundige constructie, zoals de wind- en dakbelasting.

Bij het aanleggen van bekabeling van het dak naar de meterkasten passeren de kabels doorgaans verschillende brandcompartimenten. Conform het Bouwbesluit / Besluit bouwwerken leefomgeving dient de brandwerendheid van deze scheidingsconstructies behouden te blijven bij het doorvoeren van kabels. Zorg dat de brandwerendheid van deze scheidingsconstructies expliciet is meegenomen in het installatieplan.

## Elektrische installatie, bekabeling en NEN 1010

De elektrische installatie en de bekabeling van het dak naar de meterkasten dienen te voldoen aan de veiligheids- en installatie-eisen uit de NEN 1010 norm voor laagspanningsinstallaties. Voor de installateur spelen hierbij diverse technische aspecten een rol:

- **Selectiviteit en vermogen:** Om selectiviteit ten opzichte van de hoofdzekering te waarborgen, geldt in de praktijk bij een hoofdaansluiting van 1x35A of 3x25A dat een omvormer op maximaal 16A wordt afgezekerd. Dit komt overeen met een maximaal vermogen van 3,68 kW (3.680 Watt) per fase.
- **Fase-verdeling:** Op basis van de Netcode Elektriciteit dient invoeding boven de 16A (3,68 kVA) over meerdere fases verdeeld te worden om fase-onbalans te voorkomen. Dit betekent dat er vanaf omvormers groter dan circa 3,68 kW (of 4 kW in de praktijk) wordt overgestapt op een 3-fase omvormer.
- **Somstromen bij gelijktijdige invoeding:** Wanneer het net én een omvormer op dezelfde groep of aardlekschakelaar kunnen invoeden, tellen de stromen bij elkaar op. Een situatie met 25A vanaf het net en 16A vanaf de omvormer levert een optelsom van 41A op. Een standaard 40A-aardlekschakelaar is daar niet op berekend, wat kan leiden tot overbelasting en brandgevaar. Bij gelijktijdige invoeding dient de optelsom van de gelijktijdig actieve stromen getoetst te worden aan de nominale stroom van elke gedeelde beveiliging (zoals de aardlekschakelaar, groep of hoofdzekering) — en niet alleen aan de losse componenten afzonderlijk.

## Aansluitingen, netbeheer en saldering bij appartementen

Bij het aanpassen of vergroten van een centrale VvE-aansluiting of individuele meterkasten moet worden voldaan aan de eisen van de regionale netbeheerder (zoals Stedin, Liander of Enexis).

- **Centrale VvE-voorziening:** Wanneer de zonnestroominstallatie wordt aangesloten op een centrale voorziening (zoals een VvE-aansluiting voor verlichting in algemene ruimten of liften), dient de teruglevering geregistreerd te worden via Energieleveren.nl.
- **Salderingsregeling:** De wettelijke salderingsregeling geldt specifiek per individuele kleinverbruikeraansluiting achter de energiemeter. Dit kan niet zonder meer verrekend worden tussen een centrale VvE-meter en de individuele appartementen.
`;

export function ZonnepanelenFlatsAppartementenVveInstallateursArticle() {
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
