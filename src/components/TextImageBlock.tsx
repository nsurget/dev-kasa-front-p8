import React from "react";
import Image from "next/image";
import Link from "next/link";

type TextImageBlockProps = {
  title: string;
  content: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaLink?: string;
  secondaryContent?: React.ReactNode;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
};

export default function TextImageBlock({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  ctaText,
  ctaLink,
  secondaryContent,
  secondaryCtaText,
  secondaryCtaLink,
}: TextImageBlockProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className={`flex flex-col ${isImageLeft ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between gap-8 lg:gap-16 w-full py-8`}>
      {/* Text Content Block */}
      <div className="flex-1 flex flex-col gap-6 items-start w-full">
        <h3 className="font-bold text-[18px] md:text-[24px] text-[#99331a] leading-[1.426] tracking-tight">
          {title}
        </h3>
        <div className="font-normal text-[12px] md:text-[14px] text-[#0d0d0d] leading-[1.6] w-full">
          {content}
        </div>
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="inline-block bg-main-red text-white text-[14px] font-medium px-[32px] py-[8px] rounded-[10px] text-center hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2"
          >
            {ctaText}
          </Link>
        )}

        {/* Desktop-only secondary content */}
        {secondaryContent && (
          <div className="hidden lg:flex flex-col gap-6 items-start w-full mt-6">
            <div className="font-normal text-[12px] md:text-[14px] text-[#0d0d0d] leading-[1.6] w-full">
              {secondaryContent}
            </div>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="inline-block bg-main-red text-white text-[14px] font-medium px-[32px] py-[8px] rounded-[10px] text-center hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Image Block */}
      <div className="relative w-full lg:w-[494px] h-[300px] md:h-[458px] overflow-hidden rounded-[20px] shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 494px"
        />
      </div>

      {/* Mobile-only secondary content (renders under the image) */}
      {secondaryContent && (
        <div className="flex lg:hidden flex-col gap-6 items-start w-full mt-4">
          <div className="font-normal text-[12px] text-[#0d0d0d] leading-[1.6] w-full">
            {secondaryContent}
          </div>
          {secondaryCtaText && secondaryCtaLink && (
            <Link
              href={secondaryCtaLink}
              className="inline-block bg-main-red text-white text-[14px] font-medium px-[32px] py-[8px] rounded-[10px] text-center hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2"
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
