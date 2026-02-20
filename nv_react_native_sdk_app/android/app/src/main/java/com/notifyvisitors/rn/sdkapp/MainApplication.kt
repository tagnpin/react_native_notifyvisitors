package com.notifyvisitors.rn.sdkapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.rn_notifyvisitors.RNNotifyvisitorsModule
import android.util.Log

class MainApplication : Application(), ReactApplication {

  val nvBrandID: Int = BuildConfig.nvBrandID
  val nvSecreKey: String = BuildConfig.nvSecretKey

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    Log.w("rn-nv-android", "nvBrandID = " + nvBrandID + " nvSecreKey = " + nvSecreKey)
    RNNotifyvisitorsModule.register(this, nvBrandID, nvSecreKey);
    loadReactNative(this)
  }
}
