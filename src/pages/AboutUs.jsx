import React from "react";
import { Header } from "../components/Header";

import { AboutHero } from "../components/AboutHero";
import { AboutSection } from "../components/AboutSection";
import { ImpactSection } from "../components/ImpactSection";
import { SuccessStories } from "../components/SuccessStories";
import { CommunityGallery } from "../components/CommunityGallery";
import { JoinCommunity } from "../components/JoinCommunity";
import { Navbar } from "../components/Navbar/Navbar";

export const AboutUs = () => {
  return (
    <>
    <Navbar/>
      <main className="overflow-hidden pt-">

        <AboutHero />

        <AboutSection />

        <ImpactSection />

        <SuccessStories />

        <CommunityGallery />

        <JoinCommunity />

      </main>
    </>
  );
};