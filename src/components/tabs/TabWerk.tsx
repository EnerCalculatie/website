import { motion } from 'motion/react';
import { Briefcase, MapPin, Package, Zap, Image as ImageIcon } from 'lucide-react';

export function TabWerk() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-6 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LOCATIE & CONTACT */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <MapPin size={16} className="text-[#00a669]" /> LOCATIE & CONTACT
          </h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">ADRES</div>
              <div className="text-sm font-medium text-slate-900">Fictiestraat 42</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">POSTCODE / PLAATS</div>
              <div className="text-sm font-medium text-slate-900">1234 AB Zonnestad</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">TYPE PAND</div>
              <div className="text-sm font-medium text-slate-900">Hoekwoning</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">BOUWJAAR</div>
              <div className="text-sm font-medium text-slate-900">2000</div>
            </div>
          </div>
        </div>

        {/* BEREIKBAARHEID */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Briefcase size={16} className="text-[#00a669]" /> BEREIKBAARHEID & KLIMMATERIEEL
          </h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">PARKEERGELEGENHEID</div>
              <div className="text-sm font-medium text-slate-900">&lt;50m lopen</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">GOOTHOOGTE (M)</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">BENODIGD KLIMMATERIEEL</div>
              <div className="text-sm font-medium text-slate-900">Standaard ladder</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">DAKTYPE / BEDEKKING</div>
              <div className="text-sm font-medium text-slate-900">Plat / EPDM</div>
            </div>
          </div>
        </div>

        {/* MATERIAALLIJST */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Package size={16} className="text-[#00a669]" /> MATERIAALLIJST (BILL OF MATERIALS)
          </h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">ZONNEPANELEN</div>
              <div className="text-sm font-medium text-slate-900">16x 430 Wp (6.880 Wp)</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">ORIËNTATIE / DAKHELLING</div>
              <div className="text-sm font-medium text-slate-900">Zuid, 35°</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">OMVORMER</div>
              <div className="text-sm font-medium text-slate-900">1x string-omvormer</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">THUISBATTERIJ</div>
              <div className="text-sm font-medium text-slate-900">5 kWh (LFP)</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">WARMTEPOMP</div>
              <div className="text-sm font-medium text-slate-900">Hybride — 6 kW</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">WP PLAATSING / BOILERVAT</div>
              <div className="text-sm font-medium text-slate-900">800 L</div>
            </div>
          </div>
        </div>

        {/* ELEKTRA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Zap size={16} className="text-[#00a669]" /> ELEKTRA & GROEPENKAST
          </h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">TYPE AANSLUITING</div>
              <div className="text-sm font-medium text-slate-900">1-fase</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">HOOFDZEKERING (A)</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">LOCATIE METERKAST</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">VERZWARING NODIG (WP)</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
