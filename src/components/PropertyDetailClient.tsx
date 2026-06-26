"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "../../types/property";
import Carousel from "./Carousel";

type PropertyDetailClientProps = {
  property: Property;
};

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [property.id]);

  const ratingValue = Number(property.rating || property.rating_avg || 0);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Back to Listings CTA */}
      <div className="w-full max-w-[970px] pb-2 pt-5 px-[7px] mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gris-light hover:bg-[#e8e8e8] active:scale-95 text-gris-dark hover:text-black px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all duration-200 cursor-pointer"
        >
          {/* Left Arrow Icon */}
          <svg
            className="size-[12px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Retour aux annonces
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[970px] flex flex-col gap-6">
        
        {/* Info Grid (Title, Location, Host Card, Collapses) */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Section: Details, Carousel & Collapse Panels */}
          <div className="w-full lg:w-[616px] flex flex-col gap-6">
            
            {/* Interactive Collage Carousel */}
            {property.pictures && property.pictures.length > 0 && (
              <Carousel pictures={property.pictures} title={property.title} />
            )}
            
            {/* Info Card */}
            <div className="w-full bg-white border border-gris-light rounded-[10px] p-6 flex flex-col gap-6">
              {/* Title & Location */}
              <div className="flex flex-col gap-3">
                <h1 className="text-[20px] md:text-[24px] font-medium text-black leading-[1.3]">
                  {property.title}
                </h1>
                
                {/* Location with Pin Icon */}
                <div className="flex gap-2 items-center text-gris-dark text-[14px]">
                  <svg
                    className="size-[16px] shrink-0 text-gris-dark"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="text-[14px] text-black leading-[1.5] border-t border-gris-light pt-4">
                <p>{property.description}</p>
              </div>

              {/* Équipements */}
              {property.equipments && property.equipments.length > 0 && (
                <div className="flex flex-col gap-3 border-t border-gris-light pt-4">
                  <span className="text-[14px] font-medium text-black">Équipements</span>
                  <div className="flex flex-wrap gap-2">
                    {property.equipments.map((equipment) => (
                      <span
                        key={equipment}
                        className="bg-gris-light text-gris-dark text-[12px] px-4 py-2 rounded-[5px] font-normal"
                      >
                        {equipment}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Category / Tags */}
              {property.tags && property.tags.length > 0 && (
                <div className="flex flex-col gap-3 border-t border-gris-light pt-4">
                  <span className="text-[14px] font-medium text-black">Catégorie</span>
                  <div className="flex flex-wrap gap-2">
                    {property.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gris-light text-gris-dark text-[12px] px-4 py-2 rounded-[5px] font-normal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Host Card */}
          <div className="w-full lg:w-[345px] bg-white border border-gris-light rounded-[10px] p-6 flex flex-col gap-6">
            
            {/* Host Details Title */}
            <h2 className="text-[16px] font-medium text-black">Votre hôte</h2>

            {/* Host Info Row */}
            <div className="flex items-center gap-[18px]">
              
              {/* Host Picture */}
              {property.host?.picture && (
                <div className="relative size-[82px] rounded-[10px] overflow-hidden bg-gris-light shrink-0">
                  <Image
                    alt={property.host.name}
                    className="object-cover"
                    src={property.host.picture}
                    fill
                    sizes="82px"
                  />
                </div>
              )}

              {/* Host Name */}
              <span className="text-[16px] font-normal text-black leading-[1.4] break-words flex-grow">
                {property.host.name}
              </span>

              {/* Host Rating Badge */}
              <div
                className="bg-gris-light flex gap-1 items-center px-3 py-2 rounded-[10px] shrink-0"
                aria-label={`Note : ${ratingValue} sur 5`}
              >
                <svg
                  className="size-[19px] text-main-red fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="font-normal text-[16px] text-black">
                  {ratingValue}
                </span>
              </div>
            </div>

            {/* Price Per Night Section (Sprint requirement) */}
            <div className="flex justify-between items-baseline border-t border-gris-light pt-6">
              <span className="text-[16px] font-medium text-black">Prix</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-bold text-main-red">
                  {property.price_per_night}€
                </span>
                <span className="text-gris-dark text-[14px]">/ nuit</span>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col gap-3 border-t border-gris-light pt-6">
              <button
                type="button"
                className="w-full bg-main-red hover:bg-[#852b14] active:scale-[0.98] text-white font-medium text-[14px] py-3 rounded-[10px] transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-red"
              >
                Contacter l’hôte
              </button>
              
              <button
                type="button"
                className="w-full bg-main-red hover:bg-[#852b14] active:scale-[0.98] text-white font-medium text-[14px] py-3 rounded-[10px] transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-red"
              >
                Envoyer un message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
