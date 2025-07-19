export const metadata = {
    title: 'Terms and Conditions',
    description: 'Read the terms and conditions for using Chronic Reload Blog.',
  };
  
  export default function TermsPage() {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary text-center mb-8">
            Terms and Conditions
          </h1>
          <div className="prose prose-invert max-w-none">
            <p>
              These Terms and Conditions ("Terms") govern your use of the Chronic Reload Blog website. By accessing or using the site, you agree to abide by these Terms. If you do not agree, please do not use the website.
            </p>
  
            <h2>1. Use of Content</h2>
            <p>
              All articles, images, videos, and other materials on this site are owned by Chronic Reload unless otherwise stated. You may:
            </p>
            <ul>
              <li>Read and share links to our content for personal, non-commercial use</li>
              <li>Not reproduce, republish, or distribute any content without our written permission</li>
            </ul>
  
            <h2>2. User Conduct</h2>
            <p>By using this website, you agree to:</p>
            <ul>
              <li>Use it only for lawful purposes</li>
              <li>Not attempt to harm, disrupt, or gain unauthorized access to our site or data</li>
              <li>Respect other users and refrain from submitting abusive or inappropriate content</li>
            </ul>
  
            <h2>3. Third-Party Ads & Links</h2>
            <p>
              This website may contain advertisements and links to external sites. We do not endorse, control, or take responsibility for any third-party content, services, or offers.
            </p>
            <p>
              All ad-related tracking and data collection are subject to the policies of the respective ad providers, including Google AdSense. See our{' '}
              <a href="/privacy-policy" className="text-secondary hover:underline">
                Privacy Policy
              </a>{' '}
              for more details.
            </p>
  
            <h2>4. Disclaimer</h2>
            <p>
              The content on Chronic Reload is provided "as is" for informational purposes only. We make no warranties about the accuracy or completeness of the content and disclaim all liability for errors or omissions.
            </p>
  
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall Chronic Reload or its team be liable for any damages arising from the use or inability to use this site.
            </p>
  
            <h2>6. Modifications</h2>
            <p>
              We reserve the right to modify or update these Terms at any time. You are responsible for reviewing them periodically. Continued use of the site constitutes your acceptance of any changes.
            </p>
  
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms, feel free to contact us:
              <br />
              <a href="mailto:chronicreloadblog@gmail.com" className="text-secondary hover:underline">
                chronicreloadblog@gmail.com
              </a>
            </p>
  
            <p className="italic">Last updated: July 2025</p>
          </div>
        </div>
      </div>
    );
  }
  