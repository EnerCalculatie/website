import { Linkedin, ArrowUpRight } from 'lucide-react';
import { SEO } from './SEO';
import { author, authorPerson } from '../content/author';

// /over-ons — auteur-/oprichterspagina die het Person-schema (author.ts) van een
// echte, bezoekbare profielpagina voorziet. Backt Person.url voor E-E-A-T:
// zoek-/AI-engines koppelen de blogauteur aan een concrete identiteit.
// Zowel de zichtbare tekst als het schema komen uit author.ts (single source).
const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: authorPerson(),
};

// Initialen uit de naam (eerste + laatste woord), bv. "Pascal van Eijden" -> "PE".
const initials = (() => {
  const parts = author.name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
})();

const linkedInUrl = author.sameAs.find((u) => u.includes('linkedin.com'));

export function AboutUs() {
  return (
    <>
      <SEO
        title="Over ons | EnerCalculatie"
        description="Wie zit er achter EnerCalculatie? Lees over de oprichter en de technische achtergrond van de reken- en adviessoftware voor installateurs."
        canonical="https://enercalculatie.nl/over-ons"
      />
      {/* ProfilePage-schema (JSON-LD) — mainEntity is de auteur/Person. */}
      <script type="application/ld+json">{JSON.stringify(profilePageSchema)}</script>

      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CSS-animatie i.p.v. Motion: initial opacity 0 zou de content tot
              hydration onzichtbaar houden (LCP-killer). */}
          <div className="animate-fade-up">
            <p className="text-brand-primary font-bold uppercase tracking-wide text-sm mb-3">Over ons</p>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              De mensen achter EnerCalculatie
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              EnerCalculatie is gebouwd vanuit de praktijk: reken- en adviessoftware die
              installateurs helpt om verduurzamingsadvies onderbouwd, snel en
              controleerbaar op te stellen — van zonnepanelen tot warmtepomp.
            </p>
          </div>

          {/* Profielkaart oprichter */}
          <div className="animate-fade-up anim-delay-100 mt-10 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Avatar met initialen */}
                <div
                  aria-hidden="true"
                  className="shrink-0 w-20 h-20 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-black shadow-inner"
                >
                  {initials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-2xl font-black text-slate-900">{author.name}</h2>
                  <p className="text-slate-500 font-semibold">{author.jobTitle}</p>
                </div>
              </div>

              {author.description && (
                <p className="text-slate-700 leading-relaxed mt-8">{author.description}</p>
              )}

              {/* Expertise als pills */}
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-3">Expertise</h3>
                <ul className="flex flex-wrap gap-2">
                  {author.knowsAbout.map((topic) => (
                    <li
                      key={topic}
                      className="bg-slate-100 text-slate-700 text-sm font-semibold px-3 py-1.5 rounded-full"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* LinkedIn-profielkaart (eigen embed, geen extern script) */}
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={`Bekijk het LinkedIn-profiel van ${author.name}`}
                className="group flex items-center gap-4 border-t border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors p-6 sm:px-10"
              >
                <span className="shrink-0 w-12 h-12 rounded-xl bg-[#0a66c2] text-white flex items-center justify-center">
                  <Linkedin size={22} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-slate-900">Volg {author.name} op LinkedIn</span>
                  <span className="block text-sm text-slate-500 truncate">
                    {linkedInUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </span>
                </span>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-slate-400 group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
