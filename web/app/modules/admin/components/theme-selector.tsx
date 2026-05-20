"use client";

import { useEffect, useState } from "react";
import { SplitCard } from "./split-card";

type ThemePreset = {
  key: string;
  label: string;
  description: string;
  isActive: boolean;
  colors: {
    background: string;
    surface: string;
    surfaceHover: string;
    border: string;
    foreground: string;
    foregroundMuted: string;
    brandPrimary: string;
    brandSecondary: string;
    brandThird: string;
    brandForeground: string;
  };
};

export default function ThemeSelector() {
  const [themes, setThemes] = useState<ThemePreset[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    fetch(`${apiUrl}/site-themes`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setThemes(data.data.themes);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load themes:", err);
        setLoading(false);
      });
  }, []);

  const handleActivate = async (key: string) => {
    setSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${apiUrl}/site-themes/active`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const result = await res.json();
      
      if (result.success) {
        // Optimistically update the UI to show the new active theme
        setThemes((prev) =>
          prev.map((t) => ({ ...t, isActive: t.key === key }))
        );
        // Reload the window to re-run SSR layout and apply the theme across the site
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to activate theme:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm p-4">Laddar teman...</div>;
  }
  const active = themes.find((t) => t.isActive) || themes[0];

  return (
    <div className="w-full">
      <SplitCard
        leftBasisClassName="basis-3/5"
        rightBasisClassName="basis-2/5"
        left={
          <>
          <h3 className="text-base font-semibold">Färgpalett</h3>
          <p className="text-sm text-foreground-muted">Välj en färgpalett som beskriver er stad och visar er känsla</p>
          </>
        }
        right={
          <div className="relative flex items-center justify-end gap-3 min-w-0 w-full h-full cursor-pointer">
            <div
              className="w-6 h-6 rounded-full shrink-0"
              style={{ backgroundColor: active?.colors?.brandSecondary || "#ccc" }}
            />
            <div className="text-sm text-foreground-muted truncate">{active?.label || "Ingen"}</div>
            <img src="/icons/nav-arrow-right.svg" alt="" className="w-6 h-6 shrink-0" />

            <select
              aria-label="Välj tema"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              value={active?.key || ""}
              onChange={(event) => handleActivate(event.target.value)}
              disabled={saving || themes.length === 0}
            >
              {themes.map((theme) => (
                <option 
                  key={theme.key} 
                  value={theme.key}
                  style={{ 
                    color: theme.colors.foreground,
                  }}
                >
                  {theme.label}
                </option>
              ))}
            </select>
          </div>
        }
      />
    </div>
  );
}