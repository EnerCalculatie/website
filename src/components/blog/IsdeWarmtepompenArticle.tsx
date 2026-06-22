import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'isde-subsidie-warmtepompen')!;

export function IsdeWarmtepompenArticle() {
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
        url: 'https://www.enercalculatie.nl/logo.svg',
      },
    },
    mainEntityOfPage: `https://www.enercalculatie.nl/blog/${post.slug}`,
  };

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          De ISDE-subsidie (Investeringssubsidie Duurzame Energie en Energiebesparing) is voor veel klanten een doorslaggevend argument om de overstap naar een warmtepomp te maken. Maar de RVO beoordeelt elke aanvraag op basis van specifieke technische onderbouwing — en een onvolledig of onjuist onderbouwd adviesrapport kost uw klant tijd, of in het slechtste geval de subsidie zelf.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Welke onderbouwing vraagt de RVO?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor een ISDE-aanvraag voor een warmtepomp moet de RVO kunnen vaststellen welk type apparaat is geplaatst, en of dit apparaat voldoet aan de subsidievoorwaarden. Dit gebeurt via meldcodes: unieke identificatiecodes per warmtepompmodel die in de RVO-apparatenlijst zijn opgenomen. Daarnaast wil de RVO de relevante technische specificaties en vermogens van de installatie kunnen herleiden uit de aangeleverde documentatie.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor de daadwerkelijke aanvraag heeft de eindklant altijd een installatie- en betaalbewijs van het erkende installatiebedrijf nodig. Dat bewijs toont aan dát de installatie heeft plaatsgevonden; het adviesrapport dat u vooraf opstelt, onderbouwt wáárom deze specifieke warmtepomp passend is voor de woning van de klant.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Waar ligt de grens tussen advies en aanvraag?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Als installateur bent u verantwoordelijk voor het technisch onderbouwde advies: welk vermogen past bij de woning, welke meldcode hoort bij het voorgestelde apparaat, en welk besparingseffect mag de klant redelijkerwijs verwachten. De daadwerkelijke subsidieaanvraag bij de RVO — inclusief het indienen van het installatie- en betaalbewijs — blijft een aparte stap die de eindklant (of u namens de klant) na de installatie zelf doorloopt.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een adviesrapport dat deze twee stappen niet duidelijk van elkaar onderscheidt, kan bij de klant de verwachting wekken dat de subsidie al geregeld is op het moment van de offerte. Dat onderscheid expliciet benoemen voorkomt misverstanden achteraf.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Veelgemaakte fouten in de onderbouwing</h2>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Een generieke meldcode noemen in plaats van de exacte code van het geoffreerde model.</li>
          <li>Vermogens en rendementsaannames niet onderbouwen met de werkelijke situatie van de woning (isolatiegraad, huidige verwarmingsinstallatie).</li>
          <li>Geen onderscheid maken tussen het advies vooraf en de aanvraagstap achteraf, met verwarring bij de klant als gevolg.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De adviesrapporten van EnerCalculatie bevatten de technische specificaties, vermogens en berekeningen die de RVO vraagt bij ISDE-aanvragen voor warmtepompen, met ondersteuning voor meldcodes. Hoe het verwachte rendement van een warmtepomp precies wordt berekend — inclusief de Nederlandse standaardaannames die hierbij gebruikt worden — leest u in{' '}
          <a href="/blog/warmtepomp-rendement-berekenen" className="text-brand-primary-text font-semibold hover:underline">
            ons artikel over warmtepomp-rendement
          </a>
          . Zo levert u de onderbouwing in het traject vóór de aanvraag, en weet uw klant precies wat hij bij de RVO kan indienen zodra de installatie is afgerond.
        </p>
      </BlogPostLayout>
    </>
  );
}
