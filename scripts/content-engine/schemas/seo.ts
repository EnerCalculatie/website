import { z } from 'zod';

export const SeoGeoOutputSchema = z.object({
  content: z.string().describe("Het volledig geoptimaliseerde Markdown artikel (enkel de body, zonder metadata)."),
  slug: z.string().describe("URL slug voor het artikel (kebab-case)."),
  title: z.string().describe("Korte leesbare titel (H1)."),
  seoTitle: z.string().describe("SEO geoptimaliseerde title tag (< 60 chars)."),
  description: z.string().describe("Meta description tag (< 155 chars)."),
  excerpt: z.string().describe("Korte inleiding voor op de overzichtspagina."),
  tags: z.array(z.string()).describe("3-5 relevante categorie/SEO tags."),
  keyPoints: z.array(z.string()).describe("3-5 bullet points met belangrijkste takeaways."),
  category: z.string().optional().describe("Hoofdcategorie, bijv. 'Kennisbank' of 'Nieuws'."),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional().describe("Veelgestelde vragen voor structured data.")
});

export type SeoGeoOutput = z.infer<typeof SeoGeoOutputSchema>;
