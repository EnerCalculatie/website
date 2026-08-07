import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'van-1-fase-naar-3-fase-verduurzaming-advies')!;

export function Van1FaseNaar3FaseVerduurzamingAdviesArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer een huiseigenaar de stap zet naar een verduurzamingspakket met een warmtepomp, een laadpaal en zonnepanelen, loopt hij al snel tegen de grenzen van zijn elektrische installatie aan. Een standaard 1-fase netaansluiting (zoals 1x35A) heeft onvoldoende vermogensruimte om meerdere zware apparaten gelijktijdig te voeden. Voor u als installateur ligt hier een belangrijke adviserende rol: een <strong>1 fase naar 3 fase verduurzaming advies</strong> voorkomt overbelasting van de hoofdzekering, voorkomt vertraging tijdens de oplevering en schept helderheid over de benodigde investering in de meterkast.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  In de praktijk zien installateurs vaak dat klanten de impact van een netverzwaring onderschatten. Ze zien een laadpaal of warmtepomp als een losse toevoeging, zonder te beseffen dat de totale gelijktijdige stroomvraag het beschikbare vermogen ruimschoots overschrijdt. In dit artikel leest u hoe u het vermogensprofiel van een woning analyseert, hoe u het advies over netverzwaring transparant onderbouwt en welke technische voorzieningen nodig zijn om de installatie toekomstbestendig op te leveren.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Waarom verduurzaming vraagt om een 3-fase netaansluiting
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een 1-fase netaansluiting met een hoofdzekering van 35A biedt een maximaal continu vermogen van circa 8,0 kW (230 volt vermenigvuldigd met 35 ampère). In een traditionele woning, waar de zwaarste verbruikers bestaan uit een wasmachine, een oven en mogelijk een inductiekookplaat, is dit ruimschoots voldoende. Zodra de woning echter stap voor stap wordt verduurzaamd, verandert het belastingsprofiel ingrijpend.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Neem een woonsituatie waarin de klant kiest voor een all-electric warmtepomp met een elektrisch bijverwarmingselement, een 11 kW laadpaal voor een elektrische auto, een zonnepaneelinstallatie en een inductiekookplaat. Wanneer de warmtepomp op een koude winterdag aanslaat en gelijktijdig de auto wordt opgeladen, vraagt dit gecombineerde systeem al snel meer stroom dan de 1-fase hoofdzekering kan leveren. Een laadpaal op 1-fase kan maximaal op 3,7 kW (16A) of 7,4 kW (32A) laden. Laden op 32A op een 1x35A aansluiting laat vrijwel geen enkele ruimte over voor het overige huishoudelijke verbruik.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een overstap naar een 3-fase netaansluiting van 3x25A vergroot het totale beschikbare vermogen naar ruim 17,2 kW (3 fasen x 230 volt x 25 ampère). Doordat het vermogen over drie afzonderlijke geleiders (L1, L2 en L3) wordt verdeeld, kan de elektrische belasting veel beter gebalanceerd worden. Dit biedt de noodzakelijke ruimte voor zware verduurzamingsmaatregelen, mits de fasen in de groepenkast correct worden verdeeld.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Technische vereisten bij de transitie in de groepenkast
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het verzwaren van een netaansluiting door de netbeheerder is slechts de halve oplossing. De interne elektrische installatie in de woning moet geschikt gemaakt worden voor de ontvangst van drie fasen. Als installateur bent u verantwoordelijk voor het ontwerpen en aanpassen van de groepenkast. NEN 1010 bevat de normen en installatievoorschriften voor laagspanningsinstallaties, en aanpassingen in de groepenkast dienen hieraan te voldoen.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij de ombouw van 1-fase naar 3-fase zijn de volgende technische stappen noodzakelijk:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Vervanging van de hoofdschakelaar:</strong> Een 1-fase installatie beschikt over een 2-polige hoofdschakelaar. Voor een 3-fase netaansluiting is een 4-polige hoofdschakelaar verplicht, die alle drie de fasen en de nulgeleider gelijktijdig uitschakelt.
  </li>
  <li className="mb-2">
    <strong>Symmetrische faseverdeling:</strong> Alle bestaande en nieuwe 1-fase eindgroepen in de woning moeten gelijkmatig worden verdeeld over de drie fasen (L1, L2 en L3). Als alle zware 1-fase apparaten (zoals de oven, de wasmachine en de inductiekookplaat) op één fase blijven zitten, kan die specifieke hoofdzekering van 25A alsnog doorslaan, hoewel de totale capaciteit van 17,2 kW niet wordt overschreden.
  </li>
  <li className="mb-2">
    <strong>Installatie van 4-polige krachtgroepen:</strong> Apparatuur die specifiek op 3-fase werkt — zoals een 11 kW laadpaal of een grote warmtepomp — vereist een eigen 4-polige krachtgroep, beveiligd met een passende 4-polige aardlekschakelaar of aardlekautomaat.
  </li>
  <li className="mb-2">
    <strong>Rekening houden met de doorlooptijd:</strong> De netbeheerder voert de fysieke netverzwaring uit in de aansluitkast of de straatkabel. Klanten moeten de verzwaring tijdig aanvragen via het landelijke portaal MijnAansluiting.nl. De doorlooptijd bij netbeheerders kan variëren van enkele weken tot maanden. Het is cruciaal om dit direct in het adviesgesprek te benoemen, zodat de klant de aanvraag op tijd opstart.
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Gelijktijdigheid en dynamic load balancing in de praktijk
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een veelvoorkomende misvatting bij woningeigenaren is dat een 3x25A aansluiting onbeperkte capaciteit biedt. In de praktijk heeft elke afzonderlijke fase een maximale belasting van 25 ampère (circa 5,7 kW per fase). Wanneer een 3-fase laadpaal op maximaal vermogen laadt (11 kW), trekt deze 16 ampère van elke fase. Er blijft per fase dan nog slechts 9 ampère (circa 2,0 kW) over voor overige apparaten.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Als de inductiekookplaat op dat moment ingeschakeld wordt of de warmtepomp vraagt extra vermogen op L1 en L2, wordt de grens van 25A per fase snel overschreden. Dit is waar dynamic load balancing onmisbaar wordt in uw installatieontwerp.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Met dynamic load balancing wordt het actuele stroomverbruik van de woning continu gemeten via de P1-poort van de slimme meter. Zodra de totale stroom op een van de fasen de ingestelde grens (bijvoorbeeld 23A) nadert, knijpt de laadpaal direct zijn laadvermogen af. Zodra de huishoudelijke belasting daalt, schaalt het laadvermogen automatisch weer op. Op deze manier levert u een veilige installatie op zonder dat de hoofdzekering van de netbeheerder in gevaar komt. Lees voor specifieke richtlijnen over afzekering ons artikel over{' '}
  <a href="/blog/laadpaal-netaansluiting-capaciteit-3x25a" className="text-brand-primary-text font-semibold hover:underline">
    laadpaal netaansluiting capaciteit op 3x25A
  </a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Vergelijkingstabel: 1-fase versus 3-fase bij verduurzaming
</h2>
<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 text-left text-slate-800">
        <th className="border border-slate-300 p-3 font-semibold">Eigenschap</th>
        <th className="border border-slate-300 p-3 font-semibold">1-fase (1x35A)</th>
        <th className="border border-slate-300 p-3 font-semibold">3-fase (3x25A)</th>
      </tr>
    </thead>
    <tbody className="text-slate-700">
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Max. totaal vermogen</td>
        <td className="border border-slate-300 p-3">Ca. 8,0 kW</td>
        <td className="border border-slate-300 p-3">Ca. 17,2 kW</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Max. laadvermogen EV</td>
        <td className="border border-slate-300 p-3">3,7 kW tot 7,4 kW (1-fase)</td>
        <td className="border border-slate-300 p-3">11 kW (3-fase, 16A per fase)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Geschiktheid warmtepomp</td>
        <td className="border border-slate-300 p-3">Alleen hybride of kleine all-electric</td>
        <td className="border border-slate-300 p-3">Geschikt voor alle type warmtepompen</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Benodigde hoofdschakelaar</td>
        <td className="border border-slate-300 p-3">2-polig</td>
        <td className="border border-slate-300 p-3">4-polig (3P+N)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Noodzaak Load Balancing</td>
        <td className="border border-slate-300 p-3">Zeer hoog (beperkte ruimte)</td>
        <td className="border border-slate-300 p-3">Aanbevolen bij laadpaal + warmtepomp</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe adviseert u uw klant stapsgewijs over netverzwaring?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om het adviesgesprek gestructureerd te laten verlopen en verrassingen achteraf te voorkomen, is het aan te raden een vast stappenplan te hanteren:
</p>
<ol className="list-decimal pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Analyseer de bestaande meterkast en aansluiting:</strong> Controleer ter plaatse of via het klantendossier de huidige hoofdzekering (1x25A, 1x35A of reeds 3x25A) en bekijk de beschikbare fysieke ruimte in de groepenkast voor een 4-polige hoofdschakelaar en krachtgroepen.
  </li>
  <li className="mb-2">
    <strong>Breng het toekomstige energieprofiel in kaart:</strong> Tel het piekvermogen op van alle geplande maatregelen. Houd rekening met de zonnepaneelomvormer, de warmtepomp, het laadpunt en eventueel een thuisbatterij. Voor meer inzicht in de combinatie met opslag leest u ons artikel over{' '}
    <a href="/blog/thuisbatterij-netaansluiting-capaciteit" className="text-brand-primary-text font-semibold hover:underline">
      thuisbatterij netaansluiting capaciteit
    </a>.
  </li>
  <li className="mb-2">
    <strong>Motiveer de noodzaak van netverzwaring:</strong> Leg aan uw klant uit dat netverzwaring niet enkel een verplichting is, maar juist de basis vormt om alle apparaten veilig en zonder storingen te laten functioneren. Verwijs voor de tarieven van periodiek vastrecht en eenmalige aansluitkosten naar de website van de regionale netbeheerder.
  </li>
  <li className="mb-2">
    <strong>Adviser over slim energiemanagement:</strong> Leg uit hoe een energiemanagementsysteem gekoppeld aan de P1-poort helpt bij het verdelen van de vermogensvraag. Lees hier aanvullend over in het artikel over het{' '}
    <a href="/blog/energiemanagementsysteem-p1-poort" className="text-brand-primary-text font-semibold hover:underline">
      energiemanagementsysteem en de P1-poort
    </a>.
  </li>
  <li className="mb-2">
    <strong>Neem de netverzwaring op in het tijdsplan:</strong> Herinner de klant eraan om de aanvraag op MijnAansluiting.nl direct na tekenen van de offerte in te dienen, zodat de fysieke verzwaring gereed is voordat u de installatie oplevert.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  EnerCalculatie berekent de gecombineerde elektrische stroomvraag van alle verduurzamingsmaatregelen in één integraal rekenmodel. In plaats van een losse berekening voor zonnepanelen, de warmtepomp en het laadpunt, analyseert de software het totale gelijktijdige vermogensprofiel. Hierdoor ziet u direct of de huidige netaansluiting volstaat of dat een overstap van 1-fase naar 3-fase noodzakelijk is.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  In het gegenereerde adviesrapport krijgt uw klant een helder overzicht van de totale energiebalans en de onderbouwing voor de benodigde aanpassingen in de meterkast. Met de{' '}
  <a href="/rekentool-laadpaal" className="text-brand-primary-text font-semibold hover:underline">
    rekentool laadpaal
  </a>{' '}en de{' '}
  <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">
    rekentool warmtepomp
  </a>{' '}stelt u binnen enkele minuten een kloppend advies op dat rekening houdt met faseverdeling en netcapaciteit.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u ervaren hoe u netverzwaarde verduurzamingsplannen snel en onderbouwd presenteert in uw offertes? Test de gecombineerde rekenmodules van EnerCalculatie in uw volgende klantadvies.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2">
    <a href="https://www.nen.nl/elektrotechniek/installatievoorschriften/nen-1010-laagspanningsinstallaties" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">
      NEN 1010 — Dé norm voor laagspanningsinstallaties
    </a>{' '}— NEN
  </li>
  <li className="mb-2">
    <a href="https://www.netbeheernederland.nl/netcapaciteit-en-flexibiliteit/capaciteitskaart" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">
      Capaciteitskaart — Netbeheer Nederland
    </a>{' '}— Netbeheer Nederland
  </li>
</ol>

    </BlogPostLayout>
  );
}
