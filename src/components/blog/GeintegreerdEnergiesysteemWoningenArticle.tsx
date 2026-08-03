import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'geintegreerd-energiesysteem-woningen')!;

export function GeintegreerdEnergiesysteemWoningenArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Veel woningeigenaren benaderen verduurzaming nog steeds stapsgewijs: eerst twaalf zonnepanelen op het dak, een paar jaar later een hybride warmtepomp, en wanneer de terugleverkosten stijgen volgt een thuisbatterij. Voor u als installateur brengt deze gefragmenteerde aanpak de nodige risico's met zich mee. Losse componenten die onafhankelijk van elkaar zijn gedimensioneerd, werken in de praktijk zelden optimaal samen. Een warmtepomp die aanslaat op het moment dat de thuisbatterij net leeg is, of een zonnestroomoverschot dat onbenut naar het net vloeit terwijl de warmtepompboiler uit staat, zorgt voor teleurgestelde klanten en een lager rendement dan beloofd.
</p>

<p className="text-slate-700 leading-relaxed mb-4">
  Een <strong>geïntegreerd energiesysteem</strong> benadert de woning niet als een verzameling losse apparaten, maar als één samenhangende energiehuishouding. Zonnepanelen, de warmtepomp (of warmtepompboiler), de thuisbatterij en eventueel een laadpaal worden hierbij bewust op elkaar afgestemd in opwek, opslag en verbruik. In dit artikel bekijken we de technische en operationele voordelen van zo'n geïntegreerd energiesysteem, hoe dit de zelfconsumptie verhoogt en hoe u als installateur deze complexiteit vertaalt naar een helder en onderbouwd klantadvies.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Waarom losse verduurzamingsmaatregelen hun grens bereiken
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In de afgelopen decennia lag de nadruk bij verduurzaming voornamelijk op de maximale opwek van zonnestroom. Dankzij de salderingsregeling maakte het voor het financiële rendement immers niet uit wanneer stroom werd opgewekt of verbruikt. Met de aanstaande afschaffing van de salderingsregeling per 1 januari 2027 en de invoering van terugleverkosten door energieleveranciers is die situatie fundamenteel veranderd.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer u zonnepanelen adviseert zonder rekening te houden met de overige energieverbruikers in het pand, ontstaat er een mismatch op het net. Op zonnige zomerdagen genereert het dak een forse piek aan stroom die het huishouden niet direct kan gebruiken. Wordt deze stroom niet lokaal gebufferd of nuttig ingezet, dan leidt dit tot hoge terugleverkosten of zelfs het uitschakelen van omvormers door netoverspanning op buurtniveau.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Aan de andere kant vraagt een warmtepomp voornamelijk energie in het stookseizoen, wanneer de opbrengst van de zonnepanelen het laagst is. Een geïsoleerde berekening voor een warmtepomp leidt er vaak toe dat het extra elektriciteitsverbruik volledig bij de netinvoering wordt opgeteld, zonder te kijken naar slimme afstemming gedurende de overgangsmaanden. Zonder geïntegreerde sturing blijft de zelfconsumptie van een gemiddeld huishouden steken op circa 30%. De overige 70% van de opgewekte stroom vloeit naar het net, terwijl de woning op een later tijdstip dure netstroom moet inkopen.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De drie pijlers van een geïntegreerd energiesysteem
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om een woning echt energieluw te maken, moeten opwek, opslag en verbruik als één keten worden ontworpen. Een volwaardig geïntegreerd energiesysteem rust op drie technische pijlers:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>1. Directe afstemming tussen opwek en warmtevraag (gelijktijdigheid):</strong> Een warmtepomp of warmtepompboiler is in feite een grote thermische batterij. Door het stuurcontact van de warmtepomp (vaak een SG Ready-ingang) te koppelen aan het opwekoverschot van de zonnepanelen, kan de warmtepomp overdag alvast het tapwater opwarmen of het cv-circuit met één of twee graden verhogen. Hiermee wordt stroom omgezet in nuttige warmte op het moment dat het aanbod het hoogst is.
  </li>
  <li>
    <strong>2. Elektrische buffering via een thuisbatterij:</strong> Niet alle opgewekte energie kan direct thermisch worden verwerkt. Een thuisbatterij vangt de kortstondige en dagelijkse pieken in opwek op. Wanneer de batterij strategisch gekoppeld is met het energieprofiel, voorziet deze 's avonds de huishoudelijke apparaten en de stuurstroom van de warmtepomp van energie, wat de netafhankelijkheid in de avonduren sterk vermindert.
  </li>
  <li>
    <strong>3. Slimme sturing via een Energiemanagementsysteem (EMS):</strong> Het hart van het geïntegreerde systeem is het EMS dat communiceert via de P1-poort van de slimme meter en protocollen zoals Modbus of EEBUS. Het EMS ziet welk vermogen er op de hoofdaansluiting beschikbaar is, kent de laadstatus van de batterij en stelt prioriteiten. Zo voorkomt het dat de thuisbatterij wordt leeggezogen om een elektrische auto op te laden, terwijl die batterijcapaciteit gepland was voor het avondverbruik van de warmtepomp.
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Zelfconsumptie verhogen: van fysieke afstemming naar rendement
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het belangrijkste argument voor uw klant om te investeren in een geïntegreerd energiesysteem is de stijging van de zelfconsumptie. Waar een losse zonnestroominstallatie gemiddeld 30% van de opgewekte stroom direct in de woning laat verbruiken, kan een goed afgestemd geïntegreerd energiesysteem dit aandeel verhogen naar 60% tot 80%, afhankelijk van de accucapaciteit, het stookgedrag en het gezinsformaat.
</p>

<p className="text-slate-700 leading-relaxed mb-4">
  Laten we kijken naar een typische situatie in de overgangsmaanden (maart-april en september-oktober). Op deze dagen leveren de zonnepanelen een aanzienlijke hoeveelheid stroom, terwijl er ook nog een actieve warmtevraag is.
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>Scenario A (Losse componenten):</strong> De zonnepanelen leveren overdag piekstroom af aan het net, waarvoor de klant terugleverkosten betaalt. De warmtepomp staat overdag op een lage stand omdat de thermostaat geen warmtevraag registreert. Pas als de zon ondergaat en de bewoners thuiskomen, slaat de warmtepomp aan op volle capaciteit en trekt dure netstroom uit het net.
  </li>
  <li>
    <strong>Scenario B (Geïntegreerd energiesysteem):</strong> Het EMS signaleert om 11:00 uur een opwekoverschot. De warmtepompboiler start met het opwarmen van het sanitaire warm water tot 65 °C. Het resterende overschot laadt de thuisbatterij op. Wanneer om 18:00 uur de zon verdwijnt, draait de warmtepomp op de energie uit de thuisbatterij en is het tapwater al op temperatuur. Het netto netverbruik gedurende de avondpiek daalt nagenoeg naar nul.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Door deze afstemming vervalt niet alleen een groot deel van de terugleverkosten, maar ontlast de installatie ook de lokale netaansluiting.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Losse installatie versus geïntegreerd energiesysteem
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om het verschil tussen beide benaderingen helder aan uw klant uit te leggen, helpt een gestructureerde vergelijking. Onderstaande tabel vat de voornaamste technische en operationele verschillen samen:
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
        <th className="p-3 text-left font-semibold border-r border-slate-300">Aspect</th>
        <th className="p-3 text-left font-semibold border-r border-slate-300">Losse installaties</th>
        <th className="p-3 text-left font-semibold">Geïntegreerd energiesysteem</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-200 text-slate-700">
      <tr>
        <td className="p-3 font-medium bg-slate-50 border-r border-slate-300">Zelfconsumptie zonnestroom</td>
        <td className="p-3 border-r border-slate-300">Circa 30% direct verbruik</td>
        <td className="p-3">60% tot 80% (afhankelijk van capaciteit en sturing)</td>
      </tr>
      <tr>
        <td className="p-3 font-medium bg-slate-50 border-r border-slate-300">Impact terugleverkosten</td>
        <td className="p-3 border-r border-slate-300">Hoog; veel onbenut overschot vloeit overdag terug</td>
        <td className="p-3">Minimaal; overschot wordt thermisch en elektrisch gebufferd</td>
      </tr>
      <tr>
        <td className="p-3 font-medium bg-slate-50 border-r border-slate-300">Afstemming warmtevraag</td>
        <td className="p-3 border-r border-slate-300">Geen; warmtepomp reageert puur op kamertemperatuur</td>
        <td className="p-3">Hoge prioriteit bij opwekoverschot (via SG Ready / Modbus)</td>
      </tr>
      <tr>
        <td className="p-3 font-medium bg-slate-50 border-r border-slate-300">Belasting netaansluiting</td>
        <td className="p-3 border-r border-slate-300">Onvoorspelbare gelijktijdige pieken op de hoofdzekering</td>
        <td className="p-3">Actieve sturing voorkomt overbelasting en piekbelasting</td>
      </tr>
      <tr>
        <td className="p-3 font-medium bg-slate-50 border-r border-slate-300">Complexiteit advies</td>
        <td className="p-3 border-r border-slate-300">Eenvoudig per product, maar risico op foute aannames</td>
        <td className="p-3">Vraagt integraal rekenmodel voor opwek, opslag en verbruik</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Wat betekent dit voor uw adviesgesprek en offertes?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor u als installateur vereist een geïntegreerd energiesysteem een verandering in de manier waarop u adviseert en rekent. Een van de meest gemaakte fouten in de praktijk is de zogenaamde 'stapelfout' in rekenmodellen. Wanneer u voor zonnepanelen een losse terugverdientijd berekent, vervolgens een warmtepomp adviseert op basis van het historische stroomverbruik, en tot slot een thuisbatterij dimensionert op het oude opwekoverschot, rekent u met inconsistente uitgangspunten.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  De aanschaf van een warmtepomp verhoogt immers het totale jaarlijkse stroomverbruik van de woning aanzienlijk. Hierdoor veranderd het opwekoverschot dat daadwerkelijk beschikbaar is om een thuisbatterij te laden. Als u de batterij dimensioneert op basis van de oude situatie (vóór de warmtepomp), adviseert u een batterij die in de wintermaanden vrijwel constant leeg staat omdat de warmtepomp alle zonnestroom direct opsipt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  In een professioneel adviesgesprek doorloopt u de volgende stappen om deze onderlinge afhankelijkheid correct in beeld te brengen:
</p>
<ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>Breng het totale energieprofiel in kaart:</strong> Kijk niet alleen naar de jaarlijkse kWh-totalen, meenemen van het verloop over de dag en de seizoensvariabiliteit is essentieel.
  </li>
  <li>
    <strong>Bepaal het basiseffect van de warmtepomp:</strong> Reken door hoeveel extra stroomvraag het verwarmen en warm tapwater toevoegen aan het totale profiel. Bekijk voor de ISDE-voorwaarden ook de geldende regels via RVO.
  </li>
  <li>
    <strong>Dimensioneer de zonnepanelen-installatie op de nieuwe vraag:</strong> Stem het aantal Wattpiek af op de verhoogde elektriciteitsbehoefte en de dakoriëntatie.
  </li>
  <li>
    <strong>Dimensioneer de thuisbatterij op het overgebleven profiel:</strong> Kies een capaciteit die past bij het nachtelijke rustverbruik en het gewenste stuurgedrag, rekening houdend met wat de warmtepomp al direct overdag opneemt.
  </li>
  <li>
    <strong>Controleer de netaansluiting:</strong> Toets of de huidige 3x25A-aansluiting de gelijktijdige vermogens van de apparaten kan opvangen of dat dynamic load balancing ingezet moet worden.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het handmatig doorrekenen van een geïntegreerd energiesysteem in losse Excel-sheets is tijdrovend en foutgevoelig. Een kleine aanpassing in het verwachte warmtepompverbruik heeft immers direct invloed op het batterijrendement en de berekende terugleverkosten. EnerCalculatie gebruikt één doorlopend, deterministisch rekenmodel dat opwek, opslag en verbruik in samenhang berekent.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Uploadt u een energienota of uurtariefprofiel, dan berekent het platform direct hoe de zonnestroomopbrengst wordt verdeeld over het directe verbruik, de thermische opslag van de warmtepomp en de elektrische opslag van de thuisbatterij. Zo genereert u binnen enkele minuten een professioneel adviesrapport waarin de klant exact ziet wat het gecombineerde rendement is — zowel in de huidige situatie als na het vervallen van de salderingsregeling.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u specifieke onderdelen van een geïntegreerd systeem doorrekenen? Bekijk hoe u een thuisbatterij nauwkeurig dimensioneert met de{' '}
  <a href="/rekentool-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">
    rekentool thuisbatterij
  </a>
  {' '}of lees meer over{' '}
  <a href="/blog/energiemanagementsysteem-p1-poort" className="text-brand-primary-text font-semibold hover:underline">
    het aansturen van batterij, laadpaal en warmtepomp via een energiemanagementsysteem
  </a>
  . Ook voor het onderbouwen van het extra stroomverbruik en de capaciteit van de warmtepomp kunt u terecht bij de{' '}
  <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">
    rekentool warmtepomp
  </a>
  .
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Presenteert u uw klanten al het totaalbeeld van een geïntegreerd energiesysteem, of leunt uw advies nog op losse offertes per product? Test in uw volgende adviesgesprek hoe een gecombineerde berekening het vertrouwen van uw klant vergroot en de conversie op uw verduurzamingsvoorstellen verhoogt.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2"><a href="https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/warmtepomp" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">ISDE: Warmtepomp woningeigenaren aanvragen — RVO</a> — geraadpleegd 2026-08-03</li>
  <li className="mb-2"><a href="https://consument.acm.nl/elektriciteit-en-gas/duurzame-energie/wat-is-salderen" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Salderen en terugleveren — ACM ConsuWijzer</a> — geraadpleegd 2026-08-03</li>
  <li className="mb-2"><a href="https://www.rijksoverheid.nl/themas/klimaat-milieu-en-natuur/energie-thuis/salderingsregeling" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Salderingsregeling zonnepanelen</a> — geraadpleegd 2026-08-03</li>
</ol>
    </BlogPostLayout>
  );
}
