'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedThemeSwitcher from './AnimatedThemeSwitcher';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 glass border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="GameOn Logo"
                width={80}
                height={20}
              />
              <span
                className="text-lg sm:text-xl md:text-2xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Chronic Reload
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" style={{ fontFamily: 'var(--font-heading)' }}>
            <Link href="/categories" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Categories</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            <div className="pl-4 border-l border-border flex items-center">
              <AnimatedThemeSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ">
            <AnimatedThemeSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-4 p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
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
        <div className="md:hidden glass animate-fade-in-up border-b border-border absolute w-full left-0 top-20 shadow-lg">
          <nav className="px-4 pt-2 pb-6 space-y-2" style={{ fontFamily: 'var(--font-heading)' }}>
            <Link href="/categories" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors">Categories</Link>
            <Link href="/about" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors">About</Link>
            <Link href="/contact" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}