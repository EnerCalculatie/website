import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'zonnepanelen-meerdere-dakvlakken-jaaropbrengst-berekenen')!;

const markdown = `
Het berekenen van de totale jaaropbrengst van zonnepanelen op meerdere dakvlakken gebeurt door de verwachte opbrengst per afzonderlijk dakvlak te berekenen (op basis van vermogen, hellingshoek en oriëntatie) en deze bij elkaar op te tellen. Het combineren van afwijkende oriëntaties beïnvloedt niet alleen het totale rendement, maar ook de belasting van de netaansluiting en de keuze voor de juiste omvormer.

---

## Hoe berekent u de totale jaaropbrengst per dakvlak?

Om de totale jaaropbrengst van een installatie op meerdere dakvlakken te bepalen, wordt de verwachte opbrengst per afzonderlijk dakvlak berekend. Deze berekening vindt plaats op basis van het vermogen, de hellingshoek en de oriëntatie per dakvlak. Vervolgens worden de uitkomsten van deze afzonderlijke berekeningen bij elkaar opgeteld.

Volgens de NEN-normering voor energieprestatieberekeningen dient voor elk dakvlak de specifieke zoninstraling (in kWh/m²) te worden vermenigvuldigd met:
1. Het geïnstalleerde piekvermogen (in kWp).
2. De oriëntatie-afhankelijke systeemefficiëntie.

---

## Invloed van oriëntatie en hellingshoek op de zonne-instraling

Niet elk dakvlak ontvangt evenveel zonne-energie. De oriëntatie en de hellingshoek bepalen de hoeveelheid instraling:

* **Zuidoriëntatie:** Een dakvlak gericht op het zuiden met een hellingshoek van 30 tot 35 graden behaalt de maximale instralingsfactor (100%).
* **Oost- en westoriëntatie:** Een oost- of westoriëntatie ontvangt gemiddeld tussen de 80% en 85% van de maximale instraling.

### Spreiding van de stroomproductie
Een oost-westverdeling van panelen vlakt de piekproductie rond het middaguur af. Doordat de stroomopwekking beter over de dag wordt gespreid, kan de piekbelasting op de netaansluiting worden verminderd.

---

## Welke omvormer kiest u bij meerdere dakvlakken?

Wanneer panelen op verschillende dakvlakken met een afwijkende oriëntatie of hellingshoek worden aangesloten, zijn er specifieke technische oplossingen nodig om rendementsverliezen te voorkomen:

### Standaard string-omvormers en MPPT
Als panelen met verschillende oriëntaties worden aangesloten op een standaard string-omvormer, worden deze op gescheiden MPPT-ingangen (Maximum Power Point Tracker) geplaatst. Dit voorkomt rendementsverliezen door onderlinge beïnvloeding van de verschillende dakvlakken.

### Power optimizers voor individuele regeling
Bij het gebruik van power optimizers per paneel kan elk paneel afzonderlijk op zijn maximale vermogenspunt werken. Hierdoor is het mogelijk om panelen op verschillende dakvlakken en hellingshoeken in een enkele string te combineren.

### Netcode en fasering van de omvormer
Volgens de Netcode Elektriciteit geldt dat invoeding boven 16A (3,68 kVA) over meerdere fases verdeeld dient te worden om fase-onbalans te voorkomen. Omvormers groter dan circa 3,68 kW worden in de praktijk daarom aangesloten op een 3-fase omvormer. Boven 5 kW aan omvormervermogen is een 3-fase aansluiting in veel gevallen noodzakelijk om onbalans in het net te voorkomen.

---

## NEN 1010 eisen voor veiligheid en installatie in de groepenkast

Bij de elektrische aansluiting van de omvormer in de groepenkast stelt de NEN 1010 duidelijke eisen aan overstroombeveiliging en selectiviteit:

* **Afzekering en selectiviteit:** Om selectiviteit ten opzichte van de hoofdzekering te waarborgen, mag een omvormer bij een hoofdaansluiting van 1x35A of 3x25A doorgaans op maximaal 16A worden afgezekerd. Dit komt overeen met een maximaal vermogen van 3,68 kW per fase (16A × 230V) of circa 11 kW bij een 3-fase aansluiting (3 × 16A).
* **Voorkomen van overbelasting door somstromen:** Wanneer de omvormer en het elektriciteitsnet gelijktijdig stroom leveren op dezelfde groep of aardlekschakelaar, tellen de stromen van beide bronnen bij elkaar op. Bij een netvoeding van 25A en een omvormerstroom van 16A ontstaat bijvoorbeeld een somstroom van 41A. Een standaard 40A-aardlekschakelaar is daar niet op berekend, wat kan leiden tot overbelasting en brandgevaar. Bij gelijktijdige invoeding dient de optelsom van actieve stromen daarom getoetst te worden aan de nominale stroom van gedeelde beveiligingscomponenten.

---

## Veelgestelde vragen over zonnepanelen op meerdere dakvlakken

### Hoe bereken je de opbrengst van zonnepanelen op verschillende dakvlakken?
Je berekent per dakvlak de opbrengst door de zoninstraling (kWh/m²) te vermenigvuldigen met het piekvermogen (kWp) en de systeemefficiëntie. Daarna tel je de uitkomsten van alle vlakken bij elkaar op.

### Welke omvormer is geschikt bij meerdere oriëntaties?
Kies een string-omvormer met meerdere gescheiden MPPT-ingangen (één per dakvlak) of gebruik power optimizers per paneel voor een individuele regeling.

### Wanneer is een 3-fase omvormer verplicht?
Volgens de Netcode Elektriciteit moet een invoeding boven 16A (3,68 kVA) over meerdere fases verdeeld worden. Boven 5 kW is een 3-fase aansluiting vrijwel altijd noodzakelijk.
`;

export function ZonnepanelenMeerdereDakvlakkenJaaropbrengstBerekenenArticle() {
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
