import SDKManager from '../../../sdk/SDKManager';
import { FeatureActionProps } from '../../../shared/types/actions';

const inAppResultTitle = 'show InApp Message Result:';
export const inAppMessageActions: FeatureActionProps[] = [
  {
    key: 'showInAppWalkthrough',
    title: 'Show InApp Walkthrough',
    description: 'Show InApp Walkthrough',
    actionLabel: 'Show InApp Walkthrough',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('walkthrough'),
  },

  {
    key: 'showAlert',
    title: 'Show Alert',
    description: 'Show Alert Message Popup',
    actionLabel: 'Show Alert',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('alert'),
  },

  {
    key: 'showConfirmationDialog',
    title: 'Show Confirmation Dialog',
    description: 'Show Confirmation Dialog Message Popup',
    actionLabel: 'Show Confirmation Dialog',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('confirmation'),
  },

  {
    key: 'showPopup',
    title: 'Show Popup',
    description: 'Show Modal inApp Message Popup',
    actionLabel: 'Show Popup',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('modalpopup'),
  },

  {
    key: 'showFullPopup',
    title: 'Show Full Popup',
    description: 'Show Full Screen inApp Message Popup',
    actionLabel: 'Show Full Popup',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('fullpopup'),
  },

  {
    key: 'showStickyBar',
    title: 'Show Sticky Bar',
    description: 'Show Sticky Bar inApp Message Popup',
    actionLabel: 'Show Sticky Bar',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('stickybar'),
  },

  {
    key: 'showSurvey',
    title: 'Show Survey',
    description: 'Show Modal Survey',
    actionLabel: 'Show Survey',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('modalsurvey'),
  },

  {
    key: 'showFullSurvey',
    title: 'Show Full Screen Survey',
    description: 'Show Full Screen Survey',
    actionLabel: 'Show Full Screen Survey',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('fullsurvey'),
  },

  {
    key: 'showNPSSurvey',
    title: 'Show Star Rating / NPS Survey',
    description: 'Show Star Rating / NPS inAPP Survey',
    actionLabel: 'show Star Rating / NPS Survey',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('rating_nps_survey'),
  },

  {
    key: 'showSpinWheel',
    title: 'show Spin the Wheel',
    description: 'show Spin the Wheel',
    actionLabel: 'show Spin the Wheel',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('spin_wheel'),
  },

  {
    key: 'showScratchCard',
    title: 'Show Scratch Card',
    description: 'Show Scratch Card',
    actionLabel: 'Show Scratch Card',
    showResult: true,
    resultTitle: inAppResultTitle,
    execute: () => SDKManager.nvShowInAppMessages('scratch_card'),
  },

  {
    key: 'showNudges',
    title: 'Show Nudge Banner (if Available)',
    description: 'Show Nudge Banner (if Available)',
    actionLabel: 'Show Nudge Banner (if Available)',
    execute: () => SDKManager.nvShowInAppMessages('nudges'),
  },
];
