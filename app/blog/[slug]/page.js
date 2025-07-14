import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';
import ReadingProgressBar from '@/components/ReadingProgressBar';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => ({ slug: fileName.replace(/\.md$/, '') }));
}

async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Add reading time
  const stats = readingTime(content);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
  
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    stats,
    ...data,
  };
}

export async function generateMetadata({ params }) {
  const postData = await getPostData(params.slug);
  return {
    title: postData.title,
    description: postData.excerpt,
  };
}

export default async function Post({ params }) {
  const postData = await getPostData(params.slug);

  return (
    <>
      <ReadingProgressBar />
      <article className="bg-background text-foreground">
        {/* Hero Section */}
        <header className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden mb-12 shadow-lg">
          <Image 
            src={postData.coverImage} 
            alt={`Cover image for ${postData.title}`} 
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
                {postData.categories.map((cat) => (
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
                {postData.title}
              </h1>
              <div className="flex items-center gap-4 text-primary mt-2 font-sans">
                <span>{postData.date}</span>
                <span>•</span>
                <span>{postData.stats.text}</span>
              </div>
            </div>
          </div>
        </header>


        {/* Post Content */}
        <div className="max-w-3xl mx-auto px-4 pb-16">
          <div
            className="prose dark:prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </article>
    </>
  );
}