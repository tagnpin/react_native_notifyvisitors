# Android Integration

This document explains the Android-specific integration steps required for the NVECTA React Native plugin.

Official Documentation:
https://www.nvecta.com/docs/react-native-android-integration

<br>

# 1. Gradle Configuration

## Project-Level `build.gradle`

Add the Google Services Gradle plugin to enable Firebase services such as push notifications.

```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.2' // Mandatory for using Firebase Messaging, skip if not using FCM
    }
}
```

## App-Level `build.gradle`

Add this line at the bottom of the `app/build.gradle` file.

```gradle
apply plugin: 'com.google.gms.google-services' // Skip if not using FCM
```

## Minimum SDK Version

Ensure the `minSdkVersion` is properly configured, as NVECTA requires a minimum Android SDK version of 23.

```gradle
defaultConfig {
    minSdkVersion 23
}
```

## Enable Java 8 Compatibility

```gradle
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

<br>

# 2. Android Manifest Configuration

Open the following file:

```text
android/app/src/main/AndroidManifest.xml
```

## Required Permissions

Add the required permissions above the `<application>` tag.

```xml
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.WAKE_LOCK"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
```

## Disable Android Backup for Plugin Integration

Set `android:allowBackup="false"` inside the `<application>` tag in `AndroidManifest.xml`.

This is required for proper plugin integration and helps prevent unexpected restoration of SDK-related data by the Android system.

```xml
<application
    android:allowBackup="false"
    ...>
</application>
```

<br>

# 3. Application Class Setup

The NVECTA SDK must be registered from the Android `Application` class during application startup.

If you already have a custom `Application` class, add the registration method to its `onCreate()` function.

If you do not have an `Application` class, create one and register it in your `AndroidManifest.xml`.

> **Important:** Replace the placeholder `NOTIFYVISITORS_BRAND_ID` and `NOTIFYVISITORS_BRAND_ENCRYPTION_KEY` values with the credentials provided for your NVECTA account.

**Java**

```java
package com.example.app;

import android.app.Application;
import com.rn_notifyvisitors.RNNotifyvisitorsModule;

public class MyApplication extends Application {

    // NOTE: Replace the below with your own
    // NOTIFYVISITORS_BRAND_ID & NOTIFYVISITORS_BRAND_ENCRYPTION_KEY
    private int NOTIFYVISITORS_BRAND_ID = #####;
    private String NOTIFYVISITORS_BRAND_ENCRYPTION_KEY = "##################################";

    @Override
    public void onCreate() {
        super.onCreate();

        RNNotifyvisitorsModule.register(
            NOTIFYVISITORS_BRAND_ID,
            NOTIFYVISITORS_BRAND_ENCRYPTION_KEY
        );

        SoLoader.init(this, false);
    }
}
```

**Kotlin**

```kotlin
package com.example.app

import android.app.Application
import com.rn_notifyvisitors.RNNotifyvisitorsModule

class MyApplication : Application() {

    // NOTE: Replace the below with your own
    // NOTIFYVISITORS_BRAND_ID & NOTIFYVISITORS_BRAND_ENCRYPTION_KEY
    private val NOTIFYVISITORS_BRAND_ID: Int = #####
    private val NOTIFYVISITORS_BRAND_ENCRYPTION_KEY: String =
        "##################################"

    override fun onCreate() {
        super.onCreate()

        RNNotifyvisitorsModule.register(
            NOTIFYVISITORS_BRAND_ID,
            NOTIFYVISITORS_BRAND_ENCRYPTION_KEY
        )

        loadReactNative(this)
    }
}
```

## Register Application Class

Inside `AndroidManifest.xml`, specify your custom `Application` class:

```xml
<application
    android:name=".MyApplication"
    ...>
</application>
```

> **Important:** The NVECTA registration call should be performed during `Application.onCreate()` rather than being initialized lazily from an Activity or React component. This ensures SDK initialization is available from the beginning of the application lifecycle.

<br>

# 4. Build & Run

Install JavaScript dependencies and run the React Native Android application.

```bash
npm install
npx react-native run-android
```

If you need to perform a clean Android build:

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

<br>

# 5. Integration Verification

After completing the integration, verify the NVECTA SDK initialization using Android Studio Logcat.

## Verify Using Android Studio Logcat

Open:

```text
Android Studio → Logcat
```

Filter logs using:

```text
NotifyVisitors
```

Example successful initialization logs:

```text
PlayStore Connection Setup completed!!
This is the first call of NotifyVisitors SDK.
!SDK-VERSION! :: notifyvisitors: v5.8.4
NV BrandID = 1234
DeviceID == x0x0x0x0x0x0x0x0x0
```

## Verify Using React Native Logs

Run the React Native application:

```bash
npx react-native run-android
```

Check the Android logs for plugin and SDK-related messages.

Example:

```text
I/NotifyVisitors: This is the first call of NotifyVisitors SDK.
I/NotifyVisitors: !SDK-VERSION! :: notifyvisitors: v5.8.4
I/NotifyVisitors: NV BrandID = 1234
```

React Native JavaScript logs can also be viewed through the Metro terminal or React Native debugging tools.

## Recommended Checks

Verify the following after app launch:

* SDK initializes without errors.
* NVECTA Brand ID is displayed correctly in the logs.
* Device token is generated successfully when FCM is configured.
* No crash or ANR appears in logs.
* NVECTA SDK logs are visible using the `NotifyVisitors` filter.

<br>

# Support

If you face any issues during integration, please contact the support team or raise an issue directly from the NVECTA Dashboard.

<br>

# Next Steps

* Continue with the iOS integration guide: [iOS Integration](/docs/ios-specific-integration.md)
* Learn how to run the example project locally: [Running the Example Project](/docs/running-sample-app-in-local.md)
