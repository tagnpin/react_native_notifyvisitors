#import <Foundation/Foundation.h>
#import <UserNotifications/UserNotifications.h>

@interface RNNotifyvisitorExtensionService : NSObject

+(void)LoadAttachmentWithRequest: (UNNotificationRequest *_Nullable)request BestAttemptContent: (UNMutableNotificationContent *_Nullable)bestAttemptContent withContentHandler: (void (^_Nullable)(UNNotificationContent * _Nonnull))contentHandler API_AVAILABLE(ios(10.0));

@end
