// src/qa/screens/ActionDetailScreen.tsx

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { QAStackParamList } from '../../navigation/NavigationTypes';
import SectionHeader from '../../shared/components/SectionHeader';
import ActionButton from '../../shared/components/ActionButton';
import ClientSectionCard from '../../client/components/ClientSectionCard';
import SDKManager from '../../sdk/SDKManager';

type Props = NativeStackScreenProps<QAStackParamList, 'ActionDetail'>;

const ActionDetailScreen: React.FC<Props> = ({ route }) => {
  const { featureKey, actionKey } = route.params;
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    setLoading(true);

    try {
      let result: any = null;

      // NOTE:
      // Inputs will be injected later via InputPlayground
      if (featureKey === 'push' && actionKey === 'getToken') {
        result = await SDKManager.getPushToken();
      }

      if (featureKey === 'analytics' && actionKey === 'trackEvent') {
        result = await SDKManager.trackEvent('qa_test_event', {
          from: 'qa_screen',
        });
      }

      Alert.alert(
        'Execution Result',
        result ? JSON.stringify(result) : 'Success',
      );
    } catch (e: any) {
      Alert.alert('Execution Error', e?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [featureKey, actionKey]);

  return (
    <View style={styles.container}>
      <SectionHeader title="Action Details" />

      <ClientSectionCard>
        <Text style={styles.meta}>Feature: {featureKey}</Text>
        <Text style={styles.meta}>Action: {actionKey}</Text>

        <ActionButton
          title="Execute Action"
          loading={loading}
          onPress={execute}
        />
      </ClientSectionCard>
    </View>
  );
};

export default ActionDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  meta: {
    marginBottom: 6,
    color: '#555',
    fontSize: 14,
  },
});
