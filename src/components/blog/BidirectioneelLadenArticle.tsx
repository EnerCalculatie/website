import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { MathCallout } from './MathCallout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'bidirectioneel-laden-v2h-v2g')!;

export function BidirectioneelLadenArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bidirectioneel laden — een elektrische auto niet alleen laden, maar er ook stroom uit terugleveren — is
          in Nederland technisch mogelijk, maar op consumentenniveau nog geen volwaardige praktijk. Het gebruik
          van de autoaccu om de eigen woning te voeden (V2H) is vandaag al haalbaar met de juiste combinatie van
          voertuig en laadpaal; het betaald terugleveren aan het net (V2G) loopt tegen dubbele energiebelasting
          voor kleinverbruikers aan, een knelpunt dat het kabinet via een nationale routekaart wil oplossen. Voor
          uw laadpaal-advies betekent dit: vandaag kiest u toekomstbestendige hardware, maar u belooft uw klant
          geen verdienmodel dat er nog niet is.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          V2L, V2H en V2G: wat is precies het verschil?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Onder "bidirectioneel laden" vallen drie verschillende toepassingen, met elk hun eigen techniek en
          juridisch kader. <strong>V2L</strong> (Vehicle-to-Load) gebruikt de autoaccu als draagbare stroombron
          via een stopcontact of adapter — denk aan gereedschap op de bouwplaats. <strong>V2H</strong>
          (Vehicle-to-Home) voedt de woninginstallatie rechtstreeks vanuit de auto, achter de meter, zonder dat de
          stroom het openbare net op gaat. <strong>V2G</strong> (Vehicle-to-Grid) levert de autoaccu juist terug
          aan het net, vergelijkbaar met de teruglevering van een thuisbatterij of zonnepanelen.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dit onderscheid is relevant voor uw adviesgesprek: V2L en V2H raken vooral de eigen meterkast en zijn
          met gecertificeerde hardware al inzetbaar, terwijl V2G tegen fiscale en netbeheer-vraagstukken aanloopt
          die nog niet volledig zijn opgelost. Wie deze drie termen door elkaar gebruikt, wekt bij de klant
          verwachtingen die de huidige regelgeving niet waarmaakt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          AFIR en ISO 15118: de technische mijlpalen voor 2026 en 2027
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De Europese AFIR-verordening (Alternative Fuels Infrastructure Regulation) legt de technische basis voor
          bidirectioneel laden stapsgewijs vast. Vanaf 8 januari 2026 moeten nieuw geplaatste of ingrijpend
          vernieuwde publieke AC-laadpunten voldoen aan de ISO 15118-2-norm, die digitale communicatie tussen
          voertuig en laadpunt regelt. Vanaf 1 januari 2027 wordt de opvolger, ISO 15118-20, verplicht voor alle
          nieuwe en ingrijpend vernieuwde AC- én DC-laadpunten — zowel publiek als privaat. Deze norm ondersteunt
          de communicatie die nodig is voor V2G.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Belangrijk voor uw advies: bestaande laadpalen hoeven niet vervangen te worden, de eis geldt alleen voor
          nieuwe of ingrijpend vernieuwde installaties. Voor een klant die nu al een laadpaal thuis laat plaatsen,
          is ISO 15118-20-ondersteuning wél een zinvol punt om mee te nemen in de afweging — niet omdat V2G
          morgen al rendabel is, maar omdat de hardware anders over enkele jaren opnieuw vervangen moet worden om
          bidirectioneel te kunnen laden.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          De dubbele energiebelasting: het belangrijkste knelpunt voor woningeigenaren
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bij V2G wordt stroom eerst geladen (en belast als afname) en later teruggeleverd — zonder dat de
          huidige meetinfrastructuur bij kleinverbruikers onderscheid maakt tussen stroom die voor eigen verbruik
          is bedoeld en stroom die specifiek voor teruglevering is ingekocht. Daardoor kan dezelfde kWh feitelijk
          twee keer energiebelasting opleveren, wat de businesscase van V2G voor huishoudens ondermijnt. Voor
          grootverbruikers is dit knelpunt al sinds 1 januari 2022 opgelost; voor kleinverbruikers ontbreekt tot
          op heden een structurele oplossing, onder meer omdat de huidige slimme meter onvoldoende inzicht geeft
          in de afzonderlijke stroomstromen achter de aansluiting.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Het ministerie van Infrastructuur en Waterstaat werkt aan een nationale routekaart bidirectioneel laden,
          met als doel de opschaling van V2H en V2G in Nederland te structureren en de dubbele belasting voor
          kleinverbruikers aan te pakken. De planning gaat uit van een eerste toepassingsfase tot 2030, gevolgd
          door verdere opschaling in de jaren daarna. Zolang deze routekaart niet is uitgevoerd, blijft V2G voor
          woningeigenaren een pilot- en early-adopter-toepassing, geen mainstream verdienmodel.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Wat levert het uw klant op — en hoe rekent u dat door?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Onderzoeksbureau Revnext berekende, in het kader van de nationale routekaart, dat een huishouden met
          een bestaande elektrische auto en eigen zonnepanelen door bidirectioneel laden kan besparen tot bijna
          € 900 per jaar; voor een nieuwe EV-rijder kan dit voordeel oplopen tot ruim € 1.050 per jaar. Deze
          besparing ontstaat vooral doordat de autoaccu overtollige zonnestroom opslaat voor eigen verbruik in
          plaats van dat deze tegen een laag terugleveringstarief het net op gaat — het V2H-scenario dus, niet
          per se betaalde V2G-teruglevering.
        </p>
        <MathCallout title="Indicatie van de besparing (V2H, eigen verbruik)">
          <p>
            <code>jaarlijkse besparing ≈ opgeslagen zonnestroom (kWh) × (leveringstarief − terugleveringstarief)</code>
          </p>
          <p>
            Volgens Revnext-onderzoek: <code>bestaande EV + zonnepanelen ≈ € 900/jaar</code>,{' '}
            <code>nieuwe EV ≈ € 1.050+/jaar</code>
          </p>
        </MathCallout>
        <p className="text-slate-700 leading-relaxed mb-4">
          Presenteer dit als indicatie op basis van extern onderzoek, niet als een garantie: de daadwerkelijke
          besparing hangt af van het rijgedrag van de klant, de omvang van de zonnepaneelinstallatie en het
          gekozen energiecontract. Volgens de routekaart heeft 61% van de EV-rijders met een eigen laadpunt ook
          zonnepanelen — precies de doelgroep waarbij dit gesprek relevant is.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Wat betekent dit voor uw adviesgesprek vandaag?
        </h2>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>
            <strong>Beheer verwachtingen:</strong> leg het onderscheid tussen V2H en V2G uit voordat u het over
            "geld verdienen met de auto" heeft — dat laatste is voor woningeigenaren nog geen gevestigde praktijk.
          </li>
          <li>
            <strong>Kies toekomstbestendige hardware:</strong> bij een nieuwe laadpaal-installatie is
            ISO 15118-20-ondersteuning een overweging waard, zeker bij klanten die nu al zonnepanelen of een
            thuisbatterij hebben.
          </li>
          <li>
            <strong>Koppel het aan het bestaande dossier:</strong> een klant met zonnepanelen en interesse in een
            thuisbatterij is dezelfde klant die op termijn baat heeft bij V2H — bespreek beide opties in
            samenhang in plaats van als losse offertes.
          </li>
          <li>
            <strong>Volg de routekaart:</strong> zodra de dubbele energiebelasting voor kleinverbruikers is
            opgelost, verandert de businesscase van V2G snel. Controleer bij een concreet aanbod altijd de
            actuele stand van zaken bij de netbeheerder en de leverancier van de klant.
          </li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Hoe EnerCalculatie hiermee omgaat
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie berekent vandaag de businesscase van zonnepanelen, thuisbatterij en laadpaal in
          onderlinge samenhang, zodat u een klant met een bestaande EV en zonnepanelen een gevalideerd beeld geeft
          van de zelfconsumptie en terugverdientijd — de basis waarop ook een toekomstig V2H-scenario voortbouwt.
          Zodra bidirectioneel laden voor kleinverbruikers fiscaal en technisch is uitgekristalliseerd, werken wij
          dit uit in de rekenmodellen. Meer over de onderliggende factoren voor een{' '}
          <a href="/blog/laadpaal-advies-thuis" className="text-brand-primary-text font-semibold hover:underline">
            passend laadpaal-advies
          </a>{' '}
          of{' '}
          <a href="/blog/thuisbatterij-capaciteit-kiezen" className="text-brand-primary-text font-semibold hover:underline">
            het dimensioneren van een thuisbatterij
          </a>{' '}
          leest u in onze kennisbank.
        </p>
      </BlogPostLayout>
    </>
  );
}
