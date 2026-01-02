import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import SectionHeader from '../../shared/components/SectionHeader';
import ActionButton from '../../shared/components/ActionButton';

const QAToolsScreen = () => {
  return (
    <View style={styles.container}>
      <SectionHeader title="QA Utilities" />

      <ActionButton
        title="Reset SDK (Placeholder)"
        onPress={() => Alert.alert('Not implemented yet')}
      />

      <ActionButton
        title="Clear Local Cache (Placeholder)"
        onPress={() => Alert.alert('Not implemented yet')}
      />
    </View>
  );
};

export default QAToolsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
