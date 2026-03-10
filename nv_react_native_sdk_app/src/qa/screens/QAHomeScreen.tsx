// src/qa/screens/QAHomeScreen.tsx
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { QAStackParamList } from '../../navigation/NavigationTypes';
import SectionHeader from '../../shared/components/SectionHeader';

import QAPinModal from '../../shared/components/QAPinModal';
import QAToggleEntry from '../../shared/components/QAToggleEntry';
import { useQAToggle } from '../../shared/hooks/useQAToggle';
import SectionCard from '../../shared/components/SectionCard';
import { theme } from '../../shared/styles/theme';
import { useEffect, useState } from 'react';
import { DeviceInfo } from '../../sdk/SDKTypes';
import ActionButton from '../../shared/components/ActionButton';
import SDKManager from '../../sdk/SDKManager';
import Accordion from '../../shared/components/Accordion/Accordion';
import DeviceInfoCard from '../../shared/components/DeviceInfoCard';
import AnalyticsIcon from '../../shared/components/icons/AnalyticsIcon';
import InAppMessageIcon from '../../shared/components/icons/InAppMessageIcon';
import InAppNudgesIcon from '../../shared/components/icons/InAppNudgesIcon';
import BellIcon from '../../shared/components/icons/BellIcon';
import { useNVGetLinkInfo } from '../../shared/hooks/nvSDKHooks';
import { resolveQALinkPage, toSafeJSON } from '../utils/qaLinkRouting';

type Props = NativeStackScreenProps<QAStackParamList, 'QAHome'>;

const QAHomeScreen: React.FC<Props> = ({ navigation }) => {
  const qa = useQAToggle();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  // const [pushToken, setPushToken] = useState('');
  const [sdkVersion, setSDKVersion] = useState('');
  const nvGetLinkInfoData = useNVGetLinkInfo();

  useEffect(() => {
    SDKManager.getDeviceInfo().then(setDeviceInfo);
  }, []);

  useEffect(() => {
    if (!nvGetLinkInfoData) return;

    const linkPayload = nvGetLinkInfoData.payload;
    console.log(`qaHome: linkPayload = ${JSON.stringify(linkPayload)}`);
    const page = resolveQALinkPage(linkPayload);
    console.log('qaHome: linkPayload page = ', page);
    if (!page) return;

    navigation.navigate('QALinkLanding', {
      page,
      source: 'push_or_deeplink',
      title: page === 'about-us' ? 'About Us' : 'Contact Us',
      linkInfoJSON: toSafeJSON(linkPayload),
    });
  }, [nvGetLinkInfoData?.eventId, navigation]);

  const openQAFeatureActionScreen = (featureKey: string, title: string) => {
    console.log('Navigating to feature:', featureKey);
    navigation.navigate('QAFeatureAction', {
      featureKey,
      title,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>NVECTA (React Native) SDK App</Text>
        <Text style={styles.subtitle}>Reference app for SDK QA testing</Text>
      </View>

      <Accordion
        key="infoAccordion"
        title="App, SDK & Device Info"
        description="Useful for debugging, reporting issues"
      >
        <DeviceInfoCard />
      </Accordion>

      <SectionCard>
        <SectionHeader title="Features" />
        <Accordion
          key="analyticsAccordion"
          title="Analytics"
          description="Events, User Properties"
          icon={<AnalyticsIcon size={22} />}
        >
          <ActionButton
            variant="row"
            title="Track Events"
            onPress={() =>
              openQAFeatureActionScreen('trackEvents', 'Track Events (QA Mode)')
            }
          />
          <ActionButton
            variant="row"
            title="User Properties"
            onPress={() =>
              openQAFeatureActionScreen(
                'userProperties',
                'User Properties (QA Mode)',
              )
            }
          />
        </Accordion>

        <ActionButton
          variant="row"
          title="In-App Messages"
          subtitle="show InApp Popup and surveys"
          icon={<InAppMessageIcon size={22} />}
          onPress={() =>
            openQAFeatureActionScreen(
              'inAppMessages',
              'In-App Messages (QA Mode)',
            )
          }
        />

        <ActionButton
          title="In-App Nudges"
          subtitle="show InApp Nudges"
          variant="row"
          icon={<InAppNudgesIcon size={22} />}
          onPress={() =>
            openQAFeatureActionScreen('inAppNudges', 'In-App Nudges (QA Mode)')
          }
        />

        <Accordion
          key="pushAccordion"
          title="Push Notifications"
          description="Send test Push, Notification Center"
          icon={<BellIcon size={24} />}
        >
          <ActionButton
            variant="row"
            title="Test Push Notifications"
            onPress={() =>
              openQAFeatureActionScreen('push', 'Push Notifications (QA Mode)')
            }
          />
          <ActionButton
            variant="row"
            title="Notification Center Screen"
            onPress={() =>
              openQAFeatureActionScreen(
                'notificationCenter',
                'Notification Center (QA Mode)',
              )
            }
          />
        </Accordion>
      </SectionCard>

      <SectionHeader title="Deep Link Pages" />
      <SectionCard>
        <ActionButton
          title="About Us Page"
          variant="row"
          subtitle="Manual QA route target for deeplinks"
          onPress={() =>
            navigation.navigate('QALinkLanding', {
              page: 'about-us',
              source: 'manual',
              title: 'About Us',
            })
          }
        />
        <ActionButton
          title="Contact Us Page"
          variant="row"
          subtitle="Manual QA route target for deeplinks"
          onPress={() =>
            navigation.navigate('QALinkLanding', {
              page: 'contact-us',
              source: 'manual',
              title: 'Contact Us',
            })
          }
        />
      </SectionCard>

      {/* Debug */}
      {/* <SectionHeader title="Debug & Logs" />
      <SectionCard>
        <ActionButton
          title="Debug Logs"
          variant="row"
          subtitle="View callbacks & events"
          onPress={() => navigation.navigate('DebugLogs')}
        />
      </SectionCard> */}

      {/* Advanced */}
      <SectionHeader title="Advanced" />
      <QAToggleEntry onPress={qa.openModal} />

      <QAPinModal
        visible={qa.modalVisible}
        title="Disable QA Mode"
        description="Enter the QA PIN to turn off QA features."
        confirmLabel="Disable"
        onCancel={qa.closeModal}
        onSubmit={qa.onSubmit}
      />
    </ScrollView>

    // <ScrollView contentContainerStyle={styles.container}>
    //   {/* Feature Testing */}
    //   <SectionHeader title="Feature Testing" />
    //   <SectionCard>
    //     <ActionButton
    //       title="Push Notifications"
    //       onPress={() =>
    //         navigation.navigate('FeatureList', {
    //           featureKey: 'push',
    //           title: 'Push Notifications',
    //         })
    //       }
    //     />
    //     <ActionButton
    //       title="In-App Messages"
    //       onPress={() =>
    //         navigation.navigate('FeatureList', {
    //           featureKey: 'inAppMessages',
    //           title: 'In-App Messages',
    //         })
    //       }
    //     />
    //     <ActionButton
    //       title="In-App Nudges"
    //       onPress={() =>
    //         navigation.navigate('FeatureList', {
    //           featureKey: 'inAppNudges',
    //           title: 'In-App Nudges',
    //         })
    //       }
    //     />
    //     <ActionButton
    //       title="Analytics"
    //       onPress={() =>
    //         navigation.navigate('FeatureList', {
    //           featureKey: 'analytics',
    //           title: 'Analytics',
    //         })
    //       }
    //     />
    //   </SectionCard>

    //   {/* Inputs */}
    //   <SectionHeader title="Inputs & Payloads" />
    //   <SectionCard>
    //     <ActionButton
    //       title="Input Playground"
    //       subtitle="Test primitives, JSON, raw payloads"
    //       onPress={() => navigation.navigate('InputPlayground')}
    //     />
    //   </SectionCard>

    //   {/* Debug */}
    //   <SectionHeader title="Debug & Logs" />
    //   <SectionCard>
    //     <ActionButton
    //       title="Debug Logs"
    //       subtitle="View callbacks & events"
    //       onPress={() => navigation.navigate('DebugLogs')}
    //     />
    //   </SectionCard>

    //   {/* Device Info */}
    //   <SectionHeader title="Device & App" />
    //   <SectionCard>
    //     <ActionButton
    //       title="Device & App Info"
    //       onPress={() => navigation.navigate('DeviceInfo')}
    //     />
    //   </SectionCard>

    //   {/* Utilities */}
    //   <SectionHeader title="Utilities" />
    //   <SectionCard>
    //     <ActionButton
    //       title="QA Utilities"
    //       subtitle="Reset SDK, clear cache, simulate lifecycle"
    //       onPress={() => navigation.navigate('QATools')}
    //     />
    //   </SectionCard>

    //   {/* Advanced */}
    //   <SectionHeader title="Advanced" />
    //   <QAToggleEntry onPress={qa.openModal} />

    //   <QAPinModal
    //     visible={qa.modalVisible}
    //     title="Disable QA Mode"
    //     description="Enter the QA PIN to turn off QA features."
    //     confirmLabel="Disable"
    //     onCancel={qa.closeModal}
    //     onSubmit={qa.onSubmit}
    //   />
    // </ScrollView>
  );
};

export default QAHomeScreen;

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
