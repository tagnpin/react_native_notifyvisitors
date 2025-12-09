#if __has_include(<React/RCTConvert.h>)
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>
#import <React/RCTAnimationType.h>
#else
#import "RCTConvert.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import "RCTAnimationType.h"
#endif

#import <UIKit/UIKit.h>
#import "RNNotifyvisitors.h"
#import <objc/runtime.h>

BOOL nvPushObserverReady;
typedef void (^nvPushClickCheckRepeatHandler)(BOOL isnvPushActionRepeat);
typedef void (^nvPushClickCheckRepeatBlock)(nvPushClickCheckRepeatHandler completionHandler);
int nvCheckPushClickTimeCounter = 0;

@implementation RNNotifyvisitors

static NSString *const kNVPluginVersion = @"4.6.2";

- (dispatch_queue_t)methodQueue{
    return dispatch_get_main_queue();
}


//app delegate methods

+ (instancetype)sharedInstance {
    static RNNotifyvisitors *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[RNNotifyvisitors alloc] init];
    });
    return sharedInstance;
}

+(void)initializeWithBrandId:(NSInteger)brandID secretKey:(NSString *)secretKey launchingOptions:(NSDictionary *)launchingOptions {
    
NSLog(@"RN-NotifyVisitors : INITIALIZE WITH BRANDID SECRETKEY & LAUNCHING-OPTIONS !!");
NSLog(@"RN-NotifyVisitors PLUGIN VERSION : %@ !!", kNVPluginVersion);
   
    [[self sharedInstance] nvTurnOffAutomaticScreenViewEventForReactNative];
        NSString *nvMode = nil;
    #if DEBUG
        nvMode = @"debug";
    #else
        nvMode = @"live";
    #endif
        [notifyvisitors initializeWithBrandId: brandID secretKey: secretKey appMode: nvMode launchingOptions: launchingOptions];
}

+(void)Initialize {
    NSLog(@"RN-NotifyVisitors : INITIALIZE !!");
    NSLog(@"RN-NotifyVisitors PLUGIN VERSION : %@ !!", kNVPluginVersion);
   
    [[self sharedInstance] nvTurnOffAutomaticScreenViewEventForReactNative];
        NSString *nvMode = nil;
    #if DEBUG
        nvMode = @"debug";
    #else
        nvMode = @"live";
    #endif
        [notifyvisitors Initialize:nvMode];
}

+(void)applicationDidEnterBackground:(UIApplication *)application {
    @try{
        NSLog(@"RN-NotifyVisitors : APPLICATION DID ENTER BACKGROUND !!");
        [notifyvisitors applicationDidEnterBackground: application];
        
    }@catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)sceneDidEnterBackground:(UIScene *)scene {
    @try{
        NSLog(@"RN-NotifyVisitors : SCENE DID ENTER BACKGROUND !!");
        [notifyvisitors sceneDidEnterBackground: scene];
        
    }@catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)applicationWillEnterForeground:(UIApplication *)application {
    @try{
        NSLog(@"RN-NotifyVisitors : APPLICATION WILL ENTER FOREGROUND !!");
        [notifyvisitors applicationWillEnterForeground: application];
        
    }@catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)sceneWillEnterForeground:(UIScene *)scene {
    @try{
        NSLog(@"RN-NotifyVisitors : SCENE WILL ENTER FOREGROUND !!");
        [notifyvisitors sceneWillEnterForeground: scene];
        
    }@catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)applicationDidBecomeActive:(UIApplication *)application{
    @try{
        NSLog(@"RN-NotifyVisitors : APPLICATION DID BECOME ACTIVE !!");
        [notifyvisitors applicationDidBecomeActive: application];
    
    }@catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
    
}

+(void)sceneDidBecomeActive:(UIScene *)scene {
    @try{
        NSLog(@"RN-NotifyVisitors : SCENE DID BECOME ACTIVE !!");
        [notifyvisitors sceneDidBecomeActive: scene];
    }@catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)applicationWillTerminate{
    @try{
        NSLog(@"RN-NotifyVisitors : APPLICATION WILL TERMINATE !!");
        [notifyvisitors applicationWillTerminate];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
    
}

//Deeplink Handler functions

+(void)openUrl:(UIApplication *_Nullable)application openURL:(NSURL*)url {
    [self openUrlWithApplication: application url: url];
}

+(void)openUrlWithApplication:(UIApplication *)application url:(NSURL *)url {
    NSLog(@"RN-NotifyVisitors : OPEN URL !!");
    @try{
         [notifyvisitors OpenUrlWithApplication: application Url: url];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts {
    NSLog(@"RN-NotifyVisitors : SCENE OPEN URL CONTEXTS !!");
    @try{
         [notifyvisitors scene: scene openURLContexts: URLContexts];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
    NSLog(@"RN-NotifyVisitors : SCENE WILL CONNECT TO SESSION OPTIONS !!");
    @try{
         [notifyvisitors scene: scene willConnectToSession: session options: connectionOptions];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+ (void)continueUserActivityWith:(NSUserActivity *)userActivity {
    NSLog(@"RN-NotifyVisitors : CONTINUE USER ACTIVITY !!");
    @try{
         [notifyvisitors continueUserActivityWith: userActivity];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)scene:(UIScene *)scene continueUserActivity:(NSUserActivity *)userActivity {
        NSLog(@"RN-NotifyVisitors : SCENE CONTINUE USER ACTIVITY !!");
        @try{
             [notifyvisitors scene: scene continueUserActivity: userActivity];
        }
        @catch(NSException *exception){
            NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
        }
}

+(void)RegisterPushWithDelegate:(id _Nullable)delegate App:(UIApplication * _Nullable)application launchOptions:(NSDictionary *_Nullable)launchOptions{
    NSLog(@"RN-NotifyVisitors : REGISTER PUSH WITH DELEGATE !!");
    @try{
        [notifyvisitors RegisterPushWithDelegate: delegate App: application launchOptions: launchOptions];
    } @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}


//for simple push

+(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken  {
    NSLog(@"RN-NotifyVisitors : DID REGISTER FOR REMOTE NOTIFICATIONS WITH DEVICE TOKEN !!");
    @try{
        [notifyvisitors DidRegisteredNotification: application deviceToken: deviceToken];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
    
}


+(void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    @try{
       NSLog(@"RN-NotifyVisitors : DID FAIL TO REGISTER FOR REMOTE NOTIFICATIONS WITH ERROR = %@", error.localizedDescription);
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
    
}

+(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    @try{
        NSLog(@"RN-NotifyVisitors : DID RECEIVE REMOTE NOTIFICATION !!");
        [notifyvisitors didReceiveRemoteNotificationWithUserInfo: userInfo];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

+(void)willPresentNotification:(UNNotification *_Nullable)notification withCompletionHandler:(void (^_Nullable)(UNNotificationPresentationOptions options))completionHandler  API_AVAILABLE(ios(10.0)){
    NSLog(@"RN-NotifyVisitors : WILL PRESENT NOTIFICATION !!");
    @try{
         [notifyvisitors willPresentNotification: notification withCompletionHandler: completionHandler];
     }
     @catch(NSException *exception){
         NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}



+(void)didReceiveNotificationResponse:(UNNotificationResponse *_Nullable)response  API_AVAILABLE(ios(10.0)){
    NSLog(@"RN-NotifyVisitors : DID RECEIVE NOTIFICATION RESPONSE !!");
    @try{
        //  NSLog(@"didReceiveNotificationResponse triggered with nvPushObserverReady value = %@", nvPushObserverReady ? @"YES" : @"NO");
          if(!nvPushObserverReady) {
              [self nvPushClickCheckInSeconds: 1 withBlock: ^(nvPushClickCheckRepeatHandler completionHandler) {
                  [notifyvisitors didReceiveNotificationResponse: response];
              }];
          } else {
              [notifyvisitors didReceiveNotificationResponse: response];
          }
    
        }
        @catch(NSException *exception){
            NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
            
        }
}


+(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    NSLog(@"RN-NotifyVisitors : DID RECEIVE REMOTE NOTIFICATION !!");
    @try{
         [notifyvisitors didReceiveRemoteNotification: userInfo fetchCompletionHandler: completionHandler];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
          
}

+(void)nvPushClickCheckInSeconds:(int)seconds withBlock: (nvPushClickCheckRepeatBlock) nvPushCheckBlock {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, seconds * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
        nvCheckPushClickTimeCounter = nvCheckPushClickTimeCounter + seconds;
        if(!nvPushObserverReady) {
            if (nvCheckPushClickTimeCounter < 20) {
                return [self nvPushClickCheckInSeconds: seconds withBlock: nvPushCheckBlock];
                //[self irDispatchReatforTrackingDataInSeconds: seconds withBlock: irBlock];
            } else {
                //irTempTrackResponse = @{@"Authentication" : @"failed",@"http_code": @"408"};
            nvPushCheckBlock(^(BOOL isRepeat) {
                if (isRepeat) {
                    if (nvCheckPushClickTimeCounter < 20) {
                        return [self nvPushClickCheckInSeconds: seconds withBlock: nvPushCheckBlock];
                        }
                    }
                });
            }
        } else {
            nvPushCheckBlock(^(BOOL isRepeat) {
                if (isRepeat) {
                    if (nvCheckPushClickTimeCounter < 20) {
                        return [self nvPushClickCheckInSeconds: seconds withBlock: nvPushCheckBlock];
                    }
                }
            });
        }
    });
}

-(void)nvTurnOffAutomaticScreenViewEventForReactNative {
    NSUserDefaults *nvflutterCustomUserDefaults = [[NSUserDefaults alloc] initWithSuiteName: @"com.cp.plugin.notifyvisitors"];
    [nvflutterCustomUserDefaults setBool: YES forKey: @"nv_isSDKRunningInCP"];
    [nvflutterCustomUserDefaults synchronize];
}

@end

