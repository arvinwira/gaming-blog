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
    return { slug, ...data };
  });
}

export async function GET() {
  const posts = getPosts();
  const siteUrl = 'https://chronicreload.com';

  const staticRoutes = [
    { url: siteUrl, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/contact`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/categories`, lastModified: new Date().toISOString() },
  ];

  const postRoutes = posts.map(({ slug }) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date().toISOString(),
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
