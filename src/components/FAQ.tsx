import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Doet de AI het financiële rekenwerk?",
    answer: "Nee. De AI wordt uitsluitend gebruikt voor het extraheren van ongestructureerde data (zoals OCR via jaarnota's). De daadwerkelijke fysica, ROI berekeningen en financiële business rules zijn 100% deterministisch gecodeerd. Dit voorkomt 'hallucinaties' en garandeert wiskundig perfecte offertes."
  },
  {
    question: "Is het platform AVG (GDPR) proof?",
    answer: "Absoluut. Alle project- en persoonsgegevens rusten binnen beveiligde Europese (EU) datacenters. We hanteren stricte Row Level Security (RLS) voor data-isolatie per installateur (tenant) en logs worden geautomatiseerd geschoond van Personally Identifiable Information (PII)."
  },
  {
    question: "Kan ik mijn eigen hardware inkoopprijzen en marges invoeren?",
    answer: "Ja, in het 'Tarievenbeheer' paneel kunt u zelf uw merken, inkoopprijzen, opslagen, en installatietarieven beheren. De engine gebruikt altijd uw up-to-date catalogus voor de berekeningen."
  },
  {
    question: "Hoe accuraat is de hybride warmtepomp vs panelen verdeling?",
    answer: "Het model is specifiek gebouwd om dubbeltellingen te voorkomen. Eerst berekent de engine het gasverbruik weg (b.v. GAS_KWH_PER_M3 = 8.79) maal het tapwater/verwarmingsefficiëntie. Pas daarna berekent het hoeveel extra zonnepanelen nodig zijn, rekening houdend met actuele salderingsregels en variabele tarieven."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
            Technische & Compliance FAQ
          </h2>
          <p className="text-lg text-slate-600">
            Transparantie is cruciaal. Lees hier hoe onze techniek achter de schermen werkt.
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
