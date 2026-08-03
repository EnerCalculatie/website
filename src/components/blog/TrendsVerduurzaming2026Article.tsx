import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'trends-verduurzaming-2026')!;

export function TrendsVerduurzaming2026Article() {

  return (
    <>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          De Nederlandse verduurzamingsmarkt bevindt zich in 2026 in een duidelijke transitiefase. De eerste grote
          groeigolf van zonnepanelen vlakt af, terwijl thuisbatterijen, warmtepompen en slimme laadoplossingen
          structureel aan terrein winnen. Tegelijkertijd worden subsidieregels aangepast, nadert de afschaffing van
          de salderingsregeling en introduceert de overheid nieuwe spelregels rondom netcongestie. Voor installateurs
          is het zaak om deze ontwikkelingen goed te kennen — niet alleen om compliant te adviseren, maar ook om uw
          klant een realistisch en overtuigend verhaal te kunnen vertellen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          ISDE 2026: gewijzigde subsidiebedragen voor warmtepompen
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Per 1 januari 2026 zijn de ISDE-subsidiebedragen voor warmtepompen aangepast. Volgens de RVO is in 2026
          in totaal €500 miljoen beschikbaar voor de ISDE-regeling. Voor een eerste lucht-waterwarmtepomp geldt
          nu een startbedrag van €1.025 (in 2025 was dit €1.250) en ontvangt de woningeigenaar €225 per kW
          vermogen — al vanaf het eerste kilowatt. Dat laatste is een verbetering ten opzichte van 2025, toen de
          vermogenssubsidie pas vanaf het tweede kilowatt meetelde. Het minimumbedrag voor een (hybride) warmtepomp
          bedraagt €500.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Nieuw in 2026 is dat split-airconditioning-systemen en warmtepompen met een vulgewicht onder 3 kilogram
          én een Global Warming Potential (GWP) boven de 750 niet meer in aanmerking komen voor ISDE. Deze
          uitsluiting vloeit voort uit Europese F-gassenregelgeving om de uitstoot van fluorkoolwaterstoffen te
          beperken. Controleer bij elke aanvraag of het apparaat op de actuele meldcodelijst van de RVO staat.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Aanvragen voor de ISDE 2026 kunnen worden ingediend tot en met 31 december 2030. In 2026 konden
          woningeigenaren aanvragen indienen vanaf 5 januari, 12:00 uur.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Thuisbatterijmarkt groeit explosief
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Terwijl het aantal nieuwe residentiële zonnepaneel-installaties in 2025 daalde met ruim 16% in de
          categorie kleine installaties, steeg het aantal thuisbatterij-installaties in datzelfde jaar met circa
          140% (bron: marktdata 2025). Dit is een directe reactie op de naderende afschaffing van de
          salderingsregeling per 1 januari 2027 en de toenemende bewustwording rondom terugleverkosten die
          energieleveranciers doorberekenen.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor installateurs biedt deze verschuiving een concrete kans: klanten met bestaande zonnepanelen — en
          Nederland telt inmiddels meer dan 3,3 miljoen zonnepaneel-installaties — zijn een groeiende doelgroep
          voor een uitbreidingsadvies met een thuisbatterij. Het gesprek draait daarin niet meer alleen om de
          aanschafprijs, maar om zelfconsumptie, terugleverkostenreductie en de terugverdientijd in een wereld
          zonder saldering.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Netcongestie: nieuw prioriteringskader per 1 juli 2026
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Netcongestie is in 2026 een realiteit die het adviesgesprek voor laadpalen en grote installaties
          direct raakt. Vanaf 1 juli 2026 hanteert de ACM een nieuw prioriteringskader voor gebieden waar het
          elektriciteitsnet vol is. Nieuwe of zwaardere aansluitingen worden in die gebieden uitsluitend
          verleend aan drie categorieën:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Oplossingen die het net ontlasten, zoals grote opslagbatterijen;</li>
          <li>Organisaties die noodzakelijk zijn voor de nationale veiligheid (ziekenhuizen, defensie);</li>
          <li>Basisbehoeften zoals woningen, scholen en openbaar vervoer.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor installateurs betekent dit dat een laadpaal-advies bij zakelijke klanten in congestiegebieden
          explicieter rekening moet houden met de netcapaciteit op de locatie. Load balancing en slimme
          laadoplossingen — die de piekvraag spreiden — zijn in dit licht niet alleen een technisch argument,
          maar ook een voorwaarde om een aansluiting überhaupt mogelijk te maken.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Tegelijkertijd biedt netcongestie kansen: netbeheerders Enexis, Liander en Stedin betalen in een
          aantal regio's (onder meer Gelderland, Utrecht, delen van Flevoland en Noord-Brabant) een financiële
          vergoeding aan huishoudens die hun thuisbatterij, laadpaal of warmtepomp beschikbaar stellen voor
          flexibele aansturing. Dit kan een extra verkoopargument zijn bij de installatie van een thuisbatterij.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Zonnepanelen: markt in transitie
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De Nederlandse zonne-energiemarkt heeft aan het einde van 2025 een totale geïnstalleerde capaciteit
          van ruim 29,4 gigawattpiek bereikt, verdeeld over meer dan 3,3 miljoen installaties. Daarmee heeft
          Nederland zijn klimaatdoel voor zonne-energie voor 2030 al behaald. De markt voor nieuwe residentiële
          installaties raakt daardoor geleidelijk verzadigd in een deel van het woningbestand, al blijft de
          totale capaciteitsgroei — mede dankzij grote commerciële daken en zonneweides — aanzienlijk.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor installateurs verschuift de kans in het residentiële segment: nieuwe klanten zijn minder vaak
          een leeg dak, maar vaker een bestaande zonnepaneel-eigenaar die zijn installatie wil uitbreiden of
          optimaliseren. De combinatieofferte — zonnepanelen plus thuisbatterij, of zonnepanelen plus laadpaal
          — wordt daarmee de standaard in het adviesgesprek.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Salderingsregeling 2027: druk op zelfconsumptie neemt toe
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Per 1 januari 2027 verdwijnt de salderingsregeling in één keer volledig. Tot die datum blijft de
          huidige regeling van kracht. Na afschaffing ontvangt een huishouden voor teruggeleverde stroom
          slechts het terugleveringstarief — doorgaans aanzienlijk lager dan het leveringstarief. Dit maakt
          zelfconsumptie het belangrijkste rendementsdrijver voor zonnepaneel-eigenaren.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een rendementsberekening die geen rekening houdt met de situatie na 2027, geeft uw klant een te
          optimistisch beeld van de eerste tien of vijfentwintig jaar. Een eerlijk adviesgesprek laat beide
          scenario's zien: het huidige salderings-scenario tot en met 2026, en het teruglever-scenario daarna.
          Klanten die nu al nadenken over een thuisbatterij, laadpaal of warmtepomp om de zelfconsumptie te
          verhogen, positioneren zich gunstiger voor de situatie na 2027.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Wat betekent dit voor uw adviesgesprek?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Samenvattend vragen de ontwikkelingen in 2026 om vier concrete aanpassingen in de manier waarop u
          advies geeft:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>
            <strong>ISDE-aanvragen:</strong> Controleer altijd de actuele meldcodelijst van de RVO en houd
            rekening met de gewijzigde startbedragen bij warmtepompen. Een onvolledige aanvraag kost uw klant
            subsidie en u goodwill.
          </li>
          <li>
            <strong>Thuisbatterij:</strong> Maak de terugverdientijd inzichtelijk inclusief
            terugleverkostenreductie en het 2027-scenario. Klanten met bestaande zonnepanelen zijn de
            primaire doelgroep.
          </li>
          <li>
            <strong>Laadpalen zakelijk:</strong> Breng de netcapaciteit op de locatie in kaart voordat u
            een offerte uitbrengt, zeker in congestiegebieden. Load balancing is in die gebieden niet
            optioneel.
          </li>
          <li>
            <strong>Salderingsregeling:</strong> Gebruik altijd een berekening die zowel het scenario tot
            2027 als het scenario daarna toont. Transparantie hierover vergroot het vertrouwen in uw advies.
          </li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Hoe EnerCalculatie hiermee omgaat
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De rekenmodellen in EnerCalculatie houden rekening met het 2027-scenario in de meerjarige
          terugverdientijd, zodat uw klant een kloppend beeld krijgt van de jaren voor en na de
          salderingsafschaffing. ISDE-subsidiebedragen worden bijgehouden zodat de berekende netto
          investering actueel blijft. Voor combinatie-offertes — zonnepanelen met thuisbatterij, of
          warmtepomp met laadpaal — berekent EnerCalculatie het gecombineerde rendement in één rapport,
          zodat u uw klant niet met losse getallen naar huis stuurt maar met één samenhangend advies.
          Actuele wijzigingen in subsidies of regelgeving worden doorgevoerd in de rekenmodellen zodra
          ze van kracht zijn.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Meer weten over hoe wij omgaan met{' '}
          <a href="/blog/terugleverkosten-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">
            terugleverkosten en de rol van een thuisbatterij
          </a>
          {' '}of de{' '}
          <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">
            technische onderbouwing voor ISDE-aanvragen voor warmtepompen
          </a>
          ? Lees dan ook die artikelen in onze kennisbank.
        </p>
      
<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2"><a href="https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/warmtepomp" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">ISDE: Warmtepomp woningeigenaren aanvragen — RVO</a> — geraadpleegd 2026-08-03</li>
  <li className="mb-2"><a href="https://consument.acm.nl/elektriciteit-en-gas/duurzame-energie/wat-is-salderen" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Salderen en terugleveren — ACM ConsuWijzer</a> — geraadpleegd 2026-08-03</li>
  <li className="mb-2"><a href="https://www.rijksoverheid.nl/themas/klimaat-milieu-en-natuur/energie-thuis/salderingsregeling" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">Salderingsregeling zonnepanelen</a> — geraadpleegd 2026-08-03</li>
</ol>
      </BlogPostLayout>
    </>
  );
}
