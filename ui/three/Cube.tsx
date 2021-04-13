import { a, useSpring } from "@react-spring/three";
import { MeshProps } from "@react-three/fiber";
import * as React from "react";
import type { Mesh } from "three";

interface Props extends MeshProps {
  delay?: number;
  value: number;
}

export const Cube = ({ delay = 0, value, ...meshProps }: Props) => {
  const mesh = React.useRef<Mesh>();

  const zed = Math.floor(value * 5 + 1);

  const spring = useSpring({
    from: {
      scale: [0, 0, 0],
    },
    to: { scale: [1, zed, 1] },
    config: {
      mass: 1,
      tension: 330,
      friction: 15,
    },
    delay: delay,
  });

  return (
    <a.mesh {...meshProps} ref={mesh} scale={spring.scale as any}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <a.meshStandardMaterial color="hotpink" />
    </a.mesh>
  );
};
