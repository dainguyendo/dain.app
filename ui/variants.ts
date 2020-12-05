export const listVariants = {
  in: {
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

export const listItemVariants = {
  out: {
    x: "100%",
    opacity: 0,
    transition: {
      stiffness: 1000,
    },
  },
  in: {
    x: 0,
    opacity: 1,
    transition: {
      stiffness: 1000,
    },
  },
};
