export type MapAdapterInitOptions = {
  container: HTMLDivElement;
};

export interface MapAdapter {
  isAvailable(): boolean;
  mount(options: MapAdapterInitOptions): void;
  unmount(): void;
}
