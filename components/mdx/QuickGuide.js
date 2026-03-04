export default function QuickGuide({ children }) {
    return (
        <div className="my-10 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))/0.05] to-[rgb(var(--secondary))/0.05] p-6 sm:p-8 border border-[rgb(var(--primary))/0.2] shadow-xl shadow-[rgb(var(--primary))/0.05] relative overflow-hidden backdrop-blur-sm transition-all hover:shadow-[rgb(var(--primary))/0.1] hover:border-[rgb(var(--primary))/0.3]">
            <h3 className="!mt-0 text-2xl font-bold mb-6 text-[rgb(var(--primary))] flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Reference Guide
            </h3>
            <div className="quick-guide-content relative z-10 m-0 p-0">
                {children}
            </div>
        </div>
    );
}
