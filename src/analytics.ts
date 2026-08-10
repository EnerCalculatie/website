// Typed helper voor Plausible custom events (zie index.html voor de script-tag).
// Faalt stil als Plausible niet geladen is (adblocker, dev-mode, SSR) — een
// ontbrekende meting mag nooit een gebruikersactie breken.
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function trackEvent(eventName: string, props?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined' || typeof window.plausible !== 'function') return;
  window.plausible(eventName, props ? { props } : undefined);
}
