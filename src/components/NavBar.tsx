import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router';
import { FallbackLogo } from './FallbackLogo';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '/#functies' },
    { name: 'Hoe werkt het?', href: '/#workflow' },
    { name: 'Klantcase', href: '/#case-study' },
    { name: 'Prijzen', href: '/#prijzen' },
    { name: 'Over ons', href: '/over-ons' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 print:hidden ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-brand-primary transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 shrink-0" aria-label="EnerCalculatie - Terug naar boven">
            {!imageError ? (
              <img
                src="/logo.svg"
                alt="EnerCalculatie Logo"
                className="h-9 sm:h-10 lg:h-11 w-auto drop-shadow-sm"
                onError={() => setImageError(true)}
              />
            ) : (
              <FallbackLogo className="h-9 sm:h-10 lg:h-11 w-auto drop-shadow-sm" />
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-base font-medium transition-colors p-2 whitespace-nowrap hover:bg-slate-50 rounded-lg ${
                  hash === link.href.replace('/', '')
                    ? 'text-brand-primary'
                    : 'text-slate-600 hover:text-brand-primary'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <a
              href="https://app.enercalculatie.nl/"
              className="text-base font-medium text-slate-600 hover:text-brand-primary transition-colors p-2 whitespace-nowrap"
            >
              Inloggen
            </a>
            <a href="#contact" className="bg-brand-primary hover:bg-[#008f5a] text-white px-5 py-3 rounded-lg text-base font-semibold whitespace-nowrap transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center min-h-[48px]">
              Plan rondleiding
            </a>
          </div>

          {/* Mobile/tablet menu button */}
          <button
            className="xl:hidden p-3 -mr-2 text-slate-600 flex items-center justify-center min-h-[48px] min-w-[48px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile/tablet Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full bg-brand-primary hover:bg-[#008f5a] text-white px-4 py-3 rounded-lg font-medium text-center transition-colors">
                  Plan een rondleiding
                </a>
                <a
                  href="https://app.enercalculatie.nl/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full border border-slate-200 text-slate-700 px-4 py-3 rounded-lg font-medium text-center hover:bg-slate-50 transition-colors"
                >
                  Inloggen
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
