import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
// Import only essential above-the-fold components eagerly
import Hero from './components/Hero';
// Lazy load below-the-fold components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Timeline = lazy(() => import('./components/Timeline'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
import LoadingScreen from './components/LoadingScreen';

// Simple component fallback
const ComponentLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-pulse w-16 h-16 rounded-full bg-blue-500/20"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload critical assets
    const preloadCriticalImages = async () => {
      // Create an array of critical image URLs
      const criticalImages = [
        // Add paths to critical images here
        '/profile.webp',
        '/background.webp',
        // Add more critical images as needed
      ];

      // Load all critical images
      const imagePromises = criticalImages.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Still resolve even on error to prevent blocking
        });
      });

      // Wait for all images to load
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    // Start preloading critical images
    preloadCriticalImages();

    // For demo purposes, use a timer as backup in case image loading fails
    const timer = setTimeout(() => {
      if (!imagesLoaded) {
        setLoading(false);
      }
    }, 3000); // Show loading screen for max 3 seconds

    // When images are loaded, remove the loading screen
    if (imagesLoaded) {
      setLoading(false);
    }
    
    return () => clearTimeout(timer);
  }, [imagesLoaded]);

  // Prefetch remaining components after initial load
  useEffect(() => {
    if (!loading) {
      // Prefetch remaining components
      const prefetch = async () => {
        // Using dynamic imports to prefetch components
        const importPromises = [
          import('./components/About'),
          import('./components/Skills'),
          import('./components/Timeline'),
          import('./components/Projects'),
          import('./components/Contact')
        ];
        
        // Execute prefetching in background
        Promise.all(importPromises).catch(() => {
          // Silent fail - prefetching is just an optimization
        });
      };
      
      // Start prefetching after a small delay
      const timer = setTimeout(prefetch, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loading" onLoadingComplete={() => setLoading(false)} />
      ) : (
        <div key="app" className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <main>
            {/* Hero section is not lazy-loaded as it's above the fold */}
            <Hero />
            
            {/* Lazy load all below-the-fold components with Suspense fallbacks */}
            <Suspense fallback={<ComponentLoader />}>
              <About />
            </Suspense>
            
            <Suspense fallback={<ComponentLoader />}>
              <Skills />
            </Suspense>
            
            <Suspense fallback={<ComponentLoader />}>
              <Timeline />
            </Suspense>
            
            <Suspense fallback={<ComponentLoader />}>
              <Projects />
            </Suspense>
            
            <Suspense fallback={<ComponentLoader />}>
              <Contact />
            </Suspense>
          </main>
          <footer className="py-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
          </footer>
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
