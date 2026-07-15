import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'stroomstoring-zonnepanelen-thuisbatterij')!;

export function StroomstoringZonnepanelenThuisbatterijArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Een standaard zonnepanelen- en thuisbatterijsysteem doet bij een netuitval namelijk helemaal niets. Om uw klanten tijdens een stroomstoring wél van energie te voorzien, is een specifieke back-upoplossing nodig, zoals een EPS of een volledige eilandmodus. In dit artikel leest u wat dit technisch vereist en hoe u dit goed meeneemt in uw installatieadvies.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Zonder extra voorzieningen is de netgekoppelde omvormer verplicht uit te schakelen zodra de spanning van de netbeheerder wegvalt. Dit mechanisme beschermt monteurs die aan het net werken. Klanten die expliciet om onafhankelijkheid vragen tijdens storingen, hebben dus hardware-uitbreidingen nodig. Dit vraagt om nauwkeurige afstemming in de groepenkast en duidelijke communicatie over de capaciteit.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Belangrijke vaktermen bij noodstroom
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om de materie helder te kunnen uitleggen aan de eindklant en correct aan te sluiten in uw systeemontwerp, is het belangrijk om drie concepten strikt van elkaar te scheiden:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2"><strong>Anti-islanding:</strong> De beveiligingsfunctie in een omvormer die detecteert dat het elektriciteitsnet is uitgevallen, waarna het systeem stopt met het leveren van stroom. Dit voorkomt dat het systeem stroom op het net blijft injecteren ('eilandbedrijf' op het publieke net).</li>
  <li className="mb-2"><strong>EPS (Emergency Power Supply):</strong> Een specifieke, vaak in de hybride omvormer ingebouwde uitgang, die stroom levert aan geselecteerde apparaten (bijvoorbeeld een koelkast of enkele lampen) wanneer het hoofdnet uitvalt.</li>
  <li className="mb-2"><strong>ATS (Automatic Transfer Switch):</strong> Een externe omschakelautomaat in of bij de groepenkast. Deze schakelt de gehele woning fysiek af van het openbare net. Pas daarna mogen omvormer en batterij de interne huisinstallatie voeden.</li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De wettelijke kaders: Netcode en NEN-EN 50549-1
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  De verplichte uitschakeling bij een netstoring (anti-islanding) is geen beperking van de fabrikant, maar wordt direct afgedwongen door de <em>Netcode elektriciteit</em> en de Europese norm <em>NEN-EN 50549-1</em> (voorheen NEN-EN 50438). Deze normen bepalen de eisen voor productie-installaties die parallel aan het distributienet draaien.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Netbeheer Nederland stelt strenge eisen aan deze beveiliging om de veiligheid van netwerkmonteurs te waarborgen. Zodra zij de stroom in een wijk afschakelen voor reparaties, mag geen enkele lokale PV-installatie spanning terugleveren. Daarom is eilandbedrijf alleen toegestaan als de huisinstallatie via een goedgekeurde scheidingsschakelaar (zoals een ATS) honderd procent gegarandeerd is losgekoppeld van het netbeheerdersdomein.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  EPS versus Volledig Eilandbedrijf (ATS)
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Installateurs kunnen klanten met een noodstroomwens grofweg twee oplossingen bieden. De verschillen in kosten, installatiewerk en comfort zijn aanzienlijk.
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr>
        <th className="bg-slate-100 border border-slate-300 p-3 text-left font-semibold text-slate-800">Eigenschap</th>
        <th className="bg-slate-100 border border-slate-300 p-3 text-left font-semibold text-slate-800">EPS (Emergency Power Supply)</th>
        <th className="bg-slate-100 border border-slate-300 p-3 text-left font-semibold text-slate-800">Volledig Eilandbedrijf (via ATS)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700 font-medium">Dekking</td>
        <td className="border border-slate-300 p-3 text-slate-700">Slechts één of enkele geselecteerde stopcontacten / groepen.</td>
        <td className="border border-slate-300 p-3 text-slate-700">De gehele groepenkast (binnen de vermogensgrenzen van de omvormer).</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700 font-medium">Net-ontkoppeling</td>
        <td className="border border-slate-300 p-3 text-slate-700">Intern in de omvormer gescheiden. Hoofdinstallatie valt uit.</td>
        <td className="border border-slate-300 p-3 text-slate-700">Externe, automatische omschakelaar (ATS) direct achter de hoofdschakelaar.</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700 font-medium">Installatie-impact</td>
        <td className="border border-slate-300 p-3 text-slate-700">Lager. U trekt een aparte kabel vanaf de EPS-poort naar een separaat kastje.</td>
        <td className="border border-slate-300 p-3 text-slate-700">Hoog. Vereist ingrijpende aanpassingen en vaak herstructurering van de groepenkast.</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700 font-medium">Kosten</td>
        <td className="border border-slate-300 p-3 text-slate-700">Grotendeels inbegrepen bij hybride omvormers (excl. kleinmateriaal en arbeid).</td>
        <td className="border border-slate-300 p-3 text-slate-700">Significante extra hardware-investering (ATS) plus installatie-uren.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Beheer de verwachtingen van de klant
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer een klant kiest voor een thuisbatterij met noodstroomfunctionaliteit, ontstaat al snel de illusie van totale zelfvoorziening. Een eerlijk adviesgesprek voorkomt teleurstelling achteraf. Bespreek de volgende technische grenzen duidelijk:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2"><strong>Restcapaciteit:</strong> Een stroomstoring komt onverwacht. Valt de stroom uit op een winterse avond en is de batterij overdag niet volgeladen door de zonnepanelen? Dan biedt de back-up slechts zeer kort verlichting. Optioneel kan de batterij zo worden geprogrammeerd dat er structureel een minimumpercentage (bijvoorbeeld 10 tot 20 procent) wordt vastgehouden als noodreserve, maar dit gaat ten koste van het dagelijkse rendement op zelfconsumptie.</li>
  <li className="mb-2"><strong>Piekvermogen:</strong> De omvormer en de batterij kunnen slechts een maximaal vermogen leveren (vaak enkele kilowatts). Bij een ATS-opstelling waarbij het hele huis gevoed wordt, slaan zware verbruikers zoals warmtepompen, inductiekookplaten of autoladers het systeem direct in storing door overbelasting.</li>
  <li className="mb-2"><strong>Black start-functionaliteit:</strong> Een batterij is na langdurige uitval op den duur leeg. Alleen omvormers met een 'black start'-functie kunnen de zonnepanelen de volgende ochtend zonder netspanning opstarten om de batterij weer op te laden. Niet elk merk ondersteunt dit standaard.</li>
  <li className="mb-2"><strong>Veilige aarding (TT-stelsel):</strong> In regulier bedrijf vertrouwt de aardlekschakelaar op de aarding van de netbeheerder. Bij eilandbedrijf vervalt deze referentie. Om te waarborgen dat de aardlekschakelaars (en daarmee de persoonsbeveiliging) blijven functioneren, moet er lokaal een degelijke aardpen geslagen worden waaraan het sterpunt van de omvormer of de ATS gekoppeld wordt.</li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het verkopen van een thuisbatterij draait primair om het maximaliseren van zelfconsumptie en het reduceren van terugleverkosten; de back-up is in Nederland doorgaans een secundaire 'peace of mind'-feature. Om de klant hierin eerlijk te adviseren, is een juiste afstemming van de batterijgrootte essentieel.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Met onze <a href="/rekentool-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">rekentool voor thuisbatterijen</a> dimensioneert u de opslagcapaciteit op basis van het werkelijke opwek- en verbruiksprofiel van de woning. Dit geeft direct inzicht in de cycli en voorkomt dat u een batterij adviseert die overdag structureel onderbenut blijft, of 's avonds veel te vroeg leeg is. Meer achtergrondinformatie over het <a href="/blog/thuisbatterij-capaciteit-kiezen" className="text-brand-primary-text font-semibold hover:underline">bepalen van de juiste thuisbatterij-capaciteit</a> leest u eveneens in onze kennisbank.
</p>
    </BlogPostLayout>
  );
}
