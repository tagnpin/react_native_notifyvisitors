// src/app/AppInitializer.ts
import DebugLogsStore from '../debug/DebugLogsStore';
/**
 * AppInitializer
 *
 * Reserved for:
 * - SDK initialization
 * - Analytics setup
 * - Global listeners
 *
 * Intentionally minimal for now.
 */
export const initializeApp = async (): Promise<void> => {
  // Future: SDKManager.initialize()
  // Future: preload configs
  await DebugLogsStore.init();
  return Promise.resolve();
};
