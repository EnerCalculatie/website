import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'p1-meter-kwartierdata-analyseren-energieprofiel')!;

const markdown = `
Het analyseren van kwartierdata uit de P1-poort van een slimme meter is de meest effectieve methode om een realistisch energieprofiel op te stellen. Door actuele vermogens (kW) en cumulatieve standen (kWh) per kwartier te analyseren, krijgt u exact inzicht in piekbelastingen, gelijktijdigheid van opwek en verbruik, en de benodigde aansluitcapaciteit volgens de NEN 1010.

## Datastroom en voeding via de P1-poort (DSMR 5.0)
De P1-poort van een slimme meter die op basis van de DSMR 5.0-specificatie werkt, ververst gegevens voor elektriciteit elke seconde. Gasverbruiksdata wordt doorgaans elk kwartier doorgestuurd. Via de P1-poort levert de meter zowel actuele vermogens (in kW) als cumulatieve standen (in kWh), opgesplitst in levering en teruglevering per tarief.

Slimme meters met een DSMR 5-protocol leveren via de RJ11- of RJ12-poort voldoende stroom (5V / 250mA) om P1-meters of dataloggers direct van voeding te voorzien, waardoor een externe adapter in veel gevallen niet nodig is.

## Kwartierdata analyseren voor een nauwkeurig energieprofiel
Het analyseren van kwartierwaarden maakt het mogelijk om piekbelastingen in kaart te brengen. Dit is van belang voor een juiste dimensionering van warmtepompen, laadpalen en batterijsystemen.

Het analyseren van deze kwartierdata levert de volgende inzichten op:
- **Gebruikersgedrag versus gebouwprestatie:** Door werkelijke kwartierdata te vergelijken met de theoretische energiebehoefte (zoals berekend in de NTA 8800), kan het gebruikersgedrag gescheiden worden van de gebouwgebonden energieprestatie.
- **Gelijktijdigheid van opwek en verbruik:** Inzicht in kwartierdata helpt bij het bepalen van de gelijktijdigheid van lokale opwek (zonnepanelen) en verbruik. Dit is belangrijk voor het maximaliseren van de zelfconsumptie.
- **Voorkomen van netcapaciteitsoverschrijding:** Het monitoren van de maximale kwartierpiek (kW) op de aansluiting helpt bij het voorkomen van overschrijding van de gecontracteerde netcapaciteit en het vermijden van duurdere aansluitcategorieën.

## Technische randvoorwaarden en installatie-eisen (NEN 1010)
Bij het vertalen van de kwartierdata naar een concreet advies over installaties gelden specifieke technische vuistregels en wetgeving met betrekking tot beveiliging, fasedistributie en capaciteit:

### Beveiliging en selectiviteit volgens NEN 1010
De NEN 1010 eist dat elektrische installaties adequaat beveiligd zijn tegen overstroom; gelijktijdigheid dient hierin te worden berekend. Om selectiviteit ten opzichte van de hoofdzekering te waarborgen, geldt in de praktijk (met een veiligheidsmarge van factor 1,6):
- Bij een hoofdaansluiting van **1x35A** of **3x25A** mag een omvormer of laadpaal op maximaal **16A** worden afgezekerd.
- Het maximale vermogen per fase bedraagt **3,68 kW** (16A × 230V).
- Het maximale 3-fase vermogen op een 3x25A-aansluiting is ca. **11 kW** (3 × 16A).
- Hoewel een 3x25A-aansluiting een continu vermogen van **17,25 kW** biedt, kan hierop niet zomaar 17,25 kW op één groep worden aangesloten; dit vereist verzwaring van de aansluiting (bijvoorbeeld naar 3x35A of hoger).

### Fase-onbalans en fasering van apparatuur
- **Netcode Elektriciteit:** Om fase-onbalans te voorkomen, geldt dat invoeding (zonnepanelen) boven de 16A (3,68 kVA) over meerdere fases verdeeld dient te worden. Bij omvormers groter dan circa 3,68 kW (in de praktijk 4 kW) stapt men doorgaans over op een 3-fase omvormer. Boven de 5 kW aan omvormervermogen is een 3-fase aansluiting veelal noodzakelijk.
- **Thuisbatterijen:** 1-fase thuisbatterijen kunnen over het algemeen met maximaal 3,68 kW tot 5 kW laden of ontladen, afhankelijk van de netbeheerder.

### Somstromen bij gelijktijdige invoeding
Wanneer het net én een omvormer (PV of batterij) op dezelfde groep of dezelfde aardlekschakelaar invoeden, tellen de stromen van beide bronnen bij elkaar op. Bijvoorbeeld: 25A vanaf het net plus 16A vanaf een omvormer levert een somstroom op van **41A**. Een standaard 40A-aardlekschakelaar is daar niet op berekend, wat kan leiden tot overbelasting en brandgevaar. Bij gelijktijdige invoeding moet de optelsom van actieve stromen daarom getoetst worden aan de nominale stroom van een gedeelde beveiliging.

## Belastingsturing (EMS) en laadpalen
Een Home Energy Management System (EMS) regelt de belasting in huis dynamisch (load balancing) om piekstromen en het afschakelen van de hoofdzekering te voorkomen. Zo is het maximale vermogen op een 3x25A-aansluiting doorgaans 11 kW per lader zonder slimme sturing, tenzij load balancing actief wordt toegepast.

## Veelgestelde vragen

### Wat is het voordeel van P1-kwartierdata analyseren voor energieadvies?
Het analyseren van kwartierdata geeft exact inzicht in actuele piekbelastingen en de gelijktijdigheid van opwek en verbruik. Dit is essentieel voor het juist dimensioneren van warmtepompen, thuisbatterijen en laadpalen.

### Hoeveel stroom levert de P1-poort volgens DSMR 5.0?
Een slimme meter met DSMR 5.0 levert via de P1-poort (RJ11/RJ12) een voeding van 5V / 250mA. Dit is voldoende om de meeste P1-meters of dataloggers direct van voeding te voorzien.

### Waarom mag een omvormer op 3x25A maximaal op 16A worden afgezekerd?
Om selectiviteit ten opzichte van de hoofdzekering te waarborgen (met een veiligheidsmarge van factor 1,6 volgens NEN 1010), mag een eindgroep bij een 25A-hoofdzekering op maximaal 16A worden afgezekerd.

## Conclusie
Het analyseren van kwartierdata uit de P1-poort biedt inzicht in actuele vermogens, piekbelastingen en de gelijktijdigheid van opwek en verbruik. Met deze informatie, gecombineerd met de richtlijnen voor selectiviteit, fase-verdeling, somstromen en dynamische sturing (EMS), kan een onderbouwd en technisch passend verduurzamingsadvies worden opgesteld.
`;

export function P1MeterKwartierdataAnalyserenEnergieprofielArticle() {
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
