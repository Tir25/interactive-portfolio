import React, { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Add global styles for animations
const animationStyles = `
@keyframes sunRaysPulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}

@keyframes moonGlow {
  0% { filter: drop-shadow(0 0 5px rgba(144, 224, 239, 0.5)); }
  50% { filter: drop-shadow(0 0 12px rgba(144, 224, 239, 0.8)); }
  100% { filter: drop-shadow(0 0 5px rgba(144, 224, 239, 0.5)); }
}

@keyframes starTwinkle {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}
`;

const ThemeToggle = () => {
  const { theme, toggleTheme, THEMES } = useTheme();
  const isDark = theme === THEMES.DARK;
  
  // Reference for the button
  const buttonRef = useRef(null);
  
  // Add the animation styles to the document head
  React.useEffect(() => {
    if (!document.getElementById('theme-toggle-animations')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'theme-toggle-animations';
      styleEl.textContent = animationStyles;
      document.head.appendChild(styleEl);
      
      // Cleanup when component unmounts
      return () => {
        const styleElement = document.getElementById('theme-toggle-animations');
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
      };
    }
  }, []);

  // Enhanced Sun Component with rays
  const SunComponent = () => (
    <div className="relative" style={{ width: '30px', height: '30px' }}>
      {/* Sun rays */}
      <div className="absolute inset-0 z-0" 
        style={{ 
          animation: 'sunRaysPulse 3s ease-in-out infinite',
        }}>
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-yellow-400"
            style={{
              width: '2px',
              height: '8px',
              left: 'calc(50% - 1px)',
              top: '-4px',
              transformOrigin: 'center calc(100% + 11px)',
              transform: `rotate(${i * 45}deg)`,
              opacity: 0.8,
              borderRadius: '1px'
            }}
          />
        ))}
      </div>
      
      {/* Sun body */}
      <div className="relative flex items-center justify-center z-10">
        <div className="absolute rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"
          style={{ 
            width: '22px', 
            height: '22px', 
            top: '4px', 
            left: '4px',
            boxShadow: '0 0 15px rgba(255, 177, 60, 0.7)'
          }}
        />
        <Sun 
          size={22} 
          className="relative text-yellow-500 z-20" 
          strokeWidth={2.5} 
        />
      </div>
    </div>
  );

  // Enhanced Moon Component with stars
  const MoonComponent = () => (
    <div className="relative" style={{ width: '30px', height: '30px' }}>
      {/* Stars around moon */}
      {[...Array(4)].map((_, i) => {
        const angles = [25, 80, 160, 230];
        const delays = [0, 0.7, 1.3, 2];
        const sizes = [2, 1.5, 2, 1.5];
        return (
          <div 
            key={i}
            className="absolute bg-blue-100 rounded-full"
            style={{
              width: `${sizes[i]}px`,
              height: `${sizes[i]}px`,
              left: `${13 + 14 * Math.cos(angles[i] * Math.PI/180)}px`,
              top: `${13 + 14 * Math.sin(angles[i] * Math.PI/180)}px`,
              animation: `starTwinkle 2s ease-in-out ${delays[i]}s infinite`,
              boxShadow: '0 0 2px 1px rgba(255, 255, 255, 0.4)'
            }}
          />
        );
      })}
      
      {/* Moon body */}
      <div className="relative flex items-center justify-center z-10" 
        style={{ animation: 'moonGlow 4s ease-in-out infinite' }}>
        <div className="absolute rounded-full bg-gradient-to-br from-blue-100 to-blue-200"
          style={{ 
            width: '22px', 
            height: '22px', 
            top: '4px', 
            left: '4px',
            boxShadow: '0 0 10px rgba(144, 224, 239, 0.6)'
          }}
        />
        <Moon 
          size={22} 
          className="relative text-blue-200 z-20"
          strokeWidth={2.5} 
        />
      </div>
    </div>
  );

  return (
    <div
      className="fixed top-20 right-6 z-50"
      style={{ opacity: 1, transition: 'opacity 0.5s' }}
    >
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={`p-3 mb-6 rounded-full backdrop-blur-md relative
                   ${isDark 
                     ? 'bg-gray-800/80 hover:bg-gray-700/80 shadow-[0_0_15px_rgba(144,224,239,0.5)]' 
                     : 'bg-blue-50/80 hover:bg-blue-100/80 shadow-[0_0_15px_rgba(255,177,60,0.5)]'
                   } 
                   transition-colors duration-300 hover:scale-110 active:scale-95`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        title={`Switch to ${isDark ? 'Day' : 'Night'} Mode`}
      >
        {isDark ? <MoonComponent /> : <SunComponent />}
      </button>
    </div>
  );
};

export default ThemeToggle; 