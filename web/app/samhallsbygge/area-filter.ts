import type { SamhallsbyggeItem } from "./samhallsbygge-api";
import { siteConfig } from "../shared/config/site.config";

const toRad = (value: number): number => (value * Math.PI) / 180;

const distanceInKm = (a: [number, number], b: [number, number]): number => {
  const earthRadiusKm = 6371;
  const dLat = toRad(b[1] - a[1]);
  const dLng = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);

  const haversine =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
};

const getGeometryCenter = (
  geometry: NonNullable<SamhallsbyggeItem["geometry"]>,
): [number, number] | null => {
  if (geometry.type === "Point") {
    if (geometry.coordinates.length < 2) {
      return null;
    }
    return [geometry.coordinates[0], geometry.coordinates[1]];
  }

  const flattened =
    geometry.type === "LineString"
      ? geometry.coordinates
      : geometry.type === "Polygon"
        ? geometry.coordinates.flat()
        : geometry.coordinates.flat(2);

  const coords = flattened.filter((point) => point.length >= 2);
  if (coords.length === 0) {
    return null;
  }

  const sums = coords.reduce(
    (acc, [lng, lat]) => [acc[0] + lng, acc[1] + lat] as [number, number],
    [0, 0] as [number, number],
  );
  return [sums[0] / coords.length, sums[1] / coords.length];
};

export function filterAreaSamhallsbyggeItems(items: SamhallsbyggeItem[]): SamhallsbyggeItem[] {
  const matchesAreaText = (item: SamhallsbyggeItem): boolean => {
    const searchable = [item.title, item.subtitle, item.reference].filter(Boolean).join(" ").toLowerCase();
    return siteConfig.geography.keywords.some((keyword) => searchable.includes(keyword));
  };

  return items.filter((item) => {
    const textMatch = matchesAreaText(item);
    if (textMatch) {
      return true;
    }

    if (!item.geometry) {
      return false;
    }

    const center = getGeometryCenter(item.geometry);
    if (!center) {
      return false;
    }

    const [lng, lat] = center;
    const isInsideAreaBounds =
      lng >= siteConfig.geography.bounds.minLng &&
      lng <= siteConfig.geography.bounds.maxLng &&
      lat >= siteConfig.geography.bounds.minLat &&
      lat <= siteConfig.geography.bounds.maxLat;

    const isNearAreaCenter = distanceInKm(center, siteConfig.geography.center) <= siteConfig.geography.maxDistanceKm;
    return isInsideAreaBounds && isNearAreaCenter;
  });
}
