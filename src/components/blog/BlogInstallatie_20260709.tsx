import BlogPostLayout from '@/components/BlogPostLayout';

export const meta = {
  slug: 'nieuwe-regels-rvo-isde-2024',
  title: 'Nieuwe RVO-regels voor ISDE-subsidies in 2024: Wat u moet weten',
  description: 'Ontdek de belangrijkste wijzigingen in de RVO-regels voor ISDE-subsidies in 2024 en hoe dit uw werk als installateur beïnvloedt.',
  date: '2023-10-10',
  excerpt: 'De RVO heeft nieuwe regels gepubliceerd voor de ISDE-subsidies in 2024. Dit artikel belicht de belangrijkste wijzigingen en wat dit betekent voor installateurs.',
  tags: ['RVO', 'ISDE', 'subsidies', 'verduurzaming'],
  keyPoints: [
    'Nieuwe eisen voor energetische prestaties van warmtepompen.',
    'Verruimde criteria voor thuisbatterijen in combinatie met zonnepanelen.',
    'Verscherpte controle op installatiepraktijken door ACM.',
  ],
};

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function NieuweRegelsRVOISDE2024() {
  return (
    <BlogPostLayout meta={meta}>
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <h2>Inleiding</h2>
        <p>
          De Rijksdienst voor Ondernemend Nederland (RVO) heeft onlangs de nieuwe regels voor de Investeringssubsidie Duurzame Energie (ISDE) gepubliceerd. Deze wijzigingen hebben directe gevolgen voor uw werkzaamheden als installateur. In dit artikel lichten wij de belangrijkste aanpassingen toe en geven wij u praktische tips om hierop in te spelen.
        </p>

        <h2>Belangrijkste wijzigingen</h2>
        <p>
          Een van de meest opvallende wijzigingen is de introductie van strengere eisen voor de energetische prestaties van warmtepompen. Vanaf 2024 moeten alle warmtepompen die onder de ISDE-regeling voldoen aan de nieuwe Europese energie-efficiëntieklasse A+++. Dit betekent dat sommige modellen niet meer in aanmerking komen voor subsidie.
        </p>
        <p>
          Daarnaast zijn de criteria voor thuisbatterijen verruimd. Thuisbatterijen worden nu alleen gesubsidieerd als deze worden geïnstalleerd in combinatie met een zonnepanelensysteem. Dit biedt nieuwe mogelijkheden voor installateurs die gespecialiseerd zijn in energieopslag.
        </p>

        <h2>Controle door ACM</h2>
        <p>
          De Autoriteit Consument & Markt (ACM) heeft aangekondigd dat zij de controle op installatiepraktijken zal verscherpen. Dit betekent dat installateurs extra aandacht moeten besteden aan correcte registratie en naleving van de technische eisen. Een goede voorbereiding en documentatie kunnen problemen later voorkomen.
        </p>

        <h2>Conclusie</h2>
        <p>
          De nieuwe RVO-regels voor ISDE-subsidies bieden zowel uitdagingen als kansen voor installateurs. Door u tijdig op de hoogte te stellen van deze wijzigingen en uw werkzaamheden hierop af te stemmen, blijft u voorbereid op de toekomst van verduurzaming.
        </p>
      </motion.div>
    </BlogPostLayout>
  );
}