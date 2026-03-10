import SDKManager from '../../../sdk/SDKManager';
import { FeatureActionProps } from '../../../shared/types/actions';

const qaInAppMessageActions: FeatureActionProps[] = [
  {
    key: 'qaShowInAppMessage',
    title: 'Show In-App Banner/Survey',
    description: 'Displays the in-app banner or survey to the user. ',
    actionLabel: 'Show In-App Banner/Survey',
    showResult: true,
    resultTitle: 'In-App Message Result:',
    accordionDefaultExpanded: true,
    inputParams: {
      userToken: {
        type: 'json',
        placeholder: '{"key":"value"}',
        inputType: 'textarea',
      },
      customRules: {
        type: 'json',
        placeholder: '{"key":"value"}',
        inputType: 'textarea',
      },
    },
    execute: payload => {
      const { userToken, customRules } = payload;
      return SDKManager.nvSDKShowInAppBanner(userToken, customRules, null).then(
        (response: any) => {
          return response;
        },
      );
    },
  },
];

export { qaInAppMessageActions };
