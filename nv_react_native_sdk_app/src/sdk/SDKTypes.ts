export type DeviceInfo = {
  platform: 'ios' | 'android';
  osVersion: string;
  deviceId: string;

  appVersion: string;
  buildNumber: string;
  sdkVersion: string;
  environment: 'debug' | 'release';

  pushToken?: string;
};
