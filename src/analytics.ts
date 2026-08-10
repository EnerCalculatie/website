// Typed helper voor Umami custom events (zie index.html voor de script-tag).
// Faalt stil als Umami niet geladen is (adblocker, dev-mode, SSR) — een
// ontbrekende meting mag nooit een gebruikersactie breken.
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

export function trackEvent(eventName: string, props?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined' || typeof window.umami?.track !== 'function') return;
  window.umami.track(eventName, props);
}
