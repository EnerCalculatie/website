import { motion } from 'motion/react';
import { TrendingUp, Zap, FileSpreadsheet, Shield } from 'lucide-react';
import imgZonnepanelen from '../assets/screenshots/zonnepanelen.webp';
import imgRoi from '../assets/screenshots/rendement-roi.webp';
import imgOfferte from '../assets/screenshots/offerte.webp';

const PROOF_METRICS = [
  { label: 'Energieverbruik', value: '4.820 kWh', sub: 'Automatisch uitgelezen' },
  { label: 'Zonnepanelen', value: '5,28 kWp', sub: '12 panelen Z-ZW' },
  { label: 'Thuisbatterij', value: '10 kWh', sub: '78% zelfconsumptie' },
  { label: 'Investering & Offerte', value: '€ 14.850', sub: 'Transparante prijsopbouw' },
];

export function ProductProof() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-slate-500 font-bold tracking-wider uppercase text-xs mb-3 block">
            Aan de keukentafel
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-black text-slate-900 mb-4">
            Cijfers die uw klant overtuigen.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Geen vage schattingen, maar een transparante doorrekening op basis van het werkelijke verbruik van de klant.
          </p>
        </div>

        {/* Concrete data preview bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {PROOF_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center"
            >
              <span className="text-xs font-semibold text-slate-500 block mb-1">{metric.label}</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-slate-900 block mb-1">
                {metric.value}
              </span>
              <span className="text-[11px] text-brand-primary-text font-medium">{metric.sub}</span>
            </div>
          ))}
        </div>

        {/* 3 UI Schermen in een overzichtelijke grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm"
          >
            <div className="p-5 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} className="text-brand-primary" />
                <h3 className="font-bold text-slate-900 text-sm">1. Installatiecalculatie</h3>
              </div>
              <p className="text-xs text-slate-500">
                Dimensionering van zonnepanelen, batterij en omvormer.
              </p>
            </div>
            <div className="p-3 bg-slate-100 flex-1 flex items-center">
              <img
                src={imgZonnepanelen}
                alt="Zonnepanelen calculatiescherm in EnerCalculatie"
                className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm"
          >
            <div className="p-5 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-brand-primary" />
                <h3 className="font-bold text-slate-900 text-sm">2. Rendement & Terugverdientijd</h3>
              </div>
              <p className="text-xs text-slate-500">
                Gevalideerde 25-jaars doorrekening met saldering 2027.
              </p>
            </div>
            <div className="p-3 bg-slate-100 flex-1 flex items-center">
              <img
                src={imgRoi}
                alt="Rendement en terugverdientijd analyse in EnerCalculatie"
                className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm"
          >
            <div className="p-5 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2 mb-1">
                <FileSpreadsheet size={16} className="text-brand-primary" />
                <h3 className="font-bold text-slate-900 text-sm">3. Klantofferte</h3>
              </div>
              <p className="text-xs text-slate-500">
                Itemized offerteoverzicht, gereed voor digitale acceptatie.
              </p>
            </div>
            <div className="p-3 bg-slate-100 flex-1 flex items-center">
              <img
                src={imgOfferte}
                alt="Offerte overzicht in EnerCalculatie"
                className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 inline-flex items-center gap-1.5">
            <Shield size={14} className="text-slate-400" />
            Bovenstaande schermen tonen actuele software-functionaliteit (voorbeeldcase — fictieve gegevens).
          </p>
        </div>
      </div>
    </section>
  );
}
