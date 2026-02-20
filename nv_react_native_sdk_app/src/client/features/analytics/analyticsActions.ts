// src/client/features/analytics/analyticsActions.ts

import { Alert } from 'react-native';
import SDKManager from '../../../sdk/SDKManager';
import { FeatureActionProps } from '../../../shared/types/actions';

type TrackEventPayload = {
  eventName: string;
  attributes?: Record<string, any>;
  ltv?: string;
  scope?: string;
};

type userParasPayload = {
  attributes?: Record<string, any>;
};

const trackEventActions: FeatureActionProps[] = [
  {
    key: 'trackEvent',
    title: 'Track Event',
    description: 'Tracks a custom analytics event',

    params: {
      eventName: 'test_rn_first_event_ios',
      attributes: {
        testStr: 'TestValue',
        testNum: 5,
        testBool: true,
        testArr: ['a', 'b', 4],
        testObj: { testObjKey1: 'testObjVal1' },
      },
      ltv: '10',
      scope: '1',
    },

    actionLabel: 'Track Event',
    showResult: true,
    resultTitle: 'Track Event Result:',

    execute: payload => SDKManager.trackEvent(payload as TrackEventPayload),
  },

  {
    key: 'trackScreen',
    title: 'Track Screen',
    description: 'Tracks screen_view event with custom screen name',
    actionLabel: 'Track Screen',
    params: {
      screentName: 'nv_rn_clientHomeScreen',
    },
    showResult: true,
    resultTitle: 'Track Screen Result:',
    execute: payload => SDKManager.trackScreen(payload as any),
  },

  {
    key: 'trackCustomEvents',
    title: 'Track Custom Event',
    description: 'Goto custom EventTracking Screen',
    actionLabel: 'Track Custom Event',
    showResult: true,
    resultTitle: 'Track Custom Event Result:',
  },
];

const userPropertyActions: FeatureActionProps[] = [
  {
    key: 'setUserDetails',
    title: 'Set User Details',
    description: 'creates a Known User Profile in the panel',
    actionLabel: 'Set User Details',
    params: {
      name: 'john',
      email: 'john.a@notifyvisitors.com',
      number: '98987XXXXX',
      user_score: '340',
      plan_type: 31,
    },
    showResult: true,
    resultTitle: 'Set User Details Result:',
    execute: payload => SDKManager.setUserDetails(payload),
  },

  {
    key: 'getNVUID',
    title: 'Get NV-UID',
    description: 'give the current value og nv-uid',
    actionLabel: 'Get NV-UID',
    showResult: true,
    resultTitle: 'Get NV-UID Result:',
    execute: () => SDKManager.getNVUID(),
  },
  {
    key: 'trackCustomUser',
    title: 'Set Your Custom User',
    description: 'create your own custom user profile',
    showResult: true,
    resultTitle: 'Set Custom User Details Result:',
    actionLabel: 'Track Custom User',
  },
];

export { trackEventActions, userPropertyActions };
