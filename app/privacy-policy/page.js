export const metadata = {
  title: 'Privacy Policy',
  description: 'Understand how Chronic Reload Blog collects, uses, and protects your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary text-center mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-invert prose-lg max-w-none">
          <p>
            At <strong>Chronic Reload</strong>, your privacy is of utmost importance to us. This Privacy Policy
            outlines the types of personal information we collect, how we use it, and the steps we take to protect it.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>Your name and email address (when you contact us or subscribe)</li>
            <li>Anonymous analytical data (via Google Analytics and similar tools)</li>
            <li>Cookies and usage data (for personalized ad delivery and performance tracking)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To operate and improve the user experience on our blog</li>
            <li>To respond to questions, feedback, or inquiries</li>
            <li>To send optional newsletters or updates (only if you opt in)</li>
            <li>To comply with legal obligations and enforce our terms</li>
          </ul>

          <h2>3. Google AdSense and Third Party Tools</h2>
          <p>
            We use third-party vendors, including Google, to serve ads. These parties may use cookies to serve ads
            based on a users prior visits to our website or other websites. Google use of advertising cookies enables
            it and its partners to serve more relevant ads.
          </p>
          <p>
            You may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              Google Ads Settings
            </a>.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Cookies are small text files stored on your device. We use cookies to:
          </p>
          <ul>
            <li>Understand how users interact with the site</li>
            <li>Improve page loading speed</li>
            <li>Personalize content and ads</li>
          </ul>
          <p>You can manage or disable cookies via your browser settings at any time.</p>

          <h2>5. Data Security</h2>
          <p>
            We take reasonable precautions to protect your data. However, please note that no method of
            transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2>6. Your Rights</h2>
          <ul>
            <li>You have the right to access, update, or delete any personal information we hold about you.</li>
            <li>You can request to be removed from our mailing list at any time.</li>
          </ul>

          <h2>7. Children’s Privacy</h2>
          <p>
            This website is not intended for children under the age of 13. We do not knowingly collect personal
            information from children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy occasionally. Any changes will be posted on this page with an updated
            revision date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or concerns about this policy, feel free to contact us at:
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
