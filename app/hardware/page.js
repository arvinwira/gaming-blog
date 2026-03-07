// app/hardware/page.js
import Link from 'next/link';
import Image from 'next/image';
import { getPostsForHub, CATEGORY_META } from '@/lib/posts';
import Pagination from '@/components/Pagination';

export const metadata = {
    title: 'Hardware & Gear – PC Components, Peripherals, and Reviews | Chronic Reload',
    description: 'Upgrade your setup. Read our expert reviews and buying guides on the best gaming keyboards, mice, headsets, monitors, and PC components.',
};

export default function HardwareHub({ searchParams }) {
    const currentPage = Number(searchParams?.page) || 1;
    const { posts, subcategories, totalPages, totalPosts } = getPostsForHub('hardware', currentPage);

    // Group subcategories logically for better UX
    const hardwareCategories = ['Keyboards', 'Mouse', 'Headsets', 'Monitors', 'Controllers', 'PC', 'Budget'];

    return (
        <div className="bg-background min-h-screen text-foreground pt-24 overflow-x-hidden">

            {/* ──── Hub Hero Banner ──── */}
            <section className="relative py-20 bg-accent/30 border-b border-border">
                <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Hardware & Gear
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We test the latest gaming peripherals and PC components so you don&apos;t have to. Explore our in-depth reviews, curated buying guides, and setup recommendations.
                        </p>
                        <p className="text-sm text-foreground/70 mt-4 font-medium">{totalPosts} Hardware Guides</p>
                    </div>
                </div>
            </section>

            {/* ──── Discover Categories ──── */}
            <section className="py-16 border-b border-border bg-card/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Browse by Component</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {hardwareCategories.map(cat => {
                            const meta = CATEGORY_META[cat];
                            if (!meta) return null;
                            return (
                                <Link
                                    key={cat}
                                    href={`/hardware/${encodeURIComponent(cat)}`}
                                    className="p-5 bg-card border border-border/40 rounded-xl hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg transition-all flex items-start gap-4 h-full"
                                >
                                    <span className="text-3xl shrink-0 mt-1">{meta.icon}</span>
                                    <div>
                                        <span className="font-bold text-foreground block text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{cat}</span>
                                        <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{meta.description}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ──── Latest Hardware Reviews & Guides ──── */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold mb-10" style={{ fontFamily: 'var(--font-heading)' }}>Latest Hardware & Gear</h2>

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
