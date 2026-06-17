import Link from 'next/link';

export default function InternalLink({ href, title, excerpt }) {
    return (
        <Link
            href={href}
            className="block my-10 no-underline group relative w-full transition-transform duration-300 hover:-translate-y-1"
        >
            {/* Glow backdrop using primary colour */}
            <div className="absolute -inset-0.5 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition duration-500 bg-primary/40" />

            {/* Card */}
            <div className="relative bg-card border border-border/50 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-md transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10">

                {/* Ambient colour blob — top-right */}
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl bg-primary/10 dark:bg-primary/15 transition-colors duration-500 pointer-events-none" />
                {/* Ambient colour blob — bottom-left */}
                <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-3xl bg-secondary/10 dark:bg-secondary/10 transition-colors duration-500 pointer-events-none" />

                {/* Frosted top sheen */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-b from-white/30 dark:from-white/5 to-transparent" />

                <div className="relative z-10 flex flex-col gap-2">
                    {/* Label */}
                    <div className="flex items-center gap-3 mb-1">
                        {/* Pulsing dot */}
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                        </span>
                        <span
                            className="font-extrabold text-xs sm:text-sm uppercase tracking-widest text-primary"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Related Article
                        </span>
                    </div>

                    {/* Title */}
                    <h4
                        className="text-xl md:text-2xl font-bold leading-tight m-0 text-foreground group-hover:text-primary transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {title}
                    </h4>

                    {/* Excerpt */}
                    {excerpt && (
                        <p className="text-sm md:text-base line-clamp-2 md:line-clamp-3 mt-2 mb-0 leading-relaxed text-muted-foreground">
                            {excerpt}
                        </p>
                    )}

                    {/* Read more hint */}
                    <span className="mt-3 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read article →
                    </span>
                </div>
            </div>
        </Link>
    );
}