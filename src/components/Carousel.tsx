"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type CarouselProps = {
  pictures: string[];
  title: string;
  className?: string;
};

export default function Carousel({ pictures, title, className = "" }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbPage, setThumbPage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const thumbnailsPerPage = 4;
  const totalThumbPages = Math.ceil(pictures.length / thumbnailsPerPage);
  const hasMultipleImages = pictures.length > 1;

  const nextSlide = useCallback(() => {
    const nextIndex = activeIndex === pictures.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
    setThumbPage(Math.floor(nextIndex / thumbnailsPerPage));
  }, [activeIndex, pictures.length]);

  const prevSlide = useCallback(() => {
    const nextIndex = activeIndex === 0 ? pictures.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
    setThumbPage(Math.floor(nextIndex / thumbnailsPerPage));
  }, [activeIndex, pictures.length]);

  const selectSlide = (picIndex: number) => {
    setActiveIndex(picIndex);
    setThumbPage(Math.floor(picIndex / thumbnailsPerPage));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;

    if (e.key === "ArrowRight") {
      if (isLightboxOpen) {
        nextSlide();
      } else {
        nextSlide();
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      if (isLightboxOpen) {
        prevSlide();
      } else {
        prevSlide();
      }
      e.preventDefault();
    } else if (e.key === "Escape" && isLightboxOpen) {
      setIsLightboxOpen(false);
      e.preventDefault();
    }
  };

  // Keyboard navigation on global window when lightbox is open
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen || !hasMultipleImages) return;
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isLightboxOpen, hasMultipleImages, nextSlide, prevSlide]);

  // Thumbnails displayed on current page
  const startIndex = thumbPage * thumbnailsPerPage;

  const nextThumbPage = () => {
    setThumbPage((prev) => (prev === totalThumbPages - 1 ? 0 : prev + 1));
  };

  const prevThumbPage = () => {
    setThumbPage((prev) => (prev === 0 ? totalThumbPages - 1 : prev - 1));
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`w-full flex flex-col sm:flex-row gap-[10px] items-stretch focus:outline-none select-none ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Photos de ${title}`}
    >
      {/* 1. Main Visual Box (Left / Full width if single image) */}
      <div 
        className={`relative rounded-[10px] overflow-hidden bg-[#f5f5f5] group shrink-0 shadow-sm border border-[#f5f5f5] cursor-zoom-in ${
          hasMultipleImages 
            ? "w-full sm:w-[303px] aspect-[303/357]" 
            : "w-full h-[223px] sm:h-[357px]"
        }`}
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          alt={`${title} - Photo principale`}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          src={pictures[activeIndex]}
          fill
          priority
          sizes={hasMultipleImages ? "(max-width: 640px) 100vw, 303px" : "(max-width: 768px) 100vw, 616px"}
        />

        {/* Counter Overlay */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white font-medium text-[14px] px-3 py-1 rounded-full backdrop-blur-[2px] z-10">
            {activeIndex + 1} / {pictures.length}
          </div>
        )}

        {/* Hover zoom message */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
          <span className="bg-white/85 text-black text-xs font-semibold px-3 py-1.5 rounded-[5px] shadow-sm flex items-center gap-1">
            <svg className="size-[14px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
            </svg>
            Voir en grand
          </span>
        </div>
      </div>

      {/* 2. Thumbnails Grid Box (Right - only if multiple images) */}
      {hasMultipleImages && (
        <div className="w-full sm:w-[303px] flex flex-col justify-between shrink-0">
          
          {/* Thumbnails Grid (1x4 on mobile, 2x2 on desktop) */}
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-[8px] sm:gap-[10px] aspect-[4/1.1] sm:aspect-[303/358] sm:h-[358px] w-full">
            {Array.from({ length: thumbnailsPerPage }).map((_, i) => {
              const picIndex = startIndex + i;
              const picUrl = pictures[picIndex];
              const isSelected = picIndex === activeIndex;

              if (!picUrl) {
                // Empty slot helper to maintain grid shape
                return <div key={`empty-${i}`} className="bg-gris-light rounded-[10px] opacity-30 border border-dashed border-gris-dark/20" />;
              }

              return (
                <button
                  key={picUrl}
                  type="button"
                  onClick={() => selectSlide(picIndex)}
                  className={`relative w-full h-full overflow-hidden rounded-[10px] cursor-pointer transition-all duration-200 focus:outline-none border-2 ${
                    isSelected 
                      ? "border-main-red ring-2 ring-main-red/35 scale-[0.98] shadow-sm" 
                      : "border-transparent hover:scale-[1.02]"
                  }`}
                  aria-label={`Photo miniature ${picIndex + 1}`}
                  aria-current={isSelected ? "true" : "false"}
                >
                  <Image
                    alt={`${title} - Thumbnail ${picIndex + 1}`}
                    className={`object-cover transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
                    src={picUrl}
                    fill
                    sizes="150px"
                  />
                </button>
              );
            })}
          </div>

          {/* Thumbnails Pagination Bar */}
          {totalThumbPages > 1 && (
            <div className="flex items-center justify-between mt-2 px-2 py-1 bg-gris-light rounded-[8px]">
              <button
                onClick={prevThumbPage}
                type="button"
                className="text-gris-dark hover:text-black p-1 hover:bg-black/5 rounded cursor-pointer transition-colors"
                aria-label="Page de miniatures précédente"
              >
                <svg className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              <span className="text-[12px] font-medium text-gris-dark">
                {thumbPage + 1} / {totalThumbPages}
              </span>

              <button
                onClick={nextThumbPage}
                type="button"
                className="text-gris-dark hover:text-black p-1 hover:bg-black/5 rounded cursor-pointer transition-colors"
                aria-label="Page de miniatures suivante"
              >
                <svg className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie photo plein écran"
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            type="button"
            className="absolute top-6 right-6 text-white hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer size-[48px] flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full z-[100]"
            aria-label="Fermer la galerie plein écran"
          >
            <svg className="size-[28px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Arrow */}
          {hasMultipleImages && (
            <button
              onClick={prevSlide}
              type="button"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer size-[48px] md:size-[64px] flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full z-[100]"
              aria-label="Image précédente"
            >
              <svg className="size-[28px] md:size-[40px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Main Lightbox Image */}
          <div className="relative w-[90vw] h-[80vh] flex items-center justify-center">
            {pictures.map((pic, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={`lightbox-${pic}`}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isActive ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  <Image
                    alt={`${title} - Photo plein écran ${index + 1}`}
                    className="object-contain max-w-full max-h-full"
                    src={pic}
                    fill
                    sizes="90vw"
                  />
                </div>
              );
            })}
          </div>

          {/* Next Arrow */}
          {hasMultipleImages && (
            <button
              onClick={nextSlide}
              type="button"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer size-[48px] md:size-[64px] flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full z-[100]"
              aria-label="Image suivante"
            >
              <svg className="size-[28px] md:size-[40px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

          {/* Lightbox Counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-medium text-[18px] tracking-wide bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
              {activeIndex + 1} / {pictures.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
