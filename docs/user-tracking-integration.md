# React Native User Tracking Guide

This document explains how to identify and track users in your React Native application using the NVECTA React Native SDK.

Official Documentation: <br>
https://www.nvecta.com/docs/react-native-tracking-users

<br>

# What is User Tracking?

User tracking allows you to associate app activity, events, purchases, and engagement data with a specific user profile.

By identifying users, you can:

* Build unified customer profiles
* Personalize campaigns and notifications
* Track user journeys across sessions
* Segment users based on behavior
* Measure retention and engagement

In NVECTA, user profiles are created automatically and can later be linked to known user information such as email, mobile number, customer ID, or other identifiers.

<br>

# Basic User Tracking Flow

```text
User Registers / Logs In
          ↓
React Native Application
          ↓
Identify User
          ↓
NVECTA User Profile Updated
          ↓
Events & Campaigns Linked To User
```

Example:

```text
User signs up
      ↓
Set Email & Mobile Number
      ↓
NVECTA creates/updates user profile
      ↓
Future events are mapped to the same user
```

<br>

## Step 1: Import React Native Package

Import the NVECTA React Native package into your JavaScript or TypeScript file.

**JavaScript:**

```javascript
import Notifyvisitors from 'react-native-notifyvisitors';
```

**TypeScript:**

```typescript
import Notifyvisitors from 'react-native-notifyvisitors';
```

> The import statement is the same for both JavaScript and TypeScript.

<br>

## Step 2: Create User Profile

Use the User Tracking API after successful user login or registration.

**JavaScript / TypeScript:**

```javascript
const attributes = {
  email: "john@example.com",
  mobile: "9876543210",
  name: "John Doe"
};

Notifyvisitors.setUserIdentifier(attributes, function(callback: JSON){
       //do your task here
});
```

### Common User Attributes

The following attributes are commonly used while identifying users.

| Attribute         | Description                |
| ----------------- | -------------------------- |
| email             | User email address         |
| mobile            | Mobile number              |
| name              | Full name                  |
| userID            | Unique customer identifier |
| gender            | User gender                |
| city              | User city                  |
| country           | User country               |
| subscription_type | Current plan               |
| customer_type     | Premium, Free, etc.        |

<br>

## Step 3: Track Additional User Attributes

You can enrich user profiles with custom attributes.

**JavaScript / TypeScript:**

```javascript
const attributes = {
  email: "john@example.com",
  name: "John Doe",
  city: "Delhi",
  plan: "Premium",
  customer_type: "Gold"
};

Notifyvisitors.setUserIdentifier(attributes, function(callback: JSON){
       //do your task here
});
```

<br>

# User Profile Best Practices

### Identify Users After Login

Always call user tracking after successful login or signup.

```text
Login Success
      ↓
Track User
      ↓
Track Events
```

### Use Consistent Identifiers

Use the same email, mobile number, or customer ID across sessions.

```text
Good:
john@example.com

Bad:
john@gmail.com
john.doe@gmail.com
```

### Update User Properties When Changed

Whenever user details change, update the profile again.

Examples:

* Email updated
* Mobile number changed
* Subscription upgraded
* User moved to another city

<br>

# Example: User Registration

```javascript
const attributes = {
  name: "John Doe",
  email: "john@example.com",
  mobile: "9876543210"
};

Notifyvisitors.setUserIdentifier(attributes, function(callback: JSON){
       //do your task here
});
```

After this, any event tracked by the SDK becomes associated with the identified user profile.

<br>

# Example: Subscription Upgrade

```javascript
const attributes = {
  email: "john@example.com",
  subscription_type: "Premium",
  membership_status: "Active"
};

Notifyvisitors.setUserIdentifier(attributes, function(callback: JSON){
       //do your task here
});
```

## User Tracking Callback Response

| STATUS  | MESSAGE                           | TYPE |
| ------- | --------------------------------- | ---- |
| Success | User profile updated successfully | `0`  |
| Fail    | Invalid user data found           | `1`  |
| Fail    | Context not found                 | `2`  |
| Fail    | Authentication failed             | `3`  |
| Fail    | No internet connection found      | `4`  |
| Fail    | User tracking disabled from panel | `5`  |
| Fail    | Internal processing error         | `6`  |

<br>

# Verify User Tracking

## From React Native Terminal

Run:

```bash
npx react-native run-android
```

Look for user tracking logs in the Metro terminal or Android Studio Logcat.

Example:

```text
SET USER IDENTIFIER !!
!! ATTRIBUTES : {"name":"Ram"}
User Response = {"status":"success","message":"User registered successfully"}
```

## From Android Studio Logcat

Open:

```text
Android Studio → Logcat
```

Filter using:

```text
NotifyVisitors
```

Example logs:

```text
SET USER IDENTIFIER !!
!! ATTRIBUTES : {"name":"Ram"}
```

<br>

# Event Tracking After User Identification

## Overview

To ensure events are properly mapped to user profiles on the NVECTA panel, you must wait for the user identification callback response before triggering any events.

**Important:** If you call event tracking and user identification in parallel, the SDK may not be able to merge the data correctly on the panel because the user profile hasn't been fully synchronized yet.

## Correct Implementation Flow

```text
User Login Triggered
       ↓
Call setUserIdentifier()
       ↓
Wait for Callback Response
       ↓
Check Response Status
       ↓
If Success: Track Events
       ↓
Events Get Mapped to User Profile
```

## Implementation: Wait for User Identification Before Events

**DO NOT do this (Parallel calls):**

```javascript
// ❌ WRONG - Events triggered in parallel
function handleLogin(email) {

  // User identification
  Notifyvisitors.setUserIdentifier({email: email}, function(callback: JSON){
       //do your task here
  });

  // Event triggered immediately
  // before user synchronization completes
  Notifyvisitors.event("login_successful", {}, "1", "1", (response) => {
      console.log(response);
  });
}
```

In this approach, the event may be tracked before the user profile is fully synchronized, resulting in the event not being associated with the correct user on the NVECTA panel.

---

**DO this instead (Sequential calls):**

```javascript
// ✅ CORRECT - Wait for user identification callback
function handleLogin(email) {

  const userAttributes = {
    email: email,
    name: "John Doe"
  };

  // Step 1: Identify User
  Notifyvisitors.setUserIdentifier(userAttributes, function(callback: JSON) {
      console.log("User Response:", response);

      // Step 2: Check if user identification was successful
      if (response && response.status === "success") {

        // Step 3: Only then track the event
        trackLoginEvent();

      } else {
        console.log("User identification failed:", response);
      }
  });
}

// Step 4: Track event in a separate function
function trackLoginEvent() {

  const eventData = {
    login_method: "email",
    timestamp: new Date().toISOString()
  };

  Notifyvisitors.event("login_successful", eventData, "1", "1", (response) => {
      console.log("Event tracked:", response);
  });
}
```

## Advanced Implementation: Using Async/Await

For cleaner code, use the async/await pattern to handle sequential operations.

```javascript
// ✅ CLEAN - Using async/await
async function handleLoginWithAwait(email, password) {

  try {

    // Step 1: Call setUserIdentifier and wait for response
    const identifyResponse =
      await Notifyvisitors.setUserIdentifier({
        email: email,
        name: "User Name"
      });

    console.log(
      "User identification response:",
      identifyResponse
    );

    // Step 2: Verify success before proceeding
    if (
      identifyResponse &&
      identifyResponse.status === "success"
    ) {

      // Step 3: Now safely track the event
      const eventResponse =
        await Notifyvisitors.event(
          "login_successful",
          {
            email: email,
            timestamp: new Date().toISOString(),
            login_method: "email"
          }
        );

      console.log(
        "Event tracked successfully:",
        eventResponse
      );

    } else {

      console.log(
        "User identification failed, event not tracked"
      );
    }

  } catch (error) {

    console.error(
      "Error during login process:",
      error
    );
  }
}
```

<br>

## Key Takeaways

1. **Always wait for `setUserIdentifier()` callback** before tracking events
2. **Check the response status** to ensure user identification was successful
3. **Use async/await pattern** for cleaner, more maintainable code
4. **Verify response is not null** before accessing its properties
5. **Handle errors gracefully** with try-catch blocks
6. **Track events only after user sync completes** to ensure proper mapping on the NVECTA panel

<br>

# Recommended Flow

```text
App Launch
    ↓
User Login
    ↓
Track User Profile
    ↓
Wait for Response
    ↓
Track Custom Events
    ↓
Send Push Notifications
    ↓
Create User Segments
```

<br>

# Best Practices

* Track users immediately after login/signup
* Always use a unique identifier
* Keep profile information updated
* Avoid storing sensitive information
* Maintain consistent attribute naming
* Use custom attributes for segmentation
* **Wait for user identification callback before tracking events**
* **Check response status before proceeding**
* **Use async/await for sequential operations**

<br>

# Common Use Cases

## User Signup

```javascript
Notifyvisitors.setUserIdentifier({
  email: "john@example.com",
  name: "John Doe"
}, function(callback: JSON) {
    console.log(response);
});
```

## User Login

```javascript
Notifyvisitors.setUserIdentifier({
  userID: "12345",
  email: "john@example.com"
}, function(callback: JSON) {
    console.log(response);
});
```

## Premium Subscription

```javascript
Notifyvisitors.setUserIdentifier({
  userID: "12345",
  subscription: "Premium"
}, function(callback: JSON) {
    console.log(response);
  });
```

<br>

# Summary

User tracking enables NVECTA to create a unified customer profile by linking user attributes, events, purchases, and engagement activities to a single user.

With proper user identification, you can:

* Build customer profiles
* Segment audiences
* Personalize campaigns
* Improve retention
* Analyze customer behavior

**Remember:** Always wait for the user identification callback response before tracking events to ensure proper data synchronization and event mapping on the NVECTA panel.
