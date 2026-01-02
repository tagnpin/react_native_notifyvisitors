// src/shared/utils/platformActionFilter.ts

import { Platform } from 'react-native';
import { FeatureActionProps } from '../types/actions';

export const filterActionsByPlatform = (
  actions: FeatureActionProps[],
): FeatureActionProps[] => {
  const os = Platform.OS; // 'ios' | 'android'

  return actions.filter(action => {
    // explicit hide
    if (action.hiddenOn?.includes(os)) return false;

    // platform constraint
    if (!action.platform || action.platform === 'all') return true;

    return action.platform === os;
  });
};
