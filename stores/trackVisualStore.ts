import create from "zustand";

type VisualizationState = {
  audio: HTMLAudioElement | null;
  ctx: AudioContext | null;
  cache: Partial<
    Record<
      string,
      {
        previewUrl: string;
        data: number[];
      }
    >
  >;
  track: SpotifyApi.TrackObjectSimplified | null;

  setCtx: (ctx: AudioContext) => void;
  setTrack: (track: SpotifyApi.TrackObjectSimplified) => void;
  updateCache: (
    cache: Record<
      string,
      {
        previewUrl: string;
        data: number[];
      }
    >
  ) => void;
};

export const useTrackVisualization = create<VisualizationState>((set, get) => ({
  audio: null,
  ctx: null,
  cache: {},
  track: null,

  setCtx: (ctx) => set({ ctx }),
  setTrack: (track) => {
    const isSameTrack = track.id === get().track?.id;
    const audio = new Audio(track?.preview_url ?? "");
    audio.volume = 0.2;
    !isSameTrack && audio.play();
    return set({
      audio,
      ctx: get().ctx === null ? new AudioContext() : get().ctx,
      track: isSameTrack ? null : track,
    });
  },
  updateCache: (cache) =>
    set((state) => ({ cache: { ...state.cache, ...cache } })),
}));
