import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, buttonAnimation, floatingAnimation } from '../utils/animations';

// Use "as any" to work around TypeScript errors with motion components
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;
const MotionA = motion.a as any;
const MotionSpan = motion.span as any;

const Hero: React.FC = () => {
  return (
    <section id="hero" className="h-screen flex items-center justify-center flex-col">
      <MotionDiv 
        className="text-center backdrop-blur-sm p-8 rounded-lg bg-white/10 dark:bg-gray-800/10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <MotionH1 
          className="text-5xl font-bold mb-4"
          variants={slideUp}
        >
          Hii I am <MotionSpan className="twinkle-text">Tirth Raval</MotionSpan>
        </MotionH1>
        <MotionP 
          className="text-xl mb-6 max-w-lg text-center"
          variants={slideUp}
        >
          If you are wondering where I am right now, probably somewhere between coffee and code.
        </MotionP>
        <MotionDiv
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
        >
          <MotionA 
            href="#about" 
            className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-block"
            variants={buttonAnimation}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            Learn More
          </MotionA>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};

export default Hero; 