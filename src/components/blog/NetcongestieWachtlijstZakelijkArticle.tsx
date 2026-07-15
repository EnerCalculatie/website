import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'netcongestie-wachtlijst-zakelijk-2026')!;

export function NetcongestieWachtlijstZakelijkArticle() {

  return (
    <>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Tot voor kort was netcongestie vooral een verhaal over grootverbruikers: fabrieken, distributiecentra en
          grote zonneparken die maanden of jaren moesten wachten op transportcapaciteit. Vanaf 1 juli 2026 verandert
          dat. Ook kleinverbruikers — inclusief de zwaardere aansluitingen tot en met 3x80A waar veel bedrijfspanden,
          VvE's en laadpleinen onder vallen — komen in congestiegebieden op dezelfde wachtlijst als grootverbruikers.
          Voor installateurs die zakelijke klanten adviseren over een nieuwe aansluiting, een laadplein of
          zonnepanelen op een bedrijfsdak, is dit een verandering die direct invloed heeft op de planning en de
          verwachtingen die u aan het begin van een traject moet schetsen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">De wachtlijst in cijfers</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Eind 2025 stonden er ruim 15.000 grootverbruikers op de wachtlijst voor een nieuwe of zwaardere aansluiting
          op midden- of laagspanning — een stijging van ongeveer een kwart ten opzichte van een jaar eerder. Het
          totale wachtlijstvermogen kwam daarmee op circa 9,3 gigawatt. Deze cijfers gaan alleen over
          grootverbruikers; zodra kleinverbruikers per 1 juli 2026 in congestiegebieden meetellen, ligt een verdere
          groei van de wachtlijst voor de hand. Voor een zakelijke klant die overweegt te verzwaren voor een
          laadplein, een warmtepompinstallatie of een grotere zonnepanelen-installatie, is de wachtlijst dus niet
          langer een ver-van-mijn-bedshow, maar een reëel risico dat u als installateur vooraf moet benoemen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Wat verandert er precies per 1 juli 2026?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Tot 1 juli 2026 reserveren netbeheerders in congestiegebieden nog een deel van de resterende capaciteit
          voor kleinverbruikers, zodat een nieuwbouwwoning of een kleine aansluiting normaal gesproken nog wordt
          aangesloten. Vanaf die datum vervalt dat onderscheid: iedereen die in een congestiegebied een nieuwe of
          zwaardere aansluiting aanvraagt — van een eenmanszaak tot een 3x80A-aansluiting bij een bedrijfspand —
          komt op dezelfde wachtlijst als grootverbruikers, totdat er in dat gebied weer capaciteit beschikbaar komt.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor de installatiebranche is de 3x80A-grens relevant: dit is de wettelijke bovengrens van kleinverbruik en
          precies het soort aansluiting waarmee grotere woongebouwen, horecapanden, VvE-laadpleinen en middelgrote
          bedrijfspanden vaak werken. Een verzwaring van zo'n aansluiting — bijvoorbeeld om een laadplein, een
          warmtepomp of een grotere batterij aan te sluiten — valt na 1 juli 2026 dus onder dezelfde
          wachtlijstlogica als een grootverbruikersaansluiting.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Het ACM-prioriteringskader: wie krijgt voorrang?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Om de schaarse capaciteit eerlijk te verdelen, hanteert de ACM sinds 1 januari 2026 een landelijk
          prioriteringskader waarmee netbeheerders bepaalde aanvragen op de wachtlijst kunnen voorrang geven.
          Grootverbruikers kunnen sindsdien al voorrang aanvragen; voor kleinverbruikers geldt dit vanaf 1 juli 2026.
          Het kader onderscheidt drie categorieën:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>
            <strong>Congestieverlichters:</strong> aansluitingen die het net juist ontlasten, zoals grootschalige
            batterijopslag die pieken kan opvangen of vermijden.
          </li>
          <li>
            <strong>Veiligheid en kritieke voorzieningen:</strong> partijen die noodzakelijk zijn voor de openbare
            veiligheid of acute zorg, zoals politie, brandweer en ziekenhuizen.
          </li>
          <li>
            <strong>Basisbehoeften:</strong> onder meer onderwijs en openbaar vervoer, en vanaf 1 juli 2026 ook
            woningbouw.
          </li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een aanvraag die buiten deze categorieën valt — de meeste reguliere bedrijfsaansluitingen, laadpleinen en
          zonnepanelenprojecten op een bedrijfsdak — schuift niet automatisch naar voren. Dat maakt het des te
          belangrijker om bij een klant met plannen in een congestiegebied vooraf te toetsen of het project ergens
          binnen deze categorieën past, en anders rekening te houden met een reguliere wachttijd.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Wat kunt u ondertussen adviseren?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een plek op de wachtlijst betekent niet dat een klant stil moet zitten. Er zijn inmiddels beproefde
          tussenoplossingen die de wachttijd overbruggen of zelfs overbodig maken:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>
            <strong>Capaciteitsbeperkend contract (CBC):</strong> de klant spreekt met de netbeheerder af minder
            transportcapaciteit te gebruiken dan technisch mogelijk is, in ruil voor een vaste of variabele
            vergoeding. Bij een vast CBC geldt de beperking op vooraf afgesproken momenten (bijvoorbeeld doordeweeks
            tussen 07:00 en 11:00 uur); bij een variabel CBC bepaalt de netbeheerder — doorgaans een dag vooraf via
            het GOPACS-platform — wanneer moet worden bijgestuurd. Voor een zonnepanelenproject op een bedrijfsdak
            kan dit betekenen dat de aansluiting eerder gerealiseerd wordt, tegen een beperking van de piekinvoeding.
          </li>
          <li>
            <strong>GOPACS en congestiemanagement:</strong> GOPACS is het gezamenlijke platform van de Nederlandse
            netbeheerders waarop flexibel vermogen wordt verhandeld om congestie te verlichten. Vanaf 2026 geldt het
            capaciteitssturingscontract (CSC) steeds vaker als standaardvorm om zulke afspraken vast te leggen.
            Klanten met een batterij, warmtepomp of laadplein kunnen hiermee tegen een vergoeding hun verbruik of
            invoeding laten bijsturen op verzoek van de netbeheerder.
          </li>
          <li>
            <strong>Batterijopslag als congestieverlichter:</strong> omdat opslag in het prioriteringskader als
            congestieverlichtend wordt aangemerkt, kan een batterij bij het project een aanvraag juist kansrijker
            maken, naast de bekende voordelen voor zelfconsumptie en piekshaving.
          </li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Elke netbeheerder (Liander, Enexis, Stedin en de regionale netbeheerders) publiceert een actuele
          capaciteitskaart en eigen voorwaarden voor deze contractvormen. Controleer deze kaart altijd vóór u een
          offerte voor een nieuwe of zwaardere aansluiting uitbrengt, aangezien de situatie per postcodegebied sterk
          kan verschillen en regelmatig wijzigt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Hoe legt u dit uit aan uw zakelijke klant?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Het meest overtuigende advies begint niet bij het product, maar bij de aansluiting: controleer de
          capaciteitskaart van de netbeheerder voor de locatie van de klant vóórdat u een laadplein, warmtepomp of
          zonnepanelenproject offreert. Is het gebied congestiegebied, benoem dan expliciet dat een verzwaring op de
          wachtlijst kan belanden, en bespreek in hetzelfde gesprek welke tussenoplossing — een capaciteitsbeperkend
          contract, batterijopslag of load balancing — het project alsnog haalbaar maakt. Een klant die vooraf weet
          waar hij aan toe is, accepteert een wachttijd of alternatief beter dan een klant die hiermee pas na de
          offerte wordt geconfronteerd.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie berekent voor zakelijke projecten het effect van een batterij of load balancing op de
          benodigde aansluitcapaciteit, zodat u vooraf inzichtelijk maakt of een kleinere aansluiting — of een
          capaciteitsbeperkend contract — het project haalbaar maakt zonder op de wachtlijst te belanden. Zo
          onderbouwt u het aansluitadvies met concrete cijfers in plaats van een inschatting achteraf. Meer over de
          rol van opslag in dit soort projecten leest u in ons artikel over{' '}
          <a
            href="/blog/terugleverkosten-thuisbatterij"
            className="text-brand-primary-text font-semibold hover:underline"
          >
            terugleverkosten en de rol van een thuisbatterij
          </a>
          .
        </p>
      </BlogPostLayout>
    </>
  );
}
