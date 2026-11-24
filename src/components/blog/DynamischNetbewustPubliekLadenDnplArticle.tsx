import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'dynamisch-netbewust-publiek-laden-dnpl')!;

const markdown = `
Op 12 november 2026 is Dynamisch Netbewust Publiek Laden (DNPL) officieel gestart bij openbare laadpunten in Utrecht, Gelderland en Flevoland. Netbeheerders verminderen hierbij het laadvermogen van openbare laders of pauzeren het laden kortstondig tijdens piekmomenten van netdrukte.

## Hoe werkt dynamisch netbewust laden in de praktijk?
Netbeheerders Stedin, Liander en Enexis voeren deze maatregel uit samen met het Ministerie van Infrastructuur en Waterstaat, de NAL, ElaadNL en Vereniging DOET. In de provincie Utrecht worden direct circa 4.500 openbare laadpunten aangesloten. Negen laadpaalbeheerders doen mee, waaronder Vattenfall, TotalEnergies, Allego, Qwello, Velian, Ubitricity, Opcharge, Orangecharging en Citycharging.

Het verminderen of kortstondig pauzeren van het vermogen gebeurt op locaties waar de lokale netbelasting dat noodzakelijk maakt. De netbeheerder geeft 24 uur van tevoren door waar knelpunten ontstaan. Laadpaalbeheerders sturen de laders vervolgens centraal aan via hun Smart Charging-platform met OCPP. Dit gebeurt binnen twee vaste dagelijkse tijdvakken: tussen 06.00 en 11.00 uur (ochtendpiek) en tussen 15.00 en 22.00 uur (avondpiek).

Voor de winterperiode van 1 november 2026 tot en met 31 maart 2027 geldt dat de maatregel maximaal 25 keer per specifieke laadlocatie mag worden geactiveerd. Zodra de piekbelasting voorbij is, schakelt de laadpaal automatisch weer over naar het normale laadvermogen.

## Wat betekent netbewust laden voor EV-rijders?
Laad je een elektrische auto op een openbaar punt in Midden-Nederland, dan kan de laadsessie tijdens de ochtend- of avondpiek langer duren doordat het vermogen wordt geknepen of tijdelijk stilgelegd. Je ontvangt vooraf een melding via je laad-app of laadpasaanbieder.

Heb je de accu snel vol nodig? Bij de meeste deelnemende laadpalen kun je de vermogensbeperking handmatig overschrijven via een opt-out functie in de app.

## Gevolgen van netdrukte voor installateurs en thuisladers
Door vermogensbeperkingen op straat vragen meer rijders naar een laadpaal op eigen terrein. Op een standaard 3x25A huisaansluiting levert een lader doorgaans maximaal 11 kW (afgezekerd op 16A per fase). Leg de klant uit hoe dynamische load balancing overbelasting van de hoofdzekering voorkomt en laadzekerheid in eigen beheer geeft.

## Wat kun je doen bij beperkt laadvermogen?
- Zet meldingen aan in de app van je laadpasaanbieder om te zien wanneer een lader knijpt.
- Gebruik de opt-out functie in de laad-app als je snel moet doorrijden.
- Houd rekening met langere laadtijden tussen 06.00-11.00 uur en 15.00-22.00 uur.
- Vraag een installateur om advies over een private laadpaal met dynamische sturing op eigen terrein.
`;

export function DynamischNetbewustPubliekLadenDnplArticle() {
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
