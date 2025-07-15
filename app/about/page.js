export const metadata = {
  title: 'About Chronic Reload',
  description: 'Learn more about the mission behind Chronic Reload.',
};

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl text-primary sm:text-5xl font-extrabold tracking-tight mb-4">
          About Chronic Reload
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your Ultimate Source for Gaming News and Reviews
        </p>

        <div className="text-left bg-card p-8 rounded-lg shadow-lg border border-border shadow-secondary">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Chronic Reload was founded from a pure and simple passion for video games. In a sea of endless releases and overwhelming news, we aim to be your trusted filter. Our mission is to deliver honest reviews, insightful guides, and timely news that respects your time and enhances your gaming experience.
          </p>
          <p className="text-muted-foreground">
            We are not journalists; we are lifelong gamers, just like you. From the biggest AAA blockbusters to the most obscure indie gems, we play them all and share our genuine thoughts. Thank you for joining our community!
          </p>
        </div>
      </div>
    </div>
  );
}