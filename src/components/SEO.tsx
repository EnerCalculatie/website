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
  title = 'EnerCalculatie - Dé slimste rekenhulp voor installateurs',
  description = 'Offertesoftware en calculatiesoftware voor verduurzamingsinstallateurs. Van energierekening tot gevalideerd adviesrapport in minder dan 5 minuten.',
  canonical = 'https://www.enercalculatie.nl',
  type = 'website',
  name = 'EnerCalculatie',
  image = '/og-image.png'
}: SEOProps) {
  const baseUrl = 'https://www.enercalculatie.nl';
  const imageUrl = `${baseUrl}${image}`;
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EnerCalculatie",
    "url": "https://www.enercalculatie.nl",
    "logo": "https://www.enercalculatie.nl/logo.png"
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EnerCalculatie",
    "alternateName": ["Offertesoftware zonnepanelen", "Calculatiesoftware verduurzaming", "Adviessoftware verduurzaming"],
    "description": "Offerte- en calculatiesoftware voor installatiebedrijven: automatiseer offertes en adviesrapporten voor zonnepanelen, thuisbatterijen, warmtepompen, airco's en laadpalen.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "WebBrowser",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "99.00",
      "highPrice": "299.00",
      "priceCurrency": "EUR",
      "offerCount": "3"
    }
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.enercalculatie.nl"
    }
  ];

  if (canonical !== "https://www.enercalculatie.nl") {
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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:image:alt" content={`${name} logo`} />
      
      <link rel="canonical" href={canonical} />

      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}