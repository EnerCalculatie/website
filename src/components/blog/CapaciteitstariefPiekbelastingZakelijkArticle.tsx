import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'capaciteitstarief-piekbelasting-zakelijk')!;

const markdown = `
Het capaciteitstarief en onverwachte piekbelasting kunnen zakelijke grootverbruikers met hoge netbeheerderskosten opzadelen. Een enkele kwartierpiek boven het Gecontracteerd Vermogen (GV) kan een zakelijke grootverbruiker een directe boete opleveren in de vorm van een overschrijdingstarief. Voor installateurs ligt hier de kans om klanten te beschermen tegen onverwacht hoge netbeheerderskosten door de juiste combinatie van capaciteitsanalyse, sturing en opslag te adviseren. Met inzicht in de kwartierwaarden en de inzet van slimme technieken voorkomt u dat het piekwattage de vaste kosten opdrijft.

## Kleinverbruik vs. grootverbruik: Wat is het verschil in capaciteitskosten?

Het type aansluiting bepaalt op welke wijze de netbeheerder de capaciteitskosten berekent. Voor installateurs is dit onderscheid essentieel bij het opstellen van een passend advies:

| Type aansluiting | Aansluitwaarde | Bepaling capaciteitstarief |
| :--- | :--- | :--- |
| **Kleinverbruik** | t/m 3x80A | Vast jaartarief op basis van fysieke aansluitwaarde (bijv. 3x25A of 3x50A), onafhankelijk van het feitelijke piekverbruik. |
| **Grootverbruik** | > 3x80A | Gebaseerd op het Gecontracteerd Vermogen (GV) in kW en het Maximaal Gemeten Vermogen per kwartier. |

Bij een kleinverbruikaansluiting van 3x25A geldt bijvoorbeeld een continu vermogen van 17,25 kW. Het feitelijke piekverbruik verandert het vaste jaartarief bij kleinverbruik niet. Bij grootverbruik heeft het piekgedrag daarentegen directe financiële consequenties.

## Het risico van kwartierpieken en overschrijdingstarieven

Bij grootverbruikaansluitingen monitort de netbeheerder het verbruik continu per kwartier. Als de werkelijke piekbelasting in een kwartier hoger uitvalt dan het afgesproken Gecontracteerd Vermogen, brengt de netbeheerder een overschrijdingstarief in rekening voor de extra piekcapaciteit.

Om te hoge vastrechtkosten of overschrijdingsboetes te vermijden, kunnen zakelijke klanten hun Gecontracteerd Vermogen maandelijks of jaarlijks laten aanpassen via hun netbeheerder. Dit gebeurt op basis van een nauwkeurige analyse van geanalyseerde kwartierwaarden.

## Technische oplossingen voor peak shaving en belastingsturing

Om pieken op te vangen en het gecontracteerde vermogen te beschermen, kunnen installateurs verschillende sturingstechnieken toepassen:

- **EMS en peak shaving:** Een Energie Management Systeem (EMS) gekoppeld aan batterij-opslag vangt piekbelastingen op. Zodra het verbruik dreigt uit te stijgen boven het gecontracteerde vermogen, levert de batterij tijdelijk vermogen bij.
- **Dynamic Load Balancing bij laadpalen:** Bij laadinfrastructuren stemt dit systeem de laadsnelheid van elektrische voertuigen automatisch af op de op dat moment beschikbare capaciteit van het pand. Dit helpt piekkosten en netoverbelasting te vermijden.
- **Dynamische belastingsturing:** Een EMS regelt de belasting in een pand dynamisch om piekstromen en afschakeling van de hoofdzekering te voorkomen.

## Veiligheid en somstromen bij de installatie van batterij-opslag

Bij het installeren van batterij-opslag of extra omvormers ter ondersteuning van het net moet rekening worden gehouden met de bepalingen inzake overstroom en selectiviteit.

Wanneer het net én een omvormer (zoals een batterij of PV-systeem) op dezelfde groep of aardlekschakelaar kunnen invoeden, tellen de stromen van beide bronnen bij elkaar op. Bij een stroom van 25A vanaf het net en 16A vanaf de omvormer ontstaat een totale stroom van 41A. Een standaard 40A-aardlekschakelaar kan hierdoor overbelast raken, wat brandgevaar oplevert. Bij gelijktijdige invoeding en belasting moet de optelsom van de actief aanwezige stromen worden getoetst aan de nominale stroom van elke gedeelde beveiliging.

## Conclusie: Voorkom hoge netkosten met slimme sturing

Door het analyseren van kwartierwaarden en het toepassen van slimme sturing via een EMS, batterij-opslag en load balancing worden piekbepalende verbruikers opgevangen. Hiermee blijft het gecontracteerd vermogen van zakelijke grootverbruikers binnen de gestelde grenzen en worden overschrijdingstarieven voorkomen.

## Veelgestelde vragen (FAQ)

### Wat is het verschil tussen kleinverbruik en grootverbruik bij het capaciteitstarief?
Kleinverbruik (t/m 3x80A) betaalt een vast jaartarief op basis van de fysieke aansluitwaarde. Grootverbruik (>3x80A) betaalt op basis van het Gecontracteerd Vermogen (GV) in kW en het Maximaal Gemeten Vermogen per kwartier.

### Wat gebeurt er bij een overschrijding van het Gecontracteerd Vermogen?
Als het gemeten kwartiervermogen hoger uitvalt dan het afgesproken Gecontracteerd Vermogen, brengt de netbeheerder een overschrijdingstarief in rekening voor de extra piekcapaciteit.

### Hoe helpt peak shaving met een EMS tegen hoge netbeheerderskosten?
Een EMS gekoppeld aan een batterij detecteert wanneer het verbruik het Gecontracteerd Vermogen dreigt te overschrijden en levert direct tijdelijk vermogen bij, waardoor kostbare kwartierpieken worden voorkomen.
`;

export function CapaciteitstariefPiekbelastingZakelijkArticle() {
  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
          blockquote: ({node: _node, ...props}) => <blockquote className="border-l-4 border-brand-primary pl-4 my-4 italic text-slate-600 bg-slate-50 py-2 pr-4 rounded-r" {...props} />,
          table: ({node: _node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full border-collapse text-sm" {...props} /></div>,
          thead: ({node: _node, ...props}) => <thead className="bg-slate-100" {...props} />,
          th: ({node: _node, ...props}) => <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-900" {...props} />,
          td: ({node: _node, ...props}) => <td className="border border-slate-200 px-3 py-2 text-slate-700" {...props} />
        }}
      >
        {markdown}
      </ReactMarkdown>
    </BlogPostLayout>
  );
}
