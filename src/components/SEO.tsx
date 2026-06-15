import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  name?: string;
  image?: string;
}

export function SEO({
  title = 'EnerCalculatie - Dé software voor installateurs',
  description = 'Bespaar uren per dossier met de slimste rekenhulp voor verduurzamingsinstallateurs. Van energierekening tot foutloos adviesrapport in minder dan 5 minuten.',
  canonical = 'https://enercalculatie.nl',
  type = 'website',
  name = 'EnerCalculatie',
  image = '/og-image.png'
}: SEOProps) {
  const baseUrl = 'https://enercalculatie.nl';
  const imageUrl = `${baseUrl}${image}`;
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EnerCalculatie",
    "url": "https://enercalculatie.nl",
    "logo": "https://enercalculatie.nl/logo.png"
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://enercalculatie.nl"
    }
  ];

  if (canonical !== "https://enercalculatie.nl") {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": title.split(' - ')[0],
      "item": canonical
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      
      <link rel="canonical" href={canonical} />

      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}