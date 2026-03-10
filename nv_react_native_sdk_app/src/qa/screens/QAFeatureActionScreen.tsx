// src/qa/screens/QAFeatureActionScreen.tsx

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { theme } from '../../shared/styles/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QAStackParamList } from '../../navigation/NavigationTypes';
import { useNotificationBadge } from '../../shared/store/NotificationBadgeContext';
import {
  useNVGetEventSurveyInfo,
  useNVGetLinkInfo,
  useNVknownUserInfo,
} from '../../shared/hooks/nvSDKHooks';
import { FeatureActionProps } from '../../shared/types/actions';
import { filterActionsByPlatform } from '../../shared/utils/platformActionFilter';
import {
  qaTrackEventActions,
  qaUserPropertyActions,
  qaInAppMessageActions,
  qaInAppNudgesActions,
  qaPushActions,
  qaNotificationCenterActions,
} from '../features/allQAFeatureActions';
import { normalizeParams } from '../../shared/utils/normalizeParams';
import { buildPayloadFromSchema } from '../../shared/utils/buildPayload';
import SectionHeader from '../../shared/components/SectionHeader';
import SectionCard from '../../shared/components/SectionCard';
import { FeatureActionAccordion } from '../../shared/components/Accordion/FeatureActionAccordion';
import ActionRow from '../../shared/components/ActionRow';
import ResultBottomSheet from '../../shared/components/ResultBottomSheet';
import { NotifyvisitorsNativeDisplay } from '../../../..';
import { resolveQALinkPage, toSafeJSON } from '../utils/qaLinkRouting';

type Props = NativeStackScreenProps<QAStackParamList, 'QAFeatureAction'>;

const QAFeatureActionScreen: React.FC<Props> = ({ route, navigation }) => {
  const { featureKey } = route.params;
  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [resultTitle, setResultTitle] = useState('SDK Result');
  const [featureDescription, setFeatureDescription] = useState('');
  const [qaNativeDisplayPropertyName, setQaNativeDisplayPropertyName] =
    useState('');
  const [qaNativeDisplayHeight, setQaNativeDisplayHeight] = useState<number>(0);

  const { unreadCount, clearUnreadCount, refreshUnreadCount } =
    useNotificationBadge();

  const nvEventSurveyInfoData = useNVGetEventSurveyInfo();
  const nvGetLinkInfoData = useNVGetLinkInfo();
  const nvKnownUserInfoData = useNVknownUserInfo();

  const actions = useMemo<FeatureActionProps[]>(() => {
    switch (featureKey) {
      case 'push':
        return filterActionsByPlatform(qaPushActions);
      case 'notificationCenter':
        return filterActionsByPlatform(
          qaNotificationCenterActions({
            clearBadge: clearUnreadCount,
            setBadge: refreshUnreadCount,
          }),
        );
      case 'inAppMessages':
        return filterActionsByPlatform(qaInAppMessageActions);
      case 'inAppNudges':
        return filterActionsByPlatform(qaInAppNudgesActions);
      case 'trackEvents':
        return filterActionsByPlatform(qaTrackEventActions);
      case 'userProperties':
        return filterActionsByPlatform(qaUserPropertyActions);
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
    if (!nvGetLinkInfoData) return;
    const linkPayload = nvGetLinkInfoData.payload;
    setResult(linkPayload);
    setResultTitle('Get Link Info Callback:');
    setVisible(true);

    const page = resolveQALinkPage(linkPayload);
    if (page) {
      navigation.navigate('QALinkLanding', {
        page,
        source: 'push_or_deeplink',
        title: page === 'about-us' ? 'About Us' : 'Contact Us',
        linkInfoJSON: toSafeJSON(linkPayload),
      });
    }
  }, [nvGetLinkInfoData?.eventId]);

  useEffect(() => {
    if (!nvKnownUserInfoData) return;
    setResult(nvKnownUserInfoData.payload);
    setResultTitle('Known User Info Callback:');
    setVisible(true);
  }, [nvKnownUserInfoData?.eventId]);

  const executeQAAction = async <T,>(
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

      if (action.key === 'qaNativeDisplay') {
        const payloadPropertyName =
          typeof (payload as any)?.propertyName === 'string'
            ? (payload as any).propertyName
            : '';
        const responsePropertyName =
          typeof response?.propertyName === 'string'
            ? response.propertyName
            : '';
        const finalPropertyName =
          responsePropertyName.trim() || payloadPropertyName.trim();

        if (finalPropertyName) {
          setQaNativeDisplayPropertyName(finalPropertyName);
          setQaNativeDisplayHeight(0);
        }
      }

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
            if (action.key === 'qaNativeDisplay') {
              return (
                <React.Fragment key={action.key}>
                  <FeatureActionAccordion
                    accordionId={`qafeature_${action.key}`}
                    title={action.title}
                    description={action.description}
                    actionLabel={action.actionLabel}
                    params={action.params}
                    inputParams={action.inputParams}
                    actionButtons={action.actionButtons}
                    accordionDefaultExpanded={action.accordionDefaultExpanded}
                    execute={payload => executeQAAction(action, { payload })}
                    onExecuteActionButton={(executor, payload) =>
                      executeQAAction(action, { payload, executor })
                    }
                  />
                  {qaNativeDisplayPropertyName ? (
                    <View style={styles.nativeDisplayContainer}>
                      <Text style={styles.nativeDisplayTitle}>
                        Native Display Preview ({qaNativeDisplayPropertyName})
                      </Text>
                      <NotifyvisitorsNativeDisplay
                        propertyName={qaNativeDisplayPropertyName}
                        style={[
                          styles.nativeView,
                          qaNativeDisplayHeight > 0
                            ? { height: qaNativeDisplayHeight }
                            : styles.nativeViewFallback,
                        ]}
                        onNudgeUiFinalized={(data: any) => {
                          try {
                            const parsedData = JSON.parse(data.response?.data);
                            const rawSize = parsedData?.size;
                            const nextHeight =
                              typeof rawSize === 'number'
                                ? rawSize
                                : typeof rawSize?.height === 'number'
                                ? rawSize.height
                                : 0;
                            if (nextHeight > 0) {
                              // Add a bottom safety buffer because SDK size can be tight.
                              const bufferedHeight = Math.ceil(nextHeight) + 16;
                              setQaNativeDisplayHeight(bufferedHeight);
                            }
                            setResult(parsedData);
                            setResultTitle('QA Native Display Finalized:');
                            setVisible(true);
                            console.log(
                              'QA Native Display Size:',
                              parsedData?.size,
                            );
                          } catch (e) {
                            setResult(data);
                            setResultTitle('QA Native Display Finalized:');
                            setVisible(true);
                            console.log('QA Native Display parse error', e);
                          }
                        }}
                      />
                    </View>
                  ) : null}
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
                    <Text>Native Display Content</Text>
                  </View>
                </React.Fragment>
              );
            }

            // ✅ NEW: Dynamic FeatureActionAccordion
            if (action.inputParams) {
              return (
                <FeatureActionAccordion
                  key={action.key}
                  accordionId={`qafeature_${action.key}`}
                  title={action.title}
                  description={action.description}
                  actionLabel={action.actionLabel}
                  params={action.params}
                  inputParams={action.inputParams}
                  actionButtons={action.actionButtons}
                  accordionDefaultExpanded={action.accordionDefaultExpanded}
                  execute={payload => executeQAAction(action, { payload })}
                  onExecuteActionButton={(executor, payload) =>
                    executeQAAction(action, { payload, executor })
                  }
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
                  action.key === 'qaAdvancedNotificationCenter'
                    ? unreadCount
                    : undefined
                }
                layout={action.layout}
                execute={async () => executeQAAction(action)}
              />
            );
          })}

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

export default QAFeatureActionScreen;

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
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    overflow: 'visible',
  },
  nativeDisplayTitle: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
  nativeView: {
    width: '100%',
    overflow: 'visible',
  },
  nativeViewFallback: {
    minHeight: 160,
  },
});
