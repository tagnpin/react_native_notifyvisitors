// src/qa/inputs/PayloadPreview.tsx

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useCopyToClipboard } from '../../shared/hooks/useCopyToClipboard';

type Props = {
  payload: any;
};

const PayloadPreview: React.FC<Props> = ({ payload }) => {
  const copy = useCopyToClipboard();
  const payloadString = JSON.stringify(payload, null, 2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payload Preview</Text>
      <Pressable onPress={() => copy(payloadString)}>
        <Text style={styles.payload}>{payloadString}</Text>
      </Pressable>
      <Text style={styles.hint}>(Tap payload to copy)</Text>
    </View>
  );
};

export default PayloadPreview;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  payload: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },
  hint: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
  },
});
