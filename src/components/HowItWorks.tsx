import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Recherchez",
      description: "Entrez votre destination, vos dates et laissez Kasa faire le reste",
    },
    {
      title: "Réservez",
      description: "Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.",
    },
    {
      title: "Vivez l’expérience",
      description: "Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.",
    },
  ];

  return (
    <section className="bg-white rounded-[10px] p-6 md:p-10 flex flex-col gap-10 items-center justify-center border border-[#f5f5f5] shadow-sm w-full">
      {/* Title block */}
      <div className="flex flex-col gap-4 items-center justify-center text-center max-w-[740px]">
        <h2 className="font-sans font-semibold text-2xl md:text-3xl text-[#0d0d0d] leading-[1.4]">
          Comment ça marche ?
        </h2>
        <p className="font-sans font-normal text-sm md:text-base text-[#565656] leading-[1.6]">
          Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.
        </p>
      </div>

      {/* Steps cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#842c16] border border-[#f5f5f5] flex flex-col gap-4 h-[199px] items-start p-8 rounded-[10px] text-white hover:bg-[#99331a] transition-colors duration-300 shadow-sm"
          >
            <h3 className="font-sans font-medium text-lg md:text-xl">
              {step.title}
            </h3>
            <p className="font-sans font-normal text-xs md:text-sm leading-relaxed text-slate-100">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
