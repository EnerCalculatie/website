import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'nta-8800-energie-index-rekenmethodiek')!;

const markdown0 = `
Sinds de invoering van de NTA 8800 op 1 januari 2021 wordt de energieprestatie van gebouwen niet meer uitgedrukt in een dimensieloze Energie-Index, maar in kWh per vierkante meter per jaar (kWh/m².jaar). Voor installateurs en adviseurs betekent deze rekenmethodiek dat een verduurzamingsadvies nauwkeurig afgestemd moet worden op de specifieke BENG-indicatoren. Om zekerheid te bieden in een offerte is het essentieel om te begrijpen hoe bouwkundige maatregelen en installatietechniek samen de BENG 2-score bepalen, aangezien deze score het uiteindelijke energielabel vastlegt.

## Verschil tussen de oude Energie-Index en de NTA 8800

Op 1 januari 2021 heeft de NTA 8800 de eerdere rekenmethodieken NEN 7120, NEN 1068 en de Energie-Index (ISSO 75.3/82.1) vervangen. Waar de oude Energie-Index werkte met een abstract getal, sluit de NTA 8800 aan bij de BENG-normering (Bijna Energieneutrale Gebouwen) met concrete fysische eenheden.

| Kenmerk | Oude Energie-Index | NTA 8800 Rekenmethodiek |
| :--- | :--- | :--- |
| **Eenheid** | Dimensieloos getal | kWh/m².jaar |
| **Labelbepaling** | Indexklassen | BENG 2 (primair fossiel energiegebruik) |
| **Scheiding schil en techniek** | Beperkt | Strikt gescheiden via BENG 1 en BENG 2 |
| **Zomercomfort** | Geen losse indicator | TOjuli (risico op oververhitting bij nieuwbouw) |

`;
const markdown1 = `

## BENG-indicatoren: de invloed op installatiekeuzes

De NTA 8800 splitst de energieprestatie van een gebouw op in drie BENG-indicatoren en de TOjuli-indicator:

- **BENG 1 (Energiebehoefte):** Meet de energiebehoefte van de gebouwschil in kWh/m².jaar. Dit betreft uitsluitend isolatie, luchtdichtheid en oriëntatie, los van de installaties.
- **BENG 2 (Primair fossiel energiegebruik):** Drukt het fossiele energiegebruik uit voor verwarming, koeling, warm tapwater en ventilatie, verminderd met eigen opgewekte hernieuwbare energie. De energielabelklasse (van A+++++ tot G) wordt uitsluitend bepaald op basis van de BENG 2-score.
- **BENG 3 (Aandeel hernieuwbare energie):** Geeft het aandeel hernieuwbare energie weer als percentage van het totale energiegebruik.
- **TOjuli:** Bepaalt bij nieuwbouw het risico op oververhitting in de maand juli om het zomercomfort te borgen.

### Effect van specifieke installaties op BENG

Voor een onderbouwd verduurzamingsadvies is de wisselwerking tussen installatietechniek en BENG-indicatoren doorslaggevend:

- **Warmtepompen:** De inzet van een warmtepomp verlaagt de BENG 2-score direct en verhoogt het BENG 3-percentage aanzienlijk, doordat omgevingswarmte als hernieuwbare bron telt.
- **Zonnepanelen (PV-systemen):** Zonnepanelen verlagen de BENG 2-score en verhogen BENG 3. Zij hebben echter geen enkele invloed op de BENG 1-score van de gebouwschil.
- **WTW-ventilatie:** Gebalanceerde ventilatie met warmterugwinning (WTW) vermindert het ventilatiewarmteverlies. Hierdoor daalt de energievraag voor verwarming én verlaagt de BENG 2-score.

## Certificeringen en geattesteerde software voor NTA 8800

Om een officieel NTA 8800-energielabel te mogen opstellen en registreren, dient een adviseur te beschikken over een EP-W (voor woningen) of EP-U (voor utiliteit) vakbekwaamheidsdiploma. Daarnaast is het vereist om te werken onder een BRL 9500-certificering.

Officiële NTA 8800-berekeningen moeten doorgaans worden uitgevoerd met geattesteerde software die door de Rijksoverheid is goedgekeurd en volgens de geldende rekenregels is gevalideerd. Voor installateurs die zekerheid willen bieden in hun offertestadium, helpt het om de BENG-uitkomsten van voorgestelde installaties vooraf door te rekenen.

## NTA 8800-uitkomsten vertalen naar een helder klantadvies

Gebouweigenaren zijn vaak niet bekend met BENG-definities. Een installateur vertaalt NTA 8800-uitkomsten het beste via een helder stappenplan:

1. **Focus op de labelbepaler (BENG 2):** Leg uit dat de stap naar een hoger energielabel (bijvoorbeeld van C naar A+) uitsluitend afhangt van het verminderen van het fossiele energiegebruik (BENG 2).
2. **Combineer maatregelen:** Maak duidelijk dat zonnepanelen en een warmtepomp BENG 2 verlagen, maar dat het combineren van WTW-ventilatie met een warmtepomp de energievraag nog efficiënter terugdringt.
3. **Bied onderbouwde garanties:** Door vooraf de verwachte BENG 2-reductie door te rekenen, krijgt de klant vooraf zekerheid over het resultaat op het energielabel.

Welke combinatie van warmtepompen, PV en ventilatie levert binnen uw huidige projecten de sterkste reductie in de BENG 2-score op?
`;

export function Nta8800EnergieIndexRekenmethodiekArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Invloed van maatregelen op BENG-indicatoren volgens NTA 8800","unit":"Relatieve impact","items":[{"label":"Isolatie / Schil (BENG 1)","value":1},{"label":"Warmtepomp & WTW (BENG 2)","value":2},{"label":"Zonnepanelen (BENG 2 & 3)","value":3}],"illustrative":true}} />
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
