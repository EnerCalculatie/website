import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Home, Cpu, Zap, Sun, Battery, Flame, Wind, Car,
  TrendingUp, FileText, Play, Pause, ChevronRight, ChevronLeft,
  FileSpreadsheet, Layers, Calculator, Check, Sparkles
} from 'lucide-react';

import imgDossier from '../assets/screenshots/dossier-overzicht.webp';
import imgPandgegevens from '../assets/screenshots/pandgegevens.webp';
import imgAiScan from '../assets/screenshots/ai-scan-ocr.webp';
import imgEnergieprofiel from '../assets/screenshots/energieprofiel.webp';
import imgZonnepanelen from '../assets/screenshots/zonnepanelen.webp';
import imgThuisbatterij from '../assets/screenshots/thuisbatterij.webp';
import imgWarmtepomp from '../assets/screenshots/warmtepomp.webp';
import imgAirco from '../assets/screenshots/airco.webp';
import imgLaadpalen from '../assets/screenshots/laadpalen.webp';
import imgRoi from '../assets/screenshots/rendement-roi.webp';
import imgOfferte from '../assets/screenshots/offerte.webp';
import imgRapport from '../assets/screenshots/adviesrapport.webp';
import imgScenario from '../assets/screenshots/scenario.webp';

interface DemoStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  screenshot: string;
  description: string;
  callout?: string;
}

interface DemoPhase {
  id: string;
  number: string;
  label: string;
  icon: React.ReactNode;
  steps: DemoStep[];
}

// Bewust géén "Schouw Overzicht" en "Werkvoorbereiding": beide zijn interne
// planningsschermen voor de monteur, geen onderdeel van de klant-gerichte
// belofte "van energienota naar onderbouwd advies". Screenshots blijven
// bestaan in assets/, alleen niet gebruikt in deze demo.
const phases: DemoPhase[] = [
  {
    id: 'intake',
    number: '01',
    label: 'Intake',
    icon: <Home size={16} />,
    steps: [
      {
        id: 'dossier',
        label: 'Dossier aanmaken',
        icon: <Home size={16} />,
        screenshot: imgDossier,
        description: 'Elk adviestraject start met één dossier — al uw klantdossiers overzichtelijk bij elkaar.'
      },
      {
        id: 'pandgegevens',
        label: 'Pand- en klantgegevens',
        icon: <Home size={16} />,
        screenshot: imgPandgegevens,
        description: 'Vastleggen van pand en klant als vertrekpunt voor alle berekeningen die volgen.'
      },
      {
        id: 'ai-scan',
        label: 'Energierekening uitlezen',
        icon: <Cpu size={16} />,
        screenshot: imgAiScan,
        description: 'Upload de energienota of maak een foto. EnerCalculatie leest verbruik en tarieven automatisch uit.',
        callout: 'Automatisch uitgelezen — geen typewerk'
      },
    ],
  },
  {
    id: 'energie',
    number: '02',
    label: 'Energieprofiel',
    icon: <Zap size={16} />,
    steps: [
      {
        id: 'energieprofiel',
        label: 'Energieprofiel',
        icon: <Zap size={16} />,
        screenshot: imgEnergieprofiel,
        description: 'Uit de uitgelezen gegevens bouwt EnerCalculatie automatisch het volledige verbruiksprofiel op.'
      },
    ],
  },
  {
    id: 'berekening',
    number: '03',
    label: 'Berekening',
    icon: <Calculator size={16} />,
    steps: [
      {
        id: 'zonnepanelen',
        label: 'Zonnepanelen',
        icon: <Sun size={16} />,
        screenshot: imgZonnepanelen,
        description: 'Ontwerp het legplan en bereken de verwachte jaaropbrengst op basis van oriëntatie en vermogen.'
      },
      {
        id: 'thuisbatterij',
        label: 'Thuisbatterij',
        icon: <Battery size={16} />,
        screenshot: imgThuisbatterij,
        description: 'Configureer energieopslag en zie direct de impact op zelfconsumptie en terugverdientijd.'
      },
      {
        id: 'warmtepomp',
        label: 'Warmtepomp',
        icon: <Flame size={16} />,
        screenshot: imgWarmtepomp,
        description: 'Bereken de impact van een warmtepomp op gas- en stroomverbruik en het financiële rendement.'
      },
      {
        id: 'airco',
        label: 'Airco',
        icon: <Wind size={16} />,
        screenshot: imgAirco,
        description: 'Configureer koeling en bijverwarming per ruimte, inclusief het jaarrond energieverbruik (SCOP).'
      },
      {
        id: 'laadpalen',
        label: 'Laadpaal',
        icon: <Car size={16} />,
        screenshot: imgLaadpalen,
        description: "Configureer een laadstation, inclusief slimme sturing bij meerdere laadpunten en installatie-eisen."
      },
    ],
  },
  {
    id: 'scenarios',
    number: '04',
    label: "Scenario's",
    icon: <Layers size={16} />,
    steps: [
      {
        id: 'scenario',
        label: "Scenario's vergelijken",
        icon: <Layers size={16} />,
        screenshot: imgScenario,
        description: "Zet oplossingen naast elkaar — bijvoorbeeld alleen zonnepanelen versus zonnepanelen met batterij — en onderbouw het gesprek met de klant.",
        callout: "Vergelijk investering & terugverdientijd naast elkaar"
      },
      {
        id: 'roi',
        label: 'Rendement & terugverdientijd',
        icon: <TrendingUp size={16} />,
        screenshot: imgRoi,
        description: 'Volledig gevalideerde doorrekening van terugverdientijd, BTW-voordelen en subsidies over 25 jaar.'
      },
    ],
  },
  {
    id: 'advies',
    number: '05',
    label: 'Advies',
    icon: <FileText size={16} />,
    steps: [
      {
        id: 'offerte',
        label: 'Offerte samenstellen',
        icon: <FileSpreadsheet size={16} />,
        screenshot: imgOfferte,
        description: 'Stel een itemized offerte samen en zie live het totaal — inclusief automatische stapelkorting.'
      },
      {
        id: 'rapport',
        label: 'Adviesrapport',
        icon: <FileText size={16} />,
        screenshot: imgRapport,
        description: 'Genereer een professioneel adviesrapport met AI-samenvatting, klaar voor het keukentafelgesprek.'
      },
    ],
  },
];

interface FlatStep extends DemoStep {
  phaseIndex: number;
}

const flatSteps: FlatStep[] = phases.flatMap((phase, phaseIndex) =>
  phase.steps.map(step => ({ ...step, phaseIndex }))
);

// Eerste flat-index per fase, gebruikt om de sub-stap-dots en de progressbalk te synchroniseren.
const phaseStartIndex = phases.map((_, i) =>
  flatSteps.findIndex(s => s.phaseIndex === i)
);

const AUTO_ADVANCE_INTERVAL = 4500;

export function AppDemoVideo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  // Alleen auto-advancen als de sectie in beeld is: voorkomt dat de carousel
  // offscreen alle screenshots binnentrekt en CPU verstookt.
  const inView = useInView(sectionRef, { amount: 0.2 });
  const autoPlaying = isPlaying && inView;

  const advance = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % flatSteps.length);
  }, []);

  // Eén timeout per stap in plaats van een 100ms-interval met state-updates:
  // de voortgangsbalk loopt via een CSS-animatie mee, zonder re-renders.
  useEffect(() => {
    if (!autoPlaying) return;
    const timeout = setTimeout(advance, AUTO_ADVANCE_INTERVAL);
    return () => clearTimeout(timeout);
  }, [autoPlaying, activeIndex, advance]);

  const goTo = (index: number) => {
    setActiveIndex((index + flatSteps.length) % flatSteps.length);
    setIsPlaying(false);
  };

  const activeStep = flatSteps[activeIndex];
  const activePhaseIndex = activeStep.phaseIndex;
  const activePhase = phases[activePhaseIndex];
  const localSubIndex = activeIndex - phaseStartIndex[activePhaseIndex];

  return (
    <section ref={sectionRef} id="demo-video" className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
      {/* Achtergrond glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium text-sm mb-6"
          >
            <Zap size={16} className="text-brand-primary" />
            Interactieve productdemo
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Van energienota naar onderbouwd advies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-xl mx-auto"
          >
            Zo doorloopt u als installateur het complete adviestraject — in 5 minuten.
          </motion.p>
        </div>

        {/* Fase-progressbalk */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-center gap-1 sm:gap-2 mb-8 overflow-x-auto"
        >
          {phases.map((phase, i) => {
            const isDone = i < activePhaseIndex;
            const isActive = i === activePhaseIndex;
            return (
              <div key={phase.id} className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button
                  onClick={() => goTo(phaseStartIndex[i])}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all min-h-[40px] ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/30'
                      : isDone
                        ? 'bg-white/10 text-slate-300 hover:bg-white/15'
                        : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'
                  }`}
                >
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                    isActive ? 'bg-white/20' : isDone ? 'bg-emerald-400/20 text-emerald-400' : 'bg-white/10'
                  }`}>
                    {isDone ? <Check size={12} /> : phase.icon}
                  </span>
                  <span className="hidden sm:inline whitespace-nowrap">{phase.number} {phase.label}</span>
                  <span className="sm:hidden">{phase.number}</span>
                </button>
                {i < phases.length - 1 && (
                  <div className={`w-3 sm:w-8 h-px shrink-0 ${isDone ? 'bg-emerald-400/40' : 'bg-white/10'}`} />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Demo container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {/* Scherm met browser chrome */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
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

            {/* Screenshot area — aspect ratio matcht de gecropte content-panes (~10/9);
                object-contain vangt het ene brede scherm zonder sidebar (dossieroverzicht)
                netjes op met witte letterbox. */}
            <div className="relative bg-white overflow-hidden" style={{ aspectRatio: '10/9' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep.id}
                  src={activeStep.screenshot}
                  alt={`${activeStep.label} in EnerCalculatie – calculatiesoftware voor verduurzamingsinstallateurs`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </AnimatePresence>

              {/* Callout — max 1 per fase, alleen waar het de kernactie bewijst */}
              <AnimatePresence>
                {activeStep.callout && (
                  <motion.div
                    key={`callout-${activeStep.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="absolute bottom-3 left-3 right-3 sm:right-auto sm:bottom-5 sm:left-5 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-lg w-fit max-w-full"
                  >
                    <Sparkles size={14} className="text-brand-primary shrink-0" />
                    {activeStep.callout}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress bar — CSS-animatie, herstart per stap via de key */}
            <div className="h-0.5 bg-white/5">
              <div
                key={activeIndex}
                className="h-full bg-brand-primary animate-progress-grow"
                style={{
                  animationDuration: `${AUTO_ADVANCE_INTERVAL}ms`,
                  animationPlayState: autoPlaying ? 'running' : 'paused',
                }}
              />
            </div>
          </div>

          {/* Sub-stap dots — alleen tonen als de huidige fase meerdere stappen heeft */}
          {activePhase.steps.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {activePhase.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(phaseStartIndex[activePhaseIndex] + i)}
                  aria-label={`${activePhase.label} — stap ${i + 1}`}
                  className="min-w-[32px] min-h-[32px] flex items-center justify-center group"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === localSubIndex ? 'w-6 bg-brand-primary' : 'w-1.5 bg-white/20 group-hover:bg-white/40'
                  }`} />
                </button>
              ))}
            </div>
          )}

          {/* Beschrijving + bediening */}
          <div className="flex items-start justify-between gap-4 mt-6">
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

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Vorige stap"
                className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setIsPlaying(p => !p)}
                aria-label={isPlaying ? 'Pauzeren' : 'Afspelen'}
                className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Volgende stap"
                className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Resultaatscherm — altijd zichtbaar afsluitblok, niet weggestopt achter de laatste klik */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-20 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider mb-4">
                <FileText size={16} /> Het resultaat
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight">
                Een professioneel adviesrapport, klaar voor de klant
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Van energienota tot dit rapport — inclusief scenario-vergelijking, rendement en onderbouwing.
                Geen losse documentjes of screenshots, maar één overtuigend geheel voor aan de keukentafel.
              </p>
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
                <a
                  href="https://app.enercalculatie.nl/gratis"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/25 group w-full sm:w-auto"
                >
                  Probeer gratis
                  <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-slate-300 hover:text-white font-semibold transition-colors w-full sm:w-auto"
                >
                  Boek een live demo
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-black/20">
                <img
                  src={imgRapport}
                  alt="Voorbeeld van een professioneel adviesrapport gegenereerd door EnerCalculatie"
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
