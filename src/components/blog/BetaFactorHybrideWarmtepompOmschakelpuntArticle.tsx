import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'beta-factor-hybride-warmtepomp-omschakelpunt')!;

const markdown = `
Bij de toepassing van een hybride warmtepomp spelen de dimensionering van de installatie en het omschakelmoment naar de cv-ketel een cruciale rol in de werking en efficiëntie van het verwarmingssysteem. De twee begrippen die hierin centraal staan, zijn de bèta-factor en het bivalentiepunt.

## Wat is de bèta-factor bij een hybride warmtepomp?

De bèta-factor (β-factor) is de verhouding tussen het opgesteld verwarmingsvermogen van de warmtepomp en de totale ontwerp-warmtebehoefte (het piekvermogen) van de woning. 

Wanneer een hybride warmtepomp is gedimensioneerd op een bèta-factor van 0,3 tot 0,5, levert het systeem in de praktijk circa 70% tot 80% van de jaarlijkse warmtebehoefte voor ruimteverwarming. 

Bij de installatie en dimensionering kan ook de elektrische aansluiting van belang zijn: een warmtepomp boven de 5 kW thermisch vraagt in veel gevallen om een 3-fase aansluiting voor een optimale verdeling van de belasting.

## Het bivalentiepunt en de gebouwprestatie (NTA 8800)

Het bivalentiepunt is de buitentemperatuur waarbij het geleverde vermogen van de hybride warmtepomp exact gelijk is aan het warmteverlies van de woning. Bij lagere buitentemperaturen is ondersteuning van de cv-ketel vereist om de woning op temperatuur te houden.

In de NTA 8800-rekenmethodiek voor gebouwprestaties wordt de bijdrage van de hybride warmtepomp meegenomen op basis van de specifieke installatiekenmerken. Hierbij zijn het bivalentiepunt en het afgiftesysteem bepalend voor de dekkingsgraad van het systeem.

## Hoe bepaal je het financieel optimale omschakelpunt?

Naast de thermische grens speelt het financiële omschakelpunt tussen het gebruik van de warmtepomp en de cv-ketel een rol. 

Het financieel optimale omschakelpunt treedt op wanneer de kosten voor het opwekken van warmte via de warmtepomp hoger worden dan de kosten via de cv-ketel. 
- De kosten voor het opwekken van warmte via de warmtepomp zijn afhankelijk van de momentane COP en de elektriciteitsprijs per kWh. 
- De kosten voor het opwekken van warmte via de cv-ketel zijn afhankelijk van het nuttig rendement van de ketel en de gasprijs per m³.

### Berekening van de minimale COP voor omschakeling

De minimale COP waarbij elektrisch verwarmen met de warmtepomp voordeliger is dan verwarmen op gas, wordt berekend door:
1. De kostprijs van één kWh thermische energie uit gas te bepalen (de gasprijs gedeeld door het nuttig rendement van de cv-ketel in kWh).
2. De kWh-prijs van elektriciteit te delen door deze berekende kostprijs van thermische energie uit gas.

Wanneer de prestatiecoëfficiënt (COP) van de warmtepomp bij lage buitentemperaturen onder deze berekende waarde zakt, is het voordeliger om de warmtelevering over te laten aan de cv-ketel.

## Veelgestelde vragen over de bèta-factor en het omschakelpunt

### Wat is de bèta-factor van een hybride warmtepomp?
De bèta-factor (β-factor) is de verhouding tussen het opgesteld verwarmingsvermogen van de warmtepomp en de totale ontwerp-warmtebehoefte (het piekvermogen) van de woning.

### Wat betekent het bivalentiepunt?
Het bivalentiepunt is de buitentemperatuur waarbij het geleverde vermogen van de warmtepomp exact gelijk is aan het warmteverlies van de woning. Bij lagere buitentemperaturen springt de cv-ketel bij.

### Wanneer schakelt de warmtepomp financieel het beste om naar gas?
Het financieel optimale omschakelpunt treedt op zodra de kosten per kWh thermische warmte via de warmtepomp hoger worden dan die van de cv-ketel, afhankelijk van de actuele COP, stroomprijs en gasprijs.
`;

export function BetaFactorHybrideWarmtepompOmschakelpuntArticle() {
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
