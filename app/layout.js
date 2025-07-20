import { Poppins, Lora, Press_Start_2P } from 'next/font/google';
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-sans', 
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif', 
});

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'], 
  variable: '--font-heading',
});



export const metadata = {
  title: "Chronic Reload",
  description: "Your trusted source for reliable news & media",
  openGraph: {
    title: "Chronic Reload",
    description: "Your trusted source for reliable news & media",
    url: "https://chronicreload.com",
    siteName: "Chronic Reload",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-8887590102646300"
          crossOrigin="anonymous"
        />

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
       
        {/*Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chronicreload.com/" />
        <meta property="og:title" content="Chronic Reload | Your Gaming News Hub" />
        <meta property="og:description" content="Stay up to date with the latest gaming news, reviews, and upcoming releases. Chronic Reload brings you curated content and fresh updates for gamers." />
        <meta property="og:image" content="https://chronicreload.com/logo.png" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://chronicreload.com/" />
        <meta name="twitter:title" content="Chronic Reload | Your Gaming News Hub" />
        <meta name="twitter:description" content="Get the latest on gaming news, reviews, and new releases with Chronic Reload." />
        <meta name="twitter:image" content="https://chronicreload.com/logo.png" />


      </head>
      <body className={`${poppins.variable} ${lora.variable} ${pressStart2P.variable} font-sans`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-background">
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