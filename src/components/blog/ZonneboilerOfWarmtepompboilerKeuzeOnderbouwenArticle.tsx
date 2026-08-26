import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'zonneboiler-of-warmtepompboiler-keuze-onderbouwen')!;

const markdown = `
De keuze tussen een **zonneboiler of warmtepompboiler** hangt af van de fysieke kenmerken van de woning en de elektrische installatie. Een zonneboiler bespaart gemiddeld 40% tot 50% op het gasverbruik voor warm water (met naverwarming tot minimaal 60 °C tegen legionella), terwijl een warmtepompboiler een COP van 3 tot 4 behaalt op basis van omgevings- of buitenlucht. Met de juiste opname van dakoppervlak, opstellingsruimte en NEN 1010 groepenkasteisen stelt u een feitelijk onderbouwd adviesrapport op.

## Zonneboiler: Eisen aan dakoppervlak, oriëntatie en naverwarming

Een zonneboiler levert een aanzienlijke reductie van het gasverbruik op. Om het verwachte rendement te behalen, gelden specifieke randvoorwaarden voor de plaatsing van de zonnecollectoren:
* **Oriëntatie:** Bij voorkeur georiënteerd tussen het zuidoosten en het zuidwesten.
* **Hellingshoek:** Een ideale hellingshoek ligt tussen de 20 en 60 graden.
* **Schaduw:** Er is een schaduwvrij dakoppervlak nodig voor een optimale werking.

In de winter of op bewolkte dagen kan de zoninval onvoldoende zijn om het water volledig op te warmen. Een zonneboiler heeft in die gevallen een naverwarmer nodig, zoals een cv-ketel, een warmtepomp of een elektrisch element. Deze naverwarming is noodzakelijk om het water tot minimaal 60 °C te verwarmen ter preventie van legionella.

## Warmtepompboiler: Rendement (COP 3-4) en opstellingsruimte

Een warmtepompboiler haalt warmte uit de omgevingslucht of uit de buitenlucht om het kraanwater te verwarmen. Dit type installatie kent een gemiddelde COP (Coefficient of Performance) van 3 tot 4.

Wanneer een warmtepompboiler binnenlucht gebruikt, vraagt de opstellingsruimte extra aandacht in het advies:
* Het systeem onttrekt warmte aan de ruimte waarin het staat, waardoor deze ruimte koeler wordt.
* Bij onvoldoende ruimtevolume of gebrekkige ventilatie kan dit de temperatuur in de ruimte flink laten dalen.
* Een te koude opstellingsruimte kan het rendement van de warmtepompboiler negatief beïnvloeden.

## Groepenkast en NEN 1010: Elektrische eisen bij > 2,2 kVA

Bij de installatie van een warmtepompboiler of bij de inzet van een elektrisch element als naverwarmer voor een zonneboiler dient de groepenkast gecontroleerd te worden.

Volgens NEN 1010-eisen geldt dat toestellen of elektrische elementen met een elektrisch aansluitvermogen van meer dan 2,2 kVA op een afzonderlijke eindgroep moeten worden aangesloten. Indien het vermogen boven deze grens ligt, dient er een afzonderlijke eindgroep met passende aardlekbeveiliging en installatie-automaat in de groepenkast te worden opgenomen.

## Vergelijking: Zonneboiler vs. Warmtepompboiler

In de onderstaande tabel staan de belangrijkste factoren uit de bronnen naast elkaar om de keuze te verduidelijken:

| Parameter | Zonneboiler | Warmtepompboiler |
| :--- | :--- | :--- |
| **Warmtebron** | Zonlicht (via collectoren) | Omgevingslucht of buitenlucht |
| **Prestatie / Besparing** | 40% tot 50% besparing op gasverbruik kraanwater | Gemiddelde COP van 3 tot 4 |
| **Locatie-eisen** | Schaduwvrij dak (SE-SW, helling 20-60°) | Voldoende volume en ventilatie bij binnenlucht |
| **Aandachtspunt** | Naverwarming tot 60 °C vereist tegen legionella | Onttrekt warmte aan opstellingsruimte |
| **Elektrische eis (> 2,2 kVA)** | Afzonderlijke eindgroep bij elektrisch element > 2,2 kVA | Afzonderlijke eindgroep bij aansluitvermogen > 2,2 kVA |
| **ISDE-subsidie** | Afhankelijk van type collector en opbrengst | Beschikbaar voor woningeigenaren |

## ISDE-subsidie voor zonneboilers en warmtepompboilers

Voor de aanschaf van zowel een zonneboiler als een warmtepompboiler is subsidie beschikbaar voor woningeigenaren via de Investeringssubsidie duurzame energie en energiebesparing (ISDE).

Het exacte ISDE-subsidiebedrag voor een zonneboiler is afhankelijk van het type collectoren en de jaarlijkse energie-opbrengst. Deze opbrengst wordt vastgesteld volgens de geldende testnormen. Het opnemen van deze gegevens in het advies geeft de klant direct inzicht in de financiële onderbouwing.

## Zo onderbouwt u de keuze in het adviesrapport

Bij het opstellen van het adviesrapport toetst u de fysieke situatie van de woning. Beschikt de woning over een geschikt, schaduwvrij dak tussen zuidoost en zuidwest, en is er een geschikte naverwarmer aanwezig? Dan is een zonneboiler vaak een geschikte optie om de gasvraag te verlagen.

Is het dakoppervlak ongunstig of niet schaduwvrij, maar is er wel een geschikte opstellingsruimte met voldoende volume of ventilatie? Dan kan een warmtepompboiler met een COP van 3 tot 4 een passend alternatief bieden.

Controleer daarnaast in beide situaties de capaciteit en indeling van de groepenkast. Indien het elektrische element of de warmtepompboiler een vermogen van meer dan 2,2 kVA heeft, neemt u het opnemen van een afzonderlijke eindgroep (met passende aardlekbeveiliging en installatie-automaat) op in de offerte en het advies. Door deze technische randvoorwaarden en de ISDE-subsidie helder naast elkaar te zetten, vormt het adviesrapport een concrete en feitelijke basis voor de klant.

## Veelgestelde vragen (FAQ)

### Wat is het voordeel van een zonneboiler ten opzichte van een warmtepompboiler?
Een zonneboiler bespaart gemiddeld 40% tot 50% op het gasverbruik voor warm water, mits er voldoende schaduwvrij dakoppervlak beschikbaar is met een gunstige oriëntatie.

### Wanneer is een afzonderlijke eindgroep verplicht volgens NEN 1010?
Volgens NEN 1010 moet een toestel of elektrisch element met een elektrisch aansluitvermogen van meer dan 2,2 kVA op een afzonderlijke eindgroep worden aangesloten.

### Waarom is naverwarming tot 60 °C nodig bij een zonneboiler?
Op bewolkte dagen of in de winter levert de zon onvoldoende warmte. Naverwarming tot minimaal 60 °C is noodzakelijk ter preventie van legionella.
`;

export function ZonneboilerOfWarmtepompboilerKeuzeOnderbouwenArticle() {
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
