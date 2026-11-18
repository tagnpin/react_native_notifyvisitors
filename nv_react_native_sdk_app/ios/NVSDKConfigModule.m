//
//  NVSDKConfigModule.m
//  nv_react_native_sdk_app
//
//  Created by Notifyvisitors Macbook Pro 001  on 10/03/26.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NVSDKConfig, NSObject)

RCT_EXTERN_METHOD(
  getNVBrandID:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

@end

