import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CATEGORY_META } from '@/lib/posts';

function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // Get last modified time from file system
    const stats = fs.statSync(fullPath);
    const lastModified = stats.mtime.toISOString(); // uses file's last modified date

    return { slug, lastModified, ...data };
  });
}

export async function GET() {
  const posts = getPosts();
  const siteUrl = 'https://chronicreload.com';

  // Base static routes
  const staticRoutes = [
    { url: siteUrl, lastModified: '2025-08-01' },
    { url: `${siteUrl}/about`, lastModified: '2025-08-01' },
    { url: `${siteUrl}/contact`, lastModified: '2025-08-01' },
    { url: `${siteUrl}/categories`, lastModified: '2025-08-01' },
    { url: `${siteUrl}/games`, lastModified: '2025-08-01' },
    { url: `${siteUrl}/hardware`, lastModified: '2025-08-01' },
    { url: `${siteUrl}/news`, lastModified: '2025-08-01' },
  ];

  // Dynamic Subcategory Routes from CATEGORY_META
  const categoryRoutes = Object.keys(CATEGORY_META).map(cat => {
    const hub = CATEGORY_META[cat].parent;
    return {
      url: `${siteUrl}/${hub}/${encodeURIComponent(cat)}`,
      lastModified: '2025-08-01', // Ideally would track category modification times, using static for now
    };
  });

  // Blog Posts
  const postRoutes = posts.map(({ slug, lastModified }) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified,
  }));

  const allRoutes = [...staticRoutes, ...categoryRoutes, ...postRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
      .map(route => `
    <url>
      <loc>${route.url}</loc>
      <lastmod>${route.lastModified}</lastmod>
    </url>`)
      .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
