import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'warmtepomp-slecht-geisoleerde-woning-advies-onderbouwen')!;

const markdown = `
Bij het adviseren over warmtepompen in woningen met een matige of slechte isolatie is een heldere onderbouwing van de relatie tussen de gebouwschil, aanvoertemperatuur en het rendement (SCOP) onmisbaar. Een gedegen adviesrapport combineert de NTA 8800-rekenmethodiek, de 50-gradentest en ISDE-subsidievoorwaarden om de vereiste isolatiestappen feitelijk en financieel te onderbouwen.

## Type warmtepomp en de impact van de gebouwschil

De mate van isolatie van een woning bepaalt welk type warmtepomp technisch en economisch haalbaar is:

* **Volledig elektrische warmtepomp (all-electric):** Vereist een goed geïsoleerde schil (dak-, gevel- en vloerisolatie plus ten minste HR++ glas). Dit is noodzakelijk om het gebouw bij een lage aanvoertemperatuur (≤ 35°C tot 45°C) voldoende warm te kunnen houden.
* **Hybride warmtepomp:** Vraagt in veel gevallen om een matige tot goede basisisolatie (zoals spouwmuurisolatie, dakisolatie en HR++ glas). Bij extreme kou kan de geïntegreerde of gekoppelde cv-ketel bijspringen.

## Kwantitatieve onderbouwing met NTA 8800 en de 50-gradentest

Om in het adviesrapport de noodzaak van isolatiemaatregelen feitelijk te onderbouwen, biedt de NTA 8800-rekenmethodiek de basis. Deze rekenmethodiek bepaalt dat de energiebehoefte en de benodigde ontwerptemperatuur voor verwarming rechtstreeks afhangen van:
1. De thermische isolatie (de Rc-waarden van de verschillende constructie-elementen).
2. De luchtdichtheid van het gebouw.

Naast theoretische berekeningen biedt de **50-gradentest** de mogelijkheid om de geschiktheid van de woning in de praktijk te testen. Met deze test wordt de maximale cv-aanvoertemperatuur gedurende een stookseizoen begrensd op 50°C om aan te tonen of een (hybride) warmtepomp op lage temperatuur haalbaar is.

## Gevolgen van slechte isolatie voor SCOP en netbelasting

Een hoge warmtevraag als gevolg van slechte isolatie heeft directe gevolgen voor de prestaties van de warmtepomp en de elektrische installatie:

* **Rendement (SCOP):** Een hoge warmtevraag leidt bij een warmtepomp tot een lagere Seizoensprestatiefactor (SCOP).
* **Netbelasting:** Er ontstaat een significant hoger piekvermogen op het elektriciteitsnet, wat kan leiden tot de noodzaak voor een zwaardere netaansluiting.

## Financiële onderbouwing via ISDE-subsidievoorwaarden

In het adviesrapport kunnen isolatiestappen ook financieel worden onderbouwd via de ISDE-regeling van de RVO. Om voor subsidie in aanmerking te komen, moeten isolatiemaatregelen voldoen aan minimale isolatiewaarden (Rd-waarde):

* **Dak- en vloerisolatie:** Minimaal Rd 3,5 m²K/W.
* **Spouwmuurisolatie:** Minimaal Rd 1,1 m²K/W.

Daarnaast geldt dat wanneer er binnen twee jaar twee of meer verduurzamingsmaatregelen worden uitgevoerd (bijvoorbeeld een warmtepomp gecombineerd met één of meer isolatiemaatregelen), het subsidiebedrag per vierkante meter voor de isolatiemaatregelen via de ISDE verdubbelt.

## Samenvatting voor de adviseur

Het onderbouwen van isolatiestappen bij een warmtepompadvies rust op de onderlinge afhankelijkheid van de thermische schil (Rc-waarden en luchtdichtheid conform NTA 8800), de gewenste aanvoertemperatuur en de efficiëntie (SCOP) van de installatie. Door praktijktesten zoals de 50-gradentest op te nemen en de ISDE-subsidievoorwaarden (Rd-waarden en verdubbeling bij combinaties) uit te werken, krijgt de gebouweigenaar een feitelijk onderbouwd inzicht in de noodzakelijke vervolgstappen.
`;

export function WarmtepompSlechtGeisoleerdeWoningAdviesOnderbouwenArticle() {
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
