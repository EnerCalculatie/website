import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'zonnepanelen-installatie-uitbreiden-omvormer-regels')!;

const markdown = `
Wilt u een bestaande zonnepanelen-installatie uitbreiden? Dan spelen zowel de dimensionering van de omvormer als de technische inpassing in de meterkast een centrale rol. Het uitbreiden kan door extra panelen op een bestaande omvormer aan te sluiten of door het installeren van een grotere omvormer. Hieronder leest u hoe overdimensionering van een omvormer werkt en aan welke eisen uit de NEN 1010 en Netcode moet worden voldaan.

## Omvormer overdimensioneren en de impact van clipping

Bij de uitbreiding van een installatie kan het generatorvermogen (of DC-vermogen in Wp) van de zonnepanelen hoger gekozen worden dan het nominale vermogen van de omvormer. Dit noemt men overdimensioneren. Zo staat fabrikant SolarEdge voor HD-Wave omvormers een DC/AC-verhouding tot 155% toe zonder dat de garantie op de apparatuur vervalt.

Het overdimensioneren van de PV-capaciteit ten opzichte van de omvormer leidt in de praktijk tot 'clipping' (het aftoppen van vermogen op piekmomenten). Op jaarbasis zorgt dit gemiddeld voor minder dan 1 tot 3% verlies in de totale energie-opbrengst. Een voordeel van deze opzet is dat de omvormer bij lage instraling sneller opstart, wat gunstig is voor de productie op minder zonnige dagen.

## Technische eisen en NEN 1010 richtlijnen bij uitbreiding

Wanneer het AC-vermogen van een omvormer verandert of wordt uitgebreid, moeten diverse elektrische parameters opnieuw worden beoordeeld.

### Kabeldiameter berekenen en spanningsstijging (253V)
Conform de NEN 1010 moet bij een uitbreiding van het AC-vermogen de kabeldiameter opnieuw berekend worden. Dit dient om te zorgen dat het spanningsverlies — en daarmee de spanningsstijging — tussen de omvormer en de meterkast maximaal 1% bedraagt. 

Wanneer de netspanning door lokale overproductie boven de 253 volt (230V + 10%) stijgt, schakelt een omvormer zichzelf uit veiligheidsoverwegingen automatisch uit volgens de netcode.

### Fase-verdeling en selectiviteit t.o.v. de hoofdzekering
Om fase-onbalans op het net te voorkomen, stelt de Netcode Elektriciteit dat invoeding van zonnepanelen boven de 16A (3,68 kVA) over meerdere fases verdeeld moet worden. Vanaf omvormers groter dan circa 3,68 kW (in de praktijk vaak vanaf 4 kW) kan er daardoor niet met een 1-fase omvormer gewerkt worden, maar is een 3-fase omvormer nodig.

Daarnaast geldt voor het waarborgen van de selectiviteit t.o.v. de hoofdzekering:
- Bij een hoofdaansluiting van 1x35A of 3x25A mag een omvormer op een afzonderlijke groep doorgaans op maximaal 16A worden afgezekerd. Dit comes overeen met een maximaal vermogen van 3.680 Watt (3,68 kW) per fase.
- Bij een 3-fase omvormer op een 3x25A aansluiting is het maximale terug te leveren vermogen in de praktijk begrensd tot circa 11 kW (3 × 16A afgezekerd), omdat er anders geen selectiviteit gewaarborgd is ten opzichte van de hoofdzekering van de netbeheerder.
- Om een hoger vermogen aan te sluiten op de installatie is een verzwaring van de aansluiting (bijvoorbeeld naar 3x35A) noodzakelijk.

### Groepenkast aanpassen, somstromen en overbelasting
Aanpassingen in de groepenkast ter uitbreiding van de omvormercapaciteit moeten voldoen aan de NEN 1010-eisen voor de maximale stroombelastbaarheid van de interne bedrading en de keuze voor de juiste aardlekbeveiliging (Type A of Type B, afhankelijk van de omvormerspecificaties).

Indien het net én een omvormer op dezelfde groep of dezelfde aardlekschakelaar kunnen invoeden, tellen de stromen van beide bronnen bij elkaar op:
- **Rekenvoorbeeld:** Een stroom van 25A vanaf het net gecombineerd met 16A vanaf de omvormer geeft een totale stroom van 41A.
- Een standaard 40A-aardlekschakelaar kan door een dergelijke somstroom overbelast raken, wat brandgevaar oplevert. De optelsom van gelijktijdig actieve stromen moet daarom getoetst worden aan de nominale stroom van gedeelde beveiligingscomponenten.

Om piekstromen en afschakeling van de hoofdzekering te voorkomen, kan een Home Energy Management System (EMS) worden toegepast dat de belasting in huis dynamisch regelt via load balancing.

## Verplichte aanmelding bij energieleveren.nl

Bij elke uitbreiding van de zonnepaneelinstallatie waarbij het totale omvormervermogen verandert, is registratie op energieleveren.nl wettelijk voorgeschreven. Deze melding helpt de netbeheerder om netoverbelasting te monitoren en te voorkomen.

## Veelgestelde vragen (FAQ)

### Wat is het effect van het overdimensioneren van een omvormer?
Overdimensioneren betekent dat het DC-vermogen van de zonnepanelen hoger is dan het nominale vermogen van de omvormer. Dit leidt op piekmomenten tot 'clipping', wat op jaarbasis gemiddeld minder dan 1 tot 3% verlies geeft, terwijl de omvormer bij lage instraling sneller opstart.

### Waarom schakelt een omvormer uit bij 253 volt?
Volgens de Netcode moet een omvormer automatisch uitschakelen wanneer de netspanning door overproductie stijgt boven de 253 volt (230V + 10%) om de elektrische installatie te beschermen.

### Wanneer is een 3-fase omvormer verplicht?
Invoeding boven de 16A (3,68 kVA) moet volgens de Netcode over meerdere fases worden verdeeld. Vanaf een omvormervermogen groter dan circa 3,68 kW (in de praktijk vanaf 4 kW) is een 3-fase omvormer vereist.

### Wat zijn somstromen en waarom vormen ze een risico?
Wanneer netstroom en omvormerstroom samenkomen op één aardlekschakelaar (zoals 25A + 16A = 41A), kan een standaard 40A-component overbelast raken. Dit zorgt voor brandgevaar als de bedrading hier niet op berekend is.
`;

export function ZonnepanelenInstallatieUitbreidenOmvormerRegelsArticle() {
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
