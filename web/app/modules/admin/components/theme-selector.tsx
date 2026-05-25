"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { SplitCard } from "./split-card";
import { useSettings } from "./settings-context";

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
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const originalKeyRef = useRef<string | null>(null);
  const { registerSaveAction, unregisterSaveAction, registerResetAction, unregisterResetAction, setHasChanges } = useSettings();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    fetch(`${apiUrl}/site-themes`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setThemes(data.data.themes);
          const activeItem = data.data.themes.find((t: ThemePreset) => t.isActive);
          const key = activeItem ? activeItem.key : (data.data.themes[0]?.key || null);
          originalKeyRef.current = key;
          setSelectedKey(key);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load themes:", err);
        setLoading(false);
      });
  }, []);

  const handleSave = useCallback(async () => {
    if (!selectedKey || selectedKey === originalKeyRef.current) return;
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/site-themes/active`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: selectedKey }),
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error?.message || "Failed to save theme");
    }
    originalKeyRef.current = selectedKey;
    setHasChanges("theme", false);
  }, [selectedKey, setHasChanges]);

  const handleReset = useCallback(() => {
    setSelectedKey(originalKeyRef.current);
    setHasChanges("theme", false);
  }, [setHasChanges]);

  useEffect(() => {
    registerSaveAction("theme", handleSave);
    registerResetAction("theme", handleReset);
    return () => {
      unregisterSaveAction("theme");
      unregisterResetAction("theme");
    };
  }, [handleReset, registerResetAction, registerSaveAction, unregisterResetAction, unregisterSaveAction, handleSave]);

  const handleChange = (key: string) => {
    setSelectedKey(key);
    setHasChanges("theme", true);
  };

  if (loading) {
    return <div className="text-sm p-4">Laddar teman...</div>;
  }
  
  const active = themes.find((t) => t.key === selectedKey) || themes[0];

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
              onChange={(event) => handleChange(event.target.value)}
              disabled={themes.length === 0}
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