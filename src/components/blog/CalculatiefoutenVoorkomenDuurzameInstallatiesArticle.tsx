import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'calculatiefouten-voorkomen-duurzame-installaties')!;

const markdown = `
Een vergeten P1-kabel of een te dunne AC-kabel kan de complete winstmarge op een verduurzamingsproject laten verdampen. Je voorkomt calculatiefouten door kabeltrajecten, veiligheidsvoorzieningen en randapparatuur vooraf exact door te rekenen en transparante voorwaarden te hanteren.

## Veelvoorkomende calculatiefouten bij verduurzaming

Bij offertes voor zonnepanelen, laadpalen en warmtepompen ontstaan faalkosten vaak door kleine omissies in het materiaal en de installatie-eisen:

- **Randapparatuur voor Load Balancing:** Fabrikanten zoals Alfen en Wallbox vereisen voor Dynamic Load Balancing aanvullende componenten zoals een P1-kabel, modbus-meter of CT-spoelen. Het vergeten van deze fysieke onderdelen leidt op de montagedag direct tot extra kosten.
- **Kabeldimensionering en spanningsval:** Volgens NEN 1010 moet de spanningsval binnen de normgrenzen blijven. Bij een laadpaal-kabeltraject van 75 meter leidt een 2,5 mm² kabel bij 11 kW laden tot circa 3,5% spanningsverlies, wat laadstoringen veroorzaakt. Bij zonnepanelen kan een te hoge kabelweerstand de spanning bij de omvormer juist boven 253V jagen, waardoor deze uitschakelt.
- **Veilig werken op hoogte:** Het Arbeidsomstandighedenbesluit stelt eisen aan veilig werken op hoogte. Niet-mee-gecalculeerde steigers, hoogwerkers of dakrandbeveiliging vallen direct ten laste van de nettomarge.
- **ISDE-subsidie-eisen:** RVO vereist een exacte overeenkomst tussen de meldcode op de offerte en de fysiek geleverde warmtepomp. Een typefout op de documenten leidt tot een afgewezen subsidieaanvraag.

| Calculatiepost | Veelvoorkomende fout | Direct risico |
| :--- | :--- | :--- |
| **Laadinfrastructuur** | Geen P1-kabel of CT-spoelen | Onvoorziene faalkosten bij montage |
| **AC-traject** | Te dunne aders op afstand | Laadstoringen of omvormeruitval bij 253V |
| **Dakmontage** | Geen dakrandbeveiliging | Hoge huurkosten achteraf |
| **Warmtepomp** | Afwijkende RVO-meldcode | Subsidieafwijzing voor de klant |

## Impact van materiaalprijzen en faalkosten op de winstmarge

Prijsschommelingen en onnauwkeurige capaciteitsberekeningen drukken de winst. Zonder een correcte warmteverliesberekening volgens NEN-EN 12831 raakt een warmtepomp over- of ondergedimensioneerd, wat leidt tot klachten of onnodig hoge aanschafkosten.

De Autoriteit Consument & Markt (ACM) geeft aan dat je materiaalprijswijzigingen achteraf niet zomaar mag doorberekenen. Stijgen de koper- of componentprijzen tussen offerte en oplevering, dan mag je dit alleen verrekenen als er vooraf een uitdrukkelijke en transparante nacalculatieclausule in de voorwaarden staat.

## Stappenplan voor nauwkeurige en snelle installatieberekeningen

Nauwkeurig calculeren vraagt om een vast stappenplan voordat de offerte de deur uitgaat:

- **Toets de netcapaciteit:** Controleer bij verzwaringen (bijvoorbeeld van 1x35A naar 3x25A) tijdig via MijnAansluiting.nl en stem de ruimtelijke capaciteit in de verdeelkast af met netbeheerders zoals Liander of Enexis.
- **Reken spanning en vermogen door:** Gebruik genormeerde richtlijnen voor kabeldiameters en kies vanaf 35 tot 40 meter al voor 4 mm² of 6 mm² bij 3-fase laadpalen om spanningsval te voorkomen.
- **Borg de dataspecificaties:** Neem de exacte productcodes, stringontwerpregels (zoals bij SolarEdge) en RVO-meldcodes op in het offertesysteem.

## Praktisch advies voor de installateur

Als installateur geef je de klant rust door technische keuzes helder te onderbouwen. Leg uit dat een dikkere kabel vanaf 40 meter geen overdimensionering is, maar uitval door spanningsval (onderspanning) en onnodig energieverlies bij het laden voorkomt. Door randvoorwaarden zoals netverzwaring en veiligheidsvoorzieningen vooraf op te nemen, bescherm je je eigen marge én voorkom je discussies achteraf.

Welke calculatiestap in jouw offertetraject kan vandaag nog scherper ingericht worden?
`;

export function CalculatiefoutenVoorkomenDuurzameInstallatiesArticle() {
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
