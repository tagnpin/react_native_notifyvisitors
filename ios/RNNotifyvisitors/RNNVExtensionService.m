#if __has_include(<notifyvisitors/notifyvisitors.h>)
#import <notifyvisitors/notifyvisitors.h>
#else
#import "../notifyvisitors.h"
#endif

#import "RNNVExtensionService.h"

@implementation RNNotifyvisitorExtensionService

+(void)LoadAttachmentWithRequest:(UNNotificationRequest *)request BestAttemptContent: (UNMutableNotificationContent *)bestAttemptContent withContentHandler: (void (^)(UNNotificationContent * _Nonnull))contentHandler{
    @try{
        NSLog(@"RN-NotifyVisitors SERVICE EXTENSION : LOAD ATTACHMENT WITH REQUEST !!");
        [notifyvisitors LoadAttachmentWithRequest: request bestAttemptContent: bestAttemptContent withContentHandler: contentHandler];
    } @catch(NSException *exception){
        NSLog(@"LoadAttachmentWithRequest exception error = %@", exception.reason);
    }
}
@end
