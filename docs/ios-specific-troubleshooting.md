# Troubleshooting

## Before You Start

### Verify SDK Installation

### Verify SDK Initialization

### Verify SDK Version

### Enable and Collect SDK Logs

### Clean Build / Derived Data

### Verify Target Configuration

---

## Push Notifications

### Rich Push Notification Displays Only the Title and Message Text

If your `rich push notification` is delivered as a s`tandard notification` (title and text only), it may indicate that the `Notification Service Extension` is missing or not configured correctly.
The `Notification Service Extension`, introduced in `iOS 10`, allows push notifications to include media attachments (images, audio, video), action buttons, badge counts, and delivery tracking. The `NVECTA` iOS SDK relies on this extension to enable these features.

#### Key points to check:

- Ensure that the [Notification Service Extension](./ios-notification-service-extension.md) is added and configured as described in our documentation.
- Use direct `URLs` for media attachments (image, audio, or video). Do not use `URLs` that point to `HTML` pages.

<!-- ### Push Notification Not Received

### Push Notification Received but SDK Does Not Process It

### Push Token Not Registered

### Push Notification Click Not Handled

### Push Notification Click Callback Not Triggered

### Rich Media / Notification Service Extension Not Working

### Notification Service Extension Configuration

### Push Notification Works on One Environment but Not Another

### Simulator vs Physical Device -->

### App Group Configuration Issues

### Rich Push Notification works, But Delivery Statistics Remain at 0

If `Rich Push notification` is displayed correctly but delivery counts in the panel remain at 0, it usually means that either:

- `App Groups` are not set up correctly, or
- The `Notification Service Extension` is not fully configured.

Both `App Groups` and the `Notification Service Extension` must be correctly implemented for `delivery tracking` to function. If any configuration step is missing or incomplete, the notification will be delivered, but the delivery event will not be recorded in the NVECTA dashboard.

---

## Summary

- Missing/incorrect `Notification Service Extension` → Notification shows only text and title.
- Missing/incorrect `App Groups` or `Notification Service Extension` → Rich push displays, but delivery tracking fails.

<!-- ## Track Event

### Event Not Being Tracked

### Event API Called but Event Not Visible

### Event Attributes Not Sent

### Invalid / Empty Event Name

### Duplicate Events

### Event Tracking in Background

### Verifying Event Tracking

---

## Track User

### User Tracking Not Working

### User Identifier Not Set

### User Parameters Not Sent

### User Tracking Callback Not Triggered

### Handling Success and Failure

### Verifying User Tracking

---

## User / Profile Attributes

### Attributes Not Persisting

### Attributes Missing After App Restart

### Attributes Missing Between Sessions

### Persistence Configuration Issues

### Attribute Type Mismatch

### Clearing / Updating Attributes

---

## In-App Messages

### In-App Message Not Displayed

### Message Displayed at Unexpected Time

### Message Displayed Multiple Times

### Targeting / Campaign Conditions

### Debugging In-App Messages

---

## Deep Links / URL Handling

### Deep Link Not Opened

### Deep Link Callback Not Triggered

### URL Handling in AppDelegate

### URL Handling with SceneDelegate

### Redirect Issues

---

## SDK Lifecycle

### SDK Not Initialized

### Lifecycle Events Not Triggered

### Background / Foreground Issues

### SceneDelegate Integration

### Application Termination

---

## Swift Package Manager

### Package Resolution Issues

### Framework Not Found

### Module Not Found

### Runtime `dyld` Errors

### Duplicate Frameworks

### Wrong Target Dependency

### Notification Service Extension Package Configuration

### Architecture / Platform Compatibility

---

## CocoaPods Migration

### Duplicate SDK Integration

### Old Framework Still Linked

### CocoaPods + SPM Conflict

---

## General Runtime Issues

### SDK Works in Debug but Not Release

### SDK Works on Device but Not Simulator

### SDK Works in One Target but Not Another

### Network / API Issues

### Environment Configuration

### API Key / Credentials

### Collecting Logs for Support -->

## Diagnostic Information

### Information to Collect Before Contacting Support

- SDK version
- Xcode version
- iOS version
- Device / Simulator
- Integration method
- Target configuration
- Environment
- Relevant SDK logs
- Reproduction steps
- Sample payload where applicable

> **More Troubleshooting**
>
> If you are still facing issue then you can refer to our detailed **[Push Troubleshooting](https://docs.nvecta.com/docs/push-notification-troubleshooting)** documentation on our website..

## Support

If you still encounter any issues during integration:

- Contact the NVECTA Support Team.
- Raise a support request from the NVECTA Dashboard.
