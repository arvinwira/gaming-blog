// components/Header.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedThemeSwitcher from './AnimatedThemeSwitcher';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-card text-foreground shadow-md border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="GameOn Logo"
                width={90}
                height={30}
              />
              <span
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Chronic Reload
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {/* Apply the font style to the parent nav element */}
          <nav className="hidden md:flex items-center space-x-4" style={{ fontFamily: 'var(--font-heading)' }}>
            <Link href="/categories" className="text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary ">Categories</Link>
            <Link href="/about" className="text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">About</Link>
            <Link href="/contact" className="text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">Contact</Link>
            <AnimatedThemeSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <AnimatedThemeSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-4 p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                // Close Icon
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
        <div className="md:hidden">
          {/* Apply the font style to the mobile nav as well */}
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border" style={{ fontFamily: 'var(--font-heading)' }}>
            <Link href="/categories" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Categories</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">About</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}