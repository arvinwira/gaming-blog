export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Chronic Reload team.',
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl text-primary sm:text-5xl font-extrabold tracking-tight mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Have a tip, a question, or just want to say hi? We would love to hear from you.
        </p>

        <div className="bg-card p-8 rounded-lg shadow-lg inline-block border border-border shadow-secondary">
          <h2 className="text-2xl font-bold text-primary mb-4">Contact Information</h2>
          <p className="text-muted-foreground text-lg">
            For all inquiries, please email us at:
          </p>
          <a href="mailto:chronicreloadblog@gmail.com" className="text-xl text-secondary font-semibold hover:underline">
            chronicreloadblog@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}