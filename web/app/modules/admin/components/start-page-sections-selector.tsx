"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { SplitCard } from "./split-card";
import OnOfButton from "./on-of-button";
import { useSettings } from "./settings-context";

export default function StartPageSectionsSelector() {
  const [activeSections, setActiveSections] = useState<Record<string, boolean>>({ justNu: true });
  const { registerSaveAction, unregisterSaveAction, registerResetAction, unregisterResetAction, setHasChanges } = useSettings();
  const originalSectionsRef = useRef<Record<string, boolean>>({ justNu: true });

  const handleSave = useCallback(async () => {
    originalSectionsRef.current = { ...activeSections };
    setHasChanges("startPage", false);
  }, [activeSections, setHasChanges]);

  const handleReset = useCallback(() => {
    setActiveSections({ ...originalSectionsRef.current });
    setHasChanges("startPage", false);
  }, [setHasChanges]);

  useEffect(() => {
    registerSaveAction("startPage", handleSave);
    registerResetAction("startPage", handleReset);
    return () => {
      unregisterSaveAction("startPage");
      unregisterResetAction("startPage");
    };
  }, [handleReset, registerResetAction, registerSaveAction, unregisterResetAction, unregisterSaveAction, handleSave]);

  const handleToggle = (key: string, currentValue: boolean) => {
    setActiveSections((prev) => ({ ...prev, [key]: !currentValue }));
    setHasChanges("startPage", true);
  };

  return (
    <div className="space-y-4">
      <SplitCard
       left={
          <>
          <h3 className="text-base font-semibold">Just nu</h3>
          <p className="text-sm text-foreground-muted">Visas högst upp på startsidan.</p>
          </>
        }
        right={
          <OnOfButton 
            checked={activeSections.justNu} 
            onChange={() => handleToggle("justNu", activeSections.justNu)} 
          />
        }
      />
    </div>
  );
}      