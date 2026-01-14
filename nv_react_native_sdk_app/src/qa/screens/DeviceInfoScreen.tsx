import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import SectionHeader from '../../shared/components/SectionHeader';
import ActionButton from '../../shared/components/ActionButton';
import SDKManager from '../../sdk/SDKManager';
import { DeviceInfo } from '../../sdk/SDKTypes';

const DeviceInfoScreen = () => {
  const [info, setInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    SDKManager.getDeviceInfo().then(setInfo);
  }, []);

  if (!info) {
    return <Text style={{ padding: 16 }}>Loading…</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="App & SDK" />
      <Text>SDK Version: {info.sdkVersion}</Text>
      <Text>App Version: {info.appVersion}</Text>
      <Text>Build Number: {info.buildNumber}</Text>
      <Text>Environment: {info.environment}</Text>

      <SectionHeader title="Device" />
      <Text>Platform: {info.platform}</Text>
      <Text>OS Version: {info.osVersion}</Text>
      <Text selectable>Device ID: {info.deviceId}</Text>

      <SectionHeader title="Push" />
      <Text selectable>Push Token: {info.pushToken ?? 'Not available'}</Text>

      <ActionButton
        title="Refresh"
        onPress={async () => {
          const updated = await SDKManager.getDeviceInfo();
          setInfo(updated);
        }}
      />
    </ScrollView>
  );
};

export default DeviceInfoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
