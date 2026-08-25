import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'verduurzaming-kosten-baten-analyse')!;

const markdown = `
Twee klanten met dezelfde investering in zonnepanelen kunnen een compleet ander terugverdienscenario hebben — niet door de panelen, maar door wat er verder in het dossier zit. Een kosten-batenanalyse voor een verduurzamingspakket telt daarom niet alleen de aanschafprijs, maar ook subsidies, de salderingsregeling en de onderlinge beïnvloeding van maatregelen.

## Wat hoort er in de kostenkant van de analyse?

Naast de aanschaf- en installatiekosten van zonnepanelen, een thuisbatterij of een warmtepomp, telt ook de impact op de netaansluiting mee: een verzwaring van de aansluiting of een aanpassing van de groepenkast is een reële kostenpost die in een losse productofferte makkelijk over het hoofd wordt gezien.

## Wat hoort er in de batenkant van de analyse?

Aan de batenkant tellen subsidies (zoals [ISDE voor warmtepompen](/blog/isde-subsidie-warmtepompen)) en de vergoeding voor teruggeleverde stroom mee. Voor zonnepanelen is de aankomende afschaffing van de [salderingsregeling per 2027](/blog/salderingsregeling-2027) direct relevant: die verhoogt de waarde van direct eigenverbruik en van opslag via een thuisbatterij ten opzichte van simpelweg terugleveren.

## Waarom een geïsoleerde berekening per maatregel misleidt

Een warmtepomp die los wordt doorgerekend, geeft een ander beeld dan een warmtepomp gecombineerd met zonnepanelen en een thuisbatterij: de baten van eigen opwek en opslag vallen dan deels samen. Reken maatregelen daarom in combinatie door, niet als losse offertes naast elkaar.

## Hoe EnerCalculatie hiermee omgaat

EnerCalculatie rekent zonnepanelen, thuisbatterij en warmtepomp in één dossier door, inclusief subsidies en de impact van de salderingsregeling, zodat de kosten-batenanalyse het gecombineerde effect toont in plaats van drie losse deelberekeningen.
`;

export function VerduurzamingKostenBatenAnalyseArticle() {
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
