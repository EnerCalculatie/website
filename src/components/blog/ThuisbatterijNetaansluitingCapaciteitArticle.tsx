import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'thuisbatterij-netaansluiting-capaciteit')!;

const markdown = `
Een thuisbatterij die op de offerte prima past, kan op de aansluiting alsnog vastlopen — niet door de batterij zelf, maar door wat er al op dezelfde groep of aardlekschakelaar staat. De capaciteit van de netaansluiting bepaalt hoeveel vermogen een woning gelijktijdig kan afnemen én terugleveren, en een thuisbatterij telt daar volledig in mee.

## Selectiviteit en de vermogensgrens per fase

Om selectiviteit ten opzichte van de hoofdzekering te waarborgen, mag een omvormer of laadpaal bij een hoofdaansluiting van 1x35A of 3x25A doorgaans op maximaal 16A worden afgezekerd. Dat komt overeen met een maximaal vermogen van 3,68 kW per fase (16A × 230V), of circa 11 kW bij een 3-fase aansluiting (3 × 16A). Een thuisbatterij-omvormer boven deze grens vraagt in de praktijk om een 3-fase uitvoering.

## Somstromen: het net en de batterij tellen bij elkaar op

Wanneer het net en de batterij-omvormer op dezelfde groep of aardlekschakelaar kunnen invoeden, tellen de stromen van beide bronnen bij elkaar op. Bij 25A vanaf het net en 16A vanaf de omvormer ontstaat een somstroom van 41A — een standaard 40A-aardlekschakelaar is daar niet op berekend, wat tot overbelasting en brandgevaar kan leiden. Bij een ontladende batterij terwijl het net ook belast wordt, moet de optelsom van alle gelijktijdig actieve stromen daarom getoetst worden aan de nominale stroom van elke gedeelde beveiliging.

## Wanneer vraagt batterijbeheer om aanpassing van de offerte?

Combineert de klant de batterij met zonnepanelen, een warmtepomp of een laadpaal? Dan telt elk van die vermogens mee in dezelfde somstroom-toets. Zie [thuisbatterij dimensioneren](/blog/thuisbatterij-capaciteit-kiezen) voor hoe u de juiste capaciteit voor de batterij zelf bepaalt, en pas de offerte aan zodra de gecombineerde belasting de aansluitcapaciteit nadert — bijvoorbeeld door een aparte groep, een grotere aderdoorsnede of een verzwaring van de aansluiting.
`;

export function ThuisbatterijNetaansluitingCapaciteitArticle() {
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
