import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ThemeBackground from './components/ThemeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AnimatedTree from './components/AnimatedTree';
import AnimatedBirds from './components/AnimatedBirds';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans relative">
        <ThemeBackground />
        <ThemeToggle />
        <AnimatedTree />
        <AnimatedBirds />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Timeline />
            <Projects />
            <Contact />
          </main>
          <footer className="py-6 text-center text-gray-500 text-sm backdrop-blur-sm bg-white/10 dark:bg-gray-800/10">
            <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App; 