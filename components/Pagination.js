'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/categories?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <Link 
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 border border-primary text-primary rounded-lg font-semibold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Previous
      </Link>
      <span className="text-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Link 
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 border border-primary text-primary rounded-lg font-semibold ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
      </Link>
    </div>
  );
}