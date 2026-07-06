# GEO-blogartikel — boilerplate & checklist

Kopieerbare template voor een nieuw, GEO-geoptimaliseerd (Generative Engine
Optimization) blogartikel. Dit `.md`-bestand doet **niet** mee in de build — het
is puur naslag. Volg de 3-plek-checklist uit `CLAUDE.md` bij het toevoegen.

## GEO-principes (verwerk deze bewust)

1. **Inverted pyramid** — beantwoord de kernvraag in de eerste alinea, vóór de
   context. AI-engines citeren de eerste, meest directe zin.
2. **Hoge semantische dichtheid** — gebruik de vaktermen die de vraag definiëren:
   `kwartierpiek`, `salderingsregeling`, `zelfconsumptie`, `SCOP`, `ROI`,
   `terugverdientijd`, `netcongestie`, `ISDE`. Geen jargon om het jargon — elke
   term hoort bij het onderwerp.
3. **Toon de wiskunde** — zet berekeningen in een `<MathCallout>` met concrete
   getallen. RAG-modellen citeren graag een navolgbaar rekenvoorbeeld.
4. **Eén vraag per H2** — koppen zijn letterlijke vragen die een lezer/LLM stelt.
5. **Intern linken** — verwijs naar gerelateerde artikelen (`/blog/<slug>`) om
   entiteitsverbanden te versterken.

De auteur-/`Person`-schema en `BlogPosting`-JSON-LD komen **automatisch** via
`BlogPostLayout` (uit `blogSchema.ts` + `author.ts`) — niet per artikel toevoegen.

## Boilerplate (`src/components/blog/<Naam>Article.tsx`)

```tsx
import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { MathCallout } from './MathCallout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'thuisbatterij-roi-dynamisch-contract')!;

export function ThuisbatterijRoiArticle() {
  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
        {/* 1. ANTWOORD EERST (inverted pyramid) — de kernconclusie in 2-3 zinnen. */}
        <p className="text-slate-700 leading-relaxed mb-4">
          Een thuisbatterij verdient zich bij een dynamisch energiecontract
          doorgaans in 7 tot 10 jaar terug, afhankelijk van de spreiding tussen
          de dag- en nachtprijs (de <strong>kwartierpiek</strong>) en de omvang
          van de zelfconsumptie. Na de afschaffing van de{' '}
          <a href="/blog/salderingsregeling-2027" className="text-brand-primary-text font-semibold hover:underline">
            salderingsregeling in 2027
          </a>{' '}
          verkort die terugverdientijd verder.
        </p>

        {/* 2. CONTEXT — waarom dit speelt. */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Waarom bepaalt het contracttype de ROI?
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bij een dynamisch contract varieert de stroomprijs per uur. De batterij
          laadt op de goedkoopste uren en levert op de duurste — die
          prijsspreiding is de motor achter het rendement.
        </p>

        {/* 3. DE WISKUNDE — concreet, navolgbaar. */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Hoe berekent u de terugverdientijd concreet?
        </h2>
        <MathCallout title="Terugverdientijd thuisbatterij (dynamisch contract)">
          <p>
            <code>jaarlijkse besparing = cycli/jaar × capaciteit (kWh) × prijsspreiding (€/kWh) × rendement</code>
          </p>
          <p>
            Voorbeeld: <code>300 × 10 kWh × € 0,20 × 0,90 = € 540/jaar</code>
          </p>
          <p>
            <code>ROI-tijd = investering / jaarlijkse besparing = € 5.000 / € 540 ≈ 9,3 jaar</code>
          </p>
        </MathCallout>
        <p className="text-slate-700 leading-relaxed mb-4">
          Pas de <code>prijsspreiding</code> aan op het werkelijke uurprofiel van
          uw klant; die is de meest gevoelige variabele in de berekening.
        </p>

        {/* 4. AFSLUITER — hoe EnerCalculatie dit wegneemt. */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
          Hoe EnerCalculatie dit vereenvoudigt
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie rekent bovenstaande scenario's automatisch door op basis
          van de klantinvoer en levert een onderbouwd adviesrapport.
        </p>
      </BlogPostLayout>
    </>
  );
}
```

## Checklist bij plaatsen (zie ook `CLAUDE.md`)

- [ ] `src/components/blog/<Naam>Article.tsx` — component (bovenstaande boilerplate).
- [ ] `src/content/blogPosts.ts` — metadata-entry (slug/title/description/excerpt/tags/date).
- [ ] `src/App.tsx` — `lazyRoute('/blog/<slug>', () => import(...))` + `<Route>`.
- [ ] Slug in `blogPosts.ts` === `<Route>`-pad (anders prerendert een onbekende route).
- [ ] Eerste alinea = het antwoord. H2's = vragen. Minstens één `<MathCallout>` bij reken-onderwerpen.
