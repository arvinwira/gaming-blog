import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    };
  });

  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function BlogHome() {
  const allPosts = getPosts();

  const trendingPost = allPosts[0];
  const featuredPosts = allPosts.filter(post => post.featured).slice(0, 3);
  const recentPosts = allPosts.slice(1, 5);

  return (
    <div className="bg-background text-primary">
      {/* Hero Section - Trending Post */}
      <section className="relative h-96">
        <Image
          src={trendingPost.coverImage}
          alt={trendingPost.title}
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 bg-background/70">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{trendingPost.title}</h1>
            <p className="text-lg md:text-xl mb-6 text-muted-foreground">{trendingPost.excerpt}</p>
            <Link href={`/blog/${trendingPost.slug}`} className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-left mb-10">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="block bg-card rounded-lg overflow-hidden shadow-secondary hover:scale-105 transition-transform duration-300 border border-border">
                <Image src={post.coverImage} alt={post.title} width={400} height={250} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
<section className="py-16 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-left mb-10">Recent Posts</h2>
    <div className="space-y-8 max-w-3xl mx-auto">
      {recentPosts.map(post => (
         <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
           <div className="flex items-center space-x-6 p-4 rounded-lg bg-card shadow-secondary hover:scale-105 transition-transform duration-300 border border-border">
               <div className="flex-shrink-0">
                  <Image src={post.coverImage} alt={post.title} width={150} height={100} className="rounded-md object-cover"/>
               </div>
               <div>
               <span className="text-secondary text-sm font-semibold">{post.categories.join(' • ')}</span>
               <h3 className="text-xl font-bold mt-1 group-hover:underline">{post.title}</h3>
               <p className="text-muted-foreground text-sm mt-2">{post.excerpt}</p>
               </div>
           </div>
         </Link>
       ))}
    </div>
    <div className="text-center mt-12">
      <Link href="/categories" className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
        View All Posts
      </Link>
    </div>
  </div>
</section>
    </div>
  );
}