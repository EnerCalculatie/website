import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  name?: string;
}

export function SEO({
  title = 'EnerCalculatie - Dé software voor installateurs',
  description = 'Van energierekening tot onderbouwd verduurzamingsadvies. Geen Excel, geen typfouten. Alleen een adviesrapport waar jouw klant ja tegen zegt.',
  canonical = 'https://enercalculatie.nl',
  type = 'website',
  name = 'EnerCalculatie'
}: SEOProps) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EnerCalculatie",
    "url": "https://enercalculatie.nl",
    "logo": "https://enercalculatie.nl/logo.png"
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
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      
      <link rel="canonical" href={canonical} />

      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
    </Helmet>
  );
}