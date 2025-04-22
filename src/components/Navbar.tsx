import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

// Create properly typed motion components for the navbar
const MotionNav = motion.nav as any;
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;
const MotionA = motion.a as any;
const MotionSpan = motion.span as any;

// Define animation variants
const navItemVariants = {
  initial: { 
    scale: 1,
    color: 'rgba(148, 163, 184, 1)',
    textShadow: '0 0 0px rgba(59, 130, 246, 0)'
  },
  hover: { 
    scale: 1.05,
    color: 'rgba(59, 130, 246, 1)',
    textShadow: '0 0 15px rgba(59, 130, 246, 0.7)',
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 10 
    }
  },
  active: {
    scale: 1.05,
    color: 'rgba(96, 165, 250, 1)',
    textShadow: '0 0 20px rgba(96, 165, 250, 0.9)',
  },
  tap: { 
    scale: 0.95,
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 10 
    }
  }
};

const logoVariants = {
  initial: { 
    scale: 1,
    textShadow: '0 0 0px rgba(59, 130, 246, 0)'
  },
  hover: { 
    scale: 1.05,
    textShadow: '0 0 15px rgba(59, 130, 246, 0.7)',
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 10 
    }
  }
};

const navContainerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.1
    }
  }
};

// Glowing dots variants
const glowingDotVariants = {
  initial: { 
    scale: 1,
    opacity: 0.7,
  },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Navbar collapse/expand variants
const navbarCollapseVariants = {
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  hidden: { 
    y: -100,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFullNav, setIsFullNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we should hide or show navbar
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scrolling down - hide navbar
        setIsNavVisible(false);
      } else {
        // Scrolling up or at top - show navbar
        setIsNavVisible(true);
      }
      
      // Add shadow and collapse effect when scrolled
      setIsScrolled(currentScrollY > 50);
      
      // Show compact navbar when scrolled down
      setIsFullNav(currentScrollY <= 50);
      
      // Update scroll position
      setLastScrollY(currentScrollY);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'timeline', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <MotionNav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 
        ${isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'bg-transparent'}`
      }
      initial="hidden"
      animate={isNavVisible ? "visible" : "hidden"}
      variants={navbarCollapseVariants}
    >
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <MotionDiv 
        className="max-w-6xl mx-auto px-4 py-3"
        variants={navContainerVariants}
      >
        {/* Centered container for all navbar content */}
        <div className="flex flex-col items-center justify-center">
          {/* Logo centered */}
          <MotionA 
            href="#hero" 
            className={`flex items-center ${isFullNav ? 'mb-3' : 'mb-0'}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
          >
            <Logo size={isFullNav ? "md" : "sm"} />
          </MotionA>
          
          {/* Navigation menu centered underneath logo */}
          {isFullNav && (
            <div className="hidden md:flex items-center justify-center space-x-6 py-2">
              {navItems.map((item, index) => (
                <MotionA
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium glass-effect transition-all duration-300 ${activeSection === item.id ? 'blue-glow' : 'hover:blue-glow'}`}
                  variants={navItemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  animate={activeSection === item.id ? "active" : "initial"}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {/* Glowing dot indicator */}
                  {activeSection === item.id && (
                    <MotionSpan
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500"
                      variants={glowingDotVariants}
                      initial="initial"
                      animate="animate"
                    />
                  )}
                  {item.label}
                </MotionA>
              ))}
            </div>
          )}
          
          {/* Compact menu for scrolled state */}
          {!isFullNav && (
            <div className="hidden md:flex items-center justify-center space-x-4 py-1">
              {navItems.map((item, index) => (
                <MotionA
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3 py-1 rounded-full text-xs font-medium glass-effect transition-all duration-300 ${activeSection === item.id ? 'blue-glow' : 'hover:blue-glow'}`}
                  variants={navItemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  animate={activeSection === item.id ? "active" : "initial"}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {/* Glowing dot indicator */}
                  {activeSection === item.id && (
                    <MotionSpan
                      className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-blue-500"
                      variants={glowingDotVariants}
                      initial="initial"
                      animate="animate"
                    />
                  )}
                  {item.label}
                </MotionA>
              ))}
            </div>
          )}
          
          {/* Mobile Menu Button - centered */}
          <MotionDiv 
            className="md:hidden"
            variants={navItemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <button className="p-2 rounded-full glass-effect futuristic-border">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </MotionDiv>
        </div>
      </MotionDiv>

      {/* Visual Futuristic Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-3xl"></div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-3xl"></div>
      
      {/* Glowing dots at corners */}
      <MotionSpan
        className="absolute top-4 left-4 w-2 h-2 rounded-full bg-blue-500"
        variants={glowingDotVariants}
        initial="initial"
        animate="animate"
      />
      <MotionSpan
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-500"
        variants={glowingDotVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
      />
    </MotionNav>
  );
};

export default Navbar; 