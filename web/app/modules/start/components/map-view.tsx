"use client";

import { useEffect, useRef } from "react";
import { getMapAdapter } from "../../../adapters/registry/map-adapter-registry";

export default function MapView() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapAdapter = getMapAdapter();

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    mapAdapter.mount({ container: mapContainerRef.current });

    return () => {
      mapAdapter.unmount();
    };
  }, [mapAdapter]);

  const isAvailable = mapAdapter.isAvailable();

  return (
    <div className="min-h-[340px]">
      {isAvailable ? (
        <div
          ref={mapContainerRef}
          className="min-h-[380px] overflow-hidden rounded-[10px] border border-border bg-surface"
        />
      ) : (
        <div className="grid min-h-[380px] place-items-center overflow-hidden rounded-[10px] border border-border bg-surface p-[18px] text-center text-sm text-neutral-600">
          <p>Karta visas här när NEXT_PUBLIC_MAPBOX_TOKEN finns i web/.env.</p>
        </div>
      )}
    </div>
  );
}
