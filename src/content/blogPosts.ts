export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  tags: string[];
  updated?: string;
  image?: string;
  popular?: boolean;
  keyPoints?: string[];
}

// Deze lijst is nu leeg, want we laden alles dynamisch
export const blogPosts: BlogPostMeta[] = [];
