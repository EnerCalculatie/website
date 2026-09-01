import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'nen-7250-dakbelasting-zonnepanelen-offerte')!;

const markdown = `
Volgens het Besluit bouwwerken leefomgeving (BBL) geldt dat elke wijziging aan een dakconstructie moet voldoen aan de fundamentele eisen voor constructieve veiligheid. Met de norm **NEN 7250** beschikt u over concrete rekenregels om de wind- en sneeuwbelasting van een zonne-energiesysteem nauwkeurig te bepalen, zodat u de bouwkundige veiligheid richting de klant helder kunt onderbouwen in uw offerte.

## Wat houdt de norm NEN 7250 in voor zonnepanelen?

De norm NEN 7250 geeft specifieke rekenregels voor het vaststellen van de wind- en sneeuwbelasting op zonne-energiesystemen. De richtlijnen uit deze norm zijn van toepassing op zowel PV- als PVT-systemen.

Qua montagewijzen en daktypen kent de NEN 7250 een brede toepassing. De norm geldt voor:
* Op-daksystemen en in-daksystemen.
* Installaties op hellende daken en platte daken van bouwwerken.

## Relatie tussen BBL en de Europese Eurocodes

Het Besluit bouwwerken leefomgeving (BBL) schrijft voor dat de constructieve veiligheid van een bouwwerk gewaarborgd moet blijven bij aanpassingen, zoals het plaatsen van zonnepanelen. De NEN 7250 is inhoudelijk afgestemd op de Europese rekennormen (Eurocodes).

Concreet is de NEN 7250 gekoppeld aan de volgende Eurocodes:
* **NEN-EN 1991-1-4**: De norm voor het berekenen van windbelasting op constructies.
* **NEN-EN 1991-1-3**: De norm voor het bepalen van sneeuwbelasting.

Door deze normen toe te passen via NEN 7250, kan worden berekend hoe het systeem reageert op krachten door wind en sneeuwval.

## Noodzaak van een bouwkundige controle van de dakconstructie

Om vast te stellen of een dak de installatie kan dragen, is een bouwkundige controle van de bestaande dakconstructie noodzakelijk. Niet elk dak beschikt immers over voldoende reserve in de draagkracht.

Bij zo'n bouwkundige controle wordt getoetst of het dak het totale extra gewicht veilig kan dragen. Dit gewicht bestaat uit:
* De zonnepanelen of PVT-panelen.
* De gebruikte montagematerialen.
* De benodigde ballast (bij platte daken).

## Ballastberekening op platte daken conform NEN 7250

Bij een installatie op een plat dak moet de ballast exact berekend worden conform de regels uit de NEN 7250. Een correcte hoeveelheid ballast is nodig om te voorkomen dat het systeem bij sterke wind gaat afschuiven of opwaait.

Daarnaast stelt de maximale draagkracht van het bestaande dak een grens aan het gewicht. De hoeveelheid ballast moet zodanig berekend worden dat het systeem stormvast ligt, zonder dat de maximale dakbelasting wordt overschreden.

## Bouwkundige veiligheid opnemen in de offerte

Door een bouwkundige controle uit te voeren en de rekenregels uit NEN 7250 toe te passen, maakt u de constructieve veiligheid inzichtelijk. In de offerte kan hiermee worden aangetoond dat het ontwerp rekening houdt met de maximale draagkracht van het dak, de regels uit het BBL en de invloed van wind- en sneeuwbelasting.

## Veelgestelde vragen over NEN 7250 en dakbelasting

### Wat regelt de norm NEN 7250 voor zonnepanelen?
De norm NEN 7250 geeft specifieke rekenregels voor het bepalen van de wind- en sneeuwbelasting op zonne-energiesystemen (zowel PV als PVT) op schuine en platte daken.

### Hoe verhoudt NEN 7250 zich tot het BBL en Eurocodes?
Het BBL verplicht dat de constructieve veiligheid van daken gewaarborgd blijft. NEN 7250 stemt dit af op de Europese Eurocodes NEN-EN 1991-1-4 (wind) en NEN-EN 1991-1-3 (sneeuw).

### Waarom is een ballastberekening op een plat dak noodzakelijk?
Een ballastberekening conform NEN 7250 zorgt ervoor dat het systeem stormvast ligt zonder op te waaien of af te schuiven, terwijl de maximale draagkracht van de dakconstructie niet wordt overschreden.
`;

export function Nen7250DakbelastingZonnepanelenOfferteArticle() {
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
