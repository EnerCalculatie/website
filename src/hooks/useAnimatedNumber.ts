import { useEffect, useRef, useState } from 'react';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Tweent een numerieke waarde vloeiend naar een nieuwe target (bv. bij het
 * verslepen van een slider) via requestAnimationFrame. Springt direct naar de
 * eindwaarde bij prefers-reduced-motion.
 */
export function useAnimatedNumber(target: number, durationMs = 250): number {
  const [value, setValue] = useState(target);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      if (value !== target) setValue(target);
      return;
    }

    const start = performance.now();
    const from = value;
    const delta = target - from;
    if (delta === 0) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(from + delta * easeOutCubic(progress));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return value;
}
