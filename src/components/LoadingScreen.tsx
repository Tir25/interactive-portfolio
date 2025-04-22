import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Logo from './Logo';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

// Define motion components with proper type casting
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 2500 
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Set a timer to complete loading
    const timer = setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 500); // Allow final animations to complete
      }
    }, duration);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onLoadingComplete]);
  
  // Container animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2
      }
    }
  };
  
  // Logo animation
  const logoVariants: Variants = {
    initial: { 
      scale: 0.8,
      opacity: 0.5,
      y: 10
    },
    animate: { 
      scale: [0.8, 1.05, 1],
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };
  
  // Progress bar animation
  const progressVariants: Variants = {
    initial: { width: 0 },
    animate: { 
      width: `${loadingProgress}%`,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Dots animation for "Loading" text
  const dotsVariants: Variants = {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        times: [0, 0.5, 1]
      }
    }
  };
  
  return (
    <MotionDiv 
      className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-black z-[9999] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-90"></div>
      
      {/* Animated circles in background */}
      <MotionDiv 
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse" as const
        }}
      />
      
      <MotionDiv 
        className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse" as const,
          delay: 1
        }}
      />
      
      {/* Radial grid lines */}
      <div className="absolute inset-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_transparent_50%,_rgba(25,30,50,0.25)_100%),_radial-gradient(circle_at_center,_rgba(100,120,255,0.1)_0%,_transparent_100%)]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(55,65,120,0.1)_1px,rgba(55,65,120,0.1)_2px)]"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,rgba(55,65,120,0.1)_1px,rgba(55,65,120,0.1)_2px)]"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with animation */}
        <MotionDiv
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className="mb-8 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          <Logo size="lg" />
        </MotionDiv>
        
        {/* Loading text */}
        <div className="text-blue-100 font-inter text-lg mb-4 flex items-center">
          <span>Loading your experience</span>
          <MotionSpan
            variants={dotsVariants}
            animate="animate"
            className="inline-block ml-1"
          >
            ...
          </MotionSpan>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
          <MotionDiv
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
          />
        </div>
        
        {/* Progress percentage */}
        <div className="text-blue-200/80 text-sm mt-2 font-mono">
          {Math.round(loadingProgress)}%
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 text-gray-500/60 text-xs font-inter">
        Tirth Raval • Developer Portfolio
      </div>
    </MotionDiv>
  );
};

export default LoadingScreen; 