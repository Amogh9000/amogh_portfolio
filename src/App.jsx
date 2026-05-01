import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import SmoothScroll from './components/SmoothScroll';
import SectionDivider from './components/SectionDivider';
import Certifications from './components/Certifications';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';

const App = () => {
  return (
    <>
      <CustomCursor />
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main className="bg-black min-h-screen text-white w-full overflow-hidden">
          <Hero />

          <SectionDivider text="INTELLIGENCE • SYSTEMS • DATA • AGENTIC_AI • " />

          <About />

          <SectionDivider text="EXPERIENCE • JOURNEY • GROWTH • " />

          <div id="experience"><Experience /></div>

          <SectionDivider text="SELECTED • WORKS • PROJECTS • " />

          <div id="projects"><Projects /></div>

          <SectionDivider text="SKILLS • CAPABILITIES • TECH • " />

          <div id="skills"><Skills /></div>

          <SectionDivider text="ACHIEVEMENTS • CREDENTIALS • GOALS • " />

          <div id="certifications"><Certifications /></div>







          <div id="contact"><Contact /></div>
        </main>
      </SmoothScroll>
    </>
  );
};

export default App;

