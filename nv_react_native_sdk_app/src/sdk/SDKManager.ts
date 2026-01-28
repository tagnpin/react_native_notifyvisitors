// src/sdk/SDKManager.ts

import { Alert, Platform } from 'react-native';
import DeviceInfoLib from 'react-native-device-info';
import moment from 'moment';
import { DeviceInfo } from './SDKTypes';
import SDK_VERSION from './SDKVersion';
import Notifyvisitors from '../../..';
import { theme } from '../shared/styles/theme';
import { SDKCallbackEvents } from './events/SDKCallbackEvents';

/**
 * SDKManager
 *
 * Single abstraction layer over native SDK.
 * - Screens call SDKManager
 * - SDKManager talks to native modules
 * - All callbacks are logged centrally
 */
class SDKManager {
  private static listenersInitialized = false;

  static nvInitListeners() {
    if (this.listenersInitialized) return;
    this.listenersInitialized = true;

    // 1️⃣ Event Survey Info
    Notifyvisitors.getEventSurveyInfo((callback: any) => {
      console.log('[SDK] EventSurveyInfo', callback);
      SDKCallbackEvents.nvEventSurvey.emit(callback);
    });

    // 2️⃣ Link Info
    Notifyvisitors.getLinkInfo((callback: any) => {
      console.log('[SDK] LinkInfo', callback);
      SDKCallbackEvents.nvLinkInfo.emit(callback);
    });

    // 3️⃣ Known User Identified
    Notifyvisitors.knownUserIdentified((callback: any) => {
      console.log('[SDK] KnownUserIdentified', callback);
      SDKCallbackEvents.nvKnownUser.emit(callback);
    });
  }

  static async getDeviceInfo(): Promise<DeviceInfo> {
    const tokenStr = await this.getPushToken();
    const deviceIdStr = await DeviceInfoLib.getUniqueId();

    const info: DeviceInfo = {
      platform: Platform.OS as 'ios' | 'android',
      osVersion: DeviceInfoLib.getSystemVersion(),
      deviceId: deviceIdStr,
      pushToken: tokenStr,
      appVersion: DeviceInfoLib.getVersion(),
      buildNumber: DeviceInfoLib.getBuildNumber(),
      sdkVersion: SDK_VERSION,
      environment: __DEV__ ? 'debug' : 'release',
    };

    return info;
  }

  static get currentDateTime(): string {
    var currentFormattedTime = moment().format('DD_MM_YYYY_HH_mm_ss');
    return `_${currentFormattedTime}`;
  }

  /* ---------------------------------------------------
   *  -- Push Notifications
   * --------------------------------------------------- */

  private static readonly nvNotificationIDs = {
    android: {
      standardPushNID: '233130',
      stdPushWithActionNID: '233132',
      richPushNID: '233133',
      gifPushNID: '23XXXX',
      sliderPushNID: '23XXXX',
      crouselPushNID: '2XXX',
    },
    ios: {
      standardPushNID: '152746',
      stdPushWithActionNID: '143452',
      richPushNID: '37896',
      audioPushNID: '40211',
      videoPushNID: '188595',
    },
  };

  private static getNotificationId(type: PushType): string {
    const platform = Platform.OS === 'android' ? 'android' : 'ios';

    const notificationId =
      this.nvNotificationIDs[platform][
        type as keyof (typeof this.nvNotificationIDs)[typeof platform]
      ];

    if (!notificationId) {
      throw new Error(
        `Notification ID not configured for ${platform} → ${type}`,
      );
    }

    return notificationId;
  }

  private static scheduleNVPushNotification(nvIDStr: string, time: string) {
    let sendAfterSeconds = time ?? '2';
    Notifyvisitors.scheduleNotification(
      nvIDStr,
      null,
      sendAfterSeconds,
      null,
      null,
      null,
      null,
    );
  }

  static async sendStandardPushNotification(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      const notificationId = this.getNotificationId('standardPushNID');
      this.scheduleNVPushNotification(notificationId, '2');
    } catch (error) {
      throw error;
    }
  }

  static async sendStdPushWithActionBtns(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      const notificationId = this.getNotificationId('stdPushWithActionNID');
      this.scheduleNVPushNotification(notificationId, '2');
    } catch (error) {
      throw error;
    }
  }

  static async sendRichPush(payload: Record<string, any>): Promise<void> {
    try {
      const notificationId = this.getNotificationId('richPushNID');
      this.scheduleNVPushNotification(notificationId, '2');
    } catch (error) {
      throw error;
    }
  }

  static async sendAndroidGIFPush(payload: Record<string, any>): Promise<void> {
    if (Platform.OS !== 'android') {
      Alert.alert('This push type is Android only');
      return;
    }

    try {
      const notificationId = this.getNotificationId('gifPushNID');
      this.scheduleNVPushNotification(notificationId, '2');
    } catch (error) {
      throw error;
    }
  }

  static async sendAndroidSLiderPush(
    payload: Record<string, any>,
  ): Promise<void> {
    if (Platform.OS !== 'android') {
      Alert.alert('This push type is Android only');
      return;
    }
    try {
      const notificationId = this.getNotificationId('sliderPushNID');
      this.scheduleNVPushNotification(notificationId, '2');
    } catch (error) {
      throw error;
    }
  }

  static async sendAndroidCrouselPush(
    payload: Record<string, any>,
  ): Promise<void> {
    if (Platform.OS !== 'android') {
      Alert.alert('This push type is Android only');
      return;
    }

    try {
      const notificationId = this.getNotificationId('crouselPushNID');
      this.scheduleNVPushNotification(notificationId, '2');
    } catch (error) {
      throw error;
    }
  }

  static async sendIOSAudioPush(payload: Record<string, any>): Promise<void> {
    if (Platform.OS !== 'ios') {
      Alert.alert('This push type is iOS only');
      return;
    }

    try {
      const notificationId = this.getNotificationId('audioPushNID');
      this.scheduleNVPushNotification(notificationId, '2');
    } catch (error) {
      throw error;
    }
  }

  static async sendIOSVideoPush(payload: Record<string, any>): Promise<void> {
    if (Platform.OS !== 'ios') {
      Alert.alert('This push type is iOS only');
      return;
    }

    try {
      const notificationId = this.getNotificationId('videoPushNID');
      this.scheduleNVPushNotification(notificationId, '2');
    } catch (error) {
      throw error;
    }
  }

  static async getPushToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        Notifyvisitors.getRegistrationToken((callback: string) => {
          resolve(callback);
          //console.log(`result in getPushToken = ${callback}`);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  /* ---------------------------------------------------
   *  -- Notifications Center
   * --------------------------------------------------- */

  private static nvAdvanceCenterTabsData = {
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

  static async showStdNotificationCenter(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      Notifyvisitors.showNotifications(null, 0);
    } catch (error) {
      throw error;
    }
  }
  static async showAdvancedNotificationCenter(
    payload: Record<string, any>,
  ): Promise<any> {
    try {
      Notifyvisitors.openNotificationCenter(
        this.nvAdvanceCenterTabsData,
        '0',
        (callback: any) => {
          console.log(
            `open Notification Center callback: ${JSON.stringify(callback)}`,
          );
          return callback;
        },
      );
    } catch (error) {
      throw error;
    }
  }

  static async getNotificationCenterUnreadCount(payload: Record<string, any>) {
    return new Promise((resolve, reject) => {
      try {
        Notifyvisitors.getNotificationCenterCount(
          this.nvAdvanceCenterTabsData,
          (callback: any) => {
            console.log(
              `get notification center unread count callback: ${JSON.stringify(
                callback,
              )}`,
            );
            resolve(callback);
          },
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  /* ---------------------------------------------------
   *  -- InApp Messages / Popups
   * --------------------------------------------------- */

  static async nvShowInAppMessages(bannerType: nvInAppType): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let result: any;
        if (bannerType != null || bannerType != undefined) {
          const userToken = {
            name: 'Customer Name',
            email: `customer_email_${this.currentDateTime}@notifyvisitors.com`,
            department: 'development',
            age: 34,
            married: true,
            email_verified: false,
            mobile: '0000000000',
            user_score: 235,
            plan_type: 1,
          };

          const customRule = {
            banner: `${bannerType}`,
            screenname: 'FeatureActions',
            currentDate: `${this.currentDateTime}`,
          };

          console.log(
            `showNVInAppMessages for userToken = ${JSON.stringify(
              userToken,
            )}\n customRule = ${JSON.stringify(customRule)}`,
          );

          Notifyvisitors.showInAppMessage(
            userToken,
            customRule,
            null,
            (callback: any) => {
              result = callback;
              console.log(
                `showInAppMessage() callback: ${JSON.stringify(callback)}`,
              );

              resolve(result);
            },
          );
        } else {
          reject('Invalid InAppMessage Template');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /* ---------------------------------------------------
   *  -- Analytics -->> TRACK EENTS
   * --------------------------------------------------- */

  static async trackEvent(payload: {
    eventName: string;
    attributes?: Record<string, any>;
    ltv?: string;
    scope?: string;
  }) {
    const { eventName, attributes = {}, ltv = '', scope = '' } = payload;

    // eventName (required)
    if (typeof eventName !== 'string' || !eventName.trim()) {
      Alert.alert('eventName is required and must be a non-empty string');
      // throw new Error('eventName is required and must be a non-empty string');
      return;
    }

    if (attributes && typeof attributes !== 'object') {
      Alert.alert('attributes must be a JSON object');
      // throw new Error('attributes must be a JSON object');
      return;
    }

    if (typeof scope !== 'string' || isNaN(Number(scope))) {
      Alert.alert('scope value must be a numeric string');
      // throw new Error('scope value must be a numeric string');
      return;
    }

    return new Promise((resolve, reject) => {
      try {
        console.log(
          `goto trackEvent for \n{"eventName": "${eventName}",\n"attributes": ${JSON.stringify(
            attributes,
          )},\n"ltv": "${ltv}",\n"scope": "${scope}"}`,
        );
        Notifyvisitors.event(
          eventName,
          attributes,
          ltv,
          scope,
          (callback: any) => {
            console.log(
              `trackEvent callback response = ${JSON.stringify(callback)}`,
            );
            resolve(callback);
          },
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  static async trackScreen(payload: { screentName: string }) {
    const { screentName } = payload;

    // screentName (required)
    if (typeof screentName !== 'string' || !screentName.trim()) {
      Alert.alert('screentName is required and must be a non-empty string');
      // throw new Error('screentName is required and must be a non-empty string');
      return;
    }
    return new Promise((resolve, reject) => {
      try {
        console.log(`trackScreen for screentName = ${screentName}`);
        Notifyvisitors.trackScreen(screentName.trim());
      } catch (e) {
        reject(e);
      }
    });
  }

  /* ---------------------------------------------------
   *  -- Analytics -->> USER PROPERTIES
   * --------------------------------------------------- */

  static async setUserDetails(payload: Record<string, any>): Promise<any> {
    if (payload && typeof payload !== 'object') {
      Alert.alert(
        'setupUserDetails must be a JSON object in setupUserDetails()',
      );
      // throw new Error('attributes must be a JSON object');
      return;
    }
    return new Promise((resolve, reject) => {
      try {
        Notifyvisitors.setUserIdentifier(payload, (callback: any) => {
          resolve(callback);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  static async getNVUID(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        Notifyvisitors.getNvUID((callback: any) => {
          resolve(callback);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  /* ---------------------------------------------------
   *  -- Other -->> Callbacks method and listeners
   * --------------------------------------------------- */

  // ---------- Subscribe APIs (public) ----------

  static getEventSurveyInfo(listener: (data: any) => void) {
    return SDKCallbackEvents.nvEventSurvey.subscribe(listener);
  }

  static getLinkInfo(listener: (data: any) => void) {
    return SDKCallbackEvents.nvLinkInfo.subscribe(listener);
  }

  static knownUserIdentified(listener: (data: any) => void) {
    return SDKCallbackEvents.nvKnownUser.subscribe(listener);
  }

  // static async getLinkInfoOLD(): Promise<any> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       Notifyvisitors.knownUserIdentified((callback: any) => {
  //         console.log(`getLinkInfo called with callback = ${callback}`);
  //         resolve(callback);
  //       });
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // }

  // static onEventSurveyInfo(callback: nvEventSurveyCallback) {
  //   if (this.eventSurveyListenerSet) {
  //     return;
  //   }
  //   this.eventSurveyListenerSet = true;
  //   Notifyvisitors.getEventSurveyInfo((data: any) => {
  //     console.log('getEventSurveyInfo received in SDKManager =', data);
  //     callback(data);
  //   });
  // }
}

export default SDKManager;
