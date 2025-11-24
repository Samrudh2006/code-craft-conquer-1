import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import GitHubStats from "@/components/GitHubStats";
import CodingStats from "@/components/CodingStats";
import Guestbook from "@/components/Guestbook";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
{ isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} /> }
      <ScrollProgress />
      <div className="min-h-screen bg-background dark">
        <FloatingParticles />
        <ThreeDParticles />
        <AIChatbot />
        <ProjectExplainerAgent />
      </div>
    </>
  );
};

export default Index;