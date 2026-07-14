import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'thuisbatterij-vergelijking-merken-en-typen')!;

export function ThuisbatterijVergelijkingMerkenEnTypenArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">Het kiezen van de juiste thuisbatterij voor uw klant kan lastig zijn. Maar met de juiste kennis en de juiste vergelijking, kunt u een onderbouwd advies geven. In dit artikel leggen we uit wat zelfconsumptie en energieopslag zijn en hoe u de juiste thuisbatterij voor uw klant kunt kiezen.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Definitie van zelfconsumptie en energieopslag</h2><p className="text-slate-700 leading-relaxed mb-4">Zelfconsumptie is het eigen verbruik van de door uw zonnepanelen opgewekte stroom. Een thuisbatterij kan dat verbruik verhogen door teruggeleverde stroom op te slaan en later te gebruiken. Energieopslag is de mogelijkheid om energie die op een bepaald moment wordt opgewekt, op te slaan voor later gebruik. Thuisbatterijen zijn een vorm van energieopslag.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Vergelijking van verschillende typen en merken van thuisbatterijen</h2><table className="table-auto"><thead><tr><th>Soort accu</th><th>Capaciteit</th><th>Garantie</th><th>Kosten</th></tr></thead><tbody><tr><td>Lead-acide</td><td>2-5 kWh</td><td>5-10 jaar</td><td>€ 500-€ 1.500</td></tr><tr><td>Li-ion</td><td>5-15 kWh</td><td>10-20 jaar</td><td>€ 1.500-€ 3.000</td></tr><tr><td>AgZn</td><td>1-3 kWh</td><td>5-10 jaar</td><td>€ 300-€ 800</td></tr></tbody></table><p className="text-slate-700 leading-relaxed mb-4">Bij het kiezen van een thuisbatterij moet u rekening houden met factoren als het soort accu, de capaciteit, de garantie en de kosten. Vergelijk verschillende typen en merken om de beste keuze te maken.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Belang van rendement en terugverdientijd bij het kiezen van een thuisbatterij</h2><p className="text-slate-700 leading-relaxed mb-4">De terugverdientijd van een thuisbatterij hangt af van factoren als de kosten van de batterij, de besparing op de energierekening en de salderingsregeling. Een gemiddelde terugverdientijd van 5-10 jaar is realistisch.</p><h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2><p className="text-slate-700 leading-relaxed mb-4">EnerCalculatie biedt een rekentool voor thuisbatterijen die u helpt bij het kiezen van de juiste batterij voor uw klant. De rekentool houdt rekening met factoren als de capaciteit, de garantie en de kosten van de batterij. <a href="/rekentool-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">Lees hier meer over de rekentool</a>. Ook de <a href="/blog/thuisbatterij-capaciteit-kiezen" className="text-brand-primary-text font-semibold hover:underline">thuisbatterij-capaciteit</a> en de <a href="/blog/terugleverkosten-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">terugleverkosten</a> zijn belangrijk om te overwegen.</p>
      </BlogPostLayout>
    </>
  );
}
