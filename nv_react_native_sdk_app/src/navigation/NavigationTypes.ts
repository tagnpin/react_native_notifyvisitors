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

  ClientFeatureAction: {
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

  QAFeatureAction: {
    featureKey: string;
    title?: string;
  };

  InputPlayground: undefined;

  DebugLogs: undefined;

  DebugLogDetail: {
    eventId: string;
  };

  DeviceInfo: undefined;

  QATools: undefined;

  QALinkLanding: {
    page: 'about-us' | 'contact-us';
    source: 'manual' | 'push_or_deeplink';
    title?: string;
    linkInfoJSON?: string;
  };
};
