//
//  RNNVNativeDisplayView.m
//  react-native-notifyvisitors
//
//  Created by Notifyvisitors Macbook Air 4 on 30/08/25.
//

#import "RNNVNativeDisplayView.h"

NSInteger nvIsDataReadyTimerCount = 0;
@implementation RNNVNativeDisplayView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor clearColor];
    self.nvNudgesNativeDisplay = [[notifyvisitorsNativeDisplay alloc] init];
        // Register for your custom notification
        [[NSNotificationCenter defaultCenter] addObserver: self selector: @selector(handleNotification:) name: @"nv_rn_nudges_ui_finalized" object: nil];
    }
    return self;
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver: self];
}

-(void)setPropertyName:(NSString *)propertyName {
    _propertyName = propertyName;
        NSString *rnNVUserDefaultSuitName = @"com.notifyvisitors.ios.sdk";
        NSUserDefaults *rnNVUserDefaults = [[NSUserDefaults alloc] initWithSuiteName: rnNVUserDefaultSuitName];
            if ([rnNVUserDefaults boolForKey: @"nv_BrandSettingsFileUpdated"]) {
                 NSLog(@"RN-NotifyVisitors : Native Display Data found load content now");
                [self loadContentForNativeDisplay];
            } else {
                NSLog(@"RN-NotifyVisitors : Native Display Data not found, retry getting it and load content");
                dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC));
                dispatch_after(delay, dispatch_get_main_queue(), ^{
                    [self loadContentForNativeDisplay];
                });
            }
}

- (void)loadContentForNativeDisplay {
    if ([self.propertyName length] > 0 && ![self.propertyName isEqualToString: @""] && ![self.propertyName isEqual: [NSNull null]]) {
        dispatch_async(dispatch_get_main_queue(), ^{
             NSLog(@"RN-NotifyVisitors : load Native Display for property name = %@", self.propertyName);
            UIView *nvNativeDisplayCardView = [self.nvNudgesNativeDisplay loadContentForPropertyName: self.propertyName];
        nvNativeDisplayCardView.translatesAutoresizingMaskIntoConstraints = YES; // ✅ VERY IMPORTANT
            // Match parent bounds dynamically
            nvNativeDisplayCardView.frame = self.bounds;
            nvNativeDisplayCardView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            [self.subviews makeObjectsPerformSelector: @selector(removeFromSuperview)];
            [self setUserInteractionEnabled: YES];
            [self addSubview: nvNativeDisplayCardView];
        });
    } else {
        NSLog(@"RN-NotifyVisitors : missing parameter propertyName not found or empty");
        dispatch_async(dispatch_get_main_queue(), ^{
            UIView *nvEmptyDisplayView = [[UIView alloc] init];
            nvEmptyDisplayView.backgroundColor = [UIColor clearColor];
            // Match parent bounds dynamically
            nvEmptyDisplayView.frame = self.bounds;
            nvEmptyDisplayView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            [self.subviews makeObjectsPerformSelector: @selector(removeFromSuperview)];
            [self setUserInteractionEnabled: YES];
            [self addSubview: nvEmptyDisplayView];
        });
}
}


// Handle the notification
- (void)handleNotification:(NSNotification *)notification {
     NSLog(@"RN-NotifyVisitors : native Display UI Finalized");
    if (self.onNudgeUiFinalized) {
        NSDictionary *nvNativeDisplayOnUIFinished = notification.userInfo;
        NSString *nvJsonString = @"";
        if ([nvNativeDisplayOnUIFinished count] > 0) {
            
            if (nvNativeDisplayOnUIFinished[@"data"]) {
                nvJsonString = [NSString stringWithFormat: @"%@", nvNativeDisplayOnUIFinished[@"data"]];
            }
            if ([nvJsonString length] > 0 && ![nvJsonString isEqualToString: @""] && ![nvJsonString isEqual: [NSNull null]]) {
                self.onNudgeUiFinalized(@{@"data": nvJsonString});
            }
        }
        
  }
}

@end
