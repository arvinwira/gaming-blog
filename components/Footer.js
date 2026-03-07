import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

const FOOTER_GAME_CATEGORIES = [
  { label: 'Hidden Gems', href: '/games/Hidden%20Gem' },
  { label: 'Cozy Games', href: '/games/Cozy%20Games' },
  { label: 'Indie Games', href: '/games/Indie' },
  { label: 'Multiplayer', href: '/games/Multiplayer' },
  { label: 'RPG', href: '/games/RPG' },
  { label: 'Survival', href: '/games/Survival' },
];

const FOOTER_HARDWARE = [
  { label: 'Gaming Keyboards', href: '/hardware/Keyboards' },
  { label: 'Gaming Headsets', href: '/hardware/Headsets' },
  { label: 'Gaming Mouse', href: '/hardware/Mouse' },
  { label: 'Gaming Monitors', href: '/hardware/Monitors' },
  { label: 'Controllers', href: '/hardware/Controllers' },
];

const FOOTER_INFO = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t border-border">
      <div
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {/* Newsletter – full width top row */}
        <div className="mb-12">
          <div className="max-w-xl mx-auto">
            <NewsletterForm />
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-12">
          {/* Game Categories */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Games</h4>
            <ul className="space-y-2">
              {FOOTER_GAME_CATEGORIES.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hardware */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Hardware & Gear</h4>
            <ul className="space-y-2">
              {FOOTER_HARDWARE.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Information</h4>
            <ul className="space-y-2">
              {FOOTER_INFO.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; 2026 Chronic Reload Blog.</p>
          <div className="flex gap-6 text-sm">
            <Link href="https://x.com/chronic_reload" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              X (Twitter)
            </Link>
            <Link href="https://www.tiktok.com/@chronicreload" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              TikTok
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}