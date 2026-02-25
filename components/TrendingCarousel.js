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
              <Link href={`/blog/${post.slug}`} className="block group w-full h-full cursor-pointer">
                <section className="relative bg-card border border-border rounded-3xl shadow-xl overflow-hidden h-[450px] md:h-[550px] lg:h-[600px] transition-all duration-500 hover:shadow-primary/20">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    priority={index === 0}
                  />

                  {/* Enhanced dark gradient overlay for optimal text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end h-full z-10 transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-white/20 inline-flex items-center gap-1.5 backdrop-blur-sm relative z-20">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                        </svg>
                        Trending
                      </span>
                      {post.categories && post.categories.length > 0 && (
                        <span className="text-sm font-bold text-secondary uppercase tracking-widest hidden sm:inline-block">
                          {post.categories[0]}
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                      {post.title}
                    </h1>
                    {post.excerpt && (
                      <p className="text-white/80 font-medium text-base md:text-lg max-w-2xl line-clamp-2 md:line-clamp-3 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
                        {post.excerpt}
                      </p>
                    )}
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-primary scale-125' : 'bg-secondary'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}