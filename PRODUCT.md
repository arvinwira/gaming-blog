# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two roughly equal audiences: (1) buyers researching gear — laptops, monitors, keyboards, mice — who land via a "best X for budget Y" search and want a trustworthy guide before spending money; (2) habitual news/trend followers who check in for gaming news, upcoming releases, and industry updates without a single purchase in mind. Design and content must serve both without one crowding out the other.

## Product Purpose

Chronic Reload is a gaming news and reviews blog. Its stated mission (About page) is to be a "trusted filter" in a sea of endless releases and overwhelming news — honest reviews, insightful guides, and timely news that respect the reader's time. Success is a reader trusting a buying recommendation enough to click through, or returning as a habitual reader for news.

## Positioning

Confirmed: no strong differentiation from other gaming/hardware content sites exists yet — this is a fairly standard affiliate/ad-supported content blog covering the same "best gaming laptop 2026" style topics as competitors. Do not invent a stronger competitive claim than this in future work; if a real differentiator emerges later, update this section.

## Operating Context

Content is authored as Markdown/MDX files in `/posts` and rendered through Next.js MDX pipeline (mdx-bundler, rehype-pretty-code, rehype-slug, rehype-autolink-headings). Site sections: home, blog (post listing + `[slug]`), a flat `/categories` browse-and-filter page, and three top-level content hubs — `games`, `hardware`, `news` — each with its own `/[hub]/[category]` subcategory routes driven by a shared `CATEGORY_META` taxonomy in `lib/posts.js` (e.g. games → RPG, FPS, Roguelike, Cozy Games, Soulslike…; hardware → Keyboards, Mouse, Monitors, Laptops, Budget…; news → News, Upcoming). Plus about, contact, privacy-policy, terms-and-conditions. Analytics/telemetry: Vercel Analytics, Google Analytics 4, Microsoft Clarity. Content is also promoted via IndexNow submission (`submit-indexnow.js`) and a real `public/llms.txt` file for AI discoverability.

## Capabilities and Constraints

- Ad + affiliate revenue is core to the business: Google AdSense (`AdUnit.js`, `MultiplexAd.js`) plus affiliate links inside hardware buying-guide posts. Ad and affiliate placements are revenue-critical and must remain viable in any layout change.
- SEO/taxonomy structure is deliberate, confirmed-load-bearing infrastructure: sitemap generation (`next-sitemap`), the three-hub taxonomy (`games` / `hardware` / `news`) with shared `CATEGORY_META` subcategories, the separate flat `/categories` browse page, canonical/OpenGraph/Twitter metadata templates in `app/layout.js`, and `public/llms.txt`. Don't casually restructure URLs, hubs, categories, or metadata patterns.
- Editorial honesty constraint: the About page explicitly states the authors are "lifelong gamers," not journalists — copy and design must not imply lab-tested benchmarks, credentialed review methodology, or claims the site doesn't back up.
- Light/dark theme via `next-themes` with an animated theme switcher; reader preference is persisted.
- Newsletter signup exists (`NewsletterForm.js`).

## Brand Commitments

Name: "Chronic Reload." Tagline used in metadata: "Your Gaming News Hub" / "Your source for gaming news & media." Fonts already committed in `app/layout.js`: Space Grotesk (sans/body), Outfit (headings), JetBrains Mono (mono). Logo asset at `/logo.png`.

## Evidence on Hand

Existing shipped site with real content: dozens of live posts in `/posts` covering gaming news, game guides/recommendations, and hardware buying guides (laptops, monitors, keyboards, mice, headsets). No formal case studies, testimonials, or press mentions on hand — future work must not fabricate any.

## Product Principles

1. Serve both buyer-intent and browsing-intent readers on equal footing — don't optimize the whole site around one at the expense of the other.
2. Preserve monetization surfaces (ad units, affiliate links) and SEO infrastructure (URLs, categories, metadata, sitemap) as load-bearing, not incidental.
3. Never claim more editorial authority (lab testing, journalism credentials, benchmarks) than the site actually has.
4. Respect committed brand identity (name, fonts, logo) rather than treating it as open for casual replacement.
