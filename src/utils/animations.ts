import { Variants } from 'framer-motion';

// Reusable animation variants for various components
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const slideUp: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideDown: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Card hover animations
export const cardHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.03, 
    boxShadow: "0 5px 20px var(--hover-shadow, rgba(0, 110, 255, 0.2))",
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 15 
    }
  },
  tap: { scale: 0.98 }
};

// Subtle tilt effect
export const tiltEffect: Variants = {
  initial: { rotate: 0, transformPerspective: 1000 },
  hover: { 
    rotateX: 5, 
    rotateY: 5, 
    transition: { duration: 0.4 } 
  }
};

// Glow effect animation
export const glowEffect: Variants = {
  initial: { 
    boxShadow: "0 0 0 rgba(66, 153, 225, 0)" 
  },
  hover: { 
    boxShadow: "0 0 20px var(--hover-shadow, rgba(66, 153, 225, 0.6))",
    transition: { 
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse" 
    } 
  }
};

// Button hover animation
export const buttonAnimation: Variants = {
  initial: { scale: 1, boxShadow: "0 0 0 rgba(66, 153, 225, 0)" },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 20px var(--hover-shadow, rgba(66, 153, 225, 0.6))",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

// Skill bar animation
export const skillBarAnimation: Variants = {
  hidden: { width: 0 },
  visible: (custom: number) => ({
    width: `${custom}%`,
    transition: { 
      duration: 1.2,
      delay: 0.2,
      ease: "easeOut"
    }
  })
};

// Timeline item reveal
export const timelineReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Profile image animation
export const profileImageAnimation: Variants = {
  initial: { 
    borderRadius: "50%",
    boxShadow: "0 0 0 rgba(66, 153, 225, 0)" 
  },
  hover: { 
    borderRadius: "40%",
    boxShadow: "0 0 30px rgba(66, 153, 225, 0.6)",
    transition: { 
      duration: 0.6
    } 
  }
};

// Text character animation
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5
    }
  }
};

// Floating animation for subtle movement
export const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

// Social icon hover animation
export const socialIconAnimation: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({ 
    scale: 1, 
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring", 
      stiffness: 260, 
      damping: 20
    }
  }),
  hover: { 
    scale: 1.2,
    y: -5,
    transition: {
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  }
};

// Input field focus animation
export const inputAnimation: Variants = {
  rest: { scale: 1 },
  focus: { 
    scale: 1.01,
    boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.6)", 
    transition: {
      duration: 0.2
    }
  }
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
}; 