export type ModuleKey =
  | "start"
  | "event"
  | "frivilligkraft"
  | "samhallsbygge"
  | "utforska"
  | "trafik"
  | "vader";

export type ModuleConfig = {
  key: ModuleKey;
  label: string;
  href: string;
  enabled: boolean;
};

export type ModuleNavItem = Pick<ModuleConfig, "key" | "label" | "href">;

export const moduleConfigs: ModuleConfig[] = [
  { key: "start", label: "Start", href: "/", enabled: true },
  { key: "event", label: "Event", href: "/event", enabled: true },
  { key: "frivilligkraft", label: "Frivilligkraft", href: "/frivilligkraft", enabled: true },
  { key: "samhallsbygge", label: "Samhällsbygge", href: "/samhallsbygge", enabled: true },
  { key: "utforska", label: "Utforska", href: "/utforska", enabled: true },
  { key: "trafik", label: "Trafik", href: "/trafik", enabled: true },
  { key: "vader", label: "Väder", href: "/vader", enabled: true },
];

export function getEnabledModuleNavItems(): ModuleNavItem[] {
  return moduleConfigs
    .filter((module) => module.enabled)
    .map(({ key, label, href }) => ({ key, label, href }));
}
