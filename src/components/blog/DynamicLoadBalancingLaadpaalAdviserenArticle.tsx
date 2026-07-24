import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'dynamic-load-balancing-laadpaal-adviseren')!;

export function DynamicLoadBalancingLaadpaalAdviserenArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Bij het adviseren van een laadpaal aan huis of op een zakelijke locatie krijgt u als installateur vrijwel altijd te maken met de fysieke grenzen van de netaansluiting. Waar een elektrisch voertuig al snel 11 kW (3-fase 16 Ampère) trekt om efficiënt te laden, beschikken de meeste Nederlandse woonhuizen over een standaard 3x25A netaansluiting. Zodra de laadpaal gelijktijdig draait met een warmtepomp, een inductiekookplaat of een elektrische oven, dreigt de hoofdzekering te begeven.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer u <strong>dynamic load balancing laadpaal adviseren</strong> opneemt in uw adviesgesprek, biedt u uw klant een technische oplossing die overbelasting voorkomt zonder dat een prijzige netverzwaringsaanvraag bij de netbeheerder noodzakelijk is. In dit artikel leest u hoe dynamic load balancing precies werkt, welke normen zoals NEN 1010 en IEC 61851 een rol spelen, en hoe u dit helder en overtuigend opneemt in uw offertes.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Wat is dynamic load balancing en hoe werkt het technisch?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Dynamic Load Balancing (DLB), oftewel dynamische lastbalancering, is een slimme stuurtechniek die het beschikbare elektrische vermogen op een locatie continu monitort en de laadstroom van het elektrische voertuig daar in real-time op afstemt. In plaats van een vast ingesteld laadvermogen leest het laadsysteem via een sensor of datakoppeling het totale actuele verbruik van het pand af.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het meetpunt bevindt zich direct achter de hoofdschakelaar. Dit kan op twee manieren worden gerealiseerd:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li>
    <strong>Via de P1-poort van de slimme meter:</strong> De laadpaal ontvangt via een P1-kabel of draadloze P1-transmitter actuele telegrammen (conform de SMR 4.2 of SMR 5.0 specificatie) met de exacte stroom- en vermogenswaarden per fase.
  </li>
  <li>
    <strong>Via stroomtransformatoren (CT-spoelen) of een kWh-meter:</strong> Bij aansluitingen zonder bruikbare P1-poort of in zakelijke omstandigheden worden stroomspoelen om de fasegeleiders in de groepenkast geplaatst. Deze meten de exacte stroomsterkte (Ampère) per fase en sturen deze data via Modbus (RS485) of ethernet door naar het laadstation.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer het huishoudelijke verbruik op één van de fasen stijgt — bijvoorbeeld omdat de warmtepomp aanslaat — berekent het laadstation direct hoeveel Ampère er op die specifieke fase nog veilig beschikbaar is tot aan de maximale hoofdzekeringwaarde. Volgens de internationale norm <strong>IEC 61851</strong> past de laadpaal vervolgens het Pulse Width Modulation (PWM) signaal naar de auto aan. De auto verlaagt hierop binnen enkele seconden zijn opgenomen laadstroom. Zodra het apparaat in huis weer uitschakelt, schaalt de laadpaal de laadsnelheid automatisch weer op naar het maximale niveau.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Waarom DLB essentieel is op 3x25A en 3x35A netaansluitingen
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Netbeheer Nederland hanteert voor de overgrote meerderheid van de Nederlandse kleinverbruikaansluitingen een standaardcapaciteit van 3x25A. Dit geeft een theoretisch maximaal gelijktijdig vermogen van circa 17,2 kW (230V x 25A x 3 fasen).
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een 3-fase laadpaal die op volle sterkte laadt op 16A per fase, verbruikt reeds 11 kW. Dat betekent dat er per fase nog slechts 9 Ampère beschikbaar is voor de gehele woning. Een waterkoker (ca. 10A op één fase) of een inductiekookplaat (vaak verdeeld over twee fasen met pieken van 16A tot 20A) zorgt zonder sturing onherroepelijk voor een overbelasting. De trage uitschakelkarakteristiek van een smeltpatroon of installatieautomaat vangt korte pieken weliswaar even op, maar bij langdurig laden op volle belasting zal de hoofdzekering van de netbeheerder onherroepelijk aanspreken.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een verzwaring naar bijvoorbeeld 3x35A opvragen bij de netbeheerder kost uw klant jaarlijks aanzienlijk meer aan vastrecht. Bovendien krijgt u in veel regio's te maken met lange doorlooptijden door netcongestie. Meer achtergronden hierover leest u in ons artikel over{' '}
  <a href="/blog/laadpaal-netaansluiting-capaciteit-3x25a" className="text-brand-primary-text font-semibold hover:underline">
    laadpalen op een 3x25A netaansluiting en gelijktijdigheid
  </a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Normen en installatie-eisen: NEN 1010 en IEC 61851
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Als installateur bent u gebonden aan de installatievoorschriften uit de <strong>NEN 1010</strong>. Bepaling 722 van de NEN 1010 stelt specifieke eisen aan de voeding van elektrische voertuigen. Hierin is vastgelegd dat elke aansluiting voor een laadpunt moet zijn voorzien van een eigen eindgroep, inclusief passende beveiliging tegen overstroom en foutstromen (zoals Type B RCD of Type A gecombineerd met 6mA DC-detectie conform IEC 62955).
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Daarnaast stelt de NEN 1010 duidelijke regels rondom de gelijktijdigheidsfactor. Bij het ontwerpen van een installatie mag u de gelijktijdigheidsfactor voor niet-gestuurde laadpunten niet willekeurig verlagen: deze stelt u standaard op 1,0. Pas wanneer er een goedgekeurd en gecertificeerd dynamisch belastingbeheersysteem is toegepast dat aan IEC 61851 voldoet, mag u in uw capaciteitsberekening rekening houden met de gereguleerde maximale stroomopname.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Statische vs. Dynamische Lastbalancering vs. EMS
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om de juiste keuze aan uw klant uit te leggen, is het nuttig de drie meest voorkomende vormen van belastingbeheer helder naast elkaar te zetten:
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 text-slate-800 font-semibold">
        <th className="border border-slate-300 p-3 text-left">Type sturing</th>
        <th className="border border-slate-300 p-3 text-left">Werkingsprincipe</th>
        <th className="border border-slate-300 p-3 text-left">Voordelen</th>
        <th className="border border-slate-300 p-3 text-left">Nadelen / Beperkingen</th>
      </tr>
    </thead>
    <tbody className="text-slate-700">
      <tr>
        <td className="border border-slate-300 p-3 font-semibold">Statische lastbalancering</td>
        <td className="border border-slate-300 p-3">Laadpaal staat afgesteld op een vast ingesteld maximaal vermogen (bijv. max 10A).</td>
        <td className="border border-slate-300 p-3">Goedkoop, geen datasensor of extra P1-kabel nodig.</td>
        <td className="border border-slate-300 p-3">Onderbenutting van beschikbare capaciteit wanneer de woning nauwelijks stroom verbruikt.</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-semibold">Dynamic Load Balancing (DLB)</td>
        <td className="border border-slate-300 p-3">Real-time meting op hoofdaansluiting via P1 of CT-spoelen; sturing conform IEC 61851.</td>
        <td className="border border-slate-300 p-3">Maximale laadsnelheid als er ruimte is, beschermt hoofdzekering continu.</td>
        <td className="border border-slate-300 p-3">Vraagt een fysieke datakoppeling of stabiel netwerksignaal naar de slimme meter.</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 font-semibold">Energiemanagementsysteem (EMS)</td>
        <td className="border border-slate-300 p-3">Integrale aansturing van laadpaal, zonnepanelen, thuisbatterij en warmtepomp.</td>
        <td className="border border-slate-300 p-3">Optimaliseert ook eigenverbruik van zonne-energie en benut dynamische energietarieven.</td>
        <td className="border border-slate-300 p-3">Hogere aanschafkosten en complexere inbedrijfstelling.</td>
      </tr>
    </tbody>
  </table>
</div>

<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer u advies geeft over een breder verduurzamingspakket met opslag of slimme sturing, kan een overstap naar een EMS erg waardevol zijn. Zie voor meer verdieping ons artikel over{' '}
  <a href="/blog/energiemanagementsysteem-p1-poort" className="text-brand-primary-text font-semibold hover:underline">
    het aansturen van batterij, laadpaal en warmtepomp via een EMS en P1-poort
  </a>.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stappenplan voor de installateur: In 5 stappen naar een betrouwbare installatie
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Door een gestructureerd stappenplan te volgen, zorgt u ervoor dat het risico op overbelasting en uitval tot een minimum wordt beperkt:
</p>

<ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>Inventariseer de hoofdzekering en netaansluiting:</strong> Controleer ter plaatse of via het overzicht van de netbeheerder de exacte aansluitwaarde (1x35A, 3x25A of 3x35A) en de status van de slimme meter (DSMR versie).
  </li>
  <li>
    <strong>Breng de overige grote verbruikers in kaart:</strong> Noteer het vermogen van aanwezige of geplande warmtepompen, elektrische sauna's, inductiekookplaten en jacuzzi's.
  </li>
  <li>
    <strong>Kies de juiste fysieke meetverbinding:</strong> Bepaal of de afstand tussen de groepenkast/slimme meter en het laadpunt een bekabelde UTP-verbinding toelaat. Kies bij langere afstanden voor een hoogwaardige draadloze P1-extender of Modbus over RS485 met afgeschermde kabel.
  </li>
  <li>
    <strong>Configureer de laadpaal-software en veiligheidsmarges:</strong> Stel in de configurator van het laadstation de waarde van de hoofdzekering in (bijvoorbeeld 25A) en hanteer een veiligheidsmarge (bijvoorbeeld een ingestelde max van 23A of 24A) om snelle pieken op te vangen.
  </li>
  <li>
    <strong>Test de werking onder belasting:</strong> Voer na oplevering een functionele test uit: koppel het voertuig aan, schakel een zware verbruiker in het pand in en controleer via de installateurs-app of de laadstroom aantoonbaar en direct terugregelt.
  </li>
</ol>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe onderbouwt u dit advies in uw offerte?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Consumenten en zakelijke klanten vergelijken offertes vaak uitsluitend op de prijs van het laadstation. Een concurrent die een laadpaal aanbiedt zonder dynamic load balancing lijkt op het eerste gezicht goedkoper.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Uw meerwaarde als professioneel installateur zit in het zichtbaar maken van de risico's. Leg in de offerte helder uit dat een installatie zonder DLB op een 3x25A aansluiting betekent dat de klant óf handmatig rekening moet houden met welke apparaten aanstaan (onpraktisch en storingsgevoelig), óf het laadpunt permanent moet begrenzen op bijvoorbeeld 3,7 kW (zeer langzaam laden). Door de meerwaarde van een slimme sturing cijfermatig te onderbouwen, transformeert u een technische optie in een noodzakelijke investering voor zorgeloos gebruik.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In de software van EnerCalculatie berekent de rekenmodule voor laadpalen automatisch de beschikbare capaciteit van de netaansluiting op basis van het opgegeven energieprofiel en de overige verduurzamingsmaatregelen.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer u een combinatieofferte opstelt voor zonnepanelen, een warmtepomp en een laadpaal, toont het rekenmodel direct de gelijktijdige pieken. De software neemt de integratie van dynamic load balancing op in de technische onderbouwing en toont in het klantrapport hoe het laadvermogen dynamisch wordt opgevangen binnen de bestaande 3x25A of 3x35A grenzen. Dit voorkomt dat u handmatige spreadsheets hoeft bij te houden en levert uw klant een professioneel, overzichtelijk adviesrapport op.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u zelf ervaren hoe u laadpaalberekeningen direct koppelt aan het complete energieprofiel van uw klant? Bekijk dan de functionaliteiten van onze{' '}
  <a href="/rekentool-laadpaal" className="text-brand-primary-text font-semibold hover:underline">
    rekentool laadpaal
  </a>.
</p>
    </BlogPostLayout>
  );
}
