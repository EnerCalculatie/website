import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'dc-ac-verhouding-omvormer-overdimensionering')!;

const markdown = `
Bij het ontwerpen van een zonne-energiesysteem komt de verhouding tussen het vermogen van de zonnepanelen en de omvormer regelmatig ter sprake. In veel situaties wordt gekozen voor overdimensionering van de omvormer om het totale rendement van de zonne-installatie te optimaliseren.

> **Snelle definitie:** **Overdimensionering van een omvormer** betekent dat het totale gelijkstroomvermogen (DC-vermogen in Wp) van de zonnepanelen hoger is dan het maximale wisselstroomvermogen (AC-vermogen in W) van de omvormer. De optimale DC/AC-verhouding voor residentiële installaties ligt doorgaans tussen **110% en 130%**.

---

## Wat is overdimensionering van een omvormer precies?

Overdimensionering houdt in dat het totale vermogen van de zonnepanelen aan de gelijkstroomzijde (het DC-vermogen in Wattpiek/Wp) hoger is dan het maximale uitgangsvermogen van de omvormer aan de wisselstroomzijde (het AC-vermogen in Watt/W). 

Voor residentiële zonne-energiesystemen ligt een gebruikelijke DC/AC-verhouding doorgaans tussen de 110% en 130% (een verhouding van 1,1 tot 1,3).

## De belangrijkste voordelen van een hogere DC/AC-verhouding

Het overdimensioneren van de DC-zijde van uw omvormer brengt in de praktijk verschillende voordelen met zich mee:

* **Snellere opstart en langere productie:** Door de DC-zijde te overdimensioneren start de omvormer 's ochtends vaak sneller op. Daarnaast kan de omvormer 's avonds bij een lage instraling langer op vol vermogen blijven produceren.
* **Voorkomen van netoverbelasting:** Een omvormer met een lager AC-vermogen voorkomt onnodige overbelasting van de hoofdaansluiting. Dit beperkt tevens het risico op uitschakeling van de installatie door overspanning op het elektriciteitsnet.

### Netinpassing en selectiviteit volgens richtlijnen
In de praktijk spelen ook nettechnische richtlijnen een rol bij het bepalen van het maximale AC-vermogen:
* Volgens **NEN 1010-richtlijnen** wordt ter waarborging van selectiviteit bij een hoofdaansluiting van 1x35A of 3x25A een omvormer doorgaans op maximaal 16A afgezekerd. Dit komt overeen met een maximaal vermogen van 3,68 kW (3.680 Watt) per fase.
* Om fase-onbalans te voorkomen geldt volgens de **Netcode Elektriciteit** dat invoeding boven de 16A (3,68 kVA) over meerdere fases verdeeld dient te worden. Vanaf omvormers groter dan circa 3,68 kW (of 4 kW) wordt daarom doorgaans overgestapt op een 3-fase omvormer.

## Wat is 'clipping' en hoeveel invloed heeft het op uw opbrengst?

Wanneer het aanbod van het DC-vermogen op zonnige momenten groter is dan het maximale AC-vermogen van de omvormer, treedt er **clipping** op. Hierbij begrenst de omvormer het overtollige vermogen om binnen zijn maximale AC-capaciteit te blijven.

Hoewel dit klinkt als verlies van energie, valt het rendementsverlies in de praktijk erg mee:
* Bij een DC/AC-verhouding van 120% is het rendementsverlies door clipping doorgaans nihil tot minimaal (vaak minder dan 1 tot 2% op jaarbasis).
* Dit geringe verlies op de piekmomenten wordt in veel gevallen gecompenseerd door de hogere stroomproductie tijdens de randuren ('s ochtends en 's avonds).

## Technische randvoorwaarden en NEN 1010 veiligheidseisen

Bij het ontwerpen van een overgedimensioneerd systeem is het van belang de grenzen van de apparatuur te bewaken. Conform de NEN 1010-eisen moeten bij overdimensionering de waarden binnen de fabrieksspecificaties van de omvormer blijven, waaronder:
* De maximale ingangsspanning (Vdc,max)
* De maximale ingangsstroom (Idc,max)

Zolang deze specifieke grenzen niet worden overschreden, kan de omvormer het aangesloten DC-vermogen veilig verwerken. Raadpleeg voor de exacte berekeningen van de specifieke grenzen en ontwerpeisen altijd een erkend installateur. Speelt spanningsopdrijving op het net hierbij ook mee? Zie [omvormeruitval bij 253V en het kabeltraject](/blog/omvormeruitval-253v-kabeltraject-offerte) voor de onderbouwing richting uw offerte.

## Samenvatting

Overdimensionering (een DC/AC-verhouding van 110% tot 130%) is een veelgebruikte methode om de productie van zonnepanelen tijdens uren met lage instraling te maximaliseren. Het eventuele opbrengstverlies door clipping op piekmomenten blijft bij een verhouding van 120% doorgaans beperkt tot minder dan 1-2% per jaar. Tegelijkertijd helpt een beperkt AC-vermogen om overbelasting van de netvoeding te voorkomen, mits het ontwerp binnen de fabrieksspecificaties (Vdc,max en Idc,max) en NEN 1010-richtlijnen blijft.

`;

export function DcAcVerhoudingOmvormerOverdimensioneringArticle() {
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
