import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t border-border">
      <div
        className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        <p>&copy; 2025 Chronic Reload Blog. All Rights Reserved.</p>
        <div className="mt-4 space-x-4 text-sm">
          <Link href="/privacy-policy" className="hover:underline text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:underline text-foreground">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
