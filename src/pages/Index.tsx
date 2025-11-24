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
import { FloatingParticles } from "@/components/FloatingParticles";
import { ThreeDParticles } from "@/components/ThreeDParticles";
import LoadingScreen from "@/components/LoadingScreen";
import AIChatbot from "@/components/AIChatbot";
import ProjectExplainerAgent from "@/components/ProjectExplainerAgent";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import Certifications from "@/components/Certifications";
import Internships from "@/components/Internships";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <ScrollProgress />
      <div className="min-h-screen bg-background dark">
        <FloatingParticles />
        <ThreeDParticles />
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Internships />
        <GitHubStats />
        <CodingStats />
        <Achievements />
        <Experience />
        <Blog />
        <Guestbook />
        <Contact />
        <Footer />
        <BackToTop />
        <AIChatbot />
        <ProjectExplainerAgent />
      </div>
    </>
  );
};

export default Index;