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
    <div className="mapShell">
      {isAvailable ? (
        <div ref={mapContainerRef} className="mapCanvas" />
      ) : (
        <div className="mapFallback">
          <p>Karta visas här när NEXT_PUBLIC_MAPBOX_TOKEN finns i web/.env.</p>
        </div>
      )}
    </div>
  );
}
