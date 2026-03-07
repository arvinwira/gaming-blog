// app/categories/[category]/page.js
import Link from 'next/link';
import Image from 'next/image';
import {
    getPostsForCategory,
    HIERARCHICAL_CATEGORIES,
    CATEGORY_META,
} from '@/lib/posts';
import Pagination from '@/components/Pagination';

// ─── Generate static params for all known categories ─────────────
export function generateStaticParams() {
    const params = [];
    // Main categories
    Object.keys(HIERARCHICAL_CATEGORIES).forEach(main => {
        params.push({ category: main });
        HIERARCHICAL_CATEGORIES[main].forEach(sub => {
            params.push({ category: sub });
        });
    });
    return params;
}

// ─── Dynamic metadata ────────────────────────────────────────────
export async function generateMetadata({ params }) {
    const { category } = await params;
    const cat = decodeURIComponent(category);
    const meta = CATEGORY_META[cat];
    return {
        title: `${cat} – Chronic Reload`,
        description: meta?.description || `Browse all ${cat} articles on Chronic Reload.`,
    };
}

// ─── Related sub-categories for sidebar navigation ──────────────
function getRelatedCategories(categoryKey) {
    // If it's a main category, return its children
    if (HIERARCHICAL_CATEGORIES[categoryKey]) {
        return HIERARCHICAL_CATEGORIES[categoryKey];
    }
    // If it's a sub-category, find its parent and siblings
    for (const [parent, subs] of Object.entries(HIERARCHICAL_CATEGORIES)) {
        if (subs.includes(categoryKey)) {
            return subs.filter(s => s !== categoryKey);
        }
    }
    return [];
}

export default async function CategoryHubPage({ params, searchParams }) {
    const { category } = await params;
    const resolvedSearchParams = await searchParams;
    const categoryKey = decodeURIComponent(category);
    const currentPage = Number(resolvedSearchParams?.page) || 1;
    const meta = CATEGORY_META[categoryKey] || {};
    const { posts, featured, totalPages, totalPosts } = getPostsForCategory(categoryKey, currentPage);
    const related = getRelatedCategories(categoryKey);

    return (
        <div className="bg-background min-h-screen text-foreground pt-24 overflow-x-hidden">

            {/* ──── Category Hero Banner ──── */}
            <section className="relative py-20 bg-accent/30 border-b border-border">
                <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {meta.icon && <span className="text-6xl mb-4 block">{meta.icon}</span>}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                        {categoryKey}
                    </h1>
                    <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                        {meta.description || `Discover the best ${categoryKey} content on Chronic Reload.`}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{totalPosts} article{totalPosts !== 1 ? 's' : ''}</p>
                </div>
            </section>


            {/* ──── Featured Articles in Category ──── */}
            {featured.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                            Top in {categoryKey}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featured.map(post => (
                                <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
                                    <div className="h-full bg-card shadow-md border border-border/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 flex flex-col">
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <Image src={post.coverImage} fill alt={post.title} className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex gap-2 mb-3 flex-wrap">
                                                {post.categories?.slice(0, 2).map(cat => (
                                                    <span key={cat} className="text-xs font-bold uppercase tracking-wider text-secondary">{cat}</span>
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
                    </div>
                </section>
            )}


            {/* ──── Related Subtopics ──── */}
            {related.length > 0 && (
                <section className="py-12 bg-accent/30 border-y border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Related Topics
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {related.map(cat => {
                                const catMeta = CATEGORY_META[cat] || {};
                                return (
                                    <Link
                                        key={cat}
                                        href={`/categories/${encodeURIComponent(cat)}`}
                                        className="px-5 py-2.5 bg-card border border-border/40 rounded-full font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 text-sm flex items-center gap-2"
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


            {/* ──── All Posts in Category (paginated grid) ──── */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                        All {categoryKey} Articles
                    </h2>

                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-card shadow-md rounded-3xl overflow-hidden border border-border/40 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image src={post.coverImage} fill alt={post.title} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.categories?.slice(0, 2).map(cat => (
                                                <span key={cat} className="text-xs font-bold uppercase tracking-wider text-secondary">{cat}</span>
                                            ))}
                                        </div>
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
                        <div className="text-center py-16">
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
