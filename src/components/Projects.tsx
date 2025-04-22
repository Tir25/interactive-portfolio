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
      link: 'https://github.com/Tir25/SafeReach-.git',
    },
    {
      title: 'Lifeswap Game',
      description: 'An innovative game concept that allows players to experience different lives and realities, offering unique gameplay mechanics and immersive storytelling.',
      technologies: ['Unity', 'C#', 'Game Design', 'UI/UX'],
      image: '/lifeswap-game-icon.svg',
      link: 'https://github.com/Tir25/Lifeswap-Game.git',
    },
  ];

  // Placeholder for future GitHub contributions
  const contributions = [
    // This section will be populated with actual contributions later
    {
      title: "Ready for Open Source Contributions",
      repo: "Future Open Source Project",
      description: "This space will showcase my public contributions to open source projects on GitHub.",
      status: "Coming Soon",
      type: "placeholder"
    }
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

        {/* GitHub Contributions Section - Optimized */}
        <MotionDiv
          className="mt-16 md:mt-20 w-full"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={simpleFadeIn}
        >
          <MotionH3
            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center font-playfair bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
            variants={simpleFadeIn}
          >
            GitHub Contributions
          </MotionH3>
          
          <div className="relative mb-6 md:mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 px-4 text-sm text-gray-400 font-inter">Open Source Activity</span>
            </div>
          </div>

          {contributions.length === 0 ? (
            <div className="text-center text-gray-400 py-8 md:py-10 font-inter">
              No public contributions yet. Check back soon!
            </div>
          ) : (
            <MotionDiv
              className="grid grid-cols-1 gap-4 md:gap-6"
              variants={simpleStagger}
            >
              {contributions.map((contribution, index) => (
                <MotionDiv
                  key={index}
                  className={`
                    relative p-4 md:p-6 rounded-lg backdrop-blur-sm border transition-all duration-300
                    ${contribution.type === 'placeholder' 
                      ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20 hover:border-blue-500/40' 
                      : 'bg-white/5 dark:bg-gray-800/10 border-white/10 hover:border-green-500/30'}
                  `}
                  variants={simpleFadeIn}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  {contribution.type === 'placeholder' ? (
                    <>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                        <div>
                          <h4 className="text-lg md:text-xl font-semibold mb-2 text-blue-300 font-playfair">{contribution.title}</h4>
                          <p className="text-gray-300 mb-3 md:mb-4 font-inter text-sm md:text-base">{contribution.description}</p>
                        </div>
                        <div className="flex items-center justify-start md:justify-end">
                          <div className="bg-blue-900/30 text-blue-300 px-3 md:px-4 py-1 md:py-2 rounded-full font-inter text-xs md:text-sm">
                            {contribution.status}
                          </div>
                        </div>
                      </div>
                      
                      {/* GitHub contribution placeholder visualization - simplified for performance */}
                      <div className="mt-4 md:mt-6 flex justify-center hide-on-mobile">
                        <div className="grid grid-cols-7 gap-1 md:gap-2">
                          {[...Array(21)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-gray-800/50"
                              style={{
                                opacity: Math.random() * 0.5 + 0.1
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      
                      <a
                        href="https://github.com/Tir25"
                        className="absolute top-3 right-3 md:top-4 md:right-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </>
                  ) : (
                    <>
                      {/* This will be populated with real contributions data later */}
                    </>
                  )}
                </MotionDiv>
              ))}
            </MotionDiv>
          )}
          
          <div className="text-center mt-6 md:mt-8">
            <a
              href="https://github.com/Tir25"
              className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 transition-colors duration-300 font-inter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="mr-2 h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd" />
              </svg>
              View My GitHub Profile
            </a>
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};

export default Projects; 