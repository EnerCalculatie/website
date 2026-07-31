import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'warmtepompboiler-adviseren-gasbesparing-isde')!;

export function WarmtepompboilerAdviserenGasbesparingIsdeArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor veel woningeigenaren is het volledig aardgasvrij maken van de woning met een all-electric warmtepomp een ingrijpende stap, zowel qua investering als qua aanpassingen aan het afgiftesysteem. Een warmtepompboiler biedt in dat geval een uitstekend en toegankelijk alternatief. Met een warmtepompboiler ontkoppelt u de bereiding van warm tapwater van de centrale verwarmingsketel. Daarmee realiseert uw klant direct een substantiële gasbesparing, zonder dat het bestaande afgiftesysteem op lage temperatuur ingesteld hoeft te worden.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij het adviseren van een warmtepompboiler verwachten klanten echter meer dan alleen een productaanbeveling. Ze willen exact weten wat de stap oplevert qua gasbesparing, hoeveel extra stroom de boiler verbruikt en welke ISDE-subsidie er beschikbaar is om de netto investering te verlagen. Als installateur bouwt u vertrouwen door deze factoren onderbouwd en in samenhang te presenteren in uw adviesrapport.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De gasbesparing voor warm tapwater onderbouwen
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om de gasbesparing van een warmtepompboiler nauwkeurig te onderbouwen, kijkt u primair naar het aandeel dat warm tapwater inneemt binnen de totale gasvraag van de woning. Bij een gemiddelde gezinswoning maakt het opwarmen van tapwater ongeveer 10 tot 20 procent uit van het totale jaarlijkse gasverbruik. Het overige deel gaat naar ruimteverwarming.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een handige vuistregel voor het berekenen van het tapwatergasverbruik is het aantal personen in het huishouden:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li><strong>1-2 personen:</strong> circa 150 tot 250 m³ gas per jaar voor tapwater.</li>
  <li><strong>3-4 personen:</strong> circa 300 tot 450 m³ gas per jaar voor tapwater.</li>
  <li><strong>5 of meer personen:</strong> circa 500 m³ of meer gas per jaar voor tapwater.</li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Zodra een warmtepompboiler wordt geïnstalleerd en de cv-ketel enkel nog ingesteld staat op ruimteverwarming, vervalt dit specifieke gasverbruik voor warm water volledig. In uw adviesgesprek kunt u dit helder presenteren: het verminderde gasverbruik is een directe en vaststaande besparing op de energierekening, onafhankelijk van hoe koud de winter uiteindelijk wordt.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Het extra elektriciteitsverbruik en de COP-waarde
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Tegenover de besparing op gas staat een toename in het elektriciteitsverbruik. Een warmtepompboiler haalt warmte uit de omgevingslucht (of uit ventilatieretourlucht) en gebruikt een compressor om de boilerinhoud op te warmen. De efficiëntie waarmee dit gebeurt, wordt uitgedrukt in de Coëfficiënt of Performance (COP).
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Moderne warmtepompboilers behalen onder standaard beproevingsomstandigheden (conform EN 16147) een COP die doorgaans tussen de 2,5 en 3,5 ligt. Dit betekent dat het apparaat voor elke kilowattuur aan elektrische energie circa 2,5 tot 3,5 kilowattuur aan warmte levert. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Om de omrekening te maken van gas naar stroom gebruikt u de energetische waarde van aardgas. Eén kubieke meter aardgas levert bij verbranding in een hoogrendementsketel netto circa 8,8 kWh aan nuttige warmte voor tapwater. Wanneer we dit verrekenen met de COP van de warmtepompboiler, ziet de verhouding er als volgt uit:
</p>
<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100">
        <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">COP-waarde warmtepompboiler</th>
        <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Benodigde stroom per m³ vervangen gas</th>
        <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Geschat stroomverbruik bij 350 m³ gasbesparing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700">COP 2,5</td>
        <td className="border border-slate-300 p-3 text-slate-700">ca. 3,5 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">ca. 1.225 kWh / jaar</td>
      </tr>
      <tr className="bg-slate-50">
        <td className="border border-slate-300 p-3 text-slate-700">COP 3,0</td>
        <td className="border border-slate-300 p-3 text-slate-700">ca. 2,9 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">ca. 1.015 kWh / jaar</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700">COP 3,5</td>
        <td className="border border-slate-300 p-3 text-slate-700">ca. 2,5 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">ca. 875 kWh / jaar</td>
      </tr>
    </tbody>
  </table>
</div>
<p className="text-slate-700 leading-relaxed mb-4">
  Houd bij uw advies rekening met de bron van de aanzuiglucht. Zuigt de boiler lucht aan uit een onverwarmde ruimte (zoals een garage of zolder)? Dan blijft de ruimtetemperatuur in de woning gelijk. Zuigt de boiler warme lucht aan uit de binnenruimte (zoals een mechanisch ventilatiesysteem)? Dan is het rendement hoger, maar koelt de opstellingsruimte licht af, waardoor het hoofdverwarmingssysteem in de winter fractioneel meer warmte moet leveren.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  ISDE-subsidie voor warmtepompboilers: voorwaarden en onderbouwing
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  De Investeringssubsidie duurzame energie en energiebesparing (ISDE) maakt de aanschaf van een warmtepompboiler financieel zeer aantrekkelijk voor particuliere woningeigenaren. De ISDE-regeling valt onder het beheer van de Rijksdienst voor Ondernemend Nederland (RVO).
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Als installateur is het essentieel dat u uw klant van de juiste technische informatie voorziet om de subsidieaanvraag zonder vertraging te laten verlopen. Om in aanmerking te komen voor ISDE geldt een aantal voorwaarden:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li>
    <strong>Meldcode op de RVO-lijst:</strong> Het specifieke fabricaat en type warmtepompboiler moet vermeld staan op de actuele ISDE-meldcodelijst voor warmtepompen van RVO. Vermeld deze meldcode altijd expliciet op uw offerte en factuur.
  </li>
  <li>
    <strong>Professionele installatie:</strong> De installatie moet worden uitgevoerd door een deskundig installatiebedrijf. Zelfinstallatie door de consument is uitgesloten van subsidie.
  </li>
  <li>
    <strong>Nieuw apparaat:</strong> Het moet gaan om een nieuw product dat in de woning wordt geïnstalleerd als hoofdwoning of eigen woning van de aanvrager.
  </li>
  <li>
    <strong>Aanvraagtermijn:</strong> De klant moet de aanvraag indienen binnen de door RVO vastgestelde termijn na uitvoering van de werkzaamheden.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor de exacte en actuele subsidiebedragen en de geldende voorwaarden verwijst u de klant naar de officiële website van de <a href="https://www.rvo.nl" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Rijksdienst voor Ondernemend Nederland (rvo.nl)</a>. Door het juiste meldcodenummer direct op te nemen in uw verduurzamingsrapport ontzorgt u de klant volledig in de administratieve afhandeling. Lees voor aanvullende details over subsidievoorwaarden ook ons artikel over <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">ISDE-subsidie bij warmtepompen</a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Synergie met zonnepanelen en legionellapreventie
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een warmtepompboiler laat zich uitstekend combineren met een bestaande of nieuw aan te leggen zonnepaneleninstallatie. Aangezien een warmtepompboiler werkt als een thermische opslag (de vatinhoud van vaak 200 tot 300 liter warm water slaat energie op), kan het opwarmmoment slim gepland worden.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Door de boiler via een tijdklok of een SG Ready-stuurcontact overdag te laten draaien, benut de klant direct de eigen opgewekte zonnestroom. Dit verhoogt het percentage zelfconsumptie. Met het oog op de <a href="/blog/scop-warmtepomp-berekenen-stroomverbruik" className="text-brand-primary-text font-semibold hover:underline">berekening van het werkelijke stroomverbruik en de SCOP</a> is het sturen op eigenverbruik een belangrijke verkoopargumentatie.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Besteed in uw advies ook kort aandacht aan legionellapreventie. Warmtepompboilers verwarmen de inhoud doorgaans tot 50 tot 55 °C via de warmtepomp cyclus. Om te voldoen aan de hygiënevoorschriften beschikt het apparaat over een geïntegreerd elektrisch bijverwarmingselement dat periodiek (bijvoorbeeld wekelijks) de watertemperatuur automatisch verhoogt naar 60 tot 65 °C. Deze opwarmcyclus vraagt tijdelijk extra elektrisch vermogen, wat u mee kunt nemen in de totale jaarevaluatie.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stappenplan voor een onderbouwd warmtepompboiler-advies
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om een adviesgesprek voor een warmtepompboiler gestructureerd aan te pakken, gebruikt u de volgende vijf stappen:
</p>
<ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>Breng het huidige tapwatergebruik in kaart:</strong> Vraag naar de gezinsgrootte, de aanwezigheid van een regendouche of bad, en schat de huidige gasvraag voor warm water in.
  </li>
  <li>
    <strong>Bepaal de optimale opstellingsruimte en luchtbron:</strong> Controleer de beschikbare ruimte (gewicht gevuld vat) en bepaal of er gewerkt wordt met buitenlucht-, binnenlucht- of ventilatieluchtaanzuiging.
  </li>
  <li>
    <strong>Kies het juiste boilervolume:</strong> Match de capaciteit (bijvoorbeeld 200L of 270L) aan de gelijktijdige warmwaterbehoefte van het huishouden.
  </li>
  <li>
    <strong>Selecteer het apparaat op de RVO-meldcodelijst:</strong> Controleer de geldige meldcode voor het ISDE-traject en bereken de verwachte netto investering.
  </li>
  <li>
    <strong>Integreer het energieprofiel:</strong> Berekent de nettonameting van de gasbesparing minus het extra stroomverbruik, en koppel dit eventueel aan de zonnepanelen.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het los berekenen van een warmtepompboiler op een bierviltje of in een losse Excel-sheet kost tijd en maakt het lastig om het gecombineerde effect met bijvoorbeeld zonnepanelen of een hybride warmtepomp inzichtelijk te maken. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Binnen de rekensoftware van EnerCalculatie voegt u een warmtepompboiler eenvoudig toe aan het integrale energieprofiel van het klantdossier. De software berekent automatisch de verwachte gasbesparing op basis van de gezinsgrootte en verwerkt het bijbehorende extra elektriciteitsverbruik volgens de COP-karakteristieken van het gekozen systeem. Bovendien ziet uw klant in één oogopslag hoe de zonnestroomopwekting het verbruik van de boiler opvangt. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u zien hoe dit werkt binnen ons platform? Bekijk dan de functionaliteiten op de pagina over onze <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">warmtepomp software</a>.
</p>
    </BlogPostLayout>
  );
}
