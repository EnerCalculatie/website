import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'publieke-laadpalen-netcongestie-wachtlijst-acm')!;

const markdown = `
Per 1 juli 2026 is de automatische reservering van netcapaciteit voor kleinverbruikers stopgezet. Hierdoor belanden aanvragen voor publieke laadpalen bij netcongestie onderaan dezelfde wachtlijst als grootverbruikers, meldt RVO.

## Nieuwe ACM-regels voor netcapaciteit en laadpalen
Sinds 1 januari 2026 geldt voor grootverbruikers en sinds 1 juli 2026 ook voor kleinverbruikers het herziene maatschappelijk prioriteringskader van de ACM, zo meldt Enexis. Dit kader geeft uitsluitend voorrang aan drie specifieke categorieën op het stroomnet. Dat zijn congestieverzachters, nationale veiligheid en acute zorg, en maatschappelijke basisbehoeften zoals woningbouw en onderwijs.

Publieke en commerciële laadpalen vallen volgens belangenorganisatie VNG buiten deze drie voorrangscategorieën. Aanvragen voor publieke laadpunten sluiten daardoor achteraan aan in de algemene wachtrij. Landelijk stonden er medio 2026 al bijna 15.500 transportverzoeken van bedrijven en instellingen te wachten op afnamecapaciteit. Hoewel netbeheerders in de eerste helft van 2026 nog 5.172 nieuwe publieke laadpunten aansloten, verwachten deskundigen dat de groei op termijn stagneert.

## Gevolgen van netcongestie voor de elektrische rijder
Als rijder van een elektrisch voertuig of als omwonende kun je merken dat de realisatie van een nieuwe publieke laadpaal in de straat langer duurt. Gemeenten en laadpaalexploitanten lopen vast bij het uitbreiden van het openbare laadnetwerk in gebieden met netcongestie.

Volgens marktanalyses van ElaadNL kan de verwachte laadvraag richting 2040 alleen worden opgevangen als flexibiliteitsmaatregelen en netbewust laden volledig worden benut. Zonder slimme sturing kan de wachttijd voor een nieuw publiek laadpunt in drukke regio's fors toenemen.

## Wat de nieuwe wachtlijst betekent voor installateurs
Voor installateurs en adviseurs verandert de voorbereiding van laadprojecten ingrijpend. Standaard netuitbreidingen voor publieke laadpalen krijgen doorgaans geen voorrang meer bij de netbeheerder, waardoor projecten vertraging oplopen.

Adviseer opdrachtgevers daarom over alternatieve oplossingen, zoals capaciteitssturingscontracten of de inzet van een batterij. Door batterij-opslag voor peak shaving toe te voegen, krijgt een initiatief volgens RVO de status van congestieverzachter. Daarmee kan alsnog de hoogste prioriteit op de wachtlijst worden verkregen.

## Oplossingen voor vertraging bij publieke laadpunten
- **Onderzoek batterij-buffer:** Combineer laadpalen met een batterijsysteem voor peak shaving om de status van congestieverzachter te krijgen.
- **Gebruik stuurbaar vermogen:** Maak gebruik van alternatieve transportovereenkomsten en capaciteitssturingscontracten om laadvermogen flexibel te regelen.
- **Benut 'Eerder Aanvragen':** Gemeenten kunnen vanaf 1 oktober 2026 via de procedure 'Eerder Aanvragen' vooraf netcapaciteit reserveren voor specifieke projecten zoals woningbouw.
- **Start tijdig de netcheck:** Toets projecten ruim vooraf op beschikbare netcapaciteit en stem het advies af op netbewuste oplossingen.
`;

export function PubliekeLaadpalenNetcongestieWachtlijstAcmArticle() {
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
