import type { FrivilligkraftAdapter } from "../contracts/frivilligkraft-adapter.js";
import { LiveFrivilligkraftAdapter } from "../providers/live-frivilligkraft-adapter.js";

export const getFrivilligkraftAdapter = (): FrivilligkraftAdapter => {
  return new LiveFrivilligkraftAdapter();
};
