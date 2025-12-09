//
//  notifyvisitors.h
//  notifyvisitors
//
//  Created by Notifyvisitors Macbook Air 4 on 25/10/23.
//

#import <Foundation/Foundation.h>
#import <UserNotifications/UserNotifications.h>
#import <UIKit/UIKit.h>



//! Project version number for notifyvisitors.
FOUNDATION_EXPORT double notifyvisitorsVersionNumber;

//! Project version string for notifyvisitors.
FOUNDATION_EXPORT const unsigned char notifyvisitorsVersionString[];

// In this header, you should import all the public headers of your framework using statements like #import <notifyvisitors/PublicHeader.h>


typedef NS_ENUM(NSUInteger, nvPushBadgeCount){
    nvPushBadgeCountIncreaseByOne,
    nvPushBadgeCountDecreaseByOne,
    nvPushBadgeCountClearAll
};

typedef void(^NotificationListData)(NSMutableArray*_Nullable);
typedef void(^nvGetCount)(NSInteger);
typedef void(^nvUnreadCenterCount)(NSDictionary*_Nullable);

typedef void(^NotificationClickResponseData)(NSMutableDictionary*_Nullable);

typedef void(^OnUserTrackListener)(NSDictionary*_Nullable);
typedef void(^nv_UID)(NSString *_Nullable);

#pragma mark - Notifyvisitors Delegate

@protocol notifyvisitorsDelegate <NSObject>

@optional
- (void)NotifyvisitorsGetEventResponseWithUserInfo:(NSDictionary*_Nullable)userInfo DEPRECATED_MSG_ATTRIBUTE("first deprecated in Notifyvisitors iOS SDK 7.0.1 Use [notifyvisitors notifyvisitorsEventsResponseCallback:] (see notifyvisitors.h)");
-(void)notifyvisitorsEventsResponseCallback:(NSDictionary*_Nullable)callback;
-(void)notifyvisitorsKnownUserIdentified:(NSDictionary*_Nullable)userInfo;
-(void)notifyvisitorsNewDelegateMethod:(NSDictionary*_Nullable)userInfo;
-(void)notifyvisitorsNudgeUiFinalized:(NSDictionary*_Nullable)callback;

@end

@interface NVCenterStyleConfig : NSObject

@property (strong, nonatomic)UIColor * _Nullable unselectedTabTextColor;

@property (strong, nonatomic)UIColor * _Nullable selectedTabTextColor;

@property (strong, nonatomic)UIColor * _Nullable selectedTabBgColor;
@property (strong, nonatomic)UIColor * _Nullable unselectedTabBgColor;

@property (nonatomic)NSInteger selectedTabIndex;
@property (strong, nonatomic)UIFont * _Nullable tabTextfont;
@property (strong, nonatomic)UIColor * _Nullable tabBadgeCountBorderColor;
@property (strong, nonatomic)UIColor * _Nullable tabBadgeCountFillColor;
@property (strong, nonatomic)UIColor * _Nullable tabBadgeCountTextColor;
@property (nonatomic)BOOL shouldTabBadgeShine;

+(instancetype _Nullable )sharedInstance;

-(void)setFirstTabWithTabLable:(NSString *_Nonnull)tabLabel TagDisplayName:(NSString *_Nonnull)tabDisplayName;

-(void)setSecondTabWithTabLable:(NSString *_Nonnull)tabLabel TagDisplayName:(NSString *_Nonnull)tabDisplayName;

-(void)setThirdTabWithTabLable:(NSString *_Nonnull)tabLabel TagDisplayName:(NSString *_Nonnull)tabDisplayName;

@end


@class NVSDKCallbackUtils;

@interface notifyvisitors : NSObject <UNUserNotificationCenterDelegate>

@property (nonatomic, weak)id <notifyvisitorsDelegate> _Nullable delegate;

+(instancetype _Nonnull )sharedInstance;

#pragma mark - INITIAL INTEGRATION METHODS (INITIALIZE Notifyvisitors SDK and Basic Integration Methods)

+(void)Initialize:(NSString *_Nullable)nvMode;

+(void)initializeWithBrandId:(NSInteger)brandID secretKey:(NSString *_Nullable)secretKey appMode:(NSString *_Nullable)nvMode launchingOptions:(NSDictionary *_Nullable)launchingOptions;

+(void)applicationDidEnterBackground:(UIApplication *_Nullable)application;
+(void)sceneDidEnterBackground:(UIScene *_Nullable)scene API_AVAILABLE(ios(13.0));

+(void)applicationWillEnterForeground:(UIApplication *_Nullable)application;
+(void)sceneWillEnterForeground:(UIScene *_Nullable)scene API_AVAILABLE(ios(13.0));

+(void)applicationDidBecomeActive:(UIApplication *_Nullable)application;
+(void)sceneDidBecomeActive:(UIScene *_Nullable)scene API_AVAILABLE(ios(13.0));

+(void)applicationWillTerminate;

+(void)OpenUrlWithApplication:(UIApplication *_Nullable)application Url:(NSURL *_Nullable)url;
+(NSMutableDictionary*_Nullable)OpenUrlGetDataWithApplication: (UIApplication *_Nullable)application Url:(NSURL *_Nullable)url;

+(void)scene:(UIScene *_Nullable)scene willConnectToSession:(UISceneSession *_Nullable)session options:(UISceneConnectionOptions *_Nullable)connectionOptions API_AVAILABLE(ios(13.0));
+(void)scene:(UIScene *_Nullable)scene openURLContexts:(NSSet<UIOpenURLContext *> *_Nullable)URLContexts API_AVAILABLE(ios(13.0));

+(void)continueUserActivityWith:(NSUserActivity*_Nullable)userActivity;
+(void)scene:(UIScene *_Nullable)scene continueUserActivity:(NSUserActivity *_Nullable)userActivity API_AVAILABLE(ios(13.0));

+(NSDictionary *_Nullable)getSessionData;


#pragma mark - InAppBanner AND InAppSurveys METHODS

+(void)Show:(NSMutableDictionary *_Nullable)UserTokens CustomRule:(NSMutableDictionary *_Nullable)cuxstomRule;

+(void)scrollViewDidScroll:(UIScrollView *_Nullable) scrollView;
+(void)DismissAllNotifyvisitorsInAppNotifications;
+(void)StopInAppNotifications;

#pragma mark - TRACKING EVENTS METHOD

+(void)trackEvents:(NSString *_Nullable)event_name Attributes:(NSMutableDictionary *_Nullable)attributes lifetimeValue:(NSString *_Nullable)ltv Scope:(int)scope;

+(void)trackScreen:(NSString *_Nullable)screenName;

#pragma mark - USER TRACKING METHODS

+(void)UserIdentifier:(NSString *_Nullable) userID UserParams:(NSMutableDictionary *_Nullable) UserParams;

+(void)userIdentifierWithUserParams:(NSDictionary *_Nullable)userParams onUserTrackListener:(OnUserTrackListener _Nullable )onUserTrackListener;

+(NSString *_Nullable)getNvUid;

+(void)getNvUid:(nv_UID _Nullable)nvUID DEPRECATED_MSG_ATTRIBUTE("first deprecated in Notifyvisitors iOS SDK 7.2.0 Use NSString *myNvUID = [notifyvisitors getNvUid] to get reformated method (see notifyvisitors.h)");


#pragma mark - PUSH NOTIFICATIONS METHODS

+(void)RegisterPushWithDelegate:(id _Nullable )delegate App:(UIApplication *_Nullable)application launchOptions:(NSDictionary *_Nullable)launchOptions;

+(void)DidRegisteredNotification:(UIApplication *_Nullable)application deviceToken:(NSData *_Nullable)deviceToken;

+(NSString *_Nullable)getPushRegistrationToken;

+(void)schedulePushNotificationwithNotificationID:(NSString *_Nullable)NID Tag:(NSString *_Nullable)tag TimeinSecond:(NSString *_Nullable)time Title:(NSString *_Nullable)title  Message:(NSString *_Nullable)message URL:(NSString *_Nullable)url  Icon:(NSString *_Nullable)icon;

+(void)pushPreferences:(NSArray *_Nullable)preferenceList isUnsubscribeFromAll:(BOOL)shouldUnsubscribe;

+(void)updatePushBadgeNumberWithValue:(nvPushBadgeCount)nvPushBadgeNumber;

#pragma mark - PUSH NOTIFICATIONS DELEGATE METHODS

+(void)didReceiveRemoteNotificationWithUserInfo:(NSDictionary *_Nullable)userInfo;
+(NSMutableDictionary *_Nullable)PushNotificationActionDataFromUserInfo:(NSDictionary *_Nullable)userinfo;
+(void)didReceiveRemoteNotification:(NSDictionary *_Nullable)userInfo fetchCompletionHandler:(void(^_Nullable)(UIBackgroundFetchResult))completionHandler;

+(void)willPresentNotification:(UNNotification *_Nullable)notification withCompletionHandler:(void (^_Nullable)(UNNotificationPresentationOptions options))completionHandler API_AVAILABLE(ios(10.0));

+(void)didReceiveNotificationResponse:(UNNotificationResponse *_Nullable)response API_AVAILABLE(ios(10.0));
+(void)PushNotificationActionDataFromResponse:(UNNotificationResponse *_Nullable)response AutoRedirectOtherApps:(BOOL)autoRedirect clickResponseData:(NotificationClickResponseData _Nullable )pushClickResponse API_AVAILABLE(ios(10.0));

#pragma mark - NOTIFICATION SERVICE EXTENSION METHOD

+(void)LoadAttachmentWithRequest:(UNNotificationRequest *_Nullable)request bestAttemptContent:(UNMutableNotificationContent *_Nullable)bestAttemptContent withContentHandler:(nullable void (^)(UNNotificationContent * _Nonnull))contentHandler API_AVAILABLE(ios(10.0));


#pragma mark - NOTIFICATION CENTER METHODS

+(void)NotifyVisitorsNotificationCentre DEPRECATED_MSG_ATTRIBUTE("first deprecated in Notifyvisitors iOS SDK 6.4.3 Use [notifyvisitors notificationCenter:] (see notifyvisitors.h)");

+(void)notificationCenter;
+(void)notificationCenterWithConfiguration:(NVCenterStyleConfig *_Nullable)configuration;
+(void)GetNotificationCentreData:(NotificationListData _Nullable ) notificationDataList DEPRECATED_MSG_ATTRIBUTE("first deprecated in Notifyvisitors iOS SDK 7.0.2 Use [notifyvisitors getNotificationCenterData:] to get reformated data response in NSDictionary format. (see notifyvisitors.h)");
+(void)GetUnreadPushNotification:(nvGetCount _Nullable )nvUnreadCount;

+(void)getNotificationCenterData:(void(^_Nullable)(NSDictionary *_Nullable))notificationsData;
+(void)getNotificationCenterCountWithConfiguration:(NVCenterStyleConfig *_Nullable)configuration countResult:(nvUnreadCenterCount _Nullable )unreadCenterCounts;

#pragma mark - OTHER METHODS
+(void)stopGeofencePushforDateTime:(NSString *_Nullable)nvDateTime additionalHours: (NSInteger)nvtimeinHours;

+(void)requestAppleAppStoreInAppReview;

@end
