'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight === 0) return setWidth(0);
      const scrollPosition = window.scrollY;
      setWidth((scrollPosition / totalHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-2 bg-secondary">
      <div
        className="h-2 bg-primary rounded-r-full transition-[width] duration-200 shadow-secondary"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
