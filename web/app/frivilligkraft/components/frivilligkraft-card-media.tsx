/* eslint-disable @next/next/no-img-element -- Remote Lund URLs plus client-side onError fallback */
"use client";

import { useState } from "react";
import { siteConfig } from "../../shared/config/site.config";
import { CardMedia } from "../../shared/ui/card";

type FrivilligkraftCardMediaProps = {
  imageUrl: string | null;
};

export default function FrivilligkraftCardMedia({ imageUrl }: FrivilligkraftCardMediaProps) {
  const [broken, setBroken] = useState(false);
  const showPhoto = Boolean(imageUrl) && !broken;

  return (
    <>
      <CardMedia
        src={showPhoto ? imageUrl : null}
        className="w-2/5 border-r border-border"
        fallback={
          <img
            src={siteConfig.assets.frivilligkraftCardFallbackLogo}
            alt=""
            width={72}
            height={72}
            className="opacity-50"
          />
        }
      />
      {showPhoto && (
        <img
          src={imageUrl!}
          alt=""
          className="hidden"
          onError={() => setBroken(true)}
        />
      )}
    </>
  );
}
