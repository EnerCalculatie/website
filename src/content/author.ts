// Founder-/auteuridentiteit voor E-E-A-T. Eén bron voor het Person-schema dat
// via BlogPostLayout in élk blogartikel als `author` wordt meegegeven.
//
// VUL DE TODO-VELDEN IN met aantoonbare gegevens. Verzin geen titels of
// credentials — dat is juridisch riskant én ondermijnt de E-E-A-T-gedachte
// (Google/AI-engines waarderen alleen verifieerbare expertise). Laat een veld
// dat niet klopt liever leeg dan onjuist.

export interface AuthorSchema {
  '@type': 'Person';
  name: string;
  jobTitle: string;
  /** 1–2 zinnen technische achtergrond die de expertise onderbouwt. */
  description: string;
  /** Profielpagina op de eigen site (about/over-ons), of '' als die er niet is. */
  url: string;
  /** Onderwerpen waarover deze auteur aantoonbaar kennis heeft. */
  knowsAbout: string[];
  /** Externe profielen die de identiteit bevestigen (LinkedIn etc.). */
  sameAs: string[];
}

export const author: AuthorSchema = {
  '@type': 'Person',
  name: 'Pascal van Eijden',
  jobTitle: 'Oprichter & ontwikkelaar, EnerCalculatie',
  description:
    'Pascal is oprichter en ontwikkelaar van EnerCalculatie. Hij bouwde het rekenmodel achter de software, dat verduurzamingsadvies onderbouwt op basis van de Nederlandse regelgeving rond saldering, ISDE-subsidie en netcongestie.',
  url: 'https://www.enercalculatie.nl/over-ons', // pas aan of zet op '' als er geen about-pagina is
  knowsAbout: [
    'Salderingsregeling',
    'Rendementsberekening zonnepanelen',
    'Thuisbatterij-dimensionering',
    'Warmtepomp-rendement (SCOP)',
    'ISDE-subsidie',
    'Netcongestie',
  ],
  sameAs: [
    'https://www.linkedin.com/in/pascalvaneijden/',
  ],
};

/**
 * Person-schema (JSON-LD) voor de auteur, met lege optionele velden weggelaten
 * — een leeg `url`/`sameAs` in JSON-LD is rommel. Gedeeld door het BlogPosting-
 * schema (author) en de /over-ons ProfilePage (mainEntity).
 */
export function authorPerson() {
  const { url, sameAs, description, ...rest } = author;
  return {
    ...rest,
    ...(description ? { description } : {}),
    ...(url ? { url } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
