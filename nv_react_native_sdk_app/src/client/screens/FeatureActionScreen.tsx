// src/client/screens/FeatureActionScreen.tsx

import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ClientStackParamList } from '../../navigation/NavigationTypes';
import SectionHeader from '../../shared/components/SectionHeader';
import ActionButton from '../../shared/components/ActionButton';
import ClientSectionCard from '../components/ClientSectionCard';
import SDKManager from '../../sdk/SDKManager';

type Props = NativeStackScreenProps<ClientStackParamList, 'FeatureAction'>;

/**
 * Client-facing action example screen.
 * Demonstrates ONE clean SDK call.
 */
const FeatureActionScreen: React.FC<Props> = ({ route }) => {
  const { featureKey, actionKey } = route.params;
  const [loading, setLoading] = useState(false);

  const executeAction = useCallback(async () => {
    setLoading(true);

    try {
      let result: any = null;

      /**
       * IMPORTANT:
       * Keep these examples SIMPLE.
       * No complex params, no QA edge cases.
       */
      if (featureKey === 'push' && actionKey === 'requestPermission') {
        result = await SDKManager.requestPushPermission();
      }

      if (featureKey === 'push' && actionKey === 'getPushToken') {
        result = await SDKManager.getPushToken();
      }

      if (featureKey === 'inAppMessages' && actionKey === 'showInApp') {
        result = await SDKManager.showInAppMessage();
      }

      if (featureKey === 'inAppNudges' && actionKey === 'showNudge') {
        result = await SDKManager.showNudge();
      }

      if (featureKey === 'analytics' && actionKey === 'trackEvent') {
        result = await SDKManager.trackEvent('sample_event', {
          source: 'client_sample',
        });
      }

      Alert.alert('Success', result ? JSON.stringify(result) : 'Done');
    } catch (error: any) {
      Alert.alert('Error', error?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [featureKey, actionKey]);

  return (
    <View style={styles.container}>
      <SectionHeader title="Example" />

      <ClientSectionCard>
        <Text style={styles.description}>
          This example demonstrates how to call the SDK method for this action.
        </Text>

        <ActionButton
          title="Execute Action"
          loading={loading}
          onPress={executeAction}
        />
      </ClientSectionCard>
    </View>
  );
};

export default FeatureActionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  description: {
    marginBottom: 12,
    color: '#666',
    fontSize: 14,
  },
});
