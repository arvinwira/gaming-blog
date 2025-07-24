'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ShareThisInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        typeof window !== 'undefined' &&
        window.__sharethis__ &&
        !document.querySelector('.sharethis-inline-share-buttons .st-btn')
      ) {
        window.__sharethis__.initialize();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
