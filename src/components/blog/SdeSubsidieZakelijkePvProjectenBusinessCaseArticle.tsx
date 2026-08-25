import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'sde-subsidie-zakelijke-pv-projecten-business-case')!;

const markdown = `
De SDE++ subsidie (Stimulering Duurzame Energieproductie en Klimaattransitie) is een exploitatiesubsidie die het verschil vergoedt tussen de kostprijs van duurzame energie (het basisbedrag) en de marktwaarde van de opgewekte energie (het correctiebedrag). Voor zakelijke projecten met fotovoltaïsche zonnesystemen (zon-PV) vormt deze 15-jarige regeling een cruciale pijler in de financiële onderbouwing van de business case.

## Belangrijkste randvoorwaarden voor de SDE++ aanvraag

Om in aanmerking te komen voor SDE++ subsidie voor hernieuwbare elektriciteit uit zon-PV, dient het zakelijke project aan specifieke voorwaarden te voldoen:

- **Grootverbruikaansluiting:** De SDE++ voor zon-PV geldt uitsluitend voor locaties met een grootverbruikaansluiting (een aansluiting groter dan 3x80A).
- ** Transportindicatie:** Bij de subsidieaanvraag dient een positieve transportindicatie van de betreffende netbeheerder te worden meegestuurd. Uit deze indicatie dient te blijken dat er netcapaciteit beschikbaar is voor de installatie.
- **Dakconstructieverklaring:** Indien de installatie op een dak wordt geplaatst, dient de aanvrager via een goedgekeurde verklaring over de dakconstructie aan te tonen dat het dak het gewicht van het zonne-energiesysteem kan dragen.

## Werking, looptijd en vergoeding binnen SDE++

De SDE++ subsidie werkt op basis van de werkelijk gerealiseerde energieproductie over een meerjarige periode:

- **Looptijd:** De subsidie voor zon-PV wordt uitgekeerd over een periode van 15 jaar.
- **Vergoeding per kWh:** De uitkering vindt plaats op basis van de werkelijk geproduceerde hoeveelheid duurzame energie in kilowattuur (kWh).
- **Vollasturen:** De regeling hanteert een maximale vergoeding per jaar, gebaseerd op een vooraf vastgesteld maximum van 950 vollasturen per jaar voor netlevering.
- **Banking-regeling:** Binnen de SDE++ is een zogenaamde 'banking'-regeling opgenomen. Hiermee kan onderproductie in een zonne-arm jaar worden ingehaald in latere jaren. Daarnaast kan overproductie tot maximaal 25% worden meegenomen naar een volgend jaar.

## Marktinvloeden en realisatietermijnen van zon-PV

Bij het opstellen van rekenmodellen voor de zakelijke klant spelen jaarlijkse verrekeningen en de bouwtijd van het project een rol:

- **Vaststelling correctiebedrag:** Het correctiebedrag wordt ieder jaar achteraf definitief vastgesteld op basis van de gemiddelde energieprijzen in dat specifieke jaar.
- **Invloed van hoge energieprijzen:** Als de marktprijs voor elektriciteit hoger is dan het gecorrigeerde basisbedrag van de SDE++, ontvangt de aanvrager over die betreffende periode geen subsidie.
- **Realisatietermijn:** Na het verlenen van de subsidie dient de PV-installatie binnen een vastgestelde termijn in gebruik te worden genomen. Voor projecten kleiner dan 1 MWp geldt een realisatietermijn van 1,5 jaar na verlening. Voor grotere projecten bedraagt deze termijn 3 jaar.

## Conclusie: Een sluitende business case voor uw klant

Een gedegen business case voor zakelijke zon-PV projecten binnen de SDE++ rust op het correct meewegen van de aanvraagvereisten (zoals een grootverbruikaansluiting van meer dan 3x80A, een positieve transportindicatie en een goedgekeurde dakverklaring) én de randvoorwaarden tijdens de exploitatiefase. Door de termijn van 15 jaar, het maximum van 950 vollasturen voor netlevering, de banking-regeling en de jaarlijkse marktcorrecties mee te nemen, ontstaat een helder en realistisch financieel beeld voor de zakelijke eindklant. Combineer dit waar relevant met de [energie-investeringsaftrek (EIA)](/blog/energie-investeringsaftrek-eia-2026) — beide regelingen richten zich op zakelijke verduurzaming, maar met een ander fiscaal mechanisme.
`;

export function SdeSubsidieZakelijkePvProjectenBusinessCaseArticle() {
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
