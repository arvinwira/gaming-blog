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
import ShareThisInitializer from '@/components/Sharethis';

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

  const allPosts = getPosts();
  const morePosts = allPosts.filter(post => post.slug !== slug).slice(0, 3);

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  const stats = readingTime(content);

  return (
    <>
      <ReadingProgressBar />
      <article className="bg-background text-foreground">
        {/* Hero Section */}
        <header className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden mb-12 shadow-lg">
          <Image
            src={frontmatter.coverImage}
            alt={`Cover image for ${frontmatter.title}`}
            layout="fill"
            objectFit="cover"
            className="opacity-90"
            priority
          />
       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          {/* This container is now constrained to match the page width */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                {frontmatter.categories.map((cat) => (
                  <Link
                    key={cat}
                    href="/categories"
                    className="text-secondary font-semibold text-lg hover:underline"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mt-2 font-sans text-primary">
                {frontmatter.title}
              </h1>
              <div className="flex items-center gap-4 text-primary mt-2 font-sans">
                <span>{frontmatter.date}</span>
                <span>•</span>
                <span>{stats.text}</span>
              </div>
            </div>
          </div>
         </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 mb-12 overflow-visible">
          <div className="sharethis-inline-share-buttons"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16 lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Post Content */}
          <div className="lg:col-span-3">
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <MDXContent code={code} />
            </div>
          </div>

          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <TableOfContents />
          </aside>
        </div>
        
        <div className="sharethis-inline-reaction-buttons"></div>
        
        <ShareThisInitializer /> 

        <Script
          src="https://platform-api.sharethis.com/js/sharethis.js#property=6881d61da47aa2d32eac58ce&product=inline-share-buttons&source=platform"
          strategy="afterInteractive"
        />

        {/* More Posts */}
        <section className="py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-left mb-10">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {morePosts.map(post => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="block group bg-card rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 border border-border">
                  <Image src={post.coverImage} alt={post.title} width={400} height={250} className="w-full h-48 object-cover"/>
                  <div className="p-6">
                    <h3 className="text-xl text-primary font-semibold mb-2 group-hover:underline">{post.title}</h3>
                    <p className="text-muted-foreground text-sm">{post.excerpt}</p>
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