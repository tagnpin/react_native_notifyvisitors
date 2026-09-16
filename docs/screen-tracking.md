# Screen Tracking Guide

## 📱 What is Screen Tracking?

Screen tracking monitors which screens (pages) your users visit in your React Native app. Think of it like a visitor counter for each page — it records when users open a screen and how they navigate through the app.

**Simple Example:**

* User opens your app → Home screen is tracked
* User navigates to Profile → Profile screen is tracked
* User goes back to Home → Home is tracked again

## ❓ Why Should You Use Screen Tracking?

### 1. **Understand Your Users**

* See which screens users visit most
* Find out where users spend the most time
* Understand how users navigate through your app

### 2. **Improve Your App**

* Identify slow or buggy screens
* Find screens that users leave quickly and improve them
* Make data-driven decisions about new features

### 3. **Track User Goals**

* See how many users complete important actions
* Find where users get stuck or stop using the app
* Measure if your changes actually helped

### 4. **Debug Problems**

* When a user reports a bug, see which screens they visited before it happened
* Understand the sequence of screens leading to a crash

## 🚀 How to Implement Screen Tracking

### ⚠️ Important: Manual Tracking Required

Screen tracking is **not automatic**. You must manually call the NVECTA screen tracking function when a screen becomes active.

If your application uses a navigation library such as React Navigation, you can integrate screen tracking with navigation state changes to avoid adding tracking code to every screen.

### The Basic Function

```javascript
Notifyvisitors.trackScreen("ScreenName");
```

This one line of code tells the plugin:

> "User is now on `ScreenName`."

## 📋 Implementation Methods

Choose one method below based on your app structure.

### **Method 1: Manual Tracking in Each Screen (Simplest)**

Use this method if you have a small number of screens or want to start with a simple implementation.

You can track a screen when the screen becomes active using React's `useEffect` hook.

#### How it works:

Add the tracking call to the screen component.

**JavaScript:**

```javascript
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Notifyvisitors from "react-native-notifyvisitors";

const HomeScreen = () => {

  useEffect(() => {
    // Track this screen when it opens
    Notifyvisitors.trackScreen("Home");
  }, []);

  return (
    <View>
      <Text>Welcome to Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
```

**TypeScript:**

```typescript
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Notifyvisitors from "react-native-notifyvisitors";

const HomeScreen = () => {

  useEffect(() => {
    // Track this screen when it opens
    Notifyvisitors.trackScreen("Home");
  }, []);

  return (
    <View>
      <Text>Welcome to Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
```

### **Method 2: React Navigation Integration (Recommended)**

If your application uses **React Navigation**, you can track screen changes centrally instead of adding `trackScreen()` to every screen.

This approach is recommended for applications with multiple screens.

#### Step 1: Create a Navigation Reference

Create a navigation reference and track the current screen whenever navigation state changes.

**JavaScript:**

```javascript
import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Notifyvisitors from "react-native-notifyvisitors";

const App = () => {

  const navigationRef = useRef(null);
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}

      onReady={() => {
        routeNameRef.current =
          navigationRef.current?.getCurrentRoute()?.name;

        if (routeNameRef.current) {
          Notifyvisitors.trackScreen(routeNameRef.current);
        }
      }}

      onStateChange={() => {
        const previousRouteName = routeNameRef.current;

        const currentRouteName =
          navigationRef.current?.getCurrentRoute()?.name;

        if (
          currentRouteName &&
          currentRouteName !== previousRouteName
        ) {
          Notifyvisitors.trackScreen(currentRouteName);
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      {/* Your navigators */}
    </NavigationContainer>
  );
};

export default App;
```

**TypeScript:**

```typescript
import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Notifyvisitors from "react-native-notifyvisitors";

const App = () => {

  const navigationRef = useRef<any>(null);
  const routeNameRef = useRef<string | undefined>();

  return (
    <NavigationContainer
      ref={navigationRef}

      onReady={() => {
        routeNameRef.current =
          navigationRef.current?.getCurrentRoute()?.name;

        if (routeNameRef.current) {
          Notifyvisitors.trackScreen(routeNameRef.current);
        }
      }}

      onStateChange={() => {
        const previousRouteName = routeNameRef.current;

        const currentRouteName =
          navigationRef.current?.getCurrentRoute()?.name;

        if (
          currentRouteName &&
          currentRouteName !== previousRouteName
        ) {
          Notifyvisitors.trackScreen(currentRouteName);
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      {/* Your navigators */}
    </NavigationContainer>
  );
};

export default App;
```

#### Step 2: Define Your Screens

For example:

```javascript
<Stack.Navigator>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
  />

  <Stack.Screen
    name="Profile"
    component={ProfileScreen}
  />

  <Stack.Screen
    name="Settings"
    component={SettingsScreen}
  />
</Stack.Navigator>
```

When the user navigates between these screens, the navigation container detects the change and sends the screen name to NVECTA.

**Example Usage:**

```javascript
navigation.navigate("Profile");
```

The screen will be automatically tracked as:

```text
Profile
```

### **Method 3: Screen Focus Tracking**

Use this method when you want to track a screen every time it becomes active.

This is particularly useful when a screen can remain mounted while the user navigates to other screens.

If you use React Navigation, you can use `useFocusEffect`.

**JavaScript:**

```javascript
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Notifyvisitors from "react-native-notifyvisitors";

const ProfileScreen = () => {

  useFocusEffect(
    useCallback(() => {
      Notifyvisitors.trackScreen("Profile");
    }, [])
  );

  return (
    <View>
      <Text>User Profile</Text>
    </View>
  );
};

export default ProfileScreen;
```

**TypeScript:**

```typescript
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Notifyvisitors from "react-native-notifyvisitors";

const ProfileScreen = () => {

  useFocusEffect(
    useCallback(() => {
      Notifyvisitors.trackScreen("Profile");
    }, [])
  );

  return (
    <View>
      <Text>User Profile</Text>
    </View>
  );
};

export default ProfileScreen;
```

This method calls `trackScreen()` whenever the screen receives focus.

### **Method 4: Custom Navigation / Other Navigation Libraries**

If your application does not use React Navigation, you can call `trackScreen()` whenever your application's navigation state changes.

For example:

```javascript
function navigateToProfile() {

  // Your navigation logic
  navigate("Profile");

  // Track the destination screen
  Notifyvisitors.trackScreen("Profile");
}
```

The important requirement is that the NVECTA screen tracking API should be called whenever the user enters a screen that you want to track.

## ✅ Best Practices

### 1. **Use Meaningful Screen Names**

```javascript
// ❌ Bad
Notifyvisitors.trackScreen("Screen1");

// ✅ Good
Notifyvisitors.trackScreen("Home");
Notifyvisitors.trackScreen("UserProfile");
Notifyvisitors.trackScreen("ProductDetail");
```

Use names that clearly identify the screen in the NVECTA panel.

### 2. **Be Consistent**

Use the same screen name every time the user visits that screen.

```text
Good:

Home
UserProfile
ProductDetail

Avoid:

HomeScreen
home
HOME
Home_Page
```

Choose one naming convention and use it consistently throughout your application.

### 3. **Track Important Flows**

Focus on tracking screens that matter to your business and user journeys:

* Login/Signup flows
* Purchase/Checkout flows
* Onboarding screens
* Product screens
* Account/Profile screens
* Error/Help screens

### 4. **Include Context When Needed**

You can include additional context in a screen name when detailed analytics are required.

For example:

```javascript
Notifyvisitors.trackScreen(`ProductDetail_${productId}`);
```

This can help distinguish different product detail screens.

However, avoid creating unnecessarily large numbers of unique screen names if you want aggregated screen-level analytics.

### 5. **Avoid Duplicate Tracking**

If you are using the **React Navigation integration**, do not also call `trackScreen()` manually inside every screen unless you specifically need additional tracking.

For example, avoid doing both:

```text
React Navigation
      ↓
trackScreen("Profile")
      ↓
Profile Screen
      ↓
trackScreen("Profile")
```

This can result in duplicate screen tracking.

Use **one central navigation-based implementation** whenever possible.

## 🔍 Verify Screen Tracking

### From React Native Application

Run your Android application:

```bash
npx react-native run-android
```

Navigate between different screens and check the application logs.

### From Android Studio Logcat

Open:

```text
Android Studio → Logcat
```

Filter using:

```text
Notifyvisitors
```

Example logs:

```text
SCREEN TRACKING !!
SCREEN NAME : Home
```

Navigate to another screen:

```text
SCREEN TRACKING !!
SCREEN NAME : Profile
```

The exact log format may vary depending on the NVECTA SDK version.

## 📊 Example Navigation Flow

```text
App Launch
    ↓
Home
    ↓
Profile
    ↓
Settings
    ↓
Home
```

NVECTA screen tracking:

```text
Home
  ↓
Profile
  ↓
Settings
  ↓
Home
```

This allows screen visits and user navigation behavior to be analyzed on the NVECTA panel.

## 🎯 Recommended Implementation

For most React Native applications using React Navigation, the recommended approach is:

```text
User Opens App
      ↓
NavigationContainer
      ↓
Detect Current Screen
      ↓
Notifyvisitors.trackScreen()
      ↓
NVECTA
```

This keeps screen tracking centralized and avoids adding tracking code to every screen.

## Summary

Screen tracking helps you understand how users navigate through your React Native application.

With NVECTA screen tracking, you can:

* Track screen visits
* Understand user navigation
* Identify important user journeys
* Analyze frequently visited screens
* Identify screens where users drop off
* Improve the application based on user behavior

**Remember:** Screen tracking is not automatic. Call `Notifyvisitors.trackScreen()` whenever a user enters a screen, or integrate it centrally with your navigation solution.

For applications using React Navigation, the **NavigationContainer integration is recommended** because it provides centralized screen tracking with minimal changes to individual screens.
