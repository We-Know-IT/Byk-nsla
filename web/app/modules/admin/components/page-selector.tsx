"use client";
import { useEffect, useState } from "react";
import { SplitCard } from "./split-card";
import OnOfButton from "./on-of-button";


export default function PageSelector() {
  return (<div className="space-y-4">
      <SplitCard
       left={
          <>
          <h3 className="text-base font-semibold">Startsida</h3>
          <p className="text-sm text-foreground-muted">om startsidan </p>
          </>
        }
        right={
            <OnOfButton />
        }
      />
    </div>);

};      