import Link from 'next/link';

export const metadata = {
  title: 'About Chronic Reload',
  description: 'Learn more about the mission behind Chronic Reload.',
};

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pt-24 pb-20 overflow-x-hidden relative">
      
      {/* Ambient background glow effects */}
      <div className="absolute top-20 left-1/4 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 rounded-full mb-4">
            Editorial mission
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/80 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            About Chronic Reload
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Your Ultimate Source for Gaming News and Reviews
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-card/45 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl border border-border/50 relative overflow-hidden group transition-all duration-300 hover:shadow-primary/5 hover:border-primary/30">
          {/* Subtle top border highlight */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-secondary" />
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Mission
          </h2>
          
          <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Chronic Reload was founded from a pure and simple passion for video games. In a sea of endless releases and overwhelming news, we aim to be your trusted filter. Our mission is to deliver honest reviews, insightful guides, and timely news that respects your time and enhances your gaming experience.
            </p>
            <p>
              We are not journalists; we are lifelong gamers, just like you. From the biggest AAA blockbusters to the most obscure indie gems, we play them all and share our genuine thoughts. Thank you for joining our community!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}