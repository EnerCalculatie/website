import { useEffect, useRef, useState } from 'react';

/**
 * Parseert een NL-geformatteerd getal uit een label als "5,28 kWp" of "€ 14.850"
 * en geeft prefix, het numerieke deel en suffix apart terug zodat alleen het
 * getal geanimeerd hoeft te worden.
 */
function parseFormattedNumber(raw: string): { prefix: string; value: number; decimals: number; suffix: string } | null {
  const match = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numeric, suffix] = match;
  const decimalMatch = numeric.match(/,(\d+)$/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;
  const normalized = numeric.replace(/\./g, '').replace(',', '.');
  const value = parseFloat(normalized);
  if (Number.isNaN(value)) return null;
  return { prefix, value, decimals, suffix };
}

function formatNL(value: number, decimals: number): string {
  return value.toLocaleString('nl-NL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const DURATION_MS = 900;

/**
 * Telt een geformatteerd getal-label op van 0 naar de eindwaarde zodra het
 * element zichtbaar wordt (IntersectionObserver, eenmalig). Valt terug op de
 * statische tekst bij prefers-reduced-motion of als het label geen getal bevat.
 */
export function useCountUp(label: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(label);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parsed = parseFormattedNumber(label);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!parsed || reduceMotion) {
      // display is al geïnitialiseerd op `label`; niets te synchroniseren.
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || playedRef.current) return;
        playedRef.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = easeOutCubic(progress);
          const current = parsed.value * eased;
          setDisplay(`${parsed.prefix}${formatNL(current, parsed.decimals)}${parsed.suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [label]);

  return { ref, display };
}
