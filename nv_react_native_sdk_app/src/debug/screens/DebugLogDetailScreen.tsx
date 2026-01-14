// src/debug/screens/DebugLogDetailScreen.tsx

import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

import DebugLogsStore from '../DebugLogsStore';

const DebugLogDetailScreen = ({ route }: any) => {
  const { eventId } = route.params;
  const event = DebugLogsStore.getAll().find(e => e.id === eventId);

  if (!event) {
    return <Text>Event not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Source</Text>
      <Text>{event.source}</Text>

      <Text style={styles.label}>Type</Text>
      <Text>{event.type}</Text>

      <Text style={styles.label}>Payload</Text>
      <Text style={styles.payload}>
        {JSON.stringify(event.payload, null, 2)}
      </Text>
    </ScrollView>
  );
};

export default DebugLogDetailScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 12, fontWeight: '600' },
  payload: { fontFamily: 'monospace', fontSize: 12 },
});
