import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

export function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // Honeypot-veld, moet altijd leeg blijven
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus('submitting');

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Er is een fout opgetreden bij het aanmelden.');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Er is een onverwachte fout opgetreden.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-900 rounded-3xl p-8 sm:p-10 mt-12 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 bg-white/10 text-brand-primary font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-4">
          <Mail size={16} /> Binnenkort beschikbaar
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          Ontvang de ROI-gids voor installateurs
        </h3>
        <p className="text-slate-300 leading-relaxed mb-6">
          Een praktische gids met rekenvoorbeelden voor de terugverdientijd van zonnepanelen, thuisbatterijen en warmtepompen. Meld u aan en wij sturen u de gids zodra deze gereed is.
        </p>

        {status === 'success' ? (
          <div className="flex items-center gap-2 text-brand-primary font-semibold">
            <CheckCircle2 size={20} /> Bedankt! U ontvangt de gids zodra deze beschikbaar is.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            {/* Honeypot-veld, onzichtbaar voor mensen, vangt bots */}
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input
              type="email"
              required
              placeholder="uw@bedrijf.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-primary min-h-[48px]"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60"
            >
              {status === 'submitting' ? <Loader2 size={18} className="animate-spin" /> : 'Meld u aan'}
            </button>
          </form>
        )}
        {status === 'error' && errorMessage && (
          <p className="text-red-400 text-sm mt-3">{errorMessage}</p>
        )}
      </div>
    </motion.div>
  );
}
