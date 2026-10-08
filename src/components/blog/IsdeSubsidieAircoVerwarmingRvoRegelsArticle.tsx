import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'isde-subsidie-airco-verwarming-rvo-regels')!;

const markdown = `
Veel huiseigenaren verwachten dat een airconditioner die kan verwarmen automatisch recht geeft op ISDE-subsidie. Binnen RVO-kaders geldt echter een duidelijke grens: lucht-luchtwarmtepompen voor particuliere woningeigenaren komen niet in aanmerking voor de Investeringssubsidie duurzame energie en energiebesparing (ISDE). Door deze regels vroegtijdig in het offertetraject helder toe te lichten, voorkomt u teleurstellingen achteraf en onderbouwt u uw advies op feitelijke gronden.

## Isde-subsidie voor een airco (lucht-luchtwarmtepomp): wat zijn de regels?

Het antwoord van de Rijksdienst voor Ondernemend Nederland (RVO) is helder: lucht-luchtwarmtepompen (waaronder standaard airconditioners met een verwarmingsfunctie) ontvangen geen ISDE-subsidie bij particuliere woningen. 

Volgens Milieu Centraal is het idee dat een airco als bijverwarming subsidie oplevert een veelvoorkomend misverstand bij consumenten. Om voor warmtepompsubsidie via de ISDE in aanmerking te komen, stelt de RVO namelijk specifieke eisen aan de warmteafgifte:

| Systeemtype | ISDE-subsidiabel (Particulier) | RVO-voorwaarde |
| :--- | :--- | :--- |
| **Lucht-luchtwarmtepomp (airco)** | Nee | Uitgesloten van ISDE voor particulieren |
| **Watergedragen warmtepomp** | Ja | Gekoppeld aan cv-water of watergedragen distributie |
| **Warmtepompboiler** | Ja | Bestemd voor de bereiding van warm tapwater |

Een installatie dient dus onderdeel te zijn van een watergedragen distributiesysteem (zoals cv-water) of te zorgen voor warmtapwaterbereiding om binnen de particuliere ISDE-regeling te vallen.

## Technische voorwaarden en de RVO-meldcodelijst

Voor warmtepompinstallaties die wel binnen de ISDE-regeling vallen, gelden specifieke technische en administratieve randvoorwaarden. 

- **Meldcodelijst:** De apparatuur komt uitsluitend in aanmerking voor subsidie als het specifieke merk en type is opgenomen op de officiële RVO-meldcodelijst Warmtepompen.
- **Professionele installatie:** Zelfinstallatie door een doe-het-zelver is uitgesloten. De werkzaamheden dienen te worden uitgevoerd door een bouw- of installatiebedrijf.
- **Aanvraagtermijn:** Particuliere woningeigenaren dienen de ISDE-subsidie aan te vragen binnen 24 maanden na de installatie en inbedrijfstelling van de apparatuur.


## Eisen aan de factuur en bewijslast voor subsidieaanvraag

Indien uw klant kiest voor een subsidiabel systeem (zoals een watergedragen warmtepomp en warmtepompboiler), vormt de factuur de inhoudelijke basis van de aanvraag. De RVO gebruikt deze documentatie voor de controle.

Om een succesvolle aanvraag te waarborgen, vermeldt de installatiefactuur de volgende gegevens:
- Het merk van de warmtepomp
- Het precieze type
- De bijbehorende RVO-meldcode
- De datum van installatie
- Het betreffende installatieadres

Ontbreekt een van deze gegevens op de factuur, dan kan dit leiden tot vertraging of afwijzing van de subsidieaanvraag door de RVO.

## Zakelijke toepassingen: ISDE versus EIA-aftrek

Voor zakelijke opdrachtgevers geldt een ander fiscaal kader dan voor particuliere woningeigenaren. 

Zakelijke aanvragers kunnen onder specifieke voorwaarden voor lucht-luchtwarmtepompen gebruikmaken van de Energie-investeringsaftrek (EIA). Deze regeling biedt fiscale voordelen bij zakelijk vastgoed, maar staat los van de ISDE voor particuliere woningen. Bij een zakelijk offertetraject is het daarom zinvol om de klant te wijzen op de EIA-criteria in plaats van de ISDE.

## Hoe adviseert u de woningeigenaar helder in het offertetraject?

Wanneer een particuliere klant vraagt om een airco om op gas te besparen, helpt een gestructureerde aanpak om de RVO-regels uit te leggen:

1. **Scheid het technische rendement van subsidie:** Leg uit dat een airco zeer efficiënt kan verwarmen, maar dat de RVO het lucht-luchtsysteem voor particulieren heeft uitgesloten van ISDE-subsidie.
2. **Vermeld de meldcode bij subsidiabele warmtepompen:** Biedt u een watergedragen warmtepomp of warmtepompboiler aan? Neem de RVO-meldcode direct op in de offerte.
3. **Zorg voor een volledige opleverfactuur:** Vermeld bij subsidiabele systemen standaard het merk, type, de meldcode, de installatiedatum en het installatieadres op de eindfactuur.

Hoe lichten uw adviseurs de RVO-voorwaarden momenteel toe tijdens het eerste adviesgesprek?
`;

export function IsdeSubsidieAircoVerwarmingRvoRegelsArticle() {
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
