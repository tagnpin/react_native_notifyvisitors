// src/shared/utils/platformUtils.ts

import { Platform } from 'react-native';
import { FeatureActionProps } from '../types/actions';

export type NativePlatform = 'ios' | 'android';

export const getPlatformName = (): NativePlatform =>
  Platform.OS === 'android' ? 'android' : 'ios';

export const CURRENT_PLATFORM = getPlatformName();

export const isAndroid = (): boolean => CURRENT_PLATFORM === 'android';

export const isIOS = (): boolean => CURRENT_PLATFORM === 'ios';

export const filterActionsByPlatform = (
  actions: FeatureActionProps[],
): FeatureActionProps[] => {
  const os = CURRENT_PLATFORM;

  return actions.filter(action => {
    // explicit hide
    if (action.hiddenOn?.includes(os)) return false;

    // platform constraint
    if (!action.platform || action.platform === 'all') return true;

    return action.platform === os;
  });
};
