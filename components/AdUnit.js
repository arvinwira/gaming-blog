'use client';

import { useEffect } from 'react';

export default function AdUnit() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className="my-10 flex justify-center">
      <div className="w-full overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            minHeight: '250px',
          }}
          data-ad-client="ca-pub-8887590102646300"
          data-ad-slot="9621158542"
          data-ad-format="auto"
          data-full-width-responsive="true"
          aria-label="Advertisement"
        />
      </div>
    </div>
  );
}