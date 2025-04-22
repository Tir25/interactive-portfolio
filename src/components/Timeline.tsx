import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion';
import { timelineReveal, slideInLeft, slideInRight, fadeIn } from '../utils/animations';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  technologies?: string[];
  semesters?: { name: string; subjects: string[] }[];
  project?: { name: string; description: string };
  icon?: string;
  isFuture?: boolean;
}

interface TimelineProps {
  events?: TimelineEvent[];
}

// Type the animation variants
const typedTimelineReveal = timelineReveal as Variants;
const typedSlideInLeft = slideInLeft as Variants;
const typedSlideInRight = slideInRight as Variants;
const typedFadeIn = fadeIn as Variants;

// Use "as any" to work around TypeScript errors with motion components
const MotionDiv = motion.div as any;
const MotionH3 = motion.h3 as any;
const MotionP = motion.p as any;
const MotionSpan = motion.span as any;
const MotionSection = motion.section as any;
const MotionSvg = motion.svg as any;
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;
const MotionUl = motion.ul as any;
const MotionLi = motion.li as any;

// Academic journey timeline events with icons
const defaultEvents: TimelineEvent[] = [
  {
    year: '2025',
    title: 'Started M.Sc. (CA & IT)',
    description: 'Taking my education to the next level with a Master\'s program focused on advanced computing concepts.',
    semesters: [
      { name: 'Semester 1', subjects: ['Python', 'React', 'Web Development with PHP'] }
    ],
    technologies: ['Python', 'React', 'PHP', 'DSA'],
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
    isFuture: true
  },
  {
    year: '2024',
    title: 'Completed B.Sc. (CA & IT)',
    description: 'Successfully completed my Bachelor\'s degree in Computer Applications & Information Technology.',
    semesters: [
      { name: 'Semester 1', subjects: ['C', 'HTML', 'CSS'] },
      { name: 'Semester 2', subjects: ['C++', 'JavaScript', 'DBMS'] },
      { name: 'Semester 3', subjects: ['Java', 'Advanced DBMS', '.Net'] },
      { name: 'Semester 4', subjects: ['Advanced Java'] },
      { name: 'Semester 6', subjects: ['PHP'] }
    ],
    project: {
      name: 'University Help Portal',
      description: 'A comprehensive web platform designed to assist university students with resources, information, and support services.'
    },
    technologies: ['C', 'C++', 'Java', 'JavaScript', 'PHP', '.Net', 'DBMS'],
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
  },
  {
    year: '2020',
    title: 'First Code: C - "Hello World"',
    description: 'Began my programming journey with the classic first program in C language.',
    technologies: ['C'],
    icon: 'M13.325 3.05L8.667 20.432l1.983.658 4.658-17.382-1.983-.658zm-7.983 12.475L12 18.33v-1.997l-5.008-2.157 5.009-2.156v-1.998L3.342 13.05l1.983.658v1.816h.013zM17.983 15.525L11.325 18.33v-1.997l5.008-2.157-5.008-2.156v-1.998l8.658 3.028-1.983.658v1.816h-.013z'
  },
  {
    year: '2019',
    title: 'Completed 12th Commerce',
    description: 'Finished higher secondary education with a focus on commerce subjects.',
    technologies: ['Accountancy', 'Economics', 'Business Studies'],
    icon: 'M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4zM2 18V7h16v11H2z'
  }
];

const Timeline = ({ events = defaultEvents }: TimelineProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for path animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoothed scroll progress for the path drawing animation
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001
  });

  // Update scroll progress for lighting up the path
  useEffect(() => {
    return smoothProgress.onChange(latest => {
      setScrollProgress(latest);
    });
  }, [smoothProgress]);

  // Variants for the timeline markers
  const markerVariants = {
    initial: { 
      scale: 0.8,
      opacity: 0.5
    },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  // Generate path coordinates for the timeline path
  const generatePath = () => {
    const totalEvents = events.length;
    let path = `M 50 0`;
    
    // Create zigzag pattern
    for (let i = 0; i < totalEvents; i++) {
      const yPos = (i + 1) * 300; // Increased spacing for more content
      const xPos = i % 2 === 0 ? 180 : -80;
      path += ` L ${50 + xPos} ${yPos}`;
    }
    
    return path;
  };

  // Toggle project details expansion
  const toggleProjectDetails = (index: number) => {
    if (expandedProject === index) {
      setExpandedProject(null);
    } else {
      setExpandedProject(index);
    }
  };

  return (
    <MotionSection 
      id="timeline" 
      className="min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={typedFadeIn}
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-white text-glow font-playfair">My Academic Journey</h2>
      
      <div ref={containerRef} className="relative max-w-6xl w-full mx-auto px-4">
        {/* SVG Timeline Path */}
        <MotionSvg 
          className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-full"
          viewBox={`0 0 100 ${events.length * 300}`}
          preserveAspectRatio="none"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Background path */}
          <MotionPath
            d={generatePath()}
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10,10"
          />
          
          {/* Glowing animated path that follows scroll */}
          <MotionPath
            d={generatePath()}
            fill="none"
            stroke="url(#gradientPath)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${events.length * 600}`}
            strokeDashoffset={useTransform(
              smoothProgress,
              [0, 1],
              [events.length * 600, 0]
            )}
            className="blue-glow"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </MotionSvg>
        
        {/* Timeline Events */}
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const inView = useInView(containerRef, { once: true, amount: 0.1 });
          
          return (
            <MotionDiv
              key={index}
              className={`relative flex items-center mb-40 last:mb-16 ${isEven ? 'justify-end' : 'justify-start'}`}
              custom={index}
              variants={typedTimelineReveal}
            >
              {/* Interactive Timeline Marker */}
              <MotionDiv
                className={`absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gray-900 border-4 ${event.isFuture ? 'border-purple-500' : 'border-blue-500'} z-10 flex items-center justify-center ${hoveredIndex === index ? (event.isFuture ? 'purple-glow' : 'blue-glow') : ''}`}
                initial="initial"
                animate={inView ? "animate" : "initial"}
                whileHover="hover"
                variants={markerVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{
                  top: `${20 + index * 300}px`,
                  boxShadow: hoveredIndex === index 
                    ? `0 0 25px ${event.isFuture ? 'rgba(139, 92, 246, 0.8)' : 'rgba(59, 130, 246, 0.8)'}` 
                    : scrollProgress > (index + 0.5) / events.length 
                      ? `0 0 15px ${event.isFuture ? 'rgba(139, 92, 246, 0.5)' : 'rgba(59, 130, 246, 0.5)'}` 
                      : "none",
                }}
              >
                {/* Icon in the marker */}
                {event.icon && (
                  <MotionSvg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={event.isFuture ? "text-purple-400" : "text-blue-400"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 5, 0, -5, 0] }}
                    transition={{ 
                      scale: { delay: 0.2, duration: 0.5 },
                      rotate: { delay: 0.5, duration: 2, repeat: hoveredIndex === index ? Infinity : 0, repeatType: "loop" } 
                    }}
                  >
                    <path d={event.icon} />
                  </MotionSvg>
                )}
                
                {/* Glowing pulse effect */}
                {(hoveredIndex === index || scrollProgress > (index + 0.5) / events.length) && (
                  <MotionDiv
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                      boxShadow: [
                        `0 0 10px ${event.isFuture ? 'rgba(139, 92, 246, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`,
                        `0 0 20px ${event.isFuture ? 'rgba(139, 92, 246, 0.7)' : 'rgba(59, 130, 246, 0.7)'}`,
                        `0 0 10px ${event.isFuture ? 'rgba(139, 92, 246, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`
                      ]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </MotionDiv>
              
              {/* Content Card */}
              <MotionDiv
                className={`w-5/12 relative ${isEven ? 'mr-[calc(50%+2rem)]' : 'ml-[calc(50%+2rem)]'}`}
                variants={isEven ? typedSlideInLeft : typedSlideInRight}
                custom={index}
                whileHover={{ 
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <MotionDiv 
                  className={`relative p-6 glass-effect rounded-lg shadow-md futuristic-border transition-all duration-500 group ${event.isFuture ? 'hover:purple-glow' : 'hover:blue-glow'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Year badge */}
                  <MotionDiv 
                    className={`absolute top-0 ${event.isFuture ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white text-sm font-bold py-1 px-3 rounded-full transform -translate-y-1/2`}
                    style={isEven ? { left: '20px' } : { right: '20px' }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  >
                    {event.year}
                  </MotionDiv>
                  
                  <MotionH3 
                    className={`text-xl font-bold bg-clip-text text-transparent ${event.isFuture ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'} mb-2 mt-2 font-playfair`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {event.title}
                  </MotionH3>
                  
                  <MotionP 
                    className="text-gray-300 font-inter"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {event.description}
                  </MotionP>
                  
                  {/* Semesters section */}
                  {event.semesters && (
                    <MotionDiv
                      className="mt-3"
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="text-sm font-semibold text-gray-200 mb-2">Course Details:</h4>
                      <MotionUl className="space-y-2">
                        {event.semesters.map((semester, semIndex) => (
                          <MotionLi 
                            key={semIndex}
                            className="text-sm text-gray-300 glass-effect p-2 rounded-md"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 + semIndex * 0.1 }}
                          >
                            <span className="font-medium text-blue-300">{semester.name}:</span> {' '}
                            <span className="text-gray-400">{semester.subjects.join(', ')}</span>
                          </MotionLi>
                        ))}
                      </MotionUl>
                    </MotionDiv>
                  )}
                  
                  {/* Project section */}
                  {event.project && (
                    <MotionDiv
                      className="mt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <MotionDiv 
                        className="cursor-pointer glass-effect p-3 rounded-md hover:blue-glow transition-all duration-300"
                        onClick={() => toggleProjectDetails(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-semibold text-blue-300">Final Project:</h4>
                          <span className="text-white text-xs">
                            {expandedProject === index ? '▲' : '▼'}
                          </span>
                        </div>
                        
                        <div className="text-sm font-medium text-white mt-1">{event.project.name}</div>
                        
                        {expandedProject === index && (
                          <MotionP
                            className="text-xs text-gray-300 mt-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {event.project.description}
                          </MotionP>
                        )}
                      </MotionDiv>
                    </MotionDiv>
                  )}
                  
                  {/* Technologies section */}
                  {event.technologies && (
                    <MotionDiv 
                      className="mt-4 flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {event.technologies.map((tech, techIndex) => (
                        <MotionSpan 
                          key={techIndex}
                          className={`px-2 py-1 text-xs glass-effect rounded-md ${event.isFuture ? 'text-purple-300 hover:purple-glow' : 'text-blue-300 hover:blue-glow'}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ 
                            scale: 1.1, 
                            color: event.isFuture ? "#ddd6fe" : "#93c5fd",
                            boxShadow: event.isFuture ? "0 0 10px rgba(139, 92, 246, 0.5)" : "0 0 10px rgba(59, 130, 246, 0.5)" 
                          }}
                        >
                          {tech}
                        </MotionSpan>
                      ))}
                    </MotionDiv>
                  )}
                  
                  {/* Future learning indicator */}
                  {event.isFuture && (
                    <MotionDiv
                      className="mt-4 pt-3 border-t border-gray-700"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <MotionP 
                        className="text-sm text-center text-purple-300"
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut" 
                        }}
                      >
                        Future Focus: DSA and improving coding skills...
                      </MotionP>
                    </MotionDiv>
                  )}
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>
          );
        })}
      </div>
    </MotionSection>
  );
};

export default Timeline;