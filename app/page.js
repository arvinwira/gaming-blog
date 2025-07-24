import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/posts'; 


export default function BlogHome() {
  const allPosts = getPosts();

  let trendingPost = allPosts.find(post => post.trending) || allPosts[0];
  
  const featuredPosts = allPosts.filter(post => post.featured).slice(0, 3);
  
  const recentPosts = allPosts.filter(post => post.slug !== trendingPost.slug).slice(0, 4);


  return (
    <div className="bg-background text-primary">
      {/* Hero Section - Trending Post */}
      <Link href={`/blog/${trendingPost.slug}`} className="block group ">
      <section className="relative w-full max-w-6xl mx-auto my-8 rounded-3xl shadow-2xl shadow-secondary overflow-hidden h-[500px] transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
        <Image
          src={trendingPost.coverImage}
          alt={trendingPost.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center h-full text-white">
          <div className="text-sm font-semibold mb-2 inline-block">
            Trending
          </div>
          <h1 className="text-3xl text-primary md:text-5xl font-bold mb-4 max-w-2xl group-hover:underline">
            {trendingPost.title}
          </h1>
          <p className="text-lg max-w-2xl">
            {trendingPost.excerpt}
          </p>
        </div>
      </section>
    </Link>


      {/* Featured Posts Section */}
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-left mb-10">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block group bg-card rounded-lg overflow-hidden shadow-secondary hover:scale-105 transition-transform duration-300 border border-border">
              <Image src={post.coverImage} alt={post.title} width={400} height={250} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:underline">{post.title}</h3>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 p-4 rounded-lg bg-card shadow-secondary hover:scale-105 transition-transform duration-300 border border-border">
              <div className="flex-shrink-0">
                  <Image src={post.coverImage} alt={post.title} width={150} height={100} className="rounded-md object-cover w-full h-48 sm:w-[150px] sm:h-[100px]"/>
              </div>
              <div className="mt-4 sm:mt-0">
              {/* 3. This line now safely checks if categories exist */}
              <span className="text-secondary text-sm font-semibold">
                {post.categories && post.categories.join(' • ')}
              </span>
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