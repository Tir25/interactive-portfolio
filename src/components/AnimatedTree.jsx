import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedTree = () => {
  const { theme, THEMES } = useTheme();
  const isDark = theme === THEMES.DARK;

  // Only render in day mode
  if (isDark) return null;

  return (
    <div className="animated-tree">
      <div className="tree-trunk"></div>
      <div className="tree-branch branch-1"></div>
      <div className="tree-branch branch-2"></div>
      <div className="tree-branch branch-3"></div>
      <div className="tree-branch branch-4"></div>
      <div className="tree-foliage"></div>
      <div className="leaf leaf-1"></div>
      <div className="leaf leaf-2"></div>
      <div className="leaf leaf-3"></div>
      <div className="leaf leaf-4"></div>
      <div className="leaf leaf-5"></div>
      <div className="leaf leaf-6"></div>
      <div className="leaf leaf-7"></div>
      <div className="leaf leaf-8"></div>
    </div>
  );
};

export default AnimatedTree; 