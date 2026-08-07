import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'energielabel-c-plicht-2030')!;

export function EnergielabelCPlicht2030Article() {

  return (
    <>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Rondom de verduurzaming van de particuliere huursector klinkt al langere tijd de roep om een verplicht minimum energielabel, naar analogie van de label C-plicht die per 2023 voor kantoorgebouwen ging gelden. Concrete wetgeving met een harde datum en een afdwingbare norm voor particuliere huurwoningen is er op dit moment niet, maar de politieke en maatschappelijke druk om ook in deze sector een ondergrens te stellen aan de energieprestatie is reëel. Voor u als installateur is dat reden genoeg om verhuurders nu al te wijzen op het risico van woningen met label D, E, F of G, en te adviseren over welke maatregelen een labelstap mogelijk maken en tegen welke kosten.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          In dit artikel leest u welke maatregelen doorgaans nodig zijn om van label D naar C te komen, waar de discussie over een verplichting voor de huursector op dit moment staat, en hoe u het adviesgesprek met een verhuurder voert op basis van rendement en terugverdientijd.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Waar staat de discussie over een label C-plicht voor huurwoningen?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor kantoorgebouwen geldt sinds 1 januari 2023 al een wettelijke verplichting tot minimaal energielabel C. Voor particuliere huurwoningen bestaat een dergelijke wettelijke verplichting op dit moment niet, maar de wens om de verduurzaming van de huursector te versnellen staat wel op de politieke agenda. Voor verhuurders is het verstandig om hier tijdig op te anticiperen in plaats van te wachten op definitieve wetgeving, zeker omdat verduurzamingsmaatregelen vaak een lange voorbereidings- en uitvoeringstijd kennen.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een energielabel wordt toegekend op basis van de EPA-methode (Energieprestatie Advies), waarin de gebouwschil, het verwarmingssysteem, de aanwezigheid van zonnepanelen en andere energiebesparende voorzieningen worden meegewogen. Het label loopt van A++++ (zeer zuinig) tot en met G (zeer onzuinig). Een woning met label D voldoet niet aan de norm; een woning met label C of hoger wel.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ook zonder een specifieke wettelijke verplichting voor huurwoningen spelen energieprestatie en huurprijs al een rol via het puntensysteem van de Huurcommissie: een slecht energielabel kan leiden tot een lagere maximale huurprijs of een klacht van de huurder. Verhuurders die niets doen aan een slecht presterende woning lopen dus nu al een risico op de huurprijs, los van eventuele toekomstige regelgeving.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Welke maatregelen zijn doorgaans nodig voor de stap van D naar C?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De labelstap van D naar C is sterk afhankelijk van de uitgangssituatie van de woning. Een woning met label D heeft doorgaans al enige basisisolatie (bijvoorbeeld dubbel glas, vloerisolatie of spouwmuurisolatie), maar mist nog één of twee verduurzamingsmaatregelen. De meest voorkomende combinaties om label C te bereiken zijn:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Aanvullende isolatie (dakisolatie, HR++ glas) plus zonnepanelen;</li>
          <li>Aanvullende isolatie plus een warmtepomp of hybride warmtepomp;</li>
          <li>Zonnepanelen plus vervanging van een CV-ketel door een HR-ketel of hybride warmtepomp.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Zonnepanelen zijn voor verhuurders een aantrekkelijke maatregel omdat ze direct meetellen in het energielabel en relatief snel terugverdiend kunnen worden via een hogere huurprijs bij het aangaan van een nieuwe huurovereenkomst. Een warmtepomp levert een grotere labelstap, maar vraagt ook een hogere investering en kan leiden tot vragen van de huurder over het comfort en de bediening van het systeem.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Let op: een energielabel is altijd een momentopname. Na een verduurzamingsmaatregel moet de verhuurder een nieuw energielabel laten opstellen door een erkend EPA-adviseur. De maatregelen die u adviseert, moeten dus ook daadwerkelijk leiden tot een aantoonbare labelverbetering — een inschatting is niet voldoende.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Praktische afwegingen: wanneer is verduurzamen (nog) niet aan de orde?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ook zonder harde wettelijke verplichting zijn er situaties waarin een verhuurder verduurzaming van een huurwoning terecht uitstelt of afweegt tegen andere prioriteiten:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>De woning is een rijksmonument of valt binnen een beschermd stads- of dorpsgezicht, waardoor verduurzaming in strijd kan zijn met de monumentale waarde;</li>
          <li>De benodigde maatregelen zijn technisch niet haalbaar (bijvoorbeeld bij constructieve beperkingen);</li>
          <li>De benodigde maatregelen zijn naar redelijke inschatting niet binnen een aanvaardbare termijn terug te verdienen via besparingen of huurprijsverhoging.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Juist die laatste afweging — de terugverdientijd — is voor verhuurders het meest bepalend. Een onderbouwde berekening van investering tegenover besparing en huurpotentie helpt de verhuurder een weloverwogen keuze te maken, ook zolang er geen concrete wettelijke deadline geldt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Rendement voor de verhuurder: een ander perspectief dan bij eigenaar-bewoners
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een rendementsberekening voor een verhuurder wijkt fundamenteel af van die voor een eigenaar-bewoner. De verhuurder investeert in de verduurzaming, maar profiteert niet direct van lagere energielasten — die daling komt de huurder ten goede. Het rendement voor de verhuurder zit in drie factoren:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li><strong>Huurprijsverhoging:</strong> Een beter energielabel rechtvaardigt een hogere huurprijs bij het aangaan van een nieuwe huurovereenkomst. De maximale huurprijsverhoging is wettelijk begrensd via het puntensysteem van de Huurcommissie, waarin energielabel C bijvoorbeeld meer punten oplevert dan label D.</li>
          <li><strong>Snellere verhuur:</strong> Woningen met een beter energielabel zijn aantrekkelijker voor huurders, wat leegstand vermindert en de verhuurbaarheid verhoogt.</li>
          <li><strong>Waardevermeerdering:</strong> Een woning met label C heeft een hogere verkoopwaarde dan een woning met label D, E of lager.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          In het adviesgesprek moet u deze drie factoren expliciete maken. Een verhuurder die alleen kijkt naar de investeringskosten, ziet de maatregel als een kostenpost. Een verhuurder die begrijpt hoe de labelverbetering doorwerkt in de huurprijs en de verhuurbaarheid, ziet de maatregel als een strategische beslissing.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Wat betekent dit voor uw adviesgesprek?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een verhuurder die nu nog woningen met label D, E, F of G in de portefeuille heeft, doet er verstandig aan om niet te wachten op definitieve wetgeving. Het adviesgesprek draait om drie kernvragen:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Welke maatregelen zijn nodig om label C te bereiken, en wat kosten deze maatregelen?</li>
          <li>Hoe verhoudt de investering zich tot de potentiële huurprijsverhoging en de versnelde verhuurbaarheid?</li>
          <li>Is de investering binnen een aanvaardbare termijn terug te verdienen, en zo ja, hoe wordt dat onderbouwd?</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een onderbouwde berekening die de labelstap, de investering en de potentiële huurprijsverhoging inzichtelijk maakt, is voor een verhuurder het verschil tussen een advies dat abstract blijft en een advies dat besluitvorming mogelijk maakt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Hoe EnerCalculatie hiermee omgaat
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie berekent de labelstap op basis van de ingevoerde maatregelen en toont het verwachte nieuwe energielabel in het adviesrapport. Voor verhuurders is het mogelijk om de investering te koppelen aan een realistische inschatting van de terugverdientijd via huurprijsverhoging, zodat die afweging onderbouwd gemaakt kan worden. De berekening houdt rekening met de combinatie van isolatie, zonnepanelen en verwarmingssystemen, zoals beschreven in het artikel over{' '}
          <a href="/blog/van-excel-naar-geautomatiseerd-advies" className="text-brand-primary-text font-semibold hover:underline">
            geautomatiseerd advies
          </a>
          . Voor verhuurders die naast label C ook nadenken over een warmtepomp, leest u meer in het artikel over{' '}
          <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">
            ISDE-subsidie voor warmtepompen
          </a>
          .
        </p>
      </BlogPostLayout>
    </>
  );
}
