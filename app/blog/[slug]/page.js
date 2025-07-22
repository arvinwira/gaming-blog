import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import { getPostData } from '@/lib/posts';
import { MDXContent } from '@/components/MDXcontent';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => ({
    slug: fileName.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const { frontmatter } = await getPostData(slug);

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
  };
}

export default async function Post({ params }) {
  const slug = params.slug;

  const { code, frontmatter } = await getPostData(slug);
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
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-3xl mx-auto flex flex-col gap-2">
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
        </header>

        {/* Post Content */}
        <div className="max-w-3xl mx-auto px-4 pb-16">
          <div className="prose dark:prose-invert prose-lg max-w-none">
            <MDXContent code={code} />
          </div>
        </div>
      </article>
    </>
  );
}