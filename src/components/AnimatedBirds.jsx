import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBirds = () => {
  const { theme, THEMES } = useTheme();
  const isDark = theme === THEMES.DARK;
  const [birds, setBirds] = useState([]);
  const [perchedBirds, setPerchedBirds] = useState([]);

  // Only render in day mode
  if (isDark) return null;

  useEffect(() => {
    // Generate random birds with different properties
    const generateBirds = () => {
      const birdColors = ['bird-blue', 'bird-red', 'bird-yellow', 'bird-green', 'bird-purple'];
      const birdSizes = ['bird-small', 'bird-medium', 'bird-large'];
      const wingSpeeds = ['wing-slow', 'wing-medium', 'wing-fast'];
      
      // Create flocks with coordinated properties
      const flocks = [
        {
          direction: 'left-to-right',
          height: 'bird-high',
          count: 5,
          baseSpeed: 25,
          speedVariation: 2,
          startDelay: 0
        },
        {
          direction: 'right-to-left',
          height: 'bird-medium-height',
          count: 7,
          baseSpeed: 30,
          speedVariation: 3,
          startDelay: 5
        },
        {
          direction: 'left-to-right',
          height: 'bird-low',
          count: 4,
          baseSpeed: 20,
          speedVariation: 1,
          startDelay: 10
        }
      ];
      
      const newBirds = [];
      
      // Generate birds in flocks
      flocks.forEach((flock, flockIndex) => {
        const flockColor = birdColors[Math.floor(Math.random() * birdColors.length)];
        const flockSize = birdSizes[Math.floor(Math.random() * birdSizes.length)];
        const flockWingSpeed = wingSpeeds[Math.floor(Math.random() * wingSpeeds.length)];
        
        for (let i = 0; i < flock.count; i++) {
          const speed = flock.baseSpeed + (Math.random() * flock.speedVariation * 2 - flock.speedVariation);
          const verticalOffset = Math.sin(i * 0.5) * 20; // Creates wave-like formation
          
          newBirds.push({
            id: `bird-${Math.random().toString(36).substr(2, 9)}`,
            color: flockColor,
            size: flockSize,
            wingSpeed: flockWingSpeed,
            height: flock.height,
            direction: flock.direction,
            speed,
            flockIndex,
            position: i,
            startDelay: flock.startDelay + (i * 0.5),
            verticalOffset
          });
        }
      });
      
      // Generate perched birds
      const newPerchedBirds = Array(3).fill(null).map((_, index) => ({
        id: `perched-bird-${Math.random().toString(36).substr(2, 9)}`,
        color: birdColors[Math.floor(Math.random() * birdColors.length)],
        size: 'bird-small',
        position: index,
        isPreening: Math.random() > 0.7
      }));
      
      setBirds(newBirds);
      setPerchedBirds(newPerchedBirds);
    };
    
    generateBirds();
    
    // Regenerate birds every 45 seconds
    const interval = setInterval(generateBirds, 45000);
    
    return () => clearInterval(interval);
  }, []);

  const renderBird = (bird) => {
    const baseStyles = {
      position: 'absolute',
      transition: 'transform 0.3s ease'
    };

    if (bird.direction === 'left-to-right') {
      baseStyles.animation = `fly-across-right ${bird.speed}s linear infinite`;
      baseStyles.animationDelay = `${bird.startDelay}s`;
      baseStyles.left = '-5%';
    } else {
      baseStyles.animation = `fly-across-left ${bird.speed}s linear infinite`;
      baseStyles.animationDelay = `${bird.startDelay}s`;
      baseStyles.right = '-5%';
    }

    // Add vertical position based on height class and offset
    switch (bird.height) {
      case 'bird-high':
        baseStyles.top = `${20 + bird.verticalOffset}%`;
        break;
      case 'bird-medium-height':
        baseStyles.top = `${40 + bird.verticalOffset}%`;
        break;
      case 'bird-low':
        baseStyles.top = `${60 + bird.verticalOffset}%`;
        break;
      default:
        baseStyles.top = '40%';
    }

    return (
      <div 
        key={bird.id}
        className={`bird ${bird.color} ${bird.size}`}
        style={baseStyles}
      >
        <div className="bird-body"></div>
        <div className="bird-head"></div>
        <div className="bird-eye"></div>
        <div className="bird-beak"></div>
        <div className={`bird-wing ${bird.wingSpeed}`}></div>
        <div className="bird-tail"></div>
      </div>
    );
  };

  const renderPerchedBird = (bird) => {
    const baseStyles = {
      position: 'absolute',
      right: `${45 + (bird.position * 5)}%`,
      bottom: '35%',
      transform: 'scale(0.7)',
      animation: bird.isPreening ? 'bird-preening 3s infinite' : 'none'
    };

    return (
      <div 
        key={bird.id}
        className={`bird ${bird.color} bird-perched`}
        style={baseStyles}
      >
        <div className="bird-body"></div>
        <div className="bird-head"></div>
        <div className="bird-eye"></div>
        <div className="bird-beak"></div>
        <div className="bird-wing"></div>
        <div className="bird-tail"></div>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes fly-across-right {
            from { transform: translateX(0) translateY(0); }
            to { transform: translateX(110vw) translateY(0); }
          }
          
          @keyframes fly-across-left {
            from { transform: translateX(0) translateY(0) scaleX(-1); }
            to { transform: translateX(-110vw) translateY(0) scaleX(-1); }
          }
          
          @keyframes bird-preening {
            0%, 100% { transform: scale(0.7) rotate(0deg); }
            50% { transform: scale(0.7) rotate(-15deg); }
          }
          
          .bird-perched {
            transform-origin: bottom center;
          }
        `}
      </style>
      <div className="birds-container">
        {birds.map(bird => renderBird(bird))}
      </div>
      <div className="perched-birds-container">
        {perchedBirds.map(bird => renderPerchedBird(bird))}
      </div>
    </>
  );
};

export default AnimatedBirds; 