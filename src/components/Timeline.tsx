import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion';
import { timelineReveal, timelinePath, timelineMarker, timelineContent } from '../utils/animations';

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
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Optimized scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.001
  });

  // Memoized path generation
  const pathData = useMemo(() => {
    const totalEvents = events.length;
    let path = 'M 50 0';
    
    for (let i = 0; i < totalEvents; i++) {
      const yPos = (i + 1) * 300;
      const xPos = i % 2 === 0 ? 180 : -80;
      path += ` C ${50} ${yPos - 150}, ${50 + xPos * 0.5} ${yPos - 150}, ${50 + xPos} ${yPos}`;
    }
    
    return path;
  }, [events.length]);

  // Progressive loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      className="min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-gradient-to-b from-transparent to-black/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={timelineReveal}
    >
      <MotionH3 
        className="text-4xl font-bold mb-12 text-center text-white text-glow font-playfair"
        variants={timelineReveal}
      >
        My Academic Journey
      </MotionH3>
      
      <div ref={containerRef} className="relative max-w-6xl w-full mx-auto px-4">
        {/* Animated Timeline Path */}
        <MotionSvg 
          className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-full pointer-events-none"
          viewBox={`0 0 100 ${events.length * 300}`}
          preserveAspectRatio="none"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={timelinePath}
        >
          {/* Background path with gradient */}
          <linearGradient id="pathGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
          </linearGradient>
          
          <MotionPath
            d={pathData}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1"
            className="drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          />
          
          {/* Animated progress path */}
          <MotionPath
            d={pathData}
            fill="none"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1"
            className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            style={{
              pathLength: smoothProgress,
              opacity: smoothProgress
            }}
          />
        </MotionSvg>

        {/* Timeline Events */}
        {events.map((event, index) => (
          <MotionDiv
            key={index}
            className={`flex items-center justify-${index % 2 === 0 ? 'start' : 'end'} relative mb-32`}
            variants={timelineContent}
            custom={index % 2 === 0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover="hover"
          >
            {/* Timeline Marker */}
            <MotionDiv
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 cursor-pointer"
              variants={timelineMarker}
              custom={index}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{
                boxShadow: hoveredIndex === index ? '0 0 20px rgba(59, 130, 246, 0.6)' : '0 0 10px rgba(59, 130, 246, 0.3)'
              }}
            />

            {/* Event Content */}
            <MotionDiv
              className={`w-[45%] ${index % 2 === 0 ? 'ml-auto pl-8' : 'mr-auto pr-8'} 
                bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg 
                border border-white/10 hover:border-blue-500/30 transition-colors
                transform-gpu`}
              variants={timelineContent}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <MotionSpan 
                className="text-blue-400 font-mono text-sm mb-2 block"
                variants={timelineReveal}
              >
                {event.year}
              </MotionSpan>
              
              <MotionH3 
                className="text-xl font-bold mb-3 text-white"
                variants={timelineReveal}
              >
                {event.title}
              </MotionH3>
              
              <MotionP 
                className="text-gray-300 mb-4"
                variants={timelineReveal}
              >
                {event.description}
              </MotionP>

              {/* Technologies */}
              {event.technologies && (
                <MotionUl className="flex flex-wrap gap-2 mt-3">
                  {event.technologies.map((tech, techIndex) => (
                    <MotionLi
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300"
                      variants={timelineReveal}
                      custom={techIndex}
                    >
                      {tech}
                    </MotionLi>
                  ))}
                </MotionUl>
              )}

              {/* Project Details */}
              {event.project && (
                <MotionDiv
                  className="mt-4 p-4 rounded-lg bg-blue-900/20 cursor-pointer"
                  onClick={() => toggleProjectDetails(index)}
                  whileHover={{ scale: 1.02 }}
                  variants={timelineReveal}
                >
                  <h4 className="font-semibold text-blue-300">{event.project.name}</h4>
                  {expandedProject === index && (
                    <MotionP
                      className="mt-2 text-gray-300 text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {event.project.description}
                    </MotionP>
                  )}
                </MotionDiv>
              )}
            </MotionDiv>
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  );
};

export default Timeline;