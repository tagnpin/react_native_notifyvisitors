// src/config/QAGateConfig.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const QA_PIN = '2580';

const QA_FLAG_KEY = 'SDK_QA_ENABLED_AT';
const QA_SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours

let qaEnabledCache: boolean | null = null;
let lastExpiryReason: 'expired' | 'manual' | null = null;

const IS_RELEASE = !__DEV__ && Platform.OS !== 'web';

type Listener = (enabled: boolean) => void;

let listeners: Listener[] = [];

const notify = (enabled: boolean) => {
  listeners.forEach(l => l(enabled));
};

export const isQAAllowed = (): boolean => {
  return !IS_RELEASE;
};

/**
 * Load QA gate at app startup
 */
export const loadQAGate = async (): Promise<boolean> => {
  if (!isQAAllowed()) {
    qaEnabledCache = false;
    return false;
  }

  const stored = await AsyncStorage.getItem(QA_FLAG_KEY);

  if (!stored) {
    qaEnabledCache = false;
    return false;
  }

  const enabledAt = Number(stored);
  const now = Date.now();

  if (now - enabledAt > QA_SESSION_DURATION_MS) {
    // Auto-expire
    await disableQA('expired');
    qaEnabledCache = false;
    return false;
  }

  qaEnabledCache = true;
  return true;
};

export const isQAEnabled = (): boolean => {
  return qaEnabledCache === true;
};

/**
 * Enable QA mode (store timestamp)
 */
export const enableQA = async () => {
  if (!isQAAllowed()) return;

  qaEnabledCache = true;
  await AsyncStorage.setItem(QA_FLAG_KEY, String(Date.now()));
  notify(true);
};

export const getLastQAExpiryReason = () => lastExpiryReason;
/**
 * Disable QA mode manually
 */
// export const disableQA = async (): Promise<void> => {
//   qaEnabledCache = false;
//   await AsyncStorage.removeItem(QA_FLAG_KEY);
// };
export const disableQA = async (reason: 'expired' | 'manual' = 'manual') => {
  qaEnabledCache = false;
  lastExpiryReason = reason;
  await AsyncStorage.removeItem(QA_FLAG_KEY);
  notify(false);
};

export const subscribeQAGate = (listener: Listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};
