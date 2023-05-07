import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export const TextEllipsis = ({ children }: Props) => (
  <motion.span className="truncate">{children}</motion.span>
);
