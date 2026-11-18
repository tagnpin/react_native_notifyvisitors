# Notification Runtime Permission (Android)

Starting with Android 13 (API Level 33), applications must request notification permission at runtime before sending push notifications.

Official Documentation: <br>
https://www.nvecta.com/docs/react-native-notification-runtime-permission-android

---

NVECTA provides three different ways to handle notification permission requests:

1. Use your own custom permission UI.
2. Use NVECTA's customizable permission prompt.
3. Use the native Android system permission prompt.

<br>

# Import Package

```javascript
import Notifyvisitors from 'react-native-notifyvisitors';
import { PushPromptInfo } from 'react-native-notifyvisitors';
```

---

# Option 1: Use Your Own Permission UI

If your application already has a custom permission screen or onboarding flow, you can inform the NVECTA SDK whether the user allowed or denied notification permission.

```javascript
Notifyvisitors.checkPushActive(isAllowed);
```

## Parameters

| Parameter   | Type    | Description                                                                      |
| ----------- | ------- | -------------------------------------------------------------------------------- |
| `isAllowed` | boolean | Pass `true` if the user granted notification permission, otherwise pass `false`. |

## Example

```javascript
Notifyvisitors.checkPushActive(true);
```

## When to Use

* You already have a custom-designed permission screen.
* You want full control over the permission request flow.
* You want to show an educational screen before triggering the Android permission dialog.

<br>

# Option 2: Use NVECTA's Custom Permission Prompt

NVECTA provides pre-built permission prompt templates that can be customized to match your application's branding.

The prompt contains:

* Title
* Description
* Allow Button
* Deny Button

## Configure Prompt Design

**JavaScript**

```javascript
let design = new PushPromptInfo();
design.title = "Test Title";
design.titleTextColor = "#000000";
design.description = "Enable Push Notifications on Your Device !!";
design.descriptionTextColor = "#000000";
design.backgroundColor = "#EBEDEF";
design.buttonOneBorderColor = "#6db76c";
design.buttonOneBackgroundColor = "#26a524";
design.buttonOneBorderRadius = "0";
design.buttonOneText = "Allow";
design.buttonOneTextColor = "#FFFFFF";
design.buttonTwoText = "Cancel";
design.buttonTwoTextColor = "#FFFFFF";
design.buttonTwoBackgroundColor = "#FF0000";
design.buttonTwoBorderColor = "#6db76c";
design.buttonTwoBorderRadius = "0";
design.numberOfSessions = "3";
design.resumeInDays = "1";
design.numberOfTimesPerSession = "6";

Notifyvisitors.pushPermissionPrompt(design, function (response: any) {
      //do your work here
});
```

**TypeScript**

```typescript
const design = new PushPromptInfo();
design.title = 'Test Title';
design.titleTextColor = '#000000';
design.description = 'Enable Push Notifications on Your Device !!';
design.descriptionTextColor = '#000000';
design.backgroundColor = '#EBEDEF';
design.buttonOneBorderColor = '#6db76c';
design.buttonOneBackgroundColor = '#26a524';
design.buttonOneBorderRadius = '0';
design.buttonOneText = 'Allow';
design.buttonOneTextColor = '#FFFFFF';
design.buttonTwoText = 'Cancel';
design.buttonTwoTextColor = '#FFFFFF';
design.buttonTwoBackgroundColor = '#FF0000';
design.buttonTwoBorderColor = '#6db76c';
design.buttonTwoBorderRadius = '0';
design.numberOfSessions = '3';
design.resumeInDays = '1';
design.numberOfTimesPerSession = '6';

Notifyvisitors.pushPermissionPrompt(design, (response: any) => {
    //do your work here
});
```

<br>

# Session Control Parameters

## numberOfSessions

Determines how many app sessions the prompt should be shown after a user dismisses it.

A new session is created when:

* The app is launched for the first time.
* The user returns after 30 minutes of inactivity.

Example:

```javascript
design.numberOfSessions = '3';
```

The prompt will appear for the next 3 sessions if the user continues to dismiss it.

---

## resumeInDays

Controls when the prompt should reappear after all configured sessions are exhausted.

Example:

```javascript
design.setResumeInDays = '10';
```

The prompt will remain hidden for 10 days and become eligible to show again from the 11th day.

---

## setNumberOfTimesPerSession

Controls the maximum number of times the prompt can be shown within a single session.

```javascript
design.setNumberOfTimesPerSession = '6';
```

---

# Option 3: Use Native Android Permission Prompt

If you prefer the standard Android system permission dialog, use:

```javascript
Notifyvisitors.nativePushPermissionPrompt(function(callback: JSON){
        //do your work here
});
```

## Sample Response

```json
{
  "status": "success",
  "message": "Popup launched. User granted permission."
}
```

## Important

> Android generally allows notification permission requests only a limited number of times.

> If the user repeatedly denies permission, the application may need to redirect them to the device's notification settings page to enable notifications manually.

---

# Callback Responses

The callback from both Option 2 and Option 3 can return the following responses.

| Status  | Message                                                                        |
| ------- | ------------------------------------------------------------------------------ |
| Success | Push permission is already active on this device.                              |
| Success | Popup launched. User granted permission.                                       |
| Success | Push Notification Settings is enabled by default on Android versions below 13. |
| Success | Push Notification Settings is ON.                                              |
| Fail    | Popup launched. User denied NVECTA's custom permission prompt.                 |
| Fail    | Popup launched. User denied permission.                                        |
| Error   | Something went wrong with error `<error>`                                      |

---

# Recommended Approach

For the best user experience:

1. Show an educational screen explaining the benefits of notifications.
2. Display NVECTA's custom permission prompt (Option 2).
3. Trigger the Android system permission dialog.
4. If permission is denied, guide users to app notification settings.

This approach generally results in higher notification opt-in rates because users understand why the permission is being requested before seeing the system prompt.
