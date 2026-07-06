import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'dakorientatie-zonnepanelen-opbrengst')!;

export function DakorientatieZonnepanelenArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          De meest gestelde vraag in een eerste gesprek over zonnepanelen is niet de prijs — het is of het dak wel geschikt is. Een klant met een oost-westdak of een woning met schaduw van bomen twijfelt terecht. Als installateur is het uw taak om die twijfel te vervangen door een onderbouwde opbrengstverwachting. Dat begint bij inzicht in wat oriëntatie en hellingshoek werkelijk kosten aan rendement.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">De ideale situatie: zuidoriëntatie bij 35°</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor de Nederlandse breedtegraad (circa 52° noorderbreedte) geldt een zuidgerichte opstelling met een hellingshoek van 35 tot 40 graden als optimaal. Op basis van PVGIS-data (de Europese referentiedatabase voor fotovoltaïsche opbrengst) ligt de jaaropbrengst in Nederland voor een optimaal georiënteerd systeem op circa 875 tot 950 kWh per geïnstalleerde kWp, afhankelijk van de regio. In het zuiden van het land (Zeeland, Noord-Brabant) is dit iets hoger dan in het noorden (Groningen, Friesland).
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Alle overige situaties worden uitgedrukt als een percentage van deze optimale opbrengst. Dat percentage heet de <em>orientatiefactor</em> of <em>irradiatiefactor</em>, en is het getal dat in iedere serieuze opbrengstberekening moet terugkomen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Opbrengstverlies per oriëntatie en hoek</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De onderstaande waarden zijn gebaseerd op gangbare PVGIS- en NEN-normwaarden voor de Nederlandse situatie. Ze geven aan welk deel van de ideale jaaropbrengst een installatie realiseert:
        </p>
        <ul className="list-disc pl-6 mb-4 text-slate-700">
          <li><strong>Zuid, 35°:</strong> 100% — referentiewaarde.</li>
          <li><strong>Zuid, 15°:</strong> circa 95% — flauwe helling levert licht minder op, maar is goed bruikbaar.</li>
          <li><strong>Zuid, 60°:</strong> circa 90% — steilere helling nadelig in de zomer, voordelig in de winter.</li>
          <li><strong>Oost of West, 35°:</strong> circa 80–85% — veelgebruikte configuratie bij oost-westdaken; het verlies valt mee.</li>
          <li><strong>Oost of West, 15°:</strong> circa 85–88% — flauwe oost-west helling presteert beter dan verwacht.</li>
          <li><strong>Vlak dak (0°):</strong> circa 87–90% — minder verlies dan de meeste klanten veronderstellen; ideaal voor montage op constructieframes.</li>
          <li><strong>Noord, 35°:</strong> circa 60–65% — significant verlies; een noordgericht vlak rendabel maken vraagt om een uitgebreide financiële onderbouwing.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Concreet betekent een oost-westdak van 6 kWp in de Nederlandse standaardsituatie een jaaropbrengst van circa 4.200–4.400 kWh in plaats van de circa 5.100–5.400 kWh bij een ideaal zuiddak. Dat verlies is substantieel in absolute zin, maar de investering is ook lager bij een kleinere opbrengstverwachting — en de terugverdientijd hoeft daardoor niet per se langer te zijn.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Oost-west gesplitste installaties: een ander profiel, geen slechter resultaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een installatie verdeeld over oost- en westdakvlak heeft een ander productiepatroon dan een zuidinstallatie. De piek ligt niet in het midden van de dag, maar verdeeld over twee pieken — 's ochtends (oostkant) en 's middags (westkant). Dit profiel past in sommige gevallen beter bij het verbruikspatroon van een huishouden: zelfconsumptie overdag is beter verdeeld, en er wordt minder tegelijk teruggeleverd aan het net.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dat is een verkoopargument dat veel installateurs onbenut laten. Bij klanten met een{' '}
          <a href="/blog/terugleverkosten-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">
            energieleverancier die terugleverkosten in rekening brengt
          </a>
          {' '}is een gespreide productie over de dag gunstig: er wordt minder op het piekvermogen teruggeleverd, waardoor de terugleverkosten lager uitvallen dan bij een zuidinstallatie met één scherpe productietop.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Schaduw: het verschil tussen lineair en disproportioneel verlies</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Schaduw is complexer dan oriëntatie, omdat het effect afhankelijk is van het type schaduw, de duur en de systeemarchitectuur. Bij een traditionele serieschakelaar (string-omvormer zonder optimizers) kan gedeeltelijke schaduw op één paneel de productie van de hele string significant verlagen — soms tot het niveau van het meest beschaduwde paneel.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          In de praktijk onderscheidt u twee soorten schaduw:
        </p>
        <ul className="list-disc pl-6 mb-4 text-slate-700">
          <li><strong>Permanente schaduw</strong> (bomen, aangrenzende bebouwing, schoorstenen die het hele jaar op dezelfde plek vallen): dit leidt tot structureel opbrengstverlies dat u in de berekening als reductiefactor moet meenemen.</li>
          <li><strong>Tijdelijke of seizoensgebonden schaduw</strong> (lage winterzon die een dakrand raakt, bladbomen die in de zomer schaduw geven): dit is beperkt in effect op de jaaropbrengst, maar kan in de winter de opbrengst fors drukken.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een vuistregel: schaduw op meer dan 20% van het paneloppervlak gedurende de productieve uren (circa 9:00–17:00 zomertijd) rechtvaardigt het gebruik van paneeloptimialisatoren of microomvormers. Deze isoleren het verlies tot het beschaduwde paneel en voorkomen dat de hele string meedeelt in het verlies.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe u dit uitlegt in het adviesgesprek</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Klanten overschatten doorgaans het verlies bij een niet-ideaal dak. Wanneer u kunt aantonen dat een oost-westdak 80–85% van de ideale opbrengst realiseert — en dat de financiële terugverdientijd daarbij vergelijkbaar blijft — neemt u de voornaamste aarzeling weg. Concreet helpt het om:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>De jaarlijkse kWh-opbrengst te tonen voor de werkelijke daksituatie, niet alleen voor de ideale situatie.</li>
          <li>De besparing op de energierekening en de terugverdientijd te berekenen op basis van de werkelijke opbrengst — niet op basis van een ideale referentie.</li>
          <li>Bij oost-westinstallaties het dagprofiel te laten zien: twee productiepieken in plaats van één, en wat dat betekent voor zelfconsumptie en teruglevering.</li>
          <li>Bij schaduw de keuze voor optimizers of microomvormers te onderbouwen met een rendementsvergelijking.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie dit vereenvoudigt</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie verwerkt de oriëntatiefactor en hellingshoek als invoer in het zonnepaneelmodel, zodat de berekende jaaropbrengst direct aansluit op de werkelijke daksituatie van uw klant. U voert de dakrichting en helling in, en het systeem past de PVGIS-correctiefactoren automatisch toe. Zo legt u uw klant een realistisch, onderbouwd getal voor — ook als dat dak niet perfect op het zuiden gericht is.
        </p>
      </BlogPostLayout>
    </>
  );
}
