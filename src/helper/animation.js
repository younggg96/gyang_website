export const variants = {
  hidden: {
    y: -5,
    opacity: 0,
  },
  show: {
    y: 10,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.9],
    },
  },
};

export const transition = {
  duration: .25,
  ease: [0.6, 0.01, -0.05, 0.9],
  // ease: [0.43, 0.13, 0.23, 0.96],
};
