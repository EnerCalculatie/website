import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'laadpalen-voor-elektrische-autos')!;

const markdown = `
De juiste laadpaal kiezen begint niet bij het laadvermogen van de auto, maar bij wat de netaansluiting van de woning nog te bieden heeft. Een laadpaal is geen los laadpunt, maar een onderdeel van het complete energiesysteem van de woning — inclusief eventuele zonnepanelen, een thuisbatterij of een warmtepomp die al op dezelfde aansluiting draaien.

## Welke factoren bepalen de keuze van de laadpaal?

Drie factoren bepalen welke laadpaal past: het laadvermogen van de auto, de resterende capaciteit van de aansluiting en groepenkast, en de beschikbare ruimte voor montage. Van deze drie is de resterende capaciteit vaak de beperkende factor, zeker bij een woning die al zonnepanelen of een warmtepomp heeft.

## Load balancing: overbelasting voorkomen zonder de aansluiting te verzwaren

Load balancing regelt de laadstroom van de laadpaal automatisch bij op basis van het overige verbruik in de woning op dat moment. Zo kan een laadpaal veilig worden bijgeplaatst zonder dat de hoofdzekering afslaat, en vaak ook zonder de kostbare stap van een aansluitverzwaring. Zie [dynamic load balancing bij een laadpaal](/blog/dynamic-load-balancing-laadpaal-adviseren) voor de technische onderbouwing hiervan.

## Hoe EnerCalculatie hiermee omgaat

EnerCalculatie maakt het specifieke laadprofiel van de laadpaal inzichtelijk en controleert direct de impact daarvan op de maximale capaciteit van de netaansluiting, in combinatie met de overige verduurzamingsmaatregelen in het dossier. Zo onderbouwt u in één adviesrapport welke configuratie technisch past bij de woning van de klant, in plaats van dit los per maatregel te beoordelen. Lees voor een bredere inleiding ook ons artikel over [laadpaal-advies thuis](/blog/laadpaal-advies-thuis).
`;

export function LaadpalenVoorElektrischeAutosArticle() {
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
