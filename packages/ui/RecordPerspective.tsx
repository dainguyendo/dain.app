import { motion } from "framer-motion";

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

interface Props {
  children: React.ReactNode;
  variant: Variant;
}

export const RecordPerspective = ({ children, variant }: Props) => {
  return (
    <motion.div initial="flat" animate={variant} variants={variants}>
      {children}
    </motion.div>
  );
};
