
#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>
#elif __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#endif

#if __has_include(<notifyvisitors/notifyvisitors.h>)
#import <notifyvisitors/notifyvisitors.h>
#else
#import "../notifyvisitors.h"
#endif


typedef NS_ENUM(NSInteger, OSNotificationEventTypes) {
    NotificationReceived,
    NotificationOpened
};

//#define OSNotificationEventTypesArray @[@"Notifyvisitors-notificationReceived",@"Notifyvisitors-notificationOpened"]
//#define OSEventString(enum) [OSNotificationEventTypesArray objectAtIndex:enum]

@interface RCTEventEmitterDemo : RCTEventEmitter <RCTBridgeModule, notifyvisitorsDelegate>

+ (void)sendEventWithName:(NSString *)name withBody:(NSDictionary *)body;
+ (BOOL)hasSetBridge;

@end

