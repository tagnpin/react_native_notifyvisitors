// src/debug/components/DebugLogsRow.tsx

import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { DebugLogType } from '../DebugLogsTypes';

type Props = {
  event: DebugLogType;
  onPress: () => void;
};

const DebugLogsRow: React.FC<Props> = ({ event, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.title}>{event.source}</Text>
      <Text style={styles.meta}>
        {new Date(event.timestamp).toLocaleTimeString()}
      </Text>
    </Pressable>
  );
};

export default DebugLogsRow;

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: { fontWeight: '500' },
  meta: { fontSize: 12, color: '#777' },
});
