import { NativeModules } from 'react-native';

const { NVSDKConfig } = NativeModules;

export const getNVBrandID = async (): Promise<string> => {
  return NVSDKConfig.getNVBrandID();
};
