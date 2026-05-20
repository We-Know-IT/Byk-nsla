"use client";
import { useEffect, useState } from "react";
import { SplitCard } from "./split-card";


export default function StartPageSectionsSelector() {
  const [sections, setSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  return (<div className="space-y-4">
      <h2 className="text-xl font-semibold">Startsidans sektioner</h2>
      <p className="text-sm text-foreground-muted">Välj vilka sektioner som ska visas på startsidan och i vilken ordning.</p>
      
      </div>);

};      