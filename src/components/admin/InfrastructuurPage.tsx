import { useState, useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

// Definieer het type voor de health check response, gebaseerd op health.ts
interface HealthStatus {
  status: 'ok' | 'degraded' | 'down';
  db: { ok: boolean; latencyMs: number; error?: string };
  email: {
    resend: { ok: boolean; error?: string };
    brevo: { ok: boolean; error?: string };
  };
  system: {
    uptime: number;
    memoryMb: number;
    env: string;
    commit: string;
  };
}

// Helper om uptime te formatteren
const formatUptime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '0d 0h 0m';
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
};

// Status indicator component
const StatusIndicator = ({ status, label, value, error }: { status: boolean; label: string; value?: string; error?: string }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full mr-3 shrink-0 ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="font-semibold text-slate-700">{label}</span>
    </div>
    <span className={`font-mono text-sm ${status ? 'text-slate-500' : 'text-red-600'}`}>
      {status ? (value ?? 'OK') : (error || 'FAIL')}
    </span>
  </div>
);

// Hoofdcomponent
export function InfrastructuurPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHealth = async () => {
    // Alleen fetchen als het document zichtbaar is
    if (document.visibilityState === 'hidden') {
      return;
    }
    try {
      const response = await fetch('/api/health');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHealth(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
      setHealth(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth(); // Eerste fetch
    const interval = setInterval(fetchHealth, 30000); // Poll elke 30 seconden

    document.addEventListener('visibilitychange', fetchHealth);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', fetchHealth);
    };
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchHealth} />;
  }

  if (!health) {
    return null;
  }

  const overallStatusColor =
    health.status === 'ok'
      ? 'bg-green-100 text-green-800'
      : health.status === 'degraded'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Infrastructuur Status</h1>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 text-sm font-bold rounded-full ${overallStatusColor}`}>
            {health.status.toUpperCase()}
          </span>
          <button
            onClick={fetchHealth}
            className="p-2 text-slate-500 hover:text-brand-primary-text hover:bg-slate-100 rounded-full transition"
            aria-label="Refresh status"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Services */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-600">Services</h2>
          <StatusIndicator status={health.db.ok} label="Database" value={`${health.db.latencyMs.toFixed(0)}ms`} error={health.db.error} />
          <StatusIndicator status={health.email.resend.ok} label="E-mail (Resend)" error={health.email.resend.error} />
          <StatusIndicator status={health.email.brevo.ok} label="Nieuwsbrief (Brevo)" error={health.email.brevo.error} />
        </div>

        {/* System */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-600">Systeem</h2>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-500">Uptime</span>
              <span className="font-mono">{formatUptime(health.system.uptime)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-500">Memory</span>
              <span className="font-mono">{health.system.memoryMb} MB</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-500">Environment</span>
              <span className="font-mono">{health.system.env}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Commit</span>
              <span className="font-mono">{health.system.commit.substring(0, 7)}</span>
            </div>
          </div>
          <a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg shadow-sm text-center font-semibold text-brand-primary-text hover:bg-slate-50 transition">
            Bekijk UptimeRobot
          </a>
        </div>
      </div>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="p-4 md:p-8 bg-slate-50 min-h-screen animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6"><div className="h-9 w-64 bg-slate-200 rounded"></div><div className="h-9 w-24 bg-slate-200 rounded-full"></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4"><div className="h-6 w-32 bg-slate-200 rounded"></div><div className="h-16 bg-slate-200 rounded-lg"></div><div className="h-16 bg-slate-200 rounded-lg"></div><div className="h-16 bg-slate-200 rounded-lg"></div><div className="h-16 bg-slate-200 rounded-lg"></div></div>
        <div className="space-y-4"><div className="h-6 w-32 bg-slate-200 rounded"></div><div className="h-32 bg-slate-200 rounded-lg"></div><div className="h-16 bg-slate-200 rounded-lg"></div></div>
      </div>
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="p-4 md:p-8 bg-slate-50 min-h-screen"><div className="max-w-4xl mx-auto text-center"><div className="bg-white p-8 rounded-lg shadow"><AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-slate-800 mb-2">Fout bij ophalen status</h2><p className="text-slate-600 mb-4">Kon de systeemstatus niet laden: {message}</p><button onClick={onRetry} className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition">Opnieuw proberen</button></div></div></div>
);