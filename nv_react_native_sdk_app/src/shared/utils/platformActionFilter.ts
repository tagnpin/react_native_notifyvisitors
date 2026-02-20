// src/shared/utils/platformActionFilter.ts

import { FeatureActionProps } from '../types/actions';
import { CURRENT_PLATFORM } from './platform';

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
