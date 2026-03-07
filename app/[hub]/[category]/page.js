// app/[hub]/[category]/page.js
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostsForCategory, CATEGORY_META } from '@/lib/posts';
import Pagination from '@/components/Pagination';

// Allow only valid hubs
const VALID_HUBS = ['games', 'hardware', 'news'];

export function generateStaticParams() {
    const params = [];
    Object.keys(CATEGORY_META).forEach(cat => {
        const hub = CATEGORY_META[cat].parent;
        if (hub && VALID_HUBS.includes(hub)) {
            params.push({ hub, category: cat });
        }
    });
    return params;
}

export function generateMetadata({ params }) {
    const cat = decodeURIComponent(params.category);
    const meta = CATEGORY_META[cat];
    return {
        title: `${cat} ${meta?.parent ? meta.parent.charAt(0).toUpperCase() + meta.parent.slice(1) : ''} – Reviews & Guides | Chronic Reload`,
        description: meta?.description || `Explore our comprehensive collection of ${cat} articles.`,
    };
}

// Get related sibling categories under the same hub
function getRelatedCategories(currentCat, hub) {
    return Object.keys(CATEGORY_META).filter(
        cat => CATEGORY_META[cat].parent === hub && cat !== currentCat
    );
}

export default function SubcategoryHub({ params, searchParams }) {
    const hub = params.hub.toLowerCase();

    if (!VALID_HUBS.includes(hub)) {
        notFound();
    }

    const categoryKey = decodeURIComponent(params.category);
    const currentPage = Number(searchParams?.page) || 1;
    const meta = CATEGORY_META[categoryKey];

    // If category doesn't exist in our meta or doesn't belong to this hub, 404
    if (!meta || meta.parent !== hub) {
        notFound();
    }

    const { posts, featured, totalPages, totalPosts } = getPostsForCategory(categoryKey, currentPage);
    const related = getRelatedCategories(categoryKey, hub);

    return (
        <div className="bg-background min-h-screen text-foreground pt-24 overflow-x-hidden">

            {/* ──── Breadcrumb ──── */}
            <div className="bg-accent/30 border-b border-border py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={`/${hub}`} className="hover:text-primary transition-colors capitalize">{hub}</Link>
                    <span>/</span>
                    <span className="text-foreground">{categoryKey}</span>
                </div>
            </div>

            {/* ──── Subcategory Hero Banner (SEO Optimized) ──── */}
            <section className="relative py-16 bg-accent/10 border-b border-border">
                <div className={`absolute top-0 right-0 -z-10 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 ${hub === 'games' ? 'bg-primary' : hub === 'hardware' ? 'bg-secondary' : 'bg-destructive'}`} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                            {meta.icon && <span className="mr-4 inline-block">{meta.icon}</span>}
                            {categoryKey} {hub === 'games' ? 'Games' : ''}
                        </h1>
                        <p className="text-muted-foreground mt-6 text-lg sm:text-xl leading-relaxed">
                            {meta.description}
                        </p>
                        <p className="text-sm text-foreground/70 mt-4 font-bold tracking-wider uppercase">{totalPosts} Articles</p>
                    </div>
                </div>
            </section>

            {/* ──── Top Guides & Featured Content ──── */}
            {featured.length > 0 && (
                <section className="py-16 bg-card/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                            Top Guides & Reviews
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featured.map(post => (
                                <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
                                    <div className="h-full bg-card shadow-sm border border-border/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 flex flex-col">
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image src={post.coverImage} fill alt={post.title} className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                                            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ──── Related Hub Topics ──── */}
            {related.length > 0 && (
                <section className="py-10 bg-accent/30 border-y border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-lg font-bold text-foreground mb-6 uppercase tracking-wider text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                            More in {hub}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {related.map(cat => {
                                const catMeta = CATEGORY_META[cat] || {};
                                return (
                                    <Link
                                        key={cat}
                                        href={`/${hub}/${encodeURIComponent(cat)}`}
                                        className="px-5 py-2.5 bg-card border border-border/40 rounded-full font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm flex items-center gap-2"
                                    >
                                        {catMeta.icon && <span>{catMeta.icon}</span>}
                                        {cat}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ──── Latest Articles Grid ──── */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                        Latest {categoryKey} Articles
                    </h2>

                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-card shadow-md rounded-3xl overflow-hidden border border-border/40 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image src={post.coverImage} fill alt={post.title} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                                        <div className="pt-4 border-t border-border mt-auto flex justify-between items-center text-sm font-medium text-muted-foreground">
                                            <span>{post.date || 'Unknown Date'}</span>
                                            <span className="text-primary group-hover:translate-x-1 transition-transform">Read article →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-card rounded-3xl border border-border/40">
                            <h3 className="text-2xl font-bold text-foreground">No articles found</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for new content in this category.</p>
                        </div>
                    )}

                    <div className="mt-12">
                        <Pagination currentPage={currentPage} totalPages={totalPages} />
                    </div>
                </div>
            </section>
        </div>
    );
}
