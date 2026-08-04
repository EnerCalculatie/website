import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'afgiftesysteem-warmtepomp-lage-temperatuur-radiatoren')!;

export function AfgiftesysteemWarmtepompLageTemperatuurRadiatorenArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  De overstap van een traditionele gasgestookte cv-ketel naar een hybride of volledig elektrische warmtepomp vraagt om meer dan alleen het selecteren van het juiste vermogen voor de buiteneenheid. De sleutel tot een energiezuinige werking en een hoog seizoensrendement (SCOP) ligt in het afgiftesysteem. Waar een gasketel moeiteloos water van 70 tot 80 graden Celsius door de leidingen pompt, levert een warmtepomp het hoogste rendement bij aanvoertemperaturen tussen de 35 en 45 graden Celsius.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor u als installateur of energieadviseur vormt het beoordelen van de bestaande radiatoren een cruciaal onderdeel van het opnametraject. Wanneer het afgiftesysteem onvoldoende warmte kan afstaan bij lage temperaturen, zal de klant comfortklachten ervaren of schiet de warmtepomp in een ongunstig hoog-temperatuurbedrijf met een stijgend stroomverbruik tot gevolg. In dit artikel leest u een helder stappenplan voor een gedegen <strong>lage temperatuur radiatoren warmtepomp advies</strong>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Het mechanisme: temperatuurtrajecten en de exponentiële afgifteval
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om te bepalen of een bestaande radiator geschikt is voor een lage aanvoertemperatuur, moet u kijken naar het temperatuurverschil tussen de radiator en de omgevingslucht. De fabrikant geeft het nominale vermogen van een radiator doorgaans op bij het regime 75/65/20 °C (aanvoertemperatuur / retourtemperatuur / ruimtetemperatuur). Dit komt overeen met een zogeheten $\Delta T$ (Delta T) van 50 Kelvin.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Schakelt u over naar een warmtepomp met een regime van bijvoorbeeld 45/35/20 °C, dan daalt de gemiddelde watertemperatuur in de radiator van 70 °C naar 40 °C. Het temperatuurverschil met de ruimte (de overtemperatuur) halveert van 50 K naar 20 K. Omdat de warmteafgifte van een plaatradiator niet lineair maar exponentieel verloopt (met een radiator-exponent van gemiddeld 1,3), valt het warmteafgiftevermogen veel harder terug dan de helft.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  In de praktijk houdt een standaard plaatradiator bij een aanvoertemperatuur van 45 °C vaak nog maar 30 tot 35 procent van zijn oorspronkelijke nominale vermogen over. Indien de warmtevraag van de betreffende ruimte niet evenredig is gedaald door na-isolatie, is de radiator simpelweg te klein om de ruimte op koude winterdagen op temperatuur te houden.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stappenplan: het afgiftesysteem controleren op locatie
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om tijdens het adviesgesprek niet te hoeven terugvallen op snelle gissingen, doorloopt u bij de opname van de woning de volgende vier stappen:
</p>

<h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
  Stap 1: Inventariseer de radiatortypen en afmetingen
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Breng per verblijfsruimte het aanwezige afgiftesysteem in kaart. Let hierbij op het type plaatradiator:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li><strong>Type 10 / 11:</strong> Enkelpas plaat, respectievelijk zonder en met convectorlamellen. Biedt relatief weinig oppervlak.</li>
  <li><strong>Type 21 / 22:</strong> Dubbele plaat met een of twee convectorplaten. Veel toegepast in woningen uit de jaren '80 en '90.</li>
  <li><strong>Type 33:</strong> Driedubbele plaat met drie convectorplaten. Hoge afgifte per strekkende meter, maar vraagt meer diepte (ca. 16 cm).</li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Notering van hoogte, lengte en type maakt het mogelijk om in het rekenmodel het nominale vermogen bij 75/65 °C op te zoeken.
</p>

<h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
  Stap 2: Bepaal de actuele warmtevraag per ruimte
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Het nominale vermogen van de oude radiator zegt pas iets als u dit vergelijkt met de benodigde transmissie- en infiltratieverliezen van het vertrek. Bepaal op basis van de aanwezige schilisolatie (vloer, gevel, dak en glas) het benodigde vermogen per watt per kubieke meter ($W/m^3$) of voer een gedetailleerde transmissieberekening uit conform de NEN-EN 12831-norm of ISSO 51-richtlijn.
</p>

<h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
  Stap 3: Herbereken het afgiftevermogen bij de beoogde aanvoertemperatuur
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Reken het afgiftevermogen van de radiator om naar het beoogde regime van de warmtepomp (bijvoorbeeld 45/35 °C voor hybride of 35/30 °C bij all-electric met vloerverwarming). Is het omgerekende vermogen groter dan of gelijk aan de berekende warmtevraag van de ruimte? Dan is de aanwezige radiator geschikt.
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 text-slate-800 font-semibold">
        <th className="border border-slate-300 p-3 text-left">Radiatortype</th>
        <th className="border border-slate-300 p-3 text-left">Afmeting (h x l)</th>
        <th className="border border-slate-300 p-3 text-right">Vermogen bij 75/65/20 °C</th>
        <th className="border border-slate-300 p-3 text-right">Vermogen bij 45/35/20 °C</th>
        <th className="border border-slate-300 p-3 text-center">Geschikt bij 500 W warmtevraag?</th>
      </tr>
    </thead>
    <tbody className="text-slate-700">
      <tr>
        <td className="border border-slate-300 p-3">Type 11</td>
        <td className="border border-slate-300 p-3">600 x 1000 mm</td>
        <td className="border border-slate-300 p-3 text-right">ca. 1000 W</td>
        <td className="border border-slate-300 p-3 text-right">ca. 320 W</td>
        <td className="border border-slate-300 p-3 text-center text-red-600 font-semibold">Nee (tekort)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3">Type 22</td>
        <td className="border border-slate-300 p-3">600 x 1000 mm</td>
        <td className="border border-slate-300 p-3 text-right">ca. 1700 W</td>
        <td className="border border-slate-300 p-3 text-right">ca. 540 W</td>
        <td className="border border-slate-300 p-3 text-center text-emerald-600 font-semibold">Ja (voldoende)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3">Type 33</td>
        <td className="border border-slate-300 p-3">600 x 1000 mm</td>
        <td className="border border-slate-300 p-3 text-right">ca. 2400 W</td>
        <td className="border border-slate-300 p-3 text-right">ca. 770 W</td>
        <td className="border border-slate-300 p-3 text-center text-emerald-600 font-semibold">Ja (ruim voldoende)</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Aanpassingsmogelijkheden bij onvoldoende afgifte
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Blijkt uit de berekening dat een of meerdere ruimtes tekortschieten? Dan zijn er verschillende technische maatregelen om de installatie alsnog geschikt te maken voor lage temperaturen:
</p>

<p className="text-slate-700 leading-relaxed mb-4">
  <strong>1. Toepassen van radiatorventilatoren (actieve convectie)</strong><br />
  Door aan de onderzijde van een bestaand type 22 of 33 radiator een set ventilatoren te plaatsen, wordt de luchtstroming langs de convectoren geforceerd. Dit verhoogt de afgifte bij lage watertemperaturen met 30 tot 50 procent. Dit is een kostenefficiënte en minimale ingreep voor de klant.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  <strong>2. Vervangen door lage temperatuur radiatoren of convectoren</strong><br />
  Wanneer een enkelpas radiator (type 10 of 11) aanwezig is, levert het vervangen door een type 22 of 33 radiator op dezelfde positie direct een verdubbeling van het afgifteoppervlak op. Specifieke LTV-convectoren (met ingebouwde microventilatoren) bieden bij een zeer compact formaat een hoge warmteafgifte bij aanvoertemperaturen vanaf 35 °C.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  <strong>3. Bij-isoleren van de woningschil</strong><br />
  In plaats van het afgiftesysteem te vergroten, kunt u ook de warmtevraag van de ruimte verlagen. Het spouwmuurisoleren, vervangen van HR-glas door HR++- of triple-glas, of het isoleren van het dak verlaagt de benodigde watertoevoer, waardoor de bestaande radiatoren wel toereikend worden.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hydraulische uitdagingen: volumestroom en waterzijdig inregelen
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Naast het oppervlak van de radiatoren speelt de hydraulische opzet van het leidingnetwerk een doorslaggevende rol. Een warmtepomp werkt met een lagere Delta T (vaak 5 tot 8 K) dan een traditionele cv-ketel (15 tot 20 K). Om dezelfde hoeveelheid energie aan de woning over te dragen, moet er per uur significant meer liters water door het leidingnet stromen.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Dit heeft twee directe consequenties voor uw installatieontwerp:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li>
    <strong>Leidingdiameters en weerstand:</strong> Bestaande dunne leidingen (zoals 12 mm of 15 mm verzamel-leidingen) kunnen bij de hogere volumestroom leiden tot stromingsruis, een te hoge drukval en storingen (zoals lagedruk- of flow-storingen op de warmtepomp).
  </li>
  <li>
    <strong>Waterzijdig inregelen:</strong> Het inregelen van instelbare thermostaatventielen of voetventielen is verplicht en noodzakelijk. Zonder waterzijdig inregelen zal het water de weg van de minste weerstand kiezen. De radiatoren die dicht bij de warmtepomp staan krijgen te veel flow, terwijl de verafgelegen radiatoren koud blijven.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Bovendien moet er altijd voldoende minimale doorstroming (de zogeheten min-flow) gewaarborgd zijn voor de ontdooicyclus (defrost) van de warmtepomp. Het toepassen van een verdelend buffervat (open verdeling) of het installeren van een drukgestuurde bypass in combinatie met permanent geopende groepen is hierbij essentieel.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Subsidies en randvoorwaarden voor de warmtepomp
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Warmtepompen die worden ingezet voor ruimteverwarming in woningen komen onder specifieke voorwaarden in aanmerking voor de ISDE-subsidie via de RVO. Een belangrijke eis voor de werkelijke energiebesparing is dat het gehele systeem — inclusief het afgiftesysteem — goed is afgesteld. Binnen het adviesgesprek helpt het om de klant uit te leggen dat de subsidie de investering in de apparatuur ondersteunt, maar dat een correct ingeregeld afgiftesysteem de garantie biedt op een lage energienota. Raadpleeg voor de actuele subsidievoorwaarden en meldcodes altijd de officiële kanalen van de Rijksdienst voor Ondernemend Nederland (rvo.nl).
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe adviseert u dit transparant aan uw klant?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Klanten focussen bij de aanschaf van een warmtepomp vaak op de apparatenprijs en het opgegeven piekvermogen in kilowatt. Als adviseur voegt u waarde toe door uit te leggen dat de installatie een keten is: de buiteneenheid levert de warmte, maar het afgiftesysteem bepaalt het rendement.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Presenteer uw bevindingen in het offerte- of adviesrapport helder en gestructureerd:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li>Toon welke ruimtes met het bestaande afgiftesysteem direct geschikt zijn voor lage temperatuur verwarming.</li>
  <li>Benoem expliciet de knelpunten (zoals een te kleine radiator op de hoofdslaapkamer of studeerkamer).</li>
  <li>Bied concrete oplossingen aan (zoals het plaatsen van een LTV-convector of radiatorventilatoren) als onderdeel van de totaofferte.</li>
  <li>Laat zien wat de invloed is van de aanvoertemperatuur op het verwachte jaarlijkse elektriciteitsverbruik. Een lagere aanvoertemperatuur verhoogt de SCOP, wat de klant op de lange termijn direct terugziet in zijn energiekosten.</li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het handmatig omrekenen van alle radiatoren, transmissieverliezen en temperatuur-exponenten per ruimte kan een tijdrovende klus zijn. Met de software van EnerCalculatie voert u de woningkenmerken en het type afgiftesysteem in, waarna de rekentool deterministisch analyseert welk temperatuurtraject haalbaar is. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Op basis van deze gecombineerde berekening genereert de software automatisch een professioneel en inzichtelijk verduurzamingsrapport. Hierin ziet uw klant precies waarom een aanpassing aan een specifieke radiator nodig is en hoe het opwekker- en afgiftesysteem optimaal op elkaar worden afgestemd. Ontdek de mogelijkheden van onze rekentool voor warmtepompen op de{' '}
  <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">
    rekentool warmtepomp pagina
  </a>.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u meer verdieping over de exacte standaardaannames achter onze rendementsberekeningen? Lees dan ook ons artikel over{' '}
  <a href="/blog/warmtepomp-rendement-aannames" className="text-brand-primary-text font-semibold hover:underline">
    de Nederlandse standaardaannames voor warmtepomp-rendement
  </a>{' '}of ontdek hoe u een hybride opstelling dimensioneert in{' '}
  <a href="/blog/hybride-warmtepomp-dimensionering-gasketel" className="text-brand-primary-text font-semibold hover:underline">
    onze gids over hybride warmtepomp dimensionering
  </a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2"><a href="https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/warmtepomp" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">ISDE: Warmtepomp woningeigenaren aanvragen — RVO</a> — geraadpleegd 2026-08-04</li>
</ol>
    </BlogPostLayout>
  );
}
