import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

  const staticRoutes = [
    { url: siteUrl, lastModified: '2025-08-01' }, // manually set unless changed
    { url: `${siteUrl}/about`, lastModified: '2025-08-01' },
    { url: `${siteUrl}/contact`, lastModified: '2025-08-01' },
    { url: `${siteUrl}/categories`, lastModified: '2025-08-01' },
  ];

  const postRoutes = posts.map(({ slug, lastModified }) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified,
  }));

  const allRoutes = [...staticRoutes, ...postRoutes];

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
