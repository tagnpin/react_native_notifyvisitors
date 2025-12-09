package com.rn_notifyvisitors;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.notifyvisitors.notifyvisitors.NotifyVisitorsApi;
import com.notifyvisitors.notifyvisitors.NotifyVisitorsApplication;
import com.notifyvisitors.notifyvisitors.center.NVCenterStyleConfig;
import com.notifyvisitors.notifyvisitors.interfaces.NotificationCountInterface;
import com.notifyvisitors.notifyvisitors.interfaces.NotificationListDetailsCallback;
import com.notifyvisitors.notifyvisitors.interfaces.OnCenterCountListener;
import com.notifyvisitors.notifyvisitors.interfaces.OnCenterDataListener;
import com.notifyvisitors.notifyvisitors.interfaces.OnEventTrackListener;
import com.notifyvisitors.notifyvisitors.interfaces.OnNotificationClicksHandler;
import com.notifyvisitors.notifyvisitors.interfaces.OnPushRuntimePermission;
import com.notifyvisitors.notifyvisitors.permission.NVPopupDesign;
import com.notifyvisitors.notifyvisitors.push.NVNotificationChannels;
import com.notifyvisitors.notifyvisitors.interfaces.OnInAppTriggerListener;
import com.notifyvisitors.notifyvisitors.interfaces.OnKnownUserFound;
import com.notifyvisitors.notifyvisitors.interfaces.OnUserTrackListener;
import com.notifyvisitors.notifyvisitors.interfaces.OnBuildUiListener;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.Iterator;


public class RNNotifyvisitorsModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final ReactApplicationContext reactContext;
    private static final String TAG = "RN-NotifyVisitors";
    private static final String PLUGIN_VERSION = "4.6.2";

    private String PUSH_BANNER_CLICK_EVENT = "nv_push_banner_click";
    private String CHAT_BOT_BUTTON_CLICK = "nv_chat_bot_button_click";

    private String SHOW_CALLBACK = "nv_show_callback";
    private String EVENT_CALLBACK = "nv_event_callback";
    private String COMMON_SHOW_EVENT_CALLBACK = "nv_common_show_event_callback";
    private String CENTER_CALLBACK = "nv_center_callback";
    private String KNOWN_USER_IDENTIFIED_CALLBACK = "nv_known_user_identified_callback";
    private String  NV_NOTIFICATION_CLICK_CALLBACK = "nv_notification_click_callback";

    String finalData;

    Callback showCallback;
    Callback eventCallback;
    Callback commonCallback;
    Callback centerCallback;
    Callback onKnownUserIdentifiedCallback;
    Callback onNotificationClickCallback;

    private String tab1Label, tab1Name;
    private String tab2Label, tab2Name;
    private String tab3Label, tab3Name;
    private String selectedTabColor, unSelectedTabColor, selectedTabIndicatorColor;
    private int selectedTabIndex;

    Activity mActivity;
    JSONObject mTokens;
    JSONObject mCustomObjects;
    NVCenterStyleConfig config;
    private final int NV_TIME_OUT = 5000;
    private final int NV_BANNER_TIME_OUT = 6800;

    boolean nvInAppFound = false;


    /* constructor */
    public RNNotifyvisitorsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    /* Bridge Caller */
    @Override
    public String getName() {
        return "RNNotifyvisitors";
    }


    /* React Native Plugin Initialize */
    @Override
    public void initialize() {
        super.initialize();
        try {
            Log.i(TAG, "INITIALIZE");
            Log.i(TAG, "RN-NV PLUGIN VERSION : " + PLUGIN_VERSION);
            Activity currentActivity = reactContext.getCurrentActivity();
            if (currentActivity != null) {
                Intent intent = currentActivity.getIntent();
                if (intent != null) {
                    handleIntent(intent);
                }
            }
        } catch (Exception e) {
            Log.i(TAG, "INITIALIZE ERROR : " + e);
        }


        try {
            NotifyVisitorsApi.getInstance(reactContext).getEventResponse(new OnEventTrackListener() {
                @Override
                public void onResponse(JSONObject jsonObject) {
                    sendResponse(jsonObject);
                }
            });
        } catch (Exception e) {
            Log.i(TAG, "FETCH EVENT SURVEY ERROR : " + e);
        }

    }


    /* 0 - For Native SDK Initialize From Application Class */
    public static void register(Context context, int brandID, String brandEncryptKey) {
        try {
            Log.i(TAG, "REGISTER !!");
            NotifyVisitorsApplication.register((Application) context.getApplicationContext(), brandID, brandEncryptKey);
        } catch (Exception e) {
            Log.i(TAG, "REGISTER ERROR : " + e);
        }
    }

    /* 1 - Survey, InApp Banners */
    @ReactMethod
    public void show(ReadableMap tokens, ReadableMap customObjects, final String fragmentName, Callback callback) {
        try {
            Log.i(TAG, "SHOW !!");
            showCallback = callback;

            mTokens = null;
            try {
                if (tokens != null) {
                    HashMap<String, Object> temp = tokens.toHashMap();
                    mTokens = new JSONObject(temp);
                }
            } catch (Exception e) {
                Log.i(TAG, "TOKENS PARSE ERROR : " + e);
            }

            mCustomObjects = null;
            try {
                if (customObjects != null) {
                    HashMap<String, Object> temp = customObjects.toHashMap();
                    mCustomObjects = new JSONObject(temp);
                }
            } catch (Exception e) {
                Log.i(TAG, "CUSTOM-OBJECT PARSE ERROR : " + e);
            }

            try {
                if (mTokens != null) {
                    Log.i(TAG, "Tokens : " + mTokens.toString());
                }

                if (mCustomObjects != null) {
                    Log.i(TAG, "Custom Rules : " + mCustomObjects.toString());
                }

            } catch (Exception e) {
                Log.i(TAG, "ERROR : " + e);
            }

            mActivity = reactContext.getCurrentActivity();
            if (mActivity != null) {
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        NotifyVisitorsApi.getInstance(mActivity).show(mTokens, mCustomObjects, fragmentName);
                        checkForBannerNotFound();
                    }
                });
            } else {
                Log.e(TAG, "Getting Null Activity !!");
            }
        } catch (Exception e) {
            Log.i(TAG, "SHOW ERROR : " + e);
        }
    }

    private void checkForBannerNotFound() {
        try {
            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    if (!nvInAppFound && showCallback != null) {
                        Log.i(TAG, "Banner Not Found to be true !!!!");
                        try {
                            JSONObject nv_response = new JSONObject();
                            nv_response.put("status", "fail");
                            nv_response.put("eventName", "Banner InActive");
                            nv_response.put("callbackType", "banner");
                            sendEvent(SHOW_CALLBACK, nv_response.toString());
                        } catch (Exception e) {
                            Log.i(TAG, "Banner Not Found Checker ERROR 1: " + e);
                        }
                    }
                }
            }, NV_BANNER_TIME_OUT);
        } catch (Exception e) {
            Log.i(TAG, "Banner Not Found Checker ERROR 2: " + e);
        }
    }

    @ReactMethod
    public void getSessionData(final Callback callback) {
        try {
            Log.i(TAG, "GET SESSION DATA !!");
            JSONObject data = NotifyVisitorsApi.getInstance(reactContext).getSessionData();
            if (data != null) {
                callback.invoke(data.toString());
            } else {
                callback.invoke("unavailable");
            }

        } catch (Exception e) {
            Log.e(TAG, "GET SESSION DATA ERROR : " + e);
        }
    }

    @ReactMethod
    public void notificationClickCallback(final Callback callback) {
        onNotificationClickCallback = callback;

        try {
            Log.i(TAG, "NOTIFICATION CLICK CALLBACK !!");
            NotifyVisitorsApi.getInstance(reactContext).notificationClickCallback(new OnNotificationClicksHandler() {
                @Override
                public void onClick(JSONObject jsonObject) {
                    try {
                        if (jsonObject != null) {
                            sendEvent(NV_NOTIFICATION_CLICK_CALLBACK, jsonObject.toString());
                        } else {
                            sendEvent(NV_NOTIFICATION_CLICK_CALLBACK, "unavailable");
                        }
                    } catch (Exception e) {
                        Log.e(TAG, "NOTIFICATION CLICK CALLBACK ERROR 2 : " + e);
                    }
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "NOTIFICATION CLICK CALLBACK ERROR : " + e);
        }
    }

    @ReactMethod
    public void showInAppMessage(ReadableMap tokens, ReadableMap customObjects, final String fragmentName, Callback callback) {
        try {
            Log.i(TAG, "SHOW IN APP MESSAGE !!");
            showCallback = callback;

            mTokens = null;
            try {
                if (tokens != null) {
                    HashMap<String, Object> temp = tokens.toHashMap();
                    mTokens = new JSONObject(temp);
                }
            } catch (Exception e) {
                Log.i(TAG, "TOKENS PARSE ERROR : " + e);
            }

            mCustomObjects = null;
            try {
                if (customObjects != null) {
                    HashMap<String, Object> temp = customObjects.toHashMap();
                    mCustomObjects = new JSONObject(temp);
                }
            } catch (Exception e) {
                Log.i(TAG, "CUSTOM-OBJECT PARSE ERROR : " + e);
            }

            try {
                if (mTokens != null) {
                    Log.i(TAG, "Tokens : " + mTokens.toString());
                }

                if (mCustomObjects != null) {
                    Log.i(TAG, "Custom Rules : " + mCustomObjects.toString());
                }

            } catch (Exception e) {
                Log.i(TAG, "ERROR : " + e);
            }

            mActivity = reactContext.getCurrentActivity();
            if (mActivity != null) {
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        NotifyVisitorsApi.getInstance(mActivity).show(mTokens, mCustomObjects, fragmentName, new OnInAppTriggerListener() {
                            @Override
                            public void onDisplay(JSONObject response) {
                                try {
                                    if (response != null) {
                                        sendEvent(SHOW_CALLBACK, response.toString());
                                    } else {
                                        sendEvent(SHOW_CALLBACK, "{}");
                                    }
                                } catch (Exception e) {
                                    Log.e(TAG, "SHOW IN APP MESSAGE ERROR : " + e);
                                }
                            }
                        });
                    }
                });
            } else {
                Log.e(TAG, "Getting Null Activity !!");
            }
        } catch (Exception e) {
            Log.i(TAG, "SHOW ERROR : " + e);
        }
    }
    
    /* 2 - Notification Center */
    @ReactMethod
    public void showNotifications(ReadableMap mAppInboxInfo, final int dismissValue) {
        Log.i(TAG, "SHOW NOTIFICATIONS !!");

        tab1Label = null;
        tab1Name = null;
        tab2Label = null;
        tab2Name = null;
        tab3Label = null;
        tab3Name = null;
        selectedTabColor = null;
        unSelectedTabColor = null;
        selectedTabIndicatorColor = null;
        selectedTabIndex = 0;

        JSONObject appInboxInfo;


        try {
            if (mAppInboxInfo != null) {
                HashMap<String, Object> temp = mAppInboxInfo.toHashMap();
                appInboxInfo = new JSONObject(temp);

                try {
                    tab1Label = appInboxInfo.getString("label_one");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB1LABEL ERROR :" + e);
                }

                try {
                    tab1Name = appInboxInfo.getString("name_one");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB1NAME ERROR :" + e);
                }

                try {
                    tab2Label = appInboxInfo.getString("label_two");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB2LABEL ERROR :" + e);
                }

                try {
                    tab2Name = appInboxInfo.getString("name_two");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB2NAME ERROR :" + e);
                }

                try {
                    tab3Label = appInboxInfo.getString("label_three");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB3LABEL ERROR :" + e);
                }

                try {
                    tab3Name = appInboxInfo.getString("name_three");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB3NAME ERROR :" + e);
                }

                try {
                    selectedTabColor = appInboxInfo.getString("selectedTabTextColor");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS SELECTED TAB COLOR ERROR :" + e);
                    selectedTabColor = "#0000ff";
                }

                try {
                    unSelectedTabColor = appInboxInfo.getString("unselectedTabTextColor");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS UNSELECTED TAB COLOR ERROR :" + e);
                    unSelectedTabColor = "#779ecb";
                }

                try {
                    selectedTabIndicatorColor = appInboxInfo.getString("selectedTabBgColor");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS SELECTED TAB INDICATOR COLOR ERROR :" + e);
                    selectedTabIndicatorColor = "#0000ff";
                }

                try {
                    selectedTabIndex = appInboxInfo.getInt("selectedTabIndex_ios");
                } catch (Exception e) {
                    Log.i(TAG, "SELECTED TAB INDEX ERROR :" + e);
                }

                if (tab1Label.equalsIgnoreCase("null")) {
                    tab1Label = null;
                }

                if (tab1Name.equalsIgnoreCase("null")) {
                    tab1Name = null;
                }

                if (tab2Label.equalsIgnoreCase("null")) {
                    tab2Label = null;
                }

                if (tab2Name.equalsIgnoreCase("null")) {
                    tab2Name = null;
                }

                if (tab3Label.equalsIgnoreCase("null")) {
                    tab3Label = null;
                }

                if (tab3Name.equalsIgnoreCase("null")) {
                    tab3Name = null;
                }

                config = new NVCenterStyleConfig();
                config.setFirstTabDetail(tab1Label, tab1Name);
                config.setSecondTabDetail(tab2Label, tab2Name);
                config.setThirdTabDetail(tab3Label, tab3Name);

                config.setSelectedTabColor(selectedTabColor);
                config.setUnSelectedTabColor(unSelectedTabColor);
                config.setSelectedTabIndicatorColor(selectedTabIndicatorColor);

                mActivity = reactContext.getCurrentActivity();
                if (mActivity != null) {
                    mActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            NotifyVisitorsApi.getInstance(mActivity).showNotifications(dismissValue, config);
                        }
                    });
                } else {
                    Log.e(TAG, "Getting Null Activity !!");
                }


            } else {
                Log.i(TAG, "TAB INFO IS NULL !! GOING FOR SIMPLE APP INBOX ");
                mActivity = reactContext.getCurrentActivity();
                if (mActivity != null) {
                    mActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            NotifyVisitorsApi.getInstance(reactContext).showNotifications(dismissValue, null);
                        }
                    });
                } else {
                    Log.e(TAG, "Getting Null Activity !!");
                }
            }
        } catch (Exception e) {
            Log.i(TAG, "SHOW NOTIFICATIONS ERROR : " + e);
        }

    }

    @ReactMethod
    public void openNotificationCenter(ReadableMap mAppInboxInfo, final int dismissValue, Callback callback) {
        Log.i(TAG, "OPEN NOTIFICATION CENTER !!");
        centerCallback = callback;

        tab1Label = null;
        tab1Name = null;
        tab2Label = null;
        tab2Name = null;
        tab3Label = null;
        tab3Name = null;
        selectedTabColor = null;
        unSelectedTabColor = null;
        selectedTabIndicatorColor = null;
        selectedTabIndex = 0;

        JSONObject appInboxInfo;

        try {
            if (mAppInboxInfo != null) {
                HashMap<String, Object> temp = mAppInboxInfo.toHashMap();
                appInboxInfo = new JSONObject(temp);

                try {
                    tab1Label = appInboxInfo.getString("label_one");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB1LABEL ERROR :" + e);
                }

                try {
                    tab1Name = appInboxInfo.getString("name_one");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB1NAME ERROR :" + e);
                }

                try {
                    tab2Label = appInboxInfo.getString("label_two");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB2LABEL ERROR :" + e);
                }

                try {
                    tab2Name = appInboxInfo.getString("name_two");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB2NAME ERROR :" + e);
                }

                try {
                    tab3Label = appInboxInfo.getString("label_three");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB3LABEL ERROR :" + e);
                }

                try {
                    tab3Name = appInboxInfo.getString("name_three");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB3NAME ERROR :" + e);
                }

                try {
                    selectedTabColor = appInboxInfo.getString("selectedTabTextColor");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS SELECTED TAB COLOR ERROR :" + e);
                    selectedTabColor = "#0000ff";
                }

                try {
                    unSelectedTabColor = appInboxInfo.getString("unselectedTabTextColor");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS UNSELECTED TAB COLOR ERROR :" + e);
                    unSelectedTabColor = "#779ecb";
                }

                try {
                    selectedTabIndicatorColor = appInboxInfo.getString("selectedTabBgColor");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS SELECTED TAB INDICATOR COLOR ERROR :" + e);
                    selectedTabIndicatorColor = "#0000ff";
                }

                try {
                    selectedTabIndex = appInboxInfo.getInt("selectedTabIndex_ios");
                } catch (Exception e) {
                    Log.i(TAG, "SELECTED TAB INDEX ERROR :" + e);
                }

                if (tab1Label.equalsIgnoreCase("null")) {
                    tab1Label = null;
                }

                if (tab1Name.equalsIgnoreCase("null")) {
                    tab1Name = null;
                }

                if (tab2Label.equalsIgnoreCase("null")) {
                    tab2Label = null;
                }

                if (tab2Name.equalsIgnoreCase("null")) {
                    tab2Name = null;
                }

                if (tab3Label.equalsIgnoreCase("null")) {
                    tab3Label = null;
                }

                if (tab3Name.equalsIgnoreCase("null")) {
                    tab3Name = null;
                }

                config = new NVCenterStyleConfig();
                config.setFirstTabDetail(tab1Label, tab1Name);
                config.setSecondTabDetail(tab2Label, tab2Name);
                config.setThirdTabDetail(tab3Label, tab3Name);

                config.setSelectedTabColor(selectedTabColor);
                config.setUnSelectedTabColor(unSelectedTabColor);
                config.setSelectedTabIndicatorColor(selectedTabIndicatorColor);

                mActivity = reactContext.getCurrentActivity();
                if (mActivity != null) {
                    mActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            NotifyVisitorsApi.getInstance(mActivity).showNotifications(dismissValue, config, new OnBuildUiListener() {
                                @Override
                                public void onCenterClose() {
                                    //Log.d("App", "Notification center closed");
                                    try {
                                        JSONObject j = new JSONObject();
                                        j.put("status", "success");
                                        j.put("message", "close button clicked");
                                        sendResponse(j);
                                    } catch (Exception e) {
                                        Log.e(TAG, "CLOSE BUTTON CLICK ERROR :" + e);
                                    }
                                }
                            });
                        }
                    });
                } else {
                    Log.e(TAG, "Getting Null Activity !!");
                }

            } else {
                Log.i(TAG, "TAB INFO IS NULL !! GOING FOR SIMPLE APP INBOX ");
                mActivity = reactContext.getCurrentActivity();
                if (mActivity != null) {
                    mActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            NotifyVisitorsApi.getInstance(mActivity).showNotifications(dismissValue, null, new OnBuildUiListener() {
                                @Override
                                public void onCenterClose() {
                                    //Log.d("App", "Notification center closed");
                                    try {
                                        JSONObject j = new JSONObject();
                                        j.put("status", "success");
                                        j.put("message", "close button clicked");
                                        sendResponse(j);
                                    } catch (Exception e) {
                                        Log.e(TAG, "CLOSE BUTTON CLICK ERROR :" + e);
                                    }
                                }
                            });
                        }
                    });
                } else {
                    Log.e(TAG, "Getting Null Activity !!");
                }
            }
        } catch (Exception e) {
            Log.i(TAG, "SHOW NOTIFICATIONS ERROR : " + e);
        }

    }

    /* 3 - Event Tracking */
    @ReactMethod
    public void event(String eventName, ReadableMap attributes, String ltv, String scope, Callback callback) {
        try {
            Log.i(TAG, "EVENT !!");
            eventCallback = callback;

            JSONObject mAttributes = null;
            try {
                if (attributes != null) {
                    HashMap<String, Object> temp = attributes.toHashMap();
                    mAttributes = new JSONObject(temp);
                }
            } catch (Exception e) {
                Log.i(TAG, "ATTRIBUTES PARSE ERROR : " + e);
            }

            if (eventName != null) {
                Log.i(TAG, "Event Name : " + eventName);
            } else {
                Log.i(TAG, "Event Name : null");
            }

            if (mAttributes != null) {
                Log.i(TAG, "Attributes : " + mAttributes.toString());
            } else {
                Log.i(TAG, "Attributes : null");
            }

            if (ltv != null) {
                Log.i(TAG, "Life Time Value : " + ltv);
            } else {
                Log.i(TAG, "Life Time Value : null");
            }
            if (scope != null) {
                Log.i(TAG, "Scope : " + scope);
            } else {
                Log.i(TAG, "Scope : null");
            }

            NotifyVisitorsApi.getInstance(reactContext).event(eventName, mAttributes, ltv, scope);
        } catch (Exception e) {
            Log.i(TAG, "EVENT ERROR : " + e);
        }
    }

    /* 4 - Login User */
    @ReactMethod
    public void userIdentifier(String userID, ReadableMap attributes) {
        try {
            Log.i(TAG, "userIdentifier !!");
            JSONObject mAttributes = null;

            if (attributes != null) {
                HashMap<String, Object> temp = attributes.toHashMap();
                mAttributes = new JSONObject(temp);
            }

            if (userID != null) {
                Log.i(TAG, "User : " + userID);
            } else {
                Log.i(TAG, "User : null");
            }

            if (mAttributes != null) {
                Log.i(TAG, "Attributes : " + mAttributes);
            } else {
                Log.i(TAG, "Attributes : null");
            }

            NotifyVisitorsApi.getInstance(reactContext).userIdentifier(userID, mAttributes);
        } catch (Exception e) {
            Log.i(TAG, "USER IDENTIFIER ERROR : " + e);
        }
    }

    @ReactMethod
    public void setUserIdentifier(ReadableMap attributes, final Callback callback) {
        try {
            Log.i(TAG, "setUserIdentifier !!");
            JSONObject mAttributes = null;

            if (attributes != null) {
                HashMap<String, Object> temp = attributes.toHashMap();
                mAttributes = new JSONObject(temp);
            }

            if (mAttributes != null) {
                Log.i(TAG, "Attributes : " + mAttributes);
            } else {
                Log.i(TAG, "Attributes : null");
            }

            NotifyVisitorsApi.getInstance(reactContext).userIdentifier(mAttributes, new OnUserTrackListener() {
                @Override
                public void onResponse(JSONObject data) {
                    if (data != null) {
                        callback.invoke(data.toString());
                    } else {
                        callback.invoke("{}");
                    }                    
                }
            });
        } catch (Exception e) {
            Log.i(TAG, "SET USER IDENTIFIER ERROR : " + e);
        }
    }
    
    /* 5 - chatBot */
    @ReactMethod
    public void startChatBot(final String screenName) {
        try {
            Log.i(TAG, "START CHAT BOT !!");
            if (screenName == null || screenName.equalsIgnoreCase("empty")) {
                Log.i(TAG, "SCREEN NAME IS MISSING");
            } else {
                //mActivity = getCurrentActivity();
                mActivity = reactContext.getCurrentActivity();
                if (mActivity != null) {
                    mActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            // NotifyVisitorsApi.getInstance(mActivity).startChatBot(screenName, new OnNotifyBotClickListener() {
                            //     @Override
                            //     public void onInAppRedirection(JSONObject data) {
                            //         String strI = data.toString();
                            //         sendEvent(CHAT_BOT_BUTTON_CLICK, strI);
                            //     }
                            // });
                        }
                    });
                } else {
                    Log.e(TAG, "Getting Null Activity !!");
                }
            }

        } catch (Exception e) {
            Log.i(TAG, "START CHAT BOT ERROR : " + e);
        }
    }

    /* 6 - Push Notification Channel */
    @ReactMethod
    public void createNotificationChannel(String chId, String chName, String chDescription, String chImportance, String enableLights, String shouldVibrate, String lightColor, String soundFileName) {
        try {
            Log.i(TAG, "CREATE NOTIFICATION CHANNEL !!");

            boolean iShouldVibrate = true, iEnableLights = true;
            int iChImportance = 3;


            if (lightColor == null || lightColor.isEmpty()) {
                lightColor = "#ffffff";
            }

            if (soundFileName == null || soundFileName.isEmpty()) {
                soundFileName = "";
            }
            if (chImportance != null && !chImportance.isEmpty()) {
                iChImportance = Integer.parseInt(chImportance);
            }

            if (enableLights != null && !enableLights.isEmpty()) {
                if (enableLights.equalsIgnoreCase("false")) {
                    iEnableLights = false;
                }
            }

            if (shouldVibrate != null && !shouldVibrate.isEmpty()) {
                if (shouldVibrate.equalsIgnoreCase("false")) {
                    iShouldVibrate = false;
                }
            }

            NVNotificationChannels.Builder builder1 = new NVNotificationChannels.Builder();
            builder1.setChannelID(chId);
            builder1.setChannelName(chName);
            builder1.setImportance(iChImportance);
            builder1.setChannelDescription(chDescription);
            builder1.setEnableLights(iEnableLights);
            builder1.setLightColor(Color.parseColor(lightColor));
            builder1.setSoundFileName(soundFileName);
            builder1.setShouldVibrate(iShouldVibrate);
            builder1.setVibrationPattern(new long[]{1000, 1000, 1000, 1000, 1000});
            builder1.build();

            Set<NVNotificationChannels.Builder> nChannelSets = new HashSet<>();
            nChannelSets.add(builder1);

            NotifyVisitorsApi.getInstance(reactContext).createNotificationChannel(nChannelSets);


        } catch (Exception e) {
            Log.i(TAG, "CREATE NOTIFICATION CHANNEL ERROR : " + e);
        }
    }

    /* 7 - Push Notification Channel */
    @ReactMethod
    public void deleteNotificationChannel(String chId) {
        try {
            Log.i(TAG, "DELETE NOTIFICATION CHANNEL !! ");
            NotifyVisitorsApi.getInstance(reactContext).deleteNotificationChannel(chId);

        } catch (Exception e) {
            Log.i(TAG, "DELETE NOTIFICATION CHANNEL ERROR : " + e);
        }
    }

    /* 8 - Push Notification Channel Group */
    @ReactMethod
    public void createNotificationChannelGroup(String groupId, String groupName) {
        try {
            Log.i(TAG, "CREATE NOTIFICATION CHANNEL GROUP !!");
            NotifyVisitorsApi.getInstance(reactContext).createNotificationChannelGroup(groupId, groupName);
        } catch (Exception e) {
            Log.i(TAG, "CREATE NOTIFICATION CHANNEL GROUP ERROR : " + e);
        }
    }

    /* 9 - Push Notification Channel Group */
    @ReactMethod
    public void deleteNotificationChannelGroup(String groupId) {
        try {
            Log.i(TAG, "CREATE NOTIFICATION CHANNEL GROUP !!");
            NotifyVisitorsApi.getInstance(reactContext).deleteNotificationChannelGroup(groupId);
        } catch (Exception e) {
            Log.i(TAG, "CREATE NOTIFICATION CHANNEL GROUP ERROR " + e);
        }
    }

    /* 10 - Unread Push Notification Count */
    @ReactMethod
    public void getNotificationCenterCount(ReadableMap tabCountInfo, final Callback callback) {
        Log.i(TAG, "GET NOTIFICATION CENTER COUNT !!");
        tab1Label = null;
        tab1Name = null;
        tab2Label = null;
        tab2Name = null;
        tab3Label = null;
        tab3Name = null;

        JSONObject appInboxInfo;
        try {
            if (tabCountInfo != null) {
                HashMap<String, Object> temp = tabCountInfo.toHashMap();
                appInboxInfo = new JSONObject(temp);

                try {
                    tab1Label = appInboxInfo.getString("label_one");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB1LABEL ERROR :" + e);
                }

                try {
                    tab1Name = appInboxInfo.getString("name_one");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB1NAME ERROR :" + e);
                }

                try {
                    tab2Label = appInboxInfo.getString("label_two");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB2LABEL ERROR :" + e);
                }

                try {
                    tab2Name = appInboxInfo.getString("name_two");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB2NAME ERROR :" + e);
                }

                try {
                    tab3Label = appInboxInfo.getString("label_three");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB3LABEL ERROR :" + e);
                }

                try {
                    tab3Name = appInboxInfo.getString("name_three");
                } catch (Exception e) {
                    Log.i(TAG, "SHOW NOTIFICATIONS TAB3NAME ERROR :" + e);
                }


                if (tab1Label.equalsIgnoreCase("null")) {
                    tab1Label = null;
                }

                if (tab1Name.equalsIgnoreCase("null")) {
                    tab1Name = null;
                }

                if (tab2Label.equalsIgnoreCase("null")) {
                    tab2Label = null;
                }

                if (tab2Name.equalsIgnoreCase("null")) {
                    tab2Name = null;
                }

                if (tab3Label.equalsIgnoreCase("null")) {
                    tab3Label = null;
                }

                if (tab3Name.equalsIgnoreCase("null")) {
                    tab3Name = null;
                }

                final NVCenterStyleConfig config = new NVCenterStyleConfig();
                config.setFirstTabDetail(tab1Label, tab1Name);
                config.setSecondTabDetail(tab2Label, tab2Name);
                config.setThirdTabDetail(tab3Label, tab3Name);


                mActivity = reactContext.getCurrentActivity();
                if (mActivity != null) {
                    mActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            NotifyVisitorsApi.getInstance(reactContext).getNotificationCenterCount(new OnCenterCountListener() {
                                @Override
                                public void getCount(JSONObject tabCount) {
                                    Log.i(TAG, "Tab Counts : " + tabCount);
                                    if (tabCount != null) {
                                        callback.invoke(tabCount.toString());
                                    } else {
                                        Log.i(TAG, "GETTING NULL COUNT OBJECT !!");
                                    }
                                }
                            }, config);
                        }
                    });
                } else {
                    Log.e(TAG, "Getting Null Activity !!");
                }

            } else {
                Log.i(TAG, "INFO IS NULL GOING FOR STANDARD NOTIFICATION CENTER COUNT  !!");
                mActivity = reactContext.getCurrentActivity();
                if (mActivity != null) {
                    mActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            NotifyVisitorsApi.getInstance(reactContext).getNotificationCenterCount(new OnCenterCountListener() {
                                @Override
                                public void getCount(JSONObject tabCount) {
                                    Log.i(TAG, "Tab Counts : " + tabCount);
                                    if (tabCount != null) {
                                        callback.invoke(tabCount.toString());
                                    } else {
                                        Log.i(TAG, "GETTING NULL COUNT OBJECT !!");
                                    }
                                }
                            }, null);
                        }
                    });
                } else {
                    Log.e(TAG, "Getting Null Activity !!");
                }
            }
        } catch (Exception e) {
            Log.i(TAG, "NOTIFICATION CENTER COUNT ERROR : " + e);
        }
    }

    /* 11 - Get FCM/APNS Device Token */
    @ReactMethod
    public void getRegistrationToken(final Callback callback) {
        try {
            Log.i(TAG, "GET NOTIFICATION CENTER COUNT !!");
            JSONObject nv_token = NotifyVisitorsApi.getInstance(reactContext).getPushRegistrationToken();
            if (nv_token != null) {
                String token = nv_token.getString("subscriptionId");
                callback.invoke(token);
            } else {
                callback.invoke("unavailable");
            }

        } catch (Exception e) {
            Log.i(TAG, "GET NOTIFICATION CENTER COUNT ERROR : " + e);
        }
    }

    /* 12 - Play Store / App Store Rating  */
    @ReactMethod
    public void requestInAppReview(final Callback callback) {
        Log.i(TAG, "GOOGLE IN-APP REVIEW !!");
        try {
            mActivity = reactContext.getCurrentActivity();
            if (mActivity != null) {
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
//                        NotifyVisitorsApi.getInstance(mActivity).enableGoogleInAppReview(new OnReviewCompleteListener() {
//                            @Override
//                            public void onComplete(String reviewStatus) {
//                                callback.invoke(reviewStatus);
//                            }
//                        });
                    }
                });
            } else {
                Log.e(TAG, "Getting Null Activity !!");
            }

        } catch (Exception e) {
            Log.i(TAG, "GOOGLE IN-APP REVIEW  ERROR : " + e);
        }
    }

    /* 13 - Category based Notification  */
    @ReactMethod
    public void subscribePushCategory(ReadableArray categoryInfo, boolean unsubscribeSignal) {
        Log.i(TAG, "SUBSCRIBE PUSH CATEGORY !!");
        try {
            JSONArray mCategoryInfo;
            if (categoryInfo != null) {
                mCategoryInfo = readableArrayToJSONArray(categoryInfo);
                Log.i(TAG, "Category Info :" + mCategoryInfo.toString());
                NotifyVisitorsApi.getInstance(reactContext).pushPreferences(mCategoryInfo, unsubscribeSignal);
            }
        } catch (Exception e) {
            Log.i(TAG, "SUBSCRIBE PUSH CATEGORY ERROR : " + e);
        }
    }


    /* 14 - Push /InApp / Notification Center Click Callback Data */
    @ReactMethod
    public void getLinkInfo() {
        try {
            Log.i(TAG, "GET LINK INFO !!");
            if (finalData != null) {
                sendEvent(PUSH_BANNER_CLICK_EVENT, finalData);
            }
        } catch (Exception e) {
            Log.i(TAG, "GET LINK INFO ERROR : " + e);
        }
    }

    @ReactMethod
    public void knownUserIdentified(final Callback callback) {
        onKnownUserIdentifiedCallback = callback;
        
        try {
            Log.i(TAG, "KNOWN USER IDENTIFIED !!");
            NotifyVisitorsApi.getInstance(reactContext).knownUserIdentified(new OnKnownUserFound() {
                @Override
                public void getNvUid(JSONObject data) {
                    if (data != null) {
                        sendEvent(KNOWN_USER_IDENTIFIED_CALLBACK, data.toString());
                    }
                }
            });
        } catch (Exception e) {
            Log.i(TAG, "KNOWN USER IDENTIFIED ERROR : " + e);
        }
    }

    /* 15 - Unique NotifyVisitors Identification  */
    @ReactMethod
    public void getNvUID(final Callback callback) {
        try {
            Log.i(TAG, "GET NV UID !!");
            String strI = NotifyVisitorsApi.getInstance(reactContext).getNvUid();
            callback.invoke(strI);
        } catch (Exception e) {
            Log.i(TAG, "GET NV UID ERROR : " + e);
        }
    }

    /* 16 - JSon Data For Custom Notification Center  */
    @ReactMethod
    public void getNotificationDataListener(final Callback callback) {
        try {
            Log.i(TAG, "GET NOTIFICATION DATA LISTENER !!");
            mActivity = reactContext.getCurrentActivity();
            if (mActivity != null) {
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        NotifyVisitorsApi.getInstance(reactContext).getNotificationDataListener(new NotificationListDetailsCallback() {
                            @Override
                            public void getNotificationData(JSONArray notificationListResponse) {
                                try {
                                    //Log.i(TAG, "RESPONSE : " + notificationListResponse);
                                    if (notificationListResponse != null) {
                                        callback.invoke(notificationListResponse.toString());
                                    } else {
                                        callback.invoke("[]"); // Return empty array if null
                                    }
                                } catch (Exception e) {
                                    Log.i(TAG, "GET NOTIFICATION DATA LISTENER ERROR 2 : " + e);  
                                }
                            }
                        }, 0);
                    }
                });
            } else {
                Log.e(TAG, "Getting Null Activity !!");
            }
        } catch (Exception e) {
            Log.i(TAG, "GET NOTIFICATION DATA LISTENER ERROR : " + e);
        }
    }

    @ReactMethod
    public void getNotificationCenterData(final Callback callback) {
        try {
            Log.i(TAG, "GET NOTIFICATION DATA LISTENER !!");
            mActivity = reactContext.getCurrentActivity();
            if (mActivity != null) {
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        NotifyVisitorsApi.getInstance(mActivity).getNotificationCenterData(new OnCenterDataListener() {
                            @Override
                            public void getData(JSONObject jsonObject) {
                                try {
                                    //Log.i(TAG, "RESPONSE : " + jsonObject);
                                    if (jsonObject != null) {
                                        callback.invoke(jsonObject.toString());
                                    }
                                } catch (Exception e) {
                                    Log.i(TAG, "GET NOTIFICATION CENTER DATA ERROR 2 : " + e);  
                                }
                            }
                        });
                    }
                });
            } else {
                Log.e(TAG, "Getting Null Activity !!");
            }

        } catch (Exception e) {
            Log.i(TAG, "GET NOTIFICATION DATA LISTENER ERROR : " + e);
        }
    }


    /* 17 - Auto Start Library Android  */
    @ReactMethod
    public void setAutoStartPermission() {
        try {
            Log.i(TAG, "SET AUTOSTART PERMISSION !!");
            mActivity = reactContext.getCurrentActivity();
            if (mActivity != null) {
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        NotifyVisitorsApi.getInstance(reactContext).setAutoStartPermission(mActivity);
                    }
                });
            } else {
                Log.e(TAG, "Getting Null Activity !!");
            }
        } catch (Exception e) {
            Log.i(TAG, "SET AUTOSTART PERMISSION ERROR : " + e);
        }
    }

    /* 18 - Stop Showing InApp Banner Survey  */
    @ReactMethod
    public void stopNotifications() {
        try {
            Log.i(TAG, "STOP NOTIFICATIONS !!");
            // NotifyVisitorsApi.getInstance(reactContext).stopNotification();
            if (reactContext.getCurrentActivity() != null) NotifyVisitorsApi.getInstance(reactContext.getCurrentActivity()).stopNotification();
        } catch (Exception e) {
            Log.i(TAG, "STOP NOTIFICATIONS ERROR : " + e);
        }
    }

    /* 19 - Stop Showing Location Push for a custom time  */
    @ReactMethod
    public void stopGeofencePushforDateTime(String dateTime, String additionalHours) {
        try {
            Log.i(TAG, "STOP GEOFENCE PUSH FOR DATE TIME !!");
            int jAdditionalHours = 0;
            boolean lock = true;
            if (dateTime == null || dateTime.length() == 0) {
                Log.i(TAG, "DATETIME CAN NOT BE NULL OR EMPTY");
                lock = false;
            }

            if (additionalHours == null || additionalHours.length() == 0) {
                jAdditionalHours = 0;
            } else {
                jAdditionalHours = Integer.parseInt(additionalHours);
            }

            if (lock) {
                NotifyVisitorsApi.getInstance(reactContext).stopGeofencePushforDateTime(dateTime, jAdditionalHours);
                lock = true;
            }

        } catch (Exception e) {
            Log.i(TAG, "STOP GEOFENCE PUSH FOR DATE TIME ERROR : " + e);
        }

    }

    /* 20 - Trigger Push Notification on Panel */
    @ReactMethod
    public void scheduleNotification(String nid, String tag, String time, String title, String message, String url, String icon) {
        try {
            Log.i(TAG, "SCHEDULE NOTIFICATION !!");
            NotifyVisitorsApi.getInstance(reactContext).scheduleNotification(nid, tag, time, title, message, url, icon);
        } catch (Exception e) {
            Log.i(TAG, "SCHEDULE NOTIFICATION ERROR : " + e);
        }
    }

    /* 21 - Separate Callbacks For Events and Surveys */
    @ReactMethod
    public void getEventSurveyInfo(Callback callback) {
        try {
            Log.i(TAG, "GET EVENT SURVEY INFO !!");
            commonCallback = callback;
        } catch (Exception e) {
            Log.i(TAG, "GET EVENT SURVEY INFO ERROR : " + e);
        }
    }

    /* 22 - Depricated Function For Notification Count */
    @ReactMethod
    public void getNotificationCount(final Callback callback) {
        try {
            Log.i(TAG, "GET NOTIFICATION COUNT !!");
            NotifyVisitorsApi.getInstance(reactContext).getNotificationCount(new NotificationCountInterface() {
                @Override
                public void getCount(int count) {
                    try {
                        Log.i(TAG, "COUNT : " + count);
                        String strI = String.valueOf(count);
                        if (strI == null || strI.isEmpty()) {
                            strI = "0";
                        }
                        callback.invoke(strI);
                    } catch (Exception e) {
                        Log.i(TAG, "GET NOTIFICATION COUNT ERROR 2 : " + e);  
                    }
                }
            });
        } catch (Exception e) {
            Log.i(TAG, "GET NOTIFICATION COUNT ERROR : " + e);
        }
    }

    @ReactMethod
    public void pushPermissionPrompt(ReadableMap campaignInfo, final Callback callback) {
        try {
            Log.i(TAG, "PUSH PERMISSION PROMPT !!");
            String title = campaignInfo.getString("title");
            String titleTextColor = campaignInfo.getString("titleTextColor");
            String description = campaignInfo.getString("description");
            String descriptionTextColor = campaignInfo.getString("descriptionTextColor");
            String backgroundColor = campaignInfo.getString("backgroundColor");
            String buttonOneBorderColor = campaignInfo.getString("buttonOneBorderColor");
            String buttonOneBackgroundColor = campaignInfo.getString("buttonOneBackgroundColor");
            String buttonOneBorderRadius = campaignInfo.getString("buttonOneBorderRadius");
            String buttonOneText = campaignInfo.getString("buttonOneText");
            String buttonOneTextColor = campaignInfo.getString("buttonOneTextColor");
            String buttonTwoText = campaignInfo.getString("buttonTwoText");
            String buttonTwoTextColor = campaignInfo.getString("buttonTwoTextColor");
            String buttonTwoBackgroundColor = campaignInfo.getString("buttonTwoBackgroundColor");
            String buttonTwoBorderColor = campaignInfo.getString("buttonTwoBorderColor");
            String buttonTwoBorderRadius = campaignInfo.getString("buttonTwoBorderRadius");
            String numberOfSessions = campaignInfo.getString("numberOfSessions");
            String resumeInDays = campaignInfo.getString("resumeInDays");
            String numberOfTimesPerSession = campaignInfo.getString("numberOfTimesPerSession");

            NVPopupDesign design = new NVPopupDesign();
            design.setTitle(title);
            design.setTitleTextColor(titleTextColor);
            design.setDescription(description);
            design.setDescriptionTextColor(descriptionTextColor);
            design.setBackgroundColor(backgroundColor);
            design.setButtonOneBorderColor(buttonOneBorderColor);
            design.setButtonOneBackgroundColor(buttonOneBackgroundColor);
            design.setButtonOneBorderRadius(Integer.parseInt(buttonOneBorderRadius));
            design.setButtonOneText(buttonOneText);
            design.setButtonOneTextColor(buttonOneTextColor);
            design.setButtonTwoText(buttonTwoText);
            design.setButtonTwoTextColor(buttonTwoTextColor);
            design.setButtonTwoBackgroundColor(buttonTwoBackgroundColor);
            design.setButtonTwoBorderColor(buttonTwoBorderColor);
            design.setButtonTwoBorderRadius(Integer.parseInt(buttonTwoBorderRadius));
            design.setNumberOfSessions(Integer.parseInt(numberOfSessions));
            design.setResumeInDays(Integer.parseInt(resumeInDays));
            design.setNumberOfTimesPerSession(Integer.parseInt(numberOfTimesPerSession));
            mActivity = reactContext.getCurrentActivity();
            if (mActivity != null) {
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        NotifyVisitorsApi.getInstance(mActivity).activatePushPermissionPopup(design, new OnPushRuntimePermission() {
                            @Override
                            public void getPopupInfo(JSONObject result) {
                                try {
                                    Log.i(TAG, "Popup Response => " + result);
                                    if (result != null) {
                                        callback.invoke(result.toString());
                                    } 
                                } catch (Exception e) {
                                    Log.i(TAG, "PUSH PERMISSION PROMPT ERROR 2 : " + e);
                                }
                                
                                
                            }
                        });
                    }
                });
            } else {
                Log.e(TAG, "Getting Null Activity !!");
            }
        } catch (Exception e) {
            Log.i(TAG, "PUSH PERMISSION PROMPT ERROR : " + e);
        }
    }

    @ReactMethod
    public void clearPushData() {
        try {
            Log.i(TAG, "CLEAR PUSH DATA !!");
            intentDataClear();
        } catch (Exception e) {
            Log.i(TAG, "CLEAR PUSH DATA : " + e);
        }
    }

    @ReactMethod
    public void checkPushActive(String nv_choice) {
        try {
            Log.i(TAG, "Check Push Active !!");
            boolean signal = true;
            if (nv_choice.equalsIgnoreCase("false")) {
                signal = false;
            }
            NotifyVisitorsApi.getInstance(reactContext).enablePushPermission(signal);
        } catch (Exception e) {
            Log.i(TAG, "Check Push Active !! " + e);
        }
    }

    @ReactMethod
    public void nativePushPermissionPrompt(final Callback callback) {
        try {
            Log.i(TAG, "Check Native Push Permission Prompt !!");

            mActivity = reactContext.getCurrentActivity();
            if (mActivity != null) {
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        NotifyVisitorsApi.getInstance(mActivity).nativePushPermissionPrompt(new OnPushRuntimePermission() {
                            @Override
                            public void getPopupInfo(JSONObject result) {
                                try {
                                    Log.i(TAG, "Popup Response => " + result);
                                    if (result != null) {
                                        callback.invoke(result.toString());
                                    } 
                                } catch (Exception e) {
                                    Log.i(TAG, "NATIVE PUSH PERMISSION PROMPT ERROR 2 : " + e);
                                }
                            }
                        });
                    }
                });
            } else {
                Log.e(TAG, "Getting Null Activity !!");
            }
        } catch (Exception e) {
            Log.i(TAG, "Check Native Push Permission Prompt !! " + e);
        }
    }

    private void intentDataClear() {
        try {
            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    Log.i(TAG, "Intent Data Cleared !!!!");
                    finalData = null;
                }
            }, NV_TIME_OUT);

        } catch (Exception e) {
            Log.i(TAG, "Intent Data Clear ERROR : " + e);
        }

    }

    @ReactMethod
    private void isPayloadFromNvPlatform(String pushPayload, Callback callback) {
        Log.i(TAG, "Is Payload From Nv Platform !!");
        boolean b = false;

        try {
            JSONObject jsonObject = new JSONObject(pushPayload);
            Intent intent = new Intent();
            Iterator<String> keys = jsonObject.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                // Process key-value pairs
                Object value = jsonObject.get(key);
                if (value instanceof Integer) {
                    intent.putExtra(key, (Integer) value);
                } else if (value instanceof String) {
                    intent.putExtra(key, (String) value);
                } else if (value instanceof Boolean) {
                    intent.putExtra(key, (Boolean) value);
                }
            }
            b = NotifyVisitorsApi.getInstance(reactContext).isPayloadFromNvPlatform(intent);
        } catch (Exception e) {
            Log.e(TAG, "error = " + e);
        }

        if (b) callback.invoke("true"); else callback.invoke("false");
    }

    @ReactMethod
    private void getNV_FCMPayload(String pushPayload) {
        Log.i(TAG, "Get NV FCM Payload !!");

        try {
            JSONObject jsonObject = new JSONObject(pushPayload);
            Intent intent = new Intent();
            Iterator<String> keys = jsonObject.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                // Process key-value pairs
                Object value = jsonObject.get(key);
                if (value instanceof Integer) {
                    intent.putExtra(key, (Integer) value);
                } else if (value instanceof String) {
                    intent.putExtra(key, (String) value);
                } else if (value instanceof Boolean) {
                    intent.putExtra(key, (Boolean) value);
                }
            }
            NotifyVisitorsApi.getInstance(reactContext).getNV_FCMPayload(intent);
        } catch (Exception e) {
            Log.e(TAG, "error = " + e);
        }
    }

    @ReactMethod
    public void trackScreen(String screenName) {
        try {
            Log.i(TAG, "TRACK SCREEN !!");

            if (screenName != null) {
                Log.i(TAG, "Screen Name : " + screenName);
            } else {
                Log.i(TAG, "Screen Name : null");
            }

            NotifyVisitorsApi.getInstance(reactContext).trackScreen(screenName);
        } catch (Exception e) {
            Log.i(TAG, "TRACK SCREEN ERROR : " + e);
        }
    }

    /* On Activity Result */
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        //this.onActivityResult(activity, requestCode, resultCode, data);
        Log.i(TAG, "ON ACTIVITY RESULT !!");
    }

    /* On New Intents */
    @Override
    public void onNewIntent(Intent intent) {
        try {
            Log.i(TAG, "ON NEW INTENT !!");
            if (intent != null) {
                handleIntent(intent);
            }
        } catch (Exception e) {
            Log.i(TAG, "ON NEW INTENT ERROR : " + e);
        }
    }

    /* Process data from intent */
    private void handleIntent(Intent intent) {
        Log.i(TAG, "INSIDE HANDLE INTENT !!!!");

        JSONObject dataInfo, finalDataInfo;
        String action = intent.getAction();
        Uri url = intent.getData();
        finalDataInfo = new JSONObject();

        // if app was not launched by the url - ignore
        if (!Intent.ACTION_VIEW.equals(action) || url == null) {
            if ((intent.hasExtra("source") && intent.getStringExtra("source").equalsIgnoreCase("nv")) || (intent.hasExtra("notifyvisitors_cta"))) {
                try {
                    Bundle bundle = intent.getExtras();
                    if (bundle != null) {
                        dataInfo = new JSONObject();
                        String nv_type = "push";
                        String nv_new_payload = (intent.hasExtra("notifyvisitors_cta") ? intent.getStringExtra("notifyvisitors_cta") : "");
                        for (String key : bundle.keySet()) {
                            try {
                                dataInfo.put(key, JSONObject.wrap(bundle.get(key)));
                                if (key.equals("nv_type")) {
                                    try {
                                        nv_type = bundle.get(key).toString();
                                    } catch (Exception e) {
                                        //e.printStackTrace();
                                    }
                                }
                            } catch (Exception e) {
                                //e.printStackTrace();
                            }
                        }

                        if (dataInfo.has("notifyvisitors_cta")) {
                            try {
                                dataInfo.remove("notifyvisitors_cta");
                            } catch (Exception e) {
                                //e.printStackTrace();
                            }
                        }

                        dataInfo.put("type", nv_type);
                        finalDataInfo.put("parameters", dataInfo);
                        if (nv_new_payload != null && !nv_new_payload.isEmpty()) {
                            finalDataInfo.put("notifyvisitors_cta", new JSONObject(nv_new_payload));
                        }
                        finalData = finalDataInfo.toString();
                        //Log.d(TAG, "finalDataInfo => " + finalDataInfo);
                        sendEvent(PUSH_BANNER_CLICK_EVENT, finalData);

                        // try to send callback in show function
                        // try {
                        //     if (nv_type.equalsIgnoreCase("banner")) {
                        //         JSONObject bannerData = new JSONObject();
                        //         bannerData.put("status", "success");
                        //         bannerData.put("eventName", "Banner Clicked");
                        //         bannerData.put("callbackType", "banner");
                        //         bannerData.put("parameters", dataInfo);
                        //         sendResponse(bannerData);
                        //         nvInAppFound = true;
                        //     }
                        // } catch (Exception e) {
                        //     Log.i(TAG, "SEND DATA IN SHOW METHOD ERROR : " + e);
                        // }

                    }
                } catch (Exception e) {
                    Log.i(TAG, "HANDLE INTENT PARSE DATA ERROR : " + e);
                }
            }
        } else {
            try {
                Set<String> queryParameter = url.getQueryParameterNames();
                dataInfo = new JSONObject();
                for (String s : queryParameter) {
                    String mValue = url.getQueryParameter(s);
                    dataInfo.put(s, mValue);
                }
                finalDataInfo.put("parameters", dataInfo);
            } catch (Exception e) {
                Log.i(TAG, "QUERY PARAMETER ERROR : " + e);
            }

            try {
                JSONObject ourl = new JSONObject();
                String mSchema = url.getScheme();
                String host = url.getHost();
                String path = url.getPath();
                ourl.put("scheme", mSchema);
                ourl.put("host", host);
                ourl.put("path", path);
                //ourl.put("source", "nv");

                finalDataInfo.put("url", ourl);
                finalData = finalDataInfo.toString();
                sendEvent(PUSH_BANNER_CLICK_EVENT, finalData);

                //Log.e(TAG, "finalDataInfo = "+finalData);
            } catch (Exception e) {
                Log.i(TAG, "JSON OBJECT ERROR : " + e);
            }
        }
    }

    /* Send Event Callback to React Native Page */
    private void sendEvent(String eventName, String params) {
        try {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
        } catch (Exception e) {
            Log.i(TAG, "SEND EVENT ERROR :" + e);
        }
    }


    /* Process click data from event and InApp Survey */
    private void sendResponse(JSONObject response) {
        try {
            if (response != null) {
                String eventName = (response.has("eventName")) ? response.getString("eventName") : "";

                // check clicked is banner or survey
                if (eventName.equalsIgnoreCase("Survey Submit") || eventName.equalsIgnoreCase("Survey Attempt") || eventName.equalsIgnoreCase("Banner Impression") || eventName.equalsIgnoreCase("Banner Clicked")) {
                    nvInAppFound = true;
                    if (showCallback != null) {
                        sendEvent(SHOW_CALLBACK, response.toString());
                    } else {
                        Log.i(TAG, "SHOW CALLBACK CONTEXT IS NULL !!");
                    }
                } else {
                    if (eventCallback != null) {
                        sendEvent(EVENT_CALLBACK, response.toString());
                    } else {
                        Log.i(TAG, "EVENT CALLBACK CONTEXT IS NULL !!");
                    }
                }

                // send commom callback
                if (commonCallback != null) {
                    sendEvent(COMMON_SHOW_EVENT_CALLBACK, response.toString());
                }

                if (centerCallback != null) {
                    sendEvent(CENTER_CALLBACK, response.toString());
                }
            } else {
                Log.i(TAG, "RESPONSE IS NULL !!");
            }

        } catch (Exception e) {
            Log.i(TAG, "SURVEY SEND RESPONSE ERROR : " + e);
        }


    }

    private JSONArray readableArrayToJSONArray(ReadableArray readableArray) {
        JSONArray result = new JSONArray();
        for (int i = 0; i < readableArray.size(); i++) {
            String tmp = readableArray.getString(i);
            result.put(tmp);
        }
        return result;
    }

}