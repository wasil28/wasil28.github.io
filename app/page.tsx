import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Stack from "./components/Stack";
import RadarChart from "./components/RadarChart";
import Projects from "./components/Projects";
import ProblemSolving from "./components/ProblemSolving";
import SystemArchitecture from "./components/SystemArchitecture";
import AIWorkflow from "./components/AIWorkflow";
import WorkDay from "./components/WorkDay";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

import ReadingProgress from "./components/ReadingProgress";
import BackToTop from "./components/BackToTop";
import SectionDotNav from "./components/SectionDotNav";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import CustomCursor from "./components/CustomCursor";
import StickyCTA from "./components/StickyCTA";

export default function Home() {
  return (
    <>
      {/* Chrome — always on top, outside main flow */}
      <ReadingProgress />
      <BackToTop />
      <SectionDotNav />
      <KeyboardShortcuts />
      <CustomCursor />
      <StickyCTA />

      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Stack />
        <RadarChart />
        <Projects />
        <ProblemSolving />
        <SystemArchitecture />
        <AIWorkflow />
        <WorkDay />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
