import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';
import { SEO } from './SEO';

export function NewsletterConfirmed() {
  return (
    <>
      <SEO
        title="Inschrijving bevestigd | EnerCalculatie"
        description="Uw inschrijving voor de EnerCalculatie-nieuwsbrief is bevestigd."
        canonical="https://www.enercalculatie.nl/nieuwsbrief-bevestigd"
      />
      {/* Transactional bedankt-pagina, geen zoekresultaat-waarde: niet indexeren en niet in sitemap.xml. */}
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <CheckCircle2 size={56} className="mx-auto text-brand-primary-text mb-6" />
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">
              Bedankt voor uw inschrijving
            </h1>
            <p className="text-slate-600 leading-relaxed mb-8">
              Uw inschrijving voor de EnerCalculatie-nieuwsbrief is bevestigd. U ontvangt vanaf nu updates over regelgeving en nieuwe functies.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-primary-text hover:opacity-90 text-white font-bold rounded-xl transition-all min-h-[48px]"
            >
              Terug naar de website
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
