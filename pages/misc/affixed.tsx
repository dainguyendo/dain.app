import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import * as React from "react";
import styled, { useTheme } from "styled-components";
import { getAllRoutes } from "../../fixed-routes/api";
import { StandardLayout } from "../../layout/StandardLayout";
import { useMapbox } from "../../stores/mapbox";
import { Text } from "../../ui/Text";
import { VerticalStack } from "../../ui/VerticalStack";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
mapboxgl.accessToken = accessToken!;

const DropdownContent = styled(DropdownMenu.Content)`
  background-color: ${(props) => props.theme.colors.grey100};
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: ${(props) => `${props.theme.spacing[2]}`};
`;

const DropdownItem = styled(DropdownMenu.Item)`
  border-radius: 4px;
  padding: ${(props) => `${props.theme.spacing[1]} ${props.theme.spacing[2]}`};
`;

const AffixedPage = ({
  routes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const theme = useTheme();
  const mapEl = React.useRef<HTMLDivElement>(null);
  const {
    initMap,
    map,
    addAndGoTo,
    removeSourceAndLayer,
    selectedLayer,
  } = useMapbox();

  React.useEffect(() => {
    initMap({
      container: mapEl.current ?? "",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-95.29141288449965, 39.879699639124645],
      zoom: 2,
    });
  }, []);

  return (
    <StandardLayout title="affixed">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div
        className="full-bleed"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(13, 1fr)",
          gridTemplateRows: "repeat(8, 1fr)",
        }}
      >
        <div
          style={{
            gridColumn: "3 / span 3",
            gridRow: "8 / 8",
            zIndex: 2,
          }}
        >
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Text>{selectedLayer ? selectedLayer : "Select a city"}</Text>
            </DropdownMenu.Trigger>
            <DropdownContent
              align="start"
              side="top"
              sideOffset={4}
              avoidCollisions={true}
            >
              {routes.map((route) => {
                return (
                  <motion.div
                    key={route.id}
                    whileHover={{
                      backgroundColor: theme.colors.grey200,
                    }}
                  >
                    <DropdownItem
                      key={route.id}
                      onSelect={() => {
                        const source = map?.getSource(route.id);
                        if (!source) {
                          return addAndGoTo(route.id);
                        } else {
                          return removeSourceAndLayer(route.id);
                        }
                      }}
                    >
                      <Text>{route.meta.title}</Text>
                    </DropdownItem>
                  </motion.div>
                );
              })}
            </DropdownContent>
          </DropdownMenu.Root>
        </div>
        <motion.div
          id="map"
          ref={mapEl}
          style={{
            gridColumn: "1 / 14",
            gridRow: "1 / 9",
            height: "350px",
          }}
        />
      </div>

      <VerticalStack space={1} style={{ marginTop: theme.spacing[2] }}>
        <Text
          fontWeight="bold"
          fontSize={3}
          lineHeight="heading"
          color="grey600"
        >
          affixed
        </Text>
        <Text>
          Cities and bicycles go{" "}
          <span style={{ textDecoration: "line-through" }}>hand in hand</span>{" "}
          (foot in pedal 😅 ?). Where immersion meets efficiency - exploring on
          a bike is hard to beat.
        </Text>
        <Text>
          Here are some routes my track bike, hence <i>affixed</i>, has met the
          city's pavement.
        </Text>
        <Text>Routes were exported from Google Map's timeline feature.</Text>
      </VerticalStack>
    </StandardLayout>
  );
};

export async function getStaticProps() {
  const routes = getAllRoutes({ withGeojson: false });
  return {
    props: {
      routes,
    },
  };
}

export default AffixedPage;
