import { motion } from "framer-motion";
import * as React from "react";

type Props = React.CSSProperties & {
  id?: string;
  layout?: boolean;
};

export const Grid: React.FC<Props> = ({ children, id, layout, ...props }) => {
  return (
    <motion.div
      id={id}
      layout={layout}
      className="grid"
      style={{
        ...props,
        display: "grid",
      }}
    >
      {children}
    </motion.div>
  );
};
