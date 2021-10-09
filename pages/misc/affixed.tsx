import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import NextLink from "next/link";
import * as React from "react";
import { getAllRoutes, Route } from "../../fixed-routes/api";
import FullViewLayout from "../../layout/FullViewLayout";
import { Button } from "../../packages/ui/Button";
import { Card } from "../../packages/ui/Card";
import { Flex } from "../../packages/ui/Flex";
import { Heading } from "../../packages/ui/Heading";
import { Link } from "../../packages/ui/Link";
import { Text } from "../../packages/ui/Text";
import { useMapbox } from "../../stores/mapbox";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
mapboxgl.accessToken = accessToken!;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Card css={{ p: "$4", vs: "$2" }}>
          <NextLink href="/misc">
            <Link>
              <Flex direction="row" align="center">
                <ArrowLeftIcon width={18} height={18} />
                <Text>back</Text>
              </Flex>
            </Link>
          </NextLink>
          <Heading size="4">affixed</Heading>
          <motion.div>
            <Flex direction="row" gap="2">
              {routes.map((route) => (
                <motion.div
                  key={route.id}
                  initial="out"
                  animate={{
                    opacity:
                      selectedLayer && selectedLayer !== route.meta.title
                        ? 0.2
                        : 1,
                  }}
                >
                  <Button type="button" onClick={() => handleClick(route)}>
                    <Text
                      variant={
                        selectedLayer === route.meta.title ? "crimson" : "gray"
                      }
                    >
                      {route.meta.title}
                    </Text>
                  </Button>
                </motion.div>
              ))}
            </Flex>
          </motion.div>
        </Card>
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
