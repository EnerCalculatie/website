import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'netverzwaring-3x25a-doorlooptijd-eisen')!;

const markdown = `
Bij de aanschaf van een zware warmtepomp of een 11 kW laadpaal is een bestaande 1x35A aansluiting vaak ontoereikend. Wanneer een netverzwaring naar 3x25A noodzakelijk is, kan de werkelijke doorlooptijd in de praktijk oplopen van 18 weken tot wel 9 maanden. Door als installateur vroegtijdig de meteropstelling te inspecteren en de juiste stappen te zetten, voorkomt u stilvallend werk en stelt u een realistisch opleverplan op.

## Doorlooptijd netverzwaring: Wettelijke termijnen en de praktijk

Aanvragen voor een verzwaring van de energie-aansluiting moeten in Nederland centraal worden ingediend via het platform MijnAansluiting.nl. De wettelijke termijn voor de realisatie van een kleinverbruikaansluiting of verzwaring is volgens de Elektriciteitswet vastgesteld op 18 weken. Door netcongestie en personeelstekorten duurt de uitvoering in de praktijk vaak aanzienlijk langer.

Netbeheerder Liander adviseert daarom om een aanvraag voor netverzwaring minimaal 6 tot 9 maanden voor de gewenste opleverdatum in te dienen. Bovendien spelen fysieke omstandigheden een grote rol in het traject. Indien de grondkabel vanaf de straat naar de woning onvoldoende aders of capaciteit beschikt, moet de netbeheerder graafwerkzaamheden uitvoeren. Dit kan de totale doorlooptijd aanzienlijk verlengen.

| Situatie / Netbeheerder | Indicatieve Doorlooptijd | Belangrijkste Oorzaak |
| :--- | :--- | :--- |
| **Wettelijk kader (ACM)** | 18 weken | Standaard termijn volgens Elektriciteitswet |
| **Praktijkadvies Liander** | 6 tot 9 maanden | Voorbereidingstijd en capaciteitstekorten |
| **Extra graafwerk (Enexis)** | Aanzienlijk langer | Onvoldoende aders/capaciteit in grondkabel |
| **Grootverbruik (>3x80A)** | Afhankelijk van wachtlijst | Congestiebeheer-protocol op volgorde van binnenkomst |

## Technische eisen aan de meterkast en binneninstallatie (NEN 1010)

Een netbeheerder voert een verzwaring pas uit als de binneninstallatie volledig gereed is. Bij een standaard verzwaring van 1x35A naar 3x25A geldt als eis dat de binneninstallatie geschikt is en beschikt over een goedgekeurde hoofdschakelaar conform NEN 1010-normen.

Netbeheerders zoals Stedin stellen een fysieke schouw of controle van de meterkast door een erkend installateur als voorwaarde voorafgaand aan het plannen van de feitelijke werkzaamheden. Zo wordt voorkomen dat de monteur op locatie geconfronteerd wordt met een ongeschikte meteropstelling.

Belangrijke inspectiepunten in de meterkast:
- **Hoofdschakelaar:** Aanwezigheid van een goedgekeurde hoofdschakelaar conform NEN 1010.
- **Fase-verdeling:** Bij omvormers boven de 16A (3,68 kVA) stelt de Netcode Elektriciteit dat de invoeding over meerdere fases verdeeld moet worden om fase-onbalans te voorkomen.
- **Somstromen:** Bij gelijktijdige invoeding vanuit het net en bijvoorbeeld een batterij of zonnepanelen tellen de stromen bij elkaar op. Een standaard 40A-aardlekschakelaar kan overbelast raken bij 25A netstroom plus 16A omvormerstroom (totaal 41A), wat tot brandgevaar leidt.

## Vermogen, selectiviteit en overbrugging met een EMS

Een 3x25A hoofdaansluiting biedt een continu vermogen van 17,25 kW. Dit betekent niet dat dit volledige vermogen op één enkele eindgroep benut kan worden. Om selectiviteit te waarborgen ten opzichte van de hoofdzekering geldt in de praktijk de vuistregel met een veiligheidsmarge (factor 1.6):

- Op een 1x35A of 3x25A aansluiting mag een omvormer of laadpaal maximaal op **16A** worden afgezekerd.
- Het maximale vermogen per fase bedraagt 16A × 230V = **3,68 kW (3.680 Watt)**.
- Het maximale 3-fase vermogen op een 3x25A aansluiting is 3 × 16A = 48A totaal, wat neerkomt op circa **11 kW**.

| Parameter op 3x25A | Waarde | Toelichting |
| :--- | :--- | :--- |
| **Continu netvermogen** | 17,25 kW | Totaal vermogen van de hoofdaansluiting |
| **Max. afgezekerd per fase (16A)** | 3,68 kW | Beveiliging conform selectiviteit (factor 1.6) |
| **Max. 3-fase vermogen (eindgroep)** | ~11 kW | Bijvoorbeeld voor een 3-fase laadpaal |

Wanneer een netverzwaring op zich laat wachten, kan een Home Energy Management System (EMS) uitkomst bieden. Een EMS regelt de belasting in huis dynamisch met behulp van load balancing. Hierdoor worden piekstromen opgevangen en wordt het afschakelen van de hoofdzekering voorkomen zolang de verzwaring nog niet is uitgevoerd.

## Tarieven en grootverbruikaansluitingen

De tarieven voor het wijzigen of vergroten van een kleinverbruikaansluiting (tot 3x80A) worden jaarlijks geregulateerd en vastgesteld door de Autoriteit Consument & Markt (ACM).

Voor grote aansluitingen gelden andere procedures. Bij het ontbreken van voldoende netcapaciteit voor grootverbruikaansluitingen (groter dan 3x80A) treedt een congestiebeheer-protocol in werking. Aanvragen worden in dat geval op een wachtlijst geplaatst op volgorde van binnenkomst.

## Praktisch advies voor installateurs in het offertetraject

Om vertraging in de uitvoering te voorkomen, helpt het om netverzwaringen direct op te nemen in de inventariserende fase van het project:

- Neem het schouwen van de meterkast en de controle van NEN 1010-voorwaarden op in de opnamefase.
- Informeer de klant over de aanvraagprocedure via MijnAansluiting.nl en neem de geadviseerde richtlijn van 6 tot 9 maanden op in de planning.
- Controleer bij omvormers boven 3,68 kW of een 3-fase aansluiting nodig is om te voldoen aan de Netcode Elektriciteit.
- Onderzoek of een tussenoplossing met load balancing of een EMS de gewenste apparatuur (zoals een laadpaal of warmtepomp) tijdelijk veilig kan aansturen binnen het huidige aansluitvermogen.

## Veelgestelde vragen over netverzwaring naar 3x25A

### Hoe lang duurt een netverzwaring van 1x35A naar 3x25A?
De wettelijke termijn is volgens de Elektriciteitswet 18 weken, maar door netcongestie adviseren netbeheerders zoals Liander rekening te houden met een doorlooptijd van 6 tot 9 maanden.

### Waar moet de meterkast aan voldoen volgens NEN 1010?
De binneninstallatie moet geschikt zijn en beschikken over een goedgekeurde hoofdschakelaar. Ook moet gecontroleerd worden op fase-verdeling bij omvormers boven 3,68 kW en beveiliging tegen overbelasting door somstromen op aardlekschakelaars.

### Hoeveel vermogen levert een 3x25A aansluiting?
Een 3x25A aansluiting biedt een continu netvermogen van 17,25 kW. Om selectiviteit te waarborgen mag een individuele eindgroep op maximaal 16A worden afgezekerd (3,68 kW per fase, circa 11 kW op 3-fase).

### Wat te doen als een netverzwaring lang op zich laat wachten?
Een Home Energy Management System (EMS) kan worden toegepast om de belasting via load balancing dynamisch te regelen. Dit opvangt piekstromen op en voorkomt het afschakelen van de hoofdzekering.
`;

export function Netverzwaring3x25aDoorlooptijdEisenArticle() {
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
