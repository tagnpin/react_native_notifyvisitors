export default class Notifyvisitors {
  /* 1 - inApp-Banner & inApp-Surveys */
  static show(
    tokens: any,
    customObjects: any,
    fragmentName: any,
    nvCallback: any
  ): void;

  static showInAppMessage(
    tokens: any,
    customObjects: any,
    fragmentName: any,
    nvCallback: any
  ): void;

  static stopNotifications(): void;
  static getEventSurveyInfo(nvCallback: any): void;

  /* 2 - Notification Center */
  static openNotificationCenter(
    mAppInboxInfo: any,
    dismissValue: any,
    callback: any
  ): void;
  static showNotifications(mAppInboxInfo: any, dismissValue: any): void;
  static getNotificationCenterData(callback: any): void;
  static getNotificationCenterCount(tabCountInfo: any, callback: any): void;
  static getNotificationDataListener(callback: any): void;
  static getNotificationCount(callback: any): void;

  /* 3 - Track Events */
  static event(
    eventName: any,
    attributes: any,
    ltv: any,
    scope: any,
    nvCallback: any
  ): void;

  /* 4 - Push Notifications */
  static scheduleNotification(
    nid: any,
    tag: any,
    time: any,
    title: any,
    message: any,
    url: any,
    icon: any
  ): void;
  static subscribePushCategory(categoryInfo: any, unSubscribe2All: any): void;
  static stopGeofencePushforDateTime(dateTime: any, additionalHours: any): void;
  static getRegistrationToken(nvCallback: any): void;

  /* 5 - Track User */
  static userIdentifier(userID: any, sJsonObject: any): void;
  static setUserIdentifier(sJsonObject: any, callback: any): void;
  static getNvUID(callback: any): void;
  static knownUserIdentified(callback: any): void;

  /* 6 - Chatbot (Deprecated and temporarly not available in Native SDKs) */
  static startChatBot(screenName: any, nvCallback: any): void;

  /* 7 - GetLinkInfo() and other callback handlers */
  static getLinkInfo(nvCallback: any): void;

  /* 8 - Other Methods */
  static requestInAppReview(nvCallback: any): void;

  /* 9 - Android Specific methods */
  static nativePushPermissionPrompt(callback: any): void;
  static pushPermissionPrompt(
    pushPromptInfo: PushPromptInfo,
    callback: any
  ): void;
  static createNotificationChannel(
    chId: any,
    chName: any,
    chDescription: any,
    chImportance: any,
    enableLights: any,
    shouldVibrate: any,
    lightColor: any,
    soundFileName: any
  ): void;

  static deleteNotificationChannel(channelId: any): void;
  static createNotificationChannelGroup(groupId: any, groupName: any): void;
  static deleteNotificationChannelGroup(groupId: any): void;
  static setAutoStartPermission_android_only(): void;
  static clearPushData(): void;
  static checkPushActive(nv_signal: any): void;
  static isPayloadFromNvPlatform(pushPayload: any, callback: any): void;
  static getNV_FCMPayload(pushPayload: any): void;

   /* 3 - Track Screen */
   static trackScreen(
    screenName: String
  ): void;

  static getSessionData(nvCallback: any): void;

  static notificationClickCallback(callback: any): void;

  /* 10 - iOS Specific methods */
  static scrollViewDidScroll_iOS_only(): void;
  // static promptForPushNotificationsWithUserResponse(callback: any): void;
}

/* 11 - Android Specific Push Prompt Customisation */
export class PushPromptInfo {
  title: String;
  titleTextColor: String;
  description: String;
  descriptionTextColor: String;
  backgroundColor: String;
  buttonOneBorderColor: String;
  buttonOneBackgroundColor: String;
  buttonOneBorderRadius: String;
  buttonOneText: String;
  buttonOneTextColor: String;
  buttonTwoText: String;
  buttonTwoTextColor: String;
  buttonTwoBackgroundColor: String;
  buttonTwoBorderColor: String;
  buttonTwoBorderRadius: String;
  numberOfSessions: String;
  resumeInDays: String;
  numberOfTimesPerSession: String;
}

export type NudgeUiFinalizedEvent = {
  data: string; // Always present (stringified JSON from native)
};

export type NotifyvisitorsNativeDisplayProps = ViewProps & {
  propertyName: string;
  onNudgeUiFinalized?: (event: { response: NudgeUiFinalizedEvent }) => void;
};

export declare const NotifyvisitorsNativeDisplay: React.FC<NotifyvisitorsNativeDisplayProps>;
