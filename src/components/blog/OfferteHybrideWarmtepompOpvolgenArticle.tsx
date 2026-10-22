import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'offerte-hybride-warmtepomp-opvolgen')!;

const markdown = `
Een offerte voor een hybride warmtepomp blijft vaak weken liggen omdat de klant twijfelt over de isolatiegraad, de terugverdientijd of de netverzwaring. Door je opvolgproces strak in te richten en technische drempels proactief weg te nemen, verkort je de beslissingstijd van de klant direct.

## Wanneer neem je contact op met de klant?

Neem binnen enkele dagen na het versturen van de offerte contact op met de klant. Wacht niet af tot de klant zelf belt, maar gebruik dit opvolgmoment om de uitgangspunten door te spreken en twijfels weg te nemen:

- **Isolatiegraad:** Controleer of de woning minimaal matig geïsoleerd is met spouwmuurisolatie en HR++ glas. Dit is nodig om een hybride warmtepomp effectief te laten werken.
- **Terugverdientijd:** Onderbouw de investering met de gemiddelde terugverdientijd van 7 tot 10 jaar volgens Milieu Centraal, afhankelijk van energieprijzen en subsidie.

## CRM en automatisering in het opvolgproces

Gebruik een CRM-systeem of automatisering om vaste opvolgtermijnen en herinneringen in te stellen. Dit voorkomt dat offertes blijven liggen en borgt het proces:

- **Netverzwaring:** Is een aanpassing van 1x35A naar 3x25A nodig? De aanvraag loopt via MijnAansluiting.nl. De doorlooptijd bij netbeheerders zoals Liander, Stedin of Enexis kan variëren van enkele weken tot maanden. Automatiseer een herinnering om dit direct na akkoord af te stemmen.
- **ISDE-subsidie:** Laat de software een herinnering sturen over de voorwaarden. De warmtepomp moet nieuw zijn, op de RVO Meldcodelijst staan en door een deskundig installateur worden geplaatst. De aanvraag moet binnen 24 maanden na uitvoering ingediend worden.
- **Zakelijke regelingen:** Bied zakelijke klanten of VvE's automatische informatie over aanvullende regelingen zoals de SVVE of EIA.

## Technische bezwaren over netverzwaring en veiligheid wegnemen

Neem technische randvoorwaarden op in de offerte en het opvolggesprek om de ondertekening te versnellen:

- **Veiligheid groepenkast:** Onderbouw uitbreidingen met installatieautomaten en aardlekschakelaars volgens de NEN 1010-norm.
- **Gelijktijdig gebruik:** Combineert de klant een warmtepomp met een laadpaal? Adviseer een slimme lader met Dynamic Load Balancing om overbelasting van de hoofdaansluiting te voorkomen.

| Opvolgfase | Actie in het opvolgproces |
| :--- | :--- |
| **Binnen enkele dagen** | Bespreek isolatie (HR++ / spouwmuur) en terugverdientijd (7-10 jaar) |
| **Systeem & automatisering** | Plan CRM-taken voor MijnAansluiting.nl en doorlooptijden |
| **Subsidie-check** | Herinner aan de ISDE-termijn van 24 maanden na uitvoering |

## Conclusie: snellere beslissing door strakke opvolging

Een installateur die het opvolgproces automatiseert én randvoorwaarden zoals NEN 1010-veiligheid, netverzwaring en ISDE-subsidie meteen onderbouwt, neemt alle twijfel weg. Zo verandert een afwachtende offerte in een gestroomlijnd advies dat sneller wordt ondertekend.

Hoeveel korter wordt de beslissingstijd van jouw klant als de netverzwaring en subsidievoorwaarden al in de eerste opvolgweek zijn afgevinkt?
`;

export function OfferteHybrideWarmtepompOpvolgenArticle() {
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
