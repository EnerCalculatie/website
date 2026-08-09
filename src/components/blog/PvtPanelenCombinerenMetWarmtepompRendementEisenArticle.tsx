import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'pvt-panelen-combineren-met-warmtepomp-rendement-eisen')!;

const markdown = `
Het combineren van PVT-panelen met een water-water warmtepomp biedt een geïntegreerde oplossing voor het opwekken van zowel elektriciteit als warmte. Voor installateurs en adviseurs is het van belang om te onderbouwen hoe dit systeem gedurende het hele jaar presteert en aan welke elektrische en regeltechnische randvoorwaarden moet worden voldaan.

## Wat zijn PVT-panelen en hoe werken ze?
PVT-panelen combineren fotovoltaïsche stroomopwekking (PV) en thermische energiewinning in hetzelfde paneel. De thermische achterzijde van het paneel dient hierbij als bron voor een [water-water warmtepomp](/blog/bodemgebonden-vs-lucht-water-warmtepomp-rendement).

Door warmte aan de achterzijde van het PVT-paneel af te voeren, worden de zonnecellen gekoeld. Dit koelende effect verhoogt het elektrische rendement van de PV-cellen op warme dagen.

## Jaarrond energiebron: Efficiëntie in de winter en 's nachts
In tegenstelling tot systemen die uitsluitend afhankelijk zijn van direct zonlicht, benutten PVT-panelen meerdere energiebronnen uit de omgeving:
- Zonlicht
- Omgevingslucht
- Wind
- Condensatiewarmte

Dankzij de benutting van omgevingslucht, wind en condensatiewarmte levert de bron ook gedurende de nacht en in de winterperiode warmte aan de warmtepomp.

## Voldoen aan geluidseisen (BBL) en energieprestatie (NTA 8800)
Een kenmerk van een PVT-warmtepompsysteem is het ontbreken van een draaiende buitenunit met een ventilator. Hierdoor is er geen sprake van geluidsoverlast door een buitenunit, waardoor het systeem doorgaans eenvoudig voldoet aan de geluidseisen uit het Besluit bouwwerken leefomgeving (BBL).

Wat betreft de energieprestatie is de werking en het rendement van PVT-panelen als bron voor warmtepompen gestandaardiseerd binnen de NTA 8800 rekenmethodiek. Hiermee kan de prestatie officieel en onderbouwd worden meegenomen bij het bepalen van de BENG-indicatoren.

## Elektrische inpassing en NEN 1010 veiligheidsnormen
Bij het installeren en dimensioneren van de combinatie van een warmtepomp en PV/PVT-omvormers spelen elektrotechnische richtlijnen uit de NEN 1010 en de Netcode Elektriciteit een rol:

- **Fasering van de warmtepomp:** Een warmtepomp met een thermisch vermogen boven de 5 kW vraagt in veel gevallen om een 3-fase aansluiting om een optimale verdeling van de belasting te waarborgen.
- **Fase-onbalans en omvormervermogen:** Volgens de Netcode Elektriciteit dient invoeding boven de 16A (3,68 kVA) over meerdere fases te worden verdeeld om fase-onbalans te voorkomen. Vanaf omvormervermogens groter dan circa 3,68 kW wordt daarom gebruikgemaakt van een 3-fase omvormer.
- **Selectiviteit en maximaal vermogen:** Bij een hoofdaansluiting van 1x35A of 3x25A mag een omvormer met het oog op selectiviteit (rekening houdend met de veiligheidsfactor 1.6) op maximaal 16A worden afgezekerd. Dit komt neer op maximaal 3.680 Watt (3,68 kW) per fase, of circa 11 kW totaal op een 3-fase 3x25A aansluiting.
- **Beveiliging tegen somstromen:** Wanneer het net én een omvormer gelijktijdig kunnen invoeden op dezelfde groep of aardlekschakelaar, tellen de stromen bij elkaar op. Bij een netstroom van 25A en een omvormerstroom van 16A ontstaat bijvoorbeeld een optelsom van 41A. Een standaard 40A-aardlekschakelaar is hier niet op berekend. De optelsom van alle gelijktijdig actieve stromen moet daarom worden getoetst aan de nominale stroom van elke gedeelde beveiliging.
- **Home Energy Management (EMS):** Een EMS kan de belasting in de woning dynamisch regelen (load balancing) om piekstromen en het afschakelen van de hoofdzekering te voorkomen. Lees meer over [energiebeheersystemen en load balancing](/blog/energiemanagementsysteem-p1-poort).

## Subsidiemogelijkheden (ISDE) voor PVT-warmtepompen
Warmtepompen die gebruikmaken van een PVT-bron komen in aanmerking voor de Investeringssubsidie duurzame energie en energiebesparing (ISDE). Hierbij geldt de voorwaarde dat de specifieke combinatie of de warmtepomp vermeld staat op de goedgekeurde apparatenlijst van de RVO.

## Conclusie
De combinatie van PVT-panelen en een water-water warmtepomp levert een constante energiebron doordat het systeem naast zonlicht ook wind, omgevingslucht en condensatiewarmte benut. Dit maakt warmtelevering in de winter en 's nachts mogelijk, terwijl de celkoeling het elektrische rendement op warme dagen verhoogt. Binnen de NTA 8800 zijn deze prestaties gestandaardiseerd voor de BENG-bepaling, en het ontbreken van een ventilator-buitenunit vereenvoudigt het voldoen aan de BBL-geluidseisen. Bij de aanleg dient de installateur de NEN 1010-richtlijnen te volgen voor wat betreft faseverdeling, selectiviteit en somstromen.
`;

export function PvtPanelenCombinerenMetWarmtepompRendementEisenArticle() {
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
