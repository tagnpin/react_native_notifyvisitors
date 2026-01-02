// src/client/screens/FeatureGroupScreen.tsx

import React, { useMemo, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ClientStackParamList } from '../../navigation/NavigationTypes';
import SectionHeader from '../../shared/components/SectionHeader';
import ClientSectionCard from '../components/ClientSectionCard';

import {
  sendPushActions,
  notificationCenterActions,
  inAppMessageActions,
  inAppNudgesActions,
  trackEventActions,
  userPropertyActions,
} from '../features/allFeatureActions';

import ActionRow from '../../shared/components/ActionRow';
import ResultBottomSheet from '../../shared/components/ResultBottomSheet';
import { filterActionsByPlatform } from '../../shared/utils/platformActionFilter';
import TrackEventAccordion from '../../shared/components/analytics/TrackEventAccordion';
import SetupUserDetailsAccordion from '../../shared/components/analytics/SetupUserDetailsAccordion';
import { theme } from '../../shared/styles/theme';
import { FeatureActionProps } from '../../shared/types/actions';
import { ParamSchema } from '../../shared/types/params';
import { parseParam } from '../../shared/utils/parseParam';
import { resolveParams } from '../../shared/utils/resolveParams';
import { normalizeParams } from '../../shared/utils/normalizeParams';
import { buildPayloadFromSchema } from '../../shared/utils/buildPayload';

type Props = NativeStackScreenProps<ClientStackParamList, 'FeatureGroup'>;

const FeatureGroupScreen: React.FC<Props> = ({ route }) => {
  const { featureKey } = route.params;

  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [resultTitle, setResultTitle] = useState('SDK Result');

  const actions = useMemo<FeatureActionProps[]>(() => {
    switch (featureKey) {
      case 'push':
        return filterActionsByPlatform(sendPushActions);
      case 'notificationCenter':
        return filterActionsByPlatform(notificationCenterActions);
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

  // const buildPayload = (params?: InputParameter[]) => {
  //   const payload: Record<string, any> = {};

  //   if (!params) return payload;

  //   for (const p of params) {
  //     const result = validateInput(p);
  //     if (!result.valid) {
  //       throw new Error(`${p.name}: ${result.error}`);
  //     }
  //     payload[p.name] = result.parsedValue;
  //   }

  //   return payload;
  // };

  // const buildPayload = (params?: ParamSchema[]) => {
  //   const payload: Record<string, any> = {};
  //   if (!params) return payload;
  //   for (const p of params) {
  //     try {
  //       payload[p.type] = parseParam(p.type, p);
  //     } catch (e: any) {
  //       throw new Error(`${p.type}: ${result.error}`);
  //       return null;
  //     }
  //   }

  //   return payload;
  // };

  const executeAction = async <T,>(action: FeatureActionProps<T>) => {
    try {
      const schema = normalizeParams(action.params);
      const payload = buildPayloadFromSchema(schema) as T;

      const response = await action.execute?.(payload);

      if (action.showResult && response !== undefined) {
        setResult(response);
        setResultTitle(action.resultTitle ?? 'SDK Result');
        setVisible(true);
      }
    } catch (e: any) {
      setResult({ status: 'failed', message: e.message });
      setVisible(true);
    }
  };

  // const executeAction = async (action: FeatureActionProps) => {
  //   try {
  //     const payload = resolveParams(action.params);
  //     const response = await action.execute?.(payload);

  //     // Show result only if response exists
  //     if (response !== undefined) {
  //       setResult(response);
  //       setVisible(true);
  //     }
  //   } catch (e: any) {
  //     setResult({
  //       status: 'failed',
  //       message: e.message ?? 'Unknown error',
  //     });
  //     setVisible(true);
  //   }
  // };

  // const executeAction = async (action: any) => {
  //   try {
  //     const response = await action.execute?.();

  //     // ✅ Only show result if explicitly required
  //     if (action.showResult && response !== undefined) {
  //       setResult(response);
  //       setResultTitle(action.resultTitle ?? 'SDK Result');
  //       setVisible(true);
  //     }
  //   } catch (e: any) {
  //     if (action.showResult) {
  //       setResult({
  //         status: 'failed',
  //         message: e?.message ?? 'Unknown error',
  //       });
  //       setResultTitle(action.resultTitle ?? 'SDK Error');
  //       setVisible(true);
  //     }
  //   }
  // };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Example SDK calls for this feature.
          </Text>
        </View>

        <SectionHeader title="Actions" />

        <ClientSectionCard>
          {actions.map(action =>
            action.key === 'trackCustomEvents' ? (
              <>
                {/* Advanced */}
                <SectionHeader title="Advanced" />
                <TrackEventAccordion
                  key={action.key}
                  title={action.title}
                  subtitle={action.description}
                  defaultExpanded={action.accordionDefaultExpanded}
                />
              </>
            ) : action.key === 'trackCustomUser' ? (
              <>
                {/* Advanced */}
                <SectionHeader title="Advanced" />

                <SetupUserDetailsAccordion
                  key={action.key}
                  title={action.title}
                  subtitle={action.description}
                  defaultExpanded={action.accordionDefaultExpanded}
                />
              </>
            ) : action.key === 'nativeDisplay' ? (
              <>
                <SectionHeader
                  title={action.actionLabel || 'Native Display'}
                  key={action.key}
                />
                <View style={styles.nativeDisplayContainer}></View>
              </>
            ) : (
              <ActionRow
                key={action.key}
                title={action.title}
                description={action.description}
                actionLabel={action.actionLabel}
                actionBadgeCount={action.actionBadgeCount}
                layout={action.layout}
                onPress={() => executeAction(action)}
              />
            ),
          )}

          {actions.length === 0 && (
            <Text style={styles.emptyText}>
              No actions available for this feature.
            </Text>
          )}
        </ClientSectionCard>
      </ScrollView>

      {/* ✅ ResultBottomSheet only opens when needed */}
      <ResultBottomSheet
        visible={visible}
        title={resultTitle}
        result={result}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default FeatureGroupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  description: {
    marginBottom: 16,
  },
  descriptionText: {
    color: '#666',
    fontSize: 14,
  },
  emptyText: {
    marginTop: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  nativeDisplayContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
    minHeight: 120,
    maxHeight: Infinity,
    maxWidth: Infinity,
  },
});
