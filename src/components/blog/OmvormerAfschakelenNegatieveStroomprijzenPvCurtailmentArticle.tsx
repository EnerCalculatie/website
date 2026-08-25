import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'omvormer-afschakelen-negatieve-stroomprijzen-pv-curtailment')!;

const markdown = `
Bij dynamische energiecontracten kunnen de uurprijzen op de EPEX SPOT-beurs in veel gevallen negatief worden wanneer het aanbod van zonne- en windenergie groter is dan de vraag. Om te voorkomen dat een afnemer te maken krijgt met negatieve terugleververgoedingen of dat er overbelasting van het net ontstaat, kan de productie van zonne-energie tijdelijk worden verminderd of stopgezet. Dit proces staat bekend als **PV-curtailment**.

Door de invoering van terugleverheffingen door energieleveranciers en de voorgenomen afschaffing van de salderingsregeling verandert de businesscase van onbeperkt terugleveren. Hierdoor wordt actieve sturing op eigenverbruik en curtailment in veel situaties een belangrijk onderdeel van een installatie-advies.

---

## Technische eisen en sturingsmogelijkheden van omvormers

Om sturing en curtailment mogelijk te maken, gelden er specifieke eisen voor de apparatuur en de netinpassing:

- **Normering voor vermogensregeling:** Conform de norm NEN-EN 50549-1 en de Netcode Elektriciteit dienen omvormers te beschikken over functies voor vermogensregeling. Dit betekent dat het uitgangsvermogen zowel lokaal als op afstand begrensd kan worden.
- **Slimme sturing:** Fabrikanten zoals SolarEdge integreren functionaliteiten zoals *dynamic power control* en *Smart Energy Management* in hun omvormers. Hiermee kan het vermogen automatisch worden aangepast op basis van de EPEX-dagprijzen en de actuele lokale verbruiksbehoefte.
- **Home Energy Management Systemen (EMS):** Een EMS kan de belasting in huis dynamisch regelen (load balancing) om piekstromen te voorkomen.
- **Spanningsbeveiliging:** Als de netspanning door lokale overproduction stijgt tot boven de wettelijke grens van 253 volt (10% boven de nominale 230V), schakelt de omvormer conform NEN 1010 en netcodeveiligheidseisen automatisch uit.

---

## Belangrijke aandachtspunten voor het installatie-adviesrapport

Bij het opstellen van een adviesrapport over de inpassing van zonnepanelen en curtailment is het van belang om ook de veiligheids- en netinpassingsregels uit de NEN 1010 en de Netcode Elektriciteit mee te nemen.

### 1. Voorkomen van fase-onbalans op het net
Om fase-onbalans op het net te voorkomen, geldt op basis van de Netcode Elektriciteit dat een invoeding boven de 16A (3,68 kVA) over meerdere fases verdeeld moet worden. Vanaf omvormers met een vermogen groter dan circa 3,68 kW wordt daarom gebruikgemaakt van een 3-fase omvormer.

### 2. Beoordeling en berekening van somstromen
Bij een installatie waar zowel het elektriciteitsnet als een omvormer (zoals PV of een thuisbatterij) op dezelfde groep of aardlekschakelaar invoeden, tellen de stromen van beide bronnen bij elkaar op:
- **Rekenvoorbeeld:** 25A vanaf het net + 16A vanaf de omvormer = **41A**.
- **Risico:** Een standaard 40A-aardlekschakelaar is vaak niet berekend op deze totale stroom, wat kan leiden tot overbelasting en brandgevaar.
- **Adviesregels:** Bij een ontwerp met gelijktijdige invoeding moet in het rapport de optelsom van alle gelijktijdig actieve stromen getoetst worden aan de nominale stroom van de gedeelde beveiligingscomponenten.

---

## Conclusie

Het onderbouwen van PV-curtailment in een adviesrapport rust op het combineren van marktontwikkelingen (zoals dynamische EPEX SPOT-prijzen en terugleverheffingen) met technische regelgeving. Door omvormers toe te passen die voldoen aan de NEN-EN 50549-1 en de Netcode Elektriciteit voor vermogensregeling, en door in het ontwerp rekening te houden met de regels voor fase-onbalans en somstromen, ontstaat een technisch correct en bedrijfseconomisch onderbouwd advies.

`;

export function OmvormerAfschakelenNegatieveStroomprijzenPvCurtailmentArticle() {
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
