import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});



export const metadata = {
  title: "Chronic Reload",
  description: "Your source for gaming news & media",
  openGraph: {
    type: "website",
    title: "Chronic Reload | Your Gaming News Hub",
    description: "Stay up to date with the latest gaming news, reviews, and upcoming releases. Chronic Reload brings you curated content and fresh updates.",
    url: "https://chronicreload.com",
    siteName: "Chronic Reload",
    images: ["https://chronicreload.com/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronic Reload | Your Gaming News Hub",
    description: "Get the latest on gaming news, reviews, and new releases with Chronic Reload.",
    images: ["https://chronicreload.com/logo.png"],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8887590102646300"
          crossOrigin="anonymous">
        </script>

        <Script
          id="funding-choices"
          async
          src="https://fundingchoicesmessages.google.com/i/pub-8887590102646300?ers=1"
        />

        <Script id="funding-choices-init" strategy="afterInteractive">
          {`
          (function() {
            function signalGooglefcPresent() {
              if (!window.frames['googlefcPresent']) {
                if (document.body) {
                  const iframe = document.createElement('iframe');
                  iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                  iframe.style.display = 'none';
                  iframe.name = 'googlefcPresent';
                  document.body.appendChild(iframe);
                } else {
                  setTimeout(signalGooglefcPresent, 0);
                }
              }
            }
            signalGooglefcPresent();
          })();
        `}
        </Script>

        {/* GA4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YC0HP8ZFM9"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YC0HP8ZFM9');
        `}
        </Script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground bg-background`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}