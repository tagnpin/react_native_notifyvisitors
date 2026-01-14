// src/debug/DebugLogsStore.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DebugLogType } from './DebugLogsTypes';

import { v4 as uuidv4 } from 'uuid';

let sessionId = uuidv4();
let sessionStartedAt = Date.now();

const STORAGE_KEY = 'SDK_DEBUG_LOGS';
const MAX_LOGS = 500;

type Listener = (events: DebugLogType[]) => void;

let logs: DebugLogType[] = [];
let listeners: ((events: DebugLogType[]) => void)[] = [];

const notify = () => {
  listeners.forEach(l => l([...logs]));
};

const persist = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (e) {
    // Silent fail – debug logs should never crash app
  }
};

const loadPersisted = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      logs = JSON.parse(stored);
    }
  } catch {
    logs = [];
  }
};

const DebugLogsStore = {
  async init() {
    sessionId = uuidv4();
    sessionStartedAt = Date.now();
    await loadPersisted();
    notify();
  },

  getSessionInfo() {
    return {
      sessionId,
      startedAt: sessionStartedAt,
      durationMs: Date.now() - sessionStartedAt,
    };
  },

  subscribe(listener: (events: DebugLogType[]) => void) {
    listeners.push(listener);
    listener([...logs]);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  getAll(): DebugLogType[] {
    return [...logs];
  },

  add(event: DebugLogType) {
    logs.unshift(event);

    if (logs.length > MAX_LOGS) {
      logs = logs.slice(0, MAX_LOGS);
    }

    notify();
    persist();
  },

  clear() {
    logs = [];
    notify();
    AsyncStorage.removeItem(STORAGE_KEY);
  },
};

export default DebugLogsStore;
