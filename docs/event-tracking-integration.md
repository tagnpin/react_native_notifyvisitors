# React Native Event Tracking Guide

This document explains how to track custom events in your React Native application using the NVECTA React Native plugin.

Official Documentation: <br>
https://www.nvecta.com/docs/react-native-tracking-events

<br>

# What is Event Tracking?

Event tracking helps you record user actions performed inside your application.

Examples:

* App Open
* Login
* Signup
* Add To Cart
* Purchase
* Subscription
* Button Click
* Screen Visit

These events help in:

* Analytics
* User segmentation
* Personalized campaigns
* Push automation
* Conversion tracking

NVECTA automatically tracks some system events after SDK integration, while custom events can be tracked manually based on your business requirements.

<br>

# Basic Event Tracking Flow

```text
User Action
    ↓
React Native App
    ↓
NVECTA Plugin
    ↓
NVECTA SDK
    ↓
NVECTA Dashboard Analytics
```

Example:

```text
User clicks "Purchase"
    ↓
Track "purchase_completed" event
    ↓
Event visible in NVECTA dashboard
```

<br>

## Step 1: Import React Native Package

```javascript
import Notifyvisitors from 'react-native-notifyvisitors';
```

The same import syntax can be used with both **JavaScript and TypeScript**.

<br>

## Step 2: Track a Simple Event

Use the `event()` method to track user actions.

```javascript
Notifyvisitors.event('app_launch', {}, '1', '1', (response) => {
    console.log(response);
});
```

### Event Method Parameters

| Parameter       | Description                       |
| --------------- | --------------------------------- |
| `event_name`    | Name of the event                 |
| `attributes`    | Additional event data             |
| `lifeTimeValue` | Score/value associated with event |
| `scope`         | Defines tracking frequency        |
| `callback`      | Returns SDK response              |

<br>

## Step 3: Track Event with Attributes

Attributes help store additional information related to the event.

Example:

```javascript
const attributes = {
  product_name: 'Shoes',
  price: 2999,
  quantity: 1,
  category: 'Fashion'
};

Notifyvisitors.event('purchase_completed', attributes, '10', '1', (response) => {
    console.log(response);
});
```

<br>

# Understanding Scope Values

The `scope` parameter controls how frequently an event should be tracked.

| Scope Value | Description            |
| ----------- | ---------------------- |
| `'1'`       | Track every time       |
| `'2'`       | Track once per session |

Example:

```javascript
Notifyvisitors.event('screen_open', {}, '1', '2',(response) => {});
```

<br>

# Tracking Complex Attributes

You can also pass nested objects and lists.

```javascript
const attributes = {
  name: 'John',
  plan_type: 'Premium',
  address: {
    city: 'Delhi',
    pincode: '110001'
  },
  items: ['Shoes', 'Watch']
};

Notifyvisitors.event('subscription_purchased', attributes, '20', '1', (response) => {
    console.log(response);
});
```

<br>

# Event Response Callback

The plugin provides a callback response after event tracking.

Example response:

```json
{
  "status": "success",
  "eventName": "purchase_completed",
  "message": "Tracking Conversion successful for purchase_completed.",
  "type": 0,
  "callbackType": "event"
}
```

## Event Callback Response Types

The SDK returns different response messages and type codes based on event tracking status.

| STATUS  | MESSAGE                                                                                                        | TYPE                | CALLBACK TYPE |
| ------- | -------------------------------------------------------------------------------------------------------------- | ------------------- | ------------- |
| Success | Tracking Conversion successful for `<event_name>` (ios-only)                                                   | `0`                 | Event         |
| Success | Event accepted for processing (android-only)                                                                   | `0`                 | Event         |
| Fail    | Please check for Event Name, it shouldn't be NULL or EMPTY.                                                    | `1`                 | Event         |
| Fail    | Context not found.                                                                                             | `2.0`, `2.1`, `2.2` | Event         |
| Fail    | Invalid SCOPE value found.                                                                                     | `3.0`, `3.1`, `3.2` | Event         |
| Fail    | `<event_name>` event can be tracked once in `<scope>` days. It will get tracked after `<remaining_days>` days. | `4.0`, `4.1`        | Event         |
| Fail    | `<event_name>` event can be tracked once in `<scope>` days. It will get tracked from tomorrow or later.        | `5`                 | Event         |
| Fail    | Analytics / Event Status is inactive in the NV Panel.                                                          | `6.0`, `6.1`, `6.2` | Event         |
| Fail    | Wrong credentials found. Recheck the NotifyVisitors BrandID and Encryption Key in your app's manifest file.    | `7`                 | Event         |
| Fail    | Something went wrong while processing via the API.                                                             | `8`                 | Event         |
| Fail    | No response available corresponding to this event.                                                             | `9.0`, `9.1`        | Event         |
| Fail    | LIFE-CYCLE Events INACTIVE or account not upgraded.                                                            | `10`                | Event         |
| Fail    | Conversion failed.                                                                                             | `11.0`, `11.1`      | Event         |
| Fail    | Authentication error.                                                                                          | `12.0`, `12.1`      | Event         |
| Fail    | Something went wrong while processing the response.                                                            | `13`                | Event         |
| Fail    | No internet found.                                                                                             | `16.0`, `16.1`      | Event         |
| Fail    | Attribution tracking is disabled in the NV Panel.                                                              | `17.0`              | Event         |

<br>

# Verify Event Tracking

## From React Native Terminal

Run:

```bash
npx react-native run-android
```

Check logs in the terminal or Metro output where applicable.

## From Android Studio Logcat

Open:

```text
Android Studio → Logcat
```

Filter using:

```text
NotifyVisitors
```

Check for logs like:

```text
EVENT !!
EVENT NAME : <event_name> !! ATTRIBUTES : {"attr1":"val1"}
EventName = <event_name>, EventAttr(s) = {"attr1":"val1"}, LifeTimeVal = 7, Scope = 1
```

<br>

# Best Practices

* Keep event names meaningful.
* Use lowercase event names with underscores.
* Keep attribute names consistent.
* Avoid sending sensitive user information.
* Use attributes for better analytics filtering.
* Maintain consistent data types for attributes.
* Use the same event name consistently across your application.

<br>

# Recommended Event Naming Examples

| Action       | Recommended Event      |
| ------------ | ---------------------- |
| App Open     | `app_launch`           |
| Login        | `user_login`           |
| Signup       | `user_signup`          |
| Add To Cart  | `add_to_cart`          |
| Purchase     | `purchase_completed`   |
| Subscription | `subscription_started` |

<br>

# Common Use Cases

## Ecommerce

```javascript
Notifyvisitors.event('add_to_cart', {product_name: 'Sneakers', price: 4999}, '5', '1', (response) => {});
```

## User Registration

```javascript
Notifyvisitors.event('user_signup', {method: 'google'}, '1', '2', (response) => {});
```

<br>

# Summary

With NVECTA React Native event tracking, you can:

* Monitor user activity.
* Analyze customer behavior.
* Create personalized campaigns.
* Trigger automations.
* Improve user engagement.
