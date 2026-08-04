import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'mia-vamil-laadpaal-adviseren-zakelijk')!;

export function MiaVamilLaadpaalAdviserenZakelijkArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Zakelijke klanten verduurzamen hun wagenpark alleen als de business case klopt. MIA en VAMIL waren jarenlang de standaard fiscale instrumenten om laadpalen aantrekkelijk te offreren. Dat is voorbij. Sinds 2025/2026 is de MIA/Vamil voor personenwagen-laadpalen volledig vervallen.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Belooft u dit nog steeds in uw offertes? Dan riskeert u boze klanten en afgewezen belastingaangiften. Gelukkig is er een alternatief. Door de nieuwe **SPRILA-subsidie** en de Kleinschaligheidsinvesteringsaftrek (KIA) slim te combineren, rekent u alsnog een ijzersterk rendement door.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  MIA en VAMIL: alleen nog voor vrachtwagens en laadkluizen
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  De Milieulijst van de RVO sluit standaard laadpalen voor personenauto's definitief uit. U kunt de MIA en VAMIL alleen nog inzetten voor twee specifieke categorieën:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>Zwaar transport:</strong> Laadpunten voor elektrische vrachtwagens en bussen (categorie M2, M3, N2 en N3) of mobiel werkmaterieel.
  </li>
  <li>
    <strong>Acculaadkluizen:</strong> Brandveilige kluizen waarin werknemers de accu's van hun e-bikes of elektrisch handgereedschap opladen.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Als installateur bent u geen fiscaal adviseur. Wijs uw klant simpelweg op de uitsluiting en verwijs voor de actuele Milieulijst-codes naar rvo.nl. Voor normale laadpalen stapt u over op de SPRILA.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De SPRILA-subsidie: de nieuwe rekensom voor het Mkb
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  De SPRILA (Subsidieregeling Private Laadinfrastructuur bij bedrijven) is het centrale subsidiepotje voor 2026. Het budget is door de Eerste Kamer vastgesteld op € 122,5 miljoen en de regeling loopt tot en met 18 december 2026.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor een Mkb-onderneming gelden de volgende vaste subsidiebedragen:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
  <li><strong>AC-laadstation (enkel, ≥ 11 kW):</strong> € 800 subsidie (grootbedrijf krijgt € 400).</li>
  <li><strong>AC-duopaal (2 laadpunten, ≥ 11 kW):</strong> € 1.600 subsidie (grootbedrijf krijgt € 800).</li>
  <li><strong>Basislaadinfrastructuur:</strong> U krijgt tot 40% van de kosten voor de verdeelkast, bekabeling en het graafwerk vergoed.</li>
  <li><strong>Batterijkoppeling:</strong> Kiest de klant voor een gekoppelde stationaire batterij (10 tot 1.000 kWh)? Dan ontvangt het Mkb € 160 per kWh subsidie.</li>
</ul>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">
  Rekenvoorbeeld: Voldoen aan de SPRILA-subsidiedrempel
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Om in aanmerking te komen voor de SPRILA, moet de aanvraag voldoen aan de minimale drempel van **€ 2.500 per locatie**. We berekenen de subsidiehoogte met de volgende formule:
</p>
<div className="bg-slate-50 p-4 rounded-lg mb-4 font-mono text-sm border border-slate-200">
  S_totaal = (N_duopaal * 1600) + (L_infra * 40)
</div>
<p className="text-slate-700 leading-relaxed mb-4">
  Waarbij <em>N_duopaal</em> het aantal AC-duopalen is, <em>L_infra</em> de lengte van het bekabelingstraject in meters, en € 40 het forfaitaire normbedrag per meter voor de basisinfrastructuur (Mkb-tarief).
</p>
<p className="text-slate-700 leading-relaxed mb-2 font-semibold">
  Voorbeeldproject A (Alleen laadpaal):
</p>
<ul className="list-disc pl-6 mb-4 text-slate-700">
  <li>1 AC-duopaal (N = 1): € 1.600 subsidie.</li>
  <li>Geen basisinfrastructuur opgegeven.</li>
  <li><strong>Subsidieaanvraag:</strong> € 1.600.</li>
  <li><strong className="text-red-600">Resultaat:</strong> Afgewezen (onder de € 2.500 drempel).</li>
</ul>
<p className="text-slate-700 leading-relaxed mb-2 font-semibold">
  Voorbeeldproject B (Gecombineerde offerte):
</p>
<ul className="list-disc pl-6 mb-4 text-slate-700">
  <li>1 AC-duopaal (N = 1): € 1.600 subsidie.</li>
  <li>25 meter basisinfrastructuur (L = 25): 25 * € 40 = € 1.000 subsidie.</li>
  <li><strong>Subsidieaanvraag:</strong> € 1.600 + € 1.000 = € 2.600.</li>
  <li><strong className="text-emerald-600">Resultaat:</strong> Goedgekeurd (boven de € 2.500 drempel).</li>
</ul>

<div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6">
  <h4 className="font-bold text-emerald-800 mb-1">Advies-tip voor uw offerte:</h4>
  <p className="text-emerald-700 text-sm">
    Offereer bij een enkele laadpaal altijd het complete installatietraject inclusief graafwerk en bekabeling als één pakket. Hiermee helpt u uw klant over de € 2.500 drempel heen. Blijft de aanvraag alsnog te laag? Onderzoek dan of u het project kunt uitbreiden met een gekoppelde stationaire batterij (min. 10 kWh) om de subsidieaanvraag te verhogen.
  </p>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Netcongestie en dynamic load balancing op het bedrijfsterrein
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een zakelijk laadplein trekt een zware wissel op de netaansluiting. Zonder sturing leidt gelijktijdig laden gegarandeerd tot een overschrijding van het gecontracteerde vermogen en een overbelaste hoofdzekering.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Verzwaren is op veel bedrijventerreinen geen optie meer door acute netcongestie. Controleer de capaciteitskaarten van Netbeheer Nederland om te zien of de locatie van uw klant in een rood of oranje congestiegebied ligt. Een verzwaringstraject duurt daar vaak jaren.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Dynamic load balancing lost dit op. Het systeem meet de actuele belasting van het bedrijfspand en knijpt de laadpalen zodra machines of klimaatbeheersing stroom vragen. Zo blijft de installatie binnen de veilige grenzen van de bestaande aansluiting en bespaart uw klant duizenden euro's aan netwerkkosten.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Vergelijking: Fiscale en subsidiemogelijkheden zakelijk laden 2026
</h2>
<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100">
        <th className="border border-slate-300 p-2 text-left font-semibold text-slate-800">Regeling</th>
        <th className="border border-slate-300 p-2 text-left font-semibold text-slate-800">Toepassing</th>
        <th className="border border-slate-300 p-2 text-left font-semibold text-slate-800">Financieel voordeel</th>
        <th className="border border-slate-300 p-2 text-left font-semibold text-slate-800">Harde voorwaarde</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-slate-300 p-2 font-medium text-slate-800">SPRILA-subsidie</td>
        <td className="border border-slate-300 p-2 text-slate-700">AC/DC-laadpalen en basisinfrastructuur op eigen terrein.</td>
        <td className="border border-slate-300 p-2 text-slate-700">Mkb: € 800 per laadstation / € 1.600 per duopaal + tot 40% infra-vergoeding.</td>
        <td className="border border-slate-300 p-2 text-slate-700">Subsidiebedrag moet minimaal € 2.500 bedragen.</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-2 font-medium text-slate-800">KIA (Investeringsaftrek)</td>
        <td className="border border-slate-300 p-2 text-slate-700">Alle geactiveerde bedrijfsmiddelen op de balans.</td>
        <td className="border border-slate-300 p-2 text-slate-700">Een extra aftrekpost op de winst tot 28%.</td>
        <td className="border border-slate-300 p-2 text-slate-700">Minimaal € 2.800 totale bedrijfsinvesteringen in 2026.</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-2 font-medium text-slate-800">MIA en VAMIL</td>
        <td className="border border-slate-300 p-2 text-slate-700">Alleen laadpunten voor zwaar transport (vrachtwagens) of laadkluizen.</td>
        <td className="border border-slate-300 p-2 text-slate-700">Milieu-investeringsaftrek + willekeurige afschrijving.</td>
        <td className="border border-slate-300 p-2 text-slate-700">Standaard auto-laadpaal is uitgesloten.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stappenplan voor een waterdicht laadadvies
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-3">
  <li>
    <strong>Breng het laadprofiel in kaart:</strong> Bepaal het aantal gelijktijdige laadsessies, de stilstandtijden en de dagelijkse ritten.
  </li>
  <li>
    <strong>Check de netaansluiting:</strong> Beoordeel de capaciteit van de verdeelkast en controleer de capaciteitskaarten van Netbeheer Nederland op congestie. Raadpleeg ons artikel over <a href="/blog/netcongestie-wachtlijst-zakelijk-2026" className="text-brand-primary-text font-semibold hover:underline">netcongestie en zakelijke aansluitingen</a>.
  </li>
  <li>
    <strong>Selecteer slimme laadpunten:</strong> Kies voor OCPP-compatibele hardware met geïntegreerde energiemeters en dynamic load balancing.
  </li>
  <li>
    <strong>Reken de SPRILA door:</strong> Controleer direct of het project de minimale subsidiedrempel van € 2.500 haalt.
  </li>
  <li>
    <strong>Integreer de business case:</strong> Voeg de laadpalen samen met eventuele zonnepanelen of een batterijopslag (die ook onder de SPRILA valt) in één rapport.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie uw werk vereenvoudigt
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het handmatig doorrekenen van vermogensprofielen, netaansluitingen en subsidiedrempels kost uren. Met EnerCalculatie voert u de projectgegevens in en controleert de software direct of u de SPRILA-drempel haalt. Combineert u laadpalen met zonnepanelen of een batterij? De rekentool berekent het gecombineerde energieprofiel automatisch in één samenhangend digitaal rapport. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Zo presenteert u de zakelijke klant een feitelijk onderbouwd advies waarin zowel de technische haalbaarheid als de financiële logica direct helder zijn. Met ons complete licentiemodel (vanaf €99 per maand voor het Business-abonnement met Solar + Battery, of de complete licentie voor €299 per maand inclusief warmtepomp, airco en laadpaal) verhoogt u de efficiëntie van uw ontwerptraject aanzienlijk. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u de software zelf testen met uw eigen projecten? Vraag een persoonlijke demo aan met uw eigen klantcasus via <a href="https://enercalculatie.nl" className="text-brand-primary-text font-semibold hover:underline">enercalculatie.nl</a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2"><a href="https://www.rvo.nl/subsidies-financiering/sprila" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Subsidieregeling Private Laadinfrastructuur bij bedrijven (SPRILA) — RVO</a> — geraadpleegd 2026-08-04</li>
  <li className="mb-2"><a href="https://www.netbeheernederland.nl/netcapaciteit-en-flexibiliteit/capaciteitskaart" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Capaciteitskaart — Netbeheer Nederland</a> — geraadpleegd 2026-08-04</li>
</ol>
    </BlogPostLayout>
  );
}
