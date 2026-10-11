import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleVisual } from './ArticleVisual';

const post = blogPosts.find((p) => p.slug === 'offerte-opvolging-installateurs')!;

const markdown0 = `
Veel verduurzamingsoffertes blijven weken liggen omdat klanten twijfelen over subsidies, rendement of de verbouwing. Door gestructureerd op te volgen vanaf 24 tot 48 uur na verzending verkort een installatiebedrijf de beslissingstijd enorm.

## Wat is het beste moment om een verduurzamingsofferte op te volgen?

Het eerste opvolgmoment vindt idealiter plaats binnen 24 tot 48 uur na de verzending van de offerte. In dit eerste contact controleer je de ontvangst en beantwoord je eventuele verhelderende vragen.

Een vast opvolgschema met duidelijke intervallen geeft houvast voor het hele verkoopteam:
- **Dag 2:** Controleer of de offerte goed is ontvangen en bekeken.
- **Dag 7:** Bespreek inhoudelijke vragen, verwachte besparingen en subsidiemogelijkheden.
- **Dag 14:** Geef een statusupdate over de geldigheidstermijn en de voorgestelde planning.

`;
const markdown1 = `

Moderne CRM- en offertesoftware geeft een melding zodra een klant de digitale offerte opent. Dit directe inzicht biedt het ideale moment om meteen telefonisch contact op te nemen met de klant.

## Welke twijfels kun je tijdens de opvolging wegnemen?

Onzekerheid over subsidies is voor veel huiseigenaren een grote drempel bij verduurzamen. De Investeringssubsidie duurzame energie en energiebesparing (ISDE) vergoedt een deel van de aanschaf van warmtepompen, zonneboilers en isolatie. Heldere uitleg en ondersteuning bij de ISDE-aanvraag neemt deze financiële twijfel bij de klant snel weg.

Daarnaast maken klanten zich vaak zorgen over breekwerk en overlast tijdens de installatie. Je neemt deze zorg weg door tijdens de opvolging een transparant stappenplan van de werkzaamheden en de verwachte oplevertijd toe te lichten.

Twijfels over het daadwerkelijke rendement neem je weg met heldere, onderbouwde cijfers. Door besparingen te onderbouwen met actuele energietarieven en kengetallen van Milieu Centraal geef je de klant duidelijke inzichten over de terugverdientijd. Software zoals EnerCalculatie helpt installateurs om deze rendementsberekeningen snel te genereren en feitelijk te onderbouwen in elke offerte.

## Hoe helpt automatisering bij offerte-opvolging?

In de drukke praktijk van een installatiebedrijf schiet handmatige opvolging er soms bij in. CRM-systemen met geautomatiseerde herinneringen (task triggers) zorgen ervoor dat adviseurs op het juiste moment een melding krijgen om de klant te benaderen.

Hierdoor blijven offertes voor warmtepompen, zonnepanelen of isolatie niet onnodig lang liggen. Snel en nauwkeurig rekenen in de voorbereiding in combinatie met een automatische opvolging zorgt voor kortere doorlooptijden en een hogere conversie.

Hoeveel offertes blijven er binnen jouw bedrijf liggen simpelweg omdat niemand tijd had om na een week even te bellen?
`;

export function OfferteOpvolgingInstallateursArticle() {
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
        }}>{markdown0}</ReactMarkdown>
      <ArticleVisual visual={{"type":"bar_chart","title":"Vaste opvolgmomenten na verzending (dagen)","unit":"Dagen","items":[{"label":"Ontvangst-check","value":2},{"label":"Inhoud & Subsidie","value":7},{"label":"Status & Geldigheid","value":14}],"illustrative":false}} />
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
        }}>{markdown1}</ReactMarkdown>
    </BlogPostLayout>
  );
}
