import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home, Cpu, Zap, Sun, Battery, Flame, Wind, Car,
  TrendingUp, ClipboardList, FileText, HardHat, Play, Pause, ChevronRight
} from 'lucide-react';

interface DemoStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  screenshot: string;
  description: string;
}

const steps: DemoStep[] = [
  {
    id: 'dossier',
    label: 'Dossier Overzicht',
    icon: <Home size={16} />,
    screenshot: '/screenshots/dossier-overzicht.png',
    description: 'Al uw klantdossiers in één overzicht. Zoek, filter en beheer actieve en gearchiveerde dossiers.'
  },
  {
    id: 'pandgegevens',
    label: 'Pandgegevens',
    icon: <Home size={16} />,
    screenshot: '/screenshots/pandgegevens.png',
    description: 'Registreer klant- en pandgegevens als vertrekpunt voor alle dimensionerings- en opbrengstmodellen.'
  },
  {
    id: 'ai-scan',
    label: 'AI Scan & OCR',
    icon: <Cpu size={16} />,
    screenshot: '/screenshots/ai-scan-ocr.png',
    description: 'Upload energienota\'s of foto\'s. Het AI-model leest ze direct uit naar gestructureerde verbruiksdata.'
  },
  {
    id: 'energieprofiel',
    label: 'Energieprofiel',
    icon: <Zap size={16} />,
    screenshot: '/screenshots/energieprofiel.png',
    description: 'Stel historisch verbruik en energiekosten in als referentie voor alle besparing- en ROI-berekeningen.'
  },
  {
    id: 'zonnepanelen',
    label: 'Zonnepanelen',
    icon: <Sun size={16} />,
    screenshot: '/screenshots/zonnepanelen.png',
    description: 'Ontwerp het legplan en bereken deterministisch de verwachte jaaropbrengst op basis van oriëntatie en vermogen.'
  },
  {
    id: 'thuisbatterij',
    label: 'Thuisbatterij',
    icon: <Battery size={16} />,
    screenshot: '/screenshots/thuisbatterij.png',
    description: 'Configureer energieopslag en zie direct de impact op zelfconsumptie en terugverdientijd.'
  },
  {
    id: 'warmtepomp',
    label: 'Warmtepomp',
    icon: <Flame size={16} />,
    screenshot: '/screenshots/warmtepomp.png',
    description: 'Bereken de impact van een warmtepomp op gasverbruik, stroomverbruik en financieel rendement.'
  },
  {
    id: 'airco',
    label: 'Airco',
    icon: <Wind size={16} />,
    screenshot: '/screenshots/airco.png',
    description: 'Configureer actieve koeling en efficiënte bijverwarming per ruimte met SCOP-berekeningen.'
  },
  {
    id: 'laadpalen',
    label: 'Laadpalen',
    icon: <Car size={16} />,
    screenshot: '/screenshots/laadpalen.png',
    description: 'Configureer een EV-laadstation inclusief load balancing, laadvermogen en installatie-eisen.'
  },
  {
    id: 'roi',
    label: 'Rendement & ROI',
    icon: <TrendingUp size={16} />,
    screenshot: '/screenshots/rendement-roi.png',
    description: 'Volledig deterministische doorrekening van terugverdientijd, BTW-voordelen en subsidies over 25 jaar.'
  },
  {
    id: 'schouw',
    label: 'Schouw Overzicht',
    icon: <ClipboardList size={16} />,
    screenshot: '/screenshots/schouw-overzicht.png',
    description: 'Samenvatting van alle opnamevelden — pand, logistiek en groepenkast in één oogopslag.'
  },
  {
    id: 'rapport',
    label: 'Adviesrapport',
    icon: <FileText size={16} />,
    screenshot: '/screenshots/adviesrapport.png',
    description: 'Genereer een professioneel adviesrapport met AI-samenvatting, klaar voor het keukentafelgesprek.'
  },
  {
    id: 'werkvoorbereiding',
    label: 'Werkvoorbereiding',
    icon: <HardHat size={16} />,
    screenshot: '/screenshots/werkvoorbereiding.png',
    description: 'Bill of Materials en logistieke instructies voor de monteur — direct vanuit het adviestraject.'
  },
];

const AUTO_ADVANCE_INTERVAL = 4000;

export function AppDemoVideo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % steps.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          advance();
          return 0;
        }
        return prev + (100 / (AUTO_ADVANCE_INTERVAL / 100));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex, advance]);

  const handleStepClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setIsPlaying(false);
  };

  const activeStep = steps[activeIndex];

  return (
    <section id="demo-video" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Achtergrond glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium text-sm mb-6"
          >
            <Zap size={16} className="text-brand-primary" />
            Interactieve app-demo
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Kijk binnen in de app
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Van dossier aanmaken tot adviesrapport — ontdek de complete DDD-workflow in één doorklik.
          </motion.p>
        </div>

        {/* Demo container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start"
        >
          {/* Stappen zijbalk */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest px-2 pt-1 pb-3">
              Advies Stappen
            </p>
            <div className="space-y-0.5">
              {steps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                    i === activeIndex
                      ? 'bg-brand-primary text-white font-semibold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span className={`shrink-0 ${i === activeIndex ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {step.icon}
                  </span>
                  <span className="text-sm truncate">{step.label}</span>
                  {i === activeIndex && (
                    <ChevronRight size={14} className="ml-auto shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Scherm met browser chrome */}
          <div className="flex flex-col gap-4">
            {/* Browser chrome */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              {/* Titelbalk */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-xs text-slate-400 font-mono max-w-sm w-full">
                    <div className="w-2 h-2 rounded-full bg-brand-primary/60 shrink-0" />
                    app.enercalculatie.nl / dossier / DOS-2026-0018
                  </div>
                </div>
                <div className="w-16" />
              </div>

              {/* Screenshot area */}
              <div className="relative bg-slate-800 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep.screenshot}
                    src={activeStep.screenshot}
                    alt={activeStep.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-full h-auto block"
                  />
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
              </div>

              {/* Progress bar */}
              <div className="h-0.5 bg-white/5">
                <motion.div
                  className="h-full bg-brand-primary"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
            </div>

            {/* Beschrijving + bediening */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                  {activeStep.icon}
                </div>
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="font-semibold text-white text-sm">{activeStep.label}</p>
                      <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">{activeStep.description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Play / pause + stap teller */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-500">
                  {activeIndex + 1} / {steps.length}
                </span>
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  aria-label={isPlaying ? 'Pauzeren' : 'Afspelen'}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                </button>
              </div>
            </div>

            {/* Stap-dots */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleStepClick(i)}
                  aria-label={`Stap ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6 bg-brand-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
