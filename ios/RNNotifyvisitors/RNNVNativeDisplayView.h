//
//  RNNVNativeDisplayView.h
//  react-native-notifyvisitors
//
//  Created by Notifyvisitors Macbook Air 4 on 30/08/25.
//

#import <React/RCTComponent.h>
#import <UIKit/UIKit.h>

#if __has_include(<notifyvisitorsNudges/notifyvisitorsNudges-Swift.h>)
#import <notifyvisitorsNudges/notifyvisitorsNudges-Swift.h>
#else
#import "../notifyvisitorsNudges-Swift.h"
#endif


@interface RNNVNativeDisplayView : UIView

@property (nonatomic, copy) RCTDirectEventBlock onNudgeUiFinalized;
@property (strong, nonatomic) NSString * propertyName;
@property(nonatomic, strong) notifyvisitorsNativeDisplay *nvNudgesNativeDisplay;
//@property(nonatomic, strong) UIView * _Nullable nvContainerView;

@end
