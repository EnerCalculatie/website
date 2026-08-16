import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'vermogensgarantie-zonnepanelen-offerte')!;

export function VermogensgarantieZonnepanelenOfferteArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij het uitbrengen van een offerte voor zonnepanelen spelen garanties een doorslaggevende rol in het beslissingsproces van de klant. In de praktijk blijkt echter dat veel woningeigenaren en zakelijke opdrachtgevers de begrippen productgarantie en vermogensgarantie door elkaar halen. Zo wordt een vermogensgarantie van 25 jaar regelmatig misinterpreteerd als een garantie dat het paneel 25 jaar lang kosteloos wordt vervangen bij een defect. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Als professioneel installateur is het uw taak om dit misverstand weg te nemen en transparantie te bieden in uw adviesrapport. Een heldere vermelding van de garantievoorwaarden voorkomt niet alleen discussies achteraf, maar versterkt ook de bewijskracht van uw rendementsprognoses over de verwachte levensduur. In dit artikel behandelen we de technische details van beide garantievormen, de relevante IEC-normen en de wijze waarop u een vermogensgarantie in uw zonnepanelen offerte verwerkt.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Het verschil kort samengevat: productgarantie versus vermogensgarantie
</h2>

<div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-6">
  <h3 className="text-lg font-bold text-slate-800 mb-2">TL;DR / Quick Reference</h3>
  <p className="text-slate-700 text-sm leading-relaxed mb-2">
    <strong>Productgarantie (12 tot 30 jaar):</strong> Dekt de materiële en fysieke integriteit van het zonnepaneel. Garandeert dat de module vrij is van constructiefouten, delaminatie, celbreuk of vochtindringing.
  </p>
  <p className="text-slate-700 text-sm leading-relaxed">
    <strong>Vermogensgarantie (25 tot 30 jaar):</strong> Garandeert de minimale stroomopbrengst op basis van een lineaire degradatiecurve onder Standaard Test Condities (STC). Dekt geen fysieke defecten, maar borgt de elektrische opbrengst over een lange termijn.
  </p>
</div>

<p className="text-slate-700 leading-relaxed mb-4">
  Het fundamentele onderscheid ligt in de oorzaak van het prestatieverlies. Wanneer een zonnepaneel helemaal geen stroom meer levert vanwege een gebroken junction box of doorgeslagen soldeerverbinding, valt dit onder de productgarantie. Wanneer een paneel fysiek intact is, maar na 15 jaar nog slechts 88% van het oorspronkelijke piekvermogen (Wattpiek) levert, valt dit onder de vermogensgarantie.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Productgarantie: materiaal, fabricage en de rol van IEC-normeringen
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  De productgarantie (ook wel fabrieksgarantie genoemd) garandeert dat de hardware naar behoren functioneert. De termijn varieert sterk per fabrikant en type paneel (glass-backsheet versus glass-glass). Waar traditionele panelen vaak 12 tot 15 jaar productgarantie bieden, loopt dit bij moderne glas-glas modules op tot 25 of zelfs 30 jaar.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Om de betrouwbaarheid van de productgarantie te onderbouwen richting uw klant, is het raadzaam te verwijzen naar internationale IEC-kwaliteitsnormen. Brancheorganisaties zoals Techniek Nederland en keuringsinstanties adviseren te controleren of modules voldoen aan de volgende certificeringen:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>IEC 61215:</strong> De internationale norm voor ontwerpkwalificatie en typegoedkeuring van terrestrische PV-modules. Deze norm test de bestandheid van zonnepanelen tegen klimatologische omstandigheden zoals hagelinslag, thermische cycli, vocht-vriesbelasting en mechanische druk (zoals wind- en sneeuwbelasting).
  </li>
  <li className="mb-2">
    <strong>IEC 61730:</strong> De kwalificatienorm voor de elektrische, thermische en mechanische veiligheid van PV-modules om het risico op elektrische schokken, brand en persoonlijk letsel gedurende de levensduur te minimaliseren.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Een essentieel aandachtspunt in de advisering rondom productgaranties betreft de aanvullende kosten. De productgarantie van een fabrikant dekt vrijwel uitsluitend de levering van een vervangende module of een vervangend onderdeel. De arbeidskosten voor het lokaliseren van de storing, de de-installatie van het defecte paneel, de herinstallatie én eventuele veiligheidsvoorzieningen (zoals steigerhuur) worden door de fabrikant in de regel niet vergoed. U doet er verstandig aan dit onderscheid expliciet te benoemen door uw eigen installatiegarantie (de dekking op de montage en bekabeling) los te koppelen van de fabrieksgarantie.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Vermogensgarantie: lineaire degradatie en Standaard Test Condities (STC)
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Zonnepanelen verliezen in de loop der jaren geleidelijk een klein deel van hun vermogen door natuurlijke veroudering van het siliconenmateriaal en de EVA-folie. Dit verschijnsel heet vermogensdegradatie. De vermogensgarantie borgt dat dit verval binnen vooraf gedefinieerde grenzen blijft.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Fabrikanten hanteren tegenwoordig vrijwel altijd een <em>lineaire vermogensgarantie</em>. Dit betekent dat de minimale vermogensafgifte elk jaar met een vast, klein percentage mag afnemen. Een realistisch degradatieprofiel voor hoogwaardige modules ziet er als volgt uit:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Eerste jaar:</strong> Een initiële declassering van 1,0% tot 2,0% als gevolg van Light-Induced Degradation (LID) zodra de zonnecellen voor het eerst aan zonlicht worden blootgesteld.
  </li>
  <li className="mb-2">
    <strong>Jaar 2 tot en met 25 of 30:</strong> Een jaarlijkse degradatie tussen 0,25% (bij hoogwaardige glas-glas of N-Type TOPCon/HJT panelen) en 0,55% (bij traditionele P-Type PERC panelen).
  </li>
  <li className="mb-2">
    <strong>Eindgarantie (na 25-30 jaar):</strong> Een gegarandeerd resterend vermogen van minimaal 85% tot 92% van het oorspronkelijke nominale vermogen (STC).
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Het vermogen van een paneel wordt gemeten onder Standaard Test Condities (STC: een celtemperatuur van 25°C, een instraling van 1000 W/m² en een lichtspectrum van AM 1,5). Mocht een klant vermoeden dat een paneel onder de gegarandeerde vermogenswaarde presteert, dan vereist de fabrikant een geijkte flashtest om de claim te onderbouwen. Omdat een mobiele flashtest op locatie kostbaar is, is het raadzaam in uw adviesgesprek uit te leggen dat vermogensgarantie primair dient als kwaliteitsindicator voor de meerjarige opbrengstberekening, en minder als een direct inroepbare dagelijkse claim.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Vergelijkingstabel: de drie garantievormen in uw advies rapport
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om verwarring in uw offertes en adviesrapporten te voorkomen, kunt u onderstaand overzicht opnemen in de bijlage van uw voorstel:
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 text-slate-800">
        <th className="border border-slate-300 p-3 text-left font-bold">Garantievorm</th>
        <th className="border border-slate-300 p-3 text-left font-bold">Dekking</th>
        <th className="border border-slate-300 p-3 text-left font-bold">Gebruikelijke termijn</th>
        <th className="border border-slate-300 p-3 text-left font-bold">Verantwoordelijke partij</th>
      </tr>
    </thead>
    <tbody className="text-slate-700">
      <tr>
        <td className="border border-slate-300 p-3 font-semibold">Productgarantie</td>
        <td className="border border-slate-300 p-3">Materiaal- en fabricagefouten (geen stroomafgifte, fysieke schade)</td>
        <td className="border border-slate-300 p-3">12 – 30 jaar</td>
        <td className="border border-slate-300 p-3">Fabrikant van het zonnepaneel</td>
      </tr>
      <tr className="bg-slate-50">
        <td className="border border-slate-300 p-3 font-semibold">Vermogensgarantie</td>
        <td className="border border-slate-300 p-3">Minimale stroomopbrengst (Wattpiek) onder STC-condities volgens degradatiecurve</td>
        <td className="border border-slate-300 p-3">25 – 30 jaar</td>
        <td className="border border-slate-300 p-3">Fabrikant van het zonnepaneel</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-semibold">Installatiegarantie</td>
        <td className="border border-slate-300 p-3">Montage, dakdoorvoer, bekabeling, omvormeraansluiting en arbeidskosten</td>
        <td className="border border-slate-300 p-3">2 – 10 jaar</td>
        <td className="border border-slate-300 p-3">Installatiebedrijf (uw onderneming)</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe verwerkt u garanties transparant in uw offertes en rendementsberekening?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een professioneel adviesrapport onderscheidt zich door de mate waarin garanties niet alleen als verkoopargument worden genoemd, maar ook rekenkundig worden onderbouwd. Wanneer u een rendementsberekening maakt over een periode van 10, 20 of 25 jaar, is het onjuist om te rekenen met een constante jaarlijkse kilowattuur-opbrengst. 
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Indien u geen rekening houdt met de jaarlijkse vermogensdegradatie, schept u een te optimistische verwachting over de totale energieproductie op lange termijn. Combineer deze degradatie-factor altijd met omgevingsfactoren zoals oriëntatie, hellingshoek en eventuele schaduwval. Wilt u hier dieper op ingaan? Lees dan ook ons artikel over{' '}
  <a href="/blog/rendementsverlies-schaduw-vervuiling-zonnepanelen" className="text-brand-primary-text font-semibold hover:underline">
    rendementsverlies door schaduw en vervuiling
  </a>
  {' '}en de invloed van{' '}
  <a href="/blog/dakorientatie-zonnepanelen-opbrengst" className="text-brand-primary-text font-semibold hover:underline">
    dakoriëntatie en hellingshoek
  </a>
  .
</p>

<p className="text-slate-700 leading-relaxed mb-4">
  Hanteer bij het opstellen van uw offerte de volgende drie praktische richtlijnen:
</p>
<ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>Splits de garanties expliciet in het rapport:</strong> Vermeld op de specificatiepagina afzonderlijk de productgarantie, de vermogensgarantie (inclusief het percentage na 25 jaar) en uw eigen installatiegarantie.
  </li>
  <li>
    <strong>Pas de degradatiefactor toe in de cashflow:</strong> Zorg dat het rekenmodel de jaarlijkse stroomproductie in stapjes laat afnemen volgens de specificaties van het gekozen paneel.
  </li>
  <li>
    <strong>Licht de randvoorwaarden toe:</strong> Vermeld kort dat aanspraak op fabrieksgarantie vereist dat de installatie is aangelegd volgens de geldende normen (zoals NEN 1010 en NEN-EN-IEC 62446) en de installatievoorschriften van de fabrikant.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het handmatig verwerken van verschillende degradatiecurves en garantievoorwaarden per paneeltype in Excel-spreadsheets kost veel tijd en verhoogt de kans op menselijke rekenfouten. Met de rekensoftware van EnerCalculatie wordt dit proces gestroomlijnd.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het rekenmodel van EnerCalculatie past de specifieke vermogensdegradatie van het geselecteerde zonnepaneel automatisch toe op de meerjarige opbrengstprognose over 10 en 25 jaar. De berekende kilowatturen over de gehele levensduur zijn hierdoor deterministisch onderbouwd en sluiten aan op het advies dat u aan uw klant presenteert. Bovendien worden de product- en vermogensgaranties netjes en overzichtelijk gepresenteerd in het digitale adviesrapport.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u ontdekken hoe u binnen vijf minuten een onderbouwd verduurzamingsrapport opstelt inclusief kloppende rendementsprognoses? Bekijk de mogelijkheden van de{' '}
  <a href="/rekentool-zonnepanelen" className="text-brand-primary-text font-semibold hover:underline">
    rekentool zonnepanelen
  </a>
  {' '}of lees meer over onze{' '}
  <a href="/blog/geautomatiseerd-verduurzamingsrapport-software" className="text-brand-primary-text font-semibold hover:underline">
    geautomatiseerde verduurzamingsrapport software
  </a>
  .
</p>
    </BlogPostLayout>
  );
}
