import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const routesDirectory = join(process.cwd(), "_routes");

function getRouteSlugs() {
  return fs.readdirSync(routesDirectory);
}

interface Options {
  withGeojson: boolean;
}

interface Route {
  id: string;
  meta: {
    title: string;
    description?: string;
  };
  geojson?: any;
}

export function getRouteBySlug(slug: string, options: Options) {
  const fullPath = join(routesDirectory, slug);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const route: Route = {
    id: slug,
    meta: {
      title: data.title,
      description: data?.description,
    },
  };

  if (options.withGeojson) route.geojson = JSON.parse(content);

  return route;
}

export function getAllRoutes(options: Options) {
  const slugs = getRouteSlugs();
  const routes = slugs
    .map((slug) => getRouteBySlug(slug, options))
    .sort(
      (route1, route2) => route1.meta.title.length - route2.meta.title.length
    );
  return routes;
}
