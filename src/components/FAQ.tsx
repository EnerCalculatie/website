import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Is mijn klantdata veilig?",
    answer: "Alle dossiers staan op Nederlandse servers, zijn volledig AVG-compliant en end-to-end versleuteld. U bent eigenaar van uw data — altijd exporteerbaar, nooit gedeeld."
  },
  {
    question: "Werkt het met mijn huidige software?",
    answer: "EnerCalculatie integreert veilig met Exact Online, Teamleader en Afas. Gebruikt u andere software? Wij kijken graag samen naar de mogelijkheden."
  },
  {
    question: "Wat als ik vastloop?",
    answer: "Elke klant krijgt een persoonlijke onboarding. Daarna kunt u ons altijd bereiken via e-mail (reactie binnen 24 uur) of telefonisch (vanaf het Pro-pakket: binnen 4 uur)."
  },
  {
    question: "Kost de overstap mij meer tijd dan het oplevert?",
    answer: "Gebruik de ROI-calculator op deze pagina. Bij 10 dossiers per maand verdient u de abonnementskosten vaak al in de eerste week terug."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
            Heeft u nog vragen over de overstap?
          </h2>
          <p className="text-lg text-slate-600">
            Wij begrijpen dat de overstap naar nieuwe software een belangrijke beslissing is. We nemen eventuele twijfels graag voor u weg.
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
                  <span className={`font-semibold text-lg ${isOpen ? 'text-brand-primary' : 'text-slate-800'}`}>
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
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
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
