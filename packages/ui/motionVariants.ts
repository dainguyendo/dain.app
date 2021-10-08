export const motionXTranslateAndFadeVariant = {
  hidden: (custom: { x: number; delay: number }) => ({
    x: custom.x,
    opacity: 0,
  }),
  visible: (custom: { x: number; delay: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom.delay,
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  }),
};

export const motionYTranslateAndFadeVariant = {
  hidden: (custom: { y: number }) => ({
    y: custom.y,
    opacity: 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const motionRecordRotationVariants = {
  flat: {
    transform: "rotateX(0deg) rotateY(0deg)",
    transition: {
      duration: 0.5,
    },
  },
  skew: { transform: "rotateX(25deg) rotateY(25deg)" },
};
