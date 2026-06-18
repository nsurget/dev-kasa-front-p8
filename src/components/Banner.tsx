import React from "react";
import Image from "next/image";

type BannerProps = {
  title: React.ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function Banner({ title, description, imageSrc, imageAlt }: BannerProps) {
  return (
    <section className="flex flex-col gap-[40px] items-center justify-center w-full">
      {/* Title and Subtitle */}
      <div className="flex flex-col gap-[8px] items-center justify-center text-center w-full max-w-[742px]">
        <h1 className="font-bold text-[32px] text-[#99331a] leading-[1.426] tracking-tight">
          {title}
        </h1>
        <p className="font-normal text-[14px] text-[#0d0d0d] leading-[1.426] max-w-[620px]">
          {description}
        </p>
      </div>

      {/* Banner Image Card */}
      <div className="relative w-full h-[458px] overflow-hidden rounded-[20px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1240px) 100vw, 1240px"
        />
      </div>
    </section>
  );
}
