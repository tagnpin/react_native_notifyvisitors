import { StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import SectionCard from './SectionCard';
import TextRow from './TextRow';
import { theme } from '../styles/theme';
import { DeviceInfo } from '../../sdk/SDKTypes';
import SDKManager from '../../sdk/SDKManager';
import { getNVBrandID } from '../native/NVSDKConfig';

const DeviceInfoCard = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [nvBrandID, setNVBrandID] = useState('');

  useEffect(() => {
    getNVBrandID().then(setNVBrandID);
    SDKManager.getDeviceInfo().then(setDeviceInfo);
  }, []);

  return (
    <SectionCard>
      <Text style={styles.statusValue}>App Info</Text>
      <TextRow label="App Version:" value={deviceInfo?.appVersion} />
      <TextRow label="Build Number:" value={deviceInfo?.buildNumber} />
      <TextRow label="Environment:" value={deviceInfo?.environment} />
      <Text style={styles.statusValue}>SDK Info</Text>
      <TextRow label="NVECTA RN SDK Version:" value={deviceInfo?.sdkVersion} />
      <TextRow label="BrandID:" value={nvBrandID} />
      <Text style={styles.statusValue}>Device</Text>
      <TextRow label="Platform:" value={deviceInfo?.platform} />
      <TextRow label="OS Version:" value={deviceInfo?.osVersion} />
      <TextRow label="Device ID:" value={deviceInfo?.deviceId} copyable />
      <Text style={styles.statusValue}>Push</Text>
      <TextRow
        label="Push Token:"
        value={deviceInfo?.pushToken}
        copyable
        multiline
      />
    </SectionCard>
  );
};

export default DeviceInfoCard;

const styles = StyleSheet.create({
  statusValue: {
    marginTop: theme.spacing.xs,
    fontSize: theme.text.body.fontSize,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
});
