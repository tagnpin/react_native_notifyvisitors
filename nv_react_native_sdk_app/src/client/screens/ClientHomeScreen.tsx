// src/client/screens/ClientHomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ClientStackParamList } from '../../navigation/NavigationTypes';
import { theme } from '../../shared/styles/theme';
import SectionHeader from '../../shared/components/SectionHeader';
import ActionButton from '../../shared/components/ActionButton';
import ClientSectionCard from '../components/ClientSectionCard';

import QAPinModal from '../../shared/components/QAPinModal';

import { useQAToggle } from '../../shared/hooks/useQAToggle';
import QAToggleEntry from '../../shared/components/QAToggleEntry';
import Accordion from '../../shared/components/Accordion/Accordion';
import {
  AnalyticsIcon,
  BellIcon,
  InAppMessageIcon,
  InAppNudgesIcon,
} from '../../shared/components/icons/myIcons';
import { DeviceInfo } from '../../sdk/SDKTypes';
// import Notifyvisitors from '../../../..';
import { version as nvPluginVersion } from '../../../../package.json';
import TextRow from '../../shared/components/TextRow';
import SDKManager from '../../sdk/SDKManager';

type Props = NativeStackScreenProps<ClientStackParamList, 'ClientHome'>;

const ClientHomeScreen: React.FC<Props> = ({ navigation }) => {
  const qa = useQAToggle();

  const openFeatureAction = (featureKey: string, title: string) => {
    console.log('Navigating to feature:', featureKey);
    navigation.navigate('ClientFeatureAction', {
      featureKey,
      title,
    });
  };

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  // const [pushToken, setPushToken] = useState('');
  const [sdkVersion, setSDKVersion] = useState('');

  useEffect(() => {
    SDKManager.getDeviceInfo().then(setDeviceInfo);
    let finalnvVerssion = nvPluginVersion.toString() ?? '';
    setSDKVersion(finalnvVerssion);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>NVECTA (React Native) SDK App</Text>
        <Text style={styles.subtitle}>
          Reference app for SDK integration & testing
        </Text>
      </View>

      {/* SDK Status */}
      <ClientSectionCard>
        <Text style={styles.statusValue}>SDK Info</Text>

        <TextRow label="Status:" value="Initialized" />
        <TextRow label="SDK Version:" value={sdkVersion} />
        <TextRow
          label="App Version:"
          value={`${deviceInfo?.appVersion} (${deviceInfo?.buildNumber})`}
        />
        <TextRow
          label="Device ID:"
          value={deviceInfo?.deviceId ?? ''}
          copyable
        />
        <TextRow
          label="Push Token:"
          value={deviceInfo?.pushToken ?? 'Registering device…'}
          copyable
        />
      </ClientSectionCard>

      {/* Features */}
      <SectionHeader title="Features" />

      <ClientSectionCard>
        <Accordion
          key="pushAccordion"
          title="Push Notifications"
          description="Send test Push, Notification Center"
          icon={<BellIcon size={24} />}
        >
          <ActionButton
            variant="row"
            title="Test Push Notifications"
            onPress={() => openFeatureAction('push', 'Push Notifications')}
          />
          <ActionButton
            variant="row"
            title="Notification Center Screen"
            onPress={() =>
              openFeatureAction('notificationCenter', 'Notification Center')
            }
          />
        </Accordion>

        <ActionButton
          variant="row"
          title="In-App Messages"
          subtitle="show InApp Popup and surveys"
          icon={<InAppMessageIcon size={22} />}
          onPress={() => openFeatureAction('inAppMessages', 'In-App Messages')}
        />

        <ActionButton
          title="In-App Nudges"
          subtitle="show InApp Nudges"
          variant="row"
          icon={<InAppNudgesIcon size={22} />}
          onPress={() => openFeatureAction('inAppNudges', 'In-App Nudges')}
        />

        <Accordion
          key="analyticsAccordion"
          title="Analytics"
          description="Events, User Properties"
          icon={<AnalyticsIcon size={22} />}
        >
          <ActionButton
            variant="row"
            title="Track Events"
            onPress={() => openFeatureAction('trackEvents', 'Track Events')}
          />
          <ActionButton
            variant="row"
            title="User Properties"
            onPress={() =>
              openFeatureAction('userProperties', 'User Properties')
            }
          />
        </Accordion>
      </ClientSectionCard>

      {/* Advanced */}
      <SectionHeader title="Advanced" />
      <QAToggleEntry onPress={qa.openModal} />

      <QAPinModal
        visible={qa.modalVisible}
        title="Enable QA Mode"
        description="Enter the QA PIN to unlock testing features."
        confirmLabel="Enable"
        onCancel={qa.closeModal}
        onSubmit={qa.onSubmit}
      />
    </ScrollView>
  );
};

export default ClientHomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    flexGrow: 1,
  },

  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.text.title,
    fontSize: 20, // slightly safer base
    color: theme.colors.textPrimary,
    flexWrap: 'wrap',
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
    flexWrap: 'wrap',
  },

  statusLabel: {
    fontSize: theme.text.body.fontSize,
    color: theme.colors.textSecondary,
  },
  statusValue: {
    marginTop: theme.spacing.xs,
    fontSize: theme.text.body.fontSize,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
});
