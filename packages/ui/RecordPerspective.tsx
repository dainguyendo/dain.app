import { motion, MotionProps } from "framer-motion";

const variants = {
  flat: {
    transform: "rotateX(0deg) rotateY(0deg)",
    transition: {
      duration: 0.5,
    },
  },
  skew: {
    transform: "rotateX(25deg) rotateY(45deg)",
    transition: {
      when: "afterChildren",
    },
  },
} as const;

type Variant = keyof typeof variants;

interface Props extends MotionProps {
  children: React.ReactNode;
  variant: Variant;
}

export const RecordPerspective = ({
  children,
  variant,
  ...motionProps
}: Props) => {
  return (
    <motion.div
      {...motionProps}
      initial="flat"
      animate={variant}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
