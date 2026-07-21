import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'airco-als-verwarming-berekenen')!;

export function AircoAlsVerwarmingBerekenenArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Nu de energieprijzen en nettarieven dynamisch blijven bewegen, zoeken steeds meer eindklanten naar snelle en gerichte manieren om hun gasverbruik te verlagen. De split-airconditioning — technisch gezien een lucht-lucht warmtepomp — is in de praktijk een van de meest laagdrempelige oplossingen om dit te bereiken. Voor u als installateur ligt hier een belangrijke adviesrol: een klant wil vooraf exact weten hoeveel gas hij bespaart en welk extra elektriciteitsverbruik daar tegenover staat. 
</p>

<p className="text-slate-700 leading-relaxed mb-4">
  Het simpelweg noemen van algemene percentages is riskant en onprofessioneel. Om een betrouwbare businesscase op te stellen, moet u rekenen met de energetische waarden van gas en elektriciteit, gecorrigeerd naar het reële rendement van de bestaande cv-ketel en de seizoensprestatie van de airco. In dit artikel leert u de exacte stappen en normen om deze berekening deterministisch uit te voeren.
</p>

{/* TL;DR Formula Box */}
<div className="bg-slate-50 border-l-4 border-brand-primary p-6 rounded-r-lg mb-8">
  <h3 className="text-lg font-bold text-slate-900 mb-2">TL;DR — De Kernformule</h3>
  <p className="text-slate-700 text-sm leading-relaxed mb-3">
    Voor het snel en betrouwbaar overbruggen van gas- naar stroomverbruik hanteert u de volgende natuurkundige basisrichtlijn op basis van ISSO-normen:
  </p>
  <div className="bg-white p-4 rounded border border-slate-200 font-mono text-xs md:text-sm text-slate-800 mb-3">
    1 m³ Gronings aardgas = ~9,7 kWh bruto energetische waarde.<br />
    Bij een reëel ketelsysteemrendement van 90% levert dit 8,8 kWh netto warmte.<br />
    Bij een SCOP van 4,0 verbruikt de airco: 8,8 kWh / 4,0 = 2,2 kWh elektriciteit per bespaarde m³ gas.
  </div>
  <p className="text-slate-600 text-xs italic">
    Gebruik deze vuistregel voor snelle indicaties, maar doorloop de onderstaande stappen voor een specifiek klantdossier.
  </p>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De energetische basis: Van gas (m³) naar warmte (kWh thermisch)
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om een vergelijking te maken tussen het gasverbruik van een cv-ketel en het stroomverbruik van een airconditioning, moeten we beide energiedragers terugbrengen naar dezelfde eenheid: kilowattuur (kWh) thermische energie.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Volgens gegevens van de Rijksdienst voor Ondernemend Nederland (RVO) en de Nederlandse NTA 8800-norm heeft één kubieke meter (m³) Gronings aardgas een energetische bovenwaarde van circa 35,17 MJ, wat gelijkstaat aan ongeveer 9,77 kWh bruto warmte. De onderwaarde, die de basis vormt voor traditionele rendementsberekeningen, ligt rond de 31,65 MJ oftewel 8,8 kWh.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een cv-ketel kan deze energie echter niet zonder verlies omzetten in warm water voor de radiatoren. Hoewel moderne HR-ketels een theoretisch rendement van meer dan 100% op onderwaarde kunnen claimen, is het werkelijke systeemrendement in een woning (inclusief opstartverliezen, stilstandverliezen en distributieverliezen via ongeïsoleerde leidingen) aanzienlijk lager. ISSO-publicaties en praktijkmetingen laten zien dat een reëel systeemrendement van 90% voor verwarming een nauwkeurige en veilige standaardaanname is.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Dat betekent dat we voor elke kubieke meter aardgas die niet langer verbrand wordt, de volgende netto thermische warmtebehoefte uit de woning wegnemen:
</p>
<p className="font-semibold text-slate-800 bg-slate-100 p-3 rounded text-center mb-4">
  1 m³ aardgas = 9,77 kWh (bruto) * 90% (rendement) = ~8,8 kWh netto thermische warmtebehoefte
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De invloed van de SCOP bij een airco als verwarming
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Nu we weten dat elke bespaarde kubieke meter gas vraagt om een vervangende thermische warmteopbrengst van 8,8 kWh, kijken we naar de prestaties van de airconditioning. Een airco is een lucht-lucht warmtepomp die warmte aan de buitenlucht onttrekt en deze binnen afgeeft. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  De efficiëntie hiervan wordt uitgedrukt in de COP (Coefficient of Performance). Omdat de buitentemperatuur gedurende het stookseizoen continu fluctueert, rekent u voor de jaarlijkse energiebalans niet met de momentane COP, maar met de SCOP (Seasonal Coefficient of Performance). De SCOP is berekend op basis van een gestandaardiseerd Europees klimaatprofiel (voor Nederland is dit meestal het Strasbourg-profiel).
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een kwalitatieve split-unit airco die ontworpen is voor verwarming heeft in het Nederlandse klimaat een SCOP die varieert tussen de 4,0 en 4,6. Dit betekent dat het systeem over een heel stookseizoen gemiddeld 4,0 tot 4,6 kWh thermische warmte levert voor elke kWh aan elektriciteit die de compressor en ventilatoren verbruiken.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u dieper ingaan op de exacte mechanismen achter deze seizoensprestaties en hoe u deze vertaalt naar een realistisch stroomprofiel? Lees dan ook ons specifieke artikel over de <a href="/blog/scop-warmtepomp-berekenen-stroomverbruik" className="text-brand-primary-text font-semibold hover:underline">SCOP-waarde van een warmtepomp en stroomverbruik</a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stappenplan: Zo voert u de berekening uit voor uw klant
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om tot een klantspecifiek en kloppend advies te komen, doorloopt u de volgende vier stappen in uw adviesgesprek:
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">
  Stap 1: Scheid het gasverbruik voor verwarming van tapwater
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Een airco kan alleen ruimtes verwarmen; het systeem levert geen warm tapwater voor de douche of keuken. U moet daarom eerst bepalen welk deel van het historische gasverbruik van de klant daadwerkelijk naar ruimteverwarming gaat. Als vuistregel (gebaseerd op gemiddelde gezinssamenstellingen) trekt u circa 100 tot 150 m³ gas per persoon per jaar af van het totale jaarverbruik voor het tapwater. Wat overblijft is het verwarmingsdeel.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">
  Stap 2: Bepaal het dekkingspercentage van de airco
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Verwarmt de klant de gehele woning met airco's (bijvoorbeeld via een multi-splitsysteem), of wordt de airco alleen ingezet als zonale bijverwarming in de woonkamer en werkkamer? In het laatste geval dekt de airco bijvoorbeeld slechts 60% tot 70% van de totale warmtevraag. De overige 30% tot 40% (bijvoorbeeld voor slaapkamers of badkamers) blijft via de bestaande cv-ketel of radiatoren lopen.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">
  Stap 3: Bereken de bruto gasbesparing en de netto warmtebehoefte
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Vermenigvuldig het verwarmingsdeel van het gasverbruik met het dekkingspercentage. Dit geeft de theoretische gasbesparing in m³. Vermenigvuldig deze kubieke meters vervolgens met 8,8 kWh om de over te dragen thermische warmtevraag te berekenen.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">
  Stap 4: Calculeer het extra stroomverbruik
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Deel de berekende thermische warmtevraag door de SCOP van de geselecteerde airconditioning. De uitkomst is het extra elektriciteitsverbruik in kWh dat op de jaarnota van uw klant zal verschijnen.
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100">
        <th className="border border-slate-300 p-3 text-left font-bold text-slate-800">Isolatieniveau woning</th>
        <th className="border border-slate-300 p-3 text-left font-bold text-slate-800">Typische SCOP (verwarmen)</th>
        <th className="border border-slate-300 p-3 text-left font-bold text-slate-800">Conversiefactor (kWh per m³ gas)</th>
        <th className="border border-slate-300 p-3 text-left font-bold text-slate-800">Aandachtspunt voor installateur</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700">Slecht (energielabel D tot G)</td>
        <td className="border border-slate-300 p-3 text-slate-700">3,8 - 4,0</td>
        <td className="border border-slate-300 p-3 text-slate-700">~2,3 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">Hoge transmissieverliezen; tochtklachten mogelijk bij hoge ventilatorsnelheid.</td>
      </tr>
      <tr className="bg-slate-50">
        <td className="border border-slate-300 p-3 text-slate-700">Matig tot goed (label B of C)</td>
        <td className="border border-slate-300 p-3 text-slate-700">4,1 - 4,3</td>
        <td className="border border-slate-300 p-3 text-slate-700">~2,1 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">Ideaal scenario voor hybride stookgedrag (overdag airco, 's nachts cv).</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700">Zeer goed (label A of beter)</td>
        <td className="border border-slate-300 p-3 text-slate-700">4,4 - 4,6</td>
        <td className="border border-slate-300 p-3 text-slate-700">~1,9 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">Zeer laag verbruik; airco kan snel moduleren naar een laag stand-by vermogen.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Praktijkvoorbeeld: Een realistisch scenario doorrekenen
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Laten we de theorie toetsen aan een concreet praktijkvoorbeeld van een tussenwoning met een matige isolatie (energielabel C). Het totale historische gasverbruik van dit huishouden (twee personen) is 1.200 m³ per jaar.
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>Stap 1:</strong> We trekken 200 m³ gas af voor warm tapwater (twee personen). Het gasverbruik dat puur aan ruimteverwarming wordt besteed is dus 1.000 m³.
  </li>
  <li>
    <strong>Stap 2:</strong> De klant kiest voor een single-split airco in de woonkamer/open keuken. Dit is de zone waar overdag en 's avonds geleefd wordt. We schatten in dat deze zone verantwoordelijk is voor 70% van de totale warmtevraag in de woning. De beoogde gasbesparing is dus 70% van 1.000 m³ = 700 m³.
  </li>
  <li>
    <strong>Stap 3:</strong> De te vervangen thermische warmtebehoefte is 700 m³ * 8,8 kWh = 6.160 kWh thermisch.
  </li>
  <li>
    <strong>Stap 4:</strong> De geselecteerde split-unit heeft een SCOP van 4,2 in verwarmingsmodus. Het extra elektriciteitsverbruik wordt dan: 6.160 kWh / 4,2 = 1.467 kWh.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  De rekensom voor uw klant laat onderaan de streep een duidelijke verschuiving zien: een reductie van 700 m³ gas tegenover een toename van 1.467 kWh aan stroom. In een eerlijke adviesrapportage neemt u deze verschuiving integraal mee, inclusief de eventuele impact op de teruglevering van aanwezige zonnepanelen.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Technische valkuilen bij het verwarmen met een airco
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Hoewel de energetische rekensom gunstig uitpakt, moet u uw klant ook behoeden voor comfort- en installatietechnische valkuilen. Lucht-lucht verwarming gedraagt zich wezenlijk anders dan een traditioneel hydronisch systeem met radiatoren of vloerverwarming.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Ten eerste is er de luchtcirculatie. Een airco blaast warme lucht de ruimte in. Bij een te krappe dimensionering moet de ventilator op een hoge stand draaien om de warmte te verspreiden, wat kan leiden tot tochtklachten en geluidshinder. Dimensioner de unit daarom liever met een gezonde marge, zodat deze op een lager, stiller ventilatortoerental de ruimte op temperatuur kan houden.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Ten tweede speelt de ontdooicyclus (defrost) een rol bij lagere buitentemperaturen. Zodra de buitentemperatuur richting het vriespunt daalt, kan de vochtige buitenlucht vastvriezen op de lamellen van de buitenunit. De airco moet dan tijdelijk de cyclus omdraaien om de buitenunit te ontdooien. Tijdens deze cyclus bläst de binnenunit gedurende enkele minuten geen warme lucht, wat door de klant als 'tocht' ervaren kan worden als de unit ongelukkig gepositioneerd is.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u een diepgaande vergelijking maken tussen het comfort en de verkoopargumenten van een airco versus een hybride of all-electric watergedragen warmtepomp? Raadpleeg dan ons artikel over de afweging tussen een <a href="/blog/airco-vs-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">airco of een hybride warmtepomp</a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het handmatig doorrekenen van deze verschuivingen in Excel-sheets is tijdrovend en verhoogt de kans op fouten, zeker wanneer uw klant ook al beschikt over zonnepanelen, een laadpaal of plannen heeft voor een thuisbatterij. De rekenmodellen in EnerCalculatie zijn deterministisch opgebouwd om deze interacties nauwkeurig te simuleren. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Onze rekentool modelleert de warmtebehoefte op uurbasis en brengt de opwek van zonnepanelen direct in mindering op het extra stroomverbruik van de airco. Hierdoor ziet uw klant in één oogopslag hoe de terugverdientijd wordt beïnvloed en hoe de energienota zich onderaan de streep ontwikkelt. Door deze geïntegreerde aanpak presenteert u geen losse schattingen, maar een gevalideerd en professioneel adviesrapport.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Benieuwd hoe snel u een dergelijke berekening opstelt voor uw volgende project? Bekijk direct de mogelijkheden op onze <a href="/rekentool-airco" className="text-brand-primary-text font-semibold hover:underline">rekentool airco pagina</a> of ontdek hoe u verschillende verduurzamingsmaatregelen naadloos combineert in één klantdossier.
</p>
    </BlogPostLayout>
  );
}
