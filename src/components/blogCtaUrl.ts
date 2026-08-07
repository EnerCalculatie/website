/** Bouwt de /gratis-link met UTM-attributie vanuit een blogartikel, zodat
 *  per artikel-slug en CTA-plaatsing (bottom/inline) meetbaar is welke
 *  content leads oplevert (voorheen ontbrak dit volledig). */
export function blogCtaUrl(slug: string, placement: 'bottom' | 'inline'): string {
  const params = new URLSearchParams({
    utm_source: 'blog',
    utm_medium: 'cta',
    utm_campaign: placement,
    utm_content: slug,
  });
  return `https://app.enercalculatie.nl/gratis?${params.toString()}`;
}
