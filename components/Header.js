'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedThemeSwitcher from './AnimatedThemeSwitcher';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'Games',
    href: '/games',
    children: [
      { label: 'Hidden Gems', href: '/games/Hidden%20Gem' },
      { label: 'Indie Games', href: '/games/Indie' },
      { label: 'Cozy Games', href: '/games/Cozy%20Games' },
      { label: 'Multiplayer', href: '/games/Multiplayer' },
      { label: 'Survival', href: '/games/Survival' },
      { label: 'RPG', href: '/games/RPG' },
      { label: 'Horror', href: '/games/Horror' },
      { label: 'Roguelike', href: '/games/Roguelike' },
      { label: 'Free To Play', href: '/games/Free%20To%20Play' },
      { label: 'Singleplayer', href: '/games/Singleplayer' },
    ],
  },
  {
    label: 'Hardware & Gear',
    href: '/hardware',
    children: [
      { label: 'Gaming Keyboards', href: '/hardware/Keyboards' },
      { label: 'Gaming Mouse', href: '/hardware/Mouse' },
      { label: 'Gaming Headsets', href: '/hardware/Headsets' },
      { label: 'Gaming Monitors', href: '/hardware/Monitors' },
      { label: 'Controllers', href: '/hardware/Controllers' },
      { label: 'Budget Gaming Gear', href: '/hardware/Budget' },
      { label: 'PC Builds', href: '/hardware/PC' },
      { label: 'Gaming Laptops', href: '/hardware/Laptops' },
    ],
  },
  {
    label: 'News',
    href: '/news',
    children: [
      { label: 'Latest News', href: '/news/News' },
      { label: 'Upcoming Releases', href: '/news/Upcoming' },
    ],
  },
  {
    label: 'Info',
    children: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    ],
  },
];

// ─── Desktop dropdown ────────────────────────────────────────────
function DesktopDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef(null);

  const show = () => { clearTimeout(timeout.current); setOpen(true); };
  const hide = () => { timeout.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
      >
        {item.label}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 min-w-[220px] bg-card border border-border rounded-xl shadow-xl py-2 animate-fade-in-up z-50">
          {item.children.map(child => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Mobile accordion ────────────────────────────────────────────
function MobileAccordion({ item, onNavigate }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors"
      >
        {item.label}
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pl-4 space-y-1 pb-2">
          {item.children.map(child => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Search overlay ──────────────────────────────────────────────
function SearchButton() {
  return (
    <Link
      href="/categories"
      className="p-2 rounded-md text-foreground hover:text-primary transition-colors"
      aria-label="Search articles"
    >
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </Link>
  );
}

// ─── Main Header ────────────────────────────────────────────────
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change (resize)
  useEffect(() => {
    const close = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Chronic Reload Logo" width={80} height={20} />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                Chronic Reload
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {NAV_ITEMS.map(item =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pl-3 border-l border-border flex items-center gap-2">
              <SearchButton />
              <AnimatedThemeSwitcher />
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <SearchButton />
            <AnimatedThemeSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-2 p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-card animate-fade-in-up border-b border-border absolute w-full left-0 top-20 shadow-lg max-h-[70vh] overflow-y-auto custom-scrollbar">
          <nav className="px-4 pt-2 pb-6 space-y-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {NAV_ITEMS.map(item => (
              <MobileAccordion key={item.label} item={item} onNavigate={() => setMenuOpen(false)} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}