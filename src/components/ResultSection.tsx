import { ListChecks, FileWarning, Gauge, AlertTriangle, Presentation, FolderKanban } from 'lucide-react';

const RESULTS = [
  {
    icon: ListChecks,
    title: 'Minder dubbel invoeren',
    description: 'Klant-, woning- en energiegegevens één keer vastleggen, gebruiken in advies, calculatie én offerte.',
  },
  {
    icon: FileWarning,
    title: 'Minder administratie',
    description: 'Geen losse spreadsheets, documenten of screenshots die u handmatig bij elkaar moet zoeken.',
  },
  {
    icon: Gauge,
    title: 'Sneller van advies naar offerte',
    description: 'De calculatie die u al heeft doorgerekend, vormt direct de basis van de offerte.',
  },
  {
    icon: AlertTriangle,
    title: 'Minder kans op invoerfouten',
    description: 'Gegevens stromen automatisch door — niet opnieuw overtypen tussen advies en offerte.',
  },
  {
    icon: Presentation,
    title: 'Professionelere klantpresentatie',
    description: 'Eén samenhangend adviesrapport en offerte, in plaats van losse documenten.',
  },
  {
    icon: FolderKanban,
    title: 'Eén centrale klantcase',
    description: 'Alles over een klant — van eerste dossier tot offerte — op één plek terug te vinden.',
  },
];

export function ResultSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Resultaat
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Minder administratie. Meer tijd voor verkoop.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Wat één workflow — in plaats van losse tools — concreet oplevert.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESULTS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-primary/10 text-brand-primary-text flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
