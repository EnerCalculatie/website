import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'klantreis-installateur-van-schouw-tot-offerte')!;

const markdown = `
Bij het traject van de eerste opname tot een getekende offerte en oplevering komen voor installateurs diverse technische en administratieve stappen kijken. Een zorgvuldige aanpak van de schouw, het ontwerp en de offerteopbouw helpt om technische risico's te vermijden en te voldoen aan de geldende richtlijnen.

## 1. Eerste opname en schouw: NEN 1010 en netcapaciteit

Bij de schouw en het ontwerp van een elektrische installatie dient te worden voldaan aan de veiligheidsbepalingen van NEN 1010 voor laagspanningsinstallaties. Tijdens deze opname is het vaststellen van de technische randvoorwaarden een belangrijke stap.

Fabrikanten van laadpalen, zoals Alfen en Zaptec, schrijven in hun installatiehandleidingen voor dat tijdens de schouw de aanwezige netcapaciteit en de geschiktheid voor Dynamic Load Balancing vastgesteld moeten worden. Dit kan worden ondersteund door een Home Energy Management System (EMS). Een EMS regelt de belasting in huis dynamisch (load balancing) om piekstromen en afschakeling van de hoofdzekering te voorkomen.

## 2. Technische berekeningen: vermogen, fasering en somstromen

NEN 1010 eist dat elektrische installaties adequaat beveiligd zijn tegen overstroom. Gelijktijdigheid moet hierin worden berekend, waarbij selectiviteit een belangrijke vuistregel voor installateurs is.

### Fasering en maximaal vermogen berekenen
Om selectiviteit te waarborgen ten opzichte van de hoofdzekering geldt in de praktijk (met de veiligheidsmarge/factor 1,6) het volgende:
- Bij een hoofdaansluiting van **1x35A** of **3x25A** kan een omvormer of laadpaal op maximaal **16A** worden afgezekerd.
- Het maximale vermogen per fase komt daarmee op 16A × 230V = **3.680 Watt (3,68 kW / kVA)**.
- Het maximale 3-fase vermogen op 3x25A bedraagt 3 × 16A = 48A totaal = **~11 kW**.
- Hoewel het continu vermogen van een 3x25A aansluiting volgens Netbeheer Nederland **17,25 kW** is, is het onjuist om te claimen dat er zomaar 17,25 kW op een standaard 3x25A huisaansluiting kan worden aangesloten. Dit vereist een verzwaring van de aansluiting (bijvoorbeeld naar 3x35A of hoger).

Aanpassingen en verzwaringen aan de netvoeding (bijvoorbeeld de overstap van 1-fase naar 3-fase) dienen digitaal te worden ingediend via de centrale portal **MijnAansluiting.nl**.

### Apparaateisen volgens NEN 1010 en Netcode
- **Zonnepanelen en omvormers:** Vanwege de Netcode Elektriciteit (het voorkomen van fase-onbalans) dient invoeding boven **16A (3,68 kVA)** over meerdere fases te worden verdeeld. Vanaf omvormers groter dan ~3,68 kW (of 4 kW in de praktijk) wordt daarom overgestapt op een **3-fase omvormer**. Boven de 5 kW aan omvormervermogen is een 3-fase aansluiting veelal noodzakelijk.
- **Laadpalen:** Het maximale vermogen op 3x25A is doorgaans 11 kW per lader zonder slimme sturing, tenzij load balancing actief is.
- **Thuisbatterijen:** 1-fase thuisbatterijen kunnen over het algemeen met maximaal 3,68 kW tot 5 kW laden of ontladen, afhankelijk van de netbeheerder.
- **Warmtepompen:** Een warmtepomp boven 5 kW thermisch vraagt in veel gevallen om een 3-fase aansluiting voor een optimale verdeling van de belasting.

### Somstromen en beveiliging van de groepenkast
Bij een systeem waar het net én een omvormer (PV of batterij) op dezelfde groep of dezelfde aardlekschakelaar kunnen invoeden, telt de stroom van beide bronnen bij elkaar op.

- **Rekenvoorbeeld:** 25A vanaf het net + 16A vanaf de omvormer = **41A**. Een standaard 40A-aardlekschakelaar is daar niet op berekend, wat kan leiden tot overbelasting en brandgevaar.
- Bij gelijktijdige invoeding dient de optelsom van gelijktijdig actieve stromen getoetst te worden aan de nominale stroom van elke gedeelde beveiliging (aardlekschakelaar, groep, hoofdzekering).

## 3. Offerte-eisen en administratieve afhandeling (ACM & ISDE)

Wanneer het technische ontwerp gereed is, volgt de administratieve en contractuele uitwerking van de klantreis:

- **ACM-richtlijnen:** Volgens de regels van de ACM dienen zakelijke aanbiedingen aan consumenten vóór ondertekening een helder overzicht te bevatten van de totale prijs, inclusief bijkomende kosten en levervoorwaarden.
- **ISDE-subsidie:** Subsidieaanvragen door eindgebruikers vereisen dat de offerte en installatiedocumenten voorzien zijn van de specifieke RVO-meldcode van de apparatuur en het bewijs van professionele installatie.
- **Aanmelding opwekinstallaties:** De inbedrijfstelling van opwekinstallaties zoals zonnepanelen vereist een aanmelding via de landelijke registratiesite **Energieleveren.nl** ten behoeve van de netbeheerder.

## Conclusie

Het hanteren van de geldende veiligheidsnormen, capaciteitsberekeningen en administratieve verplichtingen zorgt voor een technisch onderbouwd proces van de eerste schouw tot de uiteindelijke offerte.

## Veelgestelde vragen (FAQ)

### Waar moet een schouw volgens NEN 1010 aan voldoen?
Tijdens de schouw moet de netcapaciteit en de geschiktheid voor Dynamic Load Balancing vastgesteld worden volgens NEN 1010 om overbelasting en veiligheidsrisico's te vermijden.

### Hoe bereken je het maximale vermogen bij een 3x25A aansluiting?
Bij een 3x25A aansluiting mag met een veiligheidsmarge van factor 1,6 op maximaal 16A per fase worden afgezekerd. Dit resulteert in 3.680 Watt per fase en circa 11 kW totaal voor 3-fase apparatuur.

### Waar dien je een netverzwaring of opwekinstallatie aan te melden?
Netverzwaringen dien je in via MijnAansluiting.nl. Nieuwe opwekinstallaties (zoals zonnepanelen) meld je aan via Energieleveren.nl.
`;

export function KlantreisInstallateurVanSchouwTotOfferteArticle() {
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
