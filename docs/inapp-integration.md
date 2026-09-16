# React Native In-App Notification Guide

This document explains how to integrate, trigger, manage, and receive callbacks from In-App Notifications using the NVECTA React Native plugin.

Official Documentation:
https://www.nvecta.com/docs/react-native-in-app-notification

<br>

# What are In-App Notifications?

In-App Notifications are messages displayed directly inside the application while the user is actively using it.

Unlike push notifications, these messages only appear when the application is open.

They can be used for:

* Promotional offers
* Discounts
* Product recommendations
* User onboarding
* Feature announcements
* Surveys
* Subscription reminders
* Engagement campaigns

<br>

# Basic In-App Flow

```text
User Opens App
       ↓
SDK Syncs Campaigns
       ↓
User Performs Action
       ↓
Trigger Condition Matched
       ↓
In-App Notification Displayed
       ↓
User Interaction Recorded
```

<br>

## Import Package

```javascript
import Notifyvisitors from 'react-native-notifyvisitors';
```

The same import syntax can be used with both **JavaScript and TypeScript**.

<br>

# Display In-App Notifications

The plugin provides the `showInAppMessage()` method to evaluate and display In-App Notifications based on configured targeting rules.

## Function

```javascript
Notifyvisitors.showInAppMessage(tokens, rules, fragmentName, callback);
```

<br>

# Basic Usage

```javascript
Notifyvisitors.showInAppMessage(null, null, null, callback);
```

## Parameters

| Parameter      | Type          | Description                                           |
| -------------- | ------------- | ----------------------------------------------------- |
| `tokens`       | Object | null | Used for custom targeting values.                     |
| `rules`        | Object | null | Used for custom campaign conditions.                  |
| `fragmentName` | String | null | Not required in React Native. Pass `null`.            |
| `callback`     | Function      | Optional callback for banner and survey interactions. |

<br>

# Recommended Usage

Call the `showInAppMessage()` method once per screen.

For example, using React's `useEffect`:

```javascript
import React, { useEffect } from 'react';
import Notifyvisitors from 'react-native-notifyvisitors';

const HomeScreen = () => {

  useEffect(() => {
    const customRules = {
      category: 'flowers'
    };

    const dynamicTokens = {
      name: 'ravi',
      age: 49
    };

    Notifyvisitors.showInAppMessage(dynamicTokens, customRules, null, function(callback: any) {
        console.log('Banner Response =', callback1);
    });

  }, []);

  return (
    // Your screen UI
  );
};

export default HomeScreen;
```

This allows the plugin to evaluate whether any In-App campaign should be displayed on that screen.

# Using Callback Function

You can pass a callback function if you want to receive responses when users interact with banners or surveys.

## Function with Callback

```javascript
Notifyvisitors.showInAppMessage(null, null, null, function(callback: any) {
    console.log('Banner Response =', response);
});
```

<br>

# Callback Purpose

The callback helps you:

* Detect banner clicks
* Detect survey submissions
* Track user actions
* Perform custom navigation
* Log campaign responses

Example:

```javascript
const customRules = {
  category: 'flowers'
};

const dynamicTokens = {
  name: 'ravi',
  age: 49
};

Notifyvisitors.showInAppMessage(dynamicTokens, customRules, null, function(callback: any) {
    // Do your task here
});
```

# Callback 1 Response Data

The first callback (`callback1`) is triggered when a user interacts with an In-App Banner or Survey.

| Status  | Event Name        | Message                        | Type                                        | Callback Type |
| ------- | ----------------- | ------------------------------ | ------------------------------------------- | ------------- |
| Success | Banner Impression | InApp banner shown.            | `15.12`, `15.13`, `15.14`, `15.17`, `15.18` | `banner`      |
| Success | Banner Clicked    | InApp Banner clicked.          | `15.0` to `15.11`, `15.15`, `15.16`         | `banner`      |
| Success | Survey Attempt    | Survey attempted successfully. | `14.0`, `14.2`                              | `survey`      |
| Success | Survey Submit     | Survey submitted successfully. | `14.1`, `14.3`                              | `survey`      |

## Example Callback 1 Response

```json
{
  "status": "success",
  "eventName": "Banner Clicked",
  "message": "InApp Banner clicked.",
  "type": 15.0,
  "callbackType": "banner"
}
```

# Callback 2 Response Data

The second callback (`callback2`) provides information about available In-App notifications, banners, and surveys.

## Success Responses

| Status  | Message                                     | Type   | Notifications Shown | Notifications Not Shown |
| ------- | ------------------------------------------- | ------ | ------------------- | ----------------------- |
| Success | Found some active & inactive notifications. | `19.1` | `[133,168]` or `[]` | `[146]` or `[]`         |

## Failure Responses

| Status | Message                                                                                                                                            | Type                   |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Fail   | No internet found                                                                                                                                  | `19.0`                 |
| Fail   | No banner/survey is active. If active on NV dashboard, kindly check DEBUG/LIVE mode of your app and mode in NV dashboard for active notifications. | `19.3`                 |
| Fail   | Something went wrong with error ->                                                                                                                 | `19.2`, `19.5`, `19.6` |
| Fail   | No data found regarding any banner/survey                                                                                                          | `19.4`                 |

## Example Callback 2 Response

```json
{
  "status": "success",
  "message": "Found some active & inactive notifications.",
  "type": 19.1,
  "notificationsShown": [133, 168],
  "notificationsNotShown": [146]
}
```

---
