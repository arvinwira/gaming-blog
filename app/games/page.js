// app/games/page.js
import Link from 'next/link';
import Image from 'next/image';
import { getPostsForHub, CATEGORY_META } from '@/lib/posts';
import Pagination from '@/components/Pagination';

export const metadata = {
    title: 'Games – Reviews, Guides, and Recommendations | Chronic Reload',
    description: 'The ultimate database for finding your next favorite game. Browse top lists, new releases, cozy games, hidden indie gems, and comprehensive gaming reviews.',
};

export default function GamesHub({ searchParams }) {
    const currentPage = Number(searchParams?.page) || 1;
    const { posts, subcategories, totalPages, totalPosts } = getPostsForHub('games', currentPage);

    // Group subcategories logically for better UX
    const popularGenres = ['FPS', 'RPG', 'Multiplayer', 'Indie', 'Cozy Games', 'Survival', 'Horror', 'Free To Play'];

    return (
        <div className="bg-background min-h-screen text-foreground pt-24 overflow-x-hidden">

            {/* ──── Hub Hero Banner ──── */}
            <section className="relative py-20 bg-accent/30 border-b border-border">
                <div className="absolute top-0 left-0 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Explore Games
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Find your next favorite game. We review, curate, and categorize the best video games so you spend less time searching and more time playing. Explore top multiplayer hits, relaxing cozy adventures, deep RPGs, and hidden indie gems.
                        </p>
                        <p className="text-sm text-foreground/70 mt-4 font-medium">{totalPosts} Articles Available</p>
                    </div>
                </div>
            </section>

            {/* ──── Discover Genres (Structured Navigation) ──── */}
            <section className="py-12 border-b border-border bg-card/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Browse by Genre</h2>
                    <div className="flex flex-wrap gap-3">
                        {popularGenres.map(cat => (
                            <Link
                                key={cat}
                                href={`/games/${encodeURIComponent(cat)}`}
                                className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border/40 rounded-lg hover:text-primary hover:border-primary/30 transition-colors"
                            >
                                {cat}
                            </Link>
                        ))}
                        <Link
                            href="/categories"
                            className="px-4 py-2 text-sm font-medium text-primary hover:underline"
                        >
                            View all genres →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ──── Latest Gaming Articles ──── */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold mb-10" style={{ fontFamily: 'var(--font-heading)' }}>Latest in Games</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group block h-full">
                                <div className="bg-card h-full shadow-md rounded-3xl overflow-hidden border border-border/40 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 flex flex-col">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image src={post.coverImage} fill alt={post.title} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.categories?.slice(0, 2).map(c => (
                                                <span key={c} className="text-xs font-bold uppercase tracking-wider text-secondary">{c}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                                        <div className="pt-4 border-t border-border mt-auto flex justify-between items-center text-sm font-medium text-muted-foreground">
                                            <span>{post.date}</span>
                                            <span className="text-primary group-hover:translate-x-1 transition-transform">Read article →</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Pagination currentPage={currentPage} totalPages={totalPages} />
                    </div>

                </div>
            </section>

        </div>
    );
}
