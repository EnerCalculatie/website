import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'mid-laadpaal-zakelijk-verrekenen-advies')!;

export function MidLaadpaalZakelijkVerrekenenAdviesArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Steeds meer werknemers en zelfstandig ondernemers rijden in een elektrische zakelijke auto of leasewagen en laden deze hoofdzakelijk thuis op. Om de gemaakte stroomkosten fiscaal rechtmatig en onbelast door te kunnen rekenen aan de werkgever of de eigen B.V., stelt de Belastingdienst strikte eisen aan de registratie van het stroomverbruik. Het sleutelbegrip in uw adviesgesprek is hierbij de MID-gecertificeerde laadpaal.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Zonder een geijkte stroommeter die voldoet aan de Europese richtlijnen is automatische en rechtsgeldige verrekening fiscaal niet toegestaan. Voor u als installateur of energieadviseur ligt hier een cruciale taak: een foute hardwarekeuze kan immers leiden tot fiscale naheffingen voor uw klant of een niet-functionerende verrekening. In dit artikel leest u wat MID-certificering inhoudt, welke aanvullende componenten nodig zijn voor een waterdichte verrekening en hoe u dit inpast in de netaansluiting van de woning.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Wat houdt MID-certificering in en waarom eist de Belastingdienst dit?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  MID staat voor <em>Measuring Instruments Directive</em> (Europese richtlijn 2014/32/EU). Deze richtlijn harmoniseert de eisen waaraan meetinstrumenten — zoals elektriciteitsmeters, gasmeters en watermeters — moeten voldoen binnen de Europese Unie. Een MID-gecertificeerde stroommeter is door een onafhankelijke instantie getest en geijkt op nauwkeurigheid, betrouwbaarheid en fraudebestendigheid.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  De Belastingdienst merkt een kostenvergoeding voor het thuisladen van een zakelijke auto aan als een onbelaste vergoeding van werkelijke kosten, mits de werkgever exact kan aantonen hoeveel kilowatturen specifiek voor het voertuig zijn geladen. Mocht een laadpaal gebruikmaken van een niet-geijkte interne meting of een simpele app-uitlezing zonder MID-keurmerk, dan is de kans op een afwijking aanwezig. Bij een fiscale controle kan de Belastingdienst de niet-geijkte vergoeding herkwalificeren als belast loon, wat kan leiden tot naheffingen en boetes.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Dit geldt niet alleen voor werknemers in loondienst met een leasewagen, maar exact hetzelfde principe is van toepassing op een DGA (Directeur-Grootaandeelhouder) die de stroomkosten van zijn zakelijke auto wil doorbelasten aan zijn eigen besloten vennootschap. Adviseert u een klant die zakelijk wil verrekenen, dan is een MID-gecertificeerde oplossing dus een harde randvoorwaarde.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De vier essentiële bouwstenen van een verrekenbare laadopstelling
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een MID-meter alleen is niet voldoende om de verrekening automatisch maandelijks op de privébankrekening van uw klant te laten storten. Een zakelijke laadopstelling bestaat uit vier samenwerkende componenten:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>MID-gecertificeerde kWh-meter:</strong> Dit is het fysieke meetinstrument. Dit kan geintegreerd zijn in het laadstation zelf of gemonteerd worden als gecertificeerde module op de betreffende laadgroep in de groepenkast. De meter moet voorzien zijn van een CE-markering, het officiële M-logo en het identificatienummer van de keuringsinstantie.
  </li>
  <li className="mb-2">
    <strong>OCPP-ondersteuning (Open Charge Point Protocol):</strong> De laadpaal moet in staat zijn om de geijkte meetgegevens digitaal en via een versleutelde verbinding te communiceren naar een beheersysteem. OCPP is de internationale standaard die ervoor zorgt dat hardware en software onafhankelijk van elkaar kunnen communiceren.
  </li>
  <li className="mb-2">
    <strong>Charge Point Operator (CPO) en backoffice-abonnement:</strong> Dit is de softwareomgeving die de meetdata ontvangt, verwerkt en geautomatiseerd omzet in een maandelijks overzicht of een factuur. Het CPO-platform incasseert de kosten bij de werkgever of leasemaatschappij en keert de vergoeding uit aan de werknemer.
  </li>
  <li className="mb-2">
    <strong>RFID-laadpas en toegangsbeheer:</strong> Indien er in het huishouden meerdere elektrische voertuigen aanwezig zijn (bijvoorbeeld een zakelijke leasewagen en een tweede privéauto), mag alleen de stroom van het zakelijke voertuig worden vergoed. Door het scannen van een specifieke zakelijke laadpas registreert het systeem welke geladen kWh's aan de werkgever doorbelast mogen worden.
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Vergelijking: Standaard thuislader versus zakelijke MID-laadpaal
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In de onderstaande tabel ziet u in één oogopslag de belangrijkste verschillen tussen een basis laadstation voor louter privégebruik en een volledige zakelijke laadinstallatie:
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 text-slate-800 font-semibold">
        <th className="border border-slate-300 p-3 text-left">Eigenschap / Functionaliteit</th>
        <th className="border border-slate-300 p-3 text-left">Standaard Thuislader</th>
        <th className="border border-slate-300 p-3 text-left">MID Zakelijke Laadpaal</th>
      </tr>
    </thead>
    <tbody className="text-slate-700">
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Stroommeting</td>
        <td className="border border-slate-300 p-3">Niet-geijkt / schatting via software</td>
        <td className="border border-slate-300 p-3">MID-gecertificeerd (geijkt volgens EU-norm)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Fiscale acceptatie Belastingdienst</td>
        <td className="border border-slate-300 p-3">Nee (risico op naheffing bij verrekening)</td>
        <td className="border border-slate-300 p-3">Ja (volledig rechtsgeldig voor kostenvergoeding)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Backoffice communicatie (OCPP)</td>
        <td className="border border-slate-300 p-3">Aanwezig of optioneel / vaak gesloten app</td>
        <td className="border border-slate-300 p-3">Standaard aanwezig voor CPO-koppeling</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Gebruikersidentificatie</td>
        <td className="border border-slate-300 p-3">Plug & Charge of basis app-bediening</td>
        <td className="border border-slate-300 p-3">RFID-kaartlezer voor scheiding zakelijk/privé</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Automatische verrekening</td>
        <td className="border border-slate-300 p-3">Niet mogelijk (handmatige export)</td>
        <td className="border border-slate-300 p-3">Volledig geautomatiseerd via CPO-platform</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Zakelijk laden en de capaciteit van de netaansluiting
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Zakelijke rijders leggen doorgaans meer kilometers af en wensen een hoge laadsnelheid bij thuiskomst. In de praktijk wordt bij zakelijk thuisladen vrijwel altijd gekozen voor een 3-fase laadpaal met een vermogen van 11 kW (3x16A). Dit stelt echter specifieke eisen aan de elektrische installatie in de woning.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  De meeste standaard woonhuizen in Nederland beschikken over een netaansluiting van 3x25A. Wanneer een laadpaal op vol vermogen (16A per fase) draait, blijft er per fase nog slechts 9A over voor alle overige apparaten in de woning. Schakelt de klant tijdens het laden een warmtepomp, inductiekookplaat of wasdroger in, dan wordt de maximale capaciteit van de hoofdzekering al snel overschreden.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het adviseren van een MID-laadpaal moet daarom altijd samengaan met een controle van de aansluitcapaciteit en het toepassen van dynamic load balancing. Meer informatie over het bepalen van de juiste capaciteit en gelijktijdigheid leest u in ons artikel over{' '}
  <a href="/blog/laadpaal-netaansluiting-capaciteit-3x25a" className="text-brand-primary-text font-semibold hover:underline">
    laadpalen op een 3x25A netaansluiting
  </a>
  . Zonder dynamische lastbalancering riskeert uw klant dat de hoofdzekering eruit vliegt zodra er op hoog vermogen zakelijk geladen wordt. Hoe u dit in uw advies opneemt, onderbouwen we in het artikel over{' '}
  <a href="/blog/dynamic-load-balancing-laadpaal-adviseren" className="text-brand-primary-text font-semibold hover:underline">
    dynamic load balancing adviseren
  </a>
  .
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stappenplan voor de installateur: van inventarisatie tot oplevering
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om uw klant van een gestroomlijnd advies en een vlekkeloze installatie te voorzien, kunt u onderstaand stappenplan hanteren:
</p>
<ol className="list-decimal pl-6 mb-6 text-slate-700">
  <li className="mb-3">
    <strong>Inventariseer de vergoedingseisen van de werkgever:</strong> Vraag de klant naar de regelgeving van zijn werkgever of leasemaatschappij. Welke CPO-aanbieder wordt voorgeschreven of geaccepteerd, en is er een specifieke laadpas vereist?
  </li>
  <li className="mb-3">
    <strong>Controleer de meterkast en de netaansluiting:</strong> Inspecteer de groepenkast op de aanwezigheid van een 3-fase hoofdschakelaar, voldoende vrije ruimtes voor een kookgroep of laadpaalgroep en de staat van de aardlekbeveiliging.
  </li>
  <li className="mb-3">
    <strong>Selecteer het juiste laadstation met MID-keurmerk:</strong> Kies een laadpaal die beschikt over een geïntegreerde MID-meter, een RFID-kaartlezer en een goedgekeurd OCPP-protocol.
  </li>
  <li className="mb-3">
    <strong>Voorzie in load balancing en dataverbinding:</strong> Bepaal hoe de load balancing communicatie verloopt (via een P1-poort koppeling of UTP-kabel vanaf de stroomtransformatoren) en zorg voor een stabiele internetverbinding (wifi, LAN of 4G-SIM) voor de backoffice-koppeling.
  </li>
  <li className="mb-3">
    <strong>Oplevering en backoffice-activatie:</strong> Test na montage de werking van de MID-meter, meld de laadpaal aan bij de CPO van de klant en voer een testlaadsessie uit met de zakelijke RFID-pas.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een zakelijke laadpaal staat zelden op zichzelf. In veel verduurzamingstrajecten combineert een klant een zakelijke laadoplossing met zonnepanelen op het dak, een warmtepomp of een thuisbatterij. Losse rekenmodellen schieten dan snel tekort, omdat het extra stroomverbruik van de laadpaal invloed heeft op de mate waarin zonnestroom direct in de woning gebruikt kan worden.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Met EnerCalculatie brengt u het complete energieprofiel van de woning in kaart. Onze rekensoftware controleert direct de impact van het laadprofiel op de maximale capaciteit van de netaansluiting. Zo kunt u in één overzichtelijk en professioneel adviesrapport aan uw klant laten zien hoe het laadpunt past binnen de bestaande of uit te breiden installatie. Wilt u meer weten over onze specifieke module voor laadpalen? Bekijk dan de informatie over de{' '}
  <a href="/rekentool-laadpaal" className="text-brand-primary-text font-semibold hover:underline">
    rekentool laadpaal
  </a>
  {' '}of lees onze algemene gids over{' '}
  <a href="/blog/laadpaal-advies-thuis" className="text-brand-primary-text font-semibold hover:underline">
    het samenstellen van de juiste laadpaalconfiguratie voor thuis
  </a>
  .
</p>
    </BlogPostLayout>
  );
}
