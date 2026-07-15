import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'terugleverkosten-thuisbatterij')!;

export function TerugleverkostenThuisbatterijArticle() {

  return (
    <>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Naast de geleidelijke uitfasering van de salderingsregeling krijgen huishoudens met zonnepanelen steeds vaker te maken met terugleverkosten: een vergoeding die de energieleverancier in rekening brengt voor de teruggeleverde stroom. Voor uw klant voelt dit als een extra kostenpost die in geen enkele oude rendementsberekening stond. Wie dit niet uitlegt in het adviesgesprek, loopt het risico dat de klant zich achteraf bekocht voelt — terwijl een thuisbatterij in veel gevallen precies dit probleem oplost.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat zijn terugleverkosten, en waarom bestaan ze?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Terugleverkosten zijn de kosten die een energieleverancier doorberekent aan klanten die zelf elektriciteit opwekken en het overschot terugleveren aan het net. Volgens de Autoriteit Consument & Markt (ACM) maken leveranciers door zonnestroom-teruglevering daadwerkelijk hogere kosten: hogere inkoopkosten, hogere onbalanskosten op de energiemarkt, en kosten die voortvloeien uit de salderingsregeling. De ACM heeft vastgesteld dat het doorberekenen van deze kosten aan huishoudens met zonnepanelen niet onredelijk is in verhouding tot de daadwerkelijke kosten die leveranciers maken.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor uw klant betekent dit dat terugleverkosten geen tijdelijke marketingtruc van één leverancier zijn, maar een structureel onderdeel van het kostenplaatje bij zonnepanelen — naast de geleidelijke afbouw van de salderingsregeling zelf.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Waarom contracten moeilijk te vergelijken zijn</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De ACM constateert ook dat energieleveranciers terugleverkosten op uiteenlopende manieren berekenen: als vast jaarbedrag, als bedrag per kWh teruggeleverde stroom, of via een staffel met drempelwaarden. Voor klanten is daardoor vaak onduidelijk waarvoor ze precies betalen, en zijn contracten van verschillende leveranciers nauwelijks één-op-één te vergelijken.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Om dit te verhelpen, schrijft de ACM in het besluit over de modelcontracten 2026 voor dat energieleveranciers terugleverkosten in het modelcontract — het standaardcontract dat elke leverancier verplicht moet aanbieden — voortaan altijd per kilowattuur teruggeleverde stroom moeten berekenen, in plaats van via staffels of andere ondoorzichtige methodes. Dit maakt de vergoeding rechtstreeks afhankelijk van de hoeveelheid stroom die daadwerkelijk wordt teruggeleverd: hoe minder een huishouden teruglevert, hoe lager de terugleverkosten.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Negatieve stroomprijzen maken het probleem zichtbaarder</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Terugleverkosten staan niet op zichzelf. Op zonnige, winderige momenten wekken zoveel huishoudens en bedrijven gelijktijdig stroom op dat de groothandelsprijs op de elektriciteitsmarkt incidenteel onder nul zakt. Op die momenten wordt teruglevering voor een klant per saldo nog ongunstiger: niet alleen de terugleverkosten van de leverancier spelen dan een rol, ook de onderliggende marktprijs werkt tegen de klant. Dit type momenten neemt toe naarmate er meer zonnepanelen op het net worden aangesloten, en is een extra argument om teruglevering in de adviesberekening niet als constante, maar als kostenpost te behandelen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe een thuisbatterij dit compenseert</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een thuisbatterij slaat het overschot aan zonnestroom op het moment van opwek op, in plaats van dit direct terug te leveren aan het net. Die opgeslagen stroom wordt vervolgens 's avonds of op een later moment door het huishouden zelf verbruikt. Het resultaat is een hogere zelfconsumptie en een lagere teruglevering aan het net — en omdat terugleverkosten per kWh teruggeleverde stroom worden berekend, daalt de vergoeding die de klant aan de leverancier betaalt naarmate er minder wordt teruggeleverd.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor het verkoopgesprek is dit een concreet argument: een thuisbatterij is niet alleen relevant voor de periode na 2027, wanneer de salderingsregeling wegvalt, maar ook nú al voor de terugleverkosten die uw klant op de huidige energierekening ziet staan. Hoe groter het aandeel zelfconsumptie ten opzichte van teruglevering, hoe minder gevoelig de klant is voor toekomstige wijzigingen in het tarief van de leverancier.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe legt u dit uit in het adviesgesprek?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een aantal punten zijn behulpzaam om dit onderwerp helder en geloofwaardig naar de klant te brengen:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Laat zien dat terugleverkosten een kostenpost zijn die door de ACM is goedgekeurd op basis van daadwerkelijke kosten, en geen eenmalige actie van één leverancier.</li>
          <li>Reken de terugleverkosten van het huidige energiecontract van de klant mee in de terugverdientijd, in plaats van enkel uit te gaan van de salderingstarieven.</li>
          <li>Toon het verschil in teruglevering — en daarmee terugleverkosten — met en zonder thuisbatterij, gebaseerd op het werkelijke verbruiksprofiel van de klant.</li>
          <li>Wees transparant dat de exacte vergoeding per leverancier en per contract verschilt, en adviseer de klant dit bij de eigen leverancier te checken.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          In EnerCalculatie wordt de impact van teruglevering gevalideerd en deterministisch berekend op basis van het opwek- en verbruiksprofiel van de klant, zodat u in één adviesrapport laat zien wat een thuisbatterij oplevert op het gebied van zelfconsumptie, teruglevering en de daaraan gekoppelde kosten. Zo onderbouwt u het advies voor een thuisbatterij niet alleen met de situatie na{' '}
          <a href="/blog/salderingsregeling-2027" className="text-brand-primary-text font-semibold hover:underline">
            de afschaffing van de salderingsregeling in 2027
          </a>
          , maar ook met de terugleverkosten die uw klant vandaag al op de energierekening ziet.
        </p>
      </BlogPostLayout>
    </>
  );
}
