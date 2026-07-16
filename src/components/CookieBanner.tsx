import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Check, X } from 'lucide-react';

export function CookieBanner() {
  // Zichtbaarheid pas na mount bepalen: de server rendert de banner nooit
  // (geen localStorage), dus als de client 'm bij de eerste render wél toont
  // ontstaat een hydration mismatch (React #418) en gooit React de volledige
  // geprerenderde DOM weg om client-side opnieuw te renderen.
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!localStorage.getItem('cookie-consent')) setIsVisible(true);
  }, []);
  const [showDetails, setShowDetails] = useState(false);

  const [preferences, setPreferences] = useState({
    functional: true,
    analytical: false,
    marketing: false,
  });

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ functional: true, analytical: true, marketing: true }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ functional: true, analytical: false, marketing: false }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 w-full z-50 p-4 print:hidden"
      >
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Wij respecteren uw privacy</h3>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              EnerCalculatie maakt standaard alleen gebruik van functionele cookies om de applicatie goed te laten werken. Om onze website te verbeteren, vragen we uw toestemming voor analytische cookies. U kunt dit hieronder zelf bepalen.
            </p>
            
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-brand-primary-text text-base font-medium flex items-center gap-2 hover:underline focus:outline-none min-h-[48px]"
            >
              <Settings size={18} />
              Zelf instellen
            </button>

            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Noodzakelijk</h4>
                    <p className="text-xs text-slate-500">Om de basisfuncties van de site te laten werken.</p>
                  </div>
                  <div className="bg-brand-primary/20 text-brand-primary px-3 py-1 rounded text-xs font-bold">
                    Altijd aan
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Analytisch</h4>
                    <p className="text-xs text-slate-500">Om het gebruik van de site anoniem te meten.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={preferences.analytical}
                      onChange={(e) => setPreferences({...preferences, analytical: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Marketing</h4>
                    <p className="text-xs text-slate-500">Om content en advertenties te personaliseren.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>

                <div className="mt-2">
                  <button 
                    onClick={handleSavePreferences}
                    className="w-full sm:w-auto bg-slate-800 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-slate-700 transition min-h-[48px]"
                  >
                    Voorkeuren opslaan
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {!showDetails && (
            <div className="flex flex-col sm:flex-row gap-3 min-w-[280px]">
              <button 
                onClick={handleRejectAll}
                className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-xl text-base font-bold transition flex items-center justify-center gap-2 min-h-[48px]"
              >
                <X size={18} />
                Weigeren
              </button>
              <button 
                onClick={handleAcceptAll}
                className="flex-1 bg-brand-primary-text hover:bg-[#008f5a] text-white px-6 py-3 rounded-xl text-base font-bold transition shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Check size={18} />
                Accepteren
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
