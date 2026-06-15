import { motion } from 'motion/react';
import { Star } from 'lucide-react';

// BELANGRIJK: Vervang deze placeholder data door echte klanttestimonials
const testimonials = [
  {
    quote: "Ongelofelijk hoeveel tijd dit scheelt. Waar ik voorheen een hele avond zat te rekenen, heb ik nu in 10 minuten een foutloos rapport. Een absolute aanrader.",
    name: "Jan de Vries",
    company: "Zonneklaar Installaties",
  },
  {
    quote: "Onze klanten zijn kritischer dan ooit. Met de rapporten van EnerCalculatie kunnen we elke vraag over rendement en terugverdientijd direct onderbouwen. Dat geeft vertrouwen en sluit de deal.",
    name: "Fatima El Amrani",
    company: "Duurzaam Wonen Techniek",
  },
  {
    quote: "De overstap was zo geregeld. Het systeem is zo logisch opgezet dat zelfs onze minst technische collega's er direct mee konden werken. Geen ingewikkelde training nodig.",
    name: "Klaas-Jan Bakker",
    company: "Bakker & Zoon Energie",
  }
];

export function Testimonials() {
  return (
    <section id="klantcases" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Wat onze klanten zeggen
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Installateurs die u voorgingen
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Echte ervaringen van installatiebedrijven die dagelijks met EnerCalculatie werken.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-slate-700 leading-relaxed mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-lg">
                  {testimonial.name.substring(0, 1)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}