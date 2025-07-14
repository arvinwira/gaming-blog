import Link from 'next/link';
import Image from 'next/image'
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <header className="bg-card text-foreground shadow-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Chronic Reload Logo"
                width={40}
                height={40}
                className="h-15 w-15"
              />
              <span
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Chronic Reload
              </span>
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            <Link href="/categories" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"style={{ fontFamily: 'var(--font-heading)' }}>Categories</Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"style={{ fontFamily: 'var(--font-heading)' }}>About</Link>
            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"style={{ fontFamily: 'var(--font-heading)' }}>Contact</Link>
            
            <ThemeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}