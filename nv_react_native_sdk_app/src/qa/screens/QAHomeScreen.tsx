// src/qa/screens/QAHomeScreen.tsx

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { QAStackParamList } from '../../navigation/NavigationTypes';
import SectionHeader from '../../shared/components/SectionHeader';
import ActionButton from '../../shared/components/ActionButton';
import ClientSectionCard from '../../client/components/ClientSectionCard';

import QAPinModal from '../../shared/components/QAPinModal';
import QAToggleEntry from '../../shared/components/QAToggleEntry';
import { useQAToggle } from '../../shared/hooks/useQAToggle';

type Props = NativeStackScreenProps<QAStackParamList, 'QAHome'>;

const QAHomeScreen: React.FC<Props> = ({ navigation }) => {
  const qa = useQAToggle();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Feature Testing */}
      <SectionHeader title="Feature Testing" />
      <ClientSectionCard>
        <ActionButton
          title="Push Notifications"
          onPress={() =>
            navigation.navigate('FeatureList', {
              featureKey: 'push',
              title: 'Push Notifications',
            })
          }
        />
        <ActionButton
          title="In-App Messages"
          onPress={() =>
            navigation.navigate('FeatureList', {
              featureKey: 'inAppMessages',
              title: 'In-App Messages',
            })
          }
        />
        <ActionButton
          title="In-App Nudges"
          onPress={() =>
            navigation.navigate('FeatureList', {
              featureKey: 'inAppNudges',
              title: 'In-App Nudges',
            })
          }
        />
        <ActionButton
          title="Analytics"
          onPress={() =>
            navigation.navigate('FeatureList', {
              featureKey: 'analytics',
              title: 'Analytics',
            })
          }
        />
      </ClientSectionCard>

      {/* Inputs */}
      <SectionHeader title="Inputs & Payloads" />
      <ClientSectionCard>
        <ActionButton
          title="Input Playground"
          subtitle="Test primitives, JSON, raw payloads"
          onPress={() => navigation.navigate('InputPlayground')}
        />
      </ClientSectionCard>

      {/* Debug */}
      <SectionHeader title="Debug & Logs" />
      <ClientSectionCard>
        <ActionButton
          title="Debug Logs"
          subtitle="View callbacks & events"
          onPress={() => navigation.navigate('DebugLogs')}
        />
      </ClientSectionCard>

      {/* Device Info */}
      <SectionHeader title="Device & App" />
      <ClientSectionCard>
        <ActionButton
          title="Device & App Info"
          onPress={() => navigation.navigate('DeviceInfo')}
        />
      </ClientSectionCard>

      {/* Utilities */}
      <SectionHeader title="Utilities" />
      <ClientSectionCard>
        <ActionButton
          title="QA Utilities"
          subtitle="Reset SDK, clear cache, simulate lifecycle"
          onPress={() => navigation.navigate('QATools')}
        />
      </ClientSectionCard>

      {/* Advanced */}
      <SectionHeader title="Advanced" />
      <QAToggleEntry onPress={qa.openModal} />

      <QAPinModal
        visible={qa.modalVisible}
        onCancel={qa.closeModal}
        onSubmit={qa.onSubmit}
      />
    </ScrollView>
  );
};

export default QAHomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
