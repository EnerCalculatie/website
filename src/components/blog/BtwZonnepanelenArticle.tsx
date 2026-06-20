import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'btw-zonnepanelen')!;

export function BtwZonnepanelenArticle() {
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
    mainEntityOfPage: `https://www.enercalculatie.nl/kennisbank/${post.slug}`,
  };

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/kennisbank/${post.slug}`}
      />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Sinds 1 januari 2023 geldt voor de levering en installatie van zonnepanelen op of nabij woningen een btw-tarief van 0% in plaats van het reguliere tarief van 21%. Voor een gemiddelde installatie scheelt dit uw klant direct enkele honderden tot duizenden euro&apos;s op de offerte. Het nultarief geldt echter niet automatisch voor elke situatie, en een onjuiste toepassing kan bij een controle door de Belastingdienst tot een naheffing leiden — bij u of bij uw klant. Onderstaand zet de voorwaarden op een rij.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wanneer geldt het 0%-tarief?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Het nultarief geldt voor zonnepanelen die worden geleverd en geïnstalleerd op of in de onmiddellijke nabijheid van een woning. Dit omvat niet alleen het hoofdgebouw, maar ook bijgebouwen zoals een garage, schuur, carport of vakantiewoning, en panelen op aangrenzend perceel. De regeling is bedoeld voor particuliere eigenaren en Verenigingen van Eigenaars (VvE&apos;s); bij installaties op bedrijfsmatig vastgoed geldt het reguliere tarief.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Het nultarief wordt automatisch toegepast: de klant hoeft hiervoor niets aan te vragen bij de Belastingdienst. Het is aan u als installateur om te beoordelen of, en correct te verwerken dat, een installatie aan de voorwaarden voldoet.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat valt wel, en wat valt niet onder het nultarief?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Onder het nultarief vallen de zonnepanelen zelf, de omvormer, optimizers, montagemateriaal, bekabeling, installatie-uren en de eventuele aanpassing van de meterkast. Dit zijn de onderdelen die rechtstreeks nodig zijn om de panelen te plaatsen en aan te sluiten.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Buiten het nultarief vallen onder meer: dakversterking of andere bouwkundige aanpassingen, vogelwering en sneeuwrails, thuisbatterijen, laadpalen, zonneboilers en zogeheten PVT-systemen (panelen die zowel stroom als warmte opwekken). Voor deze onderdelen blijft het reguliere btw-tarief van 21% van toepassing. Bij een gecombineerde offerte — bijvoorbeeld zonnepanelen met een thuisbatterij — is het daarom nodig om de posten apart te specificeren met het bijbehorende tarief.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wanneer geldt er toch 21% btw?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Naast bedrijfsmatig vastgoed en de hierboven genoemde nevenposten, geldt het reguliere tarief ook wanneer panelen standaard zijn geïntegreerd in een nieuwbouwwoning (als onderdeel van de bouwsom), en bij facturen die zijn gedateerd vóór 1 januari 2023. Het is daarom voor uw eigen administratie en die van uw klant van belang om de factuurdatum en de aard van het project goed vast te leggen.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wat moet er in de offerte en factuur staan?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor een controle door de Belastingdienst moet u kunnen aantonen dat een installatie op of bij een woning plaatsvindt, bijvoorbeeld met het woonadres en, indien nodig, een uittreksel uit de Basisregistratie Adressen en Gebouwen (BAG). In de offerte en factuur adviseren wij om de volgende punten te verwerken:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>Het volledige installatieadres, zodat de woonfunctie van het pand vaststaat.</li>
          <li>Een duidelijke splitsing tussen posten die onder het nultarief vallen (panelen, omvormer, montage, bekabeling, installatie) en posten waarvoor 21% btw geldt (dakversterking, thuisbatterij, laadpaal en dergelijke).</li>
          <li>Het toegepaste btw-tarief per regel, in plaats van één totaalbedrag inclusief btw.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een transparante uitsplitsing in de offerte voorkomt niet alleen discussie achteraf met de klant, maar maakt ook meteen zichtbaar wat het nultarief concreet oplevert — een overtuigend argument in het verkoopgesprek, naast de terugverdientijd van de installatie zelf.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          In EnerCalculatie worden offerteposten per onderdeel ingevoerd, zodat het toepasselijke btw-tarief per regel gevalideerd en deterministisch berekend wordt — ook bij gecombineerde projecten met bijvoorbeeld een thuisbatterij of laadpaal naast de zonnepanelen. Dit voorkomt dat het nultarief per ongeluk op de verkeerde post wordt toegepast, en geeft uw klant direct een kloppend overzicht van het btw-voordeel binnen de totale offerte.
        </p>
      </BlogPostLayout>
    </>
  );
}
