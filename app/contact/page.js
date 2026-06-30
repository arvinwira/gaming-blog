import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Chronic Reload team for gaming news, reviews, and hardware suggestions.',
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a breaking news tip, a product review request, or feedback on our articles? We want to hear from you. Find our editorial contact channels below or send us a message.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-lg space-y-6">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Contact
              </h2>
              
              {/* Email */}
              <div className="flex gap-4">
                <span className="text-2xl text-primary mt-1">✉</span>
                <div>
                  <a href="mailto:chronicreloadblog@gmail.com" className="text-lg font-bold text-primary hover:underline transition-colors block mt-1">
                    chronicreloadblog@gmail.com
                  </a>
                </div>
              </div>         

              {/* Social Channels */}
              <div className="pt-6 border-t border-border/80">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Follow & Support</h3>
                <div className="flex gap-4 text-sm font-semibold">
                  <Link href="https://x.com/chronic_reload" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">
                    Twitter (X)
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link href="https://www.tiktok.com/@chronicreload" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">
                    TikTok
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}