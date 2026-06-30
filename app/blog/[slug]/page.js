import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import { getPosts, getPostData } from '@/lib/posts';
import { MDXContent } from '@/components/MDXcontent';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';
import readingTime from 'reading-time';
import Script from 'next/script';
import ShareButtons from '@/components/ShareButtons';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => ({
    slug: fileName.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { frontmatter } = await getPostData(slug);
  const imageUrl = frontmatter.coverImage.startsWith('http')
    ? frontmatter.coverImage
    : `https://chronicreload.com${frontmatter.coverImage}`;

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url: `https://chronicreload.com/blog/${slug}`,
      siteName: "Chronic Reload",
      images: [
        {
          url: imageUrl,
          alt: frontmatter.title,
        }
      ],
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const { code, frontmatter } = await getPostData(slug);

  const { posts: allPosts } = getPosts();
  const morePosts = allPosts.filter(post => post.slug !== slug).slice(0, 3);

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  const stats = readingTime(content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://chronicreload.com/blog/${slug}`
    },
    "headline": frontmatter.title,
    "description": frontmatter.excerpt,
    "image": frontmatter.coverImage.startsWith('http') ? frontmatter.coverImage : `https://chronicreload.com${frontmatter.coverImage}`,
    "datePublished": frontmatter.date,
    "author": {
      "@type": "Person",
      "name": frontmatter.author || "Chronic Reload Writer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Chronic Reload",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chronicreload.com/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgressBar />
      <article className="bg-background text-foreground pb-12 pt-24">
        {/* Full Width Hero Section */}
        <header className="relative w-full min-h-[60vh] sm:min-h-[500px] md:min-h-[70vh] mb-16 shadow-2xl flex flex-col justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={frontmatter.coverImage}
              alt={`Cover image for ${frontmatter.title}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
          </div>

          {/* Added responsive pt-32 to pt-48 so the content always starts below the sticky header */}
          <div className="relative z-10 w-full flex flex-col justify-center items-center pt-32 lg:pt-48 pb-16">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
                <h1 className=" text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms', fontFamily: 'var(--font-heading)' }}>
                  {frontmatter.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up mt-4">
                  {frontmatter.categories.map((cat) => (
                    <Link
                      key={cat}
                      href="/categories"
                      className="text-primary-foreground bg-primary px-4 py-1.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-md"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-white/90 mt-6 font-medium text-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <span className="flex items-center gap-2">
                    {frontmatter.author}
                  </span>
                  <span className="opacity-50">•</span>
                  <span>{frontmatter.date}</span>
                  <span className="opacity-50">•</span>
                  <span>{stats.text}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:flex lg:gap-16">
          {/* Mobile/Tablet: Collapsible TOC above content */}
          <div className="lg:hidden mb-8">
            <details className="bg-card border border-border/50 rounded-2xl overflow-hidden group">
              <summary className="px-5 py-4 font-bold text-primary cursor-pointer flex items-center justify-between select-none" style={{ fontFamily: 'var(--font-heading)' }}>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Navigate this article
                </span>
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4">
                <TableOfContents />
              </div>
            </details>
          </div>

          {/* Post Content */}
          <div className="lg:w-[70%] xl:w-[75%]">
            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-heading prose-a:text-primary hover:prose-a:text-secondary">
              <MDXContent code={code} />
            </div>
            <ShareButtons title={frontmatter.title} url={`https://chronicreload.com/blog/${slug}`} />
          </div>

          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:w-[30%] xl:w-[25%] relative">
            <div className="sticky top-28 glass p-6 rounded-3xl border border-border/50 shadow-xl max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <TableOfContents />
            </div>
          </aside>
        </div>

        {/* More Posts */}
        <section className="py-20 bg-accent/20 border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>You May Also Like</h2>
              <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {morePosts.map(post => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group block h-full">
                  <div className="h-full bg-card shadow-md border border-border/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 flex flex-col">
                    <div className="relative w-full h-56 overflow-hidden">
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 flex-grow">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}