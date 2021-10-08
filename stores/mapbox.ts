import mapboxgl from "mapbox-gl";
import create from "zustand";
import { getBoundsFromFeatures } from "../packages/map-utils";
import { theme } from "../stitches.config";

type State = {
  map: mapboxgl.Map | null;
  selectedLayer: string | null;

  initMap: (options?: mapboxgl.MapboxOptions) => void;
  addAndGoTo: (route: any) => void;
  removeSourceAndLayer: (id: string) => void;
};

export const useMapbox = create<State>((set, get) => ({
  map: null,
  selectedLayer: null,

  initMap: (options) => {
    const map = new mapboxgl.Map(options);
    addBuildings(map);
    return set({ map });
  },
  addAndGoTo: async (route) => {
    const map = get().map;
    map?.addSource(route.id, {
      type: "geojson",
      data: route.geojson,
    });
    map?.addLayer({
      id: route.id,
      type: "line",
      source: route.id,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "hotpink",
        "line-width": 2.25,
      },
    });

    const bounds = getBoundsFromFeatures(route.geojson.features);

    if (bounds) {
      map?.fitBounds(bounds, {
        padding: 15,
        pitch: 15,
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

function addBuildings(map: mapboxgl.Map) {
  map.on("load", function () {
    // Insert the layer beneath any symbol layer.
    let layers = map.getStyle().layers ?? [];
    let labelLayerId;
    for (let i = 0; i < layers.length; i++) {
      if (
        layers[i].type === "symbol" &&
        (layers[i] as mapboxgl.SymbolLayer).layout?.["text-field"]
      ) {
        labelLayerId = layers[i].id;
        break;
      }
    }

    map.addLayer(
      {
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 11,
        paint: {
          "fill-extrusion-color": theme.colors.crimson8.value,

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-opacity": 0.6,
        },
      },
      labelLayerId
    );
  });
}
