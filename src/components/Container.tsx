import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full max-w-[1240px] mx-auto px-[5px] sm:px-4 md:px-5 ${className}`}>
      {children}
    </div>
  );
}
