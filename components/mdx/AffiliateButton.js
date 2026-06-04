export default function AffiliateButton({ link, children }) {
    return (
        <div className="flex justify-center w-full my-6">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-black font-extrabold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
                style={{ fontFamily: 'var(--font-heading)' }}
            >
                {/* Glossy sweep effect */}
                <span className="absolute inset-y-0 left-0 z-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shine pointer-events-none" />

                <span className="relative z-10 flex items-center gap-2">
                    {children}
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </span>
            </a>
        </div>
    );
}


