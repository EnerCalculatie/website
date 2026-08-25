import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'infraroodverwarming-combineren-met-warmtepomp')!;

const markdown = `
Een combinatie van een warmtepomp en infraroodpanelen past binnen een realistisch energieprofiel als de warmtepomp dient als efficiënte basisverwarming en de infraroodpanelen worden ingezet voor plaatselijke, incidentele bijverwarming. Vanwege het verschil in COP en stroomverbruik is het van belang om beide systemen op de juiste manier te positioneren en rekening te houden met de netbelasting.

## Rendement en COP: Infrarood versus warmtepomp

Er bestaat een aanzienlijk verschil in energie-efficiëntie tussen infraroodpanelen en een warmtepomp:

- **Infraroodpanelen:** Zetten elektriciteit direct 1-op-1 om in warmte. Dit levert een COP (Coefficient of Performance) van 1 op. Infraroodstraling verwarmt niet de lucht, maar direct de aanwezige personen en objecten. Hierdoor kan het thermisch comfort behouden blijven bij een lagere luchttemperatuur.
- **Warmtepompen:** Benutten omgevingswarmte en behalen daardoor een gemiddelde COP van 3 tot 5. Een warmtepomp functioneert doorgaans het meest efficiënt met een lage-temperatuurafgiftesysteem (LTV), zoals vloerverwarming of lage-temperatuurradiatoren.

## Hoofdverwarming versus bijverwarming: Wat is energetisch slim?

De manier waarop deze systemen worden ingezet, heeft een grote invloed op het totale stroomverbruik en de energiekosten.

- **Infrarood als hoofdverwarming:** Wanneer infraroodpanelen worden ingezet als primaire hoofdverwarming, leidt dit door de COP van 1 tot een aanzienlijk hoger stroomverbruik en hogere energiekosten in vergelijking met een warmtepomp.
- **Infrarood als bijverwarming:** Infraroodpanelen zijn energetisch vooral toepasbaar als plaatselijke bijverwarming. Dit is met name effectief in ruimtes die kortstondig of incidenteel worden gebruikt, zoals een badkamer of een thuiswerkplek.

## Piekbelasting en capaciteit van de huisaansluiting

Het gelijktijdig inschakelen van elektrische apparatuur met een hoog vermogen, waaronder infraroodpanelen en een warmtepomp, verhoogt de piekbelasting van de huisaansluiting.

- **Elektrisch versus thermisch vermogen:** De netbelasting en eisen aan de groepenkast worden bepaald door het *elektrisch* opgenomen vermogen (inclusief eventuele elektrische bijverwarmers of back-up elementen), niet door het thermisch vermogen. Een warmtepomp met een thermisch vermogen van 5 kW vraagt bij een COP van 4 bijvoorbeeld slechts circa 1,25 kW aan elektrisch vermogen. Bij infraroodpanelen (COP van 1) is het elektrische opgenomen vermogen gelijk aan het thermische vermogen.
- **Aansluiting en piekstromen:** Een standaard 3x25A-aansluiting biedt een continu vermogen van 17,25 kW. Om te voorkomen dat gelijktijdige piekbelastingen leiden tot overbelasting, kan een Home Energy Management System (EMS) de belasting in huis dynamisch regelen via load balancing. Dit helpt om piekstromen en het afschakelen van de hoofdzekering te voorkomen.

## Subsidies en financiële aspecten

Voor de aanschaf van deze installaties gelden verschillende regelingen:

- Voor **warmtepompen** kan een gebouweigenaar aanspraak maken op de landelijke ISDE-subsidie.
- Voor **infraroodpanelen** is er geen landelijke ISDE-subsidie beschikbaar.

## Conclusie

Het combineren van een warmtepomp en infraroodpanelen past binnen een realistisch energieprofiel als de warmtepomp (bij voorkeur aangesloten op een lage-temperatuurafgiftesysteem) wordt gebruikt als efficiënte basisverwarming. Infraroodpanelen kunnen aanvullend worden ingezet voor plaatselijke, incidentele bijverwarming in specifiek gebruikte ruimtes. Vanwege het hogere stroomverbruik bij een COP van 1 is infraroodverwarming minder geschikt als volledige hoofdverwarming. Bij het ontwerp dient bovendien rekening te worden gehouden met het elektrisch opgenomen vermogen en de piekbelasting op de aansluiting, waarbij een EMS sturing kan bieden.
`;

export function InfraroodverwarmingCombinerenMetWarmtepompArticle() {
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
