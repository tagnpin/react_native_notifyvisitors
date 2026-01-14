// src/shared/components/SetupUserDetailsAccordion.tsx
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
import SDKManager from '../../../sdk/SDKManager';
import DebugLogger from '../../../debug/DebugLogger';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import Accordion from '../Accordion';
import ResultBottomSheet from '../ResultBottomSheet';

type CallbackResponse = Record<string, any> | null;

type Props = {
  accordionId?: string; // ✅ renamed
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
};

const SetupUserDetailsAccordion: React.FC<Props> = ({
  accordionId,
  title = '',
  subtitle,
  icon,
  defaultExpanded = false,
}) => {
  const [userParamsJSON, setUserParamsJSON] = useState('{}');

  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [resultTitle, setResultTitle] = useState('SDK Result');

  const [callbackResponse, setCallbackResponse] =
    useState<CallbackResponse>(null);
  const copyToClipboard = useCopyToClipboard();

  const userParams = useMemo(() => {
    try {
      return JSON.parse(userParamsJSON);
    } catch (e) {
      return null;
    }
  }, [userParamsJSON]);

  const executeSetupUserDetails = async () => {
    if (userParams && typeof userParams !== 'object') {
      Alert.alert('userParams must be a JSON object');
      // throw new Error('attributes must be a JSON object');
      return;
    }

    try {
      SDKManager.setUserDetails(userParams);
      setUserParamsJSON('{}');
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
      key={accordionId}
      subtitle={subtitle}
      icon={icon}
      defaultExpanded={defaultExpanded}
    >
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{ paddingVertical: 8 }}
        nestedScrollEnabled
      >
        <Text style={styles.label}>User Params (JSON)</Text>
        <TextInput
          style={[styles.input, { minHeight: 100 }]}
          multiline
          placeholder='{"key":"value"}'
          value={userParamsJSON}
          onChangeText={setUserParamsJSON}
        />

        <Pressable
          style={styles.executeButton}
          onPress={executeSetupUserDetails}
        >
          <Text style={styles.executeButtonText}>
            Execute Setup User Details
          </Text>
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
};

export default SetupUserDetailsAccordion;

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
