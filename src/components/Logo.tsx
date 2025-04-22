import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const MotionSvg = motion.svg;
const MotionPath = motion.path;
const MotionCircle = motion.circle;
const MotionRect = motion.rect;
const MotionG = motion.g;
const MotionText = motion.text;

// Animation variants
const logoVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    filter: "drop-shadow(0 0 8px rgba(96, 165, 250, 0.8))",
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 10 
    }
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

const glowPulse = {
  initial: { 
    opacity: 0.7,
    filter: "drop-shadow(0 0 3px rgba(96, 165, 250, 0.5))"
  },
  animate: {
    opacity: [0.7, 1, 0.7],
    filter: [
      "drop-shadow(0 0 3px rgba(96, 165, 250, 0.5))", 
      "drop-shadow(0 0 8px rgba(96, 165, 250, 0.8))", 
      "drop-shadow(0 0 3px rgba(96, 165, 250, 0.5))"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const Logo: React.FC<LogoProps> = ({ size = 'md', onClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Detect theme preference - in a real app, connect to your theme provider
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Size mapping
  const dimensions = {
    sm: { width: 50, height: 50, fontSize: 16 },
    md: { width: 65, height: 65, fontSize: 22 },
    lg: { width: 85, height: 85, fontSize: 28 }
  };
  
  const { width, height, fontSize } = dimensions[size];
  
  // Theme-based colors
  const primaryGradient = isDarkMode 
    ? { from: '#4f46e5', to: '#7e22ce' }   // Dark mode: indigo to purple
    : { from: '#06b6d4', to: '#3b82f6' };  // Light mode: cyan to blue
  
  const secondaryGradient = isDarkMode
    ? { from: '#6366f1', to: '#a855f7' }   // Dark mode: indigo to purple (lighter)
    : { from: '#34d399', to: '#3b82f6' };  // Light mode: emerald to blue
  
  const glowColor = isDarkMode ? 'rgba(139, 92, 246, 0.8)' : 'rgba(14, 165, 233, 0.8)';
  
  // Create unique IDs for gradients to avoid conflicts when multiple instances are rendered
  const uniqueId = React.useId();
  const primaryGradientId = `primaryGradient-${uniqueId}`;
  const secondaryGradientId = `secondaryGradient-${uniqueId}`;
  const centerGlowId = `centerGlow-${uniqueId}`;
  const glowFilterId = `glow-${uniqueId}`;
  
  return (
    <MotionSvg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      variants={logoVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className="cursor-pointer"
      aria-label="Logo"
    >
      {/* Backdrop glow */}
      <defs>
        <linearGradient id={primaryGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryGradient.from} />
          <stop offset="100%" stopColor={primaryGradient.to} />
        </linearGradient>
        <linearGradient id={secondaryGradientId} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryGradient.from} />
          <stop offset="100%" stopColor={secondaryGradient.to} />
        </linearGradient>
        <radialGradient id={centerGlowId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Main floating logo group */}
      <MotionG
        variants={floatAnimation}
        initial="initial"
        animate="animate"
      >
        {/* Backdrop hexagon with blur */}
        <MotionPath
          d="M60 10 L110 40 L110 80 L60 110 L10 80 L10 40 Z"
          fill={`url(#${primaryGradientId})`}
          opacity="0.15"
          variants={glowPulse}
          initial="initial"
          animate="animate"
        />
        
        {/* Center glow */}
        <circle cx="60" cy="60" r="30" fill={`url(#${centerGlowId})`} opacity="0.3" />
        
        {/* Main hexagon */}
        <MotionPath
          d="M60 20 L100 45 L100 75 L60 100 L20 75 L20 45 Z"
          fill={`url(#${primaryGradientId})`}
          stroke={`url(#${secondaryGradientId})`}
          strokeWidth="2"
          filter={`url(#${glowFilterId})`}
        />
        
        {/* Code brackets */}
        <MotionPath
          d="M42 45 L35 60 L42 75 M78 45 L85 60 L78 75"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* TR initials */}
        <MotionText
          x="60"
          y="63"
          fontSize={fontSize * 1.8}
          fontFamily="'Playfair Display', serif"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          variants={glowPulse}
          initial="initial"
          animate="animate"
        >
          TR
        </MotionText>
        
        {/* Decorative elements - small glowing dots */}
        <MotionCircle
          cx="25"
          cy="60"
          r="3"
          fill="white"
          variants={glowPulse}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        />
        <MotionCircle
          cx="95"
          cy="60"
          r="3"
          fill="white"
          variants={glowPulse}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
        />
        
        {/* Digital circuit lines */}
        <MotionPath
          d="M30 85 L50 85 L55 80 L65 80 L70 85 L90 85"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="3,3"
          opacity="0.7"
        />
        <MotionPath
          d="M60 100 L60 110"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="2,2"
          opacity="0.7"
        />
      </MotionG>
    </MotionSvg>
  );
};

export default Logo; 