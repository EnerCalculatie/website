import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  FileSearch, Map, FileText, Sun, Battery, ThermometerSun, Wind, Car, TrendingUp,
  Calculator, ListChecks, Send, ArrowRight,
} from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

interface FeatureGroup {
  id: string;
  label: string;
  description: string;
  items: FeatureItem[];
}

const GROUPS: FeatureGroup[] = [
  {
    id: 'advies',
    label: 'Advies',
    description: 'Van energienota tot onderbouwd advies.',
    items: [
      {
        icon: <FileSearch size={22} />,
        title: 'Energienota uitlezen',
        description: 'Upload een pdf van de energierekening. Gasverbruik en de stroomvraag in piek/daltarief worden direct uitgelezen — geen handmatig overtypen.',
      },
      {
        icon: <Map size={22} />,
        title: 'Woninggegevens & energieprofiel',
        description: 'Voer het adres in en Kadaster-luchtfoto\'s, energieprofiel en woningkenmerken staan direct klaar als basis voor het advies.',
      },
      {
        icon: <FileText size={22} />,
        title: 'Adviesrapport',
        description: 'Genereer een professioneel, Nederlandstalig adviesrapport met AI-samenvatting — klaar voor het klantgesprek.',
      },
    ],
  },
  {
    id: 'berekening',
    label: 'Berekening',
    description: 'Elke module rekent door in hetzelfde dossier.',
    items: [
      {
        icon: <Sun size={22} />,
        title: 'Zonnepanelen',
        description: 'Optimaal aantal panelen, piekvermogen en jaaropbrengst op basis van dakoriëntatie en beschikbare ruimte.',
        href: '/rekentool-zonnepanelen',
        linkLabel: 'Meer over deze rekentool',
      },
      {
        icon: <Battery size={22} />,
        title: 'Thuisbatterij',
        description: 'Dimensionering op basis van het opwekoverschot, met directe impact op zelfconsumptie.',
        href: '/rekentool-thuisbatterij',
        linkLabel: 'Meer over deze rekentool',
      },
      {
        icon: <ThermometerSun size={22} />,
        title: 'Warmtepomp',
        description: 'Hybride of all-electric berekening, inclusief ISDE-subsidie automatisch meegerekend.',
        href: '/rekentool-warmtepomp',
        linkLabel: 'Meer over deze rekentool',
      },
      {
        icon: <Wind size={22} />,
        title: 'Airco',
        description: 'Koelvermogen per ruimte en het extra stroomverbruik, toegevoegd aan het totale energieprofiel.',
        href: '/rekentool-airco',
        linkLabel: 'Meer over deze rekentool',
      },
      {
        icon: <Car size={22} />,
        title: 'Laadpaal',
        description: 'Laadprofiel en de impact op de maximale capaciteit van de netaansluiting.',
        href: '/rekentool-laadpaal',
        linkLabel: 'Meer over deze rekentool',
      },
      {
        icon: <TrendingUp size={22} />,
        title: 'Rendement & ROI',
        description: 'Rendementsberekening over 10 en 25 jaar, met de actuele salderingsregels correct verwerkt.',
      },
    ],
  },
  {
    id: 'offerte',
    label: 'Offerte',
    description: 'Vanuit dezelfde calculatie, zonder opnieuw invoeren.',
    items: [
      {
        icon: <Calculator size={22} />,
        title: 'Calculatie & prijsopbouw',
        description: 'De doorgerekende scenario\'s vormen direct de financiële basis van de offerte.',
      },
      {
        icon: <ListChecks size={22} />,
        title: 'Producten & prijzen',
        description: 'Losse producten en werkzaamheden uit uw eigen catalogus toevoegen, met automatische stapelkorting.',
      },
      {
        icon: <Send size={22} />,
        title: 'Versturen & klantakkoord',
        description: 'Verstuur als beveiligde klantlink; uw klant beslist online, digitaal vastgelegd.',
        href: '/offerte-software',
        linkLabel: 'Meer over de offertemodule',
      },
    ],
  },
];

export function Features() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="functies" className="py-16 md:py-24 bg-brand-bg border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Belangrijkste functionaliteiten
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Advies, berekening en offerte — uit hetzelfde dossier
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Geen drie losse producten, maar één workflow. Gebouwd op praktijkervaring in de
            installatietechniek — niet door marketeers, maar door iemand die weet hoe een schouw eruitziet.
          </p>
        </div>

        {/* Flow-indicator tussen de drie groepen */}
        <div className="hidden md:flex items-center justify-center gap-3 mb-10 text-sm font-semibold text-slate-500">
          {GROUPS.map((group, idx) => (
            <span key={group.id} className="flex items-center gap-3">
              <span className="uppercase tracking-wider">{group.label}</span>
              {idx < GROUPS.length - 1 && <ArrowRight size={16} className="text-slate-300" />}
            </span>
          ))}
        </div>

        <div className="space-y-14">
          {GROUPS.map((group) => (
            <div key={group.id}>
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">{group.label}</h3>
                <p className="text-sm text-slate-500">{group.description}</p>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {group.items.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary-text rounded-xl flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    {item.href && (
                      <a href={item.href} className="mt-3 inline-block text-sm text-brand-primary-text font-semibold hover:underline">
                        {item.linkLabel} →
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
