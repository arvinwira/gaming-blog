import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-8887590102646300" data-ad-client="off" />
        <meta name="robots" content="noindex, nofollow" />
        <title>404 - Page Not Found</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
        <h1
          className="text-6xl font-bold text-primary"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          404
        </h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Go back home
        </Link>
      </div>
    </>
  )
}
