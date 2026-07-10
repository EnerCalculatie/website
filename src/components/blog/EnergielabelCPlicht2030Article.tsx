import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'energielabel-c-plicht-2030')!;

export function EnergielabelCPlicht2030Article() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Per 1 januari 2030 moeten particuliere huurwoningen in Nederland minimaal energielabel C hebben bij aanvang van een nieuwe huurovereenkomst. Deze verplichting, vastgelegd in het Besluit kwaliteit energieprestatie woningen (BKE), geldt voor alle particuliere verhuurders en raakt direct aan uw werkterrein als installateur. Een verhuurder met een portefeuille van woningen met label D, E, F of G moet vóór 2030 in actie komen om aan deze norm te voldoen — en dat vraagt om een onderbouwd advies over welke maatregelen de labelstap mogelijk maken, en tegen welke kosten.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          In dit artikel leest u wat de label C-plicht concreet betekent, welke maatregelen doorgaans nodig zijn om van label D naar C te komen, welke uitzonderingen er gelden, en hoe u het adviesgesprek met een verhuurder voert op basis van rendement en terugverdientijd.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Wat houdt de label C-plicht precies in?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De wettelijke eis geldt vanaf 1 januari 2030 voor particuliere verhuurders bij het aangaan van een nieuwe huurovereenkomst. Een bestaande huurovereenkomst hoeft niet tussentijds aangepast te worden, maar zodra een woning weer verhuurd wordt, moet het energielabel minimaal C zijn. De verplichting geldt niet voor sociale verhuurders (woningcorporaties), die onder een eigen regeltraject vallen.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een energielabel wordt toegekend op basis van de EPA-methode (Energieprestatie Advies), waarin de gebouwschil, het verwarmingssysteem, de aanwezigheid van zonnepanelen en andere energiebesparende voorzieningen worden meegewogen. Het label loopt van A++++ (zeer zuinig) tot en met G (zeer onzuinig). Een woning met label D voldoet niet aan de norm; een woning met label C of hoger wel.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Verhuurders die zich niet aan de norm houden, riskeren dat huurders een klacht indienen bij de huurcommissie. De huurcommissie kan dan een lagere huurprijs vaststellen of de verhuurder verplichten alsnog maatregelen te nemen. Boetes worden niet direct opgelegd, maar de druk op naleving is reëel.
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
          Uitzonderingen: wanneer geldt de plicht niet?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De label C-plicht kent een aantal uitzonderingen. Verhuurders hoeven niet te voldoen aan de eis als:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>De woning een rijksmonument is of binnen een beschermd stads- of dorpsgezicht valt, en verduurzaming in strijd is met de monumentale waarde;</li>
          <li>De benodigde maatregelen technisch niet haalbaar zijn (bijvoorbeeld bij constructieve beperkingen);</li>
          <li>De benodigde maatregelen naar redelijke inschatting niet binnen een termijn van tien jaar terugverdiend kunnen worden.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Die laatste uitzondering — de tien-jaars-terugverdienregel — is voor verhuurders de meest relevante. Als de verhuurder kan aantonen dat de investering niet binnen tien jaar terugverdiend wordt via besparingen of een hogere huurprijs, dan geldt de plicht niet. Dit vereist wel een onderbouwde berekening, die u als installateur kunt leveren.
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
          Een verhuurder die nu nog woningen met label D, E, F of G in de portefeuille heeft, moet vóór 2030 in actie komen. Het adviesgesprek draait om drie kernvragen:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Welke maatregelen zijn nodig om label C te bereiken, en wat kosten deze maatregelen?</li>
          <li>Hoe verhoudt de investering zich tot de potentiële huurprijsverhoging en de versnelde verhuurbaarheid?</li>
          <li>Kan de verhuurder gebruikmaken van de uitzondering op basis van de tien-jaars-terugverdienregel, en zo ja, hoe wordt dat onderbouwd?</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een onderbouwde berekening die de labelstap, de investering en de potentiële huurprijsverhoging inzichtelijk maakt, is voor een verhuurder het verschil tussen een advies dat abstract blijft en een advies dat besluitvorming mogelijk maakt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Hoe EnerCalculatie hiermee omgaat
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie berekent de labelstap op basis van de ingevoerde maatregelen en toont het verwachte nieuwe energielabel in het adviesrapport. Voor verhuurders is het mogelijk om de investering te koppelen aan een realistische inschatting van de terugverdientijd via huurprijsverhoging, zodat de tien-jaars-terugverdienregel onderbouwd kan worden. De berekening houdt rekening met de combinatie van isolatie, zonnepanelen en verwarmingssystemen, zoals beschreven in het artikel over{' '}
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
