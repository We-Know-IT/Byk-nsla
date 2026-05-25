"use client";
import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import { Button } from "../../../shared/ui/button";

type SettingsContextType = {
  registerSaveAction: (id: string, action: () => Promise<void>) => void;
  unregisterSaveAction: (id: string) => void;
  registerResetAction: (id: string, action: () => void) => void;
  unregisterResetAction: (id: string) => void;
  setHasChanges: (id: string, changed: boolean) => void;
  hasAnyChanges: boolean;
  isSaving: boolean;
  handleSaveAll: () => Promise<void>;
  handleCancelAll: () => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
};

export const SettingsActionsBar = () => {
  const { hasAnyChanges, isSaving, handleSaveAll, handleCancelAll } = useSettings();

  return (
    <div className="flex w-fit flex-row flex-wrap items-center justify-end gap-3">
      {hasAnyChanges ? (
        <Button
          onClick={handleCancelAll}
          disabled={isSaving}
          size="default"
          variant="outline"
          className="rounded-full!"
        >
          Avbryt
        </Button>
      ) : null}
      <Button
        onClick={handleSaveAll}
        disabled={isSaving || !hasAnyChanges}
        size="default"
        variant="round"
      >
        {isSaving ? "Sparar..." : "Spara ändringar"}
      </Button>
    </div>
  );
};

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const saveActions = useRef<Map<string, () => Promise<void>>>(new Map());
  const resetActions = useRef<Map<string, () => void>>(new Map());
  const [changesMap, setChangesMap] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);

  const registerSaveAction = useCallback((id: string, action: () => Promise<void>) => {
    saveActions.current.set(id, action);
  }, []);

  const unregisterSaveAction = useCallback((id: string) => {
    saveActions.current.delete(id);
  }, []);

  const registerResetAction = useCallback((id: string, action: () => void) => {
    resetActions.current.set(id, action);
  }, []);

  const unregisterResetAction = useCallback((id: string) => {
    resetActions.current.delete(id);
  }, []);

  const setHasChanges = useCallback((id: string, changed: boolean) => {
    setChangesMap((prev) => {
      if (prev[id] === changed) return prev;
      return { ...prev, [id]: changed };
    });
  }, []);

  const hasAnyChanges = Object.values(changesMap).some(Boolean);

  const handleSaveAll = useCallback(async () => {
    setIsSaving(true);
    try {
      const promises = Array.from(saveActions.current.values()).map((action) => action());
      await Promise.all(promises);
      setChangesMap({});
      window.location.reload();
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const handleCancelAll = useCallback(() => {
    Array.from(resetActions.current.values()).forEach((action) => action());
    setChangesMap({});
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        registerSaveAction,
        unregisterSaveAction,
        registerResetAction,
        unregisterResetAction,
        setHasChanges,
        hasAnyChanges,
        isSaving,
        handleSaveAll,
        handleCancelAll,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};