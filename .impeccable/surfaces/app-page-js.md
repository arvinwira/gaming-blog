---
version: 1
slug: "app-page-js"
primary_target: "app/page.js"
related_targets: []
---

**Scope:** Whole homepage (`app/page.js`). Visitor mode: Persuade — a visitor decides which path (buying guide vs. news/discovery) to take and acts on it.

**Audience, job, action:** Two roughly equal audiences (buyers researching hardware; habitual news/discovery readers). Job: recognize within seconds which lane matches their intent and click real content from it.

**Proof/content:** Entirely real post data via `lib/posts.js` — no fabricated content, counts, or claims.

**Constraints:** DESIGN.md's visual identity (palette, type, components) stays fixed — this is a structural/compositional redesign, not an identity replacement. Category taxonomy, URL structure, and SEO metadata (JSON-LD block) are untouched. No `AdUnit`/`MultiplexAd` components currently exist in `app/page.js` — nothing to preserve there.

**Chosen direction (Split-Deck Router):** The dual-audience split becomes the page's literal first-viewport shape — two persistent lanes, Buying Guides (linen-tinted, leading/wider, hardware posts + hardware category quick-links) and News & Discovery (plain ground, games+news posts + game category quick-links), divided by a center spine. The full Explore-by-Category grid is *displaced*, not removed — it moves further down the page as a deeper "browse everything" utility, since the split-deck lanes now own first-viewport category routing. TrendingCarousel and Featured also move below the split-deck as supporting content. Memorable moment: the visitor's very first decision (which lane) is answered before any scrolling.

**Unresolved decisions:** Exact hero copy beyond the trim made during this build is still open for a future `clarify` pass. The gradient-text H1 treatment and ambient-glow decoration are untouched — still `polish`/`quieter` territory.
