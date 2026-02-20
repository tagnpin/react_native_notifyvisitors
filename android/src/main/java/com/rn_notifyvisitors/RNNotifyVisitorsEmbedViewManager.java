package com.rn_notifyvisitors;

import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import com.notifyvisitors.notifyvisitors.NotifyVisitorsApi;
import com.notifyvisitors.nudges.NotifyVisitorsNativeDisplay;

import java.util.HashMap;
import java.util.Map;


public class RNNotifyVisitorsEmbedViewManager extends SimpleViewManager<NotifyVisitorsNativeDisplay> {
    public static final String REACT_CLASS = "NotifyvisitorsNativeDisplay";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected NotifyVisitorsNativeDisplay createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        NotifyVisitorsNativeDisplay nativeDisplay = new NotifyVisitorsNativeDisplay(themedReactContext);
        nativeDisplay.setVisibility(View.INVISIBLE);
        nativeDisplay.setLayoutParams(new ViewGroup.LayoutParams(0, 0));
        
        NotifyVisitorsApi.getInstance(themedReactContext).nudgeUiFinalized(info -> {
            WritableMap event = Arguments.createMap();
            event.putString("data", info.toString());
            // Log.d("RNNotifyVisitors", "Nudge UI finalized with info: " + info.toString());
            
            // 🔑 Ensure event fires only after view is mounted
            nativeDisplay.post(() -> {
                 themedReactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(nativeDisplay.getId(), "onNudgeUiFinalized", event);
            });
        });
        
        return nativeDisplay;
    
    }

    @ReactProp(name = "propertyName")
    public void setPropertyName(NotifyVisitorsNativeDisplay view, String propertyName) {
        view.loadContent(propertyName);
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        final Map<String, Object> eventMap = new HashMap<>();
        final Map<String, String> registration = new HashMap<>();
        registration.put("registrationName", "onNudgeUiFinalized");

        eventMap.put("topNudgeUiFinalized", registration);
        return eventMap;
    }

}
