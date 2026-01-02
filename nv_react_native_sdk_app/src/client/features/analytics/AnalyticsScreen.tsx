// src/client/features/analytics/AnalyticsScreen.tsx

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { analyticsActions } from './analyticsActions';
import { InputParameter } from '../../../shared/types/InputTypes';
import { validateInput } from '../../../qa/inputs/InputValidator';
import SDKManager from '../../../sdk/SDKManager';
import ActionRow from '../../../shared/components/ActionRow';
import ResultBottomSheet from '../../../shared/components/ResultBottomSheet';
import { NVActionProps } from '../../../shared/utils/types';

const AnalyticsScreen: React.FC = () => {
  const [actionsState, setActionsState] =
    useState<NVActionProps[]>(analyticsActions);
  const [callbackResult, setCallbackResult] = useState<any>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Handle changes to parameters for a specific action
  const handleParamChange = (
    actionKey: string,
    updatedParam: InputParameter,
  ) => {
    setActionsState(prev =>
      prev.map(action =>
        action.key === actionKey
          ? {
              ...action,
              params: action.params?.map(p =>
                p.id === updatedParam.id ? updatedParam : p,
              ),
            }
          : action,
      ),
    );
  };

  // Execute action (Track Event)
  const executeAction = async (action: NVActionProps) => {
    try {
      const payload: Record<string, any> = {};
      action.params?.forEach(param => {
        const validation = validateInput(param);
        if (!validation.valid)
          throw new Error(`${param.name}: ${validation.error}`);
        payload[param.name] = validation.parsedValue;
      });

      if (action.key === 'trackEvent') {
        // SDKManager.event(
        //   payload.eventName,
        //   payload.attributes,
        //   payload.ltv,
        //   payload.scope,
        //   (result: any) => {
        //     setCallbackResult(result);
        //     setBottomSheetVisible(true);
        //   },
        // );
      }
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Analytics Actions</Text>

      {actionsState.map(action => (
        <ActionRow
          key={action.key}
          title={action.title}
          params={action.params}
          actionLabel={action.actionLabel}
          layout={action.layout}
          actionBadgeCount={action.actionBadgeCount}
          onParamChange={updatedParam =>
            handleParamChange(action.key, updatedParam)
          }
          onPress={() => executeAction(action)}
        />
      ))}

      <ResultBottomSheet
        title="Analytics Result"
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        result={callbackResult}
      />
    </ScrollView>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
});
