import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'warmtepomp-rendement-berekenen')!;

export function WarmtepompRendementArticle() {
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
          Een rendementsberekening voor een warmtepomp is voor veel klanten ondoorzichtig: ze zien een getal voor de verwachte besparing, maar niet waar dat getal vandaan komt. Wie de onderliggende aannames niet kan uitleggen, verliest geloofwaardigheid op het moment dat de klant kritische vragen stelt — en die vragen komen, zeker bij een investering van deze omvang.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">De Nederlandse standaardaannames</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Het vertrekpunt van een warmtepomp-rendementsberekening is het gasverbruik dat de woning vervangt. Daarbij wordt gerekend met drie vaste aannames:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li><strong>8,79 kWh per m³ gas</strong> — de energie-inhoud van aardgas, gebruikt om het gasverbruik van de klant om te rekenen naar de hoeveelheid warmte die daadwerkelijk nodig is.</li>
          <li><strong>90% ketelrendement</strong> — het gemiddelde rendement van een bestaande cv-ketel: niet alle energie in het gas komt als warmte de woning binnen, een deel gaat verloren.</li>
          <li><strong>20% warmwateraandeel</strong> — het deel van het totale gasverbruik dat wordt besteed aan warm tapwater in plaats van ruimteverwarming.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Met deze drie aannames is uit het historische gasverbruik van de klant te herleiden hoeveel warmtevraag een warmtepomp moet kunnen leveren, en daarmee wat de te verwachten besparing op de energierekening is.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hybride systemen: wat blijft op de gasketel staan?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bij een hybride warmtepomp — waarbij de warmtepomp de ruimteverwarming voor het grootste deel van het jaar overneemt, maar de bestaande cv-ketel als back-up blijft staan — verandert de berekening op één belangrijk punt. Het warmwaterdeel en de bijstook op koude dagen blijven op de bestaande gasketel staan. De besparing wordt dan dus alleen berekend over het deel van het gasverbruik dat door de warmtepomp wordt overgenomen, niet over het volledige verbruik.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor de klant is dit een belangrijk onderscheid: een hybride systeem levert een lagere absolute besparing op dan een volledig elektrische warmtepomp, maar vraagt ook een lagere investering en minder ingrijpende aanpassingen aan de woning.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Waarom transparantie hier het verkoopargument is</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een klant die de drie aannames en de hybride-uitzondering begrijpt, vertrouwt het eindgetal van de berekening meer dan wanneer hij alleen een resultaat krijgt voorgelegd. Dit is ook relevant voor de onderbouwing richting de RVO bij een ISDE-aanvraag — zie{' '}
          <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">
            ons artikel over de ISDE-subsidie
          </a>
          {' '}voor de technische eisen die daarbij horen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          In EnerCalculatie zijn de drie standaardaannames en de hybride-uitzondering verwerkt in een vast, gevalideerd rekenmodel — niet als black box, maar volledig inzichtelijk in het gegenereerde adviesrapport. Zo kunt u tijdens het adviesgesprek elke stap van de berekening laten zien, en bouwt u vertrouwen op bij een investering die voor de klant vaak nieuw en onbekend terrein is. Wilt u zien hoeveel tijd dit u per dossier bespaart ten opzichte van een Excel-rekenmodel?{' '}
          <a href="/#pricing-calculator" className="text-brand-primary-text font-semibold hover:underline">
            Bereken uw tijdsbesparing
          </a>
          .
        </p>
      </BlogPostLayout>
    </>
  );
}
