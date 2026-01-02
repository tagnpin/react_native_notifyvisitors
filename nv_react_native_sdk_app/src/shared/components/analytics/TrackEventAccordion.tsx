// src/shared/components/TrackEventAccordion.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
// import Accordion from 'react-native-collapsible/Accordion'; // or your preferred accordion lib
import SDKManager from '../../../sdk/SDKManager';
import DebugLogger from '../../../debug/DebugLogger';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import Accordion from '../Accordion';
import BellIcon from '../icons/BellIcon';
import ResultBottomSheet from '../ResultBottomSheet';

type CallbackResponse = Record<string, any> | null;

type Props = {
  key: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
};

const TrackEventAccordion: React.FC<Props> = ({
  key,
  title = '',
  subtitle,
  icon,
  defaultExpanded = false,
}) => {
  const [eventName, setEventName] = useState('');
  const [attributesJSON, setAttributesJSON] = useState('{}');
  const [ltv, setLTV] = useState('7');
  const [scope, setScope] = useState('2');

  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [resultTitle, setResultTitle] = useState('SDK Result');

  const attributes = useMemo(() => {
    try {
      return JSON.parse(attributesJSON);
    } catch (e) {
      return null;
    }
  }, [attributesJSON]);

  const executeTrackEvent = async () => {
    // if (!eventName) {
    //   Alert.alert('Validation', 'Event name cannot be empty');
    //   return;
    // }
    // if (!attributes) {
    //   Alert.alert('Validation', 'Attributes JSON is invalid');
    //   return;
    // }

    // eventName (required)
    if (typeof eventName !== 'string' || !eventName.trim()) {
      Alert.alert('eventName is required and must be a non-empty string');
      // throw new Error('eventName is required and must be a non-empty string');
      return;
    }

    if (attributes && typeof attributes !== 'object') {
      Alert.alert('attributes must be a JSON object');
      // throw new Error('attributes must be a JSON object');
      return;
    }

    if (typeof scope !== 'string' || isNaN(Number(scope))) {
      Alert.alert('scope value must be a numeric string');
      // throw new Error('scope value must be a numeric string');
      return;
    }

    try {
      const payload = {
        eventName: eventName,
        attributes: attributes ?? {},
        ltv: ltv ?? '',
        scope: scope,
      };

      Alert.alert(`payload = ${JSON.stringify(payload)}`);

      SDKManager.trackEvent(payload);
      setEventName('');
      setAttributesJSON('{}');
      setLTV('');
      setScope('');
      // SDKManager.event(eventName, attributes, ltv, scope, (result: any) => {
      //   setCallbackResponse(result);
      //   DebugLogger.log('sdk_callback', 'Track Event Callback', result, true);
      //   // logDebug({
      //   //   type: 'TRACK_EVENT',
      //   //   input: { eventName, attributes, ltv, scope },
      //   //   output: result,
      //   // });
      // });
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <Accordion
      title={title}
      key={key}
      subtitle={subtitle}
      icon={icon}
      defaultExpanded={defaultExpanded}
    >
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{ paddingVertical: 8 }}
        nestedScrollEnabled
      >
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event name"
          value={eventName}
          onChangeText={setEventName}
        />

        <Text style={styles.label}>Attributes (JSON)</Text>
        <TextInput
          style={[styles.input, { minHeight: 100 }]}
          multiline
          placeholder='{"key":"value"}'
          value={attributesJSON}
          onChangeText={setAttributesJSON}
        />

        <Text style={styles.label}>LTV</Text>
        <TextInput
          style={styles.input}
          placeholder="7"
          value={ltv}
          onChangeText={setLTV}
        />

        <Text style={styles.label}>Scope</Text>
        <TextInput
          style={styles.input}
          placeholder="2"
          value={scope}
          onChangeText={setScope}
        />

        <Pressable style={styles.executeButton} onPress={executeTrackEvent}>
          <Text style={styles.executeButtonText}>Execute Track Event</Text>
        </Pressable>

        {/* ✅ ResultBottomSheet only opens when needed */}
        <ResultBottomSheet
          visible={visible}
          title={resultTitle}
          result={result}
          onClose={() => setVisible(false)}
        />

        {/* {callbackResponse && (
          <View style={styles.callbackContainer}>
            <Text style={styles.callbackTitle}>Callback Response</Text>
            <Pressable
              onPress={() =>
                copyToClipboard(JSON.stringify(callbackResponse, null, 2))
              }
            >
              <Text style={styles.callbackText}>
                {JSON.stringify(callbackResponse, null, 2)}
              </Text>
              <Text style={styles.copyHint}>(Tap to copy)</Text>
            </Pressable>
          </View>
        )} */}
      </ScrollView>
    </Accordion>
  );
  // return (
  //   <View style={styles.container}>
  //     <Pressable
  //       onPress={() => setIsCollapsed(prev => !prev)}
  //       style={styles.header}
  //     >
  //       <Text style={styles.headerText}>Track Event</Text>
  //       <Text style={styles.collapseIndicator}>{isCollapsed ? '+' : '-'}</Text>
  //     </Pressable>

  //     {!isCollapsed && (
  //       <ScrollView
  //         style={styles.contentContainer}
  //         contentContainerStyle={{ paddingVertical: 8 }}
  //         nestedScrollEnabled
  //       >
  //         <Text style={styles.label}>Event Name</Text>
  //         <TextInput
  //           style={styles.input}
  //           placeholder="Enter event name"
  //           value={eventName}
  //           onChangeText={setEventName}
  //         />

  //         <Text style={styles.label}>Attributes (JSON)</Text>
  //         <TextInput
  //           style={[styles.input, { minHeight: 100 }]}
  //           multiline
  //           placeholder='{"key":"value"}'
  //           value={attributesJSON}
  //           onChangeText={setAttributesJSON}
  //         />

  //         <Text style={styles.label}>LTV</Text>
  //         <TextInput
  //           style={styles.input}
  //           placeholder="7"
  //           value={ltv}
  //           onChangeText={setLTV}
  //         />

  //         <Text style={styles.label}>Scope</Text>
  //         <TextInput
  //           style={styles.input}
  //           placeholder="2"
  //           value={scope}
  //           onChangeText={setScope}
  //         />

  //         <Pressable style={styles.executeButton} onPress={executeTrackEvent}>
  //           <Text style={styles.executeButtonText}>Execute Track Event</Text>
  //         </Pressable>

  //         {callbackResponse && (
  //           <View style={styles.callbackContainer}>
  //             <Text style={styles.callbackTitle}>Callback Response</Text>
  //             <Pressable
  //               onPress={() =>
  //                 copyToClipboard(JSON.stringify(callbackResponse, null, 2))
  //               }
  //             >
  //               <Text style={styles.callbackText}>
  //                 {JSON.stringify(callbackResponse, null, 2)}
  //               </Text>
  //               <Text style={styles.copyHint}>(Tap to copy)</Text>
  //             </Pressable>
  //           </View>
  //         )}
  //       </ScrollView>
  //     )}
  //   </View>
  // );
};

export default TrackEventAccordion;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  headerText: { fontWeight: '600', fontSize: 16 },
  collapseIndicator: { fontWeight: '600', fontSize: 16 },
  contentContainer: { paddingHorizontal: 12 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    textAlignVertical: 'top',
  },
  executeButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  executeButtonText: { color: '#fff', fontWeight: '600' },
  callbackContainer: {
    marginTop: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fafafa',
  },
  callbackTitle: { fontWeight: '600', marginBottom: 4 },
  callbackText: { fontFamily: 'monospace', fontSize: 12, color: '#333' },
  copyHint: { fontSize: 10, color: '#888', marginTop: 2 },
});
