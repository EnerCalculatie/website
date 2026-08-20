import { ArrowRight, CheckCircle2, Link2, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { SEO } from './SEO';
import { LeadMagnet } from './LeadMagnet';
import { trackEvent } from '../analytics';

const FEATURES = [
  {
    icon: <Link2 className="text-brand-primary-text" size={24} />,
    title: 'Beveiligde klantlink',
    description:
      'Verstuur de offerte als unieke, beveiligde link — geen account nodig voor uw klant. Losse producten en werkzaamheden staan er itemized in, naast het doorgerekende advies.',
  },
  {
    icon: <CheckCircle2 className="text-brand-primary-text" size={24} />,
    title: 'Digitaal accepteren of afwijzen',
    description:
      'Uw klant bekijkt de offerte online en beslist digitaal. Elke beslissing wordt vastgelegd (IP-adres, moment, voorwaardenversie) — geen los PDF-mailtje meer.',
  },
  {
    icon: <ShieldCheck className="text-brand-primary-text" size={24} />,
    title: 'Automatische bedenktijd-classificatie',
    description:
      'Op basis van klanttype en verkoopkanaal bepaalt het systeem automatisch of, en hoelang, bedenktijd van toepassing is — nooit stilzwijgend "geen bedenktijd".',
  },
  {
    icon: <ClipboardCheck className="text-brand-primary-text" size={24} />,
    title: 'Werkvoorbereiding sluit aan',
    description:
      'Na acceptatie gebruikt de werkvoorbereiding automatisch wat er in de offerte is afgesproken. Pandgegevens blijven actueel vanuit het dossier — geen dubbel overtypen.',
  },
];

const FAQS = [
  {
    question: 'Hoe ontvangt mijn klant de offerte?',
    answer:
      'Via een unieke, beveiligde link — u verstuurt deze zelf vanuit het dossier. Uw klant heeft geen account nodig om de offerte te bekijken en te beslissen.',
  },
  {
    question: 'Wat gebeurt er als de klant akkoord gaat of afwijst?',
    answer:
      'De beslissing wordt direct vastgelegd, inclusief tijdstip en de versie van de voorwaarden waarmee de klant akkoord ging. U ziet de status meteen terug in uw dossieroverzicht.',
  },
  {
    question: 'Bepaalt EnerCalculatie of er bedenktijd geldt?',
    answer:
      'Het systeem classificeert dit automatisch op basis van het klanttype (consument/zakelijk) en het verkoopkanaal dat u opgeeft, en toont dit als duidelijke status bij de offerte. Bij twijfel wordt dit nooit stilzwijgend als "geen bedenktijd" weergegeven.',
  },
  {
    question: 'Kan ik nog steeds een PDF printen?',
    answer:
      'Ja — naast de digitale klantlink kunt u de offerte en het adviesrapport ook gewoon als PDF printen of downloaden.',
  },
];

export function OfferteSoftwareLanding() {
  const canonical = 'https://www.enercalculatie.nl/offerte-software';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digitale offertesoftware voor installateurs',
    serviceType: 'Offertesoftware',
    description:
      'Stel een offerte samen vanuit een doorgerekend energieadvies, verstuur een beveiligde klantlink en laat uw klant digitaal accepteren of afwijzen.',
    provider: {
      '@type': 'Organization',
      name: 'EnerCalculatie',
      url: 'https://www.enercalculatie.nl',
    },
    areaServed: { '@type': 'Country', name: 'Nederland' },
    url: canonical,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <SEO
        title="Offertesoftware voor installateurs | EnerCalculatie"
        description="Verstuur een offerte als beveiligde klantlink, laat uw klant digitaal beslissen en krijg automatisch de juiste bedenktijd-classificatie."
        canonical={canonical}
      />
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary-text font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-4">
              Offertesoftware
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">
              Van doorgerekend advies naar digitaal geaccepteerde offerte
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl">
              Stel de offerte samen vanuit het scenario dat u al heeft doorgerekend, verstuur een
              beveiligde klantlink en laat uw klant online beslissen — zonder los PDF-mailtje en
              zonder handmatig een bedenktijd-regel op te zoeken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="https://app.enercalculatie.nl/gratis?utm_source=website&utm_medium=landingpage&utm_campaign=offerte-software"
                onClick={() => trackEvent('CTA Gratis Klik', { module: 'offerte-software' })}
                className="bg-brand-primary hover:bg-[#008f5a] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center min-h-[48px]"
              >
                Maak gratis uw eerste calculatie
              </a>
              <a
                href="/#contact"
                onClick={() => trackEvent('CTA Demo Klik', { module: 'offerte-software' })}
                className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center min-h-[48px]"
              >
                Liever eerst een demo (15 min)
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-2xl border border-slate-200">
                <div className="mb-3">{feature.icon}</div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h2>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 mb-12">
            <p className="text-slate-700">
              <strong className="text-brand-primary-text">Pakket:</strong> onderdeel van Business
              en hoger, geen aparte kosten per offerte.{' '}
              <a href="/#prijzen" className="text-brand-primary-text font-semibold hover:underline">
                Bekijk alle pakketten
              </a>
              .
            </p>
          </div>

          <a
            href="/rekentool-zonnepanelen"
            className="flex items-center justify-between bg-slate-900 text-white p-6 sm:p-8 rounded-2xl group hover:bg-slate-800 transition-colors mb-12"
          >
            <div>
              <p className="text-sm text-slate-400 mb-1">Vóór de offerte</p>
              <p className="font-semibold">Zo berekent u het onderliggende advies</p>
            </div>
            <ArrowRight className="text-brand-primary shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
          </a>

          <div className="mt-12 mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">Veelgestelde vragen</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.question} className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <LeadMagnet />
        </div>
      </div>
    </>
  );
}
