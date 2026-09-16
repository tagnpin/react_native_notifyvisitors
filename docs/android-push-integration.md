# Push Notifications

This document explains additional push notification methods available in the NVECTA React Native SDK, including notification preferences, subscription management, callback handling, and push interaction tracking.

Official Documentation:
https://www.nvecta.com/docs/push-notifications#other-methods

---

## Import Package

```javascript
import Notifyvisitors from 'react-native-notifyvisitors';
```

The same import syntax can be used with both JavaScript and TypeScript.

---

## (1) Configure FCM's Sender ID and Private Key

Configure your Firebase project by providing the FCM Sender ID, Project ID, and a Service Account Private Key JSON in the NVECTA dashboard. This allows NVECTA to securely authenticate with Firebase Cloud Messaging (FCM) and send push notifications to your Android application.

https://www.nvecta.com/docs/push-notifications#configure-fcms-sender-id-and-private-key

---

<br>

## (2) Configure Icons -- IMPORTANT

| For Devices Below Lollipop                                                                                                                                                                                                                     | For Lollipop & Above Devices                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Devices below Lollipop show only one icon in push notifications, which can be configured from the NVECTA panel.<br><br>To change the default notification icon, replace `sm_push.png` in your app's module `app/src/main/res/drawable` folder. | Devices running Lollipop and above display two notification icons: a **Small Push Icon** and a **Large Push Icon**.<br><br>**Large Push Icon:** Configured from the NVECTA panel and displayed as the main notification icon. If no large icon is configured, the small icon is used instead.<br><br>**Small Push Icon:** Must follow Android's notification icon guidelines. It should be a white icon on a transparent background; otherwise, it may appear as a solid white square. |

### Small Icon

#### Supported Densities and Sizes

| Density | Size (px) | File Path                               |
| ------- | --------- | --------------------------------------- |
| MDPI    | 24 × 24   | `res/drawable-mdpi/sm_push_logo.png`    |
| HDPI    | 36 × 36   | `res/drawable-hdpi/sm_push_logo.png`    |
| XHDPI   | 48 × 48   | `res/drawable-xhdpi/sm_push_logo.png`   |
| XXHDPI  | 72 × 72   | `res/drawable-xxhdpi/sm_push_logo.png`  |
| XXXHDPI | 96 × 96   | `res/drawable-xxxhdpi/sm_push_logo.png` |

> **Note**
>
> To override the default small push icon, add your icon as `sm_push_logo.png` in your app module's `app/src/main/res/drawable` folder.

### Creating a Small Notification Icon

To generate a proper Android notification icon:

1. Open **[Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-notification.html#source.type=clipart&source.clipart=ac_unit&source.space.trim=1&source.space.pad=0&name=ic_stat_ac_unit)**.
2. Select **Notification Icon Generator**.
3. Under **Source Type**, choose **Image**.
4. Upload your monochrome icon.
5. Enter the icon name as **`sm_push_logo`**.
6. Download the generated assets as a ZIP file.
7. Extract the ZIP and copy all generated drawable folders into your Android project.

> **Important**
>
> The notification small icon must be **white on a transparent background**. Android only uses the alpha channel of the image when rendering notification icons.

### Small Icon Accent Color

Android 5.0+ enforces notification icons to be white and transparent, but allows an **accent color** to be applied to the notification.

Add the following color resource to your project's `res/values/colors.xml` file:

```xml
<resources>
    <!-- Default accent color for NVECTA push notifications -->
    <color name="push_small_icon_background">#a03844</color>
</resources>
```

Some device manufacturers may render notification icons differently and display colored images directly. However, following Android's monochrome icon guidelines ensures consistent behavior across all devices.

### Large Icon

The large notification icon appears:

* **Left side** of notification text on Android 4.0.3–6.0.
* **Right side** of notification text on Android 7.0+.

If no large icon is configured, the application icon will be used automatically.

#### Recommended Size: **200 × 200 pixels**

---

<br>

## (3) Push Notification Runtime Permission -- IMPORTANT

Android 13 (API level 33) and higher supports runtime permission for sending non-exempt (including Foreground Services (FGS)) notifications from an app. We recommend targeting Android 13 or higher as soon as possible to benefit from this feature's additional control and flexibility.

NVECTA supports three different ways to request notification permission:

1. **Use your own custom permission flow** *(shown below)*
2. **Use NVECTA's customizable permission prompt**
3. **Use the native Android system permission dialog**

For comprehensive implementation instructions, configuration options, callback handling, and best practices for all three permission request approaches, refer to the **[Notification Runtime Permission (Android)](https://github.com/tagnpin/react-native-notifyvisitors/blob/dev/docs/android-push-runtime-permission.md)** guide.

### Option 1 — Use Your Own Permission Flow

If your application already has a custom onboarding or permission screen, simply inform the NVECTA SDK whether the user granted or denied notification permission.

```javascript
Notifyvisitors.checkPushActive(isAllowed);
```

### Parameters

| Parameter   | Type      | Description                                                                      |
| ----------- | --------- | -------------------------------------------------------------------------------- |
| `isAllowed` | `boolean` | Pass `true` if the user granted notification permission, otherwise pass `false`. |

### Example

```javascript
Notifyvisitors.checkPushActive(true);
```

<br>

---

<br>

## (4) Get FCM/APNS Token

The FCM (Android) or APNS (iOS) token is a unique device identifier generated by the push notification service. NVECTA uses this token to deliver push notifications to a specific device.

You can retrieve the token after the user grants notification permission and the push service registration is completed successfully.

```javascript
Notifyvisitors.getRegistrationToken(callback);
```

Refer to the example below to understand its implementation.

```javascript
Notifyvisitors.getRegistrationToken(function(callback) {
    // Do your work here
});
```

---

<br>

## (5) Send Push Payload to NVECTA SDK

If your application already uses another push notification provider such as Firebase Cloud Messaging (FCM), OneSignal, CleverTap, MoEngage, WebEngage, or a custom push implementation, you may already have a custom `FirebaseMessagingService` that receives all incoming push notifications.

In such cases, NVECTA notifications must be explicitly forwarded to the NVECTA SDK so they can be processed correctly for notification display, click tracking, deep linking, CTA actions, and analytics.

### Why is this required?

When multiple push providers are integrated into the same application, all push messages are typically received by a single `FirebaseMessagingService`. Since NVECTA does not directly receive these messages, you must identify NVECTA notifications and pass them to the NVECTA SDK.

Without this step:

* NVECTA notifications may not be displayed correctly.
* Deep links and CTA actions may not work.
* Notification click tracking may be lost.
* Push analytics and delivery reporting may be affected.

Use the following methods from your React Native application:

```javascript
Notifyvisitors.isPayloadFromNvPlatform(pushPayload, (response) => {
    if (response === 'true') {
        Notifyvisitors.getNV_FCMPayload(pushPayload);
    }
});
```

Refer to the example below to better understand the implementation.

```javascript
import messaging from '@react-native-firebase/messaging';
import NotifyVisitors from 'react-native-notifyvisitors';

messaging().onMessage(async (message) => {
    if (message.data && Object.keys(message.data).length > 0) {

        const source = message.data['nv_source'];
        if (source === '1') {

            const jsonData = JSON.stringify(message.data);

            Notifyvisitors.isPayloadFromNvPlatform(jsonData, (response) => {
                    console.log('Is Payload From NV Platform:', response);

                    if (response === 'true' || response === true) {
                        const nvPayload =  Notifyvisitors.getNV_FCMPayload(jsonData);
                        console.log('NV FCM Payload:', nvPayload);
                    } else {
                        // Handle other notifications
                        console.log('This is not a NVECTA notification');
                    }
                }
            );

        } else {
            // Handle other notifications
            console.log('Notification is not from NVECTA');
        }
    }
});
```

### Method Description

| Method                                        | Description                                                                   |
| --------------------------------------------- | ----------------------------------------------------------------------------- |
| `isPayloadFromNvPlatform(jsonData, callback)` | Checks whether the incoming push notification belongs to NVECTA.              |
| `getNV_FCMPayload(jsonData)`                  | Passes the NVECTA notification payload to the SDK for processing and display. |

### Recommended Flow for Multiple Push Providers

```text
Incoming Push Notification
            │
            ▼
  FirebaseMessagingService
            │
            ▼
 Is payload from NVECTA?
      ├── Yes ──► Forward to NVECTA SDK
      │
      └── No ──► Handle using CleverTap / OneSignal /
                 Firebase / MoEngage / Other Provider
```

### Important

> If your application uses a custom `FirebaseMessagingService`, always forward NVECTA notifications to the NVECTA SDK. This ensures NVECTA campaigns continue to work correctly alongside other push notification providers.

---

<br>

## (6) [Push Notification Channels](/docs/android-push-notification-channels.md)

Starting with Android Oreo (Android 8.0), every notification must belong to a **Notification Channel**.

You can think of a Notification Channel as a folder or category for notifications. Instead of treating all notifications the same, Android groups them by purpose.

For example, a social media app could have:

* **Messages** channel for chat notifications.
* **Activity** channel for likes and comments.
* **Promotions** channel for marketing messages.

Users can then decide which categories they want to receive notifications from. For instance, they may choose to receive chat messages but turn off promotional notifications.

---

<br>
