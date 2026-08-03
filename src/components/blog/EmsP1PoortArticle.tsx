import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'energiemanagementsysteem-p1-poort')!;

export function EmsP1PoortArticle() {

  return (
    <>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een woning met zonnepanelen, een thuisbatterij, een laadpaal én een warmtepomp heeft al snel vier apparaten die onafhankelijk van elkaar stroom vragen of opwekken. Zonder onderlinge afstemming laden batterij en auto soms tegelijk op het moment dat de warmtepomp ook draait — precies wanneer de aansluiting het minst ruimte heeft. Een energiemanagementsysteem (EMS) lost dit op door via de P1-poort van de slimme meter continu mee te lezen en de apparaten op basis daarvan aan te sturen. Voor u als installateur wordt de P1-poort daarmee een standaardonderdeel van het ontwerp, niet een optionele toevoeging achteraf.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat de P1-poort daadwerkelijk levert</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De P1-poort is de RJ12-uitgang op de slimme meter die volgens het DSMR-protocol (Dutch Smart Meter Requirements) elke seconde het actuele vermogen doorgeeft, en elke kwartier de verbruiks- en teruglevertotalen. Vrijwel alle sinds 2015 geplaatste meters ondersteunen DSMR 5.0 of hoger. De poort is bij oplevering meestal niet actief: de klant (of u namens de klant) activeert deze gratis via het klantportaal van de netbeheerder — mijnliander.nl bij Liander, mijnaansluiting.nl bij Enexis, of het klantportaal van Stedin, afhankelijk van het verzorgingsgebied.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Belangrijk verschil met de meterdata van de omvormer of batterij-omvormer: de P1-poort meet op het punt van de netaansluiting, dus na saldering van alle apparaten binnenshuis. Een EMS dat alleen op omvormerdata stuurt, ziet niet wat de warmtepomp of laadpaal op datzelfde moment al verbruikt. Voor betrouwbare nulpuntsturing — het automatisch bijsturen van laadvermogen zodat de netaansluiting nooit wordt overschreden — is de P1-uitlezing daarom de meest robuuste databron.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe een EMS de aansturing regelt</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een EMS combineert de P1-data met de meetgegevens van omvormer, thuisbatterij en laadpaal, en berekent op basis daarvan continu een sturingsbeslissing. Bij overschot aan zonnestroom laadt de batterij eerst; is de batterij vol, dan schakelt het EMS de laadpaal of de warmtepompboiler bij. Op momenten dat het net krap is — bijvoorbeeld tijdens een piekuur onder een dynamisch energiecontract — ontlaadt de batterij juist, of wordt het laadvermogen van de auto tijdelijk verlaagd in plaats van hard afgeschakeld.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          De meeste EMS-oplossingen communiceren met de aangesloten apparaten via een lokaal protocol (Modbus TCP/RS485 of een fabrikantspecifieke API) en niet via de cloud, zodat de sturing ook bij een wegvallende internetverbinding lokaal blijft functioneren. Controleer bij de apparaatkeuze expliciet of omvormer, batterij-omvormer en laadpaal een open sturingsinterface aanbieden — een gesloten ecosysteem van één fabrikant beperkt later de keuzevrijheid bij uitbreiding met een ander merk.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Waarom dit nu relevanter wordt dan voorheen</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Drie ontwikkelingen maken EMS-sturing in 2026 minder een luxe en meer een noodzaak. Ten eerste verdwijnt de salderingsregeling per 1 januari 2027, waardoor zelfconsumptie sturen op eigen opwek direct rendement oplevert. Ten tweede groeit het aantal huishoudens met een dynamisch energiecontract, waarbij het uurtarief kan verschillen en gericht bijsturen op goedkope uren geld bespaart. Ten derde vraagt netcongestie in een groeiend aantal postcodegebieden om load balancing over alle grootverbruikers samen — niet meer per apparaat afzonderlijk zoals bij een op zichzelf staande laadpaal-installatie.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Netbeheer Nederland en de ACM werken bovendien aan een nieuw, tijdsafhankelijk nettariefstelsel voor kleinverbruikers, waarbij een deel van het nettarief afhangt van het moment van verbruik in plaats van uitsluitend van de aansluitcapaciteit. Een definitief besluit hierover wordt niet voor eind 2026 verwacht, met een beoogde invoering op 1 januari 2029 — maar de richting is duidelijk: sturing op verbruiksmoment wordt een structureel financieel voordeel, niet een tijdelijke prikkel.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat dit betekent voor uw ontwerp en offerte</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Neem de activatie van de P1-poort standaard op als opleverstap bij elk project met twee of meer aangesloten grootverbruikers (batterij, laadpaal, warmtepomp), ook als de klant daar niet expliciet om vraagt. Vermeld in de offerte of het EMS lokaal of via de cloud stuurt, en welke apparaten daadwerkelijk ondersteund worden — een EMS dat alleen de eigen merk-batterij aanstuurt, lost het probleem van een klant met een laadpaal van een ander merk niet op.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor zakelijke klanten met meerdere aansluitingen op één perceel is EMS-sturing vaak de goedkopere route om binnen de bestaande netaansluiting te blijven, in plaats van direct een capaciteitsuitbreiding bij de netbeheerder aan te vragen. Benoem deze optie expliciet in het aansluitadvies: het bespaart de klant een aanvraagtraject met een doorlooptijd die in congestiegebieden inmiddels kan oplopen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie brengt de gecombineerde belasting van zonnepanelen, thuisbatterij, laadpaal en warmtepomp in één dossier samen, zodat u direct ziet of de resterende capaciteit van de netaansluiting toereikend is — met of zonder EMS-sturing. Zo onderbouwt u in het adviesrapport niet alleen wélke apparaten passen bij de woning of het bedrijfspand, maar ook of slimme sturing via de P1-poort noodzakelijk is om binnen de aansluiting te blijven. Meer over de impact van meerdere gelijktijdige verbruikers op de aansluiting leest u ook in ons artikel over{' '}
          <a href="/blog/laadpaal-advies-thuis" className="text-brand-primary-text font-semibold hover:underline">
            de juiste laadpaal-configuratie
          </a>
          .
        </p>
      
<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2"><a href="https://www.rijksoverheid.nl/themas/klimaat-milieu-en-natuur/energie-thuis/salderingsregeling" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Salderingsregeling zonnepanelen</a> — geraadpleegd 2026-08-03</li>
</ol>
      </BlogPostLayout>
    </>
  );
}
