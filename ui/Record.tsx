import { motion } from "framer-motion";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const Record: React.FC<Props> = (props) => {
  return (
    <motion.div
      whileHover={{
        rotate: 360,
        transition: {
          ease: "linear",
          repeat: Infinity,
          duration: 5,
        },
      }}
      className="record"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: props.height,
        width: props.width,
        backgroundImage: `url(${props.src})`,
        backgroundSize: "contain",
        borderRadius: "50%",
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
