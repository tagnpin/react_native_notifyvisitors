package com.rn_notifyvisitors;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import androidx.annotation.NonNull;

public class RNNotifyvisitorsPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
      return Arrays.<NativeModule>asList(new RNNotifyvisitorsModule(reactContext));
    }

    // Deprecated from RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
      return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
      return Arrays.asList(
        new RNNotifyVisitorsEmbedViewManager() // This should include NotifyvisitorsNativeDisplay
      );
    }
}