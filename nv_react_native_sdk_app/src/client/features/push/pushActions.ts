// src/client/features/push/pushActions.ts

import SDKManager from '../../../sdk/SDKManager';
import { theme } from '../../../shared/styles/theme';
import { FeatureActionProps } from '../../../shared/types/actions';

type BadgeHelpers = {
  clearBadge: () => void;
  setBadge: (count: number) => void;
};

const sendPushActions: FeatureActionProps[] = [
  {
    key: 'getNVSubscripionID',
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
    key: 'sendStandardPush',
    title: 'Send Standard Push',
    description: 'Sends a text only push notification to this device',
    actionLabel: 'Send Standard Push',
    params: {
      androidStdPushID: '',
      iOSStdPushNID: '',
    },
    execute: payload => SDKManager.sendStandardPushNotification(payload),
  },
  {
    key: 'sendStdPushWithActionBtns',
    title: 'Send Standard Push with Action Buttons',
    description:
      'Sends a text only push notification with action buttons to this device',
    actionLabel: 'Send Standard Push with Action Buttons',
    params: {
      androidStdPushID: '',
      iOSStdPushNID: '',
    },
    execute: payload => SDKManager.sendStdPushWithActionBtns(payload),
  },
  {
    key: 'sendRichPush',
    title: 'Send Rich Push Notification',
    description:
      'Sends a rich push notification with image and action buttons to this device',
    actionLabel: 'Send Rich Push',
    params: {
      androidRichPushID: '',
      iOSRichPushNID: '',
    },
    execute: payload => SDKManager.sendRichPush(payload),
  },
  {
    key: 'sendAndroidGIFPush',
    title: 'Send GIF Push Notification',
    description:
      'Sends a push notification with multiple images which act as a gif to the device',
    actionLabel: 'Send GIF Push Notification',
    platform: 'android',
    params: {
      androidGIFPushID: '',
    },
    execute: payload => SDKManager.sendAndroidGIFPush(payload),
  },
  {
    key: 'sendAndroidSLiderPush',
    title: 'Send Slider Push Notification',
    description:
      'Sends a push notification with multiple images which act as a slider to the device',
    actionLabel: 'Send Slider Push Notification',
    platform: 'android',
    params: {
      androidSliderPushID: '',
    },
    execute: payload => SDKManager.sendAndroidSLiderPush(payload),
  },

  {
    key: 'sendAndroidCrouselPush',
    title: 'Send Crousel Push Notification',
    description:
      'Sends a push notification with multiple images which act as a crousel to the device',
    actionLabel: 'Send Crousel Push Notification',
    platform: 'android',
    params: {
      androidCrouselPushID: '',
    },
    execute: payload => SDKManager.sendAndroidCrouselPush(payload),
  },
  {
    key: 'sendIOSAudioPush',
    title: 'Send Audio Push Notification',
    description: 'Sends an audio push notification to this device',
    actionLabel: 'Send Audio Push',
    platform: 'ios',
    params: {
      iOSAudioPushNID: '',
    },
    execute: payload => SDKManager.sendIOSAudioPush(payload),
  },
  {
    key: 'sendIOSVideoPush',
    title: 'Send Video Push Notification',
    description:
      'Sends an video of max 50MB in push notification to this device',
    actionLabel: 'Send Video Push',
    platform: 'ios',
    params: {
      iOSVideoPushNID: '',
    },
    execute: payload => SDKManager.sendIOSVideoPush(payload),
  },
];

const nvDefaultAppInboxInfo = {
  label_one: 'promotion',
  name_one: 'Promotional',
  label_two: 'transaction',
  name_two: 'Transactional',
  label_three: 'other',
  name_three: 'Others',
  selectedTabTextColor: theme.colors.textPrimary,
  unselectedTabTextColor: theme.colors.textPrimary,
  selectedTabBgColor: theme.colors.primary,
  unselectedTabBgColor_ios: theme.colors.textSecondary,
  selectedTabIndex_ios: '0',
};
const notificationCenterActions = (
  badge: BadgeHelpers,
): FeatureActionProps[] => [
  {
    key: 'showStdNotificationCenter',
    title: 'Show Standard Notification Center',
    description: 'Shows the standard notification center UI',
    actionLabel: 'Show Notification Center',
    params: {
      androidStdPushID: '',
      iOSStdPushNID: '',
    },
    onBeforeExecute: () => {
      // ✅ ALWAYS clear badge
      badge.clearBadge();
    },
    execute: payload => SDKManager.showStdNotificationCenter(payload),
  },
  {
    key: 'showAdvancedNotificationCenter',
    title: 'Show Advanced Notification Center',
    description: 'Shows the advanced notification center UI',
    actionLabel: 'Show Advanced Notification Center',
    showResult: true,
    resultTitle: 'Advanced Notification Center Result:',
    params: {
      appInboxInfo: nvDefaultAppInboxInfo,
      dismissValue: '0',
    },
    onBeforeExecute: () => {
      // ✅ ALWAYS clear badge
      badge.clearBadge();
    },
    execute: async payload => {
      const { appInboxInfo, dismissValue } = payload;
      const finalPayload = {
        appInboxInfo,
        dismissValue,
      };
      console.log('advanced center data: ', JSON.stringify(finalPayload));
      const result = await SDKManager.showAdvancedNotificationCenter(
        finalPayload,
      );
      return result;
    },
  },

  {
    key: 'getUnreadCountNotificationCenter',
    title: 'Get Unread Notification Count',
    description:
      'Retrieves the unread notification count in the notification center',
    actionLabel: 'Get Unread notification Count in Center',
    params: {
      appInboxInfo: nvDefaultAppInboxInfo,
    },
    showResult: true,
    resultTitle: 'Center Push Unread Count Result:',
    execute: async payload => {
      const unreadCountData = await SDKManager.getNotificationCenterUnreadCount(
        payload,
      );
      const parsed = JSON.parse(unreadCountData as string);
      return parsed;
    },
    onAfterExecute: result => {
      // ✅ Update badge ONLY if count changes
      const total = result?.totalCount ?? 0;
      badge.setBadge(total);
    },
  },
];

export { sendPushActions, notificationCenterActions };
