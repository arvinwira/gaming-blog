import Link from 'next/link';
import Image from 'next/image';
import {
  getTrendingPosts,
  getFeaturedPosts,
  getEditorsPicks,
  getPostsByPillar,
  getLatestPosts,
  getCategoryCounts,
  HIERARCHICAL_CATEGORIES,
  CATEGORY_META,
} from '@/lib/posts';
import TrendingCarousel from '@/components/TrendingCarousel';

// ─── Reusable article card (vertical) ────────────────────────────
function ArticleCard({ post, priority = false }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="h-full bg-card shadow-md border border-border/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 flex flex-col">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            fill
            alt={post.title}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex gap-2 mb-3 flex-wrap">
            {post.categories?.slice(0, 2).map(cat => (
              <span key={cat} className="text-xs font-bold uppercase tracking-wider text-secondary">
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
          <div className="pt-4 border-t border-border mt-auto flex justify-between items-center text-sm font-medium text-muted-foreground">
            <span>{post.date}</span>
            <span className="text-primary group-hover:translate-x-1 transition-transform">Read article →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Reusable horizontal article card ────────────────────────────
function HorizontalCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="flex flex-col sm:flex-row bg-card shadow-md border border-border/40 p-3 sm:p-5 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50">
        <div className="w-full sm:w-1/3 relative h-48 sm:h-auto min-h-[140px] overflow-hidden rounded-2xl flex-shrink-0">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col justify-center py-2 flex-grow">
          <span className="text-secondary text-xs uppercase tracking-wider font-bold mb-2">
            {post.categories && post.categories.join(' • ')}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {post.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">{post.excerpt}</p>
          <div className="mt-3 text-sm font-medium text-muted-foreground">{post.date}</div>
        </div>
      </div>
    </Link>
  );
}

// ─── Section header helper ───────────────────────────────────────
function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
      <div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-primary font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {title}
        </h2>
        {subtitle && <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>}
      </div>
      {action && (
        <Link href={action.href} className="text-primary font-semibold text-sm hover:underline whitespace-nowrap">
          {action.label} →
        </Link>
      )}
    </div>
  );
}

// ─── Featured game categories (given visual weight) ─────────────
const GAMES_CATEGORIES = [
  { label: 'RPG', key: 'RPG' },
  { label: 'Indie', key: 'Indie' },
  { label: 'Multiplayer', key: 'Multiplayer' },
  { label: 'Survival', key: 'Survival' },
  { label: 'Horror', key: 'Horror' },
  { label: 'Cozy Games', key: 'Cozy Games' },
  { label: 'Roguelike', key: 'Roguelike' },
  { label: 'Free To Play', key: 'Free To Play' },
];

const HARDWARE_CATEGORIES = [
  { label: 'Gaming Laptops', key: 'Laptops' },
  { label: 'Monitors', key: 'Monitors' },
  { label: 'Keyboards', key: 'Keyboards' },
  { label: 'Headsets', key: 'Headsets' },
  { label: 'Controllers', key: 'Controllers' },
  { label: 'Budget Gear', key: 'Budget' },
];

// ═════════════════════════════════════════════════════════════════
// HOMEPAGE
// ═════════════════════════════════════════════════════════════════
export default function BlogHome() {
  const trendingPosts = getTrendingPosts(3);
  const featuredPosts = getFeaturedPosts(3);
  const editorsPicks = getEditorsPicks(4);
  const hardwarePosts = getPostsByPillar('Hardware & Gear', 4);
  const gameDiscoveryPosts = getPostsByPillar('Games', 4);

  // Collect slugs already shown to avoid duplication in Latest
  const shownSlugs = [
    ...trendingPosts, ...featuredPosts, ...editorsPicks,
  ].map(p => p.slug);
  const latestPosts = getLatestPosts(6, shownSlugs);

  const counts = getCategoryCounts();

  return (
    <div className="bg-background text-primary pt-24 overflow-x-hidden">

      {/* ──── 1. HERO — Trending Carousel ──── */}
      <TrendingCarousel slides={trendingPosts} />


      {/* ──── 2. TRENDING NOW ──── */}
      {featuredPosts.length > 0 && (
        <section className="py-16 relative">
          <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Featured" subtitle="Hand-picked by our editors" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ──── 3. EXPLORE BY CATEGORY ──── */}
      <section className="py-16 bg-accent/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Explore by Category" subtitle="Browse games, hardware, and guides by topic" />

          {/* Games Subsection */}
          <div className="mb-16">
            <div className="flex justify-between items-end mb-6 pb-2 border-b border-border/40">
              <h3 className="text-lg font-bold text-foreground uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                Games
              </h3>
              <Link href="/games" className="text-primary font-semibold text-sm hover:underline whitespace-nowrap mb-1">
                View all game categories →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {GAMES_CATEGORIES.map(cat => {
                const count = counts[cat.key] || 0;
                return (
                  <Link
                    key={cat.key}
                    href={`/games/${encodeURIComponent(cat.key)}`}
                    className="flex justify-between items-center py-2.5 px-4 bg-card/50 hover:bg-card border border-border/30 hover:border-primary/40 rounded-xl transition-all duration-200 group text-foreground"
                  >
                    <span className="font-semibold text-foreground/90 group-hover:text-primary transition-colors text-sm sm:text-base">
                      {cat.label}
                    </span>
                    <span className="text-muted-foreground/60 text-xs font-mono group-hover:text-foreground/80 transition-colors">
                      ({count})
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Hardware Subsection */}
          <div>
            <div className="flex justify-between items-end mb-6 pb-2 border-b border-border/40">
              <h3 className="text-lg font-bold text-foreground uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                Hardware
              </h3>
              <Link href="/hardware" className="text-primary font-semibold text-sm hover:underline whitespace-nowrap mb-1">
                View all hardware →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {HARDWARE_CATEGORIES.map(cat => {
                const count = counts[cat.key] || 0;
                return (
                  <Link
                    key={cat.key}
                    href={`/hardware/${encodeURIComponent(cat.key)}`}
                    className="flex justify-between items-center py-2.5 px-4 bg-card/50 hover:bg-card border border-border/30 hover:border-primary/40 rounded-xl transition-all duration-200 group text-foreground"
                  >
                    <span className="font-semibold text-foreground/90 group-hover:text-primary transition-colors text-sm sm:text-base">
                      {cat.label}
                    </span>
                    <span className="text-muted-foreground/60 text-xs font-mono group-hover:text-foreground/80 transition-colors">
                      ({count})
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ──── 4. GAME DISCOVERY GUIDES ──── */}
      {gameDiscoveryPosts.length > 0 && (
        <section className="py-24 relative">
          <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Game Discovery Guides" subtitle="Popular curated game recommendations" action={{ label: 'View All Games', href: '/games' }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameDiscoveryPosts.map(post => (
                <HorizontalCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ──── 5. HARDWARE & GEAR PICKS ──── */}
      {hardwarePosts.length > 0 && (
        <section className="py-16 bg-accent/30 border-y border-border relative">
          <div className="absolute top-10 right-10 -z-10 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Hardware & Gear Picks" subtitle="Top hardware guides and buying advice" action={{ label: 'All Hardware', href: '/hardware' }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {hardwarePosts.map(post => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ──── 6. EDITOR'S PICKS / HIDDEN GEMS ──── */}
      {editorsPicks.length > 0 && (
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Editor's Picks" subtitle="Hidden gems handpicked from our archive" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {editorsPicks.map(post => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ──── 7. LATEST ARTICLES ──── */}
      <section className="py-24 bg-accent/30 rounded-t-[3rem] border-t border-border relative">
        <div className="absolute top-20 left-0 -z-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Latest Articles" subtitle="Fresh content from the gaming world" action={{ label: 'View All Articles', href: '/categories' }} />

          <div className="space-y-6 max-w-4xl mx-auto">
            {latestPosts.map(post => (
              <HorizontalCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/categories" className="inline-flex py-4 px-8 bg-card text-foreground border border-border rounded-full font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
              View All Articles
            </Link>
          </div>
        </div>
      </section>


      {/* ──── 8. FIND YOUR NEXT GAME — Discovery Section ──── */}
      <section className="py-20 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header — centered */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-primary mb-3">Game Discovery</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Find Your Next Game
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              Not sure what to play? Browse by mood, genre, or session length.
            </p>
          </div>

          {/* Tag grid */}
          <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-lg">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { label: 'Relaxing Games', href: '/blog/relaxing-games-no-combat' },
                { label: 'Hidden Indie Gems', href: '/games/Hidden%20Gem' },
                { label: 'Roguelikes', href: '/games/Roguelike' },
                { label: 'Weekend Games', href: '/blog/short-single-player-games-you-can-finish-in-one-weekend' },
                { label: 'Multiplayer', href: '/games/Multiplayer' },
                { label: 'Cozy Games', href: '/games/Cozy%20Games' },
                { label: 'Free To Play', href: '/games/Free%20To%20Play' },
                { label: 'Survival', href: '/games/Survival' },
              ].map(tag => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="px-5 py-2.5 rounded-full font-semibold text-sm text-foreground bg-accent/60 border border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center border-t border-border pt-6">
              <Link
                href="/games"
                className="inline-flex items-center gap-2 py-3 px-8 bg-primary text-primary-foreground font-bold rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
              >
                Browse all games
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}