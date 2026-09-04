import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** ms, voor stagger tussen opeenvolgende Reveal-elementen in dezelfde sectie */
  delay?: number;
  className?: string;
  as?: 'div' | 'span';
}

/**
 * Generieke scroll-reveal wrapper (opacity 0 + translateY(18px) -> opacity 1 +
 * translateY(0), 500ms, eenmalig). CSS-gedreven transition, IntersectionObserver
 * bepaalt alleen wanneer de "visible" klasse aangaat. Respecteert
 * prefers-reduced-motion via de .reveal CSS-regel in index.css.
 */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
