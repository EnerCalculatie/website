import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'geluid-warmtepomp-erfgrens-berekenen')!;

const markdown0 = `
's Nachts mag een warmtepomp op de erfgrens doorgaans hoogstens 40 dB(A) geluidsdruk veroorzaken. Je berekent de exacte geluidsbelasting door het geluidsvermogen om te rekenen met de afstand, gevelreflecties en het geteste invoegverlies van de geluidsomkasting.

## Geluidsnormen voor warmtepompen op de erfgrens

Het Besluit bouwwerken leefomgeving (Bbl) stelt grenzen aan het geluid van warmtepompen op de erfgrens of bij te openen ramen en deuren van aangrenzende woningen. Overdag, tussen 07:00 en 23:00 uur, geldt een maximale geluidsbelasting van 45 dB(A).

's Nachts, tussen 23:00 en 07:00 uur, geldt een strengere norm van maximaal 40 dB(A). Omdat warmtepompen 's nachts bij lage buitentemperaturen vaak hard moeten werken, is deze nachtnorm in de praktijk bepalend voor het ontwerp.

`;
const markdown1 = `

## Omrekenen van geluidsvermogen (Lw) naar geluidsdruk (Lp)

De fabrikant geeft het geluidsvermogen (Lw) van de warmtepomp op. Op afstand r bereken je het geluidsdrukniveau (Lp) met de geometrische uitbreidingsformule:

Lp = Lw + 10 * log10(Q / (4 * pi * r^2)) - demping

De richtfactor (Q) corrigeert voor reflecties door harde vlakken:
- **Q = 1:** Vrije veldsituatie (bolvormig).
- **Q = 2:** Plaatsing op een harde bodem (halfbolvormig).
- **Q = 4:** Plaatsing tegen een gevel op een harde bodem.
- **Q = 8:** Plaatsing in een hoek van twee gevels op een harde bodem.

Elk extra reflecterend hard vlak verhoogt het geluidsdrukniveau naar de erfgrens toe met circa 3 dB(A). De geluidsdemping (het invoegverlies) van de omkasting trek je van dit totaal af. Deze demping moet onderbouwd zijn via meetresultaten volgens NEN-EN-ISO 3744 of NEN-EN-ISO 12102 per terts- of octaafband.

| Opstellingssituatie | Richtfactor (Q) | Invloed op geluidsdruk |
| :--- | :--- | :--- |
| Vrije veldsituatie | Q = 1 | Basiswaarde |
| Harde bodem | Q = 2 | Halfbolvormige uitstraling |
| Gevel + harde bodem | Q = 4 | Circa +3 dB(A) extra reflectie |
| Hoek 2 gevels + bodem | Q = 8 | Circa +6 dB(A) extra reflectie |

## Geaccepteerde documentatie door de gemeente

Bij een vergunningsaanvraag of handhavingstraject vraagt de gemeente om een geldige rekenkundige onderbouwing. Een losse productbrochure is daarvoor niet voldoende.

Gemeenten accepteren een uitvoerspecificatie van de officiële 'Rekentool Geluid Warmtepompen' van de Rijksoverheid. Ook een akoestisch meet- en rekenrapport opgesteld conform NEN 5077 of de Handleiding Meten en Rekenen Industrielawaai wordt geaccepteerd.

## Praktisch geluidsadvies voor de installateur

Als installateur voorkom je discussie of afkeuring achteraf door de geluidsberekening vóór de installatie uit te voeren. Voeg het rapport uit de officiële rekentool toe aan de offerte. Daarmee geef je de klant vooraf schriftelijk bewijs dat de opstelling met geluidsomkasting voldoet aan de wettelijke eisen van het Bbl.

Welke opstellingsplek kies jij meestal om extra gevelreflecties bij de erfgrens te vermijden?
`;

export function GeluidWarmtepompErfgrensBerekenenArticle() {
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
      <ArticleVisual visual={{"type":"bar_chart","title":"Maximale geluidsbelasting Bbl op de erfgrens","unit":"dB(A)","items":[{"label":"Dagperiode (07:00 - 23:00 uur)","value":45},{"label":"Nachtperiode (23:00 - 07:00 uur)","value":40}],"illustrative":false}} />
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
