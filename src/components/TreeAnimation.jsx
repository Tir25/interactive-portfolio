import React, { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const TreeAnimation = () => {
  const { theme, THEMES } = useTheme();
  const isDark = theme === THEMES.DARK;

  // Generate trees with different properties
  const trees = useMemo(() => {
    const treeTypes = ['tree-1', 'tree-2', 'tree-3'];
    const positions = [
      { left: '5%', bottom: '0' },
      { left: '15%', bottom: '0' },
      { left: '25%', bottom: '0' },
      { left: '35%', bottom: '0' },
      { left: '45%', bottom: '0' },
      { left: '55%', bottom: '0' },
      { left: '65%', bottom: '0' },
      { left: '75%', bottom: '0' },
      { left: '85%', bottom: '0' },
      { left: '95%', bottom: '0' }
    ];

    return positions.map((pos, index) => ({
      id: `tree-${index}`,
      type: treeTypes[Math.floor(Math.random() * treeTypes.length)],
      ...pos,
      scale: 0.8 + Math.random() * 0.4,
      swayDuration: 8 + Math.random() * 4,
      swayDelay: Math.random() * 2
    }));
  }, []);

  // Only render in light mode
  if (isDark) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>
        {`
          @keyframes tree-sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(2deg); }
          }

          .tree {
            position: absolute;
            transform-origin: bottom center;
            animation: tree-sway var(--sway-duration) ease-in-out var(--sway-delay) infinite;
          }

          .tree-1 {
            width: 60px;
            height: 120px;
            background: linear-gradient(to top, #1a472a, #2d5a3f);
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          }

          .tree-2 {
            width: 80px;
            height: 140px;
            background: linear-gradient(to top, #1a472a, #2d5a3f);
            clip-path: polygon(50% 0%, 20% 40%, 80% 40%, 0% 100%, 100% 100%);
          }

          .tree-3 {
            width: 70px;
            height: 130px;
            background: linear-gradient(to top, #1a472a, #2d5a3f);
            clip-path: polygon(50% 0%, 10% 30%, 90% 30%, 20% 60%, 80% 60%, 0% 100%, 100% 100%);
          }
        `}
      </style>
      {trees.map(tree => (
        <div
          key={tree.id}
          className={`tree ${tree.type}`}
          style={{
            left: tree.left,
            bottom: tree.bottom,
            transform: `scale(${tree.scale})`,
            '--sway-duration': `${tree.swayDuration}s`,
            '--sway-delay': `${tree.swayDelay}s`
          }}
        />
      ))}
    </div>
  );
};

export default TreeAnimation; 