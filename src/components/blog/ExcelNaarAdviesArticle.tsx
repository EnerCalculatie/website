import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'van-excel-naar-geautomatiseerd-advies')!;

export function ExcelNaarAdviesArticle() {
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
          Veel installateurs herkennen het: een eigen Excel-rekenmodel, jarenlang opgebouwd en aangepast, dat het rendement van zonnepanelen, een thuisbatterij of een warmtepomp berekent. Het werkt — tot het moment dat een tarief wijzigt, een nieuwe medewerker het bestand moet overnemen, of een klant een vraag stelt die het sjabloon niet voorzien had.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Waar een Excel-rekenmodel vastloopt</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Tarieven overtypen in Excel kost tijd en leidt snel tot rekenfouten, zeker wanneer dit naast drukke werkdagen op de bouw of bij de klant gebeurt. Energieprijzen, BTW-regels en de salderingsregeling veranderen regelmatig — elke wijziging moet handmatig worden doorgevoerd in elk losse rekenblad, en een vergeten update valt vaak pas op als een klant er zelf naar vraagt.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Daarnaast is een Excel-bestand zo goed als de persoon die het heeft gebouwd. Verlaat die collega het bedrijf, of wil een nieuwe medewerker zelfstandig offertes opstellen, dan is er vaak geen documentatie van wélke aannames en formules in het bestand verwerkt zijn.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat verandert er in uw werkdag?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De overstap naar een gestructureerd traject verandert vooral het aantal handmatige stappen tussen het eerste klantcontact en de getekende offerte. In de praktijk ziet dat traject er als volgt uit:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li><strong>Pand registreren</strong> — adres invoeren, luchtfoto en panddata worden direct ingeladen via de Kadaster-koppeling, zonder dat u dit zelf hoeft op te zoeken.</li>
          <li><strong>Energierekening uploaden</strong> — piek- en daltarieven en gasverbruik worden automatisch uitgelezen uit de pdf, in plaats van handmatig overgetypt.</li>
          <li><strong>Adviesrapport downloaden</strong> — het optimale systeem wordt berekend en in een professioneel rapport gezet, klaar om met de klant te delen.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Het rekenwerk zelf — saldering, BTW-tarieven, terugleverkosten, warmtepomprendement — wordt op de achtergrond gevalideerd en deterministisch berekend: dezelfde invoer geeft altijd dezelfde uitkomst, en bij een tariefwijziging past u dit op één centrale plek aan in plaats van in elk los Excel-bestand.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Voor wie is dit relevant?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dit traject is vooral merkbaar voor MKB-installateurs die meerdere offertes per week opstellen, met meerdere medewerkers die dossiers moeten kunnen overnemen, en die willen voorkomen dat kennis over rekenmethodes bij één persoon blijft hangen. Bij een laag aantal dossiers per maand is de tijdsbesparing kleiner, maar blijft het voordeel van een centraal bijgehouden rekenmodel — in plaats van losse bestanden die elk hun eigen versie van de waarheid worden — relevant.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Twijfelt u nog?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De makkelijkste manier om te zien wat dit voor uw eigen werkdag betekent, is door uw huidige aantal dossiers per maand naast de tijd te zetten die u daar nu aan kwijt bent. Gebruik de{' '}
          <a href="/#pricing-calculator" className="text-brand-primary-text font-semibold hover:underline">
            ROI-calculator op de homepage
          </a>
          {' '}om dit voor uw situatie te berekenen, of{' '}
          <a href="/#contact" className="text-brand-primary-text font-semibold hover:underline">
            plan een korte demo
          </a>
          {' '}om het traject in 20 minuten zelf te zien.
        </p>
      </BlogPostLayout>
    </>
  );
}
