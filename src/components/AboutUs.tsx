import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';

export function AboutUs() {
  const team = [
    {
      name: "Pascal van Eijden",
      role: "Oprichter & Applicatiebeheerder",
      image: "/Pascal.PNG",
      description: "Met uitgebreide ervaring in de IT als Applicatiebeheerder en ontwikkelaar heb ik, door jarenlang in Agile DevOps projecten te werken, een brede expertise opgebouwd met SaaS-applicaties. Deze kennis zet ik nu in voor EnerCalculatie om het offerte- en schouwproces voor installateurs te moderniseren.",
      email: "info@enercalculatie.nl",
      linkedin: "https://www.linkedin.com/in/pascalvaneijden/"
    }
  ];

  return (
    <section id="over-ons" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span className="text-sm font-bold text-brand-primary tracking-wide uppercase">Het Team</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight mb-6"
          >
            Wie zijn wij?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Wij zijn de drijvende krachten achter EnerCalculatie. Een unieke mix van praktijkervaring in de installatietechniek en passie voor innovatieve software.
          </motion.p>
        </div>

        <div className="flex justify-center mt-12 max-w-lg mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-xl hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1 w-full"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg relative z-10 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1 relative z-10">{member.name}</h3>
              <div className="text-brand-primary font-medium mb-4 relative z-10">{member.role}</div>
              <p className="text-slate-600 leading-relaxed mb-8 relative z-10">
                "{member.description}"
              </p>
              
              <div className="mt-auto flex gap-3 relative z-10">
                <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-colors hover:shadow-sm">
                  <Mail size={18} />
                </a>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0077b5] hover:border-[#0077b5] transition-colors hover:shadow-sm">
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
              
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-100 to-transparent opacity-50 z-0"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
