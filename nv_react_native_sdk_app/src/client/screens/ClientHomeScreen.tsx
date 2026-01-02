// src/client/screens/ClientHomeScreen.tsx

import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ClientStackParamList } from '../../navigation/NavigationTypes';
import SectionHeader from '../../shared/components/SectionHeader';
import ActionButton from '../../shared/components/ActionButton';
import ClientSectionCard from '../components/ClientSectionCard';

import QAPinModal from '../../shared/components/QAPinModal';

import { useQAToggle } from '../../shared/hooks/useQAToggle';
import QAToggleEntry from '../../shared/components/QAToggleEntry';
import Accordion from '../../shared/components/Accordion';
import {
  AnalyticsIcon,
  BellIcon,
  InAppMessageIcon,
  InAppNudgesIcon,
} from '../../shared/components/icons/myIcons';

type Props = NativeStackScreenProps<ClientStackParamList, 'ClientHome'>;

const ClientHomeScreen: React.FC<Props> = ({ navigation }) => {
  const qa = useQAToggle();

  const openFeatureGroup = (featureKey: string, title: string) => {
    navigation.navigate('FeatureGroup', {
      featureKey,
      title,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Client Home Screen</Text>
        <Text style={styles.subtitle}>
          Reference implementation for SDK integration
        </Text>
      </View>

      {/* SDK Status */}
      <ClientSectionCard>
        <Text style={styles.statusLabel}>SDK Status</Text>
        <Text style={styles.statusValue}>Initialized</Text>
      </ClientSectionCard>

      {/* Features */}
      <SectionHeader title="Features" />

      <ClientSectionCard>
        <Accordion
          title="Push Notifications"
          subtitle="Permission, tokens, delivery"
          icon={<BellIcon size={22} />}
        >
          <ActionButton
            variant="row"
            title="Test Push Notifications"
            onPress={() => openFeatureGroup('push', 'Push Notifications')}
          />
          <ActionButton
            variant="row"
            title="Notification Center Screen"
            onPress={() =>
              openFeatureGroup('notificationCenter', 'Notification Center')
            }
          />
        </Accordion>

        <ActionButton
          variant="row"
          title="In-App Messages"
          icon={<InAppMessageIcon size={22} />}
          onPress={() => openFeatureGroup('inAppMessages', 'In-App Messages')}
        />

        <ActionButton
          title="In-App Nudges"
          variant="row"
          icon={<InAppNudgesIcon size={22} />}
          onPress={() => openFeatureGroup('inAppNudges', 'In-App Nudges')}
        />

        <Accordion
          title="Analytics"
          subtitle="Events, User Properties"
          icon={<AnalyticsIcon size={22} />}
        >
          <ActionButton
            variant="row"
            title="Track Events"
            onPress={() => openFeatureGroup('trackEvents', 'Track Events')}
          />
          <ActionButton
            variant="row"
            title="User Properties"
            onPress={() =>
              openFeatureGroup('userProperties', 'User Properties')
            }
          />
        </Accordion>
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

export default ClientHomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 4,
    color: '#666',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
  },
  statusValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '500',
  },
});
