import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SEO } from './components/SEO';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ProblemSolution } from './components/ProblemSolution';
import { ComparisonTable } from './components/ComparisonTable';
import { Integrations } from './components/Integrations';
import { Features } from './components/Features';
import { AppDemoVideo } from './components/AppDemoVideo';
import { PricingCalculator } from './components/PricingCalculator';
import { Technology } from './components/Technology';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';
import { ProcessorAgreement } from './components/ProcessorAgreement';
import { NotFound } from './components/NotFound';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

// Helper om de scrollpositie te resetten bij het wisselen van pagina
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        {/* SEO & Meta Tags */}
        <SEO />

        {/* Navigation */}
        <NavBar />

        <Routes>
          <Route path="/" element={
            <main>
              {/* Hero Section with Dashboard Mockup */}
              <Hero />

              {/* Trust & Process */}
              <HowItWorks />
              <ProblemSolution />
              <ComparisonTable />
              <AppDemoVideo />

              {/* Product Depth */}
              <Features />
              <Integrations />
              <PricingCalculator />
              <Technology />

              {/* Conversion & Proof */}
              <Testimonials />
              <Pricing />
              <FAQ />
              <Contact />
            </main>
          } />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/voorwaarden" element={<Terms />} />
          <Route path="/verwerkersovereenkomst" element={<ProcessorAgreement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}
export default App;