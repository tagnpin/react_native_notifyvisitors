// src/navigation/NavigationTypes.ts

/**
 * Root-level navigation
 * This decides WHICH navigator is active,
 * not WHO can access it.
 */
export type RootStackParamList = {
  Client: undefined;
  QA: undefined;
};

/**
 * Client Reference navigation
 * Safe for clients to read & copy.
 */
export type ClientStackParamList = {
  ClientHome: undefined;

  FeatureGroup: {
    featureKey: string;
    title?: string;
  };
};

/**
 * QA Tools navigation
 * Power-user & internal testing flow.
 */
export type QAStackParamList = {
  QAHome: undefined;

  FeatureList: {
    featureKey: string;
    title?: string;
  };

  ActionDetail: {
    featureKey: string;
    actionKey: string;
    title?: string;
  };

  InputPlayground: undefined;

  DebugLogs: undefined;

  DebugLogDetail: {
    eventId: string;
  };

  DeviceInfo: undefined;

  QATools: undefined;
};
