// src/sdk/SDKManager.ts

import { Alert, Platform } from 'react-native';
import DeviceInfoLib from 'react-native-device-info';
import { DeviceInfo } from './SDKTypes';
import SDK_VERSION from './SDKVersion';
import { emitSDKCallback, emitSDKError } from './SDKEventBridge';
import Notifyvisitors from '../../..';

/**
 * SDKManager
 *
 * Single abstraction layer over native SDK.
 * - Screens call SDKManager
 * - SDKManager talks to native modules
 * - All callbacks are logged centrally
 */
class SDKManager {
  private pushToken?: string;

  static async getDeviceInfo(): Promise<DeviceInfo> {
    const info: DeviceInfo = {
      platform: Platform.OS as 'ios' | 'android',
      osVersion: DeviceInfoLib.getSystemVersion(),
      deviceId: DeviceInfoLib.getUniqueId(),

      appVersion: DeviceInfoLib.getVersion(),
      buildNumber: DeviceInfoLib.getBuildNumber(),
      sdkVersion: SDK_VERSION,
      environment: __DEV__ ? 'debug' : 'release',
    };

    emitSDKCallback('getDeviceInfo', info, true);
    return info;
  }

  /* ---------------------------------------------------
   *  -- Push Notifications
   * --------------------------------------------------- */

  static async sendStandardPushNotification(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback(
        'sendStandardPushNotification',
        { granted: result },
        true,
      );
    } catch (error) {
      emitSDKError('sendStandardPushNotification', error);
      throw error;
    }
  }

  static async sendStdPushWithActionBtns(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback('sendStdPushWithActionBtns', { granted: result }, true);
    } catch (error) {
      emitSDKError('sendStdPushWithActionBtns', error);
      throw error;
    }
  }

  static async sendRichPush(payload: Record<string, any>): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback('sendRichPushNotification', { granted: result }, true);
    } catch (error) {
      emitSDKError('sendRichPushNotification', error);
      throw error;
    }
  }

  static async sendAndroidGIFPush(payload: Record<string, any>): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback('sendAndroidGIFPush', { granted: result }, true);
    } catch (error) {
      emitSDKError('sendAndroidGIFPush', error);
      throw error;
    }
  }

  static async sendAndroidSLiderPush(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback('sendAndroidSLiderPush', { granted: result }, true);
    } catch (error) {
      emitSDKError('sendAndroidSLiderPush', error);
      throw error;
    }
  }

  static async sendAndroidCrouselPush(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback('sendAndroidCrouselPush', { granted: result }, true);
    } catch (error) {
      emitSDKError('sendAndroidCrouselPush', error);
      throw error;
    }
  }

  static async sendIOSAudioPush(payload: Record<string, any>): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback('sendAudioPushNotification', { granted: result }, true);
    } catch (error) {
      emitSDKError('sendAudioPushNotification', error);
      throw error;
    }
  }

  static async sendIOSVideoPush(payload: Record<string, any>): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback('sendVideoPushNotification', { granted: result }, true);
    } catch (error) {
      emitSDKError('sendVideoPushNotification', error);
      throw error;
    }
  }

  /* ---------------------------------------------------
   *  -- Notifications Center
   * --------------------------------------------------- */
  static async showStdNotificationCenter(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      Notifyvisitors.showNotifications(null, 0);
      //Alert.alert('new center data');
    } catch (error) {
      emitSDKError('showStdNotificationCenter', error);
      throw error;
    }
  }
  static async showAdvancedNotificationCenter(
    payload: Record<string, any>,
  ): Promise<void> {
    try {
      // TODO: replace with actual native SDK call
      const result = true;

      emitSDKCallback(
        'showAdvancedNotificationCenter',
        { granted: result },
        true,
      );
    } catch (error) {
      emitSDKError('showAdvancedNotificationCenter', error);
      throw error;
    }
  }

  static async getNotificationCenterUnreadCount(
    payload: Record<string, any>,
  ): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback(
        'getNotificationCenterUnreadCount',
        { count: result },
        true,
      );

      return result;
    } catch (error) {
      emitSDKError('getNotificationCenterUnreadCount', error);
      throw error;
    }
  }

  /* ---------------------------------------------------
   *  -- InApp Messages / Popups
   * --------------------------------------------------- */

  static async showAlert(payload: Record<string, any>): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showAlert', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showAlert', error);
      throw error;
    }
  }

  static async showConfirmationDialog(
    payload: Record<string, any>,
  ): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showConfirmationDialog', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showConfirmationDialog', error);
      throw error;
    }
  }

  static async showPopup(payload: Record<string, any>): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showPopup', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showPopup', error);
      throw error;
    }
  }

  static async showFullPopup(payload: Record<string, any>): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showFullPopup', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showFullPopup', error);
      throw error;
    }
  }

  static async showStickyBar(payload: Record<string, any>): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showStickyBar', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showStickyBar', error);
      throw error;
    }
  }

  static async showSurvey(payload: Record<string, any>): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showSurvey', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showSurvey', error);
      throw error;
    }
  }

  static async showNPSSurvey(payload: Record<string, any>): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showNPSSurvey', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showNPSSurvey', error);
      throw error;
    }
  }

  static async showInAppWalkthrough(
    payload: Record<string, any>,
  ): Promise<any> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showInAppWalkthrough', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showInAppWalkthrough', error);
      throw error;
    }
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
        Notifyvisitors.event(
          eventName,
          attributes,
          ltv,
          scope,
          (callbacks: any) => {
            resolve(callbacks);
          },
        );
      } catch (e) {
        reject(e);
      }
    });
  }
  // static async trackEvent(payload: {
  //   eventName: InputType.STRING;
  //   attributes?: InputType.JSON_OBJECT;
  //   ltv?: InputType.STRING;
  //   scope?: InputType.STRING;
  // }) {
  //   const { eventName, attributes = {}, ltv = '', scope = '' } = payload;

  //   return new Promise((resolve, reject) => {
  //     try {
  //       Alert.alert(
  //         `Track Event Now with payload:\n${JSON.stringify(payload)}`,
  //       );
  //       // myRNPlugin.event(eventName, attributes, ltv, scope, (result: any) => {
  //       //   resolve(result);
  //       // });
  //     } catch (e: any) {
  //       reject(e);
  //     }
  //   });
  // }

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

    Alert.alert(`setupUserDetails  params = ${JSON.stringify(payload)}`);
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

  static async getNVUID(): Promise<number> {
    try {
      // TODO: replace with actual native SDK call
      const result = 0;

      emitSDKCallback('showAlert', { count: result }, true);

      return result;
    } catch (error) {
      emitSDKError('showAlert', error);
      throw error;
    }
  }
}

export default SDKManager;

// import { Alert, Platform } from 'react-native';
// import Notifyvisitors from 'react-native-notifyvisitors';
// import DeviceInfoLib from 'react-native-device-info';

// import SDK_VERSION from './SDKVersion';
// import { DeviceInfo } from './SDKTypes';

// import { emitSDKCallback, emitSDKError } from './SDKEventBridge';

// /**
//  * SDKManager
//  *
//  * Single abstraction layer over native SDK.
//  * - Screens call SDKManager
//  * - SDKManager talks to native modules
//  * - All callbacks are logged centrally
//  */
// class SDKManager {
//   private pushToken?: string;

//   async getDeviceInfo(): Promise<DeviceInfo> {
//     const info: DeviceInfo = {
//       platform: Platform.OS as 'ios' | 'android',
//       osVersion: DeviceInfoLib.getSystemVersion(),
//       deviceId: DeviceInfoLib.getUniqueId(),

//       appVersion: DeviceInfoLib.getVersion(),
//       buildNumber: DeviceInfoLib.getBuildNumber(),
//       sdkVersion: SDK_VERSION,
//       environment: __DEV__ ? 'debug' : 'release',
//     };

//     emitSDKCallback('getDeviceInfo', info, true);
//     return info;
//   }

//   /* ---------------------------------------------------
//    *  -- Push Notifications
//    * --------------------------------------------------- */

//   async sendStandardPushNotification(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback(
//         'sendStandardPushNotification',
//         { granted: result },
//         true,
//       );
//     } catch (error) {
//       emitSDKError('sendStandardPushNotification', error);
//       throw error;
//     }
//   }

//   async sendStdPushWithActionBtns(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback('sendStdPushWithActionBtns', { granted: result }, true);
//     } catch (error) {
//       emitSDKError('sendStdPushWithActionBtns', error);
//       throw error;
//     }
//   }

//   async sendRichPush(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback('sendRichPushNotification', { granted: result }, true);
//     } catch (error) {
//       emitSDKError('sendRichPushNotification', error);
//       throw error;
//     }
//   }

//   async sendAndroidGIFPush(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback('sendAndroidGIFPush', { granted: result }, true);
//     } catch (error) {
//       emitSDKError('sendAndroidGIFPush', error);
//       throw error;
//     }
//   }

//   async sendAndroidSLiderPush(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback('sendAndroidSLiderPush', { granted: result }, true);
//     } catch (error) {
//       emitSDKError('sendAndroidSLiderPush', error);
//       throw error;
//     }
//   }

//   async sendAndroidCrouselPush(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback('sendAndroidCrouselPush', { granted: result }, true);
//     } catch (error) {
//       emitSDKError('sendAndroidCrouselPush', error);
//       throw error;
//     }
//   }

//   async sendIOSAudioPush(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback('sendAudioPushNotification', { granted: result }, true);
//     } catch (error) {
//       emitSDKError('sendAudioPushNotification', error);
//       throw error;
//     }
//   }

//   async sendIOSVideoPush(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback('sendVideoPushNotification', { granted: result }, true);
//     } catch (error) {
//       emitSDKError('sendVideoPushNotification', error);
//       throw error;
//     }
//   }

//   /* ---------------------------------------------------
//    *  -- Notifications Center
//    * --------------------------------------------------- */
//   async showStdNotificationCenter(): Promise<void> {
//     try {
//       Notifyvisitors.showNotifications(null, 0);
//       //Alert.alert('new center data');
//     } catch (error) {
//       emitSDKError('showStdNotificationCenter', error);
//       throw error;
//     }
//   }
//   async showAdvancedNotificationCenter(): Promise<void> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback(
//         'showAdvancedNotificationCenter',
//         { granted: result },
//         true,
//       );
//     } catch (error) {
//       emitSDKError('showAdvancedNotificationCenter', error);
//       throw error;
//     }
//   }

//   async getNotificationCenterUnreadCount(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback(
//         'getNotificationCenterUnreadCount',
//         { count: result },
//         true,
//       );

//       return result;
//     } catch (error) {
//       emitSDKError('getNotificationCenterUnreadCount', error);
//       throw error;
//     }
//   }

//   /* ---------------------------------------------------
//    *  -- InApp Messages / Popups
//    * --------------------------------------------------- */

//   async showAlert(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showAlert', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showAlert', error);
//       throw error;
//     }
//   }

//   async showConfirmationDialog(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showConfirmationDialog', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showConfirmationDialog', error);
//       throw error;
//     }
//   }

//   async showPopup(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showPopup', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showPopup', error);
//       throw error;
//     }
//   }

//   async showFullPopup(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showFullPopup', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showFullPopup', error);
//       throw error;
//     }
//   }

//   async showStickyBar(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showStickyBar', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showStickyBar', error);
//       throw error;
//     }
//   }

//   async showSurvey(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showSurvey', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showSurvey', error);
//       throw error;
//     }
//   }

//   async showNPSSurvey(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showNPSSurvey', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showNPSSurvey', error);
//       throw error;
//     }
//   }

//   async showInAppWalkthrough(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showInAppWalkthrough', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showInAppWalkthrough', error);
//       throw error;
//     }
//   }

//   /* ---------------------------------------------------
//    *  -- Analytics -->> TRACK EENTS
//    * --------------------------------------------------- */

//   static trackEvent(payload: {
//     eventName: string;
//     attributes?: Record<string, any>;
//     ltv?: string;
//     scope?: string;
//   }) {
//     const { eventName, attributes = {}, ltv = '', scope = '' } = payload;

//     return new Promise((resolve, reject) => {
//       try {
//         Alert.alert(`Track Event Now with payload:\n${payload}`);
//         // myRNPlugin.event(eventName, attributes, ltv, scope, (result: any) => {
//         //   resolve(result);
//         // });
//       } catch (e: any) {
//         reject(e);
//       }
//     });
//   }

//   async trackScreen(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showAlert', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showAlert', error);
//       throw error;
//     }
//   }

//   /* ---------------------------------------------------
//    *  -- Analytics -->> USER PROPERTIES
//    * --------------------------------------------------- */

//   async setUserDetails(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showAlert', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showAlert', error);
//       throw error;
//     }
//   }

//   async getNVUID(): Promise<number> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = 0;

//       emitSDKCallback('showAlert', { count: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('showAlert', error);
//       throw error;
//     }
//   }

//   /**
//    * Example: Request push permission
//    */
//   async requestPushPermission(): Promise<boolean> {
//     try {
//       // TODO: replace with actual native SDK call
//       const result = true;

//       emitSDKCallback('requestPushPermission', { granted: result }, true);

//       return result;
//     } catch (error) {
//       emitSDKError('requestPushPermission', error);
//       throw error;
//     }
//   }

//   /**
//    * Example: Get push token
//    */
//   async getPushToken(): Promise<string> {
//     try {
//       // TODO: replace with native SDK call
//       const token = 'mock_push_token';

//       emitSDKCallback('getPushToken', { token }, true);

//       return token;
//     } catch (error) {
//       emitSDKError('getPushToken', error);
//       throw error;
//     }
//   }

//   /**
//    * Example: Show in-app message
//    */
//   async showInAppMessage(): Promise<void> {
//     try {
//       // TODO: native SDK call
//       emitSDKCallback('showInAppMessage', { shown: true }, true);
//     } catch (error) {
//       emitSDKError('showInAppMessage', error);
//       throw error;
//     }
//   }

//   /**
//    * Example: Show nudge
//    */
//   async showNudge(): Promise<void> {
//     try {
//       emitSDKCallback('showNudge', { shown: true }, true);
//     } catch (error) {
//       emitSDKError('showNudge', error);
//       throw error;
//     }
//   }

//   /**
//    * Example: Track analytics event
//    */
//   // async trackEvent(name: string, params?: Record<string, any>): Promise<void> {
//   //   try {
//   //     // TODO: native SDK call
//   //     emitSDKCallback('trackEvent', { name, params }, true);
//   //   } catch (error) {
//   //     emitSDKError('trackEvent', error);
//   //     throw error;
//   //   }
//   // }

//   setPushToken(token: string) {
//     this.pushToken = token;
//     emitSDKCallback('setPushToken', { token }, true);
//   }

//   getPushTokenCached(): string | undefined {
//     return this.pushToken;
//   }
// }

// export default new SDKManager();
