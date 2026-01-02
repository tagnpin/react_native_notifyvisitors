// import { InputParameter, InputType } from '../../../shared/types/InputTypes';
import SDKManager from '../../../sdk/SDKManager';
import InAppMessageIcon from '../../../shared/components/icons/InAppMessageIcon';
import { FeatureActionProps } from '../../../shared/types/actions';
// import { NVActionProps } from '../../../shared/utils/types';

export const inAppMessageActions: FeatureActionProps[] = [
  {
    key: 'showInAppWalkthrough',
    title: 'Show InApp Walkthrough',
    description: 'Show InApp Walkthrough',
    actionLabel: 'Show InApp Walkthrough',
    params: {
      userToken: {},
      customRule: {},
    },
    platform: 'android',
    execute: payload => SDKManager.showInAppWalkthrough(payload),
  },
  {
    key: 'showAlert',
    title: 'Show Alert',
    description: 'Show Alert Message Popup',
    actionLabel: 'Show Alert',
    params: {
      userToken: {},
      customRule: {},
    },
    execute: payload => SDKManager.showAlert(payload),
  },

  {
    key: 'showConfirmationDialog',
    title: 'Show Confirmation Dialog',
    description: 'Show Confirmation Dialog Message Popup',
    actionLabel: 'Show Confirmation Dialog',
    params: {
      userToken: {},
      customRule: {},
    },
    execute: payload => SDKManager.showConfirmationDialog(payload),
  },

  {
    key: 'showPopup',
    title: 'Show Popup',
    description: 'Show Modal inApp Message Popup',
    actionLabel: 'Show Popup',
    icon: () => <InAppMessageIcon size={22} />,
    iconPosition: 'right',
    params: {
      userToken: {},
      customRule: {},
    },
    execute: payload => SDKManager.showPopup(payload),
  },

  {
    key: 'showFullPopup',
    title: 'Show Full Popup',
    description: 'Show Full Screen inApp Message Popup',
    actionLabel: 'Show Full Popup',
    params: {
      userToken: {},
      customRule: {},
    },
    execute: payload => SDKManager.showFullPopup(payload),
  },

  {
    key: 'showStickyBar',
    title: 'Show Sticky Bar',
    description: 'Show Sticky Bar inApp Message Popup',
    actionLabel: 'Show Sticky Bar',
    params: {
      userToken: {},
      customRule: {},
    },
    execute: payload => SDKManager.showStickyBar(payload),
  },

  {
    key: 'showSurvey',
    title: 'Show Survey',
    description: 'Show Modal Survey',
    actionLabel: 'Show Survey',
    params: {
      userToken: {},
      customRule: {},
    },
    execute: payload => SDKManager.showSurvey(payload),
  },

  {
    key: 'showNPSSurvey',
    title: 'Show Star Rating / NPS Survey',
    description: 'Show Star Rating / NPS inAPP Survey',
    actionLabel: 'how Star Rating / NPS Survey',
    params: {
      userToken: {},
      customRule: {},
    },
    execute: payload => SDKManager.showNPSSurvey(payload),
  },
];
