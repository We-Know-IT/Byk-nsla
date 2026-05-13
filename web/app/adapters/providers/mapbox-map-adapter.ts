"use client";

import mapboxgl from "mapbox-gl";
import { siteConfig } from "../../shared/config/site.config";
import type { MapAdapter, MapAdapterInitOptions } from "../contracts/map-adapter";
import "mapbox-gl/dist/mapbox-gl.css";

export class MapboxMapAdapter implements MapAdapter {
  private map: mapboxgl.Map | null = null;

  isAvailable() {
    return Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
  }

  mount({ container }: MapAdapterInitOptions) {
    if (this.map) {
      return;
    }

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      return;
    }

    mapboxgl.accessToken = token;

    this.map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v12",
      center: siteConfig.geography.center,
      zoom: 12,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), "top-right");
  }

  unmount() {
    if (!this.map) {
      return;
    }

    this.map.remove();
    this.map = null;
  }
}
