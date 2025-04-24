import React, { useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeBackground = () => {
  const { theme, THEMES } = useTheme();
  const isDark = theme === THEMES.DARK;

  // Generate random stars once (won't change on re-renders)
  const stars = useMemo(() => {
    // Regular white stars
    const regularStars = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80,
      size: 1 + Math.random() * 3,
      animationDuration: 1 + Math.random() * 3,
      animationDelay: Math.random() * 2,
      color: 'white',
      animationType: 'twinkle'
    }));
    
    // Blue tinted stars (fewer)
    const blueStars = Array.from({ length: 15 }, (_, i) => ({
      id: i + 100,
      x: Math.random() * 100,
      y: Math.random() * 80,
      size: 1 + Math.random() * 2.5,
      animationDuration: 1 + Math.random() * 4,
      animationDelay: Math.random() * 2,
      color: '#a5c4ff',
      animationType: 'twinkle-blue'
    }));
    
    // Yellow tinted stars (even fewer)
    const yellowStars = Array.from({ length: 10 }, (_, i) => ({
      id: i + 200,
      x: Math.random() * 100,
      y: Math.random() * 80,
      size: 1 + Math.random() * 2.5,
      animationDuration: 1 + Math.random() * 3,
      animationDelay: Math.random() * 2,
      color: '#fff7c2',
      animationType: 'twinkle-yellow'
    }));
    
    return [...regularStars, ...blueStars, ...yellowStars];
  }, []);

  // Generate shooting stars
  const shootingStars = useMemo(() => {
    return [
      // Top-left to bottom-right
      {
        id: 1,
        top: '15%',
        left: '20%',
        size: 3,
        delay: 5,
        duration: 8,
        direction: 'default'
      },
      {
        id: 2,
        top: '8%',
        left: '40%',
        size: 2,
        delay: 12,
        duration: 10,
        direction: 'default'
      },
      // Top-right to bottom-left
      {
        id: 3,
        top: '12%',
        left: '75%',
        size: 3,
        delay: 7,
        duration: 9,
        direction: 'reverse'
      },
      {
        id: 4,
        top: '25%',
        left: '85%',
        size: 2,
        delay: 15,
        duration: 11,
        direction: 'reverse'
      },
      // Horizontal (right to left)
      {
        id: 5,
        top: '35%',
        left: '90%',
        size: 2.5,
        delay: 9,
        duration: 12,
        direction: 'horizontal'
      },
      // Vertical (top to bottom)
      {
        id: 6,
        top: '5%',
        left: '55%',
        size: 2,
        delay: 18,
        duration: 9,
        direction: 'vertical'
      }
    ];
  }, []);
  
  // Generate clouds for day mode
  const clouds = useMemo(() => {
    // Helper to create clouds with randomized starting positions
    const createCloud = (id, heightRange, sizeRange, directionValue, opacityRange, baseDelay = 0) => {
      const direction = directionValue || (Math.random() > 0.5 ? 'left' : 'right');
      const size = sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min);
      
      return {
        id,
        // Generate random top position within the given range
        top: `${heightRange.min + Math.random() * (heightRange.max - heightRange.min)}%`,
        // Starting position based on direction - off screen to create continuous flow
        left: direction === 'right' ? '-20%' : '120%',
        width: `${size}px`,
        height: `${size * 0.3}px`,
        duration: 30 + Math.random() * 20, // Much faster speeds (30-50s)
        delay: baseDelay + Math.random() * 15, // Shorter delays
        direction,
        opacity: opacityRange.min + Math.random() * (opacityRange.max - opacityRange.min)
      };
    };
    
    // Create three layers of clouds at different heights
    
    // Lower clouds - larger, slower, more opaque
    const lowerClouds = Array.from({ length: 8 }, (_, i) => 
      createCloud(i + 1, { min: 40, max: 60 }, { min: 150, max: 220 }, null, { min: 0.85, max: 0.95 })
    );
    
    // Middle clouds - medium size and opacity
    const middleClouds = Array.from({ length: 12 }, (_, i) => 
      createCloud(i + 20, { min: 25, max: 45 }, { min: 100, max: 180 }, null, { min: 0.7, max: 0.9 }, 5)
    );
    
    // Higher clouds - smaller, faster, more transparent
    const higherClouds = Array.from({ length: 10 }, (_, i) => 
      createCloud(i + 40, { min: 5, max: 30 }, { min: 80, max: 150 }, null, { min: 0.5, max: 0.8 }, 10)
    );
    
    // Add a few medium-speed clouds for variety
    const mediumClouds = [
      {
        id: 100,
        top: '15%',
        left: '20%',
        width: '180px',
        height: '50px',
        duration: 45, // Medium speed
        delay: 2,
        direction: 'right',
        opacity: 0.8
      },
      {
        id: 101,
        top: '35%',
        left: '70%',
        width: '200px',
        height: '60px',
        duration: 40, // Medium speed
        delay: 8,
        direction: 'left',
        opacity: 0.9
      },
      {
        id: 102,
        top: '8%',
        left: '45%',
        width: '160px',
        height: '45px',
        duration: 50, // Medium speed
        delay: 5,
        direction: 'right',
        opacity: 0.75
      }
    ];
    
    return [...lowerClouds, ...middleClouds, ...higherClouds, ...mediumClouds];
  }, []);

  // Simple SVG for birds in light mode
  const Bird = ({ x, y, size = 8 }) => (
    <div
      className="absolute"
      style={{ top: `${y}%`, left: `${x}%` }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 18L10 12L17 18" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 15L14 9L21 15" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );

  // Star element with twinkling effect
  const Star = ({ x, y, size, animationDuration, animationDelay, color = 'white', animationType = 'twinkle' }) => (
    <div
      className="absolute rounded-full"
      style={{ 
        top: `${y}%`, 
        left: `${x}%`,
        width: size,
        height: size,
        backgroundColor: color,
        animation: `${animationType} ${animationDuration}s ease-in-out ${animationDelay}s infinite alternate`
      }}
    />
  );

  // Shooting star component
  const ShootingStar = ({ top, left, size, delay, duration, direction }) => (
    <div 
      className={`shooting-star ${direction}`}
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        animation: `shooting-${direction} ${duration}s ease-in-out ${delay}s infinite`
      }}
    />
  );
  
  // Cloud component
  const Cloud = ({ top, left, width, height, duration, delay, direction, opacity }) => {
    const animationStyle = { 
      animation: `cloud-drift-${direction} ${duration}s linear ${delay}s infinite`,
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)'
    };
      
    return (
      <div
        className="cloud"
        style={{
          top,
          left,
          width,
          height,
          opacity,
          ...animationStyle
        }}
      />
    );
  };

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ 
        backgroundColor: isDark ? '#0f172a' : 'var(--day-sky)',
        transition: 'background-color 0.8s ease-in-out'
      }}
    >
      {isDark ? (
        <div className="w-full h-full relative">
          {/* Stars with twinkling effect */}
          {stars.map((star) => (
            <Star 
              key={`star-${star.id}`}
              x={star.x}
              y={star.y}
              size={star.size}
              animationDuration={star.animationDuration}
              animationDelay={star.animationDelay}
              color={star.color}
              animationType={star.animationType}
            />
          ))}
          
          {/* Constellation (Big Dipper) */}
          <div className="absolute" style={{ top: '30%', left: '25%', transform: 'scale(1.5)' }}>
            {[
              { x: 0, y: 0 },
              { x: 15, y: 5 },
              { x: 30, y: 8 },
              { x: 45, y: 10 },
              { x: 50, y: 25 },
              { x: 40, y: 40 },
              { x: 25, y: 45 }
            ].map((pos, i) => (
              <div 
                key={`constellation-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  width: '2px',
                  height: '2px',
                  boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.7)',
                  animation: `twinkle ${1.5 + Math.random()}s ease-in-out ${Math.random()}s infinite alternate`
                }}
              />
            ))}
          </div>
          
          {/* Shooting stars */}
          {shootingStars.map(star => (
            <ShootingStar
              key={`shooting-star-${star.id}`}
              top={star.top}
              left={star.left}
              size={star.size}
              delay={star.delay}
              duration={star.duration}
              direction={star.direction}
            />
          ))}
          
          {/* Moon */}
          <div
            className="absolute top-[10%] right-[20%] w-16 h-16 rounded-full bg-blue-100 shadow-[0_0_30px_rgba(219,234,254,0.8)]"
          />
          
          {/* Moon craters (subtle details) */}
          <div className="absolute top-[10%] right-[20%]" style={{ width: '16rem', height: '16rem', opacity: 0.2 }}>
            <div className="absolute rounded-full bg-gray-400" style={{ top: '30%', left: '25%', width: '5px', height: '5px' }}></div>
            <div className="absolute rounded-full bg-gray-400" style={{ top: '50%', left: '40%', width: '6px', height: '6px' }}></div>
            <div className="absolute rounded-full bg-gray-400" style={{ top: '35%', left: '60%', width: '3px', height: '3px' }}></div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative overflow-hidden">
          {/* Clouds container */}
          <div className="clouds-container">
          {clouds.map(cloud => (
            <Cloud 
              key={`cloud-${cloud.id}`}
              top={cloud.top}
              left={cloud.left}
              width={cloud.width}
              height={cloud.height}
              duration={cloud.duration}
              delay={cloud.delay}
              direction={cloud.direction}
              opacity={cloud.opacity}
            />
          ))}
          </div>
          
          {/* Sun with enhanced effects */}
          <div className="absolute top-[15%] right-[15%] w-24 h-24">
            {/* Sun rays */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: 'rgba(253, 224, 71, 0.3)',
                transform: 'scale(1.5)',
                animation: 'sun-rays 4s ease-in-out infinite'
              }}
            />
            
            {/* Sun outer glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: 'rgba(253, 224, 71, 0.5)',
                transform: 'scale(1.2)',
                animation: 'sun-rays 6s ease-in-out 1s infinite'
              }}
            />
            
            {/* Sun core */}
            <div
              className="absolute inset-0 rounded-full bg-yellow-300"
              style={{
                backgroundImage: 'radial-gradient(circle, #fef08a, #fde047, #facc15)',
                animation: 'sun-pulse 5s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Birds - limited to 3 for simplicity */}
          {[...Array(3)].map((_, i) => (
            <Bird 
              key={`bird-${i}`}
              x={10 + (i * 15)}
              y={10 + (i * 10)}
              size={6 + (i * 2)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeBackground; 