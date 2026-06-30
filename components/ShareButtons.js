'use client';

import { useState } from 'react';

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);

  // If no URL is passed, fallback to window.location.href (client-side only)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || 'Check out this awesome gaming article!';

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="my-12 pt-8 border-t border-border/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/40 backdrop-blur-md border border-border/50 p-6 rounded-3xl shadow-sm">
        <div>
          <h4 className="text-base font-bold text-foreground uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
            Share This Article
          </h4>
          <p className="text-muted-foreground text-xs mt-1">
            Spread the word with your gaming crew
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-black hover:bg-neutral-800 border border-neutral-700/50 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-black/10"
            aria-label="Share on X (formerly Twitter)"
          >
            <span>X</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-[#1877F2] hover:bg-[#166FE5] rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-blue-500/10"
            aria-label="Share on Facebook"
          >
            <span>Facebook</span>
          </a>

          {/* Reddit */}
          <a
            href={`https://www.reddit.com/submit?title=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-[#FF4500] hover:bg-[#E03D00] rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-orange-500/10"
            aria-label="Share on Reddit"
          >
            <span>Reddit</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            className={`relative flex items-center justify-center px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border ${
              copied
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400'
                : 'bg-card text-foreground border-border hover:bg-accent'
            }`}
            aria-label="Copy article link to clipboard"
          >
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
