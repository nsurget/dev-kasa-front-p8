import React from "react";
import { Metadata } from "next";
import Container from "@/components/Container";
import Banner from "@/components/Banner";
import TextImageBlock from "@/components/TextImageBlock";

export const metadata: Metadata = {
  title: "À propos - Kasa",
  description: "En savoir plus sur la mission de Kasa, notre vision de la location d'appartements entre particuliers et nos engagements.",
};

export default function AboutPage() {
  const missionListContent = (
    <ol className="list-decimal pl-5 flex flex-col gap-3 text-[#0d0d0d]">
      <li className="pl-1">
        <span className="font-medium">Offrir une plateforme fiable et simple d’utilisation</span>
      </li>
      <li className="pl-1">
        <span className="font-medium">Proposer des hébergements variés et de qualité</span>
      </li>
      <li className="pl-1">
        <span className="font-medium">Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</span>
      </li>
    </ol>
  );

  const missionSecondaryContent = (
    <p className="font-medium text-[#99331a] text-[16px] md:text-[18px] leading-[1.5]">
      Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir inoubliable.
    </p>
  );

  return (
    <Container className="flex flex-col gap-12 py-8">
      {/* Hero Banner */}
      <Banner
        title="À propos"
        description={
          <div className="flex flex-col gap-2">
            <p>Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.</p>
            <p>Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.</p>
          </div>
        }
        imageSrc="/assets/hero-a-propos.png"
        imageAlt="Kasa - Notre histoire et nos engagements"
      />

      {/* Mission Block */}
      <TextImageBlock
        title="Notre mission est simple :"
        content={missionListContent}
        secondaryContent={missionSecondaryContent}
        imageSrc="/assets/content-a-propos.png"
        imageAlt="Notre mission - Kasa"
        secondaryCtaText="Voir nos logements"
        secondaryCtaLink="/#properties-list"
        imagePosition="right"
      />
    </Container>
  );
}
