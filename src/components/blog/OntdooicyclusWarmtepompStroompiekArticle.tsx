import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'ontdooicyclus-warmtepomp-stroompiek')!;

const markdown = `
Wanneer bewoners in de winterperiode hun energieverbruik bekijken, valt een kortstondig hoog stroomverbruik vaak op. In veel gevallen wordt dit piekverbruik veroorzaakt door de **ontdooicyclus (defrost process)** van een lucht-water warmtepomp. Tijdens dit proces draait de compressor op maximaal vermogen en kan het elektrische bijverwarmingselement inschakelen om de buitenunit ijsvrij te maken.

## Hoe ontstaat ijsvorming op de buitenunit?

Bij buitentemperaturen tussen -5 °C en +7 °C in combinatie met een hoge relatieve luchtvochtigheid, slaat vocht uit de lucht neer op de verdamper van de buitenunit van een lucht-water warmtepomp. Dit vocht kan vervolgens rijpen en bevriezen.

Om het opgebouwde ijs op de buitencondensor te smelten, schakelt de warmtepomp automatisch over naar de ontdooimodus. Tijdens dit proces wordt de werking van het koelcircuit tijdelijk omgekeerd.

## De werking van de ontdooicyclus en het ontstaan van de stroompiek

Tijdens een actieve ontdooicyclus heeft het systeem warmte nodig om de buitenunit te verwarmen. Deze warmte wordt kortstondig onttrokken aan het cv-water of aan een aanwezig buffervat.

Wanneer het cv-water op dat moment onvoldoende warmte bevat om het ijs te smelten, schakelt de warmtepomp het ingebouwde elektrische bijverwarmingselement (de back-up heater) in.

* Dit elektrisch bijverwarmingselement heeft doorgaans een vermogen tussen de 3 kW en 6 kW.
* Het inschakelen van dit element, gecombineerd met het op maximaal vermogen draaien van de compressor, veroorzaakt een tijdelijke stroompiek op de elektriciteitsaansluiting.
* Dit leidt tot een korte maar hoge piek in het opgemeten vermogen op de slimme meter.

## Duur van de cyclus en invloed op het totale jaarverbruik

Een gemiddelde ontdooicyclus duurt circa 5 tot 10 minuten. Bij vochtig winterweer kan deze cyclus meerdere keren per dag optreden.

Hoewel dit proces leidt tot tijdelijke piekbelastingen, is dit niet bepalend voor de algehele efficiëntie over het gehele jaar. Ondanks de korte stroompieken tijdens het ontdooien, blijft de jaarlijkse Seizoensgebonden Prestatiecoëfficiënt (SCOP) van de warmtepomp leidend voor het totale energieverbruik.

## Aandachtspunten voor de elektrische installatie en netbelasting

Een warmtepomp boven de 5 kW thermisch vermogen vraagt in veel gevallen om een 3-fase aansluiting om een optimale verdeling van de belasting te realiseren. Om piekstromen en het afschakelen van de hoofdzekering bij gelijktijdig gebruik van zware verbruikers te voorkomen, kan een Home Energy Management System (EMS) de belasting in de woning dynamisch regelen via load balancing.

## Veelgestelde vragen over de ontdooicyclus

### Waarom veroorzaakt de warmtepomp een stroompiek in de winter?
Dit komt door de automatische ontdooicyclus. Als het cv-water onvoldoende warmte bevat om het ijs op de buitenunit te smelten, schakelt de ingebouwde elektrische back-up heater (3 kW tot 6 kW) tijdelijk in.

### Heeft de ontdooicyclus een grote invloed op het jaarverbruik?
Nee, een ontdooicyclus duurt gemiddeld slechts 5 tot 10 minuten. De jaarlijkse SCOP van de warmtepomp blijft leidend voor de totale energie-efficiëntie.

### Hoe voorkomt u het overbelasten van de hoofdzekering bij ontdooien?
Bij warmtepompen boven 5 kW thermisch vermogen wordt een 3-fase aansluiting toegepast. Een Home Energy Management System (EMS) kan aanvullend zorgen voor dynamische load balancing.
`;

export function OntdooicyclusWarmtepompStroompiekArticle() {
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
