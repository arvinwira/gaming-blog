import Link from 'next/link';

export default function InternalLink({ href, title, excerpt }) {
    return (
        <Link href={href} className="block my-10 no-underline group relative w-full transition-transform duration-300 hover:-translate-y-1">
            {/* Glowing backdrop - pure blue in light, purple in dark */}
            <div
                className="absolute -inset-0.5 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-500"
                ref={(el) => {
                    if (!el) return;
                    const update = () => {
                        const isDark = document.documentElement.classList.contains('dark');
                        el.style.background = isDark
                            ? 'linear-gradient(135deg, #a855f7, #6b21a8)'
                            : 'linear-gradient(135deg, #60a5fa, #2563eb)';
                    };
                    update();
                    const observer = new MutationObserver(update);
                    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
                }}
            />

            {/* Glassmorphism Container */}
            <div
                className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-xl overflow-hidden"
                style={{ border: '1px solid rgba(147,197,253,0.7)' }}
                ref={(el) => {
                    if (!el) return;
                    const update = () => {
                        const isDark = document.documentElement.classList.contains('dark');
                        el.style.background = isDark
                            ? 'linear-gradient(135deg, rgba(0,0,0,0.60), rgba(59,7,100,0.40), rgba(0,0,0,0.60))'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(219,234,254,0.75), rgba(191,219,254,0.65))';
                        el.style.borderColor = isDark
                            ? 'rgba(168,85,247,0.30)'
                            : 'rgba(147,197,253,0.70)';
                        el.style.boxShadow = isDark
                            ? '0 8px 32px rgba(168,85,247,0.15)'
                            : '0 8px 32px rgba(59,130,246,0.20)';

                        const title = el.querySelector('[data-title]');
                        const excerpt = el.querySelector('[data-excerpt]');
                        const label = el.querySelector('[data-label]');
                        const dot = el.querySelector('[data-dot]');
                        const topBlob = el.querySelector('[data-blob-top]');
                        const botBlob = el.querySelector('[data-blob-bot]');

                        if (title) title.style.color = isDark ? '#ffffff' : '#000000';
                        if (excerpt) excerpt.style.color = isDark ? 'rgba(209,213,219,1)' : 'rgba(0,0,0,0.70)';
                        if (label) label.style.color = isDark ? '#d8b4fe' : '#2563eb';
                        if (dot) {
                            dot.style.backgroundColor = isDark ? '#c084fc' : '#3b82f6';
                            dot.style.boxShadow = isDark ? '0 0 8px rgba(168,85,247,0.8)' : '0 0 8px rgba(59,130,246,0.8)';
                        }
                        if (topBlob) topBlob.style.background = isDark ? 'rgba(168,85,247,0.20)' : 'rgba(96,165,250,0.25)';
                        if (botBlob) botBlob.style.background = isDark ? 'rgba(107,33,168,0.20)' : 'rgba(59,130,246,0.15)';
                    };
                    update();
                    const observer = new MutationObserver(update);
                    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
                }}
            >
                {/* Inner ambient blobs */}
                <div data-blob-top className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl transition-colors duration-500" />
                <div data-blob-bot className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl transition-colors duration-500" />

                {/* Frosted sheen */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-b from-white/50 to-transparent" />

                <div className="relative z-10 flex flex-col gap-2">
                    {/* Label */}
                    <div className="flex items-center gap-3 mb-1">
                        <span className="relative flex h-3 w-3">
                            <span data-dot-ping className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-500" />
                            <span data-dot className="relative inline-flex rounded-full h-3 w-3" />
                        </span>
                        <span data-label className="font-extrabold text-xs sm:text-sm uppercase tracking-widest">
                            Related Article
                        </span>
                    </div>

                    {/* Title */}
                    <h4 data-title className="text-xl md:text-2xl font-bold leading-tight m-0 transition-colors duration-300">
                        {title}
                    </h4>

                    {/* Excerpt */}
                    {excerpt && (
                        <p data-excerpt className="text-sm md:text-base line-clamp-2 md:line-clamp-3 mt-2 mb-0 leading-relaxed font-medium">
                            {excerpt}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}