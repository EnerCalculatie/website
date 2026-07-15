import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'verduurzaming-kosten-baten-analyse')!;

export function VerduurzamingKostenBatenAnalyseArticle() {

  return (
    <>

      <BlogPostLayout post={post}>

    <p className="text-slate-700 leading-relaxed mb-4">
      Een verduurzamingspakket kan een grote investering zijn, maar wanneer loont het echt voor uw klant? Een goede analyse kan helpen bij het maken van een beslissing.
    </p>

    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat is een verduurzamingspakket?</h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      Een verduurzamingspakket is een combinatie van maatregelen om een woning of bedrijf te verduurzamen, zoals zonnepanelen, thuisbatterijen en warmtepompen. Elk van deze opties heeft zijn eigen voordelen en nadelen, en een goede analyse kan helpen bij het maken van een beslissing.
    </p>

    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe kan ik bepalen of een verduurzamingspakket loont voor mijn klant?</h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      Een kosten-batenanalyse is essentieel om te bepalen of een verduurzamingspakket loont voor uw klant. Hierbij worden de kosten van de investering vergeleken met de verwachte besparingen en voordelen. Onze expertise en rekentools kunnen u helpen bij het maken van een kosten-batenanalyse. Lees meer over <a href="/blog/salderingsregeling-2027" className="text-brand-primary-text font-semibold hover:underline">de salderingsregeling</a> en <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">ISDE-subsidie</a> voor warmtepompen.
    </p>

    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat zijn de meest populaire opties voor verduurzaming?</h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      Zonnepanelen, thuisbatterijen en warmtepompen zijn populaire opties voor verduurzaming. Elk van deze opties heeft zijn eigen voordelen en nadelen, en een goede analyse kan helpen bij het maken van een beslissing. Meer informatie over <a href="/rekentool-zonnepanelen" className="text-brand-primary-text font-semibold hover:underline">zonnepanelen</a>, <a href="/rekentool-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">thuisbatterijen</a> en <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">warmtepompen</a> vindt u op onze website.
    </p>

    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
    <p className="text-slate-700 leading-relaxed mb-4">
      EnerCalculatie kan helpen bij het maken van een kosten-batenanalyse. Onze rekentools en expertise kunnen u helpen bij het bepalen of een verduurzamingspakket loont voor uw klant. Lees meer over <a href="/blog/terugleverkosten-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">terugleverkosten en de rol van een thuisbatterij</a> en <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">ISDE-subsidie</a> voor warmtepompen.
    </p>
  
      </BlogPostLayout>
    </>
  );
}
