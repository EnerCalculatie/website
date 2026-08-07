import { useState, type FormEvent } from 'react';
import { CheckCircle2, Download, Loader2 } from 'lucide-react';

interface ChecklistOptInProps {
  slug: string;
  checklist: 'nen1010';
}

const CHECKLIST_LABEL: Record<ChecklistOptInProps['checklist'], { title: string; description: string }> = {
  nen1010: {
    title: 'Gratis checklist: NEN1010-selectiviteit',
    description: 'De 4 vuistregels voor selectiviteit en gelijktijdige invoeding bij zonnepanelen, laadpalen en batterijen — direct in je inbox.',
  },
};

// Gated content-magneet: e-mailadres tegen een checklist per e-mail (geen
// PDF-download, geen account). Praat rechtstreeks met de app-backend
// (POST /api/public/blog/checklist, server/routes/publicBlogChecklist.ts) —
// zelfde cross-origin-patroon als FreeIntakeCTA die naar app.enercalculatie.nl
// linkt, alleen hier een eigen fetch i.p.v. een externe link.
export function ChecklistOptIn({ slug, checklist }: ChecklistOptInProps) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const copy = CHECKLIST_LABEL[checklist];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('https://app.enercalculatie.nl/api/public/blog/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, checklist, sourceSlug: slug, website }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="not-prose my-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6 flex items-center gap-3">
        <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
        <p className="text-emerald-800 font-semibold">Onderweg! Check je inbox (ook de spamfolder) voor de checklist.</p>
      </div>
    );
  }

  return (
    <div className="not-prose my-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-primary/15 flex items-center justify-center">
          <Download size={20} className="text-brand-primary-text" />
        </div>
        <div>
          <p className="font-bold text-slate-900">{copy.title}</p>
          <p className="text-sm text-slate-600">{copy.description}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <input
          type="email"
          required
          placeholder="jouw@bedrijf.nl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-primary-text hover:bg-slate-900 text-white font-bold rounded-xl transition-colors text-sm disabled:opacity-60"
        >
          {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : null}
          Stuur checklist
        </button>
      </form>
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-2">Er ging iets mis. Probeer het nog eens, of mail naar info@enercalculatie.nl.</p>
      )}
      <p className="text-xs text-slate-400 mt-2">Zakelijk e-mailadres, geen spam. Uitschrijven kan altijd.</p>
    </div>
  );
}
