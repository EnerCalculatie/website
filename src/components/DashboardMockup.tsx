import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Scan, Zap, Sun, Battery, Flame, TrendingUp, CheckSquare, 
  FileText, Briefcase, Settings, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

import { TabEnergie } from './tabs/TabEnergie';
import { TabZon } from './tabs/TabZon';
import { TabRoi } from './tabs/TabRoi';
import { TabBatterij } from './tabs/TabBatterij';
import { TabWarmtepomp } from './tabs/TabWarmtepomp';
import { TabSchouw } from './tabs/TabSchouw';
import { TabRapport } from './tabs/TabRapport';
import { TabWerk } from './tabs/TabWerk';
import { TabPand } from './tabs/TabPand';
import { TabScan } from './tabs/TabScan';

type Tab = 'pand' | 'scan' | 'energie' | 'zon' | 'batterij' | 'warmtepomp' | 'roi' | 'schouw' | 'rapport' | 'werk';

export function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<Tab>('pand');

  const tabs = [
    { id: 'pand', label: 'Pandgegevens', icon: Home },
    { id: 'scan', label: 'AI Scan & OCR', icon: Scan },
    { id: 'energie', label: 'Energieprofiel', icon: Zap },
    { id: 'zon', label: 'Zonnepanelen', icon: Sun },
    { id: 'batterij', label: 'Thuisbatterij', icon: Battery },
    { id: 'warmtepomp', label: 'Warmtepomp', icon: Flame },
    { id: 'roi', label: 'Rendement & ROI', icon: TrendingUp },
    { id: 'schouw', label: 'Schouw Overzicht', icon: CheckSquare },
    { id: 'rapport', label: 'Adviesrapport', icon: FileText },
    { id: 'werk', label: 'Werkvoorbereiding', icon: Briefcase },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-20 mx-auto max-w-6xl relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-b from-brand-primary/20 to-transparent rounded-2xl blur-lg opacity-50" />
      <div className="relative rounded-2xl bg-slate-50 border border-slate-200 shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] flex text-left font-sans">
        
        {/* Sidebar */}
        <div className="hidden md:flex w-[260px] bg-white border-r border-slate-200 flex-col p-4 z-10 shrink-0">
          <div className="mb-4 px-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Advies Stappen</h3>
            <p className="text-xs text-slate-500">Volg de DDD workflow</p>
          </div>
          
          <div className="flex flex-col gap-1 overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              const isClickable = true;

              return (
                <button
                  key={tab.id}
                  onClick={() => isClickable && setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-semibold ${
                    isActive 
                      ? 'bg-[#00a669] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  } ${!isClickable ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-6 gap-3 flex flex-col">
            <button className="w-full bg-[#00a669] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#008f5a] transition-colors shadow-sm">
              Opslaan & Terug naar<br/>Dossiers
            </button>
            <div className="bg-slate-50/50 rounded-xl p-3 flex gap-2 border border-slate-100 items-center">
              <div className="text-purple-500"><Scan size={16} /></div>
              <span className="text-xs text-slate-500">Gemini AI is geladen &<br/>gekoppeld.</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
          
          {/* Header */}
          <div className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shrink-0">
            {activeTab === 'pand' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                  <Home size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Pandgegevens & Klant</h2>
                  <p className="text-sm text-slate-500">Klantgegevens en object parameters.</p>
                </div>
              </div>
            )}
            {activeTab === 'scan' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
                  <Scan size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">AI Scan & OCR Document</h2>
                  <p className="text-sm text-slate-500">Upload documenten voor automatische gegevensextractie via Gemini.</p>
                </div>
              </div>
            )}
            {activeTab === 'energie' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-[#00a669]">
                  <Zap size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Verbruiksprofiel & Energievraag</h2>
                  <p className="text-sm text-slate-500">Het basale historisch verbruik vormt de referentie voor de besparingsberekeningen.</p>
                </div>
              </div>
            )}
            {activeTab === 'zon' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
                  <Sun size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Legplan & Zonnepanelen Dimensionering</h2>
                  <p className="text-sm text-slate-500">Ontwerp het gewenste legplan en bereken deterministisch de verwachte jaaropbrengst.</p>
                </div>
              </div>
            )}
            {activeTab === 'batterij' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                  <Battery size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Thuisbatterij & Opslag</h2>
                  <p className="text-sm text-slate-500">Sla lokaal opgewerkte energie op om terugleverkosten te elimineren.</p>
                </div>
              </div>
            )}
            {activeTab === 'warmtepomp' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                  <Flame size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Warmtepomp Modulatie</h2>
                  <p className="text-sm text-slate-500">Verduurzaam de warmtevraag en bespaar direct op gasverbruik.</p>
                </div>
              </div>
            )}
            {activeTab === 'roi' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-[#00a669]">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">ROI & Financiële Rendementsprognose</h2>
                  <p className="text-sm text-slate-500">Volledig deterministische doorrekening van uw terugverdientijd en rendement.</p>
                </div>
              </div>
            )}
            {activeTab === 'schouw' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <CheckSquare size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Technische Schouw Overzicht</h2>
                  <p className="text-sm text-slate-500">Overzicht van de installatievereisten en dakconditie.</p>
                </div>
              </div>
            )}
            {activeTab === 'rapport' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-[#00a669]">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Concept Adviesrapport</h2>
                  <p className="text-sm text-slate-500">Genereer en deel een overzichtelijk rapport voor de klant.</p>
                </div>
              </div>
            )}
            {activeTab === 'werk' && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Werkvoorbereidingsrapport</h2>
                  <p className="text-sm text-slate-500">Technische details en materiaallijst voor de installateurs.</p>
                </div>
              </div>
            )}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'pand' && <TabPand key="pand" />}
              {activeTab === 'scan' && <TabScan key="scan" />}
              {activeTab === 'energie' && <TabEnergie key="energie" />}
              {activeTab === 'zon' && <TabZon key="zon" />}
              {activeTab === 'batterij' && <TabBatterij key="batterij" />}
              {activeTab === 'warmtepomp' && <TabWarmtepomp key="warmtepomp" />}
              {activeTab === 'roi' && <TabRoi key="roi" />}
              {activeTab === 'schouw' && <TabSchouw key="schouw" />}
              {activeTab === 'rapport' && <TabRapport key="rapport" />}
              {activeTab === 'werk' && <TabWerk key="werk" />}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
