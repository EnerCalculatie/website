import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'verduurzamingspakket-samenstellen-beperkt-budget')!;

const markdown = `
Niet elke klant met een beperkt budget hoeft te kiezen tussen zonnepanelen óf een warmtepomp — de volgorde waarin u maatregelen adviseert bepaalt vaak meer voor het eindresultaat dan het totale budget zelf. Bij een krap budget loont het om te beginnen bij de maatregel die de andere maatregelen goedkoper of effectiever maakt, in plaats van de grootste losse investering.

## Zonnepanelen en thuisbatterij: eerst zelfconsumptie, dan opslag

Zonnepanelen leveren pas rendement op zodra de opgewekte stroom ook daadwerkelijk wordt verbruikt of terugverkocht tegen een goed tarief. Een thuisbatterij verhoogt de zelfconsumptie door overtollige stroom op te slaan voor later gebruik, maar is een aanvullende investering bovenop de panelen zelf — bij een krap budget is de volgorde dus eerst panelen, batterij pas als vervolgstap zodra het budget dat toelaat.

## Warmtepomp: subsidie verlaagt de instap, isolatie bepaalt het rendement

Een warmtepomp komt in aanmerking voor [ISDE-subsidie](/blog/isde-subsidie-warmtepompen), wat de netto investering verlaagt. Het rendement van die investering hangt sterk af van de bestaande isolatie en het afgiftesysteem van de woning — zie [warmtepomp bij een slecht geïsoleerde woning](/blog/warmtepomp-slecht-geisoleerde-woning-advies-onderbouwen) voor hoe u dat onderbouwt richting de klant vóórdat u de warmtepomp zelf offreert.

## Laadpaal: capaciteit toetsen vóórdat u aanbiedt

Bij het combineren van een laadpaal met de overige maatregelen is de resterende capaciteit van de netaansluiting bepalend. Load balancing regelt de laadstroom automatisch bij op basis van het overige verbruik in de woning, wat een dure verzwaring van de aansluiting vaak overbodig maakt.

## Hoe EnerCalculatie hiermee omgaat

EnerCalculatie rekent de combinatie van zonnepanelen, thuisbatterij, warmtepomp en laadpaal in één dossier door — inclusief de gezamenlijke belasting op de netaansluiting — zodat u bij een beperkt budget onderbouwd kunt adviseren welke maatregel als eerste het meeste oplevert, in plaats van dit per maatregel los te beoordelen.
`;

export function VerduurzamingspakketSamenstellenBeperktBudgetArticle() {
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
