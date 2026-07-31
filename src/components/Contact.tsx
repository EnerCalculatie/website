import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Send, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    subject: '' // Honeypot field
  });

  // Herstel opgeslagen formulierdata pas ná mount: de server rendert altijd
  // een leeg formulier, dus een gevulde eerste client-render zou een hydration
  // mismatch geven. Deze effect staat vóór de save-effect zodat de opgeslagen
  // data gelezen is voordat die overschreven kan worden.
  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem('contactFormData');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedData) setFormData(JSON.parse(savedData));
    } catch (_error) {
      // Corrupte JSON: start met een leeg formulier.
    }
  }, []);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [clientError, setClientError] = useState<string | null>(null); // New state for client-side errors
  const [serverError, setServerError] = useState<string | null>(null);

  // Sla de data op in sessionStorage bij elke wijziging.
  useEffect(() => {
    // We slaan het honeypot veld niet op, die moet altijd leeg zijn bij een nieuwe sessie.
    const dataToSave = { ...formData, subject: '' };
    sessionStorage.setItem('contactFormData', JSON.stringify(dataToSave));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Specify HTMLFormElement
    e.preventDefault();
    setClientError(null); // Clear any previous client-side errors

    // Client-side validation
    if (!e.currentTarget.checkValidity()) {
      setClientError('Vul alstublieft alle verplichte velden in.');
      setStatus('error'); // Set status to error to display the clientError
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    setStatus('submitting');
    setServerError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Er is een fout opgetreden bij het verzenden.');
      }

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', company: '', message: '', subject: '' });
      sessionStorage.removeItem('contactFormData'); // Ruim op na succesvolle verzending
      setTimeout(() => setStatus('idle'), 5000); // Reset de status na 5 seconden
    } catch (error) {
      console.error('Form submission error:', error);
      setServerError(error instanceof Error ? error.message : 'Er ging iets mis.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    // Clear client-side error when user starts typing again
    if (clientError) {
      setClientError(null);
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span className="text-sm font-bold text-brand-primary tracking-wide uppercase">Contact</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight mb-6"
          >
            Hoe kunnen we u helpen?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Ik help u persoonlijk verder. Neem contact op voor ondersteuning, demo's of technische vragen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Contactgegevens</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">E-mail</h4>
                    <p className="text-slate-600 mb-1">Voor algemene vragen en support.</p>
                    <a href="mailto:info@enercalculatie.nl" className="text-brand-primary font-medium hover:underline">info@enercalculatie.nl</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">Telefoon</h4>
                    <p className="text-slate-600 mb-1">We zijn bereikbaar op</p>
                    <a href="tel:+31644572511" className="text-brand-primary font-medium hover:underline">06 - 44 57 25 11</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">WhatsApp</h4>
                    <p className="text-slate-600 mb-1">Snel antwoord via een kort berichtje.</p>
                    <a href="https://wa.me/31644572511?text=Hallo%2C%20ik%20heb%20een%20vraag%20over%20EnerCalculatie..." target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-medium hover:underline">06 - 44 57 25 11</a>
                  </div>
                </div>

              </div>
            </div>


          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"            
          >
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Stuur een bericht</h3>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate> {/* Add noValidate to prevent default browser validation messages */}
              {/* Honeypot field for spam prevention. Should be visually hidden. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-base font-medium text-slate-700 mb-2">Voornaam *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    autoCapitalize="words"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all min-h-[48px]"
                    placeholder="Jan"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-base font-medium text-slate-700 mb-2">Achternaam *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    autoCapitalize="words"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all min-h-[48px]"
                    placeholder="Voorbeeld"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-slate-700 mb-2">E-mailadres *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all min-h-[48px]"
                  placeholder="jan@installatiebedrijf.nl"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-base font-medium text-slate-700 mb-2">Bedrijfsnaam</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  autoCapitalize="words"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all min-h-[48px]"
                  placeholder="Installatiebedrijf BV"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-medium text-slate-700 mb-2">Bericht *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-none min-h-[48px]"
                  placeholder="Hoe kunnen we u helpen?"
                ></textarea>
              </div>

              {/* Display client-side error if present, otherwise server-side error */}
              {status === 'error' && (clientError || serverError) && (
                <div role="alert" aria-live="assertive" className="p-4 bg-red-50 text-red-600 rounded-xl text-base font-medium">
                  {clientError || serverError || 'Er ging iets mis met het verzenden. Probeer het later nog eens.'}
                </div>
              )}

              {status === 'success' && (
                <div role="status" aria-live="polite" className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-base font-medium flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  Bericht verzonden! Wij nemen snel contact met u op.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="w-full bg-brand-primary-text hover:bg-[#008f5a] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl text-base font-bold transition-all shadow-md mt-2 flex items-center justify-center gap-2 group min-h-[48px]"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Bezig met verzenden...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Verzonden</span>
                  </>
                ) : (
                  <>
                    <span>Verstuur bericht</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
