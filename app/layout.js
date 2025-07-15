// app/layout.js
import { Poppins, Lora, Press_Start_2P } from 'next/font/google';
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    // Add suppressHydrationWarning here
    <html lang="en" suppressHydrationWarning>
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8887590102646300"
     crossorigin="anonymous"></script>
      </head>
      <body className={`${poppins.variable} ${lora.variable} ${pressStart2P.variable} font-sans`}>
        {/* The provider must wrap your content */}
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}