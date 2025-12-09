#if __has_include(<notifyvisitors/notifyvisitors.h>)
#import <notifyvisitors/notifyvisitors.h>
#else
#import "../notifyvisitors.h"
#endif
#if __has_include(<UserNotifications/UserNotifications.h>)
#import <UserNotifications/UserNotifications.h>
#else
#import "UserNotifications.h"
#endif

extern BOOL nvPushObserverReady;

@interface RNNotifyvisitors : NSObject <UNUserNotificationCenterDelegate>

// SDK initialization

+(void)initializeWithBrandId:(NSInteger)brandID secretKey:(NSString *_Nullable)secretKey launchingOptions:(NSDictionary *_Nullable)launchingOptions;

+(void)Initialize;


+(void)applicationDidEnterBackground:(UIApplication *_Nullable)application;
+(void)sceneDidEnterBackground:(UIScene *_Nullable)scene API_AVAILABLE(ios(13.0));

+(void)applicationWillEnterForeground:(UIApplication *_Nullable)application;
+(void)sceneWillEnterForeground:(UIScene *_Nullable)scene API_AVAILABLE(ios(13.0));

+(void)applicationDidBecomeActive:(UIApplication *_Nullable)application;
+(void)sceneDidBecomeActive:(UIScene *_Nullable)scene API_AVAILABLE(ios(13.0));

+(void)applicationWillTerminate;

//Deeplink Handler function

+(void)openUrl:(UIApplication *_Nullable)application openURL:(NSURL *_Nullable)url DEPRECATED_MSG_ATTRIBUTE("This method is deprecated in Notifyvisitors react-native plugin Use [RNNotifyvisitors openUrlWithApplication:url:] (see RNNotifyvisitors.h)");
+(void)openUrlWithApplication:(UIApplication *_Nullable)application url:(NSURL *_Nullable)url;

//+(NSMutableDictionary*_Nullable)OpenUrlGetDataWithApplication: (UIApplication *_Nullable)application Url:(NSURL *_Nullable)url;

+(void)scene:(UIScene *_Nullable)scene openURLContexts:(NSSet<UIOpenURLContext *> *_Nullable)URLContexts API_AVAILABLE(ios(13.0));

+(void)scene:(UIScene *_Nullable)scene willConnectToSession:(UISceneSession *_Nullable)session options:(UISceneConnectionOptions *_Nullable)connectionOptions API_AVAILABLE(ios(13.0));

//Universal link Handler functions

+(void)continueUserActivityWith:(NSUserActivity*_Nullable)userActivity;
+(void)scene:(UIScene *_Nullable)scene continueUserActivity:(NSUserActivity *_Nullable)userActivity API_AVAILABLE(ios(13.0));


// Push notification registration

+(void)RegisterPushWithDelegate:(id _Nullable)delegate App:(UIApplication * _Nullable)application launchOptions:(NSDictionary *_Nullable)launchOptions;

+(void)application:(UIApplication *_Nullable)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *_Nullable)deviceToken;

+(void)application:(UIApplication *_Nullable)application didFailToRegisterForRemoteNotificationsWithError:(NSError *_Nullable)error;


// Push Notifications Click Handler functions

+(void)application:(UIApplication *_Nullable)application didReceiveRemoteNotification:(NSDictionary *_Nullable)userInfo;

+(void)application:(UIApplication *_Nullable)application didReceiveRemoteNotification:(NSDictionary *_Nullable)userInfo fetchCompletionHandler:(void (^_Nullable)(UIBackgroundFetchResult))completionHandler;

+(void)willPresentNotification:(UNNotification *_Nullable)notification withCompletionHandler:(void (^_Nullable)(UNNotificationPresentationOptions options))completionHandler API_AVAILABLE(ios(10.0));

+(void)didReceiveNotificationResponse:(UNNotificationResponse *_Nullable)response API_AVAILABLE(ios(10.0));

@end
  
