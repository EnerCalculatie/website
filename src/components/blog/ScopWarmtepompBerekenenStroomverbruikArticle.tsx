import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'scop-warmtepomp-berekenen-stroomverbruik')!;

export function ScopWarmtepompBerekenenStroomverbruikArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Wanneer u als installateur bij een klant aan tafel zit voor een warmtepompadvies, is de belangrijkste vraag bijna altijd: "Wat gaat mij dit extra aan stroom kosten?" Om hier een betrouwbaar antwoord op te geven, grijpen veel adviseurs naar de SCOP-waarde (Seasonal Coefficient of Performance) van het voorgestelde systeem. Hoewel deze waarde een uitstekende indicator is voor het theoretische rendement, is het direct vertalen van de SCOP naar een realistisch stroomverbruik in de praktijk vaak complexer dan een eenvoudige deling.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Een verkeerde aanname leidt al snel tot een onrealistisch verwachtingspatroon bij de klant, met mogelijke teleurstellingen achteraf over de energierekening. In dit artikel duiken we diep in de systematiek achter de SCOP-waarde. We leggen uit hoe u deze waarde nauwkeurig corrigeert voor de specifieke situatie van uw klant en hoe u op basis daarvan een gedegen, realistisch stroomverbruik berekent. Hiermee bouwt u niet alleen aan een sterke, technisch onderbouwde offerte, maar ook aan langdurig vertrouwen bij uw opdrachtgevers.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Wat is de SCOP en waarom is de COP alleen niet genoeg?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om een betrouwbare berekening te maken, moeten we eerst het verschil met de reguliere COP (Coefficient of Performance) scherp hebben. De COP is een momentopname. Deze geeft de verhouding weer tussen de afgegeven warmte en de opgenomen elektriciteit bij één specifieke buitentemperatuur en één specifieke cv-watertemperatuur (bijvoorbeeld A7/W35: lucht op 7 graden Celsius en water op 35 graden Celsius).
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Omdat het Nederlandse klimaat gedurende het stookseizoen sterk fluctueert, zegt een losse COP-waarde weinig over het daadwerkelijke jaarverbruik. Een warmtepomp presteert immers uitstekend bij milde herfsttemperaturen, maar moet harder werken wanneer het kwik onder het vriespunt daalt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  De SCOP lost dit op. Deze waarde wordt berekend op basis van de Europese norm EN 14825 en simuleert het rendement over een volledig stookseizoen. Hierbij wordt gebruikgemaakt van een gestandaardiseerd klimaatprofiel (voor Nederland is dat het 'gemiddelde' klimaatprofiel, gebaseerd op het weer in Straatsburg). De SCOP weegt het rendement bij verschillende buitentemperaturen mee, inclusief het stand-by verbruik en het eventuele verbruik van het elektrische back-up element tijdens koude perioden.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stap 1: Het bepalen van de werkelijke warmtevraag
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Voordat u met de SCOP-waarde aan de slag kunt, moet u weten hoeveel warmte de woning op jaarbasis nodig heeft. Het berekenen van het stroomverbruik heeft immers geen zin als de onderliggende warmtevraag een ruwe schatting is. Er zijn twee betrouwbare methoden om deze warmtevraag in kaart te brengen:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li>
    <strong>De transmissieberekening:</strong> Dit is de meest nauwkeurige methode, waarbij op basis van de isolatiewaarden van vloeren, muren, daken en glas, samen met de ventilatieverliezen, de exacte warmtebehoefte wordt gecalculeerd.
  </li>
  <li>
    <strong>De gasverbruiksmethode:</strong> Heeft de klant een historisch gasverbruik? Dan kunt u de jaarlijkse warmtebehoefte herleiden uit het aantal kubieke meters gas dat uitsluitend voor ruimteverwarming is gebruikt.
  </li>
</ul>
<p className="text-slate-700 leading-relaxed mb-4">
  Laten we de gasverbruiksmethode als praktisch voorbeeld nemen. Stel dat een woning gemiddeld 1.500 kubieke meter gas per jaar verbruikt. Hiervan is een deel bestemd voor warm tapwater (afhankelijk van de gezinsgrootte, vaak gesteld op 100 tot 150 kubieke meter), wat betekent dat er 1.350 kubieke meter gas overblijft voor ruimteverwarming.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Eén kubieke meter Gronings aardgas levert een energetische waarde van circa 9,7 kWh aan warmte. Omdat een oudere cv-ketel niet met een perfect rendement werkt (reken met een realistisch jaarnuttig rendement van circa 90% voor een HR-ketel), levert de ketel in de praktijk ongeveer 8,7 kWh aan nuttige warmte per kubieke meter gas.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  De totale jaarlijkse warmtevraag voor ruimteverwarming wordt dan:
</p>
<p className="text-slate-800 font-semibold bg-slate-50 p-3 rounded border border-slate-200 mb-4 inline-block">
  1.350 m³ gas x 8,7 kWh/m³ = 11.745 kWh aan benodigde warmte per jaar.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stap 2: De SCOP-waarde selecteren en corrigeren
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Nu de warmtevraag bekend is, kijken we naar de SCOP van de warmtepomp. Fabrikanten vermelden de SCOP-waarden in hun technische datasheets, gespecificeerd voor verschillende cv-aanvoertemperaturen: lagedatuurverwarming (35 °C, zoals vloerverwarming) en middentemperatuurverwarming (55 °C, zoals traditionele radiatoren).
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het is van cruciaal van belang dat u de SCOP selecteert die past bij het daadwerkelijke afgiftesysteem van de woning. Plakt u de SCOP voor 35 °C op een woning die wordt verwarmd met radiatoren op 55 °C? Dan zal het uiteindelijke stroomverbruik in de praktijk aanzienlijk hoger uitvallen dan u in de offerte heeft voorgerekend.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Daarnaast moet u rekening houden met de stooklijn. Een moderne warmtepomp werkt weersafhankelijk. Dit betekent dat de aanvoertemperatuur van het cv-water daalt als de buitentemperatuur stijgt. Hierdoor is het werkelijke gemiddelde rendement in de praktijk vaak gunstiger dan wanneer u continu op de maximale ontwerptemperatuur zou rekenen. In een realistisch advies neemt u daarom altijd de gewogen gemiddelde aanvoertemperatuur als uitgangspunt.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stap 3: Rekening houden met warm tapwater
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Een veelgemaakte fout is het toepassen van de ruimteverwarmings-SCOP op de gehele warmtebehoefte van de woning. Een warmtepomp verwarmt de woning namelijk niet alleen, maar zorgt in veel gevallen ook voor het warme tapwater.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het bereiden van warm tapwater vraagt om een veel hogere temperatuur (doorgaans tussen de 50 °C and 58 °C, met periodieke uitschieters naar 60 °C wegens legionellapreventie) dan de ruimteverwarming. Omdat het temperatuurverschil tussen de bron en de afgifte hierdoor veel groter is, ligt het rendement (de COP voor tapwater) aanzienlijk lager. Waar een warmtepomp voor ruimteverwarming een SCOP van bijvoorbeeld 4,5 kan halen, ligt het gemiddelde rendement voor tapwaterbereiding in de praktijk vaak tussen de 2,0 en 2,5.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Om tot een kloppende berekening te komen, splitst u de berekening op:
</p>
<ul className="list-disc pl-6 mb-6 text-slate-700">
  <li>
    <strong>Ruimteverwarming:</strong> Warmtebehoefte gedeeld door de SCOP voor ruimteverwarming.
  </li>
  <li>
    <strong>Warm tapwater:</strong> Warmtebehoefte voor tapwater gedeeld door de specifieke tapwater-COP (volgens de productkaart van de fabrikant, vaak aangeduid met de COP_dhw of de tapprofiel-efficiëntie ηwh).
  </li>
</ul>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Stap 4: De invloed van de back-up heater
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  In monovalent ontworpen systemen dekt de warmtepomp de volledige warmtevraag af, zelfs op de koudste dagen. In de Nederlandse praktijk zien we echter vaak bivalent ontworpen systemen of all-electric systemen waarbij een elektrisch element (de back-up heater) bijspringt tijdens extreem koude perioden of tijdens de legionellarun.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Het inschakelen van dit elektrische element gebeurt met een COP van exact 1,0 (directe elektrische verwarming). Als de warmtepomp te krap is gedimensioneerd, zal het elektrische element vaker moeten bijspringen. Dit heeft een direct negatief effect op het werkelijke seizoensrendement van de totale installatie. Zorg er daarom voor dat u bij de dimensionering de bivalente temperatuur nauwkeurig bepaalt en dit meeweegt in uw berekeningen.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Praktisch rekenvoorbeeld
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Laten we de theorie vertalen naar een concreet praktijkvoorbeeld. We nemen de woning uit stap 1 met een warmtevraag voor ruimteverwarming van 11.745 kWh. De woning is voorzien van vloerverwarming, waardoor we kunnen rekenen met een gunstige SCOP van 4,5 voor ruimteverwarming.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Daarnaast heeft het huishouden een warmtapwatervraag die overeenkomt met de energie-inhoud van 150 kubieke meter gas. Dit komt neer op circa 1.300 kWh aan warmtebehoefte voor tapwater per jaar. Het rendement van de warmtepomp voor tapwaterbereiding is vastgesteld op een COP van 2,2.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  We berekenen het stroomverbruik als volgt:
</p>
<ol className="list-decimal pl-6 mb-6 text-slate-700">
  <li className="mb-2">
    <strong>Stroomverbruik voor ruimteverwarming:</strong> 11.745 kWh / 4,5 = 2.610 kWh aan elektriciteit.
  </li>
  <li className="mb-2">
    <strong>Stroomverbruik voor warm tapwater:</strong> 1.300 kWh / 2,2 = 591 kWh aan elektriciteit.
  </li>
  <li className="mb-2">
    <strong>Totaal realistisch extra stroomverbruik per jaar:</strong> 2.610 kWh + 591 kWh = 3.201 kWh aan elektriciteit.
  </li>
</ol>
<p className="text-slate-700 leading-relaxed mb-4">
  Zou u in dit voorbeeld de tapwatervraag over het hoofd hebben gezien, of de gunstige SCOP van 4,5 op het gehele verbruik hebben toegepast, dan was u uitgekomen op een theoretisch verbruik van minder dan 2.900 kWh. Door de splitsing te maken, voorkomt u een structurele onderschatting van het werkelijke verbruik.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Impact van het afgiftesysteem op de SCOP-waarde
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Om te illustreren hoe gevoelig het stroomverbruik is voor de gekozen cv-temperaturen, vergelijken we in de onderstaande tabel dezelfde warmtepomp onder verschillende omstandigheden.
</p>

<div className="overflow-x-auto mb-6">
  <table className="w-full border-collapse border border-slate-300 text-sm">
    <thead>
      <tr className="bg-slate-100 font-semibold text-slate-700">
        <th className="border border-slate-300 p-3 text-left">Afgiftesysteem</th>
        <th className="border border-slate-300 p-3 text-left">Ontwerptemperatuur</th>
        <th className="border border-slate-300 p-3 text-left">Richtwaarde SCOP</th>
        <th className="border border-slate-300 p-3 text-left">Warmtevraag (ruimte)</th>
        <th className="border border-slate-300 p-3 text-left">Realistisch stroomverbruik</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700">Vloerverwarming (LTV)</td>
        <td className="border border-slate-300 p-3 text-slate-700">35 °C / 30 °C</td>
        <td className="border border-slate-300 p-3 text-slate-700">4,5 - 4,8</td>
        <td className="border border-slate-300 p-3 text-slate-700">11.745 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">circa 2.450 - 2.610 kWh</td>
      </tr>
      <tr className="bg-slate-50">
        <td className="border border-slate-300 p-3 text-slate-700">LTV-radiatoren / Convectoren</td>
        <td className="border border-slate-300 p-3 text-slate-700">45 °C / 40 °C</td>
        <td className="border border-slate-300 p-3 text-slate-700">3,8 - 4,1</td>
        <td className="border border-slate-300 p-3 text-slate-700">11.745 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">circa 2.860 - 3.090 kWh</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-3 text-slate-700">Klassieke radiatoren (HTV)</td>
        <td className="border border-slate-300 p-3 text-slate-700">55 °C / 45 °C</td>
        <td className="border border-slate-300 p-3 text-slate-700">3,0 - 3,4</td>
        <td className="border border-slate-300 p-3 text-slate-700">11.745 kWh</td>
        <td className="border border-slate-300 p-3 text-slate-700">circa 3.450 - 3.910 kWh</td>
      </tr>
    </tbody>
  </table>
</div>

<p className="text-slate-700 leading-relaxed mb-4">
  De tabel laat duidelijk zien dat de keuze van het afgiftesysteem een directe, substantiële invloed heeft op de SCOP en daarmee op de elektriciteitsvraag van uw klant. Dit benadrukt hoe belangrijk het is om de woning als één samenhangend energetisch systeem te beschouwen in uw verkoop- en adviestraject.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Het handmatig doorrekenen van transmissieverliezen, stooklijnen, tapwaterprofielen en de bijbehorende SCOP-correcties is een tijdrovende klus die bovendien gevoelig is voor fouten. Een kleine misrekening in de transmissie of een verkeerd gekozen SCOP-waarde kan leiden tot een onnauwkeurig advies, wat achteraf voor ontevreden klanten zorgt.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Met EnerCalculatie automatiseert u dit volledige proces. De software draait op één doorlopend rekenmodel dat rekening houdt met de specifieke parameters van de woning, het type afgiftesysteem en de weersafhankelijke prestaties van de geselecteerde warmtepomp. In plaats van losse aannames te doen, combineert de tool de opwek van eventuele zonnepanelen, de opslag van een thuisbatterij en de extra stroomvraag van de warmtepomp tot één sluitend en deterministisch berekend energieprofiel.
</p>
<p className="text-slate-700 leading-relaxed mb-4">
  Wilt u meer weten over de theoretische basis onder deze berekeningen? Lees dan ook ons artikel over de{' '}
  <a href="/blog/warmtepomp-rendement-aannames" className="text-brand-primary-text font-semibold hover:underline">
    Nederlandse standaardaannames die uw warmtepompberekening onderbouwen
  </a>
  . Of bent u benieuwd hoe u de dimensionering aanpakt bij een hybride opstelling? Bekijk dan ons artikel over{' '}
  <a href="/blog/hybride-warmtepomp-dimensionering-gasketel" className="text-brand-primary-text font-semibold hover:underline">
    het dimensioneren van een hybride warmtepomp naast een bestaande gasketel
  </a>
  . Voor een directe demonstratie van onze rekenkracht kunt u terecht op de{' '}
  <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">
    rekentool warmtepomp
  </a>
  .
</p>
    </BlogPostLayout>
  );
}
