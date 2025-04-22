import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Clock } from 'lucide-react';

const ThemeDemo = () => {
  const { theme, appliedTheme, THEMES, isTransitioning, checkAutoTheme } = useTheme();
  const isDark = appliedTheme === THEMES.DARK;
  const isAuto = theme === THEMES.AUTO;
  
  // State to track time
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Calculate next theme change time
  const getNextThemeChangeTime = () => {
    const now = new Date();
    const hour = now.getHours();
    
    // If it's before 7 AM, next change is at 7 AM
    if (hour < 7) {
      const nextChange = new Date(now);
      nextChange.setHours(7, 0, 0, 0);
      return nextChange;
    }
    
    // If it's before 7 PM, next change is at 7 PM
    if (hour < 19) {
      const nextChange = new Date(now);
      nextChange.setHours(19, 0, 0, 0);
      return nextChange;
    }
    
    // Otherwise, next change is at 7 AM tomorrow
    const nextChange = new Date(now);
    nextChange.setDate(nextChange.getDate() + 1);
    nextChange.setHours(7, 0, 0, 0);
    return nextChange;
  };
  
  // Format time for display
  const formatTimeRemaining = () => {
    if (!isAuto) return 'Automatic mode disabled';
    
    const now = new Date();
    const nextChange = getNextThemeChangeTime();
    const diffMs = nextChange - now;
    
    // Convert to hours and minutes
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m until ${nextChange.getHours() === 7 ? 'day' : 'night'} mode`;
  };
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isAuto && checkAutoTheme) {
        checkAutoTheme();
      }
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(timer);
  }, [isAuto, checkAutoTheme]);

  return (
    <div
      className={`max-w-2xl mx-auto ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      style={{ transition: 'opacity 0.3s ease' }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">
        {isAuto ? '🕒 Automatic Mode' : isDark ? '🌙 Night Mode' : '☀️ Day Mode'}
      </h1>
      
      <div className="card p-8 rounded-xl shadow-lg mb-8 backdrop-blur-sm border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">
          Theme Toggle Demo
        </h2>
        <p className="mb-6 text-secondary">
          This portfolio demonstrates a beautiful animated theme toggle between light and dark modes.
          The toggle button is fixed in the top-right corner of your screen.
          Double-tap the button to enter automatic mode which changes theme based on time of day.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Features:</span>
          </div>
          
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Animated sun & moon icons with glow effects</li>
            <li>Theme saved in localStorage for persistence</li>
            <li>Automatic time-based theme switching (double-tap the icon)</li>
            <li className="text-blue-300">
              <strong>Time-based rules:</strong>
              <ul className="list-circle pl-5 mt-1">
                <li>7:00 AM to 6:59 PM: Light theme <Sun size={14} className="inline-block ml-1 text-yellow-400" /></li>
                <li>7:00 PM to 6:59 AM: Dark theme <Moon size={14} className="inline-block ml-1 text-blue-300" /></li>
              </ul>
            </li>
            <li>Responsive design that works on all devices</li>
            <li>Background animations that change with theme</li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 rounded-lg shadow-md backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold mb-3">Technical Details</h3>
          <p className="text-sm">
            Built with React, Framer Motion for animations, and Tailwind CSS for styling.
            The toggle animates between states with spring physics for a natural feel.
          </p>
          
          {isAuto && (
            <div className="mt-4 p-3 bg-blue-500/10 rounded border border-blue-500/20">
              <p className="text-sm flex items-center">
                <Clock size={16} className="mr-2 text-blue-400" />
                <span>{formatTimeRemaining()}</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="card p-6 rounded-lg shadow-md backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold mb-3">Current Settings</h3>
          <p className="text-sm">
            Mode: <span className="font-medium">{isAuto ? 'Automatic' : theme}</span><br />
            {isAuto && <>Currently showing: <span className="font-medium">{appliedTheme}</span><br /></>}
            System Time: <span className="font-medium">{currentTime.toLocaleTimeString()}</span><br />
            Preference Saved: <span className="font-medium">{localStorage.getItem('theme') ? 'Yes' : 'No'}</span>
          </p>
          
          {isAuto && (
            <div className="mt-4 flex items-center">
              <div className={`w-3 h-3 rounded-full animate-pulse ${isDark ? 'bg-blue-400' : 'bg-yellow-400'} mr-2`}></div>
              <span className="text-xs">
                Auto theme is {isDark ? 'night' : 'day'} based on current time ({currentTime.getHours()}:
                {currentTime.getMinutes().toString().padStart(2, '0')})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo; 