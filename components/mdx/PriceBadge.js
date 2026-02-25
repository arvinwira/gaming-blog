export default function PriceBadge({ price, label = "Current Price", store = "Amazon", link }) {
    return (
        <div className="my-6 glass rounded-2xl p-6 border border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex flex-col text-center sm:text-left">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
                <span className="text-4xl font-extrabold text-foreground mt-1" style={{ fontFamily: 'var(--font-heading)' }}>{price}</span>
            </div>

            {link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2"
                >
                    Check on {store}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            ) : (
                <span className="text-muted-foreground italic">Currently Unavailable</span>
            )}
        </div>
    );
}
