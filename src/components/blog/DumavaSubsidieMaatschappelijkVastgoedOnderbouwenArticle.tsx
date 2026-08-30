import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'dumava-subsidie-maatschappelijk-vastgoed-onderbouwen')!;

const markdown = `
Een DUMAVA-aanvraag kan tot 30% subsidie opleveren voor verduurzamingsmaatregelen, maar aanvragen worden behandeld op volgorde van binnenkomst (first come, first served). Wie niet direct de juiste documenten zoals een recent energieadvies of een gespecificeerde offerte aanlevert, loopt het risico buiten het subsidieplafond te vallen. In dit artikel leest u aan welke voorwaarden een DUMAVA-aanvraag moet voldoen en hoe de onderbouwing correct wordt opgesteld.

## Wat is de DUMAVA-subsidie en voor welke doelgroepen is deze bedoeld?

DUMAVA staat voor Subsidueregeling verduurzaming maatschappelijk vastgoed en wordt uitgevoerd door de Rijksdienst voor Ondernemend Nederland (RVO).

De regeling is specifiek ingesteld voor eigenaren van maatschappelijk vastgoed. Daaronder vallen onder meer:
- Scholen
- Zorginstellingen
- Rijksmonumenten
- Culturele instellingen
- Religieuze instellingen
- Sportaccommodaties

## Subsidiebedragen, grenzen en rekenvoorbeeld DUMAVA

Het subsidiepercentage bedraagt in de regel 30% van de subsidiabele kosten. Deze kosten hebben betrekking op de verduurzamingsmaatregelen zelf en het bijbehorende energieadvies.

De overheid hanteert grenzen voor het aan te vragen subsidiebedrag:

| Parameter | Waarde |
| --- | --- |
| **Minimaal subsidiebedrag** | € 5.000 per aanvraag |
| **Maximaal subsidiebedrag (losse maatregelen)** | € 1,5 miljoen per aanvraag |
| **Maximaal subsidiebedrag (integrale projecten)** | € 2,5 miljoen per aanvraag |

### Rekenvoorbeeld DUMAVA-subsidie
Stel dat de totale subsidiabele kosten voor de verduurzamingsmaatregelen en het energieadvies uitkomen op € 20.000.

Bij het reguliere subsidiepercentage van 30% komt de subsidie uit op:
* € 20.000 × 30% = **€ 6.000**

Aangezien € 6.000 hoger is dan de minimale grens van € 5.000, komt deze aanvraag in aanmerking voor behandeling.

## Belangrijke eisen aan de onderbouwing van uw DUMAVA-aanvraag

Om de subsidiabele kosten van de maatregelen aan te tonen, dient de aanvrager een projectplan en een gespecificeerde offerte of kostenraming te overleggen.

Daarnaast gelden de volgende specifieke documentvoorwaarden:
- **Energieadvies:** Het bijgevoegde energieadvies mag op het moment van indienen maximaal 36 maanden oud zijn.
- **Integrale projecten:** Bij een aanvraag voor een integraal verduurzamingsproject moet worden aangetoond dat het gebouw na de ingreep labelstappen maakt of voldoet aan de BENG- dan wel Renovatiestandaard.

## Behandeling, behandelvolgorde en realisatietermijn

Aanvragen worden behandeld op volgorde van binnenkomst totdat het ingestelde subsidieplafond is bereikt. Een volledige en accurate onderbouwing bij indiening voorkomt vertraging in het proces.

Na verlening van de subsidie geldt een maximale realisatietermijn:
- **Maatregelenprojecten:** Maximaal 2 jaar na verlening.
- **Integrale projecten:** Maximaal 3 jaar na verlening.

## Veelgestelde vragen over DUMAVA-subsidie (FAQ)

### Hoeveel DUMAVA-subsidie kan ik aanvragen?
Het subsidiepercentage is 30% van de subsidiabele kosten. Het minimale subsidiebedrag is € 5.000. Het maximum is € 1,5 miljoen voor losse maatregelen en € 2,5 miljoen voor integrale projecten.

### Hoe oud mag het energieadvies voor DUMAVA maximaal zijn?
Het bijgevoegde energieadvies mag op het moment van indienen van de DUMAVA-aanvraag maximaal 36 maanden oud zijn.

### Wat is de realisatietermijn na toekenning van de subsidie?
Na subsidieverlening geldt voor maatregelenprojecten een realisatietermijn van maximaal 2 jaar en voor integrale projecten maximaal 3 jaar.
`;

export function DumavaSubsidieMaatschappelijkVastgoedOnderbouwenArticle() {
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
