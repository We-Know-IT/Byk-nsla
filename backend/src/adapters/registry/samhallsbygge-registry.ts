import type { SamhallsbyggeAdapter } from "../contracts/samhallsbygge-adapter.js";
import { LundSamhallsbyggeAdapter } from "../providers/lund-samhallsbygge-adapter.js";

export const getSamhallsbyggeAdapter = (): SamhallsbyggeAdapter => {
  return new LundSamhallsbyggeAdapter();
};
