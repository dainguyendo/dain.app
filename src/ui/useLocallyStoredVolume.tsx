import { useLocalStorage } from "./useLocalStorage";

export function useLocallyStoredVolume() {
  return useLocalStorage("tracksVolume", 0.5);
}
