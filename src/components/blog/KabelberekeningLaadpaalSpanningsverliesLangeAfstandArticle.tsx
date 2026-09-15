import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'kabelberekening-laadpaal-spanningsverlies-lange-afstand')!;

const markdown0 = `
Een laadpaal op 75 meter afstand aansluiten met een standaard 2,5 mm² kabel lijkt op het eerste gezicht kostenefficiënt, maar leidt in veel gevallen tot uitvallende laadsessies, oververhitting en ontevreden opdrachtgevers. Zodra het spanningsverlies op lange kabeltrajecten te hoog oplopt, grijpt de interne elektronica van de laadpaal of de boordlader van de auto in. Hoe berekent u als installateur of adviseur het exacte spanningsverlies volgens de geldende normen, en hoe onderbouwt u de noodzakelijke meerkosten van een dikkere kabel helder in uw offerte?

## Wat is het maximaal toegestane spanningsverlies volgens NEN 1010?

In de NEN 1010 (bepaling 525) staat vermeld dat het spanningsverlies tussen het begin van de elektrische installatie (de meterkast of het overdrachtspunt) en het aansluitpunt van een verbruiker in de regel niet groter mag zijn dan 5%. Voor verlichting geldt een richtlijn van 3%, maar voor laadinfrastructuur en overige apparatuur wordt de 5%-grens gehanteerd.

In de praktijk adviseren fabrikanten zoals Alfen en Zaptec echter een strengere grens van maximaal 2% tot 3% spanningsverlies. Wanneer de spanningsval boven de 5% uitkomt, kunnen de laadcontroller en de boordlader van de EV communicatiestoringen ondervinden. Dit kan ertoe leiden dat de lader het vermogen automatisch terugregelt of de laadsessie afbreekt.

## Formules voor het nauwkeurig berekenen van spanningsverlies

Om de spanningsval (in Volt) en het relatieve spanningsverlies (in procenten) nauwkeurig vast te stellen, gebruikt u de standaard formules uit de NEN 1010:

- **3-fase wisselstroom (400V):** ΔU = (√3 × I × L × cos(φ)) / (γ × A)
- **1-fase wisselstroom (230V):** ΔU = (2 × I × L × cos(φ)) / (γ × A)
- **Relatief spanningsverlies in %:** ΔU (%) = (ΔU / Unom) × 100

Hierin staan de variabelen voor:
- **I:** Stroomsterkte in Ampère (bijvoorbeeld 16A bij 11 kW; 32A bij 22 kW).
- **L:** Enkele kabellengte in meters.
- **cos(φ):** Vermogensfactor (bij actieve EV-laders doorgaans 1).
- **γ (gamma):** Geleidbaarheid van de geleider (koper = 56 m/(Ω·mm²)).
- **A:** Aderdoorsnede in mm².
- **Unom:** Nominale spanning (230V bij 1-fase, 400V bij 3-fase).

## Geadviseerde kabeldiameter per afstand en laadvermogen

Bij het dimensioneren van het kabeltracé spelen zowel het laadvermogen als de fysieke afstand een doorslaggevende rol.

| Laadvermogen (3-fase) | Enkele kabellengte | Geadviseerde kabeldiameter (koper) | Spanningsverlies & toelichting |
| :--- | :--- | :--- | :--- |
| **11 kW (16A)** | Tot 25 meter | 2,5 mm² | Ca. 1,2% tot 1,3% (ruim binnen de 2-3% adviesgrens) |
| **11 kW (16A)** | 25 tot 50 meter | 4 mm² tot 6 mm² | 2,5 mm² geeft bij 50m circa 2,4%-2,5% val; 4 mm² is robuuster |
| **11 kW (16A)** | 60 tot 75 meter | 6 mm² | 2,5 mm² geeft bij 75m circa 3,2%-3,7% val (risico op storingen) |
| **22 kW (32A)** | Tot 25 meter | Minimaal 6 mm² | Noodzakelijk om opwarming en spanningsval te beperken |
| **22 kW (32A)** | 25 tot 60 meter | 10 mm² tot 16 mm² | Voorkomt overschrijding van de 5%-normgrens |

`;
const markdown1 = `

## Hoe onderbouwt u de meerkosten van een dikkere kabel in uw offerte?

Opdrachtgevers kijken bij offertes vaak kritisch naar de hogere materiaalkosten van 4 mm², 6 mm² of 10 mm² kabels ten opzichte van een standaard 2,5 mm² kabel. Om deze meerkosten transparant te verantwoorden, kunt u in de offerte verwijzen naar de volgende technische gronden:

1. **Laadzekerheid en storingspreventie:** Een dikkere kabel voorkomt dat de spanning onder de kritische grens van de auto-boordlader zakt, wat anders leidt tot afgeknepen laadvermogens of afgebroken sessies.
2. **NEN 1010-conformiteit en beveiliging:** NEN 1010 schrijft voor dat bij kabelberekeningen niet alleen naar spanningsval wordt gekeken, maar ook naar warmteontwikkeling (met correctiefactoren voor bundeling en omgevingstemperatuur) en het waarborgen van de minimale kortsluitstroom (Ik-min) om beveiligingen tijdig te laten aanspreken.
3. **Beperking van energieverlies:** Onnodig spanningsverlies betekent dat energie als warmte in het kabeltracé verloren gaat. Een grotere aderdoorsnede reduceert dit verlies direct.

Door de keuzes op te nemen als een waarborg voor betrouwbaarheid en norm-conformiteit, verandert de discussie van "duurder materiaal" naar "gegarandeerde werking en veiligheid".

Welke uitgangspunten en kabeldiameters hanteert u in uw huidige voorbereiding bij lange kabeltrajecten naar parkeerterreinen?
`;

export function KabelberekeningLaadpaalSpanningsverliesLangeAfstandArticle() {
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
        }}>{markdown0}</ReactMarkdown>
      <ArticleVisual visual={{"type":"bar_chart","title":"Spanningsverlies 11 kW laadpaal (16A, 3-fase) bij 2,5 mm² koperkabel","unit":"%","items":[{"label":"25 meter (2,5 mm²)","value":1.3},{"label":"50 meter (2,5 mm²)","value":2.5},{"label":"75 meter (2,5 mm²)","value":3.5}],"illustrative":false}} />
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
        }}>{markdown1}</ReactMarkdown>
    </BlogPostLayout>
  );
}
