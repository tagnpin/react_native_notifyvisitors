// src/debug/screens/DebugLogListScreen.tsx

import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Pressable } from 'react-native';

import DebugLogsStore from '../DebugLogsStore';
import { DebugLogsTypes, DebugLogType } from '../DebugLogsTypes';
import DebugLogsRow from '../components/DebugLogsRow';
import ActionButton from '../../shared/components/ActionButton';
import DebugFilterBar from '../components/DebugFilterBar';

// import { exportDebugLogs } from '../utils/DebugLogExporter';
import { useCopyToClipboard } from '../../shared/hooks/useCopyToClipboard';

import { Alert } from 'react-native';

// const DebugLogListScreen = ({ navigation }: any) => {
//   const [events, setEvents] = useState<DebugLogType[]>([]);

//   useEffect(() => {
//     setEvents(DebugLogsStore.getAll());
//     return DebugLogsStore.subscribe(setEvents);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ActionButton title="Clear Logs" onPress={() => DebugLogsStore.clear()} />

//       <FlatList
//         data={events}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <DebugLogsRow
//             event={item}
//             onPress={() =>
//               navigation.navigate('DebugLogDetail', {
//                 eventId: item.id,
//               })
//             }
//           />
//         )}
//         ListEmptyComponent={<Text style={styles.empty}>No debug events</Text>}
//       />
//     </View>
//   );
// };

// export default DebugLogListScreen;

const DebugLogListScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState<DebugLogType[]>([]);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<DebugLogsTypes | undefined>();
  const [successFilter, setSuccessFilter] = useState<boolean | undefined>();

  const copy = useCopyToClipboard();

  useEffect(() => {
    setEvents(DebugLogsStore.getAll());
    return DebugLogsStore.subscribe(setEvents);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (search && !e.source.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (typeFilter && e.type !== typeFilter) {
        return false;
      }

      if (successFilter !== undefined && e.success !== successFilter) {
        return false;
      }

      return true;
    });
  }, [events, search, typeFilter, successFilter]);

  return (
    <View style={styles.container}>
      <DebugFilterBar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        successFilter={successFilter}
        onSuccessChange={setSuccessFilter}
      />

      <ActionButton title="Clear Logs" onPress={() => DebugLogsStore.clear()} />
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <>
            <DebugLogsRow
              event={item}
              onPress={() =>
                navigation.navigate('DebugLogDetail', {
                  eventId: item.id,
                })
              }
            />
            <Pressable onPress={() => copy(JSON.stringify(item, null, 2))}>
              <Text style={styles.copyButton}>Copy</Text>
            </Pressable>
          </>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No matching logs</Text>}
      />
    </View>
  );
};

export default DebugLogListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
  copyButton: {
    marginTop: 4,
    color: '#0066cc',
    fontSize: 12,
  },
});
