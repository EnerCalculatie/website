import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'douche-wtw-warmtepomp-rendement-nta-8800')!;

const markdown = `
Een douche-WTW (Warmteterugwinning) voorverwarmt koud leidingwater van circa 10°C naar 20-25°C met de restwarmte van het afgevoerde douchewater. In combinatie met een warmtepomp verlaagt een douche-WTW de energievraag voor de bereiding van warm douchewater gemiddeld met 35% tot 50%. Dit verlaagt de piekvraag naar warm tapwater en verbetert de BENG-score binnen de NTA 8800.

## Rendement van gecontroleerde douche-WTW systemen

Bij de voorverwarming van douchewater is het type WTW-systeem medebepalend voor de prestaties. Er wordt hierbij doorgaans onderscheid gemaakt tussen een pijp-WTW en een douchegoot-WTW.

Het gecontroleerde rendement van deze systemen ligt bij een normdebiet van 9,2 liter per minuut gemiddeld tussen de 50% en 65%.

| Parameter | Waarde / Bereik | Bron |
| :--- | :--- | :--- |
| **Inkomende leidingwatertemperatuur** | Circa 10°C | Milieu Centraal |
| **Voorverwarmde watertemperatuur** | 20 - 25°C | Milieu Centraal |
| **Rendement bij normdebiet (9,2 l/min)** | 50% - 65% | NEN |
| **Gemiddelde energiebesparing op warm douchewater** | 35% - 50% | Milieu Centraal |

## Invloed op NTA 8800 energieprestaties en aansluitwijze Optie A

In de energieprestatieberekening conform NTA 8800 wordt de netto energievraag voor warmtapwater verlaagd. De omvang van deze reductie hangt af van het gecontroleerde rendement van het douche-WTW type en de gekozen aansluitwijze.

Aansluitwijze Optie A levert in veel gevallen de hoogste theoretische besparing en BENG-score op. Bij deze optie stroomt het voorverwarmde water naar zowel de koude aansluiting van de mengkraan als naar de ingang van het opwekkingstoestel.

## Gevolgen voor de warmtepomp en het installatie-ontwerp

De combinatie van een douche-WTW met een warmtepomp verandert de dynamiek van de warmtapwatervraag. Doordat het opwekkingsvermogen minder zwaar belast wordt tijdens het douchen, daalt de piekvraag naar warm tapwater.

Dit kan concrete voordelen opleveren voor het ontwerp van de installatie:
* **Kleiner boilervolume:** Er is minder opgeslagen warm water nodig om aan de piekperiode te voldoen.
* **Lager opgesteld vermogen:** De warmtepomp kan in sommige situaties lichter worden gedimensioneerd.

Bij het dimensioneren van de elektrische aansluiting is het van belang om expliciet onderscheid te maken tussen het thermisch en het elektrisch vermogen van de warmtepomp. Een warmtepomp met bijvoorbeeld 5 kW thermisch vermogen vraagt elektrisch gezien doorgaans aanzienlijk minder vermogen, waardoor dit op een standaard 1-fase 16A eindgroep (tot 3,68 kW volgens NEN 1010) aangesloten kan worden. De noodzaak voor een 3-fase aansluiting of krachtgroep wordt bepaald door het maximale elektrische vermogen — inclusief een eventueel elektrisch back-up- of legionella-element — in combinatie met de richtlijnen van NEN 1010 en de netbeheerder.

## Conclusie

Het combineren van een douche-WTW met een warmtepomp verlaagt de netto energievraag voor warmtapwater door koud water van 10°C voor te verwarmen naar 20-25°C. Met name bij aansluitwijze Optie A leidt dit tot optimale BENG-scores in de NTA 8800, een lagere piekvraag en de mogelijkheid om het benodigde boilervolume of het opgesteld thermisch vermogen te beperken.

## Veelgestelde vragen over douche-WTW en warmtepompen

### Hoeveel energie bespaart een douche-WTW bij een warmtepomp?
Een douche-WTW verlaagt de energievraag voor de bereiding van warm douchewater gemiddeld met 35% tot 50% door inkomend leidingwater voor te verwarmen met afvoerwater.

### Wat is het gecontroleerde rendement van een douche-WTW?
Bij een normdebiet van 9,2 liter per minuut ligt het gecontroleerde rendement van een douche-WTW (pijp of goot) gemiddeld tussen de 50% en 65% volgens NEN-normen.

### Welke aansluitwijze van een douche-WTW geeft het hoogste BENG-rendement?
Aansluitwijze Optie A levert volgens de NTA 8800 in veel gevallen de hoogste theoretische besparing op, omdat het voorverwarmde water naar zowel de mengkraan als het opwekkingstoestel stroomt.
`;

export function DoucheWtwWarmtepompRendementNta8800Article() {
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
