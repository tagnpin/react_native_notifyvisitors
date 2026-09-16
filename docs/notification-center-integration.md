# Notification Center (App Inbox)

The Notification Center (App Inbox) allows you to display previously received push notifications inside your React Native application.

This feature is useful when users miss notifications or want to revisit older messages. Notification expiry and categorization can be managed from the NVECTA dashboard.

Official Documentation: <br>
https://www.nvecta.com/docs/react-native-notification-center-app-inbox

<br>

# Open Notification Center

Use the following method to display the built-in Notification Center UI.

```javascript
Notifyvisitors.openNotificationCenter(appInboxInfo, dismiss, callback);
```

## Parameters

| Parameter      | Type          | Description                                                                             |
| -------------- | ------------- | --------------------------------------------------------------------------------------- |
| `appInboxInfo` | Object | null | Optional configuration for a customized inbox UI. Pass `null` to use the default inbox. |
| `dismiss`      | number        | Controls whether the inbox screen remains in memory after a notification click.         |
| `callback`     | function      | Callback invoked after the Notification Center action.                                  |

### Dismiss Values

| Value | Behavior                                                             |
| ----- | -------------------------------------------------------------------- |
| `0`   | Notification Center remains in memory.                               |
| `1`   | Notification Center is removed from memory after notification click. |

## Basic Example

```javascript
Notifyvisitors.openNotificationCenter(null, 0, (response) => {
  // Do your work here
});
```

<br>

# Customizing Notification Center Tabs

You can create up to three custom tabs in the Notification Center.

> **Important**
>
> The label names must exactly match the labels configured in the NVECTA dashboard.

## Syntax to be followed for tab configurations

```javascript
const appInboxInfo = {
  label_one: "tab1Label",
  name_one: "name_a",

  label_two: "tab2Label",
  name_two: "name_b",

  label_three: "tab3Label",
  name_three: "name_c",

  selectedTabTextColor: "#FF3D00",
  unselectedTabTextColor: "#FF6D00",
  selectedTabBgColor: "#E1BEE7",

  unselectedTabBgColor_ios: "#00796B",
  selectedTabIndex_ios: "0",
  tabTextFontName_ios: "xxx",
  tabTextFontSize_ios: "13"
};
```

## Example

```javascript
const appInboxInfo = {
  label_one: "offer",
  name_one: "Offers",

  label_two: "promotion",
  name_two: "Promotions",

  label_three: "other",
  name_three: "Others",

  selectedTabTextColor: "#FF3D00",
  unselectedTabTextColor: "#FF6D00",

  selectedTabBgColor: "#E1BEE7",

  unselectedTabBgColor_ios: "#00796B",
  selectedTabIndex_ios: "0",

  tabTextFontName_ios: "Roboto",
  tabTextFontSize_ios: "13"
};

Notifyvisitors.openNotificationCenter(appInboxInfo, 0, function(callback: any) => {
  // Do your work here
});
```

<br>

# Get Unread Notification Count

You can retrieve the unread notification count and display it on a badge, bell icon, or notification indicator.

```javascript
Notifyvisitors.getNotificationCenterCount(tabCountInfo, function(count) => {
  console.log(count);
});
```

## Example

```javascript
const tabCountInfo = {
  label_one: "offer",
  name_one: "Offers",

  label_two: "promotion",
  name_two: "Promotions",

  label_three: "other",
  name_three: "Others"
};

Notifyvisitors.getNotificationCenterCount(tabCountInfo, function(count) => {
  console.log("Unread Count:", count);
});
```

## Callback Response

```json
{
  "totalCount": 5,
  "tabOneCount": 3,
  "tabTwoCount": 0,
  "tabThreeCount": 2
}
```

<br>

# Get Notification Center Data

If you want to build your own custom App Inbox UI, you can retrieve notification data directly from the SDK.

```javascript
Notifyvisitors.getNotificationCenterData(function(data) => {
  console.log(data);
});
```

The callback returns notification data in JSON format, allowing you to:

* Create your own inbox UI.
* Design custom notification cards.
* Implement custom filtering and sorting.
* Build a fully branded notification center experience.

## Callback Response

```json
{
  "message": "notification(s) found",
  "notifications": [
    {
      "title": "Rich Title",
      "message": "Rich Message 😂 Rich Message 😂 Rich Message 😂 Rich Message 😂 Rich Message 😂",
      "summary": "",
      "pushType": "horizontal crousel",
      "icon": "https://s3.amazonaws.com/notifypush/images/default_icon_app_5509.png",
      "target": "4",
      "url": "9999999999",
      "btnTitleOne": "Click Me",
      "btnUrlOne": "com.tnpnv_.pnbcodeapp.MainActivity",
      "btnTargetOne": "0",
      "btnTitleTwo": "",
      "btnUrlTwo": "",
      "btnTargetTwo": "0",
      "time": "1 year ago",
      "sendTime": "2023-10-01 00:00:00",
      "notificationId": "179154",
      "richImageUrl": "https://pushimages.notifyvisitors.com/images/push_rich_icon_75820.jpg",
      "parameters": {
        "default": {
          "rich_image_url": "<p><img class=\"fr-draggable\" src=\"blob:https://mail.notifyvisitors.com/32f9e3f5-9146-4fcc-a927-3c65ad126695\" width=\"188\" height=\"94\"></p> <p>Hello @{name}@, your email-id is @{email}@.</p>",
          "banner_position": "1",
          "show_banner": "true"
        }
      },
      "campaignLabel": [
        "offer",
        "promotion",
        "confirm"
      ],
      "crousel": [
        {
          "imageUrl": "https://clientcdn.notifyvisitors.com/Axis+MF/14may/500x250(1).png",
          "imageTarget": "1",
          "imageTargetVal": "https://docs.notifyvisitors.com/"
        },
        {
          "imageUrl": "https://cdn3.notifyvisitors.com/blog/wp-content/uploads/2024/04/5-1.png",
          "imageTarget": "1",
          "imageTargetVal": "https://www.google.co.in/"
        },
        {
          "imageUrl": "https://cdn3.notifyvisitors.com/blog/wp-content/uploads/2024/04/4-1.png",
          "imageTarget": "0",
          "imageTargetVal": "com.tnpnv_.notifycodeapp.MainActivity"
        }
      ]
    }
  ]
}
```

In case there are no broadcasted push notifications in the panel:

```json
{
  "message": "no notification(s)",
  "notifications": []
}
```

<br>

# Notification Categories

Notifications can be organized into multiple tabs using labels configured in the NVECTA dashboard.

Example categories:

```text
Offers
Promotions
Announcements
Updates
Transactions
```

Users can switch between tabs to view notifications belonging to specific categories.

<br>

# Common Use Cases

### Show Notification History

Allow users to revisit notifications they may have dismissed.

### Inbox Screen

Create a dedicated **Inbox** section within your app.

### Notification Badge

Display the unread notification count on:

* Bell icons
* Navigation tabs
* Profile sections
* Dashboard widgets

### Custom Inbox UI

Use `getNotificationCenterData()` to build a completely custom notification center matching your application's design.

<br>

# Best Practices

* Create meaningful notification categories.
* Use unread counts to improve engagement.
* Keep important notifications available in the inbox even after dismissal.
* Use a custom inbox UI when you need complete control over the user experience.
* Configure notification expiry from the NVECTA dashboard to prevent outdated messages from appearing.

## Recommended Flow

```text
Push Notification Received
            │
            ▼
      Stored in Inbox
            │
            ▼
 User Opens App Inbox
            │
            ├── View Notifications
            ├── Filter by Category
            ├── Check Unread Count
            └── Open Notification Details
```

The Notification Center provides a persistent in-app repository of push notifications, ensuring users can access important messages even after they have been dismissed from the device notification tray.
