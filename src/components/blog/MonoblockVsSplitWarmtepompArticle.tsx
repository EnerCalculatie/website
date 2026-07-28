import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'monoblock-vs-split-warmtepomp')!;

export function MonoblockVsSplitWarmtepompArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer u een klant adviseert over de verduurzaming van de woning met een lucht-waterwarmtepomp, staat u al vroeg in het opnametraject voor een principiële technische keuze: adviseert u een monoblock of een split-warmtepomp? Beide systeemtypen benutten de buitenlucht als energiebron om het CV-water te verwarmen, maar hun opbouw, bouwkundige impact, installatetechnische randvoorwaarden en certificeringseisen verschillen grondig.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor een eindklant is de keuze tussen een monoblock en een split vaak abstract. Vragen over de afmetingen van de kasten op het dak of aan de gevel, de ruimte in de bijkeuken, geluid richting de buren en mogelijke meerkosten komen in bijna elk adviesgesprek terug. Om van een vrijblijvende opname naar een onderbouwde en door de klant geaccepteerde offerte te komen, moet u de technische en praktische afwegingen van het vergelijk <strong>monoblock vs split warmtepomp</strong> helder kunnen vertalen naar het specifieke pand van uw klant.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Monoblock vs split warmtepomp: de technische hoofdverschillen
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het fundamentele verschil tussen een monoblock en een split-warmtepomp zit in het koudemiddelcircuit en de locatie waar de warmteoverdracht naar het CV-water plaatsvindt:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Monoblock warmtepomp:</strong> Het complete koudemiddelcircuit — inclusief de compressor, verdamper, condensor (warmtewisselaar) en het expansieventiel — bevindt zich volledig af fabriek in de buiteneenheid. Vanuit de buiteneenheid lopen uitsluitend waterzijdige CV-leidingen (aanvoer en retour) de woning in.
  </li>
  <li className="mb-2">
    <strong>Split-warmtepomp:</strong> Het koudemiddelcircuit is opgesplitst over twee afzonderlijke eenheden. De buiteneenheid herbergt de compressor en verdamper, terwijl de binneneenheid de condensor (platenwisselaar) bevat. Tussen de buiten- en binneneenheid lopen dunne koudemiddelleidingen waar onder hoge druk koudemiddel doorheen stroomt.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Dit verschil in opbouw heeft directe consequenties voor de fysieke afmetingen van de apparatuur. Een monoblock buiteneenheid is doorgaans omvangrijker en zwaarder omdat de complete hydro-module en de warmtewisselaar buiten geïntegreerd zijn. Daar staat tegenover dat de binneneenheid van een monoblock minimaal is: vaak volstaat een compact regelsysteem of een kleine wandhangende module. Bij een split-systeem is de buiteneenheid compacter en lichter, maar eist de binneneenheid aanzienlijk meer vloer- of wandoppervlak op in het pand.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Certificering en installatie-eisen: F-gassen versus waterzijdig
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor installatiebedrijven is de keuze tussen een monoblock en een split-systeem vaak ook een operationeel vraagstuk rondom certificering en capaciteit.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij het installeren van een split-warmtepomp worden de koudemiddelleidingen op locatie aangelegd, gesoldeerd of met flare-verbindingen aangesloten, afgeperst met stikstof, vacumeerd en eventueel bijgevuld met extra koudemiddel. Deze handelingen aan een niet-hermetisch gesloten koudemiddelcircuit mogen volgens Europese F-gassenregelgeving uitsluitend worden uitgevoerd door monteurs met een persoonlijk F-gassencertificaat (voorheen STEK), werkzaam bij een F-gassen gecertificeerd bedrijf.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een monoblock warmtepomp verlaat de fabriek daarentegen als een hermetisch gesloten eenheid. Omdat u bij het aansluiten van een monoblock uitsluitend werkzaamheden verricht aan het waterzijdige traject (de CV-leidingen), is een F-gassencertificaat voor deze montagewerkzaamheden niet wettelijk vereist. Dit maakt het monoblock bijzonder populair bij traditionele installatiebedrijven die (nog) geen certified F-gassenmonteurs in dienst hebben of hun F-gassen specialisten efficiënter willen inzetten.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Geluid, ruimte en bouwkundige inpassing
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij het adviseren van een particuliere klant vormen de plaatsingsmogelijkheden en de akoestische impact op de omgeving cruciale beslissingsfactoren.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Omdat bij een monoblock alle mechanische componenten — waaronder de compressor — buiten opgesteld staan, vraagt de akoestische inpassing extra aandacht. Sinds het Bouwbesluit strenge wettelijke geluidsnormen stelt aan buitenopgestelde installaties voor warmte- of koudeopwekking (maximaal 40 dB op de perceelgrens 's nachts), is een juiste afstandsberekening en positionering essentieel. Meer informatie over het berekenen van de geluidsbelasting leest u in ons artikel over{' '}
  <a href="/blog/geluidsnorm-warmtepomp-buiteneenheid-advies" className="text-brand-primary-text font-semibold hover:underline">
    geluidsnormen en plaatsing van de buiteneenheid
  </a>.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Naast geluid speelt de bouwkundige leidingloop een rol:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Leidingdiameter:</strong> Een monoblock vereist waterleidingen van de buiteneenheid naar de binnenopstelling. Om de vereiste volumestroom (debiet) te waarborgen, zijn hiervoor leidingdiameters van bijvoorbeeld 28 mm of meer nodig, wat dikke muurdoorvoeren vereist. Een split-systeem maakt gebruik van dunne koudemiddelleidingen (bijvoorbeeld 1/4" en 1/2"), wat het doorvoeren door gevels of schuine daken aanzienlijk vergemakkelijkt.
  </li>
  <li className="mb-2">
    <strong>Afstand tussen binnen en buiten:</strong> Bij een split-systeem kunnen, afhankelijk van het type en fabricaat, grotere afstanden en hoogteverschillen tussen binnen- en buiteneenheid worden overbrugd zonder dat dit ten koste gaat van de stromingsweerstand van het CV-water.
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Rendement, transportverlies en vorstbeveiliging
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Op papier behalen zowel monoblock- als split-warmtepompen uitstekende SCOP-waarden (Seasonal Coefficient of Performance). Toch zijn er in het daadwerkelijke jaarrendement subtiele verschillen die worden veroorzaakt door het leidingtraject buiten de woning.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij een monoblock stroomt opgewarmd CV-water door de buitenleidingen van de buiteneenheid naar het pand. Onvoldoende geïsoleerde buitenleidingen leiden direct tot stilstands- en transportverliezen, zeker bij lage buitentemperaturen. Een nauwkeurige onderbouwing van de verwachte energieopbrengst stelt eisen aan de aannames die u hanteert in de berekening; zie hiervoor ons overzicht van{' '}
  <a href="/blog/scop-warmtepomp-berekenen-stroomverbruik" className="text-brand-primary-text font-semibold hover:underline">
    SCOP-waardes en het berekenen van het extra stroomverbruik
  </a>.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Bovendien vraagt een monoblock om doordachte maatregelen tegen bevriezingsgevaar. Bij een langdurige netstroomuitval tijdens een strenge vorstperiode kan het stilstaande water in het buitenleidingwerk bevriezen, met ernstige leiding- of wisselaarschade tot gevolg. U dient in de offerte daarom altijd rekening te houden met een van de volgende vorstbeveiligingsmethoden:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Vorstbeveiligingskleppen:</strong> Mechanische kleppen die reageren op de watertemperatuur en het buitenwater gecontroleerd laten spuien wanneer het vriespunt wordt genaderd.
  </li>
  <li className="mb-2">
    <strong>Glycolmengsel:</strong> Het toevoegen van glycol aan de CV-installatie (of aan een gescheiden circuit met een secundaire platenwisselaar), wat de bevriezingsgrens verlaagt maar de warmtecapaciteit en pomp-efficiëntie marginaal kan beïnvloeden.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij een split-warmtepomp bevindt het CV-water zich uitsluitend binnen de thermische schil van de woning. Er stroomt alleen koudemiddel door de buitenleidingen, waardoor bevriezingsrisico van leidingen bij stroomuitval uitgesloten is.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Vergelijkingstabel: Monoblock vs Split in de praktijk
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Onderstaande tabel geeft een overzicht van de belangrijkste kenmerken op basis waarvan u de keuze in uw adviesgesprek kunt structureren:
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 text-slate-800">
        <th className="border border-slate-300 p-3 text-left font-semibold">Eigenschap</th>
        <th className="border border-slate-300 p-3 text-left font-semibold">Monoblock Warmtepomp</th>
        <th className="border border-slate-300 p-3 text-left font-semibold">Split Warmtepomp</th>
      </tr>
    </thead>
    <tbody className="text-slate-700">
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Koudemiddelcircuit</td>
        <td className="border border-slate-300 p-3">Volledig in de buiteneenheid (gesloten)</td>
        <td className="border border-slate-300 p-3">Verdeeld over binnen- en buiteneenheid</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">F-gassen certificaat vereist</td>
        <td className="border border-slate-300 p-3">Nee (alleen waterzijdige montage)</td>
        <td className="border border-slate-300 p-3">Ja (voor aansluiten en inbedrijfstellen)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Omvang buiteneenheid</td>
        <td className="border border-slate-300 p-3">Groter en zwaarder</td>
        <td className="border border-slate-300 p-3">Compacter en lichter</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Omvang binneneenheid</td>
        <td className="border border-slate-300 p-3">Zeer compact (hydrobox of wandmodule)</td>
        <td className="border border-slate-300 p-3">Groter (bevat condensor en besturing)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Leidingtype door de gevel</td>
        <td className="border border-slate-300 p-3">Waterleidingen (grotere diameter, geïsoleerd)</td>
        <td className="border border-slate-300 p-3">Koudemiddelleidingen (kleine diameter)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Bevriezingsrisico bij stroomuitval</td>
        <td className="border border-slate-300 p-3">Ja (vereist vorstbeveiligingskleppen of glycol)</td>
        <td className="border border-slate-300 p-3">Nee (koudemiddel bevriest niet)</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Maximale afstand binnen-buiten</td>
        <td className="border border-slate-300 p-3">Beperkter (i.v.m. drukval over waterleiding)</td>
        <td className="border border-slate-300 p-3">Groter (afhankelijk van koudemiddelvulling)</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe onderbouwt u de keuze transparant in de offerte?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om te voorkomen dat uw offerte een kille prijsopgave wordt waarna de klant afhaakt op basis van onduidelijkheid over het fysieke resultaat, adviseert u het keuzeproces op te bouwen in vier heldere stappen in uw adviesrapport:
</p>
<ol className="list-decimal pl-6 mb-6 text-slate-700">
  <li className="mb-3">
    <strong>Analyseer de beschikbare ruimte binnen en buiten:</strong> Heeft de klant een krappe wasruimte maar voldoende ruimte in de tuin of op het platte dak? Dan is een monoblock op basis van ruimtegebruik de logische winnaar. Is de tuin klein en staat de buiteneenheid dicht bij de perceelgrens, maar is er binnen een ruime installatieruimte? Dan heeft een compacte split-buiteneenheid vaak de voorkeur.
  </li>
  <li className="mb-3">
    <strong>Toon de bouwkundige impact:</strong> Leg in de offerte helder uit welk type leidingwerk aangelegd moet worden en welke doorvoeren nodig zijn. Transparantie over muurbeugels, dakdoorvoeren en leidinggoten voorkomt discussies op de installatiedag.
  </li>
  <li className="mb-3">
    <strong>Koppel de keuze aan de subsidievoorwaarden:</strong> Controleer voor beide opties of het exacte type voorkomt op de actuele ISDE-meldcodelijst van de RVO. Uw klant wil de zekerheid dat de gekozen configuratie recht geeft op ISDE-subsidie. Zie ook onze gids over{' '}
    <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">
      de vereiste technische onderbouwing voor ISDE-aanvragen
    </a>.
  </li>
  <li className="mb-3">
    <strong>Onderbouw het energetische totaalplaatje:</strong> Presenteer niet alleen de warmtepomp op zichzelf, maar toon het verwachte elektriciteitsverbruik in combinatie met het eventuele rendement van zonnepanelen of de impact van een bestaande CV-ketel in een hybride opstelling.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het vergelijken van systeemtypen en het doorrekenen van de juiste dimensies kost in traditionele rekenmodellen en Excel-sheets vaak veel tijd. Met de rekensoftware van EnerCalculatie onderbouwt u het advies voor zowel monoblock- als split-warmtepompen deterministisch en snel.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  In de <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">rekentool warmtepomp</a> voert u de woningkenmerken, de gewenste stooklijn en het energieprofiel in. De software berekent vervolgens het benodigde vermogen, verwerkt de technische specificaties van het geselecteerde type en genereert automatisch de complete onderbouwing voor de ISDE-subsidieaanvraag op het adviesrapport. Hierdoor levert u uw klant binnen enkele minuten een professioneel, begrijpelijk en geautomatiseerd verduurzamingsrapport dat de gemaakte keuzes feitelijk onderbouwt.
</p>
    </BlogPostLayout>
  );
}
