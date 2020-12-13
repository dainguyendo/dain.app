import { HTMLMotionProps, motion } from "framer-motion";

type Props = HTMLMotionProps<"div"> & {
  height: React.CSSProperties["height"];
  width: React.CSSProperties["width"];
  src: string | undefined;
};

export const Record: React.FC<Props> = ({
  height,
  width,
  src,
  ...motionProps
}) => {
  return (
    <motion.div
      {...motionProps}
      className="record"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        borderRadius: "50%",
        ...motionProps.style,
      }}
    >
      <div
        className="record-hole"
        style={{
          backgroundColor: "#FFFF",
          borderRadius: "50%",
          width: "15%",
          height: "15%",
        }}
      />
    </motion.div>
  );
};
