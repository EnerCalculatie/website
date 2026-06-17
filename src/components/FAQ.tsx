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
    question: 'Hoe gaat de software om met de aankomende afschaffing van de salderingsregeling?',
    answer:
      'De politieke plannen zijn recent gewijzigd: de afbouw is van de baan, het huidige plan is om de regeling per 1 januari 2027 in één keer volledig af te schaffen. EnerCalculatie volgt de actuele wetgeving op de voet. Onze rendementsberekeningen (over 10 of 25 jaar) houden deterministisch rekening met dit 2027-scenario, zodat u uw klant een eerlijk en realistisch beeld geeft.',
  },
  {
    question: 'Kan de software rekenen met de terugleverkosten (heffingen) van energieleveranciers?',
    answer:
      'Ja, absoluut. Vrijwel alle energieleveranciers brengen tegenwoordig kosten in rekening voor het terugleveren van zonnestroom. Binnen EnerCalculatie kunt u deze specifieke (schaal)heffingen van de klant invoeren. Het rekenmodel toont exact de financiële impact, en laat direct zien hoe rendabel een thuisbatterij is om deze kosten te omzeilen.',
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
    question: 'Voldoet een EnerCalculatie-rapport aan de eisen voor de ISDE-subsidie?',
    answer:
      'De rapporten bevatten alle benodigde technische specificaties, vermogens en berekeningen die de RVO vraagt bij ISDE-aanvragen voor warmtepompen (waaronder ondersteuning voor meldcodes). Voor de daadwerkelijke aanvraag heeft de eindklant altijd een installatie- en betaalbewijs van uw erkende installatiebedrijf nodig — EnerCalculatie levert de perfecte projectonderbouwing in het traject daarvóór.',
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
    <section id="faq" className="py-16 md:py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">
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
