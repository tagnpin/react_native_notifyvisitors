// src/client/features/analytics/analyticsActions.ts

import SDKManager from '../../../sdk/SDKManager';
import { FeatureActionProps } from '../../../shared/types/actions';
import { CURRENT_PLATFORM } from '../../../shared/utils/platform';

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
      eventName: `test_rn_first_event_${CURRENT_PLATFORM}`,
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

    execute: async payload => {
      const result = await SDKManager.trackEvent(payload as TrackEventPayload);
      return result;
    },
  },

  {
    key: 'trackScreen',
    title: 'Track Screen',
    description: 'Tracks screen_view event with custom screen name',
    actionLabel: 'Track Screen',
    params: {
      screentName: `nv_rn_clientHomeScreen_${CURRENT_PLATFORM}`,
    },
    showResult: true,
    resultTitle: 'Track Screen Result:',
    execute: payload => SDKManager.trackScreen(payload as any),
  },

  {
    key: 'getNVSessionData',
    title: 'Get NV Session Data',
    description: 'give the current session data',
    actionLabel: 'Get NV Session Data',
    showResult: true,
    resultTitle: 'Get NV-Session Data Result:',
    execute: () => SDKManager.getSessionData(),
  },
  {
    key: 'trackCustomEvents',
    title: 'Track Custom Event',
    description: 'Goto custom EventTracking Screen',
    actionLabel: 'Track Custom Event',
    showResult: true,
    resultTitle: 'Track Custom Event Result:',
    inputParams: {
      eventName: {
        type: 'string',
        required: true,
        placeholder: 'Enter Event Name',
      },
      attributes: {
        type: 'json',
        placeholder: '{"key":"value"}',
        inputType: 'textarea',
      },

      ltv: {
        type: 'string',
        inline: true,
        placeholder: 'Enter LTV',
      },
      scope: {
        type: 'number',
        required: true,
        inline: true,
        placeholder: 'Enter Scope',
      },
    },
    execute: payload => SDKManager.trackEvent(payload as TrackEventPayload),
    // execute: async payload => {
    //   console.log('new2 Custom Event Payload:', payload);
    //   const result = await SDKManager.trackEvent(payload as TrackEventPayload);
    //   return result;
    // },

    //SDKManager.trackEvent(payload as TrackEventPayload),
  },
];

const userPropertyActions: FeatureActionProps[] = [
  {
    key: 'setUserDetails',
    title: 'Set User Details',
    description: 'creates a Known User Profile in the panel',
    actionLabel: 'Set User Details',
    params: {
      name: 'Customer Name',
      email: 'customer.email@notifyvisitors.com',
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
    actionLabel: 'Track Custom User',
    showResult: true,
    resultTitle: 'Set Custom User Details Result:',
    inputParams: {
      userParams: {
        type: 'json',
        placeholder:
          '{"username": "john_doe", "email": "john.doe@example.com", "mobile": "9889XXXXXX", "age": 25, "premium_user": true}',
        inputType: 'textarea',
        required: true,
      },
    },
    execute: payload => SDKManager.setUserDetails(payload as userParasPayload),
  },
];

export { trackEventActions, userPropertyActions };
/*

actionButtons: [
      {
        label: 'Track Event',
        execute: payload => {
          console.log('Track Event', payload);
        },
      },
      {
        label: 'Track & Flush',
        variant: 'secondary',
        execute: payload => {
          console.log('Track + Flush', payload);
        },
      },
      {
        label: 'Track Test Event',
        variant: 'danger',
        execute: payload => {
          console.log('Track Test Event', payload);
        },
      },
    ],
    */
