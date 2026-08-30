import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'stooklijn-weersafhankelijke-regeling-warmtepomp-rendement')!;

const markdown = `
Een verhoging van de aanvoertemperatuur van het verwarmingswater met slechts 1 °C laat het rendement (COP) van een warmtepomp al met circa 2% tot 2,5% dalen. Voor een installateur leidt een ongunstig ingestelde stooklijn in de praktijk vaak tot vragen van woningeigenaren over een onverwacht hoge energierekening. Door de werking van de weersafhankelijke regeling vooraf feitelijk te onderbouwen, geeft u de klant direct een realistisch beeld van het verwachte elektriciteitsverbruik.

## Hoe werkt een weersafhankelijke regeling op de stooklijn?

Een weersafhankelijke regeling past de aanvoertemperatuur van het cv-water automatisch aan op basis van de gemeten buitentemperatuur. Hoe lager de aanvoertemperatuur van het verwarmingswater kan blijven, hoe hoger het rendement (COP) van de warmtepomp en hoe lager het uiteindelijke elektriciteitsverbruik.

Een goed ingeregeld afgiftesysteem maakt het mogelijk om deze aanvoertemperatuur zo laag mogelijk te houden. Denk hierbij aan vloerverwarming met een maximale aanvoertemperatuur van bijvoorbeeld 35 °C. Dit maakt een vlakke stooklijn mogelijk, wat zorgt voor een zo laag mogelijk elektriciteitsverbruik.

## Gevolgen van een verkeerd ingestelde stooklijn en pendelen

Wanneer een stooklijn te steil is ingesteld, levert de warmtepomp bij koud weer een onnodig hoge aanvoertemperatuur. Dit verhoogt het jaarlijkse stroomverbruik aanzienlijk. Het niet goed afstemmen van de stooklijn brengt daarnaast nog een ander technisch risico met zich mee: pendelen.

Pendelen is het frequent in- en uitschakelen van de compressor. Dit fenomeen vraagt extra stroom en verkort bovendien de levensduur van de installatie.

| Aanvoertemperatuur verhoging | Rendementsverlies (COP) | Impact op de installatie |
| :--- | :--- | :--- |
| +1 °C | Circa 2% tot 2,5% daling | Licht hoger stroomverbruik |
| +5 °C | Circa 10% tot 12,5% daling | Merkbaar hogere stroomrekening |
| Onjuiste afstemming | Wisselend | Pendelen van compressor en extra slijtage |

## Stroomverbruik: Hybride vs. volledig elektrische warmtepomp

Het type installatie en de isolatiegraad bepalen in grote mate de uiteindelijke stroomvraag. Bij het onderbouwen van de verbruikscijfers richting de klant kan de volgende verdeling worden aangehouden:

* **Volledig elektrische warmtepomp:** In een goed geïsoleerde eengezinswoning ligt het gemiddelde elektriciteitsverbruik tussen de 2.500 kWh en 3.500 kWh per jaar voor ruimteverwarming en warm tapwater.
* **Hybride warmtepomp:** De stooklijn bepaalt samen met de ingestelde buitenluchttemperatuur (het omslagpunt) het moment waarop de cv-ketel bijspringt. Dit helpt om pieken in het stroomverbruik op de koudste dagen te voorkomen.

Bij de dimensionering en de elektrische installatie is het van belang om expliciet onderscheid te maken tussen het thermisch vermogen en het opgenomen elektrisch vermogen. De netaansluiting en groepenkast worden namelijk gedimensioneerd op het maximale elektrische vermogen (waarbij één fase op 16A maximaal 3,68 kW kan voeden). Een warmtepomp van meer dan 5 kW thermisch vraagt in veel gevallen om een 3-fase aansluiting om de elektrische belasting optimaal over de fases te verdelen.

## Advies voor de installateur: Het verbruik helder onderbouwen

Wanneer u de klant adviseert over een warmtepomp, helpt het om het verband tussen de buitentemperatuur, de stooklijn en de COP helder uit te leggen. Door vooraf in te schatten hoe de warmtepomp reageert op het afgiftesysteem in de woning, voorkomt u dat de klant verrast wordt door het stroomverbruik in de winter.

Met een nauwkeurige berekening vooraf toont u direct aan welke invloed de aanvoertemperatuur heeft op de jaarlasten. Zo onderbouwt u het aanbod niet alleen op basis van installatietechniek, maar ook op basis van een realistisch energetisch rendement.

## Veelgestelde vragen (FAQ)

### Wat is het effect van een te hoge stooklijn op de warmtepomp?
Bij een te hoge stooklijn is de aanvoertemperatuur onnodig hoog. Elke stijging van 1 °C verlaagt de COP met circa 2% tot 2,5%, wat leidt tot een aanzienlijk hoger stroomverbruik.

### Wat is pendelen bij een warmtepomp?
Pendelen is het frequent in- en uitschakelen van de compressor door een onjuiste afstemming van de stooklijn en het afgiftesysteem. Dit verhoogt het stroomverbruik en verkort de levensduur van de installatie.

### Hoeveel stroom verbruikt een volledig elektrische warmtepomp gemiddeld per jaar?
In een goed geïsoleerde eengezinswoning ligt het gemiddelde elektriciteitsverbruik voor ruimteverwarming en warm tapwater tussen de 2.500 kWh en 3.500 kWh per jaar.
`;

export function StooklijnWeersafhankelijkeRegelingWarmtepompRendementArticle() {
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
