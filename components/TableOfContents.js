'use client';

import { useState, useEffect, useRef } from 'react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const observer = useRef(null);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('.prose h2, .prose h3')
    );
    setHeadings(headingElements);

    const handleIntersect = (entries) => {
      // Find the first heading that is currently in the viewport
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-100px 0px -40% 0px',
      threshold: [0, 1],
    });

    headingElements.forEach((el) => {
      if (el.id) observer.current.observe(el);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
      <h3 className="font-bold text-lg mb-4 text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
        Navigate
      </h3>
      <ul className="space-y-1 border-l border-border/50 ml-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.tagName === 'H3';

          return (
            <li
              key={index}
              className={`transition-all duration-200 ${isH3 ? 'ml-4' : ''}`}
            >
              <a
                href={`#${heading.id}`}
                className={`
                  block py-1.5 px-3 rounded-r-lg text-sm transition-all duration-300
                  hover:translate-x-1 hover:bg-accent/40
                  ${isActive
                    ? 'text-primary font-bold bg-primary/10 border-l-2 border-primary -ml-[2px]'
                    : 'text-muted-foreground hover:text-primary'
                  }
                `}
              >
                {heading.innerText}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}