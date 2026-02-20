"use strict";

import { NativeModules, NativeEventEmitter, Platform, requireNativeComponent } from "react-native";

const NotifyvisitorsNativeDisplayView = requireNativeComponent('NotifyvisitorsNativeDisplay');

const { RNNotifyvisitors } = NativeModules;
const nvEventEmitter = new NativeEventEmitter(RNNotifyvisitors);

const NV_CALLBACKS = {
  GET_LINK_INFO: "nv_push_banner_click",
  NV_CHAT_BOT_EVENT: "nv_chat_bot_button_click",
  NV_SHOW: "nv_show_callback",
  NV_EVENT: "nv_event_callback",
  NV_EVENT_SURVEY: "nv_common_show_event_callback",
  NV_CENTER: "nv_center_callback",
  NV_KNOWN_USER_IDENTIFIED: "nv_known_user_identified_callback",
  NV_NOTIFICATION_CLICK_CALLBACK: "nv_notification_click_callback",
};

const CALLBACKS_STACK = {};

const addListeners = function () {
  if (!(RNNotifyvisitors != null)) {
    return;
  }
  Object.keys(NV_CALLBACKS).forEach((val) => {
    nvEventEmitter.addListener(NV_CALLBACKS[val], (data) => {
      try {
        if (
          data != null &&
          typeof CALLBACKS_STACK[NV_CALLBACKS[val]] == "function"
        ) {
          if (Platform.OS == "ios") {
            CALLBACKS_STACK[NV_CALLBACKS[val]](data.data);
          } else {
            CALLBACKS_STACK[NV_CALLBACKS[val]](data);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
};

addListeners();

/*  Native SDK Bridge Class */
export default class Notifyvisitors {
  /* 1 - Survery, InApp Banners */
  static show(tokens, customObjects, fragmentName, nvCallback) {
    console.log("NV- Show !!");
    try {
      CALLBACKS_STACK[NV_CALLBACKS.NV_SHOW] = nvCallback;
      RNNotifyvisitors.show(tokens, customObjects, fragmentName, nvCallback);
    } catch (e) {
      console.log(e);
    }
  }

  static showInAppMessage(tokens, customObjects, fragmentName, nvCallback) {
    console.log("NV- Show InApp Message !!");
    try {
      CALLBACKS_STACK[NV_CALLBACKS.NV_SHOW] = nvCallback;
      RNNotifyvisitors.showInAppMessage(
        tokens,
        customObjects,
        fragmentName,
        nvCallback
      );
    } catch (e) {
      console.log(e);
    }
  }

  /* 2 - Notification Center */
  static showNotifications(mAppInboxInfo, dismissValue) {
    console.log("NV- Show Notifications !!");
    try {
      if (Platform.OS == "ios") {
        dismissValue = dismissValue + "";
      } else {
        dismissValue = parseInt(dismissValue);
      }
      RNNotifyvisitors.showNotifications(mAppInboxInfo, dismissValue);
    } catch (e) {
      console.log(e);
    }
  }

  static openNotificationCenter(mAppInboxInfo, dismissValue, callback) {
    console.log("NV- Open Notification Center !!");
    try {
      if (Platform.OS == "ios") {
        dismissValue = dismissValue + "";
      } else {
        dismissValue = parseInt(dismissValue);
      }
      CALLBACKS_STACK[NV_CALLBACKS.NV_CENTER] = callback;
      RNNotifyvisitors.openNotificationCenter(
        mAppInboxInfo,
        dismissValue,
        callback
      );
    } catch (e) {
      console.log(e);
    }
  }

  static notificationClickCallback(nvCallback) {
    console.log("NV- Notification Click Callback !!");
    try {
      CALLBACKS_STACK[NV_CALLBACKS.NV_NOTIFICATION_CLICK_CALLBACK] = nvCallback;
      RNNotifyvisitors.notificationClickCallback(nvCallback);
    } catch (e) {
      console.log(e);
    }
  }

  static getSessionData(nvCallback) {
    console.log("NV- Get Session Data !!");
    try {
      RNNotifyvisitors.getSessionData(nvCallback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 3 - Event Tracking */
  static event(eventName, attributes, ltv, scope, nvCallback) {
    console.log("NV- Events !!");
    try {
      CALLBACKS_STACK[NV_CALLBACKS.NV_EVENT] = nvCallback;
      RNNotifyvisitors.event(eventName, attributes, ltv, scope, nvCallback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 4 - Login User */
  static userIdentifier(userID, sJsonObject) {
    console.log("NV- User Identifier !!");
    try {
      RNNotifyvisitors.userIdentifier(userID, sJsonObject);
    } catch (e) {
      console.log(e);
    }
  }

  static setUserIdentifier(sJsonObject, callback) {
    console.log("NV- Set User Identifier !!");
    try {
      RNNotifyvisitors.setUserIdentifier(sJsonObject, callback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 5 - chatbot */
  static startChatBot(screenName, nvCallback) {
    console.log("NV- Chatbot !!");
    try {
      CALLBACKS_STACK[NV_CALLBACKS.NV_CHAT_BOT_EVENT] = nvCallback;
      RNNotifyvisitors.startChatBot(screenName);
    } catch (e) {
      console.log(e);
    }
  }

  /* 6 - Push Notification Channel */
  static createNotificationChannel(
    chId,
    chName,
    chDescription,
    chImportance,
    enableLights,
    shouldVibrate,
    lightColor,
    soundFileName
  ) {
    console.log("NV- Create Notification Channnel !!");
    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        RNNotifyvisitors.createNotificationChannel(
          chId,
          chName,
          chDescription,
          chImportance,
          enableLights,
          shouldVibrate,
          lightColor,
          soundFileName
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* 7 - Push Notification Channel */
  static deleteNotificationChannel(channelId) {
    console.log("NV- Delate Notification Channnel !!");
    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        RNNotifyvisitors.deleteNotificationChannel(channelId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* 8 - Push Notification Channel Group */
  static createNotificationChannelGroup(groupId, groupName) {
    console.log("NV- Create Notification Channnel Group !!");
    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        RNNotifyvisitors.createNotificationChannelGroup(groupId, groupName);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* 9 - Push Notification Channel Group */
  static deleteNotificationChannelGroup(groupId) {
    console.log("NV- Delete Notification Channnel Group !!");
    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        RNNotifyvisitors.deleteNotificationChannelGroup(groupId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* 10 - Unread Push Notification Count */
  static getNotificationCenterCount(tabCountInfo, callback) {
    console.log("NV- Notification push Count !!");
    try {
      RNNotifyvisitors.getNotificationCenterCount(tabCountInfo, callback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 11 - Get FCM/APNS Device Token */
  static getRegistrationToken(nvCallback) {
    console.log("NV- FCM/APNS Device Token !!");
    try {
      RNNotifyvisitors.getRegistrationToken(nvCallback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 12 - Play Store / App Store Rating  */
  static requestInAppReview(nvCallback) {
    console.log("NV- In App Review !!");
    try {
      RNNotifyvisitors.requestInAppReview(nvCallback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 13 - Category based Notification  */
  static subscribePushCategory(categoryInfo, unSubscribe2All) {
    console.log("NV- Subscibe Push Category !!");
    try {
      RNNotifyvisitors.subscribePushCategory(categoryInfo, unSubscribe2All);
    } catch (e) {
      console.log(e);
    }
  }

  /* 14 - Push /InApp / Notification Center Click Callback Data */
  static getLinkInfo(nvCallback) {
    console.log("NV- Get Link Info !!");
    try {
      CALLBACKS_STACK[NV_CALLBACKS.GET_LINK_INFO] = nvCallback;
      RNNotifyvisitors.getLinkInfo();
    } catch (e) {
      console.log(e);
    }
  }

  /* 15 - Unique NotifyVisitors Identification  */
  static getNvUID(callback) {
    console.log("NV- Get NV UID !!");
    try {
      RNNotifyvisitors.getNvUID(callback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 16 - JSon Data For Custom Notification Center  */

  static getNotificationDataListener(callback) {
    console.log("NV- Get Notification Data Listener !!");
    try {
      if (Platform == "ios") {
        RNNotifyvisitors.getNotificationDataListener("fetchEvent");
      }
      RNNotifyvisitors.getNotificationDataListener(callback);
    } catch (e) {
      console.log(e);
    }
  }

  static getNotificationCenterData(callback) {
    console.log("NV- Get Notification Data callback !!");
    try {
      RNNotifyvisitors.getNotificationCenterData(callback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 17 - Auto Start Library Android  */
  static setAutoStartPermission_android_only() {
    console.log("NV- Auto Start Permission Android !!");
    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        RNNotifyvisitors.setAutoStartPermission();
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* 18 - Stop Showing InApp Banner Survey  */
  static stopNotifications() {
    console.log("NV- Stop Notification !!");
    try {
      RNNotifyvisitors.stopNotifications();
    } catch (e) {
      console.log(e);
    }
  }

  /* 19 - Stop Showing Location Push for a custom time  */
  static stopGeofencePushforDateTime(dateTime, additionalHours) {
    console.log("NV- Stop Geofence Push For Date Time !!");
    try {
      RNNotifyvisitors.stopGeofencePushforDateTime(dateTime, additionalHours);
    } catch (e) {
      console.log(e);
    }
  }

  /* 20 - Triger Push Notification on Panel */
  static scheduleNotification(nid, tag, time, title, message, url, icon) {
    console.log("NV- Schedule Notification !!");
    try {
      RNNotifyvisitors.scheduleNotification(
        nid,
        tag,
        time,
        title,
        message,
        url,
        icon
      );
    } catch (e) {
      console.log(e);
    }
  }

  /* 21 - Separate Callbacks For Events and Surveys */
  static getEventSurveyInfo(nvCallback) {
    console.log("NV- Get Event Survey Info !!");
    try {
      CALLBACKS_STACK[NV_CALLBACKS.NV_EVENT_SURVEY] = nvCallback;
      RNNotifyvisitors.getEventSurveyInfo(nvCallback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 22 - Depricated Function For Notification Count */
  static getNotificationCount(callback) {
    console.log("NV- Get Notification Count !!");
    try {
      RNNotifyvisitors.getNotificationCount(callback);
    } catch (e) {
      console.log(e);
    }
  }

  /* 23 - IOS Specific */
  static scrollViewDidScroll_iOS_only() {
    console.log("NV- Scroll View Did Scroll IOS !!");
    try {
      RNNotifyvisitors.scrollViewDidScroll_iOS_only();
    } catch (e) {
      console.log(e);
    }
  }

  /* 24 - IOS Specific */
  static promptForPushNotificationsWithUserResponse(callback) {
    console.log("NV- Prompt For Push Notifications With UserResponse IOS !!");
    if (!checkIfInitialized()) return;

    if (Platform.OS === "ios") {
      RNNotifyvisitors.promptForPushNotificationsWithUserResponse(callback);
    } else {
      console.log("This function is not supported on Android");
    }
  }

  static pushPermissionPrompt(pushPromptInfo, callback) {
    console.log("NV- Push Permission Prompt !!");
    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        if (pushPromptInfo != null) {
          RNNotifyvisitors.pushPermissionPrompt(pushPromptInfo, callback);
        } else {
          let pushPromptInfo = new PushPromptInfo();
          RNNotifyvisitors.pushPermissionPrompt(pushPromptInfo, callback);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  static clearPushData() {
    console.log("NV- Clear Push Data !!");
    try {
      if (Platform.OS === "android") {
        RNNotifyvisitors.clearPushData();
      }
    } catch (e) {
      console.log(e);
    }
  }

  static checkPushActive(nv_signal) {
    console.log("NV- Check Push Active !!");
    try {
      if (Platform.OS === "android") {
        RNNotifyvisitors.checkPushActive(nv_signal);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static nativePushPermissionPrompt(callback) {
    console.log("NV- Native Push Permission Prompt !!");
    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        RNNotifyvisitors.nativePushPermissionPrompt(callback);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static knownUserIdentified(callback) {
    console.log("NV- Known User Identified !!");
    try {
      CALLBACKS_STACK[NV_CALLBACKS.NV_KNOWN_USER_IDENTIFIED] = callback;
      RNNotifyvisitors.knownUserIdentified(callback);
    } catch (e) {
      console.log(e);
    }
  }

  static isPayloadFromNvPlatform(pushPayload, callback) {
    console.log("NV- Is Payload From NV Platform !!");

    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        console.log("This function is supported on Android");
        RNNotifyvisitors.isPayloadFromNvPlatform(pushPayload, callback);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static getNV_FCMPayload(pushPayload) {
    console.log("NV- Get NV FCM Payload !!");

    try {
      if (Platform.OS === "ios") {
        console.log("This function is not supported on IOS");
      } else {
        RNNotifyvisitors.getNV_FCMPayload(pushPayload);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* - Trck Screen */
  static trackScreen(screenName) {
    console.log("NV- Track Screen !!");
    try {
      RNNotifyvisitors.trackScreen(screenName);
    } catch (e) {
      console.log(e);
    }
  }
}

export class PushPromptInfo {
  constructor() {
    this.title = "Get Notified  \uD83D\uDD14";
    this.titleTextColor = "#000000";
    this.description =
      "Please Enable Push Notifications on Your Device For Latest Updates !!";
    this.descriptionTextColor = "#000000";
    this.backgroundColor = "#EBEDEF";
    this.buttonOneBorderColor = "#6db76c";
    this.buttonOneBackgroundColor = "#26a524";
    this.buttonOneBorderRadius = "25";
    this.buttonOneText = "Allow";
    this.buttonOneTextColor = "#FFFFFF";
    this.buttonTwoText = "Deny";
    this.buttonTwoTextColor = "#FFFFFF";
    this.buttonTwoBackgroundColor = "#FF0000";
    this.buttonTwoBorderColor = "#6db76c";
    this.buttonTwoBorderRadius = "25";
    this.numberOfSessions = "3";
    this.resumeInDays = "5";
    this.numberOfTimesPerSession = "2";
  }
}

const NotifyvisitorsNativeDisplay = (props) => {
  const { onNudgeUiFinalized, ...rest } = props;

  const handleEvent = (event) => {
    let data = event.nativeEvent?.data;
    //console.log("Nudge UI finalized with event: ", event);
    //console.log("Nudge UI finalized with event.nativeEvent: ", event.nativeEvent);
    console.log("Nudge UI finalized with data: ", data);

    const finalEvent = {
      data,
    };
    console.log("Final Event: ", finalEvent);

    if (onNudgeUiFinalized) {
      onNudgeUiFinalized({ response: finalEvent });
    }
  };
  return (<NotifyvisitorsNativeDisplayView {...rest}
    onNudgeUiFinalized={handleEvent} />);
};

// Wrapper component
export { NotifyvisitorsNativeDisplay };
