import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  FileSearch,
  Calculator,
  Send,
  Sun,
  Battery,
  Flame,
  Wind,
  Car,
  TrendingUp,
  MapPin,
  FileCheck,
} from 'lucide-react';

interface Pillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: { icon: React.ReactNode; label: string; detail: string; href?: string }[];
}

const PILLARS: Pillar[] = [
  {
    id: 'analyse',
    number: '01',
    title: 'Analyse',
    subtitle: 'Van energierekening naar energieprofiel.',
    description:
      'Upload een PDF van de energierekening of voer het adres in. Verbruiksdata, pieken/dalen en Kadaster-panddata worden direct samengevoegd tot een compleet profiel.',
    features: [
      {
        icon: <FileSearch size={18} />,
        label: 'Energienota uitlezen',
        detail: 'Gas- en stroomverbruik (normaal- en daltarief) direct gedetecteerd zonder handmatig overtypen.',
      },
      {
        icon: <MapPin size={18} />,
        label: 'Kadaster & panddata',
        detail: 'PDOK-luchtfoto, dakoppervlakte en basiskenmerken automatisch klaargezet.',
      },
    ],
  },
  {
    id: 'advies',
    number: '02',
    title: 'Advies',
    subtitle: 'Van energieprofiel naar installatieadvies.',
    description:
      'Zonnepanelen, thuisbatterijen, warmtepompen, airco en laadpalen worden berekend als samenhangende onderdelen van één integraal energieadvies.',
    features: [
      {
        icon: <Sun size={18} />,
        label: 'Zonnepanelen',
        detail: 'Legplan, dakoriëntatie en berekende jaaropbrengst.',
        href: '/rekentool-zonnepanelen',
      },
      {
        icon: <Battery size={18} />,
        label: 'Thuisbatterij',
        detail: 'Capaciteit afgestemd op overschot en zelfconsumptie.',
        href: '/rekentool-thuisbatterij',
      },
      {
        icon: <Flame size={18} />,
        label: 'Warmtepomp',
        detail: 'Hybride of all-electric vermogen en ISDE-subsidie.',
        href: '/rekentool-warmtepomp',
      },
      {
        icon: <Wind size={18} />,
        label: 'Airco & koeling',
        detail: 'Koelvermogen en jaarrond stroomprofiel.',
        href: '/rekentool-airco',
      },
      {
        icon: <Car size={18} />,
        label: 'Laadpaal',
        detail: 'Impact op piekbelasting en netaansluiting.',
        href: '/rekentool-laadpaal',
      },
    ],
  },
  {
    id: 'calculatie',
    number: '03',
    title: 'Calculatie',
    subtitle: 'Van installatie naar onderbouwd scenario.',
    description:
      'Vergelijk verschillende installatiescenario’s direct naast elkaar met actuele salderingsregels (2027), terugleverkosten en subsidies.',
    features: [
      {
        icon: <Calculator size={18} />,
        label: 'Scenario-vergelijking',
        detail: 'Zet bijv. alleen solar af tegen solar + thuisbatterij in één overzicht.',
      },
      {
        icon: <TrendingUp size={18} />,
        label: 'Rendement & terugverdientijd',
        detail: 'Transparante doorrekening over 10 en 25 jaar met duidelijke aannames.',
      },
    ],
  },
  {
    id: 'offerte',
    number: '04',
    title: 'Offerte',
    subtitle: 'Van calculatie naar klantofferte.',
    description:
      'De calculatie vormt direct de financiële basis van de offerte. Verstuur als beveiligde klantlink; de klant bekijkt en accordeert digitaal.',
    features: [
      {
        icon: <FileCheck size={18} />,
        label: 'Duidelijke prijsopbouw, regel voor regel',
        detail: 'Producten, arbeid en meerwerk vanuit dezelfde dossiergegevens.',
        href: '/offerte-software',
      },
      {
        icon: <Send size={18} />,
        label: 'Digitaal klantakkoord',
        detail: 'Beveiligde link zonder verplicht account voor de klant.',
      },
    ],
  },
];

export function Features() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <section id="functies" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-slate-500 font-bold tracking-wider uppercase text-xs mb-3 block">
            Wat EnerCalculatie berekent
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-black text-slate-900 mb-4">
            Eén samenhangend advies, geen losse rekentools.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Klanten vragen geen losse apparaten, maar een kloppend totaalplaatje voor hun woning. EnerCalculatie rekent zonnepanelen, thuisbatterij, warmtepomp, airco en laadpaal door als onderdelen van hetzelfde advies.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                    Onderdeel {pillar.number}
                  </span>
                  <span className="text-sm font-bold text-brand-primary-text">{pillar.title}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{pillar.subtitle}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{pillar.description}</p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  {pillar.features.map((feat) => (
                    <div key={feat.label} className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-brand-primary shrink-0">{feat.icon}</span>
                        <span className="text-sm font-bold text-slate-900">{feat.label}</span>
                        {feat.href && (
                          <a
                            href={feat.href}
                            className="ml-auto text-xs text-brand-primary-text font-semibold hover:underline"
                          >
                            Bekijk tool →
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 pl-6 leading-relaxed">{feat.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
