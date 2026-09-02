import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'aardlekbeveiliging-type-b-nen-1010-laadpaal-omvormer')!;

const markdown = `
Een verkeerd gekozen aardlekschakelaar bij een laadpaal of PV-omvormer kan de reguliere aardlekbeveiliging in een woning ongemerkt uitschakelen door magnetische verzadiging (blindering). Volgens NEN 1010 is een Type B aardlekschakelaar verplicht bij laadstations en omvormers, tenzij de apparatuur zelf aantoonbaar beschikt over een geïntegreerde DC-lekstroombeveiliging van maximaal 6 mA (zoals een RDC-DD of RCMU). Om discussies met klanten over meerkosten te voorkomen en te voldoen aan het Besluit bouwwerken leefomgeving (Bbl), is een heldere technische onderbouwing in de offerte doorslaggevend.

## NEN 1010 Eisen voor Type B bij Laadpalen en Omvormers

De NEN 1010 stelt specifieke eisen aan het toepassen van Type B aardlekbeveiliging bij de installatie van omvormers en laadstations om de elektrische veiligheid te waarborgen.

Voor laadpalen bepaalt NEN 1010 rubriek 722.531.2.101 dat elk oplaadpunt voor elektrische voertuigen individueel beveiligd dient te worden door een Type B aardlekschakelaar. Een uitzondering geldt wanneer het oplaadpunt is uitgerust met een Type A aardlekschakelaar gecombineerd met een DC-lekstroombeveiligingsvoorziening (RDC-DD volgens IEC 62955) die uitschakelt bij een DC-foutstroom boven 6 mA.

Voor PV-installaties vermeldt NEN 1010 bepaling 712.530.3.101 dat aan de AC-zijde een Type B aardlekschakelaar moet worden toegepast. Dit is niet noodzakelijk indien de omvormer beschikt over minimaal een eenvoudige scheiding (galvanische scheiding of transformator) tussen de AC- en DC-zijde, of wanneer de fabrikant van de omvormer schriftelijk verklaart dat de omvormer geen DC-foutstromen groter dan 6 mA naar de AC-installatie kan voeden.

## Verschil tussen Type A en Type B: Het Gevaar van Blindering

Type A aardlekschakelaars zijn uitsluitend ontworpen en getest voor het detecteren van sinusvormige wisselstromen en pulserende gelijkstromen. Ze zijn niet geschikt voor het verwerken van gladde gelijkstromen (DC) boven 6 mA.

Type B aardlekschakelaars beveiligen tegen wisselstromen, pulserende gelijkstromen én gladde gelijkstromen (DC) tot hoge frequenties (tot 1 kHz). Dit maakt ze geschikt voor installaties met vermogenselektronica, frequentieregelaars en laadstations.

Wanneer een DC-foutstroom groter dan 6 mA optreedt bij een Type A aardlekschakelaar, ontstaat magnetische verzadiging van de spoelkern (ook wel 'blindering' genoemd). Het uitschakelmechanisme blokkeert hierdoor, waardoor de aardlekschakelaar niet meer reageert op gevaarlijke AC-lekstromen in de installatie.

## Wanneer Volstaat een Type A Aardlekschakelaar?

In veel residentiële situaties kan een kostbare externe Type B aardlekschakelaar in de verdeelkast worden vermeden door de juiste hardwarekeuze.

Wanneer een laadpaal beschikt over een geïntegreerde en gecertificeerde RDC-DD (Residual Direct Current Detecting Device conform IEC 62955), is een externe Type B aardlekschakelaar in de verdeelkast niet vereist. In dat geval volstaat een standaard Type A aardlekschakelaar of aardlekautomaat.

Bij zonnepanelen beschikken moderne transformatorloze PV-omvormers vaak over geïntegreerde elektronische aardlek- en DC-bewakingseenheden (RCMU/RCD volgens norm IEC 62109-1/-2). Indien de fabrikant schriftelijk verklaart dat DC-foutstromen boven 6 mA worden uitgesloten, is het plaatsen van een externe Type B aardlekschakelaar voor de meeste residentiële PV-omvormers niet nodig.

## Juridische en Verzekeringstechnische Consequenties

Elektrische installaties in woningen en utiliteitsgebouwen moeten ingevolge het Besluit bouwwerken leefomgeving (Bbl) en de Woningwet voldoen aan de fundamentele veiligheidseisen van NEN 1010.

Het toepassen van een Type A aardlekschakelaar bij een laadpaal zonder interne 6 mA DC-detectie (RDC-DD) veroorzaakt een niet-conforme installatie volgens de norm. Bij het ontstaan van schade kan dit tot gevolg hebben dat de opstallen- of brandverzekering de dekking weigert.

## Meerkosten Helder Onderbouwen in de Offerte

Om prijsdiscussies over de opbouw van de verdeelkast te voorkomen, dient de installateur de noodzaak van componenten helder te verantwoorden:

- **Verwijs expliciet naar de norm:** Benoem NEN 1010 rubriek 722 (laadinfra) of bepaling 712 (PV) direct in de offertetekst.
- **Leg het risico op blindering uit:** Licht toe dat DC-lekstromen reguliere aardlekschakelaars in de woning buiten werking kunnen stellen.
- **Toon de hardwarekeuze aan:** Geef aan of de gekozen omvormer of laadpaal al beschikt over interne DC-foutstroombeveiliging.

### Beslisinformatie Aardlekbeveiliging

| Situatie / Hardware | Geïntegreerde DC-detectie (> 6 mA) | Benodigde beveiliging in verdeelkast | NEN 1010 normering |
| :--- | :--- | :--- | :--- |
| Laadpaal met RDC-DD (IEC 62955) | Aanwezig | Type A aardlekschakelaar / RBO | Rubriek 722.531.2.101 |
| Laadpaal zonder RDC-DD | Niet aanwezig | Type B aardlekschakelaar | Rubriek 722.531.2.101 |
| PV-omvormer met RCMU (IEC 62109) + verklaring | Aanwezig (max 6 mA DC) | Type A / standaard beveiliging | Bepaling 712.530.3.101 |
| PV-omvormer zonder scheiding of verklaring | Niet aanwezig | Type B aardlekschakelaar | Bepaling 712.530.3.101 |

Door deze onderbouwing op te nemen in de offerte, is voor de klant direct helder waarom een eventuele meerprijs voor Type B beveiliging of specifieke hardware noodzakelijk is voor de veiligheid van de woning.

## Veelgestelde Vragen

### Wanneer is een Type B aardlekschakelaar verplicht bij een laadpaal?
Een Type B aardlekschakelaar is verplicht volgens NEN 1010 rubriek 722, tenzij het oplaadpunt beschikt over een geïntegreerde 6 mA DC-lekstroomdetectie (RDC-DD conform IEC 62955).

### Wat is het risico van blindering bij een Type A aardlekschakelaar?
DC-lekstromen boven 6 mA verzadigen de spoelkern van een Type A aardlekschakelaar. Hierdoor raakt het mechanisme geblokkeerd en schakelt het niet meer uit bij een gevaarlijk AC-lekstroomlek elders in het pand.

### Is een Type B aardlekschakelaar altijd verplicht bij PV-omvormers?
Nee, als de omvormer beschikt over een galvanische scheiding of als de fabrikant schriftelijk verklaart dat DC-foutstromen naar de AC-zijde maximaal 6 mA bedragen (IEC 62109), volstaat een standaard Type A beveiliging.
`;

export function AardlekbeveiligingTypeBNen1010LaadpaalOmvormerArticle() {
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
