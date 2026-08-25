import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'oost-west-zonnepanelen-opbrengst-zelfconsumptie')!;

const markdown = `
Een **oost-west opstelling van zonnepanelen** biedt een effectief alternatief voor een traditionele zuid-oriëntatie. Hoewel de jaaropbrengst per Wattpiek iets lager ligt, leidt de bredere dagproductie tot een hogere directe zelfconsumptie en minder piekbelasting op het elektriciteitsnet.

## Jaaropbrengst en Dagelijks Productieprofiel van Oost-West Zonnepanelen
Een oost-west opstelling levert per geïnstalleerde Wattpiek op jaarbasis doorgaans circa 10 tot 20 procent minder totale elektriciteit op dan een optimale zuid-oriëntatie onder een hoek van 35 graden.

Daartegenover staat dat een oost-west oriëntatie zorgt voor een vlakkere en bredere productiecurve gedurende de dag. Hierbij is sprake van een lagere piek rond het middaguur en een hogere productie in de ochtend en de late middag. Voor de volledige rekenmethode per dakvlak inclusief een uitgewerkt cijfervoorbeeld: zie [zonnepanelen op meerdere dakvlakken](/blog/zonnepanelen-meerdere-dakvlakken-jaaropbrengst-berekenen).

## Hogere Directe Zelfconsumptie en Slim Verbruik
In een standaard huishouden zonder batterij of slimme sturing ligt het gemiddelde percentage directe zelfconsumptie van opgewekte zonnestroom op circa 30 procent. 

Door de productie beter af te stemmen op het huishoudelijke verbruiksprofiel stijgt het percentage directe zelfconsumptie van de opgewekte zonnestroom bij een oost-west opstelling vergeleken met een zuid-opstelling.

## Vermindering van de Belasting op het Elektriciteitsnet
Het verlagen van piekbelastingen via profielspreiding, zoals bij oost-west oriëntaties, vermindert de belasting op de buurttransformator en het lokaal lagespanningsnet. 

Een lagere piekspanning op het net heeft als voordeel dat de kans verkleint dat omvormers in de buurt automatisch uitschakelen vanwege een te hoge netspanning (boven 253 Volt).

### Regelgeving en Richtlijnen voor Aansluiten en Vermogen
Voor het aansluiten en verdelen van het vermogen geldt de onderstaande regelgeving en richtlijnen:
- Vanwege de Netcode Elektriciteit dient invoeding boven de 16A (3,68 kVA) over meerdere fases te worden verdeeld om fase-onbalans te voorkomen. Dit houdt in dat vanaf omvormers groter dan circa 3,68 kW (of 4 kW in de praktijk) vaak wordt overgestapt op een 3-fase omvormer.
- Boven de 5 kW aan omvormervermogen is een 3-fase aansluiting in veel gevallen noodzakelijk om onbalans op het net te voorkomen.
- Om selectiviteit te waarborgen mag een omvormer bij een hoofdaansluiting van 1x35A of 3x25A op maximaal 16A (3,68 kW per fase) worden afgezekerd.

## Optimale Dakbenutting en Slimme Omvormerdimensionering
Naast de nettechnische aspecten biedt een oost-west opstelling voordelen voor de inrichting van het dak en de keuze van de omvormer:
- **Hogere ruimtelijke benuttingsgraad:** Op platte daken kan een oost-west opstelling meer panelen per vierkante meter verwerken. Dit komt doordat er geen minimale tussenafstand nodig is om onderlinge schaduwinval bij een lage zonnestand te voorkomen.
- **Onderdimensionering van de omvormer:** Doordat de twee dakvlakken niet gelijktijdig hun maximale piekvermogen bereiken, kan een omvormer met een kleiner vermogen ten opzichte van het totale Wattpiek-vermogen van de panelen worden toegepast.

Indien meerdere bronnen (zoals het net en een omvormer of batterij) gelijktijdig op dezelfde groep of aardlekschakelaar kunnen invoeden, tellen de stromen bij elkaar op. De optelsom van de gelijktijdig actieve stromen dient getoetst te worden aan de nominale stroom van de gedeelde beveiliging. Raadpleeg bij twijfel een erkend installateur.

## Veelgestelde Vragen over Oost-West Opstellingen

### Hoeveel minder opbrengst geeft een oost-west opstelling t.o.v. zuid?
Een oost-west opstelling levert per geïnstalleerde Wattpiek op jaarbasis doorgaans circa 10 tot 20 procent minder totale elektriciteit op dan een optimale zuid-oriëntatie onder een hoek van 35 graden.

### Waarom zorgt een oost-west opstelling voor meer zelfconsumptie?
Door stroom op te wekken tijdens de ochtend- en namiddaguren sluit de opbrengst beter aan op het verbruiksprofiel van een standaard huishouden, waardoor de directe zelfconsumptie stijgt ten opzichte van een zuid-opstelling.

### Kan de omvormer lichter worden uitgevoerd bij oost-west?
Ja, doordat de twee dakvlakken niet gelijktijdig hun maximale piekvermogen bereiken, kan de omvormer worden ondergedimensioneerd ten opzichte van het totale Wattpiek-vermogen van de panelen.
`;

export function OostWestZonnepanelenOpbrengstZelfconsumptieArticle() {
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
