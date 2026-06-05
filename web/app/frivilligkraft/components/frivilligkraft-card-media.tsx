/* eslint-disable @next/next/no-img-element -- External mission images require plain img with onError fallback */
"use client";

import { useState } from "react";

type FrivilligkraftCardMediaProps = {
  imageUrl: string | null;
  organization: string | null;
};

const getOrganizationLabel = (organization: string | null): string => {
  const trimmed = organization?.trim();
  if (!trimmed) {
    return "Frivilligkraft";
  }

  return trimmed;
};

export default function FrivilligkraftCardMedia({
  imageUrl,
  organization,
}: FrivilligkraftCardMediaProps) {
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(imageUrl) && !broken;

  return (
    <div
      className="flex h-20 w-full items-center justify-between gap-3 rounded-lg border border-border bg-gradient-to-br from-brand-third/40 via-brand-foreground to-surface px-3"
      aria-label="Organisation"
    >
      <span className="line-clamp-2 rounded-md border border-border/70 bg-surface/90 px-2.5 py-1.5 text-sm font-semibold leading-snug text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
        {getOrganizationLabel(organization)}
      </span>

      {showImage ? (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/70 bg-surface/90 p-1">
          <img
            src={imageUrl ?? ""}
            alt=""
            className="h-full w-full object-contain"
            onError={() => setBroken(true)}
          />
        </div>
      ) : null}
    </div>
  );
}
