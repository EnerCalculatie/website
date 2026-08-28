import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'somstromen-nen-1010-scios-scope-12-pv-installaties')!;

const markdown = `
Waarom kiezen klanten in offertetrajecten regelmatig voor de goedkoopste aanbieder? Vaak beseffen zij niet dat kritieke veiligheidseisen ontbreken. Een omvormer van 16A op een bestaande 25A-hoofdaansluiting kan via een 40A-aardlekschakelaar een somstroom van 41A veroorzaken, wat overbelasting en direct brandgevaar oplevert. Als erkend installateur kunt u met duidelijke onderbouwing volgens NEN 1010, InstallQ en SciOS Scope 12 aantonen waarom uw technisch veilige ontwerp de juiste keuze is.

## Het risico van overbelasting en somstromen (41A op 40A aardlek)

Wanneer netstroom en omvormerstroom gelijktijdig op dezelfde aardlekschakelaar invoeden, tellen deze stromen bij elkaar op. Bij een netvoeding van 25A en een PV-invoeding van 16A ontstaat een totale stroom van 41A. Een standaard 40A-aardlekschakelaar is hier niet op berekend.

Zonder exacte toetsing van deze somstromen aan de nominale stroom van gedeelde beveiligingen ontstaan gevaarlijke situaties. Bovendien geldt volgens de NEN 1010 dat selectiviteit gewaarborgd moet blijven. Op een standaard 3x25A-aansluiting mag een omvormer doorgaans op maximaal 16A worden afgezekerd, wat neerkomt op 3,68 kW per fase of circa 11 kW bij 3-fase. Het zomaar aansluiten van 17,25 kW op een 3x25A aansluiting is technisch onjuist zonder netverzwaring.

## Kwaliteitsborging in uw offerte: InstallQ, SciOS Scope 12 en NEN 1010

Om het verschil met snelle prijsvechters te maken, helpt het om de specifieke normen en erkenningen helder op te nemen in uw advies en offerte:

- **InstallQ-erkenning:** Hiermee toont u aan dat uw installatiebedrijf werkt volgens erkenningsregelingen en dat uw monteurs aantoonbaar vakbekwaam handelen.
- **SciOS Scope 12:** Deze specifieke inspectie richt zich op het voorkomen van brandgevaar en elektrische storingen bij PV-systemen. Veel brand- en opstalverzekeraars stellen een positief SciOS Scope 12-inspectierapport als voorwaarde voor het dekken van zakelijke zonnestroominstallaties.
- **NEN-EN-IEC 62446:** Deze norm specificeert de eisen voor documentatie, opleveringscontroles en beproevingen van netgekoppelde PV-systemen.
- **NEN 1010 & Netcode Elektriciteit:** Om fase-onbalans te voorkomen, dient invoeding boven de 16A (3,68 kVA) over meerdere fases te worden verdeeld. Een overstap naar een 3-fase omvormer is daardoor vanaf circa 3,68 kW noodzakelijk.

## Waarom een kwaliteitsofferte het wint van de prijsvechter

Het expliciet benoemen van deze normen transformeert uw offerte van een eenvoudige prijsopgave naar een technisch borgingsdocument. In onderstaande tabel ziet u hoe kwaliteitsborging direct inzichtelijk wordt gemaakt voor de klant:

| Onderdeel | Standaard offerte | Offerte met kwaliteitsborging |
| :--- | :--- | :--- |
| **Beveiliging** | Alleen losse componenten beoordeeld | Somstromen berekend volgens NEN 1010 (voorkomt overbelasting 40A-aardlek) |
| **Faseverdeling** | Eventueel risico op fase-onbalans | 3-fase omvormer toegepast vanaf 3,68 kW conform Netcode Elektriciteit |
| **Verzekerbaarheid** | Geen opleverdocumentatie | Voldoet aan SciOS Scope 12 en NEN-EN-IEC 62446 voor zakelijke dekking |
| **Vakbekwaamheid** | Onbekend | Aantoonbaar geborgd via InstallQ-erkenningsregeling |

Door deze punten op te nemen, legt u de klant uit dat een lagere prijs bij concurrenten vaak betekent dat noodzakelijke aanpassingen in de verdeelkast zijn weggelaten.

## Automatisering en borging van NEN 1010 rekenregels

Het handmatig narekenen van gelijktijdigheid, fase-onbalans en somstromen kost tijd, maar is essentieel voor een goedgekeurde oplevering. Een gestroomlijnde berekening toetst de optelsom van de gelijktijdig actieve stromen direct aan de nominale stroom van elke gedeelde beveiliging.

Door deze technische toetsing standaard te integreren in de offertefase, levert u documentatie af die direct aansluit op de opleveringscontroles van NEN-EN-IEC 62446 en de eisen van SciOS Scope 12. Dit geeft zowel de klant als de verzekeraar vooraf de zekerheid van een veilige en regelconforme zonnestroominstallatie.

## Veelgestelde vragen over somstromen en NEN 1010

### Wat is het gevaar van somstromen bij zonnepanelen?
Somstromen ontstaan wanneer netstroom (bijv. 25A) en zonnestroom (bijv. 16A) samenkomen op dezelfde aardlekschakelaar. Hierdoor kan er 41A door een 40A-beveiliging stromen, met overbelasting en brandgevaar tot gevolg.

### Waarom eisen verzekeraars een SciOS Scope 12 inspectie?
SciOS Scope 12 garandeert dat een zonnestroominstallatie grondig is geïnspecteerd op brandveiligheid en elektrische risico's. Veel opstalverzekeraars stellen dit verplicht voor het dekken van zakelijke PV-systemen.

### Wanneer is een 3-fase omvormer verplicht?
Volgens NEN 1010 en de Netcode Elektriciteit moet een invoeding boven de 16A (circa 3,68 kW) over meerdere fases worden verdeeld om fase-onbalans te voorkomen.
`;

export function SomstromenNen1010SciosScope12PvInstallatiesArticle() {
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
