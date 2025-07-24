'use client';


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShareThisInitializer() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (
        typeof window !== 'undefined' &&
        window.__sharethis__ &&
        !document.querySelector('.sharethis-inline-share-buttons .st-btn')
      ) {
        window.__sharethis__.initialize();
      }
    };

    handleRouteChange(); 
    router.events?.on?.('routeChangeComplete', handleRouteChange);

    return () => {
      router.events?.off?.('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return null;
}
