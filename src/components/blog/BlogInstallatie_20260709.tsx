import { BlogPostLayout } from "@/components/blog-post-layout";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function SlimmeIntegratieWarmtepompen() {
  return (
    <BlogPostLayout
      meta={{
        slug: "slimme-integratie-warmtepompen",
        title: "Slimme integratie van warmtepompen in bestaande CV-systemen",
        description: "Praktische richtlijnen voor installateurs om warmtepompen optimaal te integreren in traditionele verwarmingssystemen.",
        date: "2023-11-15",
        excerpt: "Ontdek hoe u als installateur warmtepompen efficiënt kunt combineren met conventionele cv-ketels voor een geleidelijke verduurzaming.",
        tags: ["warmtepomp", "hybride systemen", "ISDE", "RVO", "verduurzaming"],
        updated: "2023-11-20"
      }}
    >
      <motion.article
        initial="hidden"
        animate="visible"
        variants={variants}
        className="prose prose-lg max-w-none"
      >
        <h2>De kunst van hybride verwarming</h2>
        
        <p>Als installateur in de verduurzamingsbranche staat u voor de uitdaging om bestaande cv-systemen toekomstbestendig te maken. De warmtepomp vormt hierbij een cruciaal onderdeel, maar volledige vervanging is niet altijd direct mogelijk of wenselijk. Dit artikel biedt praktische inzichten voor een vlotte integratie.</p>

        <h3>Technische compatibiliteit</h3>
        <p>Bij hybride systemen is de afstemming tussen warmtepomp en cv-ketel essentieel. Let specifiek op:</p>
        <ul>
          <li>Hydraulische scheiding tussen hoog- en laagtemperatuurcircuits</li>
          <li>Dimensionering van buffervaten voor optimale modulerende werking</li>
          <li>Compatibele regelunits die beide warmtebronnen intelligent aansturen</li>
        </ul>

        <h3>Regelgeving en subsidiemogelijkheden</h3>
        <p>De ISDE-subsidie (RVO) biedt interessante kansen voor uw klanten:</p>
        <ul>
          <li>Subsidiebedragen voor hybride systemen zijn per 2023 verhoogd</li>
          <li>Let op de nieuwe eisen aan SCOP-waardes bij aanvraag</li>
          <li>Combineer met andere regelingen zoals de energiebespaarlening</li>
        </ul>

        <h3>Praktijkcasus: bestaande woning uit 1995</h3>
        <p>Een recent project illustreert de mogelijkheden:</p>
        <ul>
          <li>Bestaande HR-ketel bleef behouden als piekvoorziening</li>
          <li>Lucht-water warmtepomp voor basislast (8kW bij -7°C)</li>
          <li>Smart Grid Ready-module voor toekomstige dynamische tarieven</li>
          <li>Eindresultaat: 65% gasreductie in eerste jaar</li>
        </ul>

        <h3>Toekomstbestendig adviseren</h3>
        <p>Met het oog op de ACM-voorschriften voor slimme meters en de Netbeheer Nederland roadmap:</p>
        <ul>
          <li>Kies voor modellen met OpenTherm of Modbus-connectiviteit</li>
          <li>Prepareer systemen voor mogelijke warmtenetaansluiting</li>
          <li>Houd rekening met toekomstige salderingsregels bij dimensionering</li>
        </ul>

        <p>Door deze technische, financiële en regelgevende aspecten te combineren, positioneert u zich als expert in geleidelijke verduurzaming. Uw klanten waarderen deze pragmatische aanpak die zowel comfort als toekomstvisie biedt.</p>
      </motion.article>
    </BlogPostLayout>
  );
}