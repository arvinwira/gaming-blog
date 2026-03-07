// app/news/page.js
import Link from 'next/link';
import Image from 'next/image';
import { getPostsForHub, CATEGORY_META } from '@/lib/posts';
import Pagination from '@/components/Pagination';

export const metadata = {
    title: 'Gaming News & Upcoming Releases | Chronic Reload',
    description: 'Stay up to date with the latest gaming industry news, upcoming game release dates, developer interviews, and patch notes.',
};

export default function NewsHub({ searchParams }) {
    const currentPage = Number(searchParams?.page) || 1;
    const { posts, subcategories, totalPages, totalPosts } = getPostsForHub('news', currentPage);

    const newsCategories = ['News', 'Upcoming'];

    return (
        <div className="bg-background min-h-screen text-foreground pt-24 overflow-x-hidden">

            {/* ──── Hub Hero Banner ──── */}
            <section className="relative py-20 bg-accent/30 border-b border-border">
                <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] translate-x-1/2" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Gaming News
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Tracking the pulse of the gaming industry. Explore our coverage of upcoming game releases, major announcements, and industry updates.
                        </p>
                        <p className="text-sm text-foreground/70 mt-4 font-medium">{totalPosts} News Articles</p>
                    </div>
                </div>
            </section>

            {/* ──── Discover Categories ──── */}
            <section className="py-12 border-b border-border bg-card/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-6">
                        {newsCategories.map(cat => {
                            const meta = CATEGORY_META[cat];
                            if (!meta) return null;
                            return (
                                <Link
                                    key={cat}
                                    href={`/news/${encodeURIComponent(cat)}`}
                                    className="px-6 py-4 bg-card border border-border/40 rounded-xl hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg transition-all flex items-center gap-3 flex-grow max-w-[400px]"
                                >
                                    <span className="text-3xl">{meta.icon}</span>
                                    <div>
                                        <span className="font-bold text-foreground block text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{cat}</span>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{meta.description}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ──── Latest News Feed ──── */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold mb-10" style={{ fontFamily: 'var(--font-heading)' }}>Latest Updates</h2>

                    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                        {posts.map(post => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                                <div className="flex flex-col sm:flex-row bg-card shadow-md border border-border/40 p-4 sm:p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50">
                                    <div className="w-full sm:w-[250px] relative h-48 sm:h-auto overflow-hidden rounded-2xl flex-shrink-0">
                                        <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col justify-center flex-grow">
                                        <span className="text-secondary text-xs uppercase tracking-wider font-bold mb-2">
                                            {post.categories && post.categories.join(' • ')}
                                        </span>
                                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground line-clamp-2 text-sm">{post.excerpt}</p>
                                        <div className="mt-4 text-sm font-medium text-muted-foreground">{post.date}</div>
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
