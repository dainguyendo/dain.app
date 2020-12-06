import * as React from "react";
import {
  Camera,
  PerspectiveCameraProps,
  useFrame,
  useThree,
} from "react-three-fiber";

function Cam(props: PerspectiveCameraProps) {
  const ref = React.useRef<Camera>();
  const { setDefaultCamera } = useThree();
  // Make the camera known to the system
  React.useEffect(() => ref.current && void setDefaultCamera(ref.current), []);
  // Update it every frame
  useFrame(() => ref.current?.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
}

export default Cam;
