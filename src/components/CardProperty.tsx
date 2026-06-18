"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Property } from "../../types/property";

type CardPropertyProps = {
  property: Property;
};

export default function CardProperty({ property }: CardPropertyProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if token exists in localStorage (or cookies)
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if user is not authenticated
      router.push("/login");
    } else {
      // Toggle favorite state if authenticated
      setIsFavorited(!isFavorited);
    }
  };

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group flex flex-col items-start relative w-full mx-auto bg-white rounded-[10px] overflow-hidden hover:shadow transition-shadow duration-300 border border-[#f5f5f5]"
    >
      {/* Cover Image Container */}
      <div className="h-[376px] w-full overflow-hidden relative bg-[#f5f5f5]">
        <Image
          alt={property.title}
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out transform-gpu"
          src={property.cover}
          fill
          quality={100}
          
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute right-[16px] top-[16px] flex items-center justify-center bg-[#f5f5f5] hover:bg-white text-[#565656] hover:text-[#99331a] active:scale-95 transition-all duration-200 rounded-[5px] size-[32px] cursor-pointer shadow-sm z-10"
          aria-label={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorited ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className={`size-[16px] transition-colors duration-200 ${
              isFavorited ? "text-[#99331a]" : "text-[#565656]"
            }`}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      {/* Details Container */}
      <div className="flex flex-col h-[176px] justify-between p-6 w-full bg-white">
        {/* Title and Location */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-sans font-medium text-[18px] text-[#0d0d0d] leading-[1.4] line-clamp-2">
            {property.title}
          </h3>
          <p className="font-sans font-normal text-[14px] text-[#565656] leading-[1.4]">
            {property.location}
          </p>
        </div>

        {/* Price */}
        <div className="flex gap-[6px] items-baseline text-[14px] leading-[1.4] mt-auto">
          <span className="font-sans font-medium text-[#0d0d0d]">
            {property.price_per_night}€
          </span>
          <span className="font-sans font-normal text-[#565656]">
            par nuit
          </span>
        </div>
      </div>
    </Link>
  );
}
