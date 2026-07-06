import { SEO } from './SEO';
import { author, authorPerson } from '../content/author';

// /over-ons — auteur-/oprichterspagina die het Person-schema (author.ts) van een
// echte, bezoekbare profielpagina voorziet. Backt Person.url voor E-E-A-T:
// zoek-/AI-engines koppelen de blogauteur aan een concrete identiteit.
// Zowel de zichtbare tekst als het schema komen uit author.ts (single source) —
// vul de TODO-velden daar in en deze pagina + het schema updaten automatisch.
const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: authorPerson(),
};

export function AboutUs() {
  return (
    <>
      <SEO
        title="Over ons | EnerCalculatie"
        description="Wie zit er achter EnerCalculatie? Lees over de oprichter, de technische achtergrond en de expertise achter de reken- en adviessoftware voor verduurzamingsinstallateurs."
        canonical="https://www.enercalculatie.nl/over-ons"
      />
      {/* ProfilePage-schema (JSON-LD) — mainEntity is de auteur/Person. */}
      <script type="application/ld+json">{JSON.stringify(profilePageSchema)}</script>

      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200">
          <div className="animate-fade-up prose prose-slate max-w-none">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">Over EnerCalculatie</h1>

            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-2">{author.name}</h2>
            <p className="text-slate-500 font-semibold mb-6">{author.jobTitle}</p>

            {author.description && (
              <p className="text-slate-700 leading-relaxed mb-8">{author.description}</p>
            )}

            <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">Expertise</h3>
            <ul className="list-disc pl-6 mb-8 text-slate-700">
              {author.knowsAbout.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>

            {author.sameAs.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">Elders online</h3>
                <ul className="list-disc pl-6 text-slate-700">
                  {author.sameAs.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="text-brand-primary-text font-semibold hover:underline"
                      >
                        {url.replace(/^https?:\/\//, '')}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
