import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'isde-meldcode-warmtepomp-controleren-rvo')!;

const markdown = `
Bij het aanvragen van ISDE-subsidie voor een warmtepomp is een accurate afstemming van de documentatie essentieel. Om vertraging of afwijzing van de subsidieaanvraag door de Rijksdienst voor Ondernemend Nederland (RVO) te voorkomen, moeten de gegevens op de aanvraag exact overeenkomen met de werkelijkheid en de factuur.

## Wat is een ISDE-meldcode en hoe werkt de RVO-apparatenlijst?

De RVO publiceert en onderhoudt de officiële 'Apparatenlijst Warmtepompen'. In deze lijst zijn goedgekeurde warmtepompen opgenomen met een unieke meldcode (het zogenaamde KA-nummer) en het bijbehorende subsidiebedrag. 

Milieu Centraal adviseert installateurs en consumenten om de meldcode rechtstreeks te verifiëren in de RVO-database voordat de koop- of installatieovereenkomst definitief wordt ondertekend.

## Voorwaarden voor opname op de RVO-apparatenlijst

Lucht-water warmtepompen en hybride warmtepompen moeten beschikken over minimaal een energielabel A++ (bij een vertrektemperatuur van 55°C) om te worden opgenomen op de RVO-apparatenlijst.

Staat een warmtepomp niet op de apparatenlijst van de RVO? Dan moet bij de subsidieaanvraag aanvullende documentatie worden meegeleverd, zoals:
* Testrapporten van het toestel
* Het energielabel

Op basis hiervan kan de RVO het apparaat handmatig beoordelen.

## Factuureisen en installatierichtlijnen voor ISDE-subsidie

Om in aanmerking te komen voor de ISDE-subsidie moet de warmtepomp worden geïnstalleerd door een deskundige installateur. Zelfinstallatie door de eindgebruiker is niet toegestaan.

Daarnaast stelt de RVO specifieke eisen aan de factuur die als bewijsstuk dient. Op de factuur van de installateur moeten de volgende gegevens expliciet vermeld staan:
* Het merk van de warmtepomp
* Het type/typenummer
* De installatiedatum
* Het adreshuisnummer van de installatie

Een afwijking tussen de meldcode op de aanvraag en het daadwerkelijk geïnstalleerde type warmtepomp op de factuur leidt tot vertraging of afwijzing van de subsidieaanvraag.

## Aanvraagtermijnen ISDE-subsidie: Particulier vs. Zakelijk

Het moment van aanvragen verschilt afhankelijk van het type aanvrager:

* **Particuliere woningeigenaren:** Moeten de ISDE-subsidieaanvraag indienen binnen 24 maanden na de installatie van de warmtepomp.
* **Zakelijke aanvragers:** Moeten de ISDE-subsidie aanvragen én de beslissing afwachten vóórdat de koopovereenkomst voor de warmtepomp definitief wordt aangegaan.

## Veelgestelde vragen over de ISDE-meldcode

### Hoe controleer ik de ISDE-meldcode van een warmtepomp?
U kunt de meldcode (het KA-nummer) verifiëren in de officiële RVO-apparatenlijst. Doe dit vóór het definitief ondertekenen van de koop- of installatieovereenkomst.

### Wat te doen als de warmtepomp niet op de apparatenlijst staat?
Als de warmtepomp ontbreekt op de RVO-lijst, dient u testrapporten van het toestel en het energielabel mee te sturen bij de aanvraag voor een handmatige beoordeling.

### Mag een consument de warmtepomp zelf installeren voor subsidie?
Nee, zelfinstallatie is niet toegestaan. De warmtepomp moet verplicht door een deskundige installateur worden geplaatst.
`;

export function IsdeMeldcodeWarmtepompControlerenRvoArticle() {
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
