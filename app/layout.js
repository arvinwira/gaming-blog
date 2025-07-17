import { Poppins, Lora, Press_Start_2P } from 'next/font/google';
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/react';


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
  title: 'Chronic Reload | Your Gaming News Hub',
  description: 'The latest in gaming news.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite', 
    name: 'Chronic Reload',
    url: 'https://chronicreload.com',
    publisher: { 
      '@type': 'Organization',
      name: 'Chronic Reload',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chronicreload.com/logo.png',
      },
    },
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/icon.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8887590102646300"
          crossOrigin="anonymous"
        />
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