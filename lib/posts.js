// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const postsDirectory = path.join(process.cwd(), 'posts');
const POSTS_PER_PAGE = 9;

// hierarchical category structure
export const HIERARCHICAL_CATEGORIES = {
  'Games': [
    'Co-op',
    'Cozy Games',
    'FPS',
    'Free To Play',
    'Hidden Gem',
    'Horror',
    'Indie',
    'Mobile Games',
    'Multiplayer',
    'Puzzle',
    'Racing',
    'Real Time Strategy',
    'Roblox',
    'Roguelike',
    'RPG',
    'Simulator',
    'Singleplayer',
    'Soulslike',
    'Steam',
    'Survival'
  ],
  'News': [
    'News',
    'Upcoming'
  ],
  'Hardware & Gear': [
    'Budget',
    'Headsets',
    'Keyboards',
    'Monitors',
    'Mouse',
    'Controllers',
    'PC',
    'Laptops'
  ]
};

// Category display metadata for the Explore by Category grid and Hub Pages
export const CATEGORY_META = {
  // GAMES HUB
  'Hidden Gem': { icon: '💎', description: 'Discover incredible hidden gem games that flew under the radar. From underrated indie masterpieces to forgotten cult classics, these are the games you must play.', parent: 'games' },
  'Cozy Games': { icon: '🧸', description: 'Find the best cozy games for stress relief. Explore relaxing farming sims, gentle puzzle games, and peaceful adventures designed to help you unwind after a long day.', parent: 'games' },
  'Indie': { icon: '🎨', description: 'Explore the creative world of indie gaming. We review the best independent games, highlight solo developers, and showcase the most innovative mechanics in gaming today.', parent: 'games' },
  'Multiplayer': { icon: '👥', description: 'Looking for games to play with friends? Browse our guides for the best multiplayer games, including co-op campaigns, competitive skirmishes, and massive online worlds.', parent: 'games' },
  'Survival': { icon: '🏕️', description: 'Survive the wild in the best survival games available. Read latest guides on base-building, resource management, and enduring harsh environments.', parent: 'games' },
  'RPG': { icon: '⚔️', description: 'Dive deep into the best RPG games. From classic turn-based JRPGs to massive open-world action RPGs, discover epic stories and character progression systems.', parent: 'games' },
  'Horror': { icon: '👻', description: 'Experience the terror of the best horror games. We cover psychological thrillers, survival horror classics, and spine-chilling indie scares.', parent: 'games' },
  'Free To Play': { icon: '🆓', description: 'Play more and spend less. Discover the absolute best free-to-play games on PC and console, from competitive shooters to massive MMOs, without the pay-to-win mechanics.', parent: 'games' },
  'Singleplayer': { icon: '🎮', description: 'Immerse yourself in rich solo experiences. Find the best singleplayer campaigns, narrative-driven adventures, and story-rich masterpieces.', parent: 'games' },
  'Roguelike': { icon: '🎲', description: 'Embrace the loop. We cover the best roguelike and roguelite games featuring procedural generation, permadeath thrills, and infinite replayability.', parent: 'games' },
  'FPS': { icon: '🎯', description: 'First-person shooter games including tactical shooters, battle royales, and fast-paced competitive multiplayer titles.', parent: 'games' },
  'Racing': { icon: '🏎️', description: 'Burn rubber in the best racing games. From hyper-realistic simcade racers to chaotic arcade street racing titles.', parent: 'games' },
  'Simulator': { icon: '✈️', description: 'Master complex systems in the best simulation games. From flight sims to management tycoons and realistic job simulators.', parent: 'games' },
  'Mobile Games': { icon: '📱', description: 'Gaming on the go. Discover the highest quality premium and free-to-play mobile games for iOS and Android devices.', parent: 'games' },
  'Roblox': { icon: '🧱', description: 'Find the best Roblox experiences. From hidden gems and tycoons to RPGs and competitive games hosted on the massive Roblox platform.', parent: 'games' },
  'Steam': { icon: '🚂', description: 'The ultimate guide to Steam games. Find upcoming releases, massive sales, and the best titles available on Valve\'s PC gaming platform.', parent: 'games' },
  'Real Time Strategy': { icon: '♟️', description: 'Command armies and build empires. Discover the deepest RTS games focusing on tactics, resource management, and strategic brilliance.', parent: 'games' },
  'Puzzle': { icon: '🧩', description: 'Test your brain with the best puzzle games. From relaxing logic spatial puzzles to mind-bending environmental challenges.', parent: 'games' },
  'Co-op': { icon: '🤝', description: 'Team up to win. Discover the best co-op games to play side-by-side or online with friends, featuring dedicated cooperative campaigns.', parent: 'games' },
  'Soulslike': { icon: '🔥', description: 'Embrace the challenge of soulslike games. Deep combat, punishing difficulty, and interconnected worlds inspired by the genre\'s pioneers.', parent: 'games' },

  // HARDWARE HUB
  'Keyboards': { icon: '⌨️', description: 'Find the best gaming keyboards. Read expert reviews on mechanical switches, custom builds, low-latency performance, and budget options.', parent: 'hardware' },
  'Headsets': { icon: '🎧', description: 'Immerse yourself in competitive audio. Discover the best gaming headsets featuring spatial surround sound, clear microphones, and lasting comfort.', parent: 'hardware' },
  'Mouse': { icon: '🖱️', description: 'Click heads with precision. We review the best gaming mice for all grip styles, covering ultralight models, flawless sensors, and budget options.', parent: 'hardware' },
  'Monitors': { icon: '🖥️', description: 'Upgrade your visual experience. Find the best gaming monitors, from ultra-fast 240Hz competitive panels to stunning 4K OLED displays.', parent: 'hardware' },
  'Controllers': { icon: '🎮', description: 'Take control of your games. We test the best gamepads, pro controllers, and fight sticks for PC and console gaming.', parent: 'hardware' },
  'Budget': { icon: '💰', description: 'High performance, low price. Discover the absolute best budget gaming gear, from $30 mice to affordable mechanical keyboards that perform like flagships.', parent: 'hardware' },
  'PC': { icon: '💻', description: 'Build your dream rig. We provide guides on the best PC hardware, pre-built gaming desktops, and components to maximize your framerates.', parent: 'hardware' },
  'Laptops': { icon: '💻', description: 'Find the best gaming laptops. Read reviews on performance, battery life, and value for money.', parent: 'hardware' },
  
  // NEWS HUB
  'News': { icon: '📰', description: 'Stay up to date with the latest gaming news, industry updates, developer interviews, and patch notes.', parent: 'news' },
  'Upcoming': { icon: '📅', description: 'Track the future of gaming. Discover the most anticipated upcoming games, release dates, and reveal trailers.', parent: 'news' }
};

// ─── Internal: read all posts from disk ───────────────────────────
function readAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, ...data };
  });
}

// ─── Public helpers for the redesigned homepage ───────────────────

/** All posts sorted newest-first */
export function getAllPostsSorted() {
  return readAllPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** Posts marked `featured: true` in frontmatter */
export function getFeaturedPosts(limit = 3) {
  return readAllPosts().filter(p => p.featured).slice(0, limit);
}

/** Posts marked `trending: true` in frontmatter */
export function getTrendingPosts(limit = 6) {
  return readAllPosts().filter(p => p.trending).slice(0, limit);
}

/** Posts marked `editorsPick: true` (or fallback to oldest posts) */
export function getEditorsPicks(limit = 4) {
  const all = readAllPosts();
  const picks = all.filter(p => p.editorsPick);
  if (picks.length >= limit) return picks.slice(0, limit);
  // Fallback: oldest posts not already picked
  const pickSlugs = new Set(picks.map(p => p.slug));
  const oldest = all
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(p => !pickSlugs.has(p.slug));
  return [...picks, ...oldest].slice(0, limit);
}

/** Posts that belong to a specific content pillar (Games / Hardware & Gear) */
export function getPostsByPillar(pillar, limit = 4) {
  const cats = HIERARCHICAL_CATEGORIES[pillar];
  if (!cats) return [];
  return getAllPostsSorted()
    .filter(p => p.categories?.some(c => cats.includes(c)))
    .slice(0, limit);
}

/** Latest N posts, optionally excluding a set of slugs */
export function getLatestPosts(limit = 6, excludeSlugs = []) {
  const excluded = new Set(excludeSlugs);
  return getAllPostsSorted().filter(p => !excluded.has(p.slug)).slice(0, limit);
}

/** All data needed for a category hub page */
export function getPostsForCategory(categoryKey, page = 1) {
  const all = getAllPostsSorted();
  let filtered;

  if (HIERARCHICAL_CATEGORIES[categoryKey]) {
    const subs = HIERARCHICAL_CATEGORIES[categoryKey];
    filtered = all.filter(p => p.categories?.some(c => subs.includes(c)));
  } else {
    filtered = all.filter(p => p.categories?.includes(categoryKey));
  }

  const featured = filtered.slice(0, 3);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return { posts: paged, featured, totalPages, totalPosts: filtered.length };
}

// ─── Original exports (unchanged) ────────────────────────────────

export function getPosts({
  query = '',
  currentPage = 1,
  category = null
} = {}) {
  const sortedPosts = getAllPostsSorted();

  let filteredPosts = sortedPosts;

  // Update filtering logic to handle main or subcategories
  if (category) {
    // Check if the selected category is a main category
    if (HIERARCHICAL_CATEGORIES[category]) {
      const subCategories = HIERARCHICAL_CATEGORIES[category];
      filteredPosts = sortedPosts.filter(post =>
        post.categories.some(cat => subCategories.includes(cat))
      );
    } else {
      // Filter by subcategory
      filteredPosts = sortedPosts.filter(post => post.categories.includes(category));
    }
  }

  if (query) {
    filteredPosts = filteredPosts.filter(
      post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const allCategories = [...new Set(sortedPosts.flatMap(post => post.categories))];

  return { posts: paginatedPosts, totalPages, allCategories };
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source: source,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ];
      return options;
    },
  });

  return {
    slug,
    frontmatter,
    code,
  };
}

// Get posts for a top-level hub (e.g., 'games', 'hardware', 'news')
export function getPostsForHub(hub, currentPage = 1) {
  const allPosts = getAllPostsSorted();
  const limit = 12; // Standard grid size
  const hubLowercase = hub.toLowerCase();

  // Find all categories that belong to this hub based on CATEGORY_META.parent
  const hubCategories = Object.keys(CATEGORY_META).filter(
    cat => CATEGORY_META[cat].parent === hubLowercase
  );

  // Filter posts that have at least one category belonging to the hub
  const filteredPosts = allPosts.filter(post => {
    if (!post.categories) return false;
    return post.categories.some(cat => hubCategories.includes(cat));
  });

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    subcategories: hubCategories,
    totalPages: Math.ceil(filteredPosts.length / limit),
    totalPosts: filteredPosts.length,
  };
}