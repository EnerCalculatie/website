import { z } from 'zod';

export const NEWS_CATEGORIES = ['Laadpalen', 'Airco', 'Zonnepanelen', 'Warmtepompen', 'Thuisbatterijen'] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const NewsStorySchema = z.object({
  found: z.boolean(),
  category: z.enum(NEWS_CATEGORIES).optional(),
  headline: z.string().optional(),
  summary: z.string().optional(),
  publishedDate: z.string().optional().describe("YYYY-MM-DD van het oorspronkelijke bericht."),
  whyItMatters: z.string().optional(),
});

export type NewsStory = z.infer<typeof NewsStorySchema> & {
  /** Bronnen uit Gemini's groundingMetadata — door de code toegevoegd, niet door het model. */
  sources?: { title: string; url: string }[];
  /** Waarom een gevonden bericht is afgewezen — alleen voor diagnose in news-story.json. */
  rejectedReason?: string;
};
