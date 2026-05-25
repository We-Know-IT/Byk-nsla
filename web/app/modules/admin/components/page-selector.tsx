"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { SplitCard } from "./split-card";
import OnOfButton from "./on-of-button";
import { siteNavigation } from "../../../shared/config/site.config";
import { useSettings } from "./settings-context";
import { getSiteNavigationApiBaseUrl, getSiteNavigationPageMap } from "../../../shared/config/site-navigation-api";

export default function PageSelector() {
  const [activePages, setActivePages] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const { registerSaveAction, unregisterSaveAction, registerResetAction, unregisterResetAction, setHasChanges } = useSettings();
  const originalPagesRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const apiUrl = getSiteNavigationApiBaseUrl();
    const loadPages = async () => {
      try {
        const res = await fetch(`${apiUrl}/site-navigation`);
        const data = await res.json();
        if (data.success && data.data && data.data.pages) {
          const pages = getSiteNavigationPageMap(data.data.pages);
          setActivePages(pages);
          originalPagesRef.current = pages;
        } else {
          const defaults = getSiteNavigationPageMap();
          setActivePages(defaults);
          originalPagesRef.current = defaults;
        }
      } catch (err) {
        console.error("Failed to load navigation configuration:", err);
        const defaults = getSiteNavigationPageMap();
        setActivePages(defaults);
        originalPagesRef.current = defaults;
      } finally {
        setLoading(false);
      }
    };

    void loadPages();
  }, []);

  const handleSave = useCallback(async () => {
    const apiUrl = getSiteNavigationApiBaseUrl();
    const res = await fetch(`${apiUrl}/site-navigation`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages: getSiteNavigationPageMap(activePages) }),
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error?.message || "Failed to save pages");
    }
    originalPagesRef.current = { ...activePages };
    setHasChanges("pages", false);
  }, [activePages, setHasChanges]);

  const handleReset = useCallback(() => {
    setActivePages({ ...originalPagesRef.current });
    setHasChanges("pages", false);
  }, [setHasChanges]);

  useEffect(() => {
    registerSaveAction("pages", handleSave);
    registerResetAction("pages", handleReset);
    return () => {
      unregisterSaveAction("pages");
      unregisterResetAction("pages");
    };
  }, [handleReset, registerResetAction, registerSaveAction, unregisterResetAction, unregisterSaveAction, handleSave]);

  const handleToggle = (key: string, currentValue: boolean) => {
    setActivePages((prev) => ({ ...prev, [key]: !currentValue }));
    setHasChanges("pages", true);
  };

  if (loading) {
    return <div className="text-sm p-4">Laddar sidor...</div>;
  }

  return (
    <div className="space-y-4">
      {siteNavigation.map((page) => {
        const isEnabled = activePages[page.key] ?? page.enabled;
        return (
          <SplitCard
            key={page.key}
            leftBasisClassName="basis-4/5"
            rightBasisClassName="basis-1/5"
            left={
              <>
                <h3 className="text-base font-semibold">{page.label}</h3>
                <p className="text-sm text-foreground-muted">Visa sida: {page.label}</p>
              </>
            }
            right={
              <OnOfButton
                checked={isEnabled}
                onChange={() => handleToggle(page.key, isEnabled)}
              />
            }
          />
        );
      })}
    </div>
  );
}      