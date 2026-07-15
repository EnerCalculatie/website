import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'laadpalen-voor-elektrische-autos')!;

export function LaadpalenVoorElektrischeAutosArticle() {

  return (
    <BlogPostLayout post={post}>

    <p className="text-slate-700 leading-relaxed mb-4">
      Een laadpaal voor een elektrische auto is meer dan alleen een laadpunt - het is een onderdeel van een compleet energiesysteem. Als installateur moet u uw klant kunnen adviseren over de juiste laadpaal voor zijn of haar situatie. Dit artikel geeft u een overzicht van de verschillende typen laadpalen en de factoren die u moet overwegen bij de keuze van een laadpaal.
    </p>

    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
      Laadpalen voor elektrische auto's: een overzicht
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      Er zijn verschillende typen laadpalen voor elektrische auto's op de markt. De keuze van de juiste laadpaal hangt af van verschillende factoren, zoals het laadvermogen van de auto, de capaciteit van de aansluiting en de beschikbare ruimte in de woning.
    </p>

    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
      Hoe kiest u de juiste laadpaal voor uw klant?
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      Om de juiste laadpaal te kiezen, moet u eerst het laadvermogen van de auto van uw klant bepalen. Vervolgens moet u de capaciteit van de aansluiting controleren en de beschikbare ruimte in de woning in kaart brengen. Op basis van deze gegevens kunt u de juiste laadpaal Selecteren.
    </p>

    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
      Laadpalen en netcongestie: hoe voorkomt u overbelasting?
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      Overbelasting van de installatie kan voorkomen worden door load balancing toe te passen. Load balancing regelt de laadstroom van de laadpaal automatisch bij, op basis van het overige verbruik in de woning op dat moment.
    </p>

    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
      Hoe EnerCalculatie hiermee omgaat
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      EnerCalculatie maakt het specifieke laadprofiel van de laadpaal inzichtelijk en controleert direct de impact daarvan op de maximale capaciteit van de netaansluiting, in combinatie met de overige verduurzamingsmaatregelen in het dossier - zoals zonnepanelen, een warmtepomp of een thuisbatterij. Zo onderbouwt u in één adviesrapport welke configuratie technisch past bij de woning van de klant, in plaats van dit los per maatregel te beoordelen. Meer over de specifieke configuratiemogelijkheden vindt u op de <a href="/rekentool-laadpaal" className="text-brand-primary-text font-semibold hover:underline">rekentool laadpaal</a>. Lees voor meer informatie over laadpalen en elektrische auto's ook ons artikel over <a href="/blog/laadpaal-advies-thuis" className="text-brand-primary-text font-semibold hover:underline">laadpaal-advies</a>.
    </p>
  
    </BlogPostLayout>
  );
}
