// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const postsDirectory = path.join(process.cwd(), 'posts');
const POSTS_PER_PAGE = 9;

// The getPosts function now accepts a 'category' parameter
export function getPosts({ query = '', currentPage = 1, category = null } = {}) {
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

  // 1. Filter by category if one is provided
  if (category) {
    filteredPosts = sortedPosts.filter(post => post.categories.includes(category));
  }
  
  // 2. Filter by search query on the already category-filtered list
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
  
  const categories = [...new Set(sortedPosts.flatMap(post => post.categories))];

  return { posts: paginatedPosts, totalPages, categories };
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