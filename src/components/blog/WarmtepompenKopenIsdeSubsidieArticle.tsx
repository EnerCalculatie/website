import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'warmtepompen-kopen-isde-subsidie')!;

export function WarmtepompenKopenIsdeSubsidieArticle() {

  return (
    <>

      <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">De Nederlandse overheid biedt een ISDE-subsidie aan voor huiseigenaren die een warmtepomp installeren. Deze subsidie bedraagt maximaal €5.000 en is afhankelijk van het type warmtepomp en de woning waarin deze wordt geïnstalleerd.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Soorten warmtepompen</h2><p className="text-slate-700 leading-relaxed mb-4">Er zijn twee hoofdtypen warmtepompen: hybride en all-electric warmtepompen. Hybride warmtepompen combineren elektrische en gasgestookte verwarming, terwijl all-electric warmtepompen alleen elektriciteit gebruiken.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Rendementen van warmtepompen</h2><p className="text-slate-700 leading-relaxed mb-4">Het rendement van een warmtepomp hangt af van verschillende factoren, zoals de isolatie van de woning, de atmosferische omstandigheden en de kwaliteit van de warmtepomp. Een goede isolatie van de woning is essentieel voor het rendement van de warmtepomp.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">ISDE-subsidie voor warmtepompen</h2><p className="text-slate-700 leading-relaxed mb-4">De ISDE-subsidie voor warmtepompen is een belangrijke stimulans voor huiseigenaren om over te stappen op een duurzame verwarmingsbron. De subsidie bedraagt maximaal €5.000 en is afhankelijk van het type warmtepomp en de woning waarin deze wordt geïnstalleerd.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2><p className="text-slate-700 leading-relaxed mb-4">EnerCalculatie biedt een rekentool aan om de juiste warmtepomp te kiezen voor uw klant. Onze rekentool houdt rekening met factoren zoals de grootte van de woning, de isolatie, de energievraag en de subsidievoorwaarden. <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">Lees meer over onze rekentool warmtepomp</a> of <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">lees ons blogartikel over de ISDE-subsidie voor warmtepompen</a>.</p>
      </BlogPostLayout>
    </>
  );
}
