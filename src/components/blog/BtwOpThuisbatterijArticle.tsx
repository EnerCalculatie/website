import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'btw-op-thuisbatterij')!;

export function BtwOpThuisbatterijArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  De markt voor energieopslag ontwikkelt zich in een razend tempo. Sinds de daling van de residentiële zonne-energiemarkt en de naderende afschaffing van de salderingsregeling, kijken steeds meer consumenten naar een thuisbatterij. Een van de meest gestelde vragen in het adviesgesprek is: "Hoe zit het met de btw op een thuisbatterij?" Als installateur bent u de eerste gesprekspartner voor uw klant. Hoewel u geen fiscaal adviseur bent, is een basisbegrip van de fiscale spelregels rondom de btw op een thuisbatterij cruciaal om uw klant professioneel te begeleiden en uw offerteconversie te verhogen. In dit artikel leggen we de spelregels, de voorwaarden voor btw-teruggave en de belangrijkste valkuilen voor u uit.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Het verschil tussen zonnepanelen en de thuisbatterij
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om te begrijpen hoe de btw op een thuisbatterij werkt, moeten we eerst kijken naar de wetgeving voor zonnepanelen. Sinds 1 januari 2023 geldt in Nederland het btw-nultarief voor de levering en installatie van zonnepanelen op of in de onmiddellijke nabijheid van woningen. Dit nultarief is destijds ingevoerd om de administratieve lasten voor zowel de burger als de Belastingdienst te verminderen. Voor meer informatie hierover kunt u ons artikel over het{' '}
  <a href="/blog/btw-zonnepanelen" className="text-brand-primary-text font-semibold hover:underline">
    btw-nultarief op zonnepanelen
  </a>{' '}
  lezen.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor de thuisbatterij geldt dit nultarief helaas niet. Een thuisbatterij valt onder het standaard btw-tarief. Dit betekent dat u op uw offerte en factuur altijd het standaardtarief aan btw moet rekenen over de batterij, de omvormer (indien specifiek voor de batterij) en de installatiewerkzaamheden. Wel kan de particuliere eindklant onder bepaalde voorwaarden deze btw achteraf volledig terugvragen bij de Belastingdienst.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De fiscale voorwaarden voor btw-teruggave
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Hoe kan een particulier de btw op een thuisbatterij terugvragen? De Belastingdienst stelt hieraan strikte voorwaarden. De kern van de regeling draait om het begrip 'btw-ondernemerschap'. Een particulier wordt door de Belastingdienst als btw-ondernemer aangemerkt als hij of zij structureel en tegen vergoeding handelingen verricht op de energiemarkt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Om in aanmerking te komen voor btw-teruggave moet de klant aan de volgende criteria voldoen:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Dynamisch energiecontract:</strong> De klant moet beschikken over een dynamisch energiecontract. Bij een dergelijk contract variëren de stroomprijzen per uur. Dit is essentieel omdat de batterij hiermee actief kan laden wanneer de stroomprijzen laag (of negatief) zijn, en kan ontladen (terugleveren) wanneer de stroomprijzen hoog zijn.
  </li>
  <li className="mb-2">
    <strong>Slimme aansturing:</strong> De batterij moet worden aangestuurd door een slim energiemanagementsysteem dat daadwerkelijk stroom inkoopt en verkoopt op basis van de markttarieven. Dit toont aan dat de batterij wordt gebruikt om winst te genereren, wat de basis vormt voor het btw-ondernemerschap.
  </li>
  <li className="mb-2">
    <strong>Geen actieve KOR-registratie:</strong> De Kleineondernemersregeling (KOR) kan roet in het eten gooien. Als de klant al in de KOR zit, is het terugvragen van btw in principe uitgesloten.
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Waarom een dynamisch contract de sleutel is
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  De Belastingdienst stelt dat de thuisbatterij moet worden gebruikt voor 'actieve handel'. Als een batterij puur wordt gebruikt om de eigen opgewekte zonnestroom op te slaan voor later gebruik (passieve zelfconsumptie), dan is er fiscaal gezien geen sprake van ondernemerschap. De btw op de thuisbatterij is in dat geval niet aftrekbaar of terugvorderbaar.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Zodra de klant de batterij echter laadt met goedkope stroom van het net om deze op een later moment tegen een hogere prijs terug te leveren, is er sprake van een economische activiteit. De klant levert hiermee een dienst aan het elektriciteitsnet (het leveren van flexibiliteit) en treedt op als energieleverancier. Dit maakt de weg vrij voor de btw-teruggave. Voor de installateur is het dus van belang om in het adviesgesprek te benadrukken dat de keuze voor een specifieke contractvorm direct invloed heeft op de terugverdientijd van de investering.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De Kleineondernemersregeling (KOR) als valkuil
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  De grootste fiscale hobbel bij de btw op een thuisbatterij is de Kleineondernemersregeling (KOR). Veel klanten die nu een thuisbatterij overwegen, hebben in het verleden al zonnepanelen aangeschaft. Als zij dit vóór de invoering van het nultarief hebben gedaan, hebben zij destijds waarschijnlijk al de btw op de zonnepanelen teruggevraagd.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij die teruggave zijn zij destijds automatisch aangemeld voor de KOR om te voorkomen dat zij jaarlijks btw-aangifte moesten doen over de teruggeleverde stroom. De KOR is een vrijstelling van de btw-plicht. Hoewel dit destijds handig was, heeft dit nu grote gevolgen:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Uitsluiting van teruggave:</strong> Iemand die in de KOR zit, kan in principe geen btw terugvragen op nieuwe investeringen, zoals een thuisbatterij.
  </li>
  <li className="mb-2">
    <strong>Minimale looptijd:</strong> Deelname aan de KOR duurt ten minste drie jaar. Pas na deze periode kan de klant zich eventueel weer afmelden om opnieuw btw-ondernemer te worden voor de thuisbatterij.
  </li>
  <li className="mb-2">
    <strong>Herzieningstermijn:</strong> Het afmelden voor de KOR kan leiden tot een herziening van de eerder teruggevraagde btw op de zonnepanelen, hoewel dit in de praktijk bij residentiële systemen vaak binnen de grens van de herzieningsvrijstelling blijft.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Het is van cruciaal belang dat u uw klant adviseert om de persoonlijke situatie te controleren bij de Belastingdienst of een belastingconsulent voordat de handtekening onder de offerte wordt gezet.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Vergelijkingstabel fiscale scenario's
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om u te helpen deze complexe materie helder uit te leggen aan uw klanten, hebben we de verschillende scenario's in een overzichtelijke tabel gezet. Hierin ziet u direct wanneer btw-teruggave wel of niet mogelijk is.
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100">
        <th className="border border-slate-300 p-2 text-left font-bold">Scenario klant</th>
        <th className="border border-slate-300 p-2 text-left font-bold">Type energiecontract</th>
        <th className="border border-slate-300 p-2 text-left font-bold">KOR-status</th>
        <th className="border border-slate-300 p-2 text-left font-bold">Btw terugvorderbaar?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-slate-300 p-2">Nieuwe klant, geen eerdere zonnepanelen</td>
        <td className="border border-slate-300 p-2">Dynamisch contract vereist</td>
        <td className="border border-slate-300 p-2">Niet aangemeld</td>
        <td className="border border-slate-300 p-2 font-semibold text-emerald-600">Ja, volledige teruggave mogelijk</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-2">Bestaande zonnepanelen (met nultarief vanaf 2023)</td>
        <td className="border border-slate-300 p-2">Dynamisch contract vereist</td>
        <td className="border border-slate-300 p-2">Niet aangemeld</td>
        <td className="border border-slate-300 p-2 font-semibold text-emerald-600">Ja, volledige teruggave mogelijk</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-2">Zonnepanelen gekocht vóór 2023, destijds btw teruggevraagd</td>
        <td className="border border-slate-300 p-2">Dynamisch contract vereist</td>
        <td className="border border-slate-300 p-2">Actief aangemeld in de KOR</td>
        <td className="border border-slate-300 p-2 font-semibold text-rose-600">Nee, tenzij afgemeld na drie jaar</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-2">Klant wil puur zelfconsumptie verhogen, geen netinteractie</td>
        <td className="border border-slate-300 p-2">Vast of variabel contract</td>
        <td className="border border-slate-300 p-2">Niet relevant</td>
        <td className="border border-slate-300 p-2 font-semibold text-rose-600">Nee, geen actieve stroomhandel aantoonbaar</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe factureert u de thuisbatterij als installateur?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Als installateur is het belangrijk dat u de offerte en factuur correct opstelt om het proces voor uw klant zo soepel mogelijk te maken. De Belastingdienst eist een duidelijke specificatie van de geleverde goederen en diensten.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Houd bij het opstellen van uw offerte rekening met de volgende punten:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Splitsing van componenten:</strong> Als u een gecombineerd systeem levert van zonnepanelen én een thuisbatterij, splitst u deze posten dan strikt op de offerte. De zonnepanelen en de bijbehorende installatie vallen onder het btw-nultarief. De thuisbatterij, de batterijomvormer en de bekabeling vallen onder het standaard btw-tarief.
  </li>
  <li className="mb-2">
    <strong>Duidelijke omschrijving:</strong> Geef de thuisbatterij een heldere omschrijving op de factuur, inclusief merk, type en capaciteit. Dit helpt de Belastingdienst bij het beoordelen van de teruggave-aanvraag van de klant.
  </li>
  <li className="mb-2">
    <strong>Geen garanties vooraf:</strong> Hoewel u de klant informeert over de mogelijkheid tot teruggave, is het verstandig om in uw offerte een voorbehoud op te nemen. Vermeld dat de btw-teruggave een zaak is tussen de klant en de Belastingdienst, en dat hieraan geen rechten kunnen worden ontleend richting uw installatiebedrijf. Dit dekt eventuele risico's af wanneer blijkt dat een klant onverhoopt toch in de KOR-regeling vastzit.
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Het stappenplan voor de eindklant
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om uw service te maximaliseren en de drempel voor aanschaf te verlagen, kunt u uw klant een beknopt stappenplan meegeven voor de btw-teruggave. Dit verhoogt de professionaliteit van uw onderneming en ontzorgt de klant:
</p>
<ol className="list-decimal pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Aanvragen dynamisch contract:</strong> De klant sluit een dynamisch energiecontract af bij een energieleverancier naar keuze.
  </li>
  <li className="mb-2">
    <strong>Aanmelden als btw-ondernemer:</strong> De klant meldt zich via het formulier 'Opgaaf zonnepaneelhouders' (of het specifieke formulier voor thuisbatterijen op de website van de Belastingdienst) aan als btw-ondernemer.
  </li>
  <li className="mb-2">
    <strong>Btw-aangifte doen:</strong> Na goedkeuring van de Belastingdienst dient de klant over het kwartaal van aanschaf een digitale btw-aangifte in. Hierin wordt de btw op de thuisbatterij als voorbelasting teruggevraagd.
  </li>
  <li className="mb-2">
    <strong>Aanmelden voor de KOR:</strong> Na de teruggave kan de klant zich per het eerstvolgende kalenderjaar aanmelden voor de KOR, zodat er in de toekomst geen btw-aangiftes meer hoeven te worden ingediend over de stroomhandel.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij het opstellen van een verduurzamingsadvies is een nauwkeurige rendementsberekening essentieel. De software van EnerCalculatie is ontworpen om dit proces volledig te automatiseren en te stroomlijnen. Wanneer u een adviesrapport opstelt voor een thuisbatterij, houdt ons rekenmodel direct rekening met het gekozen energieprofiel en de interactie met het net.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Binnen onze{' '}
  <a href="/rekentool-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">
    rekentool voor de thuisbatterij
  </a>{' '}
  kunt u eenvoudig berekenen hoe een batterij presteert op basis van het werkelijke opwekprofiel van de zonnepanelen. Hoewel de software de btw-teruggave niet direct bij de Belastingdienst aanvraagt, helpt de tool u wel om de terugverdientijd inzichtelijk te maken voor beide scenario's: inclusief en exclusief btw-teruggave. Dit stelt u in staat om uw klant een realistisch, onderbouwd en eerlijk advies te geven, wat het vertrouwen in uw bedrijf aanzienlijk vergroot.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u meer weten over de technische aspecten van het dimensioneren of hoe u omgaat met de kosten van teruglevering? Lees dan ook onze artikelen over het{' '}
  <a href="/blog/thuisbatterij-capaciteit-kiezen" className="text-brand-primary-text font-semibold hover:underline">
    kiezen van de juiste thuisbatterij-capaciteit
  </a>{' '}
  en hoe u de{' '}
  <a href="/blog/terugleverkosten-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">
    terugleverkosten doorrekent aan uw klant
  </a>{' '}
  om uw adviesgesprekken nog verder te professionaliseren.
</p>
    
<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2"><a href="https://www.rijksoverheid.nl/themas/klimaat-milieu-en-natuur/energie-thuis/salderingsregeling" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Salderingsregeling zonnepanelen</a> — geraadpleegd 2026-08-03</li>
</ol>
      </BlogPostLayout>
  );
}
