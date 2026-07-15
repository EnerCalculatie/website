import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'zonnepanelen-warmtepomp-combinatie')!;

export function ZonnepanelenWarmtepompCombinatieArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">Een combinatie van zonnepanelen en warmtepompen biedt een efficiënte en duurzame oplossing voor uw energiebehoeften. De zonnepanelen genereren elektriciteit uit zonlicht, terwijl de warmtepomp warmte uit de lucht of bodem haalt om uw woning te verwarmen. Deze combinatie kan uw energierekening verlagen en uw ecologische voetafdruk reduceren.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Voordelen van de combinatie</h2><p className="text-slate-700 leading-relaxed mb-4">De combinatie van zonnepanelen en warmtepompen biedt een hogere energie-efficiëntie en een lagere energierekening. Bovendien kunt u gebruik maken van subsidies en premies om de investering te financieren.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2><p className="text-slate-700 leading-relaxed mb-4">EnerCalculatie biedt een geïntegreerde oplossing voor zonnepanelen en warmtepompen. Onze experten ontwerpen en installeren een systeem dat is afgestemd op uw specifieke energiebehoeften en de omvang van uw woning. Meer informatie over <a href="/rekentool-zonnepanelen" className="text-brand-primary-text font-semibold hover:underline">zonnepanelen</a> en <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">warmtepompen</a> vindt u op onze website.</p>
      </BlogPostLayout>
    </>
  );
}
