//
//  NVSDKConfigModule.swift
//  nv_react_native_sdk_app
//
//  Created by Notifyvisitors Macbook Pro 001  on 10/03/26.
//

import Foundation
import React
import ReactAppDependencyProvider

@objc(NVSDKConfig)
class NVSDKConfig: NSObject {

  @objc
  func getNVBrandID(_ resolve: RCTPromiseResolveBlock,
                 rejecter reject: RCTPromiseRejectBlock) {
    print("NVSDKConfig: getNVBrandID()")
    if let nvBrnadIDStr = Bundle.main.object(
           forInfoDictionaryKey: "nvBrandID"
       ) as? String {

           resolve(nvBrnadIDStr)
       } else {
           reject("NVSDKConfig", "BrandID not found", nil)
       }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
