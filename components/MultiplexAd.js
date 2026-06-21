'use client';

import { useEffect } from 'react';

export default function MultiplexAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className="my-12 flex justify-center">
      <div className="w-full overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            minHeight: '300px',
          }}
          data-ad-client="ca-pub-8887590102646300"
          data-ad-slot="5752241893"
          data-ad-format="autorelaxed"
          aria-label="Recommended content"
        />
      </div>
    </div>
  );
}