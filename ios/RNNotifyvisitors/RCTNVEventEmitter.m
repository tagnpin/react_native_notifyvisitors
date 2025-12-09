#import "RCTNVEventEmitter.h"
#import "RNNotifyvisitors.h"
#import <UIKit/UIKit.h>

BOOL nvDismissNCenterOnAction;
static BOOL hasListeners;

RCTResponseSenderBlock showCallback;
RCTResponseSenderBlock eventCallback;
RCTResponseSenderBlock commonCallback;
RCTResponseSenderBlock onKnownUserFoundCallback = NULL;
RCTResponseSenderBlock notificationCenterCallback = NULL;
RCTResponseSenderBlock onNotificationClickCallback = NULL;

BOOL nvInAppFound = false;

@implementation RCTEventEmitterDemo{
    BOOL hasListeners;
}

- (dispatch_queue_t)methodQueue{
    return dispatch_get_main_queue();
}

static BOOL _startObserving = false;

+ (BOOL)hasSetBridge {
    return _startObserving;
}

+(BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_MODULE(RNNotifyvisitors);

#pragma mark RCTEventEmitter Subclass Methods

-(instancetype)init {
    if (self = [super init]) {
        NSLog(@"RN-NotifyVisitors : INIT !!");
        for (NSString *eventName in [self supportedEvents])
            [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(emitEvent:) name:eventName object:nil];
    }
    [notifyvisitors sharedInstance].delegate = self;
    return self;
}


#pragma mark - React-Native List of supported callback names

- (NSArray<NSString *> *)supportedEvents {
    return @[@"nv_push_banner_click", @"nv_chat_bot_button_click", @"nv_show_callback", @"nv_event_callback", @"nv_common_show_event_callback", @"nv_center_callback", @"nv_known_user_identified_callback", @"nv_notification_click_callback"];
}

// Will be called when this module's first listener is added.
- (void)startObserving {
    hasListeners = YES;
    NSLog(@"RN-NotifyVisitors : START OBSERVING !!");
    [[NSNotificationCenter defaultCenter] postNotificationName: @"didSetBridge" object: nil];
    _startObserving = true;
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving {
    NSLog(@"STOP OBSERVING !");
    hasListeners = NO;
}

// Send Event Methods
- (void)emitEvent:(NSNotification *)notification {
    if (!hasListeners) {
        NSLog(@"RN-NotifyVisitors : ATTEMPTED TO SEND AN EVENT. WHEN NO LISTENERS WERE SET");
        return;
    }
    [self sendEventWithName:notification.name body:notification.userInfo];
}

+ (void)sendEventWithName:(NSString *)name withBody:(NSDictionary *)body {
    if (hasListeners) {
        NSLog(@"RN-NotifyVisitors : SEND EVENT WITH NAME !!");
        [[NSNotificationCenter defaultCenter] postNotificationName: name object:nil userInfo:body];
    }
}

// End of Send Event Methods
#pragma mark - Show inAppMessage (Banner/Survey methods)

/* 01 - Show inApp Banner & Serveys with callback*/
RCT_EXPORT_METHOD(showInAppMessage:(NSDictionary* _Nullable)nvUserToken customRules:(NSDictionary* _Nullable)nvCustomRule fragmentName:(NSString* _Nullable)fragmentName callback:(RCTResponseSenderBlock)nvcallback) {
    
    NSLog(@"RN-NotifyVisitors : SHOW INAPP MESSAGE !!");
    @try {
        showCallback = nvcallback;
        [self show: nvUserToken customRules: nvCustomRule fragmentName: fragmentName callback: nvcallback];
        //            NSError *nvError = nil;
        //            NSData *nvJsonData = nil;
        //            NSString *nvJsonString = nil;
        //            if([nvNotificationCenterData count] > 0){
        //                nvJsonData = [NSJSONSerialization dataWithJSONObject: nvNotificationCenterData options:NSJSONWritingPrettyPrinted error: &nvError];
        //            } else {
        //                NSDictionary *nvErrorDataResponse = @{@"message" : @"no notification(s)", @"notifications": @[]};
        //                nvJsonData = [NSJSONSerialization dataWithJSONObject: nvErrorDataResponse options:NSJSONWritingPrettyPrinted error: &nvError];
        //            }
        //nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
        // [self sendEventWithName:@"nv_show_callback" body:@{@"data": nvJsonString}];
        
    } @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 02 - Show In App Banner, Alert, Serveys */
RCT_EXPORT_METHOD(show:(NSDictionary*_Nullable)nvUserToken  customRules:(NSDictionary*_Nullable)nvCustomRule fragmentName:(NSString* _Nullable)fragmentName callback:(RCTResponseSenderBlock)nvcallback) {
    @try{
        NSLog(@"RN-NotifyVisitors : SHOW !!");
        showCallback = nvcallback;
        
        NSMutableDictionary *mUserToken = [[NSMutableDictionary alloc] init];
        NSMutableDictionary *mCustomRule = [[NSMutableDictionary alloc] init];
        
        if (![nvUserToken isEqual:[NSNull null]]){
            mUserToken = [nvUserToken mutableCopy];
        } else{
            mUserToken = nil;
        }
        
        if (![nvCustomRule isEqual:[NSNull null]]){
            mCustomRule = [nvCustomRule mutableCopy];
        } else{
            mCustomRule = nil;
        }
        dispatch_async(dispatch_get_main_queue(), ^{
            [notifyvisitors Show:mUserToken CustomRule:mCustomRule];
            [self checkForBannerNotFound];
        });
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

- (void)checkForBannerNotFound {
    @try{
        NSLog(@"RN-NotifyVisitors : checkForBannerNotFound !!");
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1.2 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
            if (!nvInAppFound && showCallback != nil) {
                NSDictionary * bannerData = @{
                    @"status":@"fail",
                    @"eventName":@"Banner InActive",
                    @"callbackType":@"banner"
                };
                NSError *nvError = nil;
                NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: bannerData options: NSJSONWritingPrettyPrinted error: &nvError];
                NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
                [self sendEventWithName:@"nv_show_callback" body:@{@"data":nvJsonString}];
            }
        });
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors Banner Not Found : %@", exception.reason);
    }
}

/* 03 - Stop Inapp Banner serveyes */
RCT_EXPORT_METHOD(stopNotifications) {
    @try{
        NSLog(@"RN-NotifyVisitors : STOP NOTIFICATIONS !!");
        [notifyvisitors DismissAllNotifyvisitorsInAppNotifications];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 04 - SEPRATE CALLBACK OF EVENT SURVEY  */
RCT_EXPORT_METHOD(getEventSurveyInfo: (RCTResponseSenderBlock)callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET EVENT SURVERY INFO !!");
        commonCallback = callback;
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 05 - scrollViewDidScroll (IOS Specific only) */
RCT_EXPORT_METHOD(scrollViewDidScroll_iOS_only) {
    @try{
        NSLog(@"RN-NotifyVisitors : SCROLL VIEW DID SCROLL IOS ONLY !!");
        UIScrollView *nvScrollview;
        [notifyvisitors scrollViewDidScroll: nvScrollview];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}


#pragma mark - Open Notification Center old and new method with Close button Callback

/* 06 - Open Notification Center with callback */
RCT_EXPORT_METHOD(openNotificationCenter:(NSDictionary* _Nullable)tmpAppInboxInfo dismiss:(NSString* _Nullable)dismissValue callback:(RCTResponseSenderBlock)nvcallback) {
    NSLog(@"RN-NotifyVisitors : OPEN NOTIFICATION CENTER !!");
    notificationCenterCallback = nvcallback;
    @try{
        [self showNotifications: tmpAppInboxInfo dismiss: dismissValue];
        //            NSError *nvError = nil;
        //            NSData *nvJsonData = nil;
        //            NSString *nvJsonString = nil;
        //            if([nvNotificationCenterData count] > 0){
        //                nvJsonData = [NSJSONSerialization dataWithJSONObject: nvNotificationCenterData options:NSJSONWritingPrettyPrinted error: &nvError];
        //            } else {
        //                NSDictionary *nvErrorDataResponse = @{@"message" : @"no notification(s)", @"notifications": @[]};
        //                nvJsonData = [NSJSONSerialization dataWithJSONObject: nvErrorDataResponse options:NSJSONWritingPrettyPrinted error: &nvError];
        //            }
        //nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
        // [self sendEventWithName:@"nv_center_callback" body:@{@"data": nvJsonString}];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
    
}

/* 07 - show Notification Center */
RCT_EXPORT_METHOD(showNotifications:(NSDictionary*_Nullable)tmpAppInboxInfo dismiss:(NSString*_Nullable)dismissValue) {
    NSLog(@"RN-NotifyVisitors : SHOW NOTIFICATIONS !!");
    
    NSString * tab1Label;
    NSString * tab1Name;
    NSString * tab2Label;
    NSString * tab2Name;
    NSString * tab3Label;
    NSString * tab3Name;
    
    NSString * selectedTabTextColor;
    NSString * unselectedTabTextColor;
    NSString * selectedTabBgColor;
    NSString * unselectedTabBgColor;
    
    NSString * tabTextFontName;
    NSInteger tabTextFontSize;
    NSInteger selectedTabIndex;
    
    UIColor * mSelectedTabTextColor;
    UIColor * mUnselectedTabTextColor;
    UIColor * mSelectedTabBgColor;
    UIColor * mUnselectedTabBgColor;
    
    NSMutableDictionary * appInboxInfo;
    
    @try{
        tab1Label = nil;
        tab1Name = nil;
        tab2Label = nil;
        tab2Name = nil;
        tab3Label = nil;
        tab3Name = nil;
        selectedTabTextColor = nil;
        unselectedTabTextColor = nil;
        selectedTabBgColor = nil;
        unselectedTabBgColor = nil;
        tabTextFontName = nil;
        tabTextFontSize = 13;
        selectedTabIndex = 0;
        mSelectedTabTextColor = nil;
        mUnselectedTabTextColor = nil;
        mSelectedTabBgColor = nil;
        mUnselectedTabBgColor = nil;
        
        if ([tmpAppInboxInfo count] > 0){
            appInboxInfo = [[NSMutableDictionary alloc] init];
            appInboxInfo = [tmpAppInboxInfo mutableCopy];
            
            
            if (appInboxInfo[@"label_one"] && ![appInboxInfo[@"label_one"] isEqual: [NSNull null]]) {
                tab1Label = appInboxInfo[@"label_one"];
            }
            
            if (appInboxInfo[@"name_one"] && ![appInboxInfo[@"name_one"] isEqual: [NSNull null]]) {
                tab1Name = appInboxInfo[@"name_one"];
            }
            
            if (appInboxInfo[@"label_two"] && ![appInboxInfo[@"label_two"] isEqual: [NSNull null]]) {
                tab2Label = appInboxInfo[@"label_two"];
            }
            
            if (appInboxInfo[@"name_two"] && ![appInboxInfo[@"name_two"] isEqual: [NSNull null]]) {
                tab2Name = appInboxInfo[@"name_two"];
            }
            
            if (appInboxInfo[@"label_three"] && ![appInboxInfo[@"label_three"] isEqual: [NSNull null]]) {
                tab3Label = appInboxInfo[@"label_three"];
            }
            
            if (appInboxInfo[@"name_three"] && ![appInboxInfo[@"name_three"] isEqual: [NSNull null]]) {
                tab3Name = appInboxInfo[@"name_three"];
            }
            
            if (appInboxInfo[@"selectedTabTextColor"] && ![appInboxInfo[@"selectedTabTextColor"] isEqual: [NSNull null]]) {
                selectedTabTextColor =  appInboxInfo[@"selectedTabTextColor"];
                mSelectedTabTextColor = [self GetColor:selectedTabTextColor];
                
            }
            
            if (appInboxInfo[@"unselectedTabTextColor"] && ![appInboxInfo[@"unselectedTabTextColor"] isEqual: [NSNull null]]) {
                unselectedTabTextColor = appInboxInfo[@"unselectedTabTextColor"];
                mUnselectedTabTextColor =  [self GetColor:unselectedTabTextColor];
            }
            
            if (appInboxInfo[@"selectedTabBgColor"] && ![appInboxInfo[@"selectedTabBgColor"] isEqual: [NSNull null]]) {
                selectedTabBgColor = appInboxInfo[@"selectedTabBgColor"];
                mSelectedTabBgColor = [self GetColor:selectedTabBgColor];
            }
            
            if (appInboxInfo[@"unselectedTabBgColor_ios"] && ![appInboxInfo[@"unselectedTabBgColor_ios"] isEqual: [NSNull null]]) {
                unselectedTabBgColor = appInboxInfo[@"unselectedTabBgColor_ios"];
                mUnselectedTabBgColor = [self GetColor:unselectedTabBgColor];
            }
            
            if (appInboxInfo[@"selectedTabIndex_ios"] && ![appInboxInfo[@"selectedTabIndex_ios"] isEqual: [NSNull null]]) {
                selectedTabIndex = [appInboxInfo[@"selectedTabIndex_ios"]integerValue];
            }
            
            if (appInboxInfo[@"tabTextFontName_ios"] && ![appInboxInfo[@"tabTextFontName_ios"] isEqual: [NSNull null]]) {
                tabTextFontName = appInboxInfo[@"tabTextFontName_ios"];
            }
            
            if (appInboxInfo[@"tabTextFontSize_ios"] && ![appInboxInfo[@"tabTextFontSize_ios"] isEqual: [NSNull null]]) {
                tabTextFontSize = [appInboxInfo[@"tabTextFontSize_ios"]integerValue];
            }
            
            NVCenterStyleConfig *nvConfig = [[NVCenterStyleConfig alloc] init];
            
            if (tab1Label != nil && [tab1Label length] > 0 && ![tab1Label isEqual: [NSNull null]]){
                if(tab1Name!= nil && [tab1Name length] > 0 && ![tab1Name isEqual: [NSNull null]]){
                    [nvConfig setFirstTabWithTabLable: tab1Label TagDisplayName: tab1Name];
                }
            }
            
            if (tab2Label != nil && [tab2Label length] > 0 && ![tab2Label isEqual: [NSNull null]]){
                if(tab2Name!= nil && [tab2Name length] > 0 && ![tab2Name isEqual: [NSNull null]]){
                    [nvConfig setSecondTabWithTabLable: tab2Label TagDisplayName: tab2Name];
                }
            }
            
            if (tab3Label != nil && [tab3Label length] > 0 && ![tab3Label isEqual: [NSNull null]]){
                if(tab3Name!= nil && [tab3Name length] > 0 && ![tab3Name isEqual: [NSNull null]]){
                    [nvConfig setThirdTabWithTabLable: tab3Label TagDisplayName: tab3Name];
                }
            }
            
            
            if (mSelectedTabTextColor != nil && ![mSelectedTabTextColor isEqual: [NSNull null]]){
                nvConfig.selectedTabTextColor = mSelectedTabTextColor;
            }
            
            if (mUnselectedTabTextColor != nil && ![mUnselectedTabTextColor isEqual: [NSNull null]]){
                nvConfig.unselectedTabTextColor = mUnselectedTabTextColor;
            }
            
            if (mSelectedTabBgColor != nil && ![mSelectedTabBgColor isEqual: [NSNull null]]){
                nvConfig.selectedTabBgColor = mSelectedTabBgColor;
            }
            
            if (mUnselectedTabBgColor != nil && ![mUnselectedTabBgColor isEqual: [NSNull null]]){
                nvConfig.unselectedTabBgColor = mUnselectedTabBgColor;
            }
            
            if(selectedTabIndex != 0){
                nvConfig.selectedTabIndex = selectedTabIndex;
            }
            
            if (tabTextFontName != nil && [tabTextFontName length] > 0 && ![tabTextFontName isEqual: [NSNull null]]){
                nvConfig.tabTextfont = [UIFont fontWithName: tabTextFontName size: tabTextFontSize];
            }
            
            [notifyvisitors notificationCenterWithConfiguration: nvConfig];
            
        } else{
            NSLog(@"Empty JSON Object ! Going for Standard App Inbox ");
            [notifyvisitors notificationCenter];
        }
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 08 - GET NOTIFICATION CENTER COUNT */
RCT_EXPORT_METHOD(getNotificationCenterCount: (NSDictionary*_Nullable)tabCountInfo response:(RCTResponseSenderBlock) callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET NOTIFICATION CENTER COUNT !!");
        NSString * tab1Label;
        NSString * tab1Name;
        NSString * tab2Label;
        NSString * tab2Name;
        NSString * tab3Label;
        NSString * tab3Name;
        
        NSMutableDictionary *appInboxInfo = [[NSMutableDictionary alloc] init];
        //NSLog(@"tabCountInfo Object  %lu",[tabCountInfo count]);
        if ([tabCountInfo count] > 0){
            appInboxInfo = [tabCountInfo mutableCopy];
            tab1Label = nil;
            tab1Name = nil;
            tab2Label = nil;
            tab2Name = nil;
            tab3Label = nil;
            tab3Name = nil;
            
            if (appInboxInfo[@"label_one"] && ![appInboxInfo[@"label_one"] isEqual: [NSNull null]]) {
                tab1Label = appInboxInfo[@"label_one"];
            }
            
            if (appInboxInfo[@"name_one"] && ![appInboxInfo[@"name_one"] isEqual: [NSNull null]]) {
                tab1Name = appInboxInfo[@"name_one"];
            }
            
            if (appInboxInfo[@"label_two"] && ![appInboxInfo[@"label_two"] isEqual: [NSNull null]]) {
                tab2Label = appInboxInfo[@"label_two"];
            }
            
            if (appInboxInfo[@"name_two"] && ![appInboxInfo[@"name_two"] isEqual: [NSNull null]]) {
                tab2Name = appInboxInfo[@"name_two"];
            }
            
            if (appInboxInfo[@"label_three"] && ![appInboxInfo[@"label_three"] isEqual: [NSNull null]]) {
                tab3Label = appInboxInfo[@"label_three"];
            }
            
            if (appInboxInfo[@"name_three"] && ![appInboxInfo[@"name_three"] isEqual: [NSNull null]]) {
                tab3Name = appInboxInfo[@"name_three"];
            }
            
            NVCenterStyleConfig *nvConfig = [[NVCenterStyleConfig alloc] init];
            
            if (tab1Label != nil && [tab1Label length] > 0 && ![tab1Label isEqual: [NSNull null]]){
                if(tab1Name!= nil && [tab1Name length] > 0 && ![tab1Name isEqual: [NSNull null]]){
                    [nvConfig setFirstTabWithTabLable: tab1Label TagDisplayName: tab1Name];
                }
            }
            
            if (tab2Label != nil && [tab2Label length] > 0 && ![tab2Label isEqual: [NSNull null]]){
                if(tab2Name!= nil && [tab2Name length] > 0 && ![tab2Name isEqual: [NSNull null]]){
                    [nvConfig setSecondTabWithTabLable: tab2Label TagDisplayName: tab2Name];
                }
            }
            
            if (tab3Label != nil && [tab3Label length] > 0 && ![tab3Label isEqual: [NSNull null]]){
                if(tab3Name!= nil && [tab3Name length] > 0 && ![tab3Name isEqual: [NSNull null]]){
                    [nvConfig setThirdTabWithTabLable: tab3Label TagDisplayName: tab3Name];
                }
            }
            
            [notifyvisitors getNotificationCenterCountWithConfiguration: nvConfig countResult:^(NSDictionary * nvCenterCounts) {
                [self sendTabCountResponse:nvCenterCounts responseToSend:callback];
            }];
            
        } else{
            NSLog(@"Empty JSON Object ! Going for Standard Tab count ");
            [notifyvisitors getNotificationCenterCountWithConfiguration: Nil countResult:^(NSDictionary * nvCenterCounts) {
                [self sendTabCountResponse:nvCenterCounts responseToSend:callback];
            }];
        }
        
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 09 - Get notificvation Center data */
RCT_EXPORT_METHOD(getNotificationDataListener:(RCTResponseSenderBlock)callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET NOTIFICATION DATA LISTENER !!");
        [notifyvisitors GetNotificationCentreData:^(NSMutableArray * nvNotificationCenterData) {
            
            if([nvNotificationCenterData count] > 0){
                NSError *nvError = nil;
                NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: nvNotificationCenterData options:NSJSONWritingPrettyPrinted error: &nvError];
                NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
                callback(@[nvJsonString, [NSNull null]]);
            }else{
                callback(@[@"No Notification Found", [NSNull null]]);
            }
        }];
        
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 10 - Get notificvation Center data in callback in new format */
RCT_EXPORT_METHOD(getNotificationCenterData:(RCTResponseSenderBlock)callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET NOTIFICATION CENTER DATA !!");
        [notifyvisitors getNotificationCenterData:^(NSDictionary * nvNotificationCenterData) {
            NSError *nvError = nil;
            NSData *nvJsonData = nil;
            NSString *nvJsonString = nil;
            if([nvNotificationCenterData count] > 0){
                nvJsonData = [NSJSONSerialization dataWithJSONObject: nvNotificationCenterData options:NSJSONWritingPrettyPrinted error: &nvError];
            } else {
                NSDictionary *nvErrorDataResponse = @{@"message" : @"no notification(s)", @"notifications": @[]};
                nvJsonData = [NSJSONSerialization dataWithJSONObject: nvErrorDataResponse options:NSJSONWritingPrettyPrinted error: &nvError];
            }
            nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
            callback(@[nvJsonString, [NSNull null]]);
        }];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
        NSError *nvExcError = nil;
        NSDictionary *nvExcErrorDataResponse = @{@"message" : @"no notification(s)", @"notifications": @[], @"errorDescription" : exception.description};
        NSData *nvExcJsonData = [NSJSONSerialization dataWithJSONObject: nvExcErrorDataResponse options:NSJSONWritingPrettyPrinted error: &nvExcError];
        NSString *nvExcJsonString = [[NSString alloc] initWithData: nvExcJsonData encoding: NSUTF8StringEncoding];
        callback(@[nvExcJsonString, [NSNull null]]);
    }
}

/* 11 - Depricated Function For Notification Count */
RCT_EXPORT_METHOD(getNotificationCount:(RCTResponseSenderBlock)callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET NOTIFICATION COUNT !!");
        [notifyvisitors GetUnreadPushNotification:^(NSInteger nvUnreadPushCount) {
            NSString *jCount = nil;
            jCount = [@(nvUnreadPushCount) stringValue];
            callback(@[jCount, [NSNull null]]);
        }];
    } @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

- (void) sendTabCountResponse : (NSDictionary *) nvCenterCounts responseToSend:(RCTResponseSenderBlock) callback {
    NSError *nvError = nil;
    NSData *nvJsonData = nil;
    NSString *nvJsonString = nil;
    nvJsonData = [NSJSONSerialization dataWithJSONObject: nvCenterCounts options:NSJSONWritingPrettyPrinted error: &nvError];
    nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
    callback(@[nvJsonString, [NSNull null]]);
}

#pragma mark - Track Events method

/* 12 - Hit Event */
RCT_EXPORT_METHOD(event:(NSString*_Nullable)eventName Attributes:(NSDictionary* _Nullable)attributes LifeTimeValue:(NSString* _Nullable)lifeTimeValue Scope:(NSString* _Nullable)scope callback:(RCTResponseSenderBlock)nvcallback) {
    @try{
        NSLog(@"RN-NotifyVisitors : EVENT !!");
        eventCallback = nvcallback;
        NSMutableDictionary *jAttributes = [[NSMutableDictionary alloc] init];
        int nvScope = 0;
        
        if([eventName isEqual:[NSNull null]] || [eventName length] == 0){
            eventName = nil;
        }
        
        if (![attributes isEqual:[NSNull null]]){
            jAttributes = [attributes mutableCopy];
        }else{
            jAttributes = nil;
        }
        
        if([lifeTimeValue isEqual:[NSNull null]] || [lifeTimeValue length] == 0){
            lifeTimeValue = nil;
        }
        
        if([scope isEqual:[NSNull null]] ){
            nvScope = 0;
        } else if([scope length] == 0){
            nvScope = 0;
        }else{
            nvScope = [scope intValue];
        }
        
        //NSLog(@"Dictionary: %@",jAttributes);
        [notifyvisitors trackEvents:eventName Attributes:jAttributes lifetimeValue:lifeTimeValue Scope:nvScope];
        
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

RCT_EXPORT_METHOD(trackScreen:(NSString*_Nullable)nvScreenName) {
    @try{
        NSLog(@"RN-NotifyVisitors : TRACK SCREEN !!");
        
        if ([nvScreenName length] > 0 && ![nvScreenName isEqualToString: @""] && ![nvScreenName isEqual: [NSNull null]] && ![nvScreenName isEqualToString: @"(null)"]) {
            [notifyvisitors trackScreen: nvScreenName];
        } else {
            NSLog(@"RN-NotifyVisitors ERROR : Invalid or empty screen name found in trackScreen() method");
        }
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

#pragma mark - Push Notifications related methods

/* 13 - Schedule Push Notification */
RCT_EXPORT_METHOD(scheduleNotification:(NSString *_Nullable)nid tag:(NSString *_Nullable)tag timeinSecond:(NSString *_Nullable)time title:(NSString *_Nullable)title message:(NSString *_Nullable)message url:(NSString *_Nullable)url icon:(NSString *_Nullable)icon) {
    @try{
        NSLog(@"RN-NotifyVisitors : SCHEDULE PUSH NOTIFICATION !!");
        
        if([nid isEqual:[NSNull null]] || [nid length] == 0){
            nid = nil;
        }
        
        if([tag isEqual:[NSNull null]] || [tag length] == 0){
            tag = nil;
        }
        
        if([time isEqual:[NSNull null]] || [time length] == 0){
            time = nil;
        }
        if([title isEqual:[NSNull null]] || [title length] == 0){
            title = nil;
        }
        if([message isEqual:[NSNull null]] || [message length] == 0){
            message = nil;
        }
        if([url isEqual:[NSNull null]] || [url length] == 0){
            url = nil;
        }
        if([icon isEqual:[NSNull null]] || [icon length] == 0){
            icon = nil;
        }
        
        [notifyvisitors schedulePushNotificationwithNotificationID: nid Tag: tag TimeinSecond: time Title: title Message: message URL: url Icon: icon];
        
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 14 - stop geofence push for date and time */
RCT_EXPORT_METHOD(stopGeofencePushforDateTime:(NSString*_Nullable)nvDateTime  AdditionalHours:(NSString*_Nullable)additionalHours) {
    @try{
        NSLog(@"RN-NotifyVisitors : STOP GEOFENCE PUSH FOR DATE TIME !!");
        NSInteger nvAdditionalHours = 0;
        
        if ([nvDateTime isEqual:[NSNull null]] || [nvDateTime length] == 0){
            nvDateTime = nil;
        }
        
        if ([additionalHours isEqual:[NSNull null]] || [additionalHours length] == 0){
            nvAdditionalHours = 0;
        }else{
            nvAdditionalHours  = [additionalHours intValue];
        }
        
        [notifyvisitors stopGeofencePushforDateTime: nvDateTime additionalHours: nvAdditionalHours];
        
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 15 - GET SUBSCRIBE PUSH CATEGORY */
RCT_EXPORT_METHOD(subscribePushCategory: (NSArray *_Nullable)categoryInfo  unsubscribe:(BOOL)unsubscribeSignal ) {
    @try{
        NSLog(@"RN-NotifyVisitors : SUBSCRIBE PUSH CATEGORY !!");
        
        NSArray *categoryArray;
        
        if (![categoryInfo isEqual:[NSNull null]]){
            categoryArray = [categoryInfo mutableCopy];
        } else{
            categoryArray = nil;
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [notifyvisitors pushPreferences: categoryArray isUnsubscribeFromAll: unsubscribeSignal ? YES : NO];
        });
        
        
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 16 - GET REGISTRATION TOKEN */
RCT_EXPORT_METHOD(getRegistrationToken: (RCTResponseSenderBlock) callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET REGISTRATION TOKEN !!");
        NSString *nvPushToken = [notifyvisitors getPushRegistrationToken];
        if([nvPushToken length] > 0){
            callback(@[nvPushToken, [NSNull null]]);
        }else{
            callback(@[@"null", [NSNull null]]);
        }
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

#pragma mark - Track User Methods

/* 17 - user identifier method */
RCT_EXPORT_METHOD(userIdentifier:(NSString*_Nullable)nvUserID UserParams:(NSDictionary*_Nullable)nvUserParams) {
    @try{
        NSLog(@"RN-NotifyVisitors : USER IDENTIFIER !!");
        NSMutableDictionary *mUserParams = [[NSMutableDictionary alloc] init];
        
        if( [nvUserID isEqual:[NSNull null]] || [nvUserID length] == 0){
            nvUserID = nil;
        }
        
        
        if (![nvUserParams isEqual:[NSNull null]]){
            mUserParams = [nvUserParams mutableCopy];
        } else{
            mUserParams = nil;
        }
        
        [notifyvisitors UserIdentifier: nvUserID UserParams: mUserParams];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

//  static setUserIdentifier(sJsonObject, callback) {
RCT_EXPORT_METHOD(setUserIdentifier:(NSDictionary*_Nullable)nvUserParams onUserTrackListener:(RCTResponseSenderBlock)onUserTrackListener) {
    NSLog(@"RN-NotifyVisitors : SET USER IDENTIFIER !!");
    @try {
        
        
        NSDictionary *nvFinalUserParams = nil;
        if ([nvUserParams  count] > 0) {
            nvFinalUserParams = nvUserParams;
        }
        
        [notifyvisitors userIdentifierWithUserParams: nvFinalUserParams onUserTrackListener:^(NSDictionary * userTrackingResponseDict) {
            
            NSError *nvError = nil;
            NSData *nvUserTrackingResJsonData = [NSJSONSerialization dataWithJSONObject: userTrackingResponseDict options: NSJSONWritingPrettyPrinted error: &nvError];
            NSString *nvUserTrackingResJsonStr = [[NSString alloc] initWithData: nvUserTrackingResJsonData encoding: NSUTF8StringEncoding];
            onUserTrackListener(@[nvUserTrackingResJsonStr, [NSNull null]]);
            
        }];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 19 - Get nvUid */
RCT_EXPORT_METHOD(getNvUID: (RCTResponseSenderBlock)callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET NVUID !!");
        
        NSString * nvUIDStr = [notifyvisitors getNvUid];
        if ([nvUIDStr length] > 0 && ![nvUIDStr isEqualToString: @""] && ![nvUIDStr isEqual: [NSNull null]] && ![nvUIDStr isEqualToString: @"(null)"]) {
            callback(@[nvUIDStr, [NSNull null]]);
        } else {
            callback(@[@"null", [NSNull null]]);
        }
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 20 - known user identified */
RCT_EXPORT_METHOD(knownUserIdentified:(RCTResponseSenderBlock)nvcallback) {
    NSLog(@"RN-NotifyVisitors : GET KNOWN USER IDENTIFIED INFO !!");
    @try{
        onKnownUserFoundCallback = nvcallback;
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

#pragma mark - ChatBot Methods

/* 21 - Start Chat Bot */
RCT_EXPORT_METHOD(startChatBot: (NSString*_Nullable)screenName) {
    @try{
        NSLog(@"RN-NotifyVisitors : START CHATBOT !!");
        NSLog(@"This feature temporarily not available. Please contact our support team for more assistance");
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

- (void)NotifyvisitorsChatBotActionCallbackWithUserInfo:(NSDictionary *)userInfo {
    NSLog(@"RN-NotifyVisitors : NOTIFYVISITORS CHATBOT ACTION CALLBACK WITH USER INFO !!");
    @try {
        if ([userInfo count] > 0) {
            NSError *nvError = nil;
            NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: userInfo options: NSJSONWritingPrettyPrinted error: &nvError];
            NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
            [self sendEventWithName:@"nv_chat_bot_button_click" body:@{@"data":nvJsonString}];
        }
        
    }
    @catch (NSException *exception) {
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
    
}

#pragma mark - GetLinkInfo and other callbacks handler methods

/* 22 - GetLinkInfo */
RCT_EXPORT_METHOD(getLinkInfo) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET LINK INFO !!");
        nvPushObserverReady = YES;
        [[NSNotificationCenter defaultCenter] addObserverForName: @"nvNotificationClickCallback" object: nil queue: nil usingBlock: ^(NSNotification *notification) {
            NSDictionary *nvUserInfo = [notification userInfo];
            if ([nvUserInfo count] > 0) {
                NSError *nvError = nil;
                NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: nvUserInfo options: NSJSONWritingPrettyPrinted error: &nvError];
                NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
                [self sendEventWithName:@"nv_push_banner_click" body: @{@"data": nvJsonString}];
            }
        }];
        
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

- (void)notifyvisitorsEventsResponseCallback:(NSDictionary *)callback {
    NSLog(@"RN-NotifyVisitors : NOTIFYVISITORS EVENTS RESPONSE CALLBACK!!");
    @try {
        if([callback count] > 0){
            NSError *nvError = nil;
            NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: callback options: NSJSONWritingPrettyPrinted error: &nvError];
            NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
            
            NSString * eventName = callback[@"eventName"];
            // clicked is event or survey
            if([eventName isEqualToString:@"Survey Submit"] || [eventName isEqualToString:@"Survey Attempt"] || [eventName isEqualToString:@"Banner Impression"] || [eventName isEqualToString:@"Banner Clicked"] ){
                nvInAppFound = true;
                if(showCallback != NULL){
                    [self sendEventWithName:@"nv_show_callback" body:@{@"data":nvJsonString}];
                }
            }else{
                if(eventCallback != NULL){
                    [self sendEventWithName:@"nv_event_callback" body:@{@"data":nvJsonString}];
                }
            }
            
            if(commonCallback != NULL){
                [self sendEventWithName:@"nv_common_show_event_callback" body:@{@"data":nvJsonString}];
            }
            
        }
    }
    @catch (NSException *exception) {
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

-(void)notifyvisitorsKnownUserIdentified:(NSDictionary*_Nullable)userInfo {
    NSLog(@"RN-NotifyVisitors : GET DATA WHEN KNOWN USER IDENTIFIED !!");
    @try {
        if([userInfo count] > 0){
            NSError *nvError = nil;
            NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: userInfo options: NSJSONWritingPrettyPrinted error: &nvError];
            NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
            
            if(onKnownUserFoundCallback != NULL) {
                [self sendEventWithName: @"nv_known_user_identified_callback" body: @{@"data": nvJsonString}];
            }
            
        }
    }
    @catch (NSException *exception) {
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

-(void)notifyvisitorsNudgeUiFinalized:(NSDictionary *)callback {
    NSLog(@"RN-NotifyVisitors : NUDGE-UI-FINALIZED !!");
    @try {
        if([callback count] > 0){
            NSError *nvError = nil;
            NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: callback options: NSJSONWritingPrettyPrinted error: &nvError];
            NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
            if ([nvJsonString length] > 0 && ![nvJsonString isEqualToString: @""] && ![nvJsonString isEqual: [NSNull null]]) {
                [[NSNotificationCenter defaultCenter] postNotificationName: @"nv_rn_nudges_ui_finalized" object: nil userInfo: @{@"data": nvJsonString}];
            }
        }
    }
    @catch (NSException *exception) {
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 20 - known user identified */
RCT_EXPORT_METHOD(notificationClickCallback:(RCTResponseSenderBlock)nvcallback) {
    @try{
        NSLog(@"RN-NotifyVisitors : NOTIFICATION CLICK CALLBACK !!");
        onNotificationClickCallback = nvcallback;
        nvPushObserverReady = YES;
                [[NSNotificationCenter defaultCenter] addObserverForName: @"nvNotificationClickCallback" object: nil queue: nil usingBlock: ^(NSNotification *notification) {
                    NSDictionary *nvUserInfo = [notification userInfo];
                    if ([nvUserInfo count] > 0) {
                        NSError *nvError = nil;
                        NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: nvUserInfo options: NSJSONWritingPrettyPrinted error: &nvError];
                        NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
                        [self sendEventWithName:@"nv_notification_click_callback" body: @{@"data": nvJsonString}];
                    }
                }];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

//RCT_EXPORT_METHOD(notificationClickCallback) {
//    @try{
//        NSLog(@"RN-NotifyVisitors : notificationClickCallback() !!");
//        nvPushObserverReady = YES;
//        [[NSNotificationCenter defaultCenter] addObserverForName: @"nvNotificationClickCallback" object: nil queue: nil usingBlock: ^(NSNotification *notification) {
//            NSDictionary *nvUserInfo = [notification userInfo];
//            if ([nvUserInfo count] > 0) {
//                NSError *nvError = nil;
//                NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: nvUserInfo options: NSJSONWritingPrettyPrinted error: &nvError];
//                NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
//                [self sendEventWithName:@"nv_notification_click_callback" body: @{@"data": nvJsonString}];
//            }
//        }];
//        
//    }
//    @catch(NSException *exception){
//        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
//    }
//}

#pragma mark - Other Methods

/* 23 - REQUEST INAPP REVIEW */
RCT_EXPORT_METHOD(requestInAppReview: (RCTResponseSenderBlock) callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : REQUEST IN APP REVIEW !!");
        [notifyvisitors requestAppleAppStoreInAppReview];
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors ERROR : %@", exception.reason);
    }
}

/* 24 - Get Session Data */
RCT_EXPORT_METHOD(getSessionData: (RCTResponseSenderBlock)callback) {
    @try{
        NSLog(@"RN-NotifyVisitors : GET SESSION DATA !!");
        NSDictionary * nvSessionDataResponse = [notifyvisitors getSessionData];
        if ([nvSessionDataResponse count] > 0) {
            NSError *nvError = nil;
            NSData *nvJsonData = [NSJSONSerialization dataWithJSONObject: nvSessionDataResponse options: NSJSONWritingPrettyPrinted error: &nvError];
            NSString *nvJsonString = [[NSString alloc] initWithData: nvJsonData encoding: NSUTF8StringEncoding];
            callback(@[nvJsonString, [NSNull null]]);
        } else {
            callback(@[@"null", [NSNull null]]);
        }
    }
    @catch(NSException *exception){
        NSLog(@"RN-NotifyVisitors  GET SESSION DATA ERROR : %@", exception.reason);
    }
}

-(UIColor*)GetColor:(NSString *)ColorString {
    if ([[ColorString substringToIndex:1]isEqualToString:@"#"]) {
        unsigned int c;
        if ([ColorString characterAtIndex:0] == '#') {
            [[NSScanner scannerWithString:[ColorString substringFromIndex:1]] scanHexInt:&c];
        } else {
            [[NSScanner scannerWithString:ColorString] scanHexInt:&c];
        }
        return [UIColor colorWithRed:((c & 0xff0000) >> 16)/255.0 green:((c & 0xff00) >> 8)/255.0 blue:(c & 0xff)/255.0 alpha:1.0];
    } else {
        NSString *sep = @"()";
        NSCharacterSet *set = [NSCharacterSet characterSetWithCharactersInString:sep];
        NSString *rgba = [ColorString componentsSeparatedByCharactersInSet:set][1];
        CGFloat R = [[rgba componentsSeparatedByString:@","][0] floatValue];
        CGFloat G = [[rgba componentsSeparatedByString:@","][1] floatValue];
        CGFloat B = [[rgba componentsSeparatedByString:@","][2] floatValue];
        CGFloat alpha = [[rgba componentsSeparatedByString:@","][3] floatValue];
        UIColor *ResultColor = [UIColor colorWithRed:R/255 green:G/255 blue:B/255 alpha:alpha];
        return ResultColor;
    }
}


@end
