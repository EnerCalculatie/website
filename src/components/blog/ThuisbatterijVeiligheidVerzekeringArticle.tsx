import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'thuisbatterij-veiligheid-verzekering')!;

export function ThuisbatterijVeiligheidVerzekeringArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Nu thuisbatterijen in rap tempo gemeengoed worden, kijken verzekeraars steeds kritischer naar hoe
          ze zijn geïnstalleerd. Een lithium-ion-accu die oververhit raakt, is een reëel brandrisico — en
          verzekeraars vertalen dat risico direct naar voorwaarden voor uitkering. Voor u als installateur
          betekent dit dat een correcte, goed gedocumenteerde installatie niet langer alleen een technische
          kwestie is, maar ook bepaalt of uw klant bij schade daadwerkelijk gedekt is. Dit artikel zet op een
          rij welke eisen gangbaar zijn, en wat er per 29 mei 2026 verandert aan het energielabel.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Waarom verzekeraars kritischer kijken naar thuisbatterijen
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Het Verbond van Verzekeraars adviseert consumenten en bedrijven om bewust om te gaan met
          lithium-ion-accu's, onder meer door bij aanschaf te kijken naar een stabielere celchemie. Achtergrond
          hiervan is dat een beschadigde, verkeerd geplaatste of ondeskundig aangesloten accu kan oververhitten
          en in brand kan vliegen — een risico dat verzekeraars zwaarder laten wegen naarmate meer huishoudens
          een vast geïnstalleerd systeem aanschaffen.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          De praktische consequentie: vrijwel alle grote Nederlandse verzekeraars stellen als voorwaarde dat een
          vast geïnstalleerde thuisbatterij is aangesloten door een erkend installateur, conform de NEN
          1010-norm, met een bijbehorend opleverrapport. Ontbreekt dit dossier, dan loopt uw klant het risico
          dat een verzekeraar bij schade niet (volledig) uitkeert — ook als de oorzaak niets met de installatie
          zelf te maken had.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          NEN 1010: de installatietechnische basis
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          NEN 1010 is de Nederlandse norm voor veilige laagspanningsinstallaties, en geldt onverkort voor een
          vast aangesloten thuisbatterij. In de praktijk komt dit neer op een aantal concrete eisen:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Een eigen groep voor de batterij, met een eigen aardlekschakelaar van maximaal 30 mA.</li>
          <li>
            Aarding die via een ononderbroken verbinding van minimaal 4 mm² is aangesloten op de
            hoofdaardrail in de meterkast.
          </li>
          <li>
            Een mantelbuis of kabelgoot van minimaal 19 mm tussen batterij en meterkast, voor zowel de
            vermogens- als de datalijnen.
          </li>
          <li>
            Een opleverrapport dat de meting en de conformiteit met NEN 1010 vastlegt — het bewijsstuk dat
            verzekeraars bij schade kunnen opvragen.
          </li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bij een bestaande meterkast is het eerste dat u controleert of de huidige capaciteit de extra groep
          en aardlekschakelaar toelaat, zeker wanneer de klant ook al een warmtepomp, laadpaal of airco heeft
          (of overweegt). Past dit niet, dan is een aanpassing van de groepenkast onderdeel van de offerte —
          beter vooraf benoemd dan achteraf ontdekt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Celchemie en plaatsing: van IEC 62619 tot de ondergrond
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Naast de installatie zelf speelt de accutechniek een rol. IEC 62619 is de internationale
          veiligheidsstandaard voor stationaire lithium-opslag en een gangbaar controlepunt bij de keuze van een
          batterijsysteem. Binnen de lithium-chemieën geldt een LFP-batterij (lithium-ijzerfosfaat) doorgaans
          als thermisch stabieler dan een NMC-batterij (nikkel-mangaan-kobalt): LFP-cellen raken minder snel
          oververhit en zijn beter bestand tegen hoge temperaturen, wat het brandrisico verkleint. Dat is een van
          de redenen waarom LFP inmiddels de meest gangbare celchemie is in nieuwe residentiële systemen.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ook de plaatsing telt mee. Verzekeraars kijken kritisch naar de ondergrond en omgeving: montage op een
          houten vloer wordt afgeraden en door sommige polisvoorwaarden zelfs uitgesloten, terwijl een
          onbrandbare wand of een betonnen ondergrond als de gangbare standaard geldt. Houd hier bij de
          locatiekeuze in de meterkast, berging of garage rekening mee, en leg de gekozen plek en ondergrond vast
          in het opleverdossier.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Meldplicht en documentatie: het dossier dat uw klant moet kunnen overleggen
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een vast geïnstalleerde thuisbatterij moet worden aangemeld bij Energieleveren.nl. Verzekeraars vragen
          dit meldingsbewijs steeds vaker op als onderdeel van de schadebeoordeling, als aantoonbaar bewijs dat
          aan de meldplicht is voldaan. Adviseer uw klant daarom om, naast het opleverrapport, in elk geval de
          volgende stukken te bewaren:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Het installatie- en opleverrapport, inclusief de NEN 1010-meting;</li>
          <li>De bevestiging van aanmelding bij Energieleveren.nl;</li>
          <li>Merk, model en serienummer van zowel de batterij als de omvormer;</li>
          <li>Het garantiebewijs van fabrikant en installateur.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dit dossier compleet aanleveren bij oplevering scheelt uw klant achteraf zoeken — en scheelt u als
          installateur discussie wanneer een verzekeraar er later naar vraagt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Vanaf 29 mei 2026: de thuisbatterij telt mee voor het energielabel
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Per 29 mei 2026 krijgt het Nederlandse energielabel een vernieuwd ontwerp, als uitvloeisel van de
          herziene Europese richtlijn EPBD IV. Een van de wijzigingen: een vast geïnstalleerde thuisbatterij kan
          vanaf die datum meetellen bij de bepaling van het energielabel van een woning. Dit geldt niet
          automatisch voor elk systeem — de rekenmethodiek (NTA 8800) erkent een thuisbatterij alleen wanneer
          aan een aantal voorwaarden is voldaan:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>De batterij heeft een vaste aansluiting op de elektrische installatie — een plug-in accu telt niet mee;</li>
          <li>De opslagcapaciteit bedraagt minimaal 5 kWh;</li>
          <li>De aansluiting is professioneel uitgevoerd in de meterkast, conform NEN 1010;</li>
          <li>De batterij staat in combinatie met lokale opwek — in de praktijk: zonnepanelen op dezelfde woning.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor uw adviesgesprek is dit een nieuw, tastbaar verkoopargument: een correct geïnstalleerde
          thuisbatterij naast bestaande zonnepanelen draagt vanaf medio 2026 niet alleen bij aan de
          energierekening, maar ook aan het energielabel — en daarmee aan de gepercipieerde woningwaarde bij
          verkoop of verhuur. Diezelfde NEN 1010-conforme installatie die verzekeraars vragen, is dus ook precies
          de voorwaarde om voor het energielabel mee te tellen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Wat betekent dit voor uw adviesgesprek?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een onderbouwd thuisbatterij-advies gaat in 2026 verder dan capaciteit en terugverdientijd alleen. Drie
          punten verdienen een vaste plek in uw offerte en opleverdossier:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>
            <strong>Installatie en documentatie:</strong> lever altijd een NEN 1010-opleverrapport en meld het
            systeem aan bij Energieleveren.nl — zonder dit dossier is uw klant kwetsbaar bij schade.
          </li>
          <li>
            <strong>Celchemie en plaatsing:</strong> een LFP-systeem op een onbrandbare ondergrond of tegen een
            onbrandbare wand is doorgaans de veiligere en beter verzekerbare keuze dan plaatsing op een houten
            vloer.
          </li>
          <li>
            <strong>Energielabel:</strong> wijs klanten met bestaande zonnepanelen op de mogelijke bijdrage aan
            het energielabel vanaf 29 mei 2026 — mits vast aangesloten en minimaal 5 kWh.
          </li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Hoe EnerCalculatie hiermee omgaat
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie berekent het rendement van een thuisbatterij op basis van de installatiegrootte,
          het verbruiksprofiel en de gewenste capaciteit, zodat u naast een technisch onderbouwd rapport ook een
          checklist heeft voor de documentatie die uw klant nodig heeft. Meer over het bepalen van de juiste{' '}
          <a href="/blog/thuisbatterij-capaciteit-kiezen" className="text-brand-primary-text font-semibold hover:underline">
            thuisbatterijcapaciteit
          </a>
          {' '}leest u in dat artikel, en op de{' '}
          <a href="/rekentool-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">
            rekentool thuisbatterij
          </a>
          {' '}rekent u direct het rendement door voor de situatie van uw klant.
        </p>
      </BlogPostLayout>
    </>
  );
}
