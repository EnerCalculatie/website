import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'radiatoren-geschikt-warmtepomp-lage-temperatuur')!;

export function RadiatorenGeschiktWarmtepompLageTemperatuurArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij de overstap van een traditionele aardgasketel naar een hybride of all-electric warmtepomp richt het eerste adviesgesprek zich vaak op het apparaat zelf. In de praktijk bepaalt echter het bestaande afgiftesysteem of de installatie het beoogde comfort en rendement daadwerkelijk behaalt. Warmtepompen presteren optimaal bij een lage aanvoertemperatuur, terwijl de meeste radiatoren in bestaande woningen zijn gedimensioneerd op een hoogtemperatuurregime.
</p>

<p className="text-slate-700 leading-relaxed mb-4">
  Als installateur staat u voor de taak om vóór het uitbrengen van een offerte te beoordelen of het huidige afgiftesysteem geschikt is voor lagetemperatuurverwarming (LTV). In dit artikel leest u hoe u het afgiftevermogen bij lage temperaturen herberekent, welke fysieke controles noodzakelijk zijn op locatie, en hoe u uw advies opbouwt wanneer de capaciteit ontoereikend blijkt.
</p>

<div className="bg-slate-50 border-l-4 border-brand-primary p-4 my-6 rounded-r">
  <p className="text-slate-800 font-semibold mb-1">Kernantwoord: Radiatorgeschiktheid voor LTV testen</p>
  <p className="text-slate-700 text-sm leading-relaxed">
    Om te controleren of radiatoren geschikt zijn voor een warmtepomp, vergelijkt u de warmtebehoefte per ruimte (warmteverlies) met het gecorrigeerde radiatorvermogen bij een lage aanvoertemperatuur (bijvoorbeeld 45 °C of 35 °C). Omdat de warmteafgifte van een paneelradiator niet-lineair daalt, verliest een standaard radiator bij LTV circa 60 tot 70 procent van zijn nominale vermogen. Blijkt het gecorrigeerde vermogen lager dan het berekende warmteverlies, dan zijn maatregelen nodig zoals grotere paneelradiatoren (type 22/33), radiatorventilatoren of lagetemperatuurconvectoren.
  </p>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Het fysieke mechanisme: waarom afgiftevermogen niet-lineair daalt
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Traditionele cv-installaties zijn ontworpen voor een ontwerp-temperatuurregime van 75 °C aanvoer, 65 °C retour en 20 °C ruimtetemperatuur (75/65/20 °C). De gemiddelde overtemperatuur (ΔT) ten opzichte van de kamer bedraagt in dat scenario 50 K. Een hybride warmtepomp levert bij voorkeur een aanvoertemperatuur van maximaal 45 °C tot 55 °C, terwijl een all-electric systeem het liefst werkt met een regime van 35 °C tot 45 °C.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het vermogen van een radiator daalt bij een lagere overtemperatuur niet evenredig, maar exponentieel. De formule voor de vermogenscorrectie van een radiator luidt:
</p>
<div className="bg-slate-100 p-4 rounded-lg my-4 text-center font-mono text-sm text-slate-800">
  Q_actueel = Q_nominaal * ( &Delta;T_actueel / &Delta;T_nominaal )^n
</div>
<p className="text-slate-700 leading-relaxed mb-4">
  Hierin is <em>n</em> de radiatorexponent (gemiddeld 1,3 voor standaard paneelradiatoren). Wanneer u de gemiddelde watertemperatuur verlaagt van 70 °C naar 40 °C bij een ruimtetemperatuur van 20 °C, daalt de overtemperatuur ΔT van 50 K naar 20 K. Vul we dit in de formule in, dan blijkt dat er van het nominale fabrieksvermogen nog slechts circa 30 tot 35 procent overblijft.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stappenplan: geschiktheid van het afgiftesysteem controleren
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een doordacht lagetemperatuur-radiatoradvies vereist een gestructureerde aanpak op locatie. Door onderstaand stappenplan te volgen, onderbouwt u uw advies met harde meet- en rekengegevens.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Stap 1: Voer een warmteverliesberekening uit per ruimte</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Een controle begint niet bij de radiator, maar bij de schil van de woning. Bepaal per verblijfsruimte het benodigde verwarmingsvermogen bij de ontwerpbuitentemperatuur. Houd hierbij rekening met het isolatieniveau (dak, gevel, vloer, glas), de infiltratie en de gewenste ruimtetemperatuur. Een globale vuistregel op basis van kubieke meters volstaat hooguit voor een eerste inschatting, maar voor een definitief warmtepompadvies is een vertrekstatenberekening de norm.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Stap 2: Inventariseer het aanwezige afgiftesysteem</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Neem tijdens de opname ter plaatse alle radiatoren op. Noteer per ruimte de volgende kenmerken:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li><strong>Type radiator:</strong> Type 10, 11 (enkelplaats), type 21, 22 (dubbelplaats) of type 33 (drievoudig met convectorlamellen).</li>
  <li><strong>Afmetingen:</strong> Hoogte, lengte en diepte van het paneel.</li>
  <li><strong>Aansluitwijze en leidingdiameter:</strong> Controleer of de toevoer- en retourleidingen voldoende diameter hebben voor het grotere debiet dat bij LTV hoort.</li>
  <li><strong>Aanwezigheid van voetschakel/thermostaatkranen:</strong> Zijn de kranen instelbaar ten behoeve van waterzijdig inregelen?</li>
</ul>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Stap 3: Reken het radiatorvermogen om naar het LTV-regime</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Herbereken het fabriek vermogen van de geïnventariseerde radiatoren naar het beoogde warmtepompregime (bijvoorbeeld 45/35/20 °C). Onderstaande tabel geeft een indicatieve weergave van de vermogensterugval per type radiator bij de overgang van hoog naar laag temperatuur.
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm text-left">
    <thead className="bg-slate-100 font-semibold text-slate-800">
      <tr>
        <th className="border border-slate-300 p-3">Radiatortype</th>
        <th className="border border-slate-300 p-3">Nominaal (75/65/20 °C)</th>
        <th className="border border-slate-300 p-3">LTV-regime (55/45/20 °C)</th>
        <th className="border border-slate-300 p-3">LTV-regime (45/35/20 °C)</th>
        <th className="border border-slate-300 p-3">Restcapaciteit (%)</th>
      </tr>
    </thead>
    <tbody className="text-slate-700">
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Type 11 (800x600 mm)</td>
        <td className="border border-slate-300 p-3">ca. 750 W</td>
        <td className="border border-slate-300 p-3">ca. 420 W</td>
        <td className="border border-slate-300 p-3">ca. 240 W</td>
        <td className="border border-slate-300 p-3">32%</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Type 22 (800x600 mm)</td>
        <td className="border border-slate-300 p-3">ca. 1.350 W</td>
        <td className="border border-slate-300 p-3">ca. 750 W</td>
        <td className="border border-slate-300 p-3">ca. 430 W</td>
        <td className="border border-slate-300 p-3">32%</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Type 33 (800x600 mm)</td>
        <td className="border border-slate-300 p-3">ca. 1.900 W</td>
        <td className="border border-slate-300 p-3">ca. 1.050 W</td>
        <td className="border border-slate-300 p-3">ca. 600 W</td>
        <td className="border border-slate-300 p-3">31%</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Stap 4: Vergelijk warmteverlies met berekende afgifte</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Vergelijk per vertrek de uitkomst van Stap 1 met Stap 3. Indien de berekende LTV-afgifte groter is dan of gelijk is aan het warmteverlies, is het afgiftesysteem in die ruimte geschikt. Is de afgifte lager, dan ontstaat een capaciteitstekort dat leidt tot een trage opwarming of het niet behalen van de gewenste ruimtetemperatuur op koude dagen.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Praktische oplossingen bij een capaciteitstekort
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer blijkt dat een of meerdere radiatoren bij lage temperaturen onvoldoende vermogen leveren, hoeft niet het gehele afgiftesysteem te worden vervangen. U kunt uw klant diverse stapsgewijze oplossingen adviseren:
</p>

<ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-3">
  <li>
    <strong>Plaatsing van radiatorventilatoren (geforceerde convectie):</strong> Door kleine ventilatoren onder de bestaande paneelradiator te monteren, verhoogt u de luchtstroom langs de convectorlamellen. Dit kan de afgifte bij lage watertemperaturen verhogen met circa 30 tot 50 procent, zonder dat de fysieke radiator vervangen hoeft te worden.
  </li>
  <li>
    <strong>Vervanging door dikkere paneelradiatoren:</strong> Een enkelplaats radiator (type 11) kan vaak op exact dezelfde plek worden vervangen door een dubbel- of drievoudige radiator (type 22 of 33). De lengte en hoogte blijven gelijk, maar het afgifteoppervlak neemt drastisch toe.
  </li>
  <li>
    <strong>Toepassen van specifieke LTV-convectoren:</strong> LTV-radiatoren zijn specifiek ontworpen voor lage watertemperaturen. Ze bevatten minder waterinhoud, reageren sneller en combineren een compacte afmeting met een hoog warmteafgiftevermogen.
  </li>
  <li>
    <strong>Bijverwarmen via een split-airco:</strong> In ruimtes die incidenteel worden gebruikt of waar fysieke radiatoruitbreiding lastig is, biedt een lucht-lucht warmtepomp (airconditioning) een efficiënte aanvulling. Lees hier meer over in ons artikel over{' '}
    <a href="/blog/airco-als-verwarming-berekenen" className="text-brand-primary-text font-semibold hover:underline">
      airco als verwarming en het effect op het stroomverbruik
    </a>.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Waterzijdig inregelen: de sleutel tot een hoog warmtepomprendement
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het fysiek geschikt maken van de radiatoren is stap één; het hydraulisch in balans brengen van het systeem is stap twee. Een warmtepomp werkt met een aanmerkelijk kleiner temperatuurverschil over de wisselaar (ΔT van 5 tot 8 K) dan een traditionele cv-ketel (ΔT van 15 tot 20 K). Dit betekent dat er bij lagetemperatuurverwarming tot wel twee tot drie maal meer water per uur door de leidingen gepompt moet worden.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Zonder waterzijdig inregelen zal het warme water de weg van de minste weerstand kiezen. Dichtbij gelegen radiatoren krijgen te veel debiet, terwijl verafgelegen radiatoren koud blijven. Bovendien stijgt de retourtemperatuur naar de warmtepomp onnodig snel. Elke graad dat de retourtemperatuur hoger is dan noodzakelijk, verslechtert de Seizoensgebonden Prestatiecoëfficiënt (SCOP) van de warmtepomp met circa 2 tot 3 procent. Meer achtergronden over efficiëntieberekeningen leest u in ons artikel over de{' '}
  <a href="/blog/scop-warmtepomp-berekenen-stroomverbruik" className="text-brand-primary-text font-semibold hover:underline">
    SCOP-waarde van een warmtepomp vertalen naar een realistisch stroomverbruik
  </a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Communicatie naar de klant: verwachtingen over comfort
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Lagetemperatuurverwarming vraagt om een andere manier van woningen verwarmen. Een radiator die op 45 °C voedt, voelt handwarm aan en straalt geen intense hitte uit zoals een radiator van 75 °C. Leg dit duidelijk uit in uw adviesgesprek. Klanten associëren een lauwe radiator soms onterecht met een niet-functionerend systeem.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Benadruk dat LTV vertrouwt op een continue, gelijkmatige warmteafgifte over langere tijd (continu verwarmen) in plaats van snel 'aan- en uitstoken'. Het advies over het afgiftesysteem is daarmee onlosmakelijk verbonden met de totale dimensionering van de warmtepomp. Twijfelt u tussen het behouden van de gasketel of een all-electric opstelling? Bekijk dan ons verdiepende artikel over{' '}
  <a href="/blog/hybride-warmtepomp-dimensionering-gasketel" className="text-brand-primary-text font-semibold hover:underline">
    hybride warmtepomp dimensionering en de afweging rond de gasketel
  </a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het handmatig berekenen van warmteverlies en het herberekenen van radiatorvermogens per ruimte kost kostbare tijd. De software van EnerCalculatie ondersteunt installateurs door het combineren van gebouwkenmerken en afgiftesystemen in één geautomatiseerd rekenmodel. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het systeem rekent deterministisch de benodigde vermogens door op basis van de ingevoerde ruimtedata en het beoogde temperatuurregime. Eventuele knelpunten in het afgiftesysteem worden direct inzichtelijk gemaakt, waarna de software de impact van aanvullende maatregelen — zoals radiatorvervanging of bijverwarmen — meeneemt in de totale besparings- en rendementsanalyse. Op de pagina van onze{' '}
  <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">
    warmtepomp rekentool
  </a>{' '}ontdekt u hoe u binnen enkele minuten een volledig onderbouwd warmtepomp- en afgifte-advies genereert voor uw klant.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2"><a href="https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/warmtepomp" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">ISDE: Warmtepomp woningeigenaren aanvragen — RVO</a> — geraadpleegd 2026-08-03</li>
</ol>
    </BlogPostLayout>
  );
}
