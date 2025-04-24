import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ThemeContext = createContext();

// Theme options - removed AUTO
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or use light as default
  const getSavedTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK)) {
        return savedTheme;
      }
    }
    return THEMES.LIGHT; // Default to light if no valid preference saved
  };

  // State to hold current theme
  const [theme, setTheme] = useState(getSavedTheme());
  // State for animation
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Set the actual theme
  const applyTheme = (newTheme) => {
    if (typeof document !== 'undefined') {
      // Apply theme classes before changing the attribute to prevent flash
      if (newTheme === THEMES.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Set the data-theme attribute after classes are applied
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  // Toggle theme manually with animation support
  const toggleTheme = () => {
    // Don't allow multiple toggles while transitioning
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Simply toggle between light and dark
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    
    // Apply theme immediately to prevent blank screen
    applyTheme(newTheme);
    
    // Update state and localStorage with a small delay for smoother animation
    setTimeout(() => {
      setTheme(newTheme);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      setIsTransitioning(false);
    }, 300); // Increased delay for smoother transition
  };

  // Apply theme changes whenever theme state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    applyTheme(theme);
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial theme application
    const currentTheme = getSavedTheme();
    setTheme(currentTheme);
    applyTheme(currentTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      THEMES,
      isTransitioning
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 