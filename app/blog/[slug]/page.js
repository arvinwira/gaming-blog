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

const postsDirectory = path.join(process.cwd(), 'posts');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => ({
    slug: fileName.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params: { slug } }) {
  const { frontmatter } = await getPostData(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
  };
}

export default async function Post({ params: { slug } }) {
  const { code, frontmatter } = await getPostData(slug);

  const { posts: allPosts } = getPosts();
  const morePosts = allPosts.filter(post => post.slug !== slug).slice(0, 3);

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  const stats = readingTime(content);

  return (
    <>
      <ReadingProgressBar />
      <article className="bg-background text-foreground pb-12 pt-24">
        {/* Full Width Hero Section */}
        <header className="relative w-full min-h-[500px] md:min-h-[70vh] mb-16 shadow-2xl flex flex-col justify-center">
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
          {/* Post Content */}
          <div className="lg:w-[70%] xl:w-[75%]">
            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-heading prose-a:text-primary hover:prose-a:text-secondary">
              <MDXContent code={code} />
            </div>
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
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group block glass rounded-[2rem] overflow-hidden border border-border/50 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-300">
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
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