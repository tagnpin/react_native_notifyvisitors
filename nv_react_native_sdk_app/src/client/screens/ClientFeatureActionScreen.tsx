// src/client/screens/ClientFeatureActionScreen.tsx

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClientStackParamList } from '../../navigation/NavigationTypes';
import { FeatureActionProps } from '../../shared/types/actions';
import { filterActionsByPlatform } from '../../shared/utils/platformActionFilter';
import {
  inAppMessageActions,
  inAppNudgesActions,
  notificationCenterActions,
  sendPushActions,
  trackEventActions,
  userPropertyActions,
} from '../features/allFeatureActions';
import { normalizeParams } from '../../shared/utils/normalizeParams';
import { buildPayloadFromSchema } from '../../shared/utils/buildPayload';
import { theme } from '../../shared/styles/theme';
import ResultBottomSheet from '../../shared/components/ResultBottomSheet';
import SectionHeader from '../../shared/components/SectionHeader';
import ActionRow from '../../shared/components/ActionRow';
import { useNotificationBadge } from '../../shared/store/NotificationBadgeContext';
import {
  useNVGetEventSurveyInfo,
  useNVGetLinkInfo,
  useNVknownUserInfo,
} from '../../shared/hooks/nvSDKHooks';
import SectionCard from '../../shared/components/SectionCard';
import { NotifyvisitorsNativeDisplay } from '../../../..';
import { FeatureActionAccordion } from '../../shared/components/Accordion/FeatureActionAccordion';

type Props = NativeStackScreenProps<
  ClientStackParamList,
  'ClientFeatureAction'
>;

const ClientFeatureActionScreen: React.FC<Props> = ({ route }) => {
  const { featureKey } = route.params;

  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [resultTitle, setResultTitle] = useState('SDK Result');
  const [featureDescription, setFeatureDescription] = useState('');

  const { unreadCount, clearUnreadCount, refreshUnreadCount } =
    useNotificationBadge();

  const nvEventSurveyInfoData = useNVGetEventSurveyInfo();
  const nvGetLinkInfoData = useNVGetLinkInfo();
  const nvKnownUserInfoData = useNVknownUserInfo();

  const actions = useMemo<FeatureActionProps[]>(() => {
    switch (featureKey) {
      case 'push':
        return filterActionsByPlatform(sendPushActions);
      case 'notificationCenter':
        return filterActionsByPlatform(
          notificationCenterActions({
            clearBadge: clearUnreadCount,
            setBadge: refreshUnreadCount,
          }),
        );
      case 'inAppMessages':
        return filterActionsByPlatform(inAppMessageActions);
      case 'inAppNudges':
        return filterActionsByPlatform(inAppNudgesActions);
      case 'trackEvents':
        return filterActionsByPlatform(trackEventActions);
      case 'userProperties':
        return filterActionsByPlatform(userPropertyActions);
      default:
        return [];
    }
  }, [featureKey]);

  useEffect(() => {
    let featureDescText = '';

    switch (featureKey) {
      case 'push':
        featureDescText =
          'Build personalized user experiences across all mobile touchpoints - on and above your app';
        break;
      case 'notificationCenter':
        featureDescText =
          'Show a screen with the list of all push (excluding test push) sent to users';
        break;
      case 'inAppMessages':
        featureDescText =
          'Show real-time onsite notifications based on customer behaviour.';
        break;
      case 'inAppNudges':
        featureDescText =
          'Deliver personalized messages using in-app notifications and nudges.';
        break;
      case 'trackEvents':
        featureDescText =
          'Evaluate user actions, intentions, and behavior across channels.';
        break;
      case 'userProperties':
        featureDescText =
          'Create a unified user profile using custom user properties.';
        break;
      default:
        featureDescText = 'Example SDK calls for this feature.';
    }

    setFeatureDescription(featureDescText);
  }, [featureKey]);

  useEffect(() => {
    // Notifyvisitors.getLinkInfo((callback: any) => {
    //   console.log(`raw getLinkInfo() Data = ${JSON.stringify(callback)}`);
    // });
    // Notifyvisitors.getEventSurveyInfo((callback: any) => {
    //   console.log(
    //     `raw getEventSurveyInfo() Data = ${JSON.stringify(callback)}`,
    //   );
    // });
    // SDKManager.onEventSurveyInfo(data => {
    //   console.log(`raw getEventSurveyInfo() Data = ${JSON.stringify(data)}`);
    // });
    // SDKManager.getEventSurveyInfo().then(data => {
    //   console.log(`sdkmanager.getEventSurveyInfo = ${JSON.stringify(data)}`);
    // });
  }, []);

  // useEffect(() => {
  //   if (!nvEventSurveyInfoData) return;
  //   setResult(nvEventSurveyInfoData);
  //   setResultTitle('Event Survey Info Callback:');
  //   setVisible(true);
  // }, [nvEventSurveyInfoData]);

  useEffect(() => {
    if (!nvGetLinkInfoData) return;
    setResult(nvGetLinkInfoData.payload);
    setResultTitle('Get Link Info Callback:');
    setVisible(true);
  }, [nvGetLinkInfoData?.eventId]);

  useEffect(() => {
    if (!nvKnownUserInfoData) return;
    setResult(nvKnownUserInfoData.payload);
    setResultTitle('Known User Info Callback:');
    setVisible(true);
  }, [nvKnownUserInfoData?.eventId]);

  const executeAction = async <T,>(
    action: FeatureActionProps<T>,
    options?: {
      payload?: T;
      executor?: (payload: T) => Promise<any> | void;
    },
  ) => {
    try {
      action.onBeforeExecute?.();
      const payload =
        options?.payload ??
        (buildPayloadFromSchema(normalizeParams(action.params)) as T);

      const response = await (options?.executor ?? action.execute)?.(payload);

      action.onAfterExecute?.(response);
      if (action.showResult && response !== undefined) {
        setResult(response);
        setResultTitle(action.resultTitle ?? 'SDK Result');
        setVisible(true);
      }
      return response;
    } catch (e: any) {
      const errorResult = { status: 'failed', message: e.message };
      setResult(errorResult);
      setResultTitle('SDK Error');
      setVisible(true);
      return errorResult;
    }
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{featureDescription}</Text>
        </View>

        <SectionHeader title="Actions" />

        <SectionCard>
          {actions.map(action => {
            // ✅ Native Display
            if (action.key === 'nativeDisplay') {
              return (
                <React.Fragment key={action.key}>
                  <SectionHeader
                    title={action.actionLabel || 'Native Display'}
                  />

                  <View style={styles.nativeDisplayContainer}>
                    <NotifyvisitorsNativeDisplay
                      propertyName="offers"
                      style={styles.nativeView}
                      onNudgeUiFinalized={(data: any) => {
                        try {
                          const parsedData = JSON.parse(data.response?.data);
                          console.log('Native Display Size:', parsedData?.size);
                        } catch (e) {
                          console.log('Native Display parse error', e);
                        }
                      }}
                    />
                  </View>
                </React.Fragment>
              );
            }

            // ✅ NEW: Dynamic FeatureActionAccordion
            if (action.inputParams) {
              return (
                <FeatureActionAccordion
                  key={action.key}
                  accordionId={`feature_${action.key}`}
                  title={action.title}
                  description={action.description}
                  actionLabel={action.actionLabel}
                  params={action.params}
                  inputParams={action.inputParams}
                  actionButtons={action.actionButtons}
                  accordionDefaultExpanded={action.accordionDefaultExpanded}
                  execute={payload => executeAction(action, { payload })}
                  onExecuteActionButton={(executor, payload) =>
                    executeAction(action, { payload, executor })
                  }
                  // execute={payload =>
                  //   executeAction({ ...action, params: payload })
                  // }
                  // onExecute={payload => executeAction(action)}
                />
              );
            }

            // ✅ Default ActionRow
            return (
              <ActionRow
                key={action.key}
                title={action.title}
                description={action.description}
                actionLabel={action.actionLabel}
                actionBadgeCount={
                  action.key === 'getUnreadCountNotificationCenter'
                    ? unreadCount
                    : undefined
                }
                layout={action.layout}
                execute={async () => executeAction(action)}
              />
            );
          })}
          {/* {actions.map(action => {
            // ✅ Track Custom Events
            if (action.key === 'trackCustomEvents') {
              return (
                <React.Fragment key={action.key}>
                  <SectionHeader title="Advanced" />
                  <TrackEventAccordion
                    accordionId={'client_track_custom_event'}
                    title={action.title}
                    subtitle={action.description}
                    defaultExpanded={action.accordionDefaultExpanded}
                  />
                </React.Fragment>
              );
            }

            // ✅ Track Custom User Properties
            if (action.key === 'trackCustomUser') {
              return (
                <React.Fragment key={action.key}>
                  <SectionHeader title="Advanced" />
                  <SetupUserDetailsAccordion
                    accordionId={'client_create_custom_user'}
                    title={action.title}
                    subtitle={action.description}
                    defaultExpanded={action.accordionDefaultExpanded}
                  />
                </React.Fragment>
              );
            }

            // ✅ Native Display
            if (action.key === 'nativeDisplay') {
              return (
                <React.Fragment key={action.key}>
                  <SectionHeader
                    title={action.actionLabel || 'Native Display'}
                  />
                  <View style={styles.nativeDisplayContainer}>
                    <NotifyvisitorsNativeDisplay
                      propertyName="offers"
                      style={styles.nativeView}
                      onNudgeUiFinalized={(data: any) => {
                        try {
                          const parsedData = JSON.parse(data.response?.data);
                          console.log('Native Display Size:', parsedData?.size);
                        } catch (e) {
                          console.log('Native Display parse error', e);
                        }
                      }}
                    />
                  </View>
                </React.Fragment>
              );
            }

            // ✅ Default Action Row
            return (
              <ActionRow
                key={action.key}
                title={action.title}
                description={action.description}
                actionLabel={action.actionLabel}
                // actionBadgeCount={action.actionBadgeCount}
                actionBadgeCount={
                  action.key === 'getUnreadCountNotificationCenter'
                    ? unreadCount
                    : undefined
                }
                layout={action.layout}
                // execute={() => executeAction(action)}
                execute={async () => executeAction(action)}
              />
            );
          })} */}

          {actions.length === 0 && (
            <Text style={styles.emptyText}>
              No actions available for this feature.
            </Text>
          )}
        </SectionCard>
      </ScrollView>

      <ResultBottomSheet
        visible={visible}
        title={resultTitle}
        result={result}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default ClientFeatureActionScreen;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    flexGrow: 1,
  },

  description: {
    marginBottom: theme.spacing.lg,
  },

  descriptionText: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
    flexWrap: 'wrap',
  },
  emptyText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  nativeDisplayContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    minHeight: 160,
  },
  nativeView: {
    width: '100%',
    flex: 1,
  },
});
