import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'airco-draaien-op-zonnepanelen-eigen-verbruik-verhogen')!;

const markdown = `
Zonnepanelen leveren de meeste stroom op exact de dagen dat een woning de hoogste koelvraag heeft. Door op die momenten een airco te laten draaien, stijgt het directe eigen verbruik van zonnestroom van gemiddeld 30% naar 50% tot 70% op zonnige zomerdagen.

## Hoeveel koellast dekken zonnepanelen direct?

Een moderne inverter-airco (een systeem met een traploos regelbare compressor) gebruikt tijdens het koelen een variabel elektrisch vermogen van circa 200 tot 1.500 Watt. Omdat de compressor meebeweegt met de warmte in huis en het beschikbare zonne-overschot, kunnen zonnepanelen op zonnige zomerdagen 50% tot meer dan 80% van de totale koellast direct afdekken.

De maximale koelvraag van een ruimte en de piekproductie van zonnepanelen vallen rechtstreeks samen. Beide worden rechtstreeks gedreven door zonne-instroom en hoge buitentemperaturen op warme zomerdagen.

| Situatie | Direct eigen verbruik van PV-opwek | Dekking van de koellast door eigen PV |
| :--- | :--- | :--- |
| Standaard huishouden | Gemiddeld ~30% | Niet van toepassing |
| Met airco-koeling op zonnige zomerdagen | 50% tot 70% | 50% tot >80% |


## Invloed van het afschaffen van salderen op de businesscase

Per 1 januari 2027 wordt de salderingsregeling voor kleinverbruikers in één keer volledig afgeschaft. Teruggeleverde zonnestroom mag dan niet langer 1-op-1 worden weggestreept tegen verbruikte netstroom op andere momenten.

Door de opkomst van terugleverheffingen bij energieleveranciers levert het terugleveren van PV-overschotten op zonnige uren financieel weinig meer op of leidt dit tot extra kosten. Het direct benutten van eigen PV-stroom voor koeling is daardoor de meest voordelige optie.

## Sturingstechnieken voor koelen op zonne-overschot

Om een airco automatisch te laten inschakelen bij zonne-overschotten, worden Energy Management Systemen (EMS) of slimme omvormers ingezet. Deze apparaten communiceren met de installatie via protocollen zoals Modbus, potentiaalvrije contacten (droge contacten) of fabrieks-API's en slimme thermostaten.

Doordat de compressor in de airco traploos moduleert, stemt het systeem het stroomverbruik nauwkeurig af op de hoeveelheid stroom die de zonnepanelen op dat moment extra opwekken.

## Waarde van het advies voor de installateur

Voor installateurs en adviseurs biedt deze combinatie een sterke onderbouwing tijdens een offertetraject. Het advies verschuift van louter koelcomfort naar het actief verhogen van de eigenconsumptie van de klant. Door het variabel elektrisch opgevraagde vermogen van 0,2 tot 1,5 kW af te zetten tegen het verwachte zonne-overschot, toon je concreet aan hoe een airco helpt om terugleverheffingen en het einde van de salderingsregeling op te vangen.

Hoeveel procent van je eigen zonnestroom gebruik jij op warme zomerdagen al direct in huis?
`;

export function AircoDraaienOpZonnepanelenEigenVerbruikVerhogenArticle() {
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
