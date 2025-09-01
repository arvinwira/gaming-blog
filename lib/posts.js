// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const postsDirectory = path.join(process.cwd(), 'posts');
const POSTS_PER_PAGE = 9;

// hierarchical category structure
export const HIERARCHICAL_CATEGORIES = {
  'Games': [
    'Co-op',
    'Cozy Games',
    'FPS',
    'Free To Play',
    'Hidden Gem',
    'Horror',
    'Indie',
    'Mobile Games',
    'Multiplayer',
    'Puzzle',
    'Racing',
    'Real Time Strategy',
    'Roblox',
    'Roguelike',
    'RPG',
    'Simulator',
    'Singleplayer',
    'Soulslike',
    'Steam',
    'Survival'
  ],
  'News': [
    'News',
    'Upcoming'
  ],
  'Hardware & Gear': [
    'Budget',
    'Headsets',
    'Keyboards',
    'Monitors',
    'Mouse'
  ]
};

export function getPosts({ 
  query = '', 
  currentPage = 1, 
  category = null 
} = {}) {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, ...data };
  });
  
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  let filteredPosts = sortedPosts;

  // Update filtering logic to handle main or subcategories
  if (category) {
    // Check if the selected category is a main category
    if (HIERARCHICAL_CATEGORIES[category]) {
      const subCategories = HIERARCHICAL_CATEGORIES[category];
      filteredPosts = sortedPosts.filter(post => 
        post.categories.some(cat => subCategories.includes(cat))
      );
    } else {
      // Filter by subcategory
      filteredPosts = sortedPosts.filter(post => post.categories.includes(category));
    }
  }
  
  if (query) {
    filteredPosts = filteredPosts.filter(
      post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  
  const allCategories = [...new Set(sortedPosts.flatMap(post => post.categories))];

  return { posts: paginatedPosts, totalPages, allCategories };
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source: source,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug, 
        [rehypeAutolinkHeadings, { behavior: 'wrap' }], 
      ];
      return options;
    },
  });

  return {
    slug,
    frontmatter,
    code,
  };
}