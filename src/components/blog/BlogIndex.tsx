import { useEffect, useMemo, useState } from 'react';
// ... andere imports ...
import { blogPosts as staticPosts } from '../../content/blogPosts';

// Dynamisch importeren van alle gegenereerde blogbestanden
const autoBlogModules = import.meta.glob('./BlogInstallatie_*.tsx', { eager: true });

export function BlogIndex() {
  const sortedPosts = useMemo(() => {
    // 1. Haal meta uit de dynamische modules
    const dynamicPosts = Object.values(autoBlogModules).map((m: any) => m.meta);
    
    // 2. Combineer statische en dynamische posts
    const allPosts = [...staticPosts, ...dynamicPosts];
    
    // 3. Sorteer op datum
    return allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  // De rest van je component blijft exact zoals het was:
  // popularPosts, filterTags, etc. gebruiken nu de gecombineerde sortedPosts.
  
  // ... rest van de code ...
