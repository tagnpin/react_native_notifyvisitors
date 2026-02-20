//
//  RNNVNativeDisplayViewManager.m
//  react-native-notifyvisitors
//
//  Created by Notifyvisitors Macbook Air 4 on 02/08/25.
//

#import "RNNVNativeDisplayViewManager.h"
#import "RNNVNativeDisplayView.h"


@implementation RNNVNativeDisplayViewManager

RCT_EXPORT_MODULE(NotifyvisitorsNativeDisplay) // Name used in JS class

// Create the native view
- (UIView *)view {
    return [[RNNVNativeDisplayView alloc] initWithFrame: CGRectZero];
}

// Expose prop to JS
RCT_EXPORT_VIEW_PROPERTY(propertyName, NSString)

// Expose the callback
RCT_EXPORT_VIEW_PROPERTY(onNudgeUiFinalized, RCTDirectEventBlock)

@end
