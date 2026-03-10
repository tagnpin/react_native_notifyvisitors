// import { InputParameter, InputType } from '../../../shared/types/InputTypes';
import SDKManager from '../../../sdk/SDKManager';
import { FeatureActionProps } from '../../../shared/types/actions';
// import { NVActionProps } from '../../../shared/utils/types';

export const inAppNudgesActions: FeatureActionProps[] = [
  {
    key: 'inAppNudges',
    title: 'Show InApp Nudges',
    description: 'Show InApp Nudges',
    actionLabel: 'Show InApp Nudges',
    params: {},
  },
  {
    key: 'nativeDisplay',
    title: 'Native Display',
    description: 'Show native display inside your parent view',
    actionLabel: 'Native Display',
  },
];
