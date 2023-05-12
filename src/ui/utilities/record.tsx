export const WIDTH_IDLE = "10vh";
export const WIDTH_PLAYING = "70vh";
export const HEIGHT_IDLE = "100vh";
export const HEIGHT_PLAYING = "70vh";

export const recordVariants = {
  idle: { rotate: 0 },
  spin: {
    rotate: 360,
    transition: {
      ease: "linear",
      repeat: Infinity,
      duration: 2.75,
    },
  },
  hidden: { opacity: 0 },
  faded: { opacity: 0.5 },
  visible: { opacity: 1 },
  shrink: { width: WIDTH_IDLE },
  expand: { width: WIDTH_PLAYING },

  stop: {
    opacity: [1, 0, 0],
    width: [WIDTH_PLAYING, WIDTH_PLAYING, WIDTH_IDLE],
  },
  queue: {
    opacity: [1, 1, 0],
    width: WIDTH_PLAYING,
  },
};
