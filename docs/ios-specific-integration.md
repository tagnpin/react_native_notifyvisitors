# iOS Integration

This guide explains the iOS-specific configuration required to integrate the NVECTA React Native plugin into your React Native application.

**Official Documentation:**
https://www.nvecta.com/docs/react-native-ios-integration

---

## Overview

The iOS integration consists of the following steps:

1. Install iOS dependencies
2. Configure SDK credentials
3. Configure the AppDelegate
4. Initialize the SDK
5. Verify the integration
6. Configure Push Notifications (optional)

---

## Prerequisites

Before proceeding, ensure that:

- React Native is installed and configured.
- Xcode is installed.
- CocoaPods is installed.
- The NotifyVisitors React Native plugin has been installed in your React Native app.
- You have your **Brand ID** and **Secret Key** from the NVECTA Dashboard.

---

## 1. Install iOS Dependencies

From the root directory of your `React Native application` project, install the iOS dependencies by running:

```bash
npx pod-install ios
```

---

## 2. Configure SDK Credentials

Open the iOS project using:

```text
ios/<YourReactNativeAppName>.xcworkspace
```

Open **Info.plist** and add the following keys.

```xml
<key>nvBrandID</key>
<integer>YOUR_BRAND_ID</integer>

<key>nvSecretKey</key>
<string>YOUR_SECRET_KEY</string>

<key>nvPushCategory</key>
<string>nvpush</string>
```

### SDK Configuration

| Key              | Type   | Description                                                  |
| ---------------- | ------ | ------------------------------------------------------------ |
| `nvBrandID`      | Number | Your NotifyVisitors Brand ID                                 |
| `nvSecretKey`    | String | Your NotifyVisitors Secret Key                               |
| `nvPushCategory` | String | Push notification category. Use the default value: `nvpush`. |

> **Tip**
>
> You can edit `Info.plist` either as a **Property List** or as **Source Code**. Both approaches produce the same result.

> **Important**
>
> Replace the sample values above with your actual Brand ID and Secret Key available from the NVECTA Dashboard.

## 🔑 Where can I find my `BrandID` and `Encryption Key`?

Replace `YOUR_NVECTA_BRAND_ID` and `YOUR_NVECTA_BRAND_SECRET_KEY` with your actual NVECTA credentials.

You can obtain these credentials in one of the following ways:

- Retrieve them yourself from the **NVECTA Dashboard**.

**📍 NVECTA Dashboard**  
https://console.notifyvisitors.com/brand/admin/integration_javaScriptCode?active_tab=direct_integration

**📖 Detailed Guide**  
https://support.nvecta.com/support/solutions/articles/84000395836-how-to-get-brand-id-encryption-key-and-api-keys-in-nvecta

---

## 3. Configure AppDelegate

The SDK uses iOS application lifecycle callbacks to support:

- Session tracking
- Analytics
- Deep-link handling
- SDK lifecycle management

### Import the SDK

Before calling any NotifyVisitors APIs from your `AppDelegate`, import the SDK.

### Swift

If your Swift `AppDelegate` cannot access `NotifyvisitorsPlugin`, create an **Objective-C Bridging Header** and import:

```objc
#import "RNNotifyvisitors.h"
```

Name the bridging header using:

```text
YOUR_PROJECT_NAME-Bridging-Header.h
```

Example:

```text
Runner-Bridging-Header.h
```

Configure the path under:

**Target → Build Settings → Swift Compiler - General → Objective-C Bridging Header**

Example:

```text
Runner/Runner-Bridging-Header.h
```

> **Note**
>
> A bridging header is only required if your Swift project cannot directly access the Objective-C plugin APIs.

<details>
<summary>Objective-C</summary>

Import the SDK header in `AppDelegate.m`:

```objc
#import "RNNotifyvisitors.h"
```

</details>

### AppDelegate Integration

Forward the following callbacks from your `AppDelegate`.

### Swift

```swift
import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UserNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "AwesomeProject",
      in: window,
      launchOptions: launchOptions
    )

    RNNotifyvisitors.nvInitialize()

    return true
  }

  func applicationDidEnterBackground(_ application: UIApplication) {
    RNNotifyvisitors.applicationDidEnterBackground(application)
  }
  func applicationDidBecomeActive(_ application: UIApplication) {
    RNNotifyvisitors.applicationDidBecomeActive(application)
  }
  func applicationWillEnterForeground(_ application: UIApplication) {
    RNNotifyvisitors.applicationWillEnterForeground(application)
  }

  func applicationWillTerminate(_ application: UIApplication) {
    RNNotifyvisitors.applicationWillTerminate()
  }

  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    RNNotifyvisitors.openUrl(with: app, url: url)

    return true
  }

}
```

<details>
<summary>Objective-C</summary>

```objective-c
#import "AppDelegate.h"
#import "RNNotifyvisitors.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.moduleName = @"AwesomeProject";
    self.initialProps = @{};

    [RNNotifyvisitors nvInitialize];

    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  [RNNotifyvisitors applicationDidEnterBackground: application];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
  [RNNotifyvisitors applicationWillEnterForeground: application];
}
- (void)applicationDidBecomeActive:(UIApplication *)application {
  [RNNotifyvisitors applicationDidBecomeActive: application];
}

- (void)applicationWillTerminate:(UIApplication *)application {
  [RNNotifyvisitors applicationWillTerminate];
}

-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  [RNNotifyvisitors openUrlWithApplication:app url: url];
  return  YES;
}

@end
```

</details>

### Lifecycle Methods

| Method                             | Description                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| `nvInitialize()`                   | Initializes the SDK.                                                 |
| `applicationDidEnterBackground()`  | Notifies the SDK when the application enters the background.         |
| `applicationWillEnterForeground()` | Notifies the SDK when the application returns to the foreground.     |
| `applicationDidBecomeActive()`     | Starts or resumes SDK session tracking.                              |
| `applicationWillTerminate()`       | Allows the SDK to perform cleanup before the application terminates. |
| `openUrl()`                        | Handles custom URL schemes and deep links.                           |

> **Note**
>
> These lifecycle callbacks are required for proper SDK functionality, including analytics, session tracking, and deep-link processing.

---

## 4. Verify the Integration

Build and launch the application.

Verify that:

- The application builds successfully.
- The SDK initializes without errors.
- Initialization logs appear in the Xcode console.
- No runtime exceptions are reported.

If the SDK does not initialize correctly:

1. Verify that `RNNotifyvisitors.nvInitialize()` is called from `didFinishLaunchingWithOptions`.
2. Ensure all required lifecycle callbacks are forwarded to the SDK.
3. Run:

```bash
npm start
npm run ios
```

4. Reinstall CocoaPods dependencies:

```bash
npx pod-install ios
```

5. Clean and rebuild the project in Xcode.

---

## Next Steps

Once the SDK has been successfully integrated, you can continue with:

- [🎯 Tracking Screens](/docs/screen-tracking.md)
- [🔔 Push Notifications (iOS Specific)](/docs/ios-push-integration.md)
- [🎯 Tracking Events](/docs/event-tracking-integration.md)
- [👤 Tracking Users](/docs/user-tracking-integration.md)
- [💬 In-App Notifications](/docs/inapp-integration.md)
- [📥 Notification Center](/docs/notification-center-integration.md)

Refer to the official documentation for detailed implementation guides.

---

# Support

If you encounter any issues during integration:

- Contact the NVECTA Support Team.
- Raise a support request directly from the NVECTA Dashboard.
