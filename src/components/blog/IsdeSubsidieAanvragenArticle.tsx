import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'isde-subsidie-aanvragen')!;

export function IsdeSubsidieAanvragenArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>

    <p className="text-slate-700 leading-relaxed mb-4">
      De ISDE-subsidie is een belangrijke financieringsmogelijkheid voor woningeigenaren die een warmtepomp aanschaffen. Als installateur kunt u uw klanten helpen bij het aanvragen van deze subsidie.
    </p>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
      Hoe werkt de ISDE-subsidie?
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      De ISDE-subsidie is een eenmalige subsidie van €1.025 en €225 per kW vermogen, met een minimumbedrag van €500. De subsidie is beschikbaar voor woningeigenaren die een warmtepomp aanschaffen die op de actuele meldcodelijst van de RVO staat.
    </p>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
      Welke eisen moet uw klant voldoen?
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      Uw klant moet een warmtepomp aanschaffen die op de actuele meldcodelijst van de RVO staat en voldoen aan de technische eisen die de RVO stelt. U moet ook een offerte opstellen met daarin de meldcode van de warmtepomp, de capaciteit, het vermogen en de totale investering.
    </p>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
      Hoe bereidt u de subsidieaanvraag voor?
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      U moet een kopie van de factuur en het betalingsbewijs toevoegen aan de aanvraag. Het is raadzaam om de aanvraag zo snel mogelijk in te dienen, aangezien de subsidie beschikbaar is tot het subsidieplafond is bereikt.
    </p>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
      Hoe EnerCalculatie hiermee omgaat
    </h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      EnerCalculatie helpt installateurs bij het opstellen van een offerte voor een warmtepomp, met daarin de meldcode, de capaciteit, het vermogen en de totale investering. Wij bieden ook een rekentool om de subsidie te berekenen en de benodigde documenten voor de aanvraag aan te maken. Meer over de ISDE-subsidie en de aanvraagprocedure vindt u op de <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">rekentool warmtepomp</a>. U kunt ook <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">meer lezen over de ISDE-subsidie</a> en de eisen die uw klant moet voldoen.
    </p>
  
      </BlogPostLayout>
    </>
  );
}
