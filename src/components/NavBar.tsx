import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
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
    { name: 'Oplossing', href: '/#oplossing' },
    { name: 'Functies', href: '/#functies' },
    { name: 'Video', href: '/#demo-video' },
    { name: 'Bespaarcalculator', href: '/#pricing-calculator' },
    { name: 'Prijzen', href: '/#prijzen' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
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
          <a href="/" className="flex items-center gap-2" aria-label="EnerCalculatie - Terug naar boven">
            {!imageError ? (
              <img 
                src="/logo.png" 
                alt="EnerCalculatie Logo" 
                className="h-10 sm:h-12 lg:h-14 w-auto drop-shadow-sm" 
                onError={() => setImageError(true)} 
              />
            ) : (
              <FallbackLogo className="h-10 sm:h-12 lg:h-14 w-auto drop-shadow-sm" />
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  hash === link.href.replace('/', '') 
                    ? 'text-brand-primary' 
                    : 'text-slate-600 hover:text-brand-primary'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="bg-brand-primary hover:bg-[#008f5a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg inline-block text-center">
              Plan een rondleiding
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100"
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
