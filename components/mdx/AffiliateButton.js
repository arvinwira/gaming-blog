export default function AffiliateButton({ link, children }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 my-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 transition-all"
            style={{ fontFamily: 'var(--font-heading)' }}
        >
            {children}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </a>
    );
}
