import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UserNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "nv_react_native_sdk_app",
      in: window,
      launchOptions: launchOptions
    )
    
    
    var nvMode:String? = nil

     #if DEBUG
         nvMode = "debug"
     #else
         nvMode = "live"
    #endif
    
    /// SAFELY read int values
    let nvAccountBrnadIDStr = Bundle.main.object(forInfoDictionaryKey: "nvBrandID") as? String
    let nvAccountBrnadIDInt = Int(nvAccountBrnadIDStr ?? "") ?? 0
    
    /// SAFELY read string values
    let nvAccountSecretKey = Bundle.main.object(forInfoDictionaryKey: "nvSecretKey") as? String ?? ""
    
    
    let config = NVConfiguration()
    config.brandID = nvAccountBrnadIDInt
    config.secretKey = nvAccountSecretKey
    config.appMode = nvMode
    
    UNUserNotificationCenter.current().delegate = self
  
    RNNotifyvisitors.nvRegister(withConfiguration: config)
  //  RNNotifyvisitors.initialize(withBrandId: nvAccountBrnadIDInt, secretKey: nvAccountSecretKey, launchingOptions: launchOptions)
    RNNotifyvisitors.registerPush(withDelegate: self, app: application, launchOptions: launchOptions)
    
    return true
  }
  
  
//  func applicationDidEnterBackground(_ application: UIApplication) {
//    RNNotifyvisitors.applicationDidEnterBackground(application)
//  }
//  func applicationDidBecomeActive(_ application: UIApplication) {
//    RNNotifyvisitors.applicationDidBecomeActive(application)
//  }
//  func applicationWillEnterForeground(_ application: UIApplication) {
//    RNNotifyvisitors.applicationWillEnterForeground(application)
//  }
//  
//  func applicationWillTerminate(_ application: UIApplication) {
//    RNNotifyvisitors.applicationWillTerminate()
//  }
  
//  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
//    RNNotifyvisitors.openUrl(with: app, url: url)
//   
//    return true
//  }

//  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
//    RNNotifyvisitors.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
//  }
  
//  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: any Error) {
//    RNNotifyvisitors.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
//  }
  
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}

//extension AppDelegate: UNUserNotificationCenterDelegate {
//  
//  func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
//    RNNotifyvisitors.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)
//  }
//  func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
//    RNNotifyvisitors.willPresent(notification, withCompletionHandler: completionHandler)
//  }
//  func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
//    RNNotifyvisitors.didReceive(response)
//  }
//}
