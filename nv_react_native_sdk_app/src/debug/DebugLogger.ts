// src/debug/DebugLogger.ts
import DebugLogsStore from './DebugLogsStore';
import { DebugLogType, DebugLogsTypes } from './DebugLogsTypes';

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

class DebugLogger {
  log(type: DebugLogsTypes, source: string, payload: any, success?: boolean) {
    const event: DebugLogType = {
      id: createId(),
      timestamp: Date.now(),
      type,
      source,
      payload,
      success,
    };

    DebugLogsStore.add(event);
  }

  clear() {
    DebugLogsStore.clear();
  }
}

export default new DebugLogger();
