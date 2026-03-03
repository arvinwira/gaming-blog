export default function KeyHighlights({ highlights }) {
    if (!highlights || !Array.isArray(highlights)) return null;

    return (
        <div className="mt-0 mb-8 glass rounded-2xl px-6 pb-6 pt-2 border-t-4 border-blue-500 shadow-lg">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-blue-500" style={{ fontFamily: 'var(--font-heading)' }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Key Highlights
            </h3>
            <ul className="space-y-3">
                {highlights.map((highlight, idx) => {
                    const parts = highlight.split('→');
                    return (
                        <li key={idx} className="flex gap-3 text-foreground items-start">
                            <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                {parts.length > 1 ? (
                                    <>
                                        <span className="font-semibold text-foreground">{parts[0]}</span>
                                        <span className="text-foreground/80"> → {parts.slice(1).join('→')}</span>
                                    </>
                                ) : (
                                    <span className="text-foreground/80">{highlight}</span>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
