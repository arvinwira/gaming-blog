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
  verification: {
    other: {
      "p:domain_verify": "9ba64d4b8e1566ef6abfdbf30e0f2c35",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground bg-background`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8887590102646300"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* GA4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YC0HP8ZFM9"
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YC0HP8ZFM9');
        `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vzhjz9wbvj");
          `}
        </Script>
      </body>
    </html>
  );
}