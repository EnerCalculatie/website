import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'brutomarge-berekenen-installatiebedrijf')!;

export function BrutomargeBerekenenInstallatiebedrijfArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Veel installatiebedrijven in de verduurzamingssector draaien uitstekende omzetten, maar zien aan het einde van het boekjaar een verrassend bescheiden winst onder aan de streep. De oorzaak ligt zelden aan een gebrek aan opdrachten. Meestal ontstaat het probleem al tijdens de voorbereiding aan de werkbank: een onvolledige of onnauwkeurige calculatie vooraf. Wanneer u het brutomarge berekenen voor uw installatiebedrijf benadert als een snelle opslag op de inkoopprijs van de hardware, verdampt de beoogde marge zodra de eerste tegenvaller op locatie plaatsvindt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Of het nu gaat om een hybride warmtepomp-installatie, een thuisbatterij met slim energiebeheer of een uitgebreid zonnepanelensysteem: een gezonde projectmarge vraagt om een gestructureerde rekenmethode. In dit artikel behandelen we de exacte mechaniek van brutomargeberekening in de installatietechniek, de vier meest over het hoofd geziene kostenposten en hoe u uw calculatie zo onderbouwt dat u uw marge beschermt en tegelijkertijd uw conversie op offertes verhoogt.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Wat is brutomarge precies in de installatietechniek?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In de installatiebranche is het cruciaal om een haarscherp onderscheid te maken tussen de brutomarge op projectniveau en de uiteindelijke nettowinst van de onderneming. De brutomarge is de financiële ruimte die overblijft wanneer u alle directe projectkosten aftrekt van de netto verkoopprijs (exclusief btw). Deze brutomarge moet vervolgens voldoende omvang hebben om alle indirecte bedrijfskosten — zoals het wagenpark, kantoorhuisvesting, verzekeringen, verkoopkosten en kantoorpersoneel — te dekken.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  De basisformule voor de brutomarge per project luidt:
</p>

<div className="bg-slate-50 border-l-4 border-brand-primary p-4 my-6">
  <p className="font-mono text-slate-800 text-sm md:text-base">
    Brutomarge = Netto Omzet Project - Directe Projectkosten
  </p>
  <p className="font-mono text-slate-600 text-xs md:text-sm mt-1">
    Brutomarge percentage = (Brutomarge / Netto Omzet Project) x 100%
  </p>
</div>

<p className="text-slate-700 leading-relaxed mb-4">
  Het struikelblok bij veel installateurs zit niet in de formule zelf, maar in de definitie van 'directe projectkosten'. Directe projectkosten omvatten veel meer dan enkel de inkoopfactuur van de groothandel voor de panelen, de omvormer, de warmtepomp of het laadpunt. Alle middelen en uren die rechtstreeks toewijsbaar zijn aan dat specifieke project behoren tot de directe kostprijs. Wanneer u een onderdeel van deze directe kosten niet opneemt in de basiscalculatie, rekent u zich rijk met een theoretische brutomarge die in de praktijk niet gehaald wordt.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  De 4 verborgen kostenposten die uw brutomarge uithollen
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In de dagelijkse praktijk van verduurzamingsprojecten blijken het zelden de hoofdcomponenten te zijn die het budget overschrijden. De inkoopprijzen van omvormers, batterijmodules of warmtepompbinnendelen heeft u doorgaans scherp op een rij. De margedruk ontstaat door kleine, cumulatieve kostenposten die uit de calculatie glippen:
</p>

<ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
  <li>
    <strong>1. Engineering en voorbereidingstijd:</strong> Het inmeten op locatie, het uitwerken van een dakinlegplan, de kabelberekening volgens geldende normen en de afstemming met de klant kosten uren voordat de monteur ook maar één schroef aandraait. Als deze uren niet als directe kosten in het project worden gewaardeerd, kost elke complexe offerte geld.
  </li>
  <li>
    <strong>2. Klein materiaal en hulpmiddelen:</strong> Dakhaken, buismateriaal, klemmen, bekabeling, werkschakelaars, aardlekschakelaars en bevestigingsmiddelen lijken per stuk bescheiden posten. Telt u ze bij elkaar op voor een complete installatie, dan vormen ze een aanzienlijk percentage van de materiaalsom. Met een simpele vuistregel als "vijf procent opslag" zit u er bij specifieke situaties al snel naast.
  </li>
  <li>
    <strong>3. Logistiek, klimmateriaal en afvalafvoer:</strong> Huren van hoogwerkers, opzetten van een veilige steiger, transport van zware apparatuur naar de locatie en het afvoeren van verpakkingsmateriaal en oude installaties. Dit zijn directe kosten die per locatie sterk variëren.
  </li>
  <li>
    <strong>4. Nazorg, inregelen en servicereservering:</strong> Elk verduurzamingsproject vraagt om nazorg. Denk aan het aanmaken van een monitoringaccount voor de klant, het uitleggen van de app, of een kort retourbezoek om een instelling van de warmtepomp bij te stellen. Een gezonde berekening bevat een vaste servicereservering als onderdeel van de directe kostprijs.
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stappenplan: Brutomarge nauwkeurig berekenen per verduurzamingsproject
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om te zorgen dat uw calculaties voorspelbaar en winstgevend blijven, is een gestandaardiseerd stappenplan noodzakelijk. Door dit proces vast te leggen in uw bedrijfsvoering voorkomt u dat individuele adviseurs of calculators afwijkende aannames hanteren.
</p>

<h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
  Stap 1: Stel de volledige Bill of Materials (BOM) samen
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Breng alle fysieke materialen in kaart die nodig zijn voor het project. Splits dit op in hoofdapparatuur (panelen, omvormer, warmtepomp, batterij, laadpaal) en hulpmaterialen (montagesysteem, bekabeling, groepenkastcomponenten, leidingguts). Gebruik actuele inkooptarieven van uw leveranciers inclusief kortingsafspraken.
</p>

<h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
  Stap 2: Normeer de arbeidsuren per subtaak
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Hanteer reële uurnormen. Verdeel de gewerkte tijd in voorbereiding/engineering, montagewerk op locatie, elektrotechnische aansluiting, inbedrijfstelling/inregelen en oplevering aan de klant. Vermenigvuldig deze uren met het interne kosttarief per uur van de monteur (inclusief sociale lasten, gereedschap en bedrijfswagen), niet met de uiteindelijke verkoopprijs per uur.
</p>

<h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
  Stap 3: Reken specifieke locatierisico's door
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Is er sprake van een lastige kabelroute door een afgewerkte kruipruimte? Moet de meterkast worden vernieuwd of verzwaard van 1-fase naar 3-fase? Neem voor risicofactoren expliciete posten of gecontroleerde stelposten op in plaats van het risico af te dekken met een algemene marge.
</p>

<h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
  Stap 4: Bepaal de vereiste brutomarge en bereken de verkoopprijs
</h3>
<p className="text-slate-700 leading-relaxed mb-4">
  Zodra de totale directe kostprijs (materiaal + arbeid + extern + risico) bekend is, berekent u de verkoopprijs op basis van de gewenste brutomarge. Let hierbij op het verschil tussen een opslag op de kostprijs en de marge op de verkoopprijs: om een brutomarge van 30% op de omzet te realiseren, heeft u een kostprijsopslag van circa 42,9% nodig.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Brutomarge-karakteristieken per verduurzamingsdiscipline
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In de verduurzamingsmarkt verschilt het risicoprofiel en de kostenstructuur sterk per productgroep. Onderstaande tabel geeft inzicht in de belangrijkste aandachtspunten bij het berekenen van de brutomarge per discipline:
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm text-left">
    <thead>
      <tr className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300">
        <th className="p-3 border border-slate-300">Discipline</th>
        <th className="p-3 border border-slate-300">Kostenstructuur</th>
        <th className="p-3 border border-slate-300">Grootste margerisico</th>
        <th className="p-3 border border-slate-300">Aandachtspunt calculatie</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-200 text-slate-700">
      <tr>
        <td className="p-3 font-semibold border border-slate-300">Zonnepanelen</td>
        <td className="p-3 border border-slate-300">Hoog materiaalaandeel, snelle montagewijze</td>
        <td className="p-3 border border-slate-300">Daksituatie, valbeveiliging en steigerwerk</td>
        <td className="p-3 border border-slate-300">Aandacht voor kabeltraject naar meterkast en omvormerlocatie</td>
      </tr>
      <tr className="bg-slate-50">
        <td className="p-3 font-semibold border border-slate-300">Thuisbatterijen</td>
        <td className="p-3 border border-slate-300">Zeer hoge materiaalkosten, kortere installatietijd</td>
        <td className="p-3 border border-slate-300">Software-inbedrijfstelling en P1-aansturing</td>
        <td className="p-3 border border-slate-300">Opnemen van tijd voor inregelen slimme sturing en klant-app</td>
      </tr>
      <tr>
        <td className="p-3 border border-slate-300 font-semibold">Warmtepompen</td>
        <td className="p-3 border border-slate-300">Hoge arbeidsintensiteit en gespecialiseerde materialen</td>
        <td className="p-3 border border-slate-300">Afgiftesysteem, leidingwerk en hydraulisch inregelen</td>
        <td className="p-3 border border-slate-300">Inmeten van afgiftesysteem en geluids- en plaatsingseisen</td>
      </tr>
      <tr className="bg-slate-50">
        <td className="p-3 font-semibold border border-slate-300">Geïntegreerd systeem</td>
        <td className="p-3 border border-slate-300">Balans tussen hardware, complexe arbeid en regelsystemen</td>
        <td className="p-3 border border-slate-300">Afstemming tussen meerdere apparaten en netcapaciteit</td>
        <td className="p-3 border border-slate-300">Systeemomvang integraal berekenen in plaats van losse sommen</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe een onderbouwde calculatie uw conversie op offertes verhoogt
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Installateurs zijn soms bang dat het nauwkeurig meerekenen van alle directe kosten de offerte duurder maakt en de klant afschrikt. In de praktijk blijkt het tegenovergestelde. Een huiseigenaar of zakelijke opdrachtgever die investeert in verduurzaming zoekt geen onderbieder, maar een deskundige partner die vooraf exact weet wat er moet gebeuren.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer u uw offerte onderbouwt met een helder adviesrapport waarin niet alleen het aanbod staat, maar ook de technische opzet en de verwachte prestaties transparant zijn uitgewerkt, verschuift het gesprek van prijs naar kwaliteit. Klanten begrijpen dat een vakkundige voorbereiding en veilige installatie geld kosten. Een scherpe calculatie die voorkomt dat u achteraf meerwerk moet factureren, bouwt vertrouwen op en leidt direct tot een hogere conversie. Lees meer over hoe u dit aanpakt in ons artikel over{' '}
  <a href="/blog/conversie-verhogen-offertes-installatiebedrijf" className="text-brand-primary-text font-semibold hover:underline">
    het verhogen van de conversie van offertes voor installatiebedrijven
  </a>
  .
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Bovendien helpt het om over te stappen van een handmatig calculatieproces in losse spreadsheets naar geautomatiseerde adviessoftware. Dit bespaart niet alleen aanzienlijk veel tijd per offerte, maar borgt ook dat de ingestelde marge- en kostenparameters consistent worden toegepast bij elk project. U leest hier meer over in onze analyse over de overstap{' '}
  <a href="/blog/van-excel-naar-geautomatiseerd-advies" className="text-brand-primary-text font-semibold hover:underline">
    van Excel naar geautomatiseerd advies
  </a>
  .
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  EnerCalculatie helpt installateurs om het calculatie- en offerteproces te stroomlijnen zonder in te boeten op inhoudelijke precisie. Met de software stelt u snel en onderbouwd verduurzamingsplannen samen voor zonnepanelen, thuisbatterijen, warmtepompen, laadpalen en airconditioningsystemen. Het rekenmodel combineert opwek, opslag en verbruik in één integraal dossier, zodat u direct inzicht heeft in de technische haalbaarheid en de financiële uitkomsten voor uw klant.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Regelgeving zoals de afbouw van de salderingsregeling per 1 januari 2027 door de Rijksoverheid en de voorwaarden rondom ISDE-subsidie via de RVO zijn verwerkt in de rekenmodellen. Daardoor genereert u binnen enkele minuten een professioneel, Nederlandstalig adviesrapport waarin zowel het technische verhaal als de kosten-batenanalyse helder op elkaar aansluiten. Nieuwsgierig hoe een kloppende kosten-batenanalyse uw klant overtuigt? Bekijk ook onze verdieping over de{' '}
  <a href="/blog/verduurzaming-kosten-baten-analyse" className="text-brand-primary-text font-semibold hover:underline">
    verduurzaming kosten-batenanalyse
  </a>
  .
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u ontdekken hoe uw installatiebedrijf sneller onderbouwde offertes opstelt met gegarandeerd kloppende marges? Maak vandaag nog een proefberekening of vraag een demonstratie aan van ons platform.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2">
    <a href="https://www.rvo.nl/subsidies-financiering/isde" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">
      ISDE — Investeringssubsidie duurzame energie en energiebesparing
    </a> — geraadpleegd 2026-08-06
  </li>
  <li className="mb-2">
    <a href="https://www.rijksoverheid.nl/themas/klimaat-milieu-en-natuur/energie-thuis/salderingsregeling" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">
      Salderingsregeling zonnepanelen — Rijksoverheid
    </a> — geraadpleegd 2026-08-06
  </li>
</ol>
    </BlogPostLayout>
  );
}
