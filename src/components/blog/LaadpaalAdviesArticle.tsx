import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'laadpaal-advies-thuis')!;

export function LaadpaalAdviesArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een klant die overweegt elektrisch te gaan rijden, vraagt zelden om "een laadpaal" — hij vraagt om een oplossing die aansluit bij zijn auto, zijn woning en zijn bestaande elektrische installatie. Drie factoren bepalen samen welke configuratie passend is: het laadvermogen, de manier waarop load balancing overbelasting voorkomt, en de resterende capaciteit van de groepenkast en de netaansluiting. Wie deze drie factoren kan toelichten, geeft een onderbouwd advies in plaats van een standaardoplossing.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Laadvermogen: aansluiten op de auto én de aansluiting</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een laadpunt voor thuisgebruik wordt doorgaans op 1-fase of 3-fase aangesloten. Een 1-fase-aansluiting levert doorgaans enkele kW's aan laadvermogen; een 3-fase-aansluiting kan, afhankelijk van de groepafzekering, een aanzienlijk hoger vermogen leveren. Het daadwerkelijke laadvermogen wordt echter altijd begrensd door de zwakste schakel in de keten: de capaciteit van de auto's ingebouwde lader telt net zo hard mee als de capaciteit van de laadpaal en de aansluiting zelf.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een laadpaal met een hoger vermogen aanbieden dan de auto van de klant kan verwerken, levert geen extra laadsnelheid op — alleen een hogere investering. Het laadvermogen van het beoogde voertuig (of een realistische inschatting daarvan bij een nog aan te schaffen auto) is daarom het eerste gegeven dat u in het adviesgesprek vaststelt, vóór u een configuratie voorstelt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Load balancing: voorkomen van overbelasting</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Load balancing (lastbalancering) regelt de laadstroom van de laadpaal automatisch bij, op basis van het overige verbruik in de woning op dat moment. Bij statische lastbalancering wordt vooraf een vast maximum ingesteld; bij dynamische lastbalancering wordt het beschikbare vermogen continu gemeten, zodat de laadpaal automatisch terugschakelt zodra bijvoorbeeld een warmtepomp, airco of inductiekookplaat gelijktijdig stroom vraagt.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Zonder load balancing bestaat het risico dat de hoofdzekering van de woning afslaat op het moment dat meerdere grote verbruikers tegelijk actief zijn. Voor een klant die naast een laadpaal ook een warmtepomp, airco of thuisbatterij overweegt — vaak in één en hetzelfde verduurzamingstraject — is dynamische lastbalancering daarom geen overbodige luxe, maar een functionele vereiste voor een betrouwbare installatie.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Groepenkast en netaansluiting: de beperkende factor</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De maximale capaciteit van de netaansluiting van de woning is de harde grens waarbinnen alle gelijktijdige verbruikers moeten passen. Een laadpaal optellen bij een woning die al een warmtepomp, airco en mogelijk een thuisbatterij heeft (of krijgt), kan de beschikbare capaciteit van de groepenkast en de aansluiting overschrijden. Dat is precies de reden waarom een laadpaal-advies niet los staat van het totale energieprofiel van de woning, maar er integraal onderdeel van moet zijn.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Blijkt de resterende capaciteit ontoereikend, dan is load balancing een eerste oplossing — maar bij een structureel tekort kan een capaciteitsuitbreiding van de aansluiting bij de netbeheerder nodig zijn. Dat is een aparte aanvraagstap met een eigen doorlooptijd, die u als installateur vooraf bij de klant moet benoemen, zodat dit geen verrassing wordt na de offerte.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe legt u dit uit aan de klant?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Klanten denken bij een laadpaal vaak eerst aan laadsnelheid. Het meest overtuigende argument is dan ook om laadsnelheid niet als een keuze te presenteren, maar als de uitkomst van drie objectieve gegevens: wat de auto kan verwerken, wat de aansluiting toelaat, en hoeveel ruimte daarvan al door andere apparaten wordt gebruikt. Zo wordt direct duidelijk waarom een hoger vermogen niet altijd zinvol — of zelfs mogelijk — is, en waarom load balancing de installatie juist veiliger en toekomstbestendiger maakt in plaats van een beperking te zijn.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie maakt het specifieke laadprofiel van de laadpaal inzichtelijk en controleert direct de impact daarvan op de maximale capaciteit van de netaansluiting, in combinatie met de overige verduurzamingsmaatregelen in het dossier — zoals zonnepanelen, een warmtepomp of een thuisbatterij. Zo onderbouwt u in één adviesrapport welke configuratie technisch past bij de woning van de klant, in plaats van dit los per maatregel te beoordelen. Meer over de specifieke configuratiemogelijkheden vindt u op de{' '}
          <a href="/rekentool-laadpaal" className="text-brand-primary-text font-semibold hover:underline">
            rekentool laadpaal
          </a>
          .
        </p>
      </BlogPostLayout>
    </>
  );
}
