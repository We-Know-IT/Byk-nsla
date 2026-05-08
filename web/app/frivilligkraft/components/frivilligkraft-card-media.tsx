/* eslint-disable @next/next/no-img-element -- Remote Lund URLs plus client-side onError fallback */
"use client";

import { useState } from "react";
import { siteConfig } from "../../shared/config/site.config";

type FrivilligkraftCardMediaProps = {
  imageUrl: string | null;
};

export default function FrivilligkraftCardMedia({ imageUrl }: FrivilligkraftCardMediaProps) {
  const [broken, setBroken] = useState(false);
  const showPhoto = Boolean(imageUrl) && !broken;

  return (
    <div className="frivilligkraftCardImage" aria-hidden="true">
      {showPhoto ? (
        <img
          src={imageUrl!}
          alt=""
          className="frivilligkraftCardPhoto"
          onError={() => setBroken(true)}
        />
      ) : (
        <img
          className="frivilligkraftCardLogo"
          src={siteConfig.assets.frivilligkraftCardFallbackLogo}
          alt=""
          width={72}
          height={72}
        />
      )}
    </div>
  );
}
