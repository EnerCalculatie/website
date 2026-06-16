import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is mijn klantdata veilig?',
    answer:
      'Alle dossiers worden opgeslagen op servers in Nederland, zijn volledig AVG-compliant en end-to-end versleuteld. U bent eigenaar van uw data — altijd exporteerbaar, nooit gedeeld met derden.',
  },
  {
    question: 'Werkt het met mijn huidige software?',
    answer:
      'PDOK Kadaster is nu al ingebouwd en live beschikbaar. Let op: Integraties met andere externe systemen (zoals Exact Online, Teamleader en AFAS) zijn momenteel nog volop in ontwikkeling en komen later dit jaar beschikbaar. Gebruikt u andere software? Neem contact op — wij kijken graag samen naar de mogelijkheden.',
  },
  {
    question: 'Wat als ik vastloop?',
    answer:
      'Elke klant krijgt een persoonlijke onboarding. Daarna kunt u ons altijd bereiken via e-mail (reactie binnen 24 uur) of telefonisch (vanaf het Pro-pakket: binnen 4 uur).',
  },
  {
    question: 'Kost de overstap mij meer tijd dan het oplevert?',
    answer:
      'Gebruik de ROI-calculator op deze pagina. Bij 10 dossiers per maand verdient u de abonnementskosten vaak al in de eerste week terug.',
  },
  {
    question: 'Hoe werkt de salderingsregeling in 2025 en 2026?',
    answer:
      'De salderingsregeling wordt stapsgewijs afgebouwd. In 2025 mag u nog 64% van uw teruggeleverde stroom salderen; in 2026 daalt dit naar 46%. EnerCalculatie verwerkt deze percentages automatisch in elke berekening, zodat u uw klant altijd een eerlijk en actueel rendement toont — zonder zelf de wetgeving bij te hoeven houden.',
  },
  {
    question: 'Wat is de BTW-regeling voor zonnepanelen op woningen?',
    answer:
      'Sinds 1 januari 2023 geldt een 0% BTW-tarief voor de levering en installatie van zonnepanelen op woningen. EnerCalculatie past dit tarief automatisch toe, inclusief de correcte berekening voor omvormers en montagesystemen. Zo voorkomt u fouten in uw offertes en adviesrapporten.',
  },
  {
    question: 'Hoe berekent EnerCalculatie het rendement van een warmtepomp?',
    answer:
      'De berekening is gebaseerd op Nederlandse standaardaannames: 8,79 kWh per m³ gas, 90% ketelrendement en een warmwateraandeel van 20%. Voor hybride systemen blijft het warmwaterdeel en de bijstook op de bestaande gasketel staan. Alle aannames zijn transparant inzichtelijk in het gegenereerde rapport.',
  },
  {
    question: 'Voldoet een EnerCalculatie-rapport aan de eisen van subsidie-aanvragen (ISDE, Saldering)?',
    answer:
      'De rapporten bevatten alle benodigde technische specificaties en rendementsberekeningen die subsidieverstrekkers zoals RVO vragen bij ISDE-aanvragen voor warmtepompen. Voor de officiële aanvraag heeft u daarnaast altijd een erkend installatiebedrijf nodig — EnerCalculatie ondersteunt het adviestraject daarvóór.',
  },
  {
    question: 'Hoe actueel zijn de energieprijzen in de berekeningen?',
    answer:
      'U voert de actuele energieprijzen uit de energierekening van de klant in — EnerCalculatie leest deze automatisch uit via slimme documentherkenning. Zo werkt u altijd met de werkelijke situatie van uw klant, niet met een gemiddelde schatting.',
  },
  {
    question: 'Hoe werkt het opzeggen van een abonnement?',
    answer:
      'EnerCalculatie is flexibel en maandelijks opzegbaar. U zit niet vast aan langlopende contracten. Zodra u opzegt, stopt de facturering automatisch aan het einde van uw huidige betaalperiode. U kunt uw abonnement eenvoudig zelf stopzetten of wijzigen via uw accountinstellingen, of door ons een e-mail te sturen naar info@enercalculatie.nl.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
            Veelgestelde vragen
          </h2>
          <p className="text-lg text-slate-600">
            Over de overstap, NL-regelgeving en hoe EnerCalculatie werkt.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-colors ${
                  isOpen ? 'border-brand-secondary bg-slate-50/50' : 'border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span
                    className={`font-semibold text-lg ${isOpen ? 'text-brand-primary' : 'text-slate-800'}`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-secondary' : ''}`}
                    size={20}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
