'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TrendingCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    
    // Set initial state
    onSelect();

    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const onDotButtonClick = React.useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="max-w-6xl mx-auto my-8">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((post, index) => (
            <div className="embla__slide p-4" key={index}>
              <Link href={`/blog/${post.slug}`} className="block group">
              <section className="relative bg-card border border-border rounded-3xl shadow-2xl shadow-secondary overflow-hidden h-[500px]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/95 via-black/80 to-transparent" />

                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full text-white">
                  <div className="text-sm font-semibold mb-2 inline-block">
                    Trending
                  </div>
                  <h1 className="text-3xl text-primary md:text-5xl font-bold max-w-2xl group-hover:underline">
                    {post.title}
                  </h1>
                </div>
              </section>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* --- NEW DOT INDICATORS --- */}
      <div className="flex justify-center items-center gap-3 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-primary scale-125' : 'bg-secondary'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}