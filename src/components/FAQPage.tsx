import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SEO } from './SEO';
import { faqs } from './FAQ';

// Volledige vragenlijst (bron: FAQ.tsx `faqs`) — de homepage toont er slechts 5,
// deze pagina toont alle vragen zodat er geen content verloren gaat.
export function FAQPage() {
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
    <>
      <SEO
        title="Veelgestelde vragen | EnerCalculatie"
        description="Alle veelgestelde vragen over EnerCalculatie: offerte- en calculatiesoftware voor verduurzamingsinstallateurs, beveiliging, prijzen en regelgeving."
        canonical="https://enercalculatie.nl/faq"
      />
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-2xl md:text-4xl font-black text-slate-900 mb-4">
              Veelgestelde vragen
            </h1>
            <p className="text-lg text-slate-600">
              Alles over de overstap, NL-regelgeving en hoe EnerCalculatie werkt.
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
                      className={`font-semibold text-lg ${isOpen ? 'text-brand-primary-text' : 'text-slate-800'}`}
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
      </div>
    </>
  );
}
