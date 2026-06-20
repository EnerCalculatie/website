import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'salderingsregeling-2027')!;

export function SalderingsregelingArticle() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'EnerCalculatie',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EnerCalculatie',
      logo: {
        '@type': 'ImageObject',
        url: 'https://enercalculatie.nl/logo.svg',
      },
    },
    mainEntityOfPage: `https://enercalculatie.nl/kennisbank/${post.slug}`,
  };

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://enercalculatie.nl/kennisbank/${post.slug}`}
      />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          De salderingsregeling is jarenlang het belangrijkste financiële argument geweest in elk verkoopgesprek over zonnepanelen. De politieke plannen rond de afbouw zijn echter recent gewijzigd — en dat heeft directe gevolgen voor hoe u de terugverdientijd aan uw klanten voorlegt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat verandert er?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De eerder voorgenomen geleidelijke afbouw van de salderingsregeling is van de baan. Het huidige wetsvoorstel gaat uit van een volledige afschaffing in één keer, per 1 januari 2027. Tot die datum blijft de huidige regeling ongewijzigd van kracht: teruggeleverde stroom wordt verrekend tegen het leveringstarief.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Na 1 januari 2027 ontvangt een huishouden voor teruggeleverde stroom naar verwachting een vergoeding op basis van het zogeheten terugleveringstarief, dat doorgaans lager ligt dan het leveringstarief. Concreet betekent dit dat zelfconsumptie en eventuele opslag (zoals een thuisbatterij) vanaf die datum een groter deel van het financiële rendement gaan bepalen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat betekent dit voor uw adviesgesprek?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een rendementsberekening die uitsluitend uitgaat van de huidige salderingsregeling, geeft uw klant een te rooskleurig beeld van de jaren na 2027. Voor offertes en adviesrapporten die een terugverdientijd van 10 of 25 jaar tonen, is het belangrijk om het 2027-scenario mee te nemen in de berekening — niet alleen de huidige situatie.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dat betekent in de praktijk:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Reken na 1 januari 2027 met een lagere vergoeding voor teruggeleverde stroom dan vóór die datum.</li>
          <li>Laat zien wat een hogere zelfconsumptie oplevert — bijvoorbeeld door het gebruik van een warmtepomp, laadpaal of thuisbatterij overdag te concentreren.</li>
          <li>Wees transparant naar de klant over het feit dat de wetgeving nog niet definitief is vastgesteld, en dat de berekening op het huidige wetsvoorstel is gebaseerd.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De rendementsberekeningen in EnerCalculatie houden rekening met dit 2027-scenario in de berekening over 10 of 25 jaar, zodat u uw klant een realistisch beeld geeft van de jaren vóór en na de afschaffing. Zodra de wetgeving wijzigt, wordt dit in de rekenmodellen bijgewerkt.
        </p>
      </BlogPostLayout>
    </>
  );
}
