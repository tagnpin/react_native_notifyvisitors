import { Platform } from 'react-native';

export type NativePlatform = 'ios' | 'android';

export const getPlatformName = (): NativePlatform =>
  Platform.OS === 'android' ? 'android' : 'ios';

export const CURRENT_PLATFORM = getPlatformName();

export const isAndroid = (): boolean => CURRENT_PLATFORM === 'android';

export const isIOS = (): boolean => CURRENT_PLATFORM === 'ios';
