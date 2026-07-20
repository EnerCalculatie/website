import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'laadpaal-netaansluiting-capaciteit-3x25a')!;

export function LaadpaalNetaansluitingCapaciteit3x25aArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  De transitie naar elektrisch rijden stelt de Nederlandse installatiepraktijk voor een grote uitdaging. Waar voorheen een standaard driefasige aansluiting van 3x25A ruim voldoende was voor een gemiddeld huishouden, is de resterende capaciteit van deze aansluiting vandaag de dag een kritieke factor geworden. De introductie van een laadpaal — vaak in combinatie met een warmtepomp, inductiekookplaat of airconditioningsysteem — dwingt installateurs om grondig na te denken over het risico op overbelasting.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Als installateur bent u niet langer alleen de monteur die de fysieke laadpaal aan de muur monteert; u bent de energieadviseur die de veiligheid en betrouwbaarheid van de gehele elektrische installatie moet garanderen. Een gedegen advies over de laadpaal netaansluiting capaciteit, gelijktijdigheid en beveiligingstechnieken is cruciaal om te voorkomen dat de hoofdbeveiliging van de netbeheerder aanspreekt.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De rekensom achter een 3x25A netaansluiting
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om een klant goed te kunnen adviseren, is het belangrijk om de harde technische grenzen van de netaansluiting helder voor de geest te hebben. Een standaard residentiële driefasige aansluiting van 3x25A levert een theoretisch maximaal vermogen van 17,25 kW. Dit wordt als volgt berekend:
</p>
<p className="text-slate-700 leading-relaxed mb-4 font-mono bg-slate-50 p-3 rounded-md border border-slate-200">
  P = 3 x (230 V x 25 A) = 17.250 W = 17,25 kW
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Dit maximale vermogen is echter verdeeld over drie afzonderlijke fasen van elk 5,75 kW (230 V x 25 A). Dit betekent dat de belasting op geen enkele individuele fase de grens van 25 Ampère mag overschrijden. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer we hier een standaard driefasige laadpaal van 11 kW naast leggen, zien we direct waar de schoen wringt. Een laadpaal van 11 kW trekt 16 Ampère per fase (3 x 16 A x 230 V = 11,04 kW). Dit betekent dat er per fase nog slechts 9 Ampère aan resterende capaciteit overblijft voor de rest van de woning:
</p>
<p className="text-slate-700 leading-relaxed mb-4 font-mono bg-slate-50 p-3 rounded-md border border-slate-200">
  25 A (hoofdbeveiliging) - 16 A (laadpaal) = 9 A resterend per fase
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een stroomsterkte van 9 Ampère komt overeen met een maximaal beschikbaar vermogen van slechts 2,07 kW per fase. Schakelt de bewoner de oven in (vaak circa 2,5 kW tot 3 kW) of start de warmtepomp op een koude winterdag op, dan wordt de grens van 25 Ampère op die specifieke fase direct overschreden. Zonder ingrijpen resulteert dit onherroepelijk in een overbelaste hoofdbeveiliging.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Gelijktijdigheid en de NEN 1010
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In de installatietechniek werken we traditioneel met een gelijktijdigheidsfactor (diversiteitsfactor). Omdat huishoudelijke apparaten zoals wasmachines, vaatwassers en ovens zelden allemaal tegelijkertijd en op vol vermogen aanstaan, hoeft de totale som van alle aangesloten vermogens niet volledig te passen binnen de capaciteit van de netaansluiting.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor laadpalen gelden echter andere regels. De NEN 1010 schrijft voor dat voor laadinrichtingen voor elektrische voertuigen een gelijktijdigheidsfactor van 1 (ofwel 100%) moet worden gehanteerd. Een elektrische auto die begint te laden, vraagt immers urenlang onafgebroken het maximaal ingestelde vermogen. Dit is een wezenlijk verschil met bijvoorbeeld een inductiekookplaat, die weliswaar een hoge piekbelasting heeft, maar door thermostaten en kookcycli slechts pulserend vermogen vraagt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Als installateur moet u de laadpaal in uw vermogensbalans dus altijd voor de volle 100% meerekenen. Dit maakt het ontwerpen van een veilige installatie op een 3x25A aansluiting complex, zeker wanneer de klant ook plannen heeft voor een warmtepomp of een inductiekookplaat.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Selectiviteit en de hoofdzekering: waarom herstel kostbaar is
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een belangrijk principe in de groepenkast is selectiviteit. Dit houdt in dat bij een overbelasting of kortsluiting alleen de direct voorgeschakelde beveiliging (de eindgroep in de groepenkast) mag aanspreken, en niet de achterliggende hoofdbeveiliging. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij een overbelasting veroorzaakt door gelijktijdig gebruik van een laadpaal en huishoudelijke apparaten, is er echter geen sprake van een foutstroom in een specifieke eindgroep, maar van een cumulatieve overbelasting op de hoofdzekering zelf. Omdat de hoofdbeveiliging (smeltpatroon of installatieautomaat) eigendom is van de netbeheerder, mag u deze als installateur niet zelf resetten of vervangen als deze verzegeld is. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het laten herstellen of inschakelen van een aangesproken hoofdbeveiliging door de netbeheerder brengt niet alleen ongemak met zich mee voor uw klant, maar kan ook leiden tot aanzienlijke voorrijkosten en herstelkosten. Dit onderstreept het belang van een preventieve, technisch onderbouwde engineering in uw offertefase.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De oplossing: Statische versus Dynamische Load Balancing
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om overbelasting te voorkomen zonder direct over te gaan tot een kostbare netverzwaring, zijn er twee primaire technieken beschikbaar:
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">
  1. Statische Load Balancing (of handmatige begrenzing)
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij statische begrenzing stelt u de laadpaal softwarematig of hardwarematig in op een lager maximaal vermogen, bijvoorbeeld 3x10A (ca. 7 kW) in plaats van 3x16A. Hoewel dit het risico op overbelasting verkleint, beperkt het ook permanent de laadsnelheid van het voertuig, zelfs wanneer er in de rest van de woning nauwelijks stroom wordt verbruikt (bijvoorbeeld 's nachts). Dit is vaak een suboptimale oplossing voor de klant.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">
  2. Dynamische Load Balancing (DLB)
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Dynamische load balancing maakt gebruik van een actieve energiemeter (meestal gekoppeld via de P1-poort van de slimme meter of via externe stroomspoelen/CT-klemmen). De laadpaal meet continu de totale stroomsterkte per fase aan de oorsprong van de installatie. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Zodra het verbruik in de woning stijgt en de grens van 25 Ampère nadert, stuurt de laadpaal een commando naar de auto om de laadstroom realtime te verlagen (bijvoorbeeld naar 10A of zelfs tijdelijk naar 0A). Zodra de overige apparaten uitschakelen, schroeft de laadpaal het laadvermogen automatisch weer op naar de maximale 16 Ampère. Meer informatie over de aansturing via deze interfaces vindt u in ons artikel over het{' '}
  <a href="/blog/energiemanagementsysteem-p1-poort" className="text-brand-primary-text font-semibold hover:underline">
    energiemanagementsysteem en de P1-poort
  </a>.
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100">
        <th className="border border-slate-300 p-2 text-left">Scenario op 3x25A</th>
        <th className="border border-slate-300 p-2 text-left">Zonder Load Balancing</th>
        <th className="border border-slate-300 p-2 text-left">Met Dynamische Load Balancing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-slate-300 p-2 font-semibold">Alleen de laadpaal is actief</td>
        <td className="border border-slate-300 p-2">Laden op vol vermogen (3x16A / 11 kW). Geen probleem.</td>
        <td className="border border-slate-300 p-2">Laden op vol vermogen (3x16A / 11 kW). Geen probleem.</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-2 font-semibold">Laadpaal + Warmtepomp start op</td>
        <td className="border border-slate-300 p-2 text-red-600 font-semibold">Direct risico op uitschakeling van de hoofdzekering door overschrijding van de 25A grens.</td>
        <td className="border border-slate-300 p-2 text-green-600 font-semibold">Laadpaal schakelt direct terug (bijv. naar 3x10A). Installatie blijft veilig binnen de 25A.</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-2 font-semibold">Koken op inductie + Laadpaal</td>
        <td className="border border-slate-300 p-2 text-red-600 font-semibold">Groot risico op asymmetrische overbelasting op de gekoppelde kookfase.</td>
        <td className="border border-slate-300 p-2 text-green-600 font-semibold">Laadstroom wordt per fase asymmetrisch of symmetrisch teruggeregeld om overbelasting te voorkomen.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe adviseert u de klant commercieel en technisch?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In het adviestraject is het belangrijk om de klant mee te nemen in de werking van de installatie zonder te verzanden in te complexe vaktermen. Klanten willen primair weten of hun auto 's ochtends vol is en of ze veilig kunnen koken terwijl de auto oplaadt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer u een offerte uitbrengt, kunt u de volgende opbouw gebruiken om uw advies te onderbouwen:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li>
    <strong>Maak de vermogensbalans inzichtelijk:</strong> Leg uit dat de woning een maximale capaciteit heeft en dat de laadpaal daar een aanzienlijk deel van claimt. Dit verklaart direct waarom een standaard installatie zonder beveiliging risico's met zich meebrengt.
  </li>
  <li>
    <strong>Positioneer load balancing als actieve beveiliging:</strong> Presenteer dynamische load balancing niet als een 'optionele extra', maar als een integraal veiligheidscomponent van de installatie. Het voorkomt kostbare storingen en zorgt ervoor dat de auto altijd met de maximaal beschikbare snelheid laadt.
  </li>
  <li>
    <strong>Bespreek de optie van netverzwaring transparant:</strong> Mocht de basislast van de woning (door bijvoorbeeld een all-electric warmtepomp en een zwembadpomp) structureel te hoog zijn, adviseer dan tijdig over een netverzwaring naar 3x35A. Wijs de klant er hierbij op dat de tarieven voor de eenmalige aansluiting en het jaarlijkse vastrecht te raadplegen zijn op de website van hun netbeheerder of de ACM.
  </li>
  <li>
    <strong>Koppel laadpaal-advies aan overige verduurzaming:</strong> Als de klant in de toekomst ook zonnepanelen of een warmtepomp overweegt, neem dit dan nu al mee in het advies. Voor een bredere context over het thuislaad-concept verwijzen we u graag naar ons{' '}
    <a href="/blog/laadpaal-advies-thuis" className="text-brand-primary-text font-semibold hover:underline">
      laadpaal-advies thuis
    </a>.
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het handmatig doorrekenen van de totale vermogensbalans van een woning bij verschillende verduurzamingsmaatregelen is tijdrovend en foutgevoelig. EnerCalculatie lost dit op door alle energiestromen — opwek van zonnepanelen, verbruik van de warmtepomp en de laadcyclus van de laadpaal — samen te brengen in één geïntegreerd rekenmodel.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Onze rekentool controleert direct de impact van het laadprofiel op de maximale capaciteit van de netaansluiting van uw klant. Zo ziet u in één oogopslag of een 3x25A aansluiting volstaat in combinatie met dynamische load balancing, of dat een netverzwaring technisch noodzakelijk is om aan de laadbehoefte te voldoen. Het resultaat is een deterministisch berekend en visueel aantrekkelijk adviesrapport waarmee u uw klant direct overtuigt van de juiste configuratie.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u zelf ervaren hoe u sneller en nauwkeuriger laadpaalberekeningen opstelt die naadloos aansluiten op het totale energieprofiel van de woning? Ontdek de mogelijkheden op onze{' '}
  <a href="/rekentool-laadpaal" className="text-brand-primary-text font-semibold hover:underline">
    rekentool laadpaal
  </a>.
</p>
    </BlogPostLayout>
  );
}
