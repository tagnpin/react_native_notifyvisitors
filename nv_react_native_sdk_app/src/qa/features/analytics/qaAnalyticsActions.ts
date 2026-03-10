import { Alert } from 'react-native';
import SDKManager from '../../../sdk/SDKManager';
import { FeatureActionProps } from '../../../shared/types/actions';

type QATrackEventPayload = {
  eventName: string;
  attributes?: Record<string, any>;
  ltv?: string;
  scope?: string;
};

type QAUserPropertiesPayload = {
  attributes?: Record<string, any>;
};
type QATrackScreenPayload = {
  screentName: string;
};

const qaTrackEventActions: FeatureActionProps[] = [
  {
    key: 'qaTrackEvents',
    title: 'Track Event',
    description:
      'Tracks a user activity as an analytics event with custom attributes, ltv and scope.',
    actionLabel: 'Track Event',
    showResult: true,
    resultTitle: 'Track Event Result:',
    accordionDefaultExpanded: true,
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
    execute: payload => SDKManager.trackEvent(payload as QATrackEventPayload),
  },

  {
    key: 'qaTrackScreen',
    title: 'Track Screen',
    description: 'Tracks screen_view event with custom screen name',
    actionLabel: 'Track Screen',
    inputParams: {
      screentName: {
        type: 'string',
        required: true,
        placeholder: 'Enter Screen Name',
      },
    },
    showResult: true,
    resultTitle: 'Track Screen Result:',
    execute: payload => SDKManager.trackScreen(payload as QATrackScreenPayload),
  },

  {
    key: 'qaGetNVSessionData',
    title: 'Get NV Session Data',
    description: 'give the current session data',
    actionLabel: 'Get NV Session Data',
    showResult: true,
    resultTitle: 'Get NV-Session Data Result:',
    execute: () => SDKManager.getSessionData(),
  },
];
const qaUserPropertyActions: FeatureActionProps[] = [
  {
    key: 'qaGetNVUID',
    title: 'Get NV-UID',
    description: 'give the current value og nv-uid',
    actionLabel: 'Get NV-UID',
    showResult: true,
    resultTitle: 'Get NV-UID Result:',
    execute: () => SDKManager.getNVUID(),
  },
  {
    key: 'qaSetupUser',
    title: 'Setup User Profile',
    description: 'create your user profile',
    actionLabel: 'Track User',
    showResult: true,
    resultTitle: 'Set Custom User Details Result:',
    accordionDefaultExpanded: true,
    inputParams: {
      userID: {
        type: 'string',
        required: false,
        placeholder: 'Enter User ID (required for OLD Method)',
      },
      userParams: {
        type: 'json',
        placeholder:
          '{"username": "john_doe", "email": "john.doe@example.com", "mobile": "9889XXXXXX", "age": 25, "premium_user": true}',
        inputType: 'textarea',
        required: false,
      },
    },
    actionButtons: [
      {
        label: 'Track User (New Method)',
        execute: async payload => {
          const { userID, userParams } = payload as {
            userID?: string;
            userParams?: QAUserPropertiesPayload;
          };
          const finalUserParams = userParams as QAUserPropertiesPayload;
          // For new method, userParams is mandatory and should be a non-empty json
          if (!finalUserParams || Object.keys(finalUserParams).length === 0) {
            Alert.alert(
              'For the new method, userParams is required and must be a non-empty JSON',
            );
            return;
          }
          // For new method, userID is optional but if non empty string is provided, it should be added to userParams with key userID. If userID is empty string ignore it and proceed with other userParams and don't ahow error alert. if userID is provided but is not a valid string, show an alert that userID must be a non-empty string.
          // Handle userID rules
          if (userID !== undefined) {
            if (typeof userID !== 'string') {
              Alert.alert('userID must be a non-empty string if provided');
              return;
            }

            if (userID.trim().length > 0) {
              finalUserParams.userID = userID;
            }
            // empty string → ignore (no alert)
          }
          console.log(
            'Track User - New Method',
            JSON.stringify(finalUserParams),
          );
          const result = await SDKManager.setUserDetails(finalUserParams);
          return result;
        },
      },
      {
        label: 'Track User (Old Method)',
        variant: 'secondary',
        execute: payload => {
          const { userID, userParams } = payload as {
            userID?: string;
            userParams?: QAUserPropertiesPayload;
          };
          const finalUserParams = userParams as QAUserPropertiesPayload;

          // Validate userID for old method
          if (typeof userID !== 'string' || !userID.trim()) {
            Alert.alert(
              'userID is required for the old method and must be a non-empty string',
            );
            // throw new Error('userID is required for the old method and must be a non-empty string');
            return;
          }
          // For old method, userID is mandatory and should be a non-empty string
          // For new method, userID is optional
          // You can choose to ignore userID in the new method or handle it as needed
          // Here, we are just logging the payload for demonstration
          // userID (required)
          const payloadToSend: {
            userID: string;
            userParams?: Record<string, any>;
          } = {
            userID: userID.trim(),
            userParams: finalUserParams ?? {},
          };
          console.log('Track User - Old Method', payloadToSend);
          SDKManager.setOldUserIdentifier(payloadToSend);
        },
      },
    ],
  },
];

export { qaTrackEventActions, qaUserPropertyActions };
