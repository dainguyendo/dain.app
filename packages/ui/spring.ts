import { Transition } from "framer-motion";

export const stiffSpringTransition: Transition = {
  type: "spring",
  stiffness: 210,
  mass: 1,
  damping: 20,
};
