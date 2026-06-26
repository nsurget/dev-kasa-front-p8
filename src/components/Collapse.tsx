"use client";

import React, { useState, useId } from "react";

type CollapseProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Collapse({ title, children, className = "" }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Collapse Header Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex justify-between items-center bg-main-red text-white py-3 px-4 rounded-[5px] text-[13px] md:text-[18px] font-medium cursor-pointer focus:outline-none transition-colors duration-200 hover:bg-[#852b14]"
      >
        <span>{title}</span>
        {/* Chevron Icon */}
        <svg
          className={`size-[16px] md:size-[24px] transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Collapse Content Wrapper */}
      <div
        id={contentId}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out bg-gris-light rounded-b-[5px] ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 text-[12px] md:text-[18px] text-gris-dark leading-[1.5]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
