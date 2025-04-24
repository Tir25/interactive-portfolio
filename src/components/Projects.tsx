import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeIn, staggerContainer, cardHover, tiltEffect } from '../utils/animations';

// Use "as any" to work around TypeScript errors with motion components
const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionH3 = motion.h3 as any;
const MotionSpan = motion.span as any;
const MotionA = motion.a as any;

// Optimized simpler animations
const simpleFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const simpleStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Projects: React.FC = () => {
  // Use refs and inView for more efficient animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const projects = [
    {
      title: 'SafeReach',
      description: 'A next-generation emergency response app designed to connect individuals in distress to emergency services and nearby community responders in real time — with a strong focus on security, privacy, and anti-abuse logic.',
      technologies: ['Kotlin', 'Android', 'Firebase', 'Google Maps API'],
      image: '/safereach-thumbnail.png',
      link: 'https://github.com/Tir25/SafeReach-',
    },
    {
      title: 'Lifeswap Game',
      description: 'An innovative game concept that allows players to experience different lives and realities, offering unique gameplay mechanics and immersive storytelling.',
      technologies: ['Unity', 'C#', 'Game Design', 'UI/UX'],
      image: '/lifeswap-game-icon.svg',
      link: 'https://github.com/Tir25/Lifeswap-Game',
    },
  ];

  // Lazy load images with Intersection Observer
  useEffect(() => {
    // Only run if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });

      // Target all lazy images
      document.querySelectorAll('.lazy-img').forEach(img => {
        imgObserver.observe(img);
      });

      return () => {
        document.querySelectorAll('.lazy-img').forEach(img => {
          imgObserver.unobserve(img);
        });
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('.lazy-img').forEach(img => {
        const element = img as HTMLImageElement;
        if (element.dataset.src) {
          element.src = element.dataset.src;
          element.classList.add('loaded');
        }
      });
    }
  }, []);

  return (
    <section 
      id="projects" 
      className="min-h-screen flex flex-col items-center justify-center py-20 mobile-padding tablet-padding"
      ref={sectionRef}
    >
      <MotionDiv 
        className="max-w-6xl mx-auto px-4 w-full"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={simpleFadeIn}
      >
        <MotionH2 
          className="text-4xl font-bold mb-8 md:mb-12 text-center text-white font-playfair"
          variants={simpleFadeIn}
        >
          My Projects
        </MotionH2>
        <MotionDiv 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
          variants={simpleStagger}
        >
          {projects.map((project, index) => (
            <MotionDiv 
              key={index} 
              className="bg-white/10 dark:bg-gray-800/20 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 gpu-accelerated"
              variants={simpleFadeIn}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative overflow-hidden h-48 md:h-60">
                {/* Placeholder while image loads */}
                <div className="absolute inset-0 bg-gray-700/50 animate-pulse"></div>
                
                <img 
                  className="lazy-img w-full h-full object-cover object-center opacity-0 transition-opacity duration-300"
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  data-src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  onLoad={(e) => (e.target as HTMLImageElement).classList.add('opacity-100')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 font-playfair bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{project.title}</h3>
                <p className="text-gray-200 dark:text-gray-300 mb-3 md:mb-4 font-inter text-sm md:text-base">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-blue-600/20 text-blue-200 dark:bg-blue-900/30 dark:text-blue-200 text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full font-inter"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="text-blue-300 dark:text-blue-400 font-medium hover:underline inline-flex items-center group font-inter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project on GitHub
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};

export default Projects; 