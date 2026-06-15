import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

const articles = [
  {
    title: "Hoe leg je de afbouw van de salderingsregeling uit aan de keukentafel?",
    category: "Wetgeving & Salderen",
    readTime: "4 min",
    excerpt: "De salderingsregeling verandert. Klanten zijn onzeker. Ontdek hoe u met de juiste cijfers en een helder verhaal het vertrouwen wint en de deal sluit.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Waarom thuisbatterijen in 2026 nu wél uitkunnen",
    category: "Thuisbatterijen",
    readTime: "5 min",
    excerpt: "Met de stijgende netwerkkosten en terugleverboetes kantelt de businesscase voor de thuisbatterij. Zo berekent u de exacte ROI voor uw klant.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Hybride of All-electric: Zo adviseert u de juiste warmtepomp",
    category: "Warmtepompen",
    readTime: "6 min",
    excerpt: "Niet elk huis is klaar voor all-electric. Een praktisch stappenplan om te bepalen welke warmtepomp het beste past bij de woning van uw klant.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
  }
];

export function KnowledgeBase() {
  return (
    <section id="kennisbank" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
              <BookOpen size={16} /> Kennisbank
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Actuele kennis voor de installateur
            </h2>
            <p className="text-lg text-slate-600">
              Praktische artikelen, rekentips en inzichten om uw adviesgesprekken nog sterker te maken.
            </p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-brand-primary font-bold hover:text-[#008f5a] transition-colors whitespace-nowrap">
            Bekijk alle artikelen <ArrowRight size={20} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  {article.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-3">
                  <Clock size={14} /> {article.readTime} leestijd
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-600 mb-6 flex-grow line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-brand-primary font-bold text-sm mt-auto">
                  Lees verder <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 md:hidden flex justify-center">
          <a href="#" className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-xl font-bold transition-colors">
            Bekijk alle artikelen <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}