import * as React from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Group } from "three";
import { getAudioData } from "../../audio/getAudioData";
import { useTrackVisualization } from "../../stores/trackVisualStore";
import { usePrevious } from "../usePrevious";
import { Cube } from "./Cube";

const RotatingGroup: React.FC = ({ children }) => {
  const group = React.useRef<Group>();

  useFrame(({ camera }) => {
    camera.position.set(
      camera.position.x + 0.03,
      camera.position.y,
      camera.position.z
    );
  });

  return <group ref={group}>{children}</group>;
};

interface Props {
  track: SpotifyApi.TrackObjectSimplified | null;
}

export const TrackWaveformVisual: React.FC<Props> = ({ track }) => {
  const { audio, cache, ctx, updateCache } = useTrackVisualization();
  const previousAudio = usePrevious(audio);

  React.useEffect(() => {
    if (audio !== previousAudio) {
      previousAudio?.pause();
    }
  }, [audio, previousAudio]);

  React.useEffect(() => {
    if (ctx && track && !cache.hasOwnProperty(track.id)) {
      (async () => {
        const data = await getAudioData(ctx, track.preview_url ?? "");
        updateCache({
          [track.id]: {
            data,
            previewUrl: track.preview_url ?? "",
          },
        });
      })();
    }
  }, [ctx, track]);

  const trackCache = cache[track?.id ?? ""];

  if (track && audio && trackCache && audio.duration > 0) {
    return (
      <React.Fragment>
        <Canvas camera={{ position: [30, 10, 20], fov: 12 }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <RotatingGroup>
            {trackCache.data.map((value, idx) => {
              const delay =
                (audio.duration / trackCache.data.length) * idx * 1000;
              return (
                <Cube
                  key={idx}
                  value={value}
                  delay={delay}
                  position={[idx, 0, 0]}
                />
              );
            })}
          </RotatingGroup>
        </Canvas>
      </React.Fragment>
    );
  }

  return null;
};
