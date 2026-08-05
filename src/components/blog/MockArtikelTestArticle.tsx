import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'mock-artikel-test')!;

export function MockArtikelTestArticle() {

  return (
    <BlogPostLayout post={post}>
# Mock Artikel

Dit is een test artikel met *fake* content.
    </BlogPostLayout>
  );
}
