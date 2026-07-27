import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'koelvermogen-airco-berekenen')!;

export function KoelvermogenAircoBerekenenArticle() {

  return (
    <BlogPostLayout post={post}>
<div className="bg-slate-50 border-l-4 border-brand-primary p-4 rounded-r-lg mb-8 text-slate-700 text-sm md:text-base leading-relaxed">
  <strong>Direct citeerbare kernformule koelvermogen:</strong> Het benodigde koelvermogen van een airconditioning per ruimte wordt bepaald door het ruimtevolume (<em>Volume in m³</em>) te vermenigvuldigen met de specifieke warmtelastfactor (<em>W/m³</em>), gebaseerd op de ISSO-isolatieklasse en zonbelasting:
  <ul className="list-disc pl-5 mt-2 space-y-1">
    <li><strong>Factor 30 W/m³ (Klasse A):</strong> Uitstekend geïsoleerd, nieuwbouw, triple/HR++ glas, minimale zoninval.</li>
    <li><strong>Factor 40 W/m³ (Klasse B):</strong> Gemiddeld geïsoleerd, spouwmuurisolatie, dubbel glas, normale raampartijen.</li>
    <li><strong>Factor 50 W/m³ (Klasse C):</strong> Matig of niet geïsoleerd, plat dak, grote glasoppervlakken op het zuiden of hoge interne warmtelast.</li>
  </ul>
  <span className="block mt-2 font-mono text-xs text-slate-500">Formule: Benodigd vermogen (kW) = (Volume in m³ × Warmtelastfactor A/B/C) / 1000</span>
</div>

<p className="text-slate-700 leading-relaxed mb-4">
  Bij het adviseren over een airconditioningsysteem vertrouwen veel installateurs uit gewoonte nog op snelle vuistregels, zoals "een 3,5 kW wandmodel voldoet bijna overal". Hoewel een dergelijke inschatting in de praktijk vaak gevoelsmatig dicht in de buurt lijkt te zitten, leidt het ontbreken van een exacte onderbouwing steeds vaker tot discussie. Klanten vragen in toenemende mate om transparantie over het verwachte energieverbruik, het geluidsniveau en de interactie met bestaande zonnepanelen.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een professionele berekening van het koelvermogen per ruimte voorkomt niet alleen problemen als pendelgedrag en comfortklachten, maar vormt ook de basis voor een gecontroleerd energie-advies. In dit artikel leidt de methodiek van de ISSO u door de stappen om het benodigde koelvermogen onderbouwd te berekenen en dit helder te presenteren in uw offertes.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De theoretische basis: ISSO-richtlijnen en het ruimtevolume
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Voor het bepalen van de koellast van een ruimte leunt de Nederlandse installatiebranche op gevestigde normen en richtlijnen, waaronder ISSO-publicatie 51 (Koellastberekening voor woningen en kleine utiliteit) en NEN-EN 14511. Deze normen schrijven voor dat niet de vloeroppervlakte (m²), maar het totale inhoudsvolume (m³) van de ruimte het primaire vertrekpunt vormt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het berekenen van het volume is eenvoudig, maar vraagt aandacht bij afwijkende bouwstijlen:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li><strong>Standaard ruimtes:</strong> Lengte × Breedte × Hoogte = Inhoud in m³.</li>
  <li><strong>Schuine daken (zolders):</strong> Inhoud = Lengte × Breedte × Gemiddelde hoogte (van de dakvoet tot de nok).</li>
  <li><strong>Open ruimtes en vides:</strong> Tel het volume van de vide of aangrenzende open keuken volledig mee als er geen fysieke barrière aanwezig is om de luchtstroom te scheiden.</li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Zodra het exacte volume in kubieke meters vaststaat, wordt deze waarde vermenigvuldigd met de specifieke warmtelastfactor. Deze factor stelt vast hoeveel Watt aan koelvermogen er per kubieke meter nodig is om de gewenste binnentemperatuur op warme zomerdagen constant te houden.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De drie warmtelastfactoren: 30, 40 en 50 Watt per m³
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  De benodigde specifieke capaciteit hangt af van hoe snel warmte de ruimte binnendringt (externe warmtelast) en hoeveel warmte er binnen wordt gegenereerd (interne warmtelast). De ISSO-systematiek deelt ruimtes in drie hoofdklassen in:
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Factor A (30 Watt/m³): Hoge isolatiewaarde en lage warmtelast</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Deze factor geldt voor moderne, goed geïsoleerde ruimtes (bouwjaar vanaf circa 2012) met goede gevel- en dakisolatie, triple- of HR++-beglazing en een beperkt glasoppervlak. De ruimte ligt bij voorkeur op het noorden of oosten, of is voorzien van effectieve buitenzonwering (zoals screens of rolluiken). Er staan weinig apparaten die warmte afgeven.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Factor B (40 Watt/m³): Gemiddelde isolatiewaarde en normale warmtelast</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Dit is de standaard uitgangssituatie voor de meeste na-geïsoleerde woningen in Nederland. Denk aan woningen met spouwmuurisolatie, standaard dubbel glas (HR+) en een normaal raamoppervlak. Er is matige zoninval op het zuiden of westen, zonder dat er sprake is van een direct hitte-probleem.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Factor C (50 Watt/m³): Lage isolatiewaarde of hoge zon- en warmtebelasting</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Factor C is van toepassing op uitdagende ruimtes. Dit betreft zolderverdiepingen direct onder een slecht geïsoleerd of plat bitumen dak, ruimtes met grote raampartijen op het zuiden zonder zonwering, of ruimtes met een hoge interne warmtelast (zoals een thuiskantoor met meerdere servers, beeldschermen of uitgebreide kookapparatuur).
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 text-slate-800 font-semibold">
        <th className="border border-slate-300 p-3 text-left">Isolatieklasse</th>
        <th className="border border-slate-300 p-3 text-left">Warmtelastfactor</th>
        <th className="border border-slate-300 p-3 text-left">Kenmerken van de ruimte</th>
        <th className="border border-slate-300 p-3 text-left">Rekenvoorbeeld (80 m³)</th>
      </tr>
    </thead>
    <tbody className="text-slate-700">
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Klasse A (Goed)</td>
        <td className="border border-slate-300 p-3">30 W/m³</td>
        <td className="border border-slate-300 p-3">Nieuwbouw, HR++/triple glas, geen direct zonlicht</td>
        <td className="border border-slate-300 p-3">80 × 30 = 2,4 kW</td>
      </tr>
      <tr className="bg-slate-50">
        <td className="border border-slate-300 p-3 font-medium">Klasse B (Gemiddeld)</td>
        <td className="border border-slate-300 p-3">40 W/m³</td>
        <td className="border border-slate-300 p-3">Na-geïsoleerd, dubbel glas, normale zoninval</td>
        <td className="border border-slate-300 p-3">80 × 40 = 3,2 kW</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-medium">Klasse C (Hoog)</td>
        <td className="border border-slate-300 p-3">50 W/m³</td>
        <td className="border border-slate-300 p-3">Plat dak, grote ramen op zuid/west, hoge warmteafgifte apparatuur</td>
        <td className="border border-slate-300 p-3">80 × 50 = 4,0 kW</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Het gevaar van verkeerd dimensioneren: over- versus onderdimensionering
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een veelvoorkomende reflex in de installatiesector is om voor de zekerheid 'één maatje groter' te selecteren. Dat lijkt een veilige keuze om klachten over onvoldoende koeling te voorkomen, maar heeft in de praktijk duidelijke nadelen.
</p>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">De risico's van overdimensionering</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Moderne inverter-airconditioners passen hun vermogen traploos aan op basis van de koelbehoefte. Een inverter kan echter niet onbeperkt terugmoduleren; de ondergrens ligt meestal rond de 20 tot 30 procent van het nominale vermogen. Als een 5,0 kW unit wordt geïnstalleerd in een ruimte die op dat moment slechts 1,0 kW koelvermogen vraagt, kan de compressor zijn minimale stand niet vasthouden.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het gevolg is 'pendelen': het continue in- en uitschakelen van de compressor. Dit leidt tot:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li>Een daling van het seizoensrendement (SEER) doordat opstartpieken stroom vergen;</li>
  <li>Ongelijkmatige temperatuurschommelingen en tochtklachten voor de gebruiker;</li>
  <li>Versnelde slijtage van de mechanische componenten in de buiteneenheid;</li>
  <li>Slechte ontvochtiging, aangezien het koelblok te kort koud blijft om vocht effectief neer te slaan.</li>
</ul>

<h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">De risico's van onderdimensionering</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Kiest u een te klein vermogen, dan zal de installatie op warme zomerdagen continu op 100 procent van zijn capaciteit draaien. De gewenste binnentemperatuur wordt niet bereikt, het geluidsniveau van de binnen- en buiteneenheid blijft maximaal en het stroomverbruik valt aanzienlijk hoger uit dan voorzien.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Airco als totaalsysteem: koelen, verwarmen en zonnepaneel-integratie
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een airconditioning is feitelijk een lucht-lucht warmtepomp. Bij de advisering is het verstandig om het benodigde vermogen niet uitsluitend te beoordelen op de koellast in de zomer, maar ook op de verwarmingscapaciteit in de overgangsperiodes en de winter.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer uw klant de airco inzet om primair of bij te verwarmen, verschuift het benodigde vermogen vaak. De warmtevraag bij lage buitentemperaturen kan immers hoger liggen dan de koelvraag op een warme zomerdag. Wanneer u de airco-installatie vergelijkt met een watergedragen hybride systeem, is het zinvol om het artikel over de{' '}
  <a href="/blog/airco-vs-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">
    afwegingen tussen een airco en een hybride warmtepomp
  </a>
  {' '}te raadplegen.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Daarnaast heeft de inzet van een airco directe impact op het totale elektriciteitsnet van de woning. Tijdens hete zomerdagen valt de piek in de koelvraag vaak samen met de piekopbrengst van aanwezige zonnepanelen. Door het opgewekte vermogen direct te benutten voor koeling, stijgt het percentage zelfconsumptie. Omgekeerd leidt het gebruik van de airco als verwarming in de winter juist tot extra stroomvraag op momenten dat de zonne-opbrengst laag is. Lees in ons verdiepende artikel meer over hoe u de{' '}
  <a href="/blog/airco-als-verwarming-berekenen" className="text-brand-primary-text font-semibold hover:underline">
    gasbesparing en het extra stroomverbruik van een airco als verwarming
  </a>
  {' '}nauwkeurig berekent.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Het onderbouwen van de berekening in het adviesrapport
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een heldere, schriftelijke onderbouwing van het koelvermogen verhoogt het vertrouwen van de klant in uw offerte. Een professioneel adviesgesprek doorloopt daarbij de volgende stappen:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li><strong>Stap 1: Inmeten van de ruimtes:</strong> Leg per kamer de exacte afmetingen, het volume (m³) en de oriëntatie ten opzichte van de zon vast.</li>
  <li><strong>Stap 2: Bepalen van de isolatiefactoren:</strong> Noteer het glasoppervlak, het type beglazing en de aanwezigheid van isolatie of zonwering.</li>
  <li><strong>Stap 3: Vermogensberekening per ruimte:</strong> Vermenigvuldig het volume met de bijbehorende factor (30, 40 of 50 W/m³) en selecteer op basis daarvan de passende binneneenheden.</li>
  <li><strong>Stap 4: Gelijktijdigheid en buiteneenheid:</strong> Bepaal bij multi-split systemen of alle ruimtes gelijktijdig op maximaal vermogen moeten koelen. Een buiteneenheid kan vaak iets kleiner worden gedimensioneerd dan de som van de binneneenheden als ruimtes op verschillende momenten worden gebruikt (bijvoorbeeld woonkamer overdag vs. slaapkamers 's nachts).</li>
  <li><strong>Stap 5: Integratie in het totale energieprofiel:</strong> Laat zien hoe het berekende stroomverbruik van de airco zich verhoudt tot de totale stroomvraag, de zonnepaneel-opbrengst en een eventuele thuisbatterij.</li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  EnerCalculatie automatiseert deze stappen binnen één doorlopend rekenmodel. Met de aircomodule voert u de ruimtematen, de isolatiegraad en de specifieke zonbelasting in, waarna de software deterministisch het benodigde koel- en verwarmingsvermogen per ruimte bepaalt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Vervolgens koppelt EnerCalculatie het verwachte energieverbruik van het aircosysteem direct aan het algehele energieprofiel van het klantdossier. Zo ziet u direct de invloed van koeling op de zelfconsumptie van zonnestroom in de zomer én het extra stroomverbruik bij verwarming in de winter. Dit resultaat wordt samengevoegd in een strak, digitaal adviesrapport waarmee u uw klant een transparant en volledig onderbouwd voorstel kunt overhandigen. Ontdek de mogelijkheden direct via de{' '}
  <a href="/rekentool-airco" className="text-brand-primary-text font-semibold hover:underline">
    rekentool voor airco's
  </a>
  .
</p>
    </BlogPostLayout>
  );
}
