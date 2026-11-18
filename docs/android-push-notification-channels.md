# Notification Channels (Android)

Android 8.0 (Oreo) introduced **Notification Channels**, allowing users to control how different categories of notifications behave.

For example, an app might have separate channels for:

* Messages
* Promotions
* Order Updates
* Social Activity

Users can independently configure each channel by:

* Enabling or disabling notifications
* Changing notification importance
* Choosing custom sounds
* Configuring vibration settings

> **Important**
>
> Once a notification channel is created, most of its behavior settings cannot be modified programmatically. Users have full control over channel settings from their device settings. Only the channel name and description can be updated.

> **Note**
>
> Android 8.0+ requires every notification to be associated with a valid notification channel. Notifications sent without a channel may not be displayed.
>

Official Documentation: <br>
https://www.nvecta.com/docs/react-native-notification-channels-android

<br>

# Create a Notification Channel

Import the NVECTA React Native SDK:

```javascript
import Notifyvisitors from 'react-native-notifyvisitors';
```

The same import syntax can be used with both JavaScript and TypeScript.

Use the following method to create a notification channel:

```javascript
Notifyvisitors.createNotificationChannel(
    channelId,
    channelName,
    channelDescription,
    channelImportance,
    enableLights,
    shouldVibrate,
    lightColor,
    soundFileName,
    vibratePattern
);
```

### Example

```javascript
Notifyvisitors.createNotificationChannel(
    'general_notifications',
    'General Notifications',
    'General app notifications',
    '5',
    true,
    true,
    '#FFFFFF',
    '',
    '0, 400, 700, 300'
);
```

### Parameters

| Parameter            | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `channelId`          | Unique identifier for the notification channel.          |
| `channelName`        | User-visible channel name.                               |
| `channelDescription` | Description displayed in Android settings.               |
| `channelImportance`  | Controls notification priority and interruption level.   |
| `enableLights`       | Enables LED notification light (supported devices only). |
| `shouldVibrate`      | Enables vibration for notifications.                     |
| `lightColor`         | LED light color in hex format.                           |
| `soundFileName`      | Custom notification sound file name.                     |
| `vibratePattern`     | Custom vibration pattern.                                |

<br>

# Vibration Pattern

The vibration pattern defines alternating OFF and ON durations in milliseconds.

Example:

```javascript
'0, 400, 700, 300'
```

Means:

| Action  | Duration |
| ------- | -------- |
| Wait    | 0 ms     |
| Vibrate | 400 ms   |
| Pause   | 700 ms   |
| Vibrate | 300 ms   |

To create vibration, at least two values are required.

<br>

# Creating Multiple Channels

You can create multiple notification channels within the same application.

Example:

```text
Messages
Promotions
Order Updates
Offers
Support
```

Each channel must have a unique `channelId`.

The same `channelId` can later be selected while creating push campaigns from the NVECTA dashboard.

<br>

# Create Notification Channel Groups

Notification Channel Groups help organize related notification channels.

This is especially useful for:

* Multi-account applications
* Business apps
* Messaging platforms

### Create Group

```javascript
Notifyvisitors.createNotificationChannelGroup('group_id_1', 'General Notifications');
```

### Example

```javascript
Notifyvisitors.createNotificationChannelGroup('marketing_group', 'Marketing Notifications');
```

<br>

# Delete a Notification Channel

You can remove previously created notification channels.

```javascript
Notifyvisitors.deleteNotificationChannel('general_notifications');
```

### Example

```javascript
Notifyvisitors.deleteNotificationChannel('channel_id_abc');
```

> No error is thrown if the specified channel does not exist.

<br>

# Delete a Notification Channel Group

Before deleting a channel group, all channels associated with that group should be removed.

```javascript
Notifyvisitors.deleteNotificationChannelGroup('marketing_group');
```

### Example

```javascript
Notifyvisitors.deleteNotificationChannelGroup('group_id_1');
```

<br>

# Configure Channels in NVECTA Dashboard

Notification channels can be managed from the NVECTA dashboard.

### Dashboard Path

```text
Mobile Push
└── Configuration
    └── Assets
        └── Notification Channels
```

From this section you can:

* Create channel IDs
* Mark channels as mandatory or optional
* Configure default channels
* Manage available channels for campaigns

### Default Channel

NVECTA creates a default channel named:

```text
General Notifications
```

You may replace it by marking one of your custom channels as the default channel in the dashboard.

<br>

# Using Channels While Sending Push Notifications

When creating a push campaign:

```text
Push Campaign
└── Advanced Options
    └── Notification Channel
```

Select the desired channel to determine how the notification behaves on the user's device.

<br>

# Importance Levels

Notification importance determines how much attention Android gives to a notification.

| User Visible Behavior              | Android 8+ Importance | Android 7.1 & Below Priority |
| ---------------------------------- | --------------------- | ---------------------------- |
| Urgent (Heads-up + Sound)          | IMPORTANCE_HIGH       | PRIORITY_HIGH / MAX          |
| High (Sound)                       | IMPORTANCE_DEFAULT    | PRIORITY_DEFAULT             |
| Medium (Silent)                    | IMPORTANCE_LOW        | PRIORITY_LOW                 |
| Low (No Sound / Hidden Status Bar) | IMPORTANCE_MIN        | PRIORITY_MIN                 |

Once a channel is created, its importance level cannot be changed programmatically. Users can still modify it from device settings.

<br>

# Importance Value Reference

| Value | Importance         |
| ----- | ------------------ |
| 0     | IMPORTANCE_NONE    |
| 1     | IMPORTANCE_MIN     |
| 2     | IMPORTANCE_LOW     |
| 3     | IMPORTANCE_DEFAULT |
| 4     | IMPORTANCE_HIGH    |
| 5     | IMPORTANCE_MAX     |

<br>

# Recommended Usage

| Importance | Use Case                     | Examples                                   |
| ---------- | ---------------------------- | ------------------------------------------ |
| HIGH       | Time-sensitive notifications | Messages, Calls, Alarms                    |
| DEFAULT    | Important updates            | Reminders, Order Status, Traffic Alerts    |
| LOW        | Informational updates        | Social interactions, Subscribed content    |
| MIN        | Non-critical notifications   | Promotions, Nearby places, Weather updates |

<br>

## Best Practices

* Create channels based on notification categories.
* Use meaningful channel names.
* Avoid placing promotional notifications in high-priority channels.
* Use separate channels for transactional and marketing notifications.
* Create channels during application startup before sending notifications.

This ensures users have better control over their notification preferences and improves overall notification engagement.
