import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';

// Use "as any" to work around TypeScript errors with motion components
const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionSpan = motion.span as any;
const MotionSection = motion.section as any;

interface SkillData {
  name: string;
  icon: string;
  level: number;
  xp: number;
  maxXp: number;
  description: string;
  useCases: string[];
  color: string;
}

const Skills: React.FC = () => {
  // Track which cards are flipped
  const [flippedCards, setFlippedCards] = useState<{[key: string]: boolean}>({});

  const toggleFlip = (skillName: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  const skills: SkillData[] = [
    { 
      name: 'C', 
      icon: '🔢', 
      level: 3, 
      xp: 7800, 
      maxXp: 10000,
      description: 'Fundamental programming language with strong low-level capabilities',
      useCases: ['System Programming', 'Algorithms', 'Foundation of Computing'],
      color: 'from-blue-500 to-blue-700'
    },
    { 
      name: 'C++', 
      icon: '⚙️', 
      level: 3, 
      xp: 7400, 
      maxXp: 10000,
      description: 'Object-oriented extension of C with more advanced features',
      useCases: ['Game Development', 'System Software', 'Performance-Critical Apps'],
      color: 'from-blue-600 to-indigo-600'
    },
    { 
      name: 'JavaScript', 
      icon: '🟨', 
      level: 4, 
      xp: 8200, 
      maxXp: 10000,
      description: 'The language of the web, enabling dynamic content',
      useCases: ['Web Development', 'DOM Manipulation', 'Async Operations'],
      color: 'from-yellow-300 to-yellow-500'
    },
    { 
      name: 'HTML/CSS', 
      icon: '🎨', 
      level: 4, 
      xp: 8600, 
      maxXp: 10000,
      description: 'The foundation and styling of the web',
      useCases: ['Web Structure', 'Responsive Design', 'Animations'],
      color: 'from-orange-400 to-red-500'
    },
    { 
      name: 'PHP', 
      icon: '🐘', 
      level: 3, 
      xp: 7100, 
      maxXp: 10000,
      description: 'Server-side scripting language for web development',
      useCases: ['Server-side Programming', 'CMS Development', 'Web Applications'],
      color: 'from-indigo-400 to-purple-600'
    },
    { 
      name: 'React', 
      icon: '⚛️', 
      level: 3, 
      xp: 6500, 
      maxXp: 10000,
      description: 'JavaScript library for building user interfaces',
      useCases: ['Single Page Applications', 'Interactive UIs', 'Component-Based Architecture'],
      color: 'from-cyan-400 to-blue-500'
    },
    { 
      name: 'Python', 
      icon: '🐍', 
      level: 2, 
      xp: 5500, 
      maxXp: 10000,
      description: 'Versatile high-level language with simple, readable syntax',
      useCases: ['Data Science', 'Machine Learning', 'Web Development'],
      color: 'from-blue-400 to-green-500'
    },
    { 
      name: 'DSA', 
      icon: '🧮', 
      level: 2, 
      xp: 4800, 
      maxXp: 10000,
      description: 'Data Structures and Algorithms for efficient problem solving',
      useCases: ['Problem Solving', 'Efficient Programming', 'Technical Interviews'],
      color: 'from-purple-500 to-indigo-500'
    },
    { 
      name: 'Tailwind CSS', 
      icon: '🌬️', 
      level: 3, 
      xp: 7000, 
      maxXp: 10000,
      description: 'Utility-first CSS framework for rapid UI development',
      useCases: ['Rapid Prototyping', 'Consistent Design', 'Responsive Layouts'],
      color: 'from-teal-400 to-cyan-500'
    },
    { 
      name: 'Git', 
      icon: '🔄', 
      level: 3, 
      xp: 7500, 
      maxXp: 10000,
      description: 'Version control system for tracking code changes',
      useCases: ['Collaboration', 'Version Control', 'Code Management'],
      color: 'from-red-400 to-red-600'
    },
    { 
      name: 'UI/UX Design', 
      icon: '🎯', 
      level: 3, 
      xp: 6800, 
      maxXp: 10000,
      description: 'Creating intuitive and appealing user experiences',
      useCases: ['User Research', 'Wireframing', 'Interface Design'],
      color: 'from-purple-400 to-pink-500'
    },
  ];

  // Helper function to render star rating based on level
  const renderStars = (level: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i < level ? 'text-yellow-300' : 'text-gray-600'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Helper function to calculate XP percentage
  const getXpPercentage = (xp: number, maxXp: number) => {
    return (xp / maxXp) * 100;
  };

  return (
    <MotionSection 
      id="skills" 
      className="min-h-screen flex flex-col items-center justify-center py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeIn}
    >
      <MotionH2 className="text-4xl font-bold mb-12 text-center text-white text-glow">
        My Skills Arsenal
      </MotionH2>
      
      <MotionDiv 
        className="max-w-6xl mx-auto px-2 sm:px-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
        variants={staggerContainer}
      >
        {skills.map((skill, index) => (
          <MotionDiv 
            key={skill.name}
            className="h-64 w-full cursor-pointer [perspective:1000px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => toggleFlip(skill.name)}
          >
            <MotionDiv 
              className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ${flippedCards[skill.name] ? 'rotate-y-180' : ''}`}
            >
              {/* Front of card */}
              <MotionDiv 
                className={`absolute w-full h-full [transform-style:preserve-3d] [backface-visibility:hidden] glass-effect rounded-xl p-6 flex flex-col items-center justify-center text-center overflow-hidden ${flippedCards[skill.name] ? '' : 'hover:blue-glow'}`}
              style={{ WebkitBackfaceVisibility: 'hidden' }}
                whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)" }}
              >
                {/* Decorative background glow */}
                <div className={`absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-r ${skill.color} opacity-40 blur-2xl`}></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-5xl mb-4">{skill.icon}</span>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-3">
                    {skill.name}
                  </h3>
                  
                  <div className="flex mt-2 mb-4">
                    {renderStars(skill.level)}
                  </div>
                  
                  {/* XP Bar */}
                  <div className="w-full mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-300">XP: {skill.xp}</span>
                      <span className="text-gray-400">Level {skill.level}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <MotionDiv 
                        className={`h-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${getXpPercentage(skill.xp, skill.maxXp)}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                  
                  <span className="text-xs mt-4 text-gray-400">Click to flip</span>
                </div>
              </MotionDiv>
              
              {/* Back of card */}
              <MotionDiv 
                className="absolute w-full h-full [transform-style:preserve-3d] [backface-visibility:hidden] rotate-y-180 glass-effect rounded-xl p-6 flex flex-col justify-between overflow-hidden hover:purple-glow"
                style={{ WebkitBackfaceVisibility: 'hidden' }}
                whileHover={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.7)" }}
              >
                <div className={`absolute -top-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-r ${skill.color} opacity-30 blur-2xl`}></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    {skill.name} - Level {skill.level}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">{skill.description}</p>
                  
                  <h4 className="font-semibold text-purple-300 mb-2">Skill Applications:</h4>
                  <ul className="space-y-1">
                    {skill.useCases.map((use, i) => (
                      <li key={i} className="text-sm flex items-center">
                        <MotionSpan 
                          className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-3">
                  <div className="text-xs text-right text-gray-400 mb-1">
                    XP Progress: {skill.xp}/{skill.maxXp}
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${getXpPercentage(skill.xp, skill.maxXp)}%` }}
                    />
                  </div>
                  <div className="text-xs text-right mt-2 text-gray-400">Click to flip back</div>
                </div>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        ))}
      </MotionDiv>
    </MotionSection>
  );
};

export default Skills; 