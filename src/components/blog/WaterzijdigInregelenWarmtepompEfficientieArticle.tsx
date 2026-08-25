import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown, { type Components } from 'react-markdown';
import { ArticleVisual, type VisualSpec } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'waterzijdig-inregelen-warmtepomp-efficientie')!;

const markdownIntro = `
Een warmtepomp die op papier de juiste COP haalt, maar in de praktijk 10 tot 15% meer stroom verbruikt dan berekend — de oorzaak zit lang niet altijd in het toestel zelf. Waterzijdig inregelen, het nauwkeurig afstellen van de waterstromen (debieten) door het afgiftesysteem, is de vaakst overgeslagen stap die dit verschil verklaart. Bij het vervangen of installeren van een warmte-opwekker geldt waterzijdig inregelen bovendien als een wettelijke eis onder de energieprestatie-eisen voor gebouwen (EPBD III).

## Wat is het effect van een slechte waterverdeling?

Wanneer een verwarmingssysteem niet waterzijdig is ingeregeld, ontstaat er onbalans in het afgiftesysteem. Radiatoren of vloerverwarmingsgroepen die zich dicht bij de warmtepomp bevinden, ontvangen in dat geval te veel warm water. Verst gelegen ruimtes ontvangen daarentegen te weinig warm water.

Het gevolg hiervan is dat het systeem op een onnodig hoge temperatuur moet draaien om ook de verst gelegen ruimtes voldoende te verwarmen — met een lagere [COP](/blog/scop-warmtepomp-berekenen-stroomverbruik) tot gevolg dan waarop het toestel is doorgerekend.

## Directe voordelen en efficiëntiewinst van waterzijdig inregelen

Het nauwkeurig afstellen van de debieten in het afgiftesysteem levert duidelijke technische en financiële voordelen op:

### 1. Lagere aanvoertemperatuur en een hogere COP
Een waterzijdig ingeregeld afgiftesysteem maakt een zo laag mogelijke aanvoertemperatuur mogelijk. Deze lagere aanvoertemperatuur leidt direct tot een hogere prestatiecoëfficiënt (COP) en zorgt daarmee voor een lager stroomverbruik van de warmtepomp.

### 2. Voorkomen van pendelgedrag en slijtage aan de compressor
Het correct inregelen van de debieten voorkomt pendelgedrag, wat inhoudt dat de compressor frequent in- en uitschakelt. Door dit pendelgedrag te verminderen, neemt de slijtage aan de warmtepomp af en wordt de levensduur van het systeem verlengd.

### 3. Gemiddelde energiebesparing van 10 tot 15%
Door een efficiëntere warmte-afgifte en stroomverdeling levert waterzijdig inregelen een gemiddelde energiebesparing op het verwarmingsverbruik op van 10 tot 15 procent.
`;

const markdownRest = `
## Conclusie: Waarom waterzijdig inregelen onmisbaar is

Het waterzijdig inregelen van een verwarmingssysteem vloeit voort uit wettelijke eisen (EPBD III) bij het installeren of vervangen van een warmte-opwekker. Het voorkomt dat het systeem op een onnodig hoge temperatuur moet draaien, beperkt pendelgedrag van de compressor en realiseert door een efficiëntere warmte-afgifte een gemiddelde energiebesparing van 10 tot 15 procent op het verwarmingsverbruik.
`;

const inregelVisual: VisualSpec = {
  type: 'comparison',
  title: 'Effect van waterzijdig inregelen',
  columns: ['Niet ingeregeld', 'Waterzijdig ingeregeld'],
  rows: [
    { label: 'Aanvoertemperatuur', left: 'Onnodig hoog', right: 'Zo laag mogelijk' },
    { label: 'COP', left: 'Lager dan berekend', right: 'Op berekend niveau' },
    { label: 'Compressorgedrag', left: 'Pendelt, versnelde slijtage', right: 'Stabieler bedrijf' },
    { label: 'Verwarmingsverbruik', left: 'Referentie', right: '10-15% lager' },
  ],
};

export function WaterzijdigInregelenWarmtepompEfficientieArticle() {
  const components: Components = {
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
  };

  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown components={components}>{markdownIntro}</ReactMarkdown>
      <ArticleVisual visual={inregelVisual} />
      <ReactMarkdown components={components}>{markdownRest}</ReactMarkdown>
    </BlogPostLayout>
  );
}
