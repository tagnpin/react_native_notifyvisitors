// src/sdk/SDKEventBridge.ts

import DebugLogger from '../debug/DebugLogger';

export const emitSDKCallback = (
  source: string,
  payload: any,
  success = true,
) => {
  DebugLogger.log('sdk_callback', source, payload, success);
};

export const emitSDKError = (source: string, error: any) => {
  DebugLogger.log('error', source, error, false);
};
