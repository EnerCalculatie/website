import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { Features } from './components/Features';
import { SavingsCalculator } from './components/SavingsCalculator';
import { Technology } from './components/Technology';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans selection:bg-brand-secondary selection:text-white">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <ProblemSolution />
        <Features />
        <SavingsCalculator />
        <Technology />
        <Pricing />
        <FAQ />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
