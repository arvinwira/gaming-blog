import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t border-border">
      <div
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        <div className="text-center md:text-left">
          <NewsletterForm />
        </div>

        {/* Right Column: Copyright and Links */}
        <div className="text-center md:text-right">
          <p className="text-sm">&copy; 2025 Chronic Reload Blog.</p>
          <div className="mt-4 space-x-6 text-xs">
            <Link href="/privacy-policy" className="hover:underline text-foreground text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:underline text-foreground text-secondary">
              Terms & Conditions
            </Link>
          </div>
          <div className="flex justify-center md:justify-end gap-4 mt-4 text-xs">
            <Link href="https://x.com/chronic_reload" target="_blank" rel="noopener noreferrer" className="hover:underline text-secondary">
              X
            </Link>
            <Link href="https://www.tiktok.com/@chronicreload" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
              TikTok
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}