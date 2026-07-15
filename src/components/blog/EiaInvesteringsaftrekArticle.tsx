import { BlogPostLayout } from './BlogPostLayout';
import { MathCallout } from './MathCallout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'energie-investeringsaftrek-eia-2026')!;

export function EiaInvesteringsaftrekArticle() {

  return (
    <>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bij een zakelijke klant met een bedrijfsdak, wagenpark of bedrijfspand is niet de ISDE, maar de energie-investeringsaftrek (EIA) het relevante fiscale instrument: in 2026 mag de ondernemer 40% van het investeringsbedrag in zonnepanelen, een warmtepomp of laadinfrastructuur extra aftrekken van de fiscale winst, bovenop de reguliere afschrijving. De aftrek geldt alleen als het bedrijfsmiddel voldoet aan de specifieke eisen van de Energielijst 2026 én binnen drie maanden na het aangaan van de verplichting bij de RVO wordt gemeld.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat is de energie-investeringsaftrek precies?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De EIA is geen subsidie die wordt uitgekeerd, maar een fiscale aftrekpost: de ondernemer trekt een percentage van het investeringsbedrag extra af van de fiscale winst, naast de gebruikelijke afschrijving. Dat verlaagt de te betalen inkomsten- of vennootschapsbelasting. De regeling staat open voor ondernemers die investeren in bedrijfsmiddelen die op de jaarlijkse Energielijst van de RVO staan — van zonnepanelen op een bedrijfsdak tot warmtepompen en laadinfrastructuur.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dit onderscheidt de EIA nadrukkelijk van de{' '}
          <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">
            ISDE
          </a>
          , die is gericht op particuliere woningeigenaren en een directe subsidie uitkeert. Zodra de investering op naam van een onderneming staat en zakelijk wordt gebruikt, is de EIA het instrument om over te adviseren, niet de ISDE.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoeveel levert de EIA in 2026 concreet op?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Het aftrekpercentage voor 2026 bedraagt 40% van het investeringsbedrag waarvoor een EIA-verklaring is afgegeven. Voor de regeling is in 2026 in totaal €460 miljoen beschikbaar. Per bedrijfsmiddel geldt een minimale investering van €2.500; per onderneming komt maximaal €155 miljoen aan energie-investeringen per kalenderjaar voor de aftrek in aanmerking.
        </p>
        <MathCallout title="Fiscaal voordeel van de EIA berekenen">
          <p>
            <code>aftrekbaar bedrag = 40% × investeringsbedrag</code>
          </p>
          <p>
            Voorbeeld: <code>40% × € 50.000 (zonnepanelen bedrijfsdak) = € 20.000</code>
          </p>
          <p>
            <code>belastingvoordeel = aftrekbaar bedrag × vpb-tarief</code>
          </p>
          <p>
            Tot € 200.000 winst (19% vpb): <code>€ 20.000 × 19% = € 3.800</code>
          </p>
          <p>
            Boven de schijfgrens (25,8% vpb): <code>€ 20.000 × 25,8% = € 5.160</code>
          </p>
        </MathCallout>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dit voordeel komt bovenop de reguliere afschrijving van het bedrijfsmiddel — de EIA is een extra aftrekpost, geen vervanging daarvan. Het daadwerkelijke belastingvoordeel hangt af van het vennootschapsbelastingtarief (of het inkomstenbelastingtarief bij een eenmanszaak of vof) dat op de winst van uw klant van toepassing is.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Aan welke eisen moet de investering voldoen?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De Energielijst 2026 stelt per categorie eigen technische eisen. Een offerte die daar niet expliciet op aansluit, kan een klant achteraf de aftrek kosten:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>
            <strong>Zonnepanelen:</strong> het moet gaan om een groter aantal panelen met een gecombineerd piekvermogen van minimaal 15 kWp per aansluiting. Het maximale gecombineerde vermogen is in 2026 verhoogd naar 100 kWp per aansluiting, wat ook grotere kantoor-, zorg-, onderwijs- en logistieke daken interessant maakt.
          </li>
          <li>
            <strong>Warmtepompen:</strong> alleen elektrisch aangedreven warmtepompen met een halogeenvrij koudemiddel, op basis van een open of gesloten bodembron, en met een minimale SCOP van 4,5 komen in aanmerking. Een lucht/water-warmtepomp valt in 2026 buiten de EIA, tenzij deze een halogeenvrij koudemiddel gebruikt. Een gasketel is in geen enkel pakket meer subsidiabel via de EIA, ook niet als onderdeel van een hybride oplossing.
          </li>
          <li>
            <strong>Laadinfrastructuur:</strong> een oplaadpunt moet publiek toegankelijk zijn — zonder slagboom voor derden, met redelijke openingstijden en een betaalmogelijkheid — en voldoen aan een minimumvermogen van AC ≥ 11 kW of DC ≥ 20 kW met een vaste CCS- of CHAdeMO-connector. Een puur interne laadpaal voor het eigen wagenpark valt daarmee vaak buiten deze categorie.
          </li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor zakelijke laadpleinen speelt bovendien de netcapaciteit op de locatie een rol bij de haalbaarheid van de aansluiting zelf — lees daarover ook ons artikel over{' '}
          <a href="/blog/netcongestie-wachtlijst-zakelijk-2026" className="text-brand-primary-text font-semibold hover:underline">
            de netcongestie-wachtlijst voor zakelijke aansluitingen
          </a>
          .
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe combineert u de EIA met KIA, MIA en SPRILA?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De EIA is te combineren met de kleinschaligheidsinvesteringsaftrek (KIA), mits aan de KIA-voorwaarden wordt voldaan. De EIA is niet te combineren met de milieu-investeringsaftrek (MIA) voor hetzelfde bedrijfsmiddel: uw klant kiest per investering voor één van de twee. Bij laadinfrastructuur die onder de SPRILA-regeling (Subsidieregeling Private Laadinfrastructuur bij bedrijven) is aangevraagd, moet de al ontvangen SPRILA-subsidie verplicht in mindering worden gebracht op de EIA-aftrekbasis — deze subsidies zijn dus niet los van elkaar op te tellen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe en wanneer meldt u de investering bij de RVO?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De melding gebeurt via het eLoket van de RVO, en moet binnen drie maanden na het aangaan van de verplichting — doorgaans het moment van ondertekenen van de offerte of opdrachtbevestiging, niet de factuurdatum — zijn ingediend. Wie deze termijn mist, verliest de aftrek definitief, ook als het bedrijfsmiddel verder volledig aan de Energielijst voldoet. Elke categorie op de Energielijst heeft een eigen code; de klant heeft de juiste technische specificaties (vermogen, SCOP, koudemiddel, laadvermogen) nodig om bij de melding de juiste categorie te kunnen aanvinken.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat is uw rol als installateur in dit traject?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Net als bij de ISDE geldt: u onderbouwt de technische kant, de klant (of diens accountant) verzorgt de fiscale melding en aangifte. Een offerte die het vermogen, de SCOP, het koudemiddel of het laadvermogen niet expliciet benoemt, bemoeilijkt de melding onnodig. Wijs uw klant daarnaast proactief op de driemaandentermijn: dit is een moment waarop installateur en opdrachtgever elkaar makkelijk mislopen, terwijl de aftrek daardoor onnodig verloren gaat.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Vermeld in het adviesgesprek expliciet dat de EIA een fiscaal voordeel is, geen garantie: de daadwerkelijke besparing hangt af van de winst en het toepasselijke belastingtarief van de klant, en de definitieve beoordeling ligt bij de RVO en de Belastingdienst.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie berekent voor zakelijke installaties het technische vermogen en rendement van zonnepanelen, warmtepompen en laadpalen, zodat de kerngegevens die de RVO voor een EIA-melding vraagt direct in het adviesrapport staan. Zo onderbouwt u niet alleen het energetische rendement, maar ook de aansluiting op de eisen van de Energielijst, in één samenhangend dossier. Bekijk de{' '}
          <a href="/rekentool-zonnepanelen" className="text-brand-primary-text font-semibold hover:underline">
            rekentool zonnepanelen
          </a>
          {', '}
          <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">
            rekentool warmtepomp
          </a>
          {' '}of{' '}
          <a href="/rekentool-laadpaal" className="text-brand-primary-text font-semibold hover:underline">
            rekentool laadpaal
          </a>
          {' '}voor de specifieke berekeningsmogelijkheden.
        </p>
      </BlogPostLayout>
    </>
  );
}
