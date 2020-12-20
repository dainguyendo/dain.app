import { StandardLayout } from "../../layout/StandardLayout";

import * as React from "react";
import mapboxgl from "mapbox-gl";
import Head from "next/head";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
mapboxgl.accessToken = accessToken!;

const FixedRoutesPage = () => {
  const mapEl = React.useRef<HTMLDivElement>(null);
  const [mapState] = React.useState({
    lng: 5,
    lat: 34,
    zoom: 2,
  });

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapEl.current ?? "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom,
    });
  }, []);

  return (
    <StandardLayout title="Fixed Routes">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div
        id="map"
        ref={mapEl}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      />
    </StandardLayout>
  );
};

export default FixedRoutesPage;
