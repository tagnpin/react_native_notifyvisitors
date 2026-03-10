package com.notifyvisitors.rn.sdkapp

import com.facebook.react.bridge.*

class NVSDKConfigModule(reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "NVSDKConfig"

    @ReactMethod
    fun getNVBrandID(promise: Promise) {
        promise.resolve(BuildConfig.nvBrandID)
    }
}