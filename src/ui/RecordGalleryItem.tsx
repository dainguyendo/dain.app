import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SimplifiedTrack } from "../spotify/types";

interface Props {
  active: boolean;
  track: SimplifiedTrack;
  mouseX: MotionValue;

  onHoverStart: (id: string) => void;
  onHoverEnd: (id: string) => void;
}

export const RecordGalleryItem = ({
  active,
  track,
  mouseX,
  onHoverStart,
  onHoverEnd,
}: Props) => {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref?.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [150, 600, 150]);
  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      id={`record-${track.id}`}
      ref={ref}
      style={{
        backgroundImage: `url(${track?.albumImageUrl ?? "/gradient.avif"})`,
        width,
        height: "50vh",
      }}
      className="flex align-center justify-center bg-no-repeat bg-cover"
      onHoverStart={() => {
        onHoverStart(track.id);
      }}
      onHoverEnd={() => {
        onHoverEnd(track.id);
      }}
    />
  );
};
