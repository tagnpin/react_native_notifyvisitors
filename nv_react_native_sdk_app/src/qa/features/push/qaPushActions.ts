import SDKManager from '../../../sdk/SDKManager';
import { theme } from '../../../shared/styles/theme';
import { FeatureActionProps } from '../../../shared/types/actions';

type QABadgeHelpers = {
  clearBadge: () => void;
  setBadge: (count: number) => void;
};

const qaPushActions: FeatureActionProps[] = [
  {
    key: 'qaGetNVSubscripionID',
    title: 'Get Push SubscriptionID (Push Token)',
    description:
      'refers to FCM/APNS token recorded as subscriptionID in NVECTA Panel',
    actionLabel: 'Get Push SubscriptionID (Push Token)',
    showResult: true,
    resultTitle: 'Push SubscriptionID (Push Token):',
    execute: async payload => {
      const pushToken = await SDKManager.getPushToken();
      return pushToken;
    },
  },

  {
    key: 'qaSubscribePushCategory',
    title: 'Subscribe to Push Category',
    description:
      'Subscribe to a specific push notification category or Unsubscribe all.',
    actionLabel: 'Subscribe to Push Category',
    showResult: true,
    resultTitle: 'Push Subscribed:',
    inputParams: {
      categories: {
        type: 'array',
        placeholder: '["category_01", "category_02"]',
        inputType: 'textarea',
      },
      unSubscribeAll: {
        type: 'boolean',
        placeholder: 'Unsubscribe from all categories',
        inputType: 'switch',
      },
    },
    execute: async payload => {
      const { categories, unSubscribeAll } = payload as {
        categories?: string[];
        unSubscribeAll?: boolean;
      };
      SDKManager.subscribePushCategory(payload);
    },
  },
];

const qaNotificationCenterActions = (
  badge: QABadgeHelpers,
): FeatureActionProps[] => [
  {
    key: 'qaShowStdNotificationCenter',
    title: 'Show Standard Notification Center',
    description: 'Shows the standard notification center UI',
    actionLabel: 'Show Notification Center',
    onBeforeExecute: () => {
      // ✅ ALWAYS clear badge
      badge.clearBadge();
    },
    execute: payload => SDKManager.showStdNotificationCenter(payload),
  },

  {
    key: 'qaAdvancedNotificationCenter',
    title: 'Show Advanced Notification Center',
    description: 'Shows the advanced notification center UI',
    actionLabel: 'Show Advanced Notification Center',
    showResult: true,
    resultTitle: 'Notification Center Action Result:',
    inputParams: {
      // First Tab Configuration
      name_one: {
        type: 'string',
        inline: true,
        placeholder: '1st Tab Display Title',
        group: 'First Tab Text Config',
      },
      label_one: {
        type: 'string',
        inline: true,
        placeholder: '1st Tab Label',
        group: 'First Tab Text Config',
      },
      // Second Tab Configuration
      name_two: {
        type: 'string',
        inline: true,
        placeholder: '2nd Tab Display Title',
        group: 'Second Tab Text Config',
      },
      label_two: {
        type: 'string',
        inline: true,
        placeholder: '2nd Tab Label',
        group: 'Second Tab Text Config',
      },

      // Third Tab Configuration
      name_three: {
        type: 'string',
        inline: true,
        placeholder: '3rd Tab Display Title',
        group: 'Third Tab Text Config',
      },
      label_three: {
        type: 'string',
        inline: true,
        placeholder: '3rd Tab Label',
        group: 'Third Tab Text Config',
      },

      //Tabs Text Color Configuration
      selectedTabTextColor: {
        type: 'string',
        inline: true,
        placeholder: 'Selected Tab Text Color',
        default: theme.colors.textPrimary,
        group: 'Tabs Text Color Config',
      },
      unselectedTabTextColor: {
        type: 'string',
        inline: true,
        placeholder: 'Unselected Tab Text Color',
        default: theme.colors.textPrimary,
        group: 'Tabs Text Color Config',
      },

      //Tabs Background Color Configuration
      selectedTabBgColor: {
        type: 'string',
        inline: true,
        placeholder: 'Selected Tab Bg Color',
        default: theme.colors.primary,
        group: 'Tabs Background Color Config',
      },
      unselectedTabBgColor_ios: {
        type: 'string',
        inline: true,
        placeholder: 'Unselected Tab Bg Color',
        default: theme.colors.textSecondary,
        group: 'Tabs Background Color Config',
      },
    },
    onBeforeExecute: () => {
      // ✅ ALWAYS clear badge
      badge.clearBadge();
    },
    actionButtons: [
      {
        label: 'Show Advanced Center',
        execute: async payload => {
          const appInboxInfo = payload;
          const finalPayload = {
            appInboxInfo,
            dismissValue: '0',
          };
          console.log('advanced center data: ', JSON.stringify(finalPayload));
          const result = await SDKManager.showAdvancedNotificationCenter(
            finalPayload,
          );
          console.log(
            'result of advanced center data: ',
            JSON.stringify(result),
          );
          return result;
        },
      },
      {
        label: 'Get Unread Center Count',
        variant: 'secondary',
        execute: async payload => {
          const finalPayload = {
            appInboxInfo: payload,
          };
          console.log('get unread count data: ', JSON.stringify(finalPayload));
          const unreadCountData =
            await SDKManager.getNotificationCenterUnreadCount(finalPayload);
          const parsed = JSON.parse(unreadCountData as string);
          console.log('result of unread count data: ', JSON.stringify(parsed));
          return parsed;
        },
      },
    ],
    onAfterExecute: result => {
      // Update badge only when unread-count response includes totalCount.
      if (
        !result ||
        !Object.prototype.hasOwnProperty.call(result, 'totalCount')
      ) {
        return;
      }
      const total = Number(result.totalCount);
      badge.setBadge(Number.isFinite(total) ? total : 0);
    },
  },
];

export { qaPushActions, qaNotificationCenterActions };
