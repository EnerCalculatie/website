import { BlogPostLayout } from './BlogPostLayout';
import { MathCallout } from './MathCallout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'bidirectioneel-laden-v2g')!;

export function BidirectioneelLadenArticle() {

  return (
    <>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Tot voor kort was een laadpaal een apparaat met één richting: stroom van het net naar de auto. Sinds de
          eerste helft van 2026 is dat niet langer vanzelfsprekend. Renault is de eerste fabrikant met een
          opschaalbare V2G-dienst voor Nederlandse particulieren, en steeds meer laadpalen en voertuigen
          ondersteunen de nieuwe CCS-standaard voor bidirectioneel laden. Voor u als installateur betekent dit een
          nieuwe vraag in het adviesgesprek: wat kan een klant met een elektrische auto écht terugleveren, wat kost
          dat, en welke techniek en regelgeving zitten daaronder?
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">V2H en V2G: twee toepassingen, één techniek</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bidirectioneel laden wordt in de praktijk in twee vormen aangeboden, en het onderscheid is voor uw advies
          belangrijker dan de techniek erachter. Bij <strong>Vehicle-to-Home (V2H)</strong> gebruikt de klant de
          accu van zijn auto als een extra thuisbatterij: overdag geladen zonnestroom wordt 's avonds weer uit de
          auto gehaald voor eigen verbruik. Dat verhoogt de zelfconsumptie, net als een reguliere thuisbatterij, en
          blijft binnen de eigen meterkast — zonder marktpartij of leveringscontract erbij.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bij <strong>Vehicle-to-Grid (V2G)</strong> gaat de teruggeleverde stroom daadwerkelijk het net op, en
          rekent een marktpartij dit voor de klant af. Renaults V2G-dienst draait bijvoorbeeld op drie
          onderdelen: een V2G-geschikte auto (de Renault 5 E-Tech electric, Renault 4 E-Tech electric en Alpine
          A290 zijn de eerste modellen; Twingo, Alpine A390, Scénic en Mégane volgen in de loop van 2026), een
          bidirectionele laadpaal van een gecertificeerde partij, en een dynamisch energiecontract waarmee laad- en
          teruglevermomenten automatisch op de stroomprijs worden afgestemd. V2G vraagt dus om een aggregator of
          energieleverancier die dit contractueel regelt — V2H niet.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">De techniek: ISO 15118-20 en de keten die moet kloppen</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bidirectioneel laden werkt alleen als auto, laadpaal en energiemanagement dezelfde taal spreken. ISO
          15118-20 is de internationale CCS-standaard die deze communicatie regelt en die in 2026 door een groeiend
          aantal fabrikanten en laadpaalbouwers wordt uitgerold; een aanvulling op dit protocol zorgt er bovendien
          voor dat de laadpaal automatisch de juiste instellingen overneemt volgens de lokale netcode. Sommige
          modellen die al langer bidirectioneel kunnen laden — zoals de Nissan Leaf — gebruiken nog het oudere
          CHAdeMO in plaats van CCS. Adviseer een klant daarom nooit "een bidirectionele laadpaal", maar controleer
          eerst of het beoogde (of aanwezige) automodel, de laadpaal en eventuele omvormer dezelfde standaard
          ondersteunen — een mismatch hierin is de meest voorkomende reden dat bidirectioneel laden in de praktijk
          niet werkt zoals verwacht.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor de installatie zelf verandert er weinig ten opzichte van een reguliere laadpaal of thuisbatterij:
          NEN 1010 geldt onverkort, en een vast aangesloten systeem dat teruglevert aan het net moet worden gemeld
          bij de netbeheerder, net als bij een thuisbatterij. Voor de netbeheerder maakt het niet uit of de
          teruggeleverde stroom van een laadpaal of een thuisbatterij komt, zolang de spanningskwaliteit aan de
          eisen voldoet.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat kost een bidirectionele laadpaal in 2026?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De investering ligt in 2026 typisch tussen de €3.300 en €8.700 all-in — de laadpaal zelf kost circa
          €2.500 tot €6.500, met daarbovenop €800 tot €2.200 voor installatie en eventuele aanpassingen aan de
          meterkast of aansluiting, exclusief de auto zelf. Dat is een aanzienlijk hogere post dan een reguliere
          1-fase- of 3-fase-laadpaal, en verdient dezelfde behandeling als een thuisbatterij-advies: een
          onderbouwde inschatting van de terugverdientijd, niet alleen een verkoopargument over "de auto als
          accu".
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een landelijke subsidie voor bidirectionele laadpalen bij particulieren ontbreekt vooralsnog. Voor een
          klant die vooral V2H wil — eigen zelfconsumptie verhogen — is de vergelijking met een reguliere
          thuisbatterij dan ook de eerlijkste: een thuisbatterij is losstaand van de accustand van de auto, terwijl
          V2H de beschikbare capaciteit deelt met de rijbehoefte van de klant.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Subsidie en verrekening voor zakelijke klanten</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor bedrijven ligt dit anders. De SPRILA-regeling (Subsidieregeling Private Laadinfrastructuur bij
          bedrijven) van de RVO loopt in 2026 van 20 januari tot en met 18 december, met een apart budget van
          €68,5 miljoen voor nieuwe laadpunten en €45 miljoen voor stationaire batterijsystemen tot 1.000 kWh per
          laadplek (€60 per kWh voor grootbedrijven, €85 per kWh voor mkb). Een bidirectionele laadpaal op eigen of
          gehuurd bedrijfsterrein kan hieronder vallen, mits aan de gestelde voorwaarden wordt voldaan — raadpleeg
          rvo.nl voor de actuele voorwaarden per aanvraagronde.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Sinds 1 juli 2026 komen bidirectionele laadpalen met een MID-gecertificeerde kWh-meter (doorgaans klasse
          B volgens EN 50470-3) ook in aanmerking voor ERE-certificaten bij zakelijk gebruik. Deze certificaten
          verhandelen bedrijven op een aparte markt, los van de vergoeding die een energieleverancier of aggregator
          al voor de teruggeleverde stroom betaalt.
        </p>
        <MathCallout title="Indicatie ERE-vergoeding">
          <p>Marktprijs ERE-certificaat in 2026: indicatief <code>7-14 cent</code> per kWh, gemiddeld circa <code>10 cent</code>.</p>
          <p>Bij <code>1.000 kWh</code> teruggeleverd per laadpaal per jaar: circa <code>€100</code> aan ERE-vergoeding.</p>
          <p>Dit komt bovenop — niet in plaats van — de vergoeding voor de geleverde stroom zelf.</p>
        </MathCallout>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat betekent dit voor uw adviesgesprek?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bidirectioneel laden is in 2026 nog een relatief jonge markt: een beperkt aantal automodellen, een
          beperkt aantal gecertificeerde laadpalen, en nog geen landelijke particuliere subsidie. Tegelijk groeit
          het aanbod snel, zoals blijkt uit het deelautoproject van MyWheels in Utrecht, waar circa 300
          Renault 5 E-Tech-deelauto's al terugleveren aan het net en dat aantal in de loop van 2026 verder oploopt.
          Voor uw adviesgesprek zijn drie punten leidend:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>
            <strong>Vraag eerst V2H of V2G:</strong> wil de klant vooral eigen zelfconsumptie verhogen, of
            daadwerkelijk terugleveren aan het net via een marktpartij? Dat bepaalt of een dynamisch
            energiecontract en een aggregator nodig zijn.
          </li>
          <li>
            <strong>Controleer de keten op compatibiliteit:</strong> auto, laadpaal en (indien aanwezig) omvormer
            moeten dezelfde standaard ondersteunen — CCS met ISO 15118-20, of het oudere CHAdeMO.
          </li>
          <li>
            <strong>Reken de investering onderbouwd door:</strong> een bidirectionele laadpaal kost aanzienlijk
            meer dan een reguliere laadpaal, en voor particulieren ontbreekt vooralsnog een landelijke subsidie —
            zakelijke klanten hebben wel SPRILA en, sinds 1 juli 2026, de ERE-regeling tot hun beschikking.
          </li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie berekent het laadprofiel en de impact op de netaansluiting van een laadpaal, in combinatie
          met de overige verduurzamingsmaatregelen in het dossier van uw klant — zoals zonnepanelen of een
          thuisbatterij. Meer over de basisfactoren die de juiste laadpaal-configuratie bepalen, leest u in{' '}
          <a href="/blog/laadpaal-advies-thuis" className="text-brand-primary-text font-semibold hover:underline">
            dit artikel over laadpaal-advies
          </a>
          , en op de{' '}
          <a href="/rekentool-laadpaal" className="text-brand-primary-text font-semibold hover:underline">
            rekentool laadpaal
          </a>
          {' '}rekent u direct door welke configuratie past bij de situatie van uw klant.
        </p>
      </BlogPostLayout>
    </>
  );
}
