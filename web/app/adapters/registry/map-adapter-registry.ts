"use client";

import type { MapAdapter } from "../contracts/map-adapter";
import { MapboxMapAdapter } from "../providers/mapbox-map-adapter";

let mapAdapterInstance: MapAdapter | null = null;

export function getMapAdapter(): MapAdapter {
  if (!mapAdapterInstance) {
    mapAdapterInstance = new MapboxMapAdapter();
  }

  return mapAdapterInstance;
}
