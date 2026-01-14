import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { DebugLogsTypes } from '../DebugLogsTypes';

type Props = {
  search: string;
  onSearchChange: (v: string) => void;

  typeFilter?: DebugLogsTypes;
  onTypeChange: (t?: DebugLogsTypes) => void;

  successFilter?: boolean;
  onSuccessChange: (v?: boolean) => void;
};

const EVENT_TYPES: DebugLogsTypes[] = [
  'sdk_callback',
  'analytics',
  'push',
  'observer',
  'lifecycle',
  'error',
];

const DebugFilterBar: React.FC<Props> = ({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  successFilter,
  onSuccessChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder="Search by source"
        style={styles.search}
      />

      <View style={styles.row}>
        {EVENT_TYPES.map(type => (
          <Pressable
            key={type}
            style={[styles.chip, typeFilter === type && styles.activeChip]}
            onPress={() => onTypeChange(typeFilter === type ? undefined : type)}
          >
            <Text style={styles.chipText}>{type}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.row}>
        <Pressable
          style={[styles.chip, successFilter === true && styles.activeChip]}
          onPress={() =>
            onSuccessChange(successFilter === true ? undefined : true)
          }
        >
          <Text style={styles.chipText}>Success</Text>
        </Pressable>

        <Pressable
          style={[styles.chip, successFilter === false && styles.activeChip]}
          onPress={() =>
            onSuccessChange(successFilter === false ? undefined : false)
          }
        >
          <Text style={styles.chipText}>Error</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DebugFilterBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 6,
    marginBottom: 6,
  },
  activeChip: {
    backgroundColor: '#007AFF22',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 12,
  },
});
