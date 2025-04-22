import React, { useState } from 'react';
import { motion, useAnimation, useCycle, AnimatePresence, useReducedMotion } from 'framer-motion';
import { fadeIn, slideUp } from '../utils/animations';

// Use "as any" to work around TypeScript errors with motion components
const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;
const MotionImg = motion.img as any;
const MotionButton = motion.button as any;

const About: React.FC = () => {
  // Toggle state for profile flip animation
  const [isFlipped, toggleFlip] = useCycle(false, true);
  const shouldReduceMotion = useReducedMotion();
  
  // Variants for the profile container
  const profileContainerVariants = {
    initial: {
      y: 0,
    },
    hover: {
      y: shouldReduceMotion ? 0 : -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        yoyo: Infinity,
        repeatType: "reverse",
        repeat: 1,
      }
    },
    flipped: {
      rotateY: shouldReduceMotion ? 0 : 180,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    },
    notFlipped: {
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    }
  };

  // Variants for the front of the card
  const frontVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Variants for the back of the card
  const backVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Variants for the button/label
  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 0 0 rgba(88, 130, 252, 0.4)",
    },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.05,
      boxShadow: shouldReduceMotion 
        ? "0 0 0 rgba(88, 130, 252, 0.4)"
        : "0 0 20px rgba(88, 130, 252, 0.7)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      }
    }
  };

  const handleFlip = () => {
    toggleFlip();
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <MotionDiv 
        className="max-w-4xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <MotionH2 
          className="text-4xl font-bold mb-8 text-center text-white"
          variants={slideUp}
        >
          About Me
        </MotionH2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MotionDiv 
            className="flex flex-col justify-center items-center"
            variants={slideUp}
          >
            {/* Profile picture container with 3D perspective */}
            <MotionDiv 
              className="perspective-1000 w-64 h-80 md:w-80 md:h-96 mb-6 cursor-pointer relative"
              initial="initial"
              animate={isFlipped ? "flipped" : "notFlipped"}
              whileHover={!isFlipped ? "hover" : ""}
              variants={profileContainerVariants}
              onClick={handleFlip}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front side with profile picture */}
              <MotionDiv
                className={`absolute inset-0 w-full h-full rounded-xl border-4 backdrop-blur-lg bg-gradient-to-br from-blue-500/30 to-purple-600/30 border-white/30 flex items-center justify-center shadow-xl ${isFlipped ? "backface-hidden" : ""}`}
                style={{ 
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                <MotionImg 
                  src="/profile.jpg" 
                  alt="Profile" 
                  className="rounded-lg w-5/6 h-5/6 object-cover shadow-lg border-2 border-white/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </MotionDiv>
              
              {/* Back side with tagline */}
              <MotionDiv
                className="absolute inset-0 w-full h-full rounded-xl backdrop-blur-lg bg-gradient-to-br from-purple-600/30 to-blue-500/30 border-4 border-white/30 flex items-center justify-center shadow-lg text-center px-4 backface-hidden"
                style={{ 
                  transform: "rotateY(180deg)", 
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                <MotionP
                  className="text-2xl font-bold text-white drop-shadow-glow"
                  style={{
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.7)"
                  }}
                >
                  I make things work ✨
                </MotionP>
              </MotionDiv>
            </MotionDiv>
            
            {/* Label button below profile */}
            <MotionButton
              className="mt-4 px-6 py-2 rounded-full text-white bg-gradient-to-r from-blue-600/80 to-purple-600/80 border border-white/30 backdrop-blur-sm shadow-lg"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handleFlip}
            >
              Click here to see what I can do
            </MotionButton>
          </MotionDiv>
          <MotionDiv 
            className="flex flex-col justify-center backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 p-6 rounded-lg text-white"
            variants={slideUp}
          >
            <MotionP 
              className="mb-4"
              variants={slideUp}
              custom={1}
            >
              Hi there! I'm a passionate developer with a love for creating clean, user-friendly interfaces
              and solving complex problems through code.
            </MotionP>
            <MotionP 
              className="mb-4"
              variants={slideUp}
              custom={2}
            >
              With experience in modern web technologies and a keen eye for design, I strive to build
              applications that are not only functional but also aesthetically pleasing.
            </MotionP>
            <MotionP
              variants={slideUp}
              custom={3}
            >
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or enjoying the outdoors.
            </MotionP>
          </MotionDiv>
        </div>
      </MotionDiv>
    </section>
  );
};

export default About; 