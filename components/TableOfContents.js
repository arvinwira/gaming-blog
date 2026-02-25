'use client';

import { useState, useEffect } from 'react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('.prose h2, .prose h3')
    );
    setHeadings(headingElements);
  }, []);

  return (
    <nav>
      <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
      <ul>
        {headings.map((heading, index) => (
          <li key={index} className="mb-2">
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {heading.innerText}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}