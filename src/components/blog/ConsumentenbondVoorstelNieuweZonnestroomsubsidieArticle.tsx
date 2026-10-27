import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'consumentenbond-voorstel-nieuwe-zonnestroomsubsidie')!;

const markdown = `
De Consumentenbond wil een nieuwe zonnestroomsubsidie van 10 eurocent per teruggeleverde kilowattuur voor een periode van 15 jaar. Dit stelt de organisatie voor in een position paper voor het Kamergesprek 'Zon op dak' om het verdwijnen van de salderingsregeling op te vangen.

## Het einde van de salderingsregeling in 2027

De wettelijke salderingsregeling voor zonnepanelen stopt definitief op 1 januari 2027. Vanaf die datum mag opgewekte stroom niet meer worden verrekend met afgenomen stroom. Wel geldt van 2027 tot ten minste 2030 dat energieleveranciers wettelijk minimaal 50% van het kale leveringstarief als vergoeding moeten uitkeren.

De Consumentenbond stelt voor de subsidie van 10 cent per kWh te laten gelden voor maximaal 3.000 kWh per jaar. Onzekerheid over het afschaffen van salderen en de invoering van terugleverkosten veroorzaakten eerder een scherpe daling van de verkoop van zonnepanelen. Zonder stimuleringsregeling dreigt de terugverdientijd op te lopen naar circa 25 jaar.

## Wat betekent dit subsidievoorstel voor jou?

Voor consumenten veranderen de financiële uitkomsten van zonnepanelen na 2027 ingrijpend. Volgens doorrekeningen van Bureau Berenschot kan de gemiddelde terugverdientijd met dit subsidievoorstel en het vervallen van terugleverkosten dalen van 25 jaar naar ongeveer 9 jaar.

De Tweede Kamer stemde al in met het beëindigen van salderen per 2027. Toezicht en transparantie op terugleverkosten via de Autoriteit Consument & Markt (ACM) blijven daarbij een centraal discussiepunt. Het subsidievoorstel moet het geschonden consumentenvertrouwen in de energietransitie herstellen.

## Wat betekent het initiatief voor installateurs?

Voor installateurs kan dit initiatief op termijn meer rust en vraag in de markt terugbrengen. Duidelijkheid over een kortere terugverdientijd helpt bij het onderbouwen van offertes aan twijfelende klanten. Blijf de verdere besluitvorming in de Tweede Kamer en de rol van de ACM rondom terugleverkosten op de voet volgen.

## Wat kun je nu het beste doen?

- Volg de uitkomsten van het Kamergesprek over het alternatieve subsidievoorstel.
- Controleer in lopende energiecontracten welke afspraken er momenteel gelden voor terugleverkosten.
- Breng het directe eigen verbruik van zonnestroom in kaart om voorbereid te zijn op de periode na 2027.
`;

export function ConsumentenbondVoorstelNieuweZonnestroomsubsidieArticle() {
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
