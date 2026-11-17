## CHANGE LOG

### Version 4.9.0 _(November 18, 2026)_

---

- iOS Updates:
  - Simplify integration steps by using register with configuration function.
  - system events updated
  - Optimised Sticky Banner close button UI
- Minor bug fixes
- Code optimisation and performance enhancement.

### Version 4.8.4 _(November 17, 2026)_

---

- Android Updates:
  - Removed geofencing-related code and manifest declarations from the SDK to prevent unused geofencing components from being included in applications that do not require geofencing
- iOS Updates:
  - Internal event tracking optimisations

### Version 4.8.3 _(June 11, 2026)_

---

- Android Updates:
  - Internal code optimisations.

### Version 4.8.2 _(May 22, 2026)_

---

- Android Updates:
  - Resolved the ANR issue occurring during deep link query parameter extraction.
  - Fixed the NULL context crash triggered while validating push notification permission status on app launch.
  - Added title and message support in the GIF Push expanded UI, along with Dark Mode compatibility handling.
- iOS Updates:
  - Events tracking optimised

### Version 4.8.1 _(April 27, 2026)_

---

- Android Updates:
  - Android install attribute bug resolved

### Version 4.8.0 _(March 20, 2026)_

---

- Android Updates:
  - Android crashes related to context cast exception have been resolved
  - Android multiple calls of callbacks crash resolved
  - Nudges missing field in resource file have been added, & resolves crash
- iOS Updates:
  - If tracking permission is enabled in the app and the user grants consent, IDFA will be shared and available in your NVECTA (Notifyvisitors) panel.

### Version 4.7.0 _(February 20, 2026)_

---

- Android Updates:
  - frontend cookies concept implemented

### Version 4.6.3 _(January 12, 2026)_

---

- Android Updates:
  - Android crash issue resolved in setUserIdentifier listener.

### Version 4.6.2 _(November 12, 2025)_

---

- Android Updates:
  - install/update logic optimized
- iOS Updates:
  - iOS nudges Native Display code optimisation iOS

### Version 4.6.1 _(September 22, 2025)_

---

- Android Updates:
  - Added try-catch blocks for callbacks response
  - Google ads dependency degraded to 17.0.0 for old device support

### Version 4.6.0 _(September 3, 2025)_

---

- System Events optimised and dashboard status handling enabled
- Native Display Nudges code optimization and callback added for Native Display when using nudges dependancy on native display UI finished
- Bug fixes
- Code Optimisation and Performance Enhancement

### Version 4.5.3 _(August 13, 2025)_

---

- Android Updates:
  - ANR related issues resolved
  - Android 35 updates
  - getSessionData() callback event implemented
- iOS Updates:
  - InAppBanner Code optimisation
  - getSessionData() callback event implemented

### Version 4.5.2 _(June 25, 2025)_

---

- Android Updates:
  - Notification Center UI bug on Android 15

### Version 4.5.1 _(June 17, 2025)_

---

- Android Updates:
  - ANR related issues resolved
  - Notification center callback crash resolved
- iOS Updates:
  - Default System events optimised
  - Screen Tracking concept optimised

### Version 4.5.0 _(May 16, 2025)_

---

- Android Updates:
  - Context related crash in Notification Center resolved.
  - Default System events added.
  - Screen Tracking concept introduced.
- iOS Updates:
  - Default System events added.
  - Screen Tracking concept introduced.

### Version 4.4.4 _(April 30, 2025)_

---

- iOS Updates:
  - banner click callbak data updated in getLinkInfo()
  - In Notification center click callback response in getLinkInfo() the value of type is updated to inbox intead of push
  - Minor bug fixes
  - Code optimisation and performance enhancement.

### Version 4.4.3 _(March 3, 2025)_

---

- Android Updates:
  - stopNotifications() method issue fixed in Android platform

### Version 4.4.2 _(February 4, 2025)_

---

- Android Updates:
  - Native Push Permission Prompt white box in background bug resolved.
  - Callback added in show method.
  - In the User request, the cookies handler bug was resolved.
  - Callback added in userIdentifier method.
  - New target added on push click Universal Link (available for all push templates).
  - Push_Clicked callback added for all cta targets in the push. This new callback will be received in the getEventResponse() callback.
  - Callback added on Notification Center's close button.
  - TimerPush dark theme bug resolved.
  - Banner/Survey callback response time minimized.
  - Added new function to receive payload from FCM & send it to NV.
- iOS Updates:
  - Push conversion tracking optimised.
  - Email and SMS conversion tracking enabled for deeplink.
  - Universal Link added as new target for push click (available for all push templates).
  - Push_Clicked event callback added in the event response callback for all cta targets of the push notification.
  - Callback added in userIdentifierWithUserParams() method.
  - knownUserIdentied() is a new delegate function introduced to get notified when a known user found in the notifyvisitors SDK.

### Version 4.4.1 _(November 11, 2024)_

---

- Android Updates:
  - banner giving double callback bug resolved
  - frame rate low bug resolved
- iOS Updates:
  - Push notifications stats optimised
  - Minor bug fixes
  - Code optimisation and performance enhancement.

### Version 4.4.0 _(June 10, 2024)_

---

- Android Updates:
  - App push conversion tracking enabled
  - Push permission prompt on android 13, 14 devices
- iOS Updates:
  - App push conversion tracking enabled
  - App Privacy manifest plist file included
  - Push and Notification Center Click callback parameters parsed with dataType instead of string only in all format
  - NSUserDefault values updated to fix empty data on app logout
  - Minor bug fixes
  - Code optimisation and performance enhancement.

### Version 4.2.3 _(November 2, 2023)_

---

- Android 13 Push Permission Updte
- Notification Count Fixed in Android

### Version 4.2.2 _(September 28, 2023)_

---

- Android 13 Push Permission in Android
- Data Encryption in Android and ios
- FCM Code dependence issue in Android
- Optimizes code of build.gradle

### Version 4.1.9 _(February 3, 2023)_

---

- Android Version Update
- Count Fix in IOS

### Version 4.1.4 _(April 6, 2022)_

---

- Give Type Script Support

### Version 4.1.2 _(March 17, 2021)_

---

- Push subscribe/unsubscribe concept added
- stopPushNotification() function removed
- Get notifyvisitors push subscriptionID function
- Enable disable clearing badge count on push arrival
- Notification Center Tabs unread counts
- added in new function
- Code Optimisation and performance enhancement

### Version 4.1.1 _(November 27, 2021)_

---

- getLinkIssueFixed in Android

### Version 4.1.0 _(June 23, 2021)_

---

- Andoid Mavan Issue
- Cross Btn issue android & ios
- miner bugs fixed

### Version 4.0.9 _(May 4, 2021)_

---

- Event Survey Callback Added
- Plugin Logs in capitical case
- Plugin Version Log Added
- IDFA fix inI OS Platform
- Miner Bugs Fixed.

### Version 4.0.8 _(March 17, 2021)_

---

- Grosary Factory getting crash
- in android.
- Plugin getting crash with
- razor pay plugin Fixed.
- Plugin version Log added in
- android

### Version 4.0.7 _(May 2, 2021)_

---

- (Location Permission Update Android)
- Install referrer dep update (now 2.2)
- Android Plugin Logs will be capital
- Letters.
