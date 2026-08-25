import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'offertesoftware-verduurzaming-normen-eisen')!;

const markdown = `
Waar moet kwalitatieve offerte- en adviesrapport software voor verduurzaming aan voldoen? Om installateurs te ondersteunen bij het opleveren van veiligheidstechnisch en financieel verantwoorde adviezen, dient software strikt aan te sluiten bij geldende normeringen zoals NTA 8800, NEN 1010, NEN 3140, de Netcode Elektriciteit en ISDE-subsidie-eisen.

---

## Energieprestatie en ISDE-subsidievoorwaarden (NTA 8800)

Voor het nauwkeurig berekenen van de energieprestatie en het opstellen van officiële energie-adviesrapporten voor gebouwen dient te worden gerekend conform de **NTA 8800**.

Wanneer software offertes of adviezen opstelt waarin subsidies worden meegenomen, gelden specifieke criteria:
* **Warmtepompen:** Om in aanmerking te komen voor ISDE-subsidie moet de software rekenen met de exacte ISDE-meldcodes (KA-codes) en de door de RVO vastgestelde minimale rendements- en vermogenseisen.
* **Isolatiemaatregelen:** Voor het doorrekenen van ISDE-subsidie bij isolatie dient de software uit te gaan van specifieke minimale isolatiewaarden. Voor dak-, zolder- en vloerisolatie geldt een minimale Rd-waarde van 3,5 m²K/W.

---

## Elektrische dimensionering en veiligheid (NEN 1010, NEN 3140 en Netcode)

Elektrische dimensionering en kabelberekeningen in offertesoftware dienen te voldoen aan de veiligheidseisen uit de **NEN 1010** en **NEN 3140** normen.

### Aansluitcapaciteit en selectiviteit
Een standaard 3x25A hoofdaansluiting kent een maximaal continu vermogen van 17,25 kW. Bij het ontwerpen van installaties moet adviessoftware echter rekening houden met selectiviteit ten opzichte van de hoofdzekering:
* Met de gebruikelijke veiligheidsmarge (factor 1,6) mag een omvormer of laadpaal bij een hoofdaansluiting van 1x35A of 3x25A doorgaans op maximaal **16A per fase** worden afgezekerd.
* Dit komt neer op een maximaal vermogen van **3,68 kW per fase** (16A × 230V) en een maximaal 3-fase vermogen van **~11 kW** op een 3x25A aansluiting.
* Het direct aansluiten van grotere vermogens op een 3x25A aansluiting vereist in veel gevallen een verzwaring van de aansluiting (bijvoorbeeld naar 3x35A of hoger).

### Fase-onbalans en fasering
Conform de Netcode Elektriciteit dient invoeding van zonnepanelen boven de 16A (3,68 kVA) verdeeld te worden over meerdere fases om fase-onbalans te voorkomen:
* Vanaf omvormers groter dan circa 3,68 kW (of 4 kW in de praktijk) dient te worden overgestapt op een 3-fase omvormer.
* Ook bij zonnepanelen met meer dan 5 kW omvormervermogen of bij een warmtepomp boven de 5 kW thermisch is in veel gevallen een 3-fase aansluiting noodzakelijk.

### Registratie van installaties
Installaties van zonnepanelen, batterijen en laadpalen met een vermogen groter dan 16 Ampère per fase dienen geregistreerd te worden via energieleveren.nl of MijnAansluiting.nl.

---

## Realistiche opbrengst- en financiële berekeningen (ACM & Milieu Centraal)

Om in offertes realistische terugverdientijden en opbrengsten te tonen, dient de software gebruik te maken van vastgestelde standaarden:

* **Zonnepaneelopbrengst:** Milieu Centraal hanteert voor een zetsysteem in Nederland met een optimale oriëntatie en hellingshoek een gemiddelde jaarlijkse opbrengstfactor van **0,85 tot 0,90 kWh per Wattpiek (Wp)**.
* **Terugverdientijd en energietarieven:** Berekeningen van de terugverdientijd dienen te voldoen aan de richtlijnen van de ACM. Hierbij moet rekening worden gehouden met specifieke terugleverkosten en de vastrechtstructuren die energieleveranciers hanteren.

---

## Slimme afstemming tussen installatiecomponenten

Advies- en offertesoftware dient rekening te houden met de eigenschappen van specifieke verduurzamingstechnieken:

* **Home Energy Management Systemen (EMS):** Een EMS regelt de elektrische belasting in een pand dynamisch (load balancing) om piekstromen en het afschakelen van de hoofdzekering te voorkomen.
* **Laadpalen:** Het maximale laadvermogen voor een 3-fase lader op een 3x25A aansluiting bedraagt doorgaans 11 kW, tenzij er sprake is van actieve slimme sturing of load balancing.
* **Thuisbatterijen:** 1-fase thuisbatterijen kunnen, afhankelijk van de netbeheerder, over het algemeen laden en ontladen met een vermogen van maximaal 3,68 kW tot 5 kW.

---

## Conclusie

Software voor offerte- en adviesrapporten ondersteunt installateurs bij het correct dimensioneren van verduurzamingssystemen. Door rekening te houden met de NTA 8800, NEN 1010/3140, de Netcode Elektriciteit, de ISDE-subsidiecriteria en de richtlijnen van de ACM, kunnen technisch haalbare en financieel onderbouwde adviezen worden opgesteld.

`;

export function OffertesoftwareVerduurzamingNormenEisenArticle() {
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
