import mapboxgl from "mapbox-gl";
import create from "zustand";
import { getBoundsFromFeatures } from "../packages/map-utils";

type State = {
  map: mapboxgl.Map | null;
  selectedLayer: string | null;

  initMap: (options?: mapboxgl.MapboxOptions) => void;
  getMap: () => mapboxgl.Map;

  addAndGoTo: (id: string) => void;
  removeSourceAndLayer: (id: string) => void;
};

export const useMapbox = create<State>((set, get) => ({
  map: null,
  selectedLayer: null,

  initMap: (options) => {
    const map = new mapboxgl.Map(options);
    return set({ map });
  },
  getMap: () => get().map!,
  addAndGoTo: async (id) => {
    const map = get().map;
    const response = await fetch(`/api/get-route?id=${id}`);
    const route = await response.json();
    const featureCollection = route.geojson;

    map?.addSource(id, {
      type: "geojson",
      data: featureCollection,
    });
    map?.addLayer({
      id,
      type: "line",
      source: id,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "hotpink",
        "line-width": 2.25,
      },
    });

    const bounds = getBoundsFromFeatures(featureCollection.features);

    if (bounds) {
      map?.fitBounds(bounds, {
        padding: 20,
      });
    }

    set({ selectedLayer: route.meta.title });
  },

  removeSourceAndLayer: (id) => {
    const map = get().map;
    map?.removeLayer(id);
    map?.removeSource(id);
    set({ selectedLayer: null });
  },
}));
