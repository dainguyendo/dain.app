import mapboxgl from "mapbox-gl";

export function getBoundsFromFeatures(
  features: mapboxgl.MapboxGeoJSONFeature[]
) {
  try {
    const bounds = new mapboxgl.LngLatBounds();
    features.forEach(function (feature: any) {
      if (!Array.isArray(feature.geometry.coordinates[0])) {
        // point feature
        bounds.extend(feature.geometry.coordinates);
      } else {
        feature.geometry.coordinates.reduce(function (bounds: any, coord: any) {
          return bounds.extend(coord);
        }, bounds);
      }
    });
    return bounds;
  } catch (error) {
    console.group("getBoundsFromFeatures");
    console.log(error);
    console.groupEnd();
  }
}
