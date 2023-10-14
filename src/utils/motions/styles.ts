export const motionContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const motionItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const listItemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  }),
};

export const imageVariants = {
  initial: {
    rotateY: -180,
    scale: 0.8,
  },
  animate: {
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export const rotateImageVariants = {
  hidden: {
    opacity: 0,
    rotateY: -180,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export const tableVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const rowVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};
