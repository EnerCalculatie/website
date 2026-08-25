import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'nachtverlaging-warmtepomp-stroomverbruik-comfort')!;

const markdown = `
Bij een hybride of volledig elektrische warmtepomp wordt geadviseerd om de temperatuur dag en nacht constant te houden, of hooguit een beperkte nachtverlaging van maximaal 1 tot 2 graden toe te passen. Waar bij conventionele cv-ketels een ruime nachtverlaging gebruikelijk was, leidt dit bij warmtepompen juist tot een hoger stroomverbruik en verlies van comfort.

## Geadviseerde temperatuurinstelling bij een warmtepomp

In adviesrapporten voor verwarmingssystemen komt regelmatig de vraag naar voren hoe om te gaan met nachtverlaging. Bij lagetemperatuurverwarming met een warmtepomp levert een constante temperatuurinstelling het beste rendement op. Indien er toch voor een verlaging wordt gekozen, geldt het advies van maximaal 1 tot 2 graden verschil ten opzichte van de dagtemperatuur.

## Effect van nachtverlaging op het thermisch comfort

Vloerverwarming staat bekend als een traag reagerend laagtemperatuursysteem. Wanneer er gebruik wordt gemaakt van een te grote nachtverlaging, duurt het opwarmen van de woning na deze periode vaak uren. Dit kan het thermisch comfort in de ochtend negatief beïnvloeden, omdat de gewenste ruimtetemperatuur niet direct bereikt is.

## Waarom nachtverlaging leidt tot een hoger stroomverbruik en lagere COP

Het toepassen van een te grote nachtverlaging kan op meerdere manieren invloed hebben op het energieverbruik en de efficiëntie van de installatie:

* **Daling van de COP (Coefficient of Performance):** Als een woning na een grote nachtverlaging snel opgewarmd moet worden, dwingt dit de warmtepomp om op een hogere frequentie en met een hogere aanvoertemperatuur te draaien. Dit verlaagt de COP van het systeem.
* **Inschakeling van de back-up heater:** Wanneer de ruimtetemperatuur na een periode van nachtverlaging snel moet stijgen, kan het ingebouwde elektrische bijverwarmingselement (de back-up heater) worden ingeschakeld. Dit leidt tot een piek in het stroomverbruik.
* **Ongunstige buitenluchttemperatuur:** Buitentemperaturen zijn 's nachts en in de vroege ochtend gemiddeld het laagst. Wanneer de warmtepomp 's ochtends vroeg op maximaal vermogen moet draaien om de nachtverlaging in te halen, werkt de buitenunit bij een ongunstigere buitenluchttemperatuur. Hierdoor verslechtert het rendement.

## Energieprestatieberekeningen en seizoensrendement (SCOP)

In energieprestatieberekeningen conform NEN-EN-ISO 52000 / NEN 7120 wordt voor laagtemperatuursystemen met een hoge thermische massa uitgegaan van continue verwarming. Dit uitgangspunt wordt gehanteerd voor het behalen van het optimale seizoensrendement (SCOP).

## Conclusie en advies

Het onderbouwen van een advies over nachtverlaging bij warmtepompen valt direct te herleiden naar de systeemefficiëntie en het thermisch comfort. Continue verwarming of een minimale nachtverlaging van maximaal 1 tot 2 graden voorkomt dat de warmtepomp op een hoog vermogen en bij een lage buitenluchttemperatuur moet herstellen. Hierdoor kan het seizoensrendement (SCOP) behouden blijven en kunnen pieken in stroomverbruik door een elektrisch bijverwarmingselement worden voorkomen.
`;

export function NachtverlagingWarmtepompStroomverbruikComfortArticle() {
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
