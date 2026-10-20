import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'airco-slimme-aansturing-thermische-batterij')!;

const markdown = `
Slimme aansturing van een airconditioning kan de beton- en steenmassa van een woning benutten als thermische warmtebatterij. Door overdag opgewekte zonnestroom te gebruiken voor voorverwarming, daalt de stroomvraag op dure avondmomenten.

## Hoe werkt een airco als thermische batterij?
Bij dit principe zet een Energiemanagementsysteem (EMS) de massa van muren, vloeren en plafonds in om warmte op te slaan. De hardware leest via de P1-poort van de slimme meter de actuele zonne-energie en netdata uit. Een controller stuurt de airco vervolgens aan via een infraroodsignaal, waardoor het systeem werkt met bestaande units die een IR-afstandsbediening gebruiken.

Het sturingsalgoritme combineert drie variabelen: de actuele zonnestroomproductie, de dynamische uurtarieven van het energiecontract en de ingestelde comfortgrens van de bewoners. De opgeslagen warmte komt in de avonduren geleidelijk weer vrij. Omdat voorverwarmen via gebouwmassa gemiddeld 20 procent extra energieverlies veroorzaakt, levert dit alleen financieel voordeel op wanneer het prijsverschil in de stroomtarieven groot genoeg is.

## Wat levert slimme airco-aansturing op?
Voor een gemiddelde tussenwoning met airco, zonnepanelen en een dynamisch tarief bedraagt de berekende besparing circa 275 euro per jaar ten opzichte van niet-gestuurd verbruik. De mate waarin de massa warmte vasthoudt, hangt direct af van de isolatie van de woning en de heersende buitentemperatuur.

Het verplaatsen van het verbruik naar de middaguren verhoogt de eigenconsumptie van zonnestroom. Dit biedt uitkomst bij het voorbereiden op het vervallen van de salderingsregeling per 1 januari 2027. Bovendien helpt het verschuiven van de vraag om het elektriciteitsnet tijdens drukke avonduren te ontlasten.

## Wat betekent dit voor installateurs?
Voor installateurs en adviseurs biedt deze techniek een manier om klanten met een lucht-lucht warmtepomp te adviseren over slimme sturing zonder ingrijpende aanpassingen aan de installatie. Doordat de aansturing via infrarood verloopt, is het concept breed toepasbaar op al aanwezige airco-installaties.

Bij het adviseren moet de isolatiegraad van het pand worden beoordeeld. Bij woningen met een lagere isolatiewaarde ligt het warmteverlies hoger, waardoor het tariefverschil tussen middag en avond de 20 procent extra energieverlies minder eenvoudig compenseert.

## Wat kun je nu doen?
- Controleer of de aanwezige airco bediend kan worden met een infrarood afstandsbediening.
- Check of de slimme meter beschikt over een vrije P1-poort voor de koppelmodule van het EMS.
- Beoordeel de isolatie van muren en vloeren om de thermische capaciteit in te schatten.
- Vergelijk de prijsverschillen tussen middag- en avondtarieven binnen het dynamische stroomcontract.

Benut jij de stenen en muren in je projecten al voor slimme warmte-opslag?
`;

export function AircoSlimmeAansturingThermischeBatterijArticle() {
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
