import { ArrowLeftIcon } from "@modulz/radix-icons";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { getAllRoutes, Route } from "../../fixed-routes/api";
import FullViewLayout from "../../layout/FullViewLayout";
import { Flex } from "../../packages/ui/Flex";
import { Pill } from "../../packages/ui/Pill";
import { Stack } from "../../packages/ui/Stack";
import { styled, theme } from "../../stitches.config";
import { useMapbox } from "../../stores/mapbox";
import { Text } from "../../packages/ui/Text";
import { listItemVariants, listVariants } from "../../ui/variants";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
mapboxgl.accessToken = accessToken!;

const Card = styled("div", {
  backgroundColor: "$gray12",
  borderRadius: "$1",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  p: "$2",
});

const AffixedPage = ({
  routes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

  const handleClick = (route: Route) => {
    const source = map?.getSource(route.id);
    if (!source) {
      return addAndGoTo(route);
    } else {
      return removeSourceAndLayer(route.id);
    }
  };

  return (
    <FullViewLayout title="affixed">
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
          height: "100%",
          width: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "2.5%",
        }}
      >
        <Stack space={1}>
          <motion.div initial="out" animate="in" variants={listVariants}>
            <Stack direction="horizontal" space={1}>
              {routes.map((route) => (
                <motion.div
                  key={route.id}
                  initial="out"
                  animate={{
                    ...listItemVariants.in,
                    opacity:
                      selectedLayer && selectedLayer !== route.meta.title
                        ? 0.2
                        : 1,
                  }}
                  variants={listItemVariants}
                >
                  <Pill
                    role="button"
                    onClick={() => handleClick(route)}
                    style={{ cursor: "pointer" }}
                  >
                    <Text color="grey100">{route.meta.title}</Text>
                  </Pill>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
          <Card>
            <Link href="/misc">
              <a>
                <Flex direction="row" align="center">
                  <ArrowLeftIcon />
                  <Text>back</Text>
                </Flex>
              </a>
            </Link>
            <Stack space={1} style={{ marginTop: theme.space[2].value }}>
              <Text>affixed</Text>
              <Text>
                Cities and bicycles go{" "}
                <span style={{ textDecoration: "line-through" }}>
                  hand in hand
                </span>{" "}
                (foot in pedal 😅 ?). Where immersion meets efficiency -
                exploring on a bike is hard to beat.
              </Text>
              <Text>
                Here are some routes my track bike, hence <i>affixed</i>, has
                met the city's pavement.
              </Text>
              <Text>
                Routes were exported from Google Map's timeline feature.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </div>
    </FullViewLayout>
  );
};

export async function getStaticProps() {
  const routes = getAllRoutes({ withGeojson: true });
  return {
    props: {
      routes,
    },
  };
}

export default AffixedPage;
