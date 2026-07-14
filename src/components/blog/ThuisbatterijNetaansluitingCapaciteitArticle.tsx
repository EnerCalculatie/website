import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'thuisbatterij-netaansluiting-capaciteit')!;

export function ThuisbatterijNetaansluitingCapaciteitArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">Een thuisbatterij kan een belangrijke rol spelen in het verduurzamen van uw woning, maar het is essentieel om de invloed op uw netaansluiting te begrijpen. De capaciteit van uw netaansluiting is de maximale hoeveelheid stroom die uw woning kan verwerken zonder overbelasting.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Maximale capaciteit van uw netaansluiting</h2><p className="text-slate-700 leading-relaxed mb-4">De maximale capaciteit van uw netaansluiting is afhankelijk van verschillende factoren, waaronder de grootte van uw woning, het aantal verbruikers en de capaciteit van uw groepenkast. Het is belangrijk om deze capaciteit te bepalen voordat u een thuisbatterij installeert.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Impact van een thuisbatterij op uw netaansluiting</h2><p className="text-slate-700 leading-relaxed mb-4">Een thuisbatterij kan de capaciteit van uw netaansluiting beïnvloeden, zeker in combinatie met andere verduurzamingsmaatregelen zoals zonnepanelen en warmtepompen. Het is essentieel om de impact van een thuisbatterij op uw netaansluiting te evalueren voordat u deze installeert.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Batterijbeheer en aanpassingen aan uw offerte</h2><p className="text-slate-700 leading-relaxed mb-4">Batterijbeheer kan aanpassingen aan uw offerte vereisen, zeker wanneer de capaciteit van uw netaansluiting ontoereikend is of wanneer u meerdere verduurzamingsmaatregelen combineert. EnerCalculatie kan u helpen bij het bepalen van de juiste capaciteit en het maken van aanpassingen aan uw offerte.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2><p className="text-slate-700 leading-relaxed mb-4">EnerCalculatie biedt een rekentool waarmee u de maximale capaciteit van uw netaansluiting kunt bepalen en de impact van een thuisbatterij op uw netaansluiting kunt evalueren. <a href="/rekentool-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">Onze rekentool thuisbatterij</a> helpt u bij het maken van aanpassingen aan uw offerte en het kiezen van de juiste capaciteit voor uw woning. <a href="/blog/terugleverkosten-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">Lees meer over terugleverkosten en thuisbatterijen</a> en ontdek hoe EnerCalculatie u kan helpen bij het verduurzamen van uw woning.</p>
      </BlogPostLayout>
    </>
  );
}
