import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'legionellapreventie-warmtepompboiler-energieprofiel')!;

const markdown = `
Bij het verduurzamen van de warmtapwatervoorziening in woningen worden warmtepompboilers veelvuldig toegepast. Om te voldoen aan de drinkwaterveiligheid is legionellapreventie verplicht. Dit gebeurt door het water periodiek te verhitten via een elektrisch bijverwarmingselement. Deze thermische desinfectie veroorzaakt een tijdelijke piek in het energieprofiel en beïnvloedt de NTA 8800-prestatie en seizoensgebonden efficiëntie (SPF).

## Eisen voor drinkwaterveiligheid en temperatuur (NEN 1006)

De NEN 1006 schrijft eisen voor aan drinkwaterinstallaties om de kwaliteitsborging en veiligheid tegen bacteriële groei, zoals *Legionella pneumophila*, te garanderen. 

Om de groei van de Legionella-bacterie in drinkwaterinstallaties te voorkomen, moet warm tapwater periodiek worden verhit tot minimaal 60 °C tot 65 °C.

## Werking van de warmtepompboiler tijdens de legionellacyclus

Een warmtepompboiler verwarmt het water via de compressor op een efficiënte wijze tot circa 50 °C tot 55 °C. Voor het bereiken van hogere temperaturen, zoals tijdens een legionellacyclus, volstaat de werking van de compressor doorgaans niet en wordt een ingebouwd elektrisch bijverwarmingselement ingeschakeld.

* **Vermogen:** Het vermogen van dit geïntegreerde elektrische bijverwarmingselement in residentiële warmtepompboilers ligt in de regel tussen de 1,2 kW en 2,0 kW.
* **Rendement:** Het elektrische bijverwarmingselement werkt op basis van directe elektrische weerstand met een COP (Coefficient of Performance) van 1.
* **Vermogensprofiel:** Doordat de bijverwarming op een COP van 1 functioneert, resulteert de inschakeling hiervan in een tijdelijke piek in het vermogensprofiel van het systeem.

## Impact op de energieprestatieberekening (NTA 8800)

Het gebruik van de elektrische bijverwarming heeft consequenties voor de energieprestatieberekeningen van een gebouw:

* In de energieprestatieberekening conform NTA 8800 wordt het extra elektriciteitsverbruik van het elektrische element voor legionellapreventie meegenomen in het totale energiegebruik voor warm tapwater.
* Dit aanvullende elektriciteitsverbruik beïnvloedt de netto seizoensgebonden efficiëntie (SPF) van het tapwatersysteem.

## Belasting van de elektrische installatie en rol van een EMS

De tijdelijke vermogenspiek van 1,2 kW tot 2,0 kW door het bijverwarmingselement vraagt aandacht voor de belasting op de elektrische installatie. Om piekstromen en mogelijke afschakeling van de hoofdzekering te voorkomen, kan een Home Energy Management System (EMS) worden ingezet. Een EMS regelt de elektrische belasting in de woning dynamisch via load balancing.

## Conclusie

Het periodiek verhitten van warm tapwater tot 60 °C à 65 °C is volgens NEN 1006 noodzakelijk voor de veiligheid tegen *Legionella pneumophila*. Omdat de compressor van een warmtepompboiler het water efficiënt verwarmt tot circa 50 °C tot 55 °C, schakelt het systeem voor het hogere temperatuurbereik een elektrisch element (1,2 kW tot 2,0 kW, COP van 1) in. Dit zorgt voor een tijdelijke vermogenspiek. In de NTA 8800-berekening wordt dit extra elektriciteitsverbruik meegenomen, wat een direct effect heeft op de seizoensgebonden efficiëntie (SPF).

## Veelgestelde vragen over legionellapreventie bij warmtepompboilers

### Waarom is elektrische bijverwarming nodig bij een warmtepompboiler?
De compressor van een warmtepompboiler verwarmt het water efficiënt tot circa 50 °C tot 55 °C. Om de door NEN 1006 geëiste 60 °C tot 65 °C voor legionellapreventie te bereiken, is de inzet van een elektrisch element noodzakelijk.

### Welke invloed heeft de legionellacyclus op de NTA 8800-berekening?
Het extra elektriciteitsverbruik van het bijverwarmingselement (met COP 1) wordt opgeteld bij het totale energiegebruik voor warm tapwater, wat de seizoensgebonden efficiëntie (SPF) beïnvloedt.

### Hoe voorkomt u overbelasting van de netaansluiting tijdens de legionellacyclus?
Door een Home Energy Management System (EMS) toe te passen dat via load balancing de elektrische belasting in de woning dynamisch regelt.
`;

export function LegionellapreventieWarmtepompboilerEnergieprofielArticle() {
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
