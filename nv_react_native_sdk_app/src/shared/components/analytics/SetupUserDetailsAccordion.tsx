// src/shared/components/SetupUserDetailsAccordion.tsx
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Alert,
} from 'react-native';

import Accordion from '../Accordion/Accordion';
import ResultBottomSheet from '../ResultBottomSheet';
import SDKManager from '../../../sdk/SDKManager';
import { theme } from '../../styles/theme';

type Props = {
  accordionId?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
};

const SetupUserDetailsAccordion: React.FC<Props> = ({
  accordionId = '',
  title = '',
  subtitle,
  icon,
  defaultExpanded = false,
}) => {
  const [userParamsJSON, setUserParamsJSON] = useState('');

  const [result, setResult] = useState<any>(null);
  const [resultTitle, setResultTitle] = useState('');
  const [visible, setVisible] = useState(false);

  /* ---------------- Helpers ---------------- */

  // const openResultSheet = (title: string, data: any) => {
  //   setResultTitle(title);
  //   setResult(data);
  //   setVisible(true);
  // };

  const parsedUserParams = useMemo(() => {
    try {
      return JSON.parse(userParamsJSON);
    } catch {
      return null;
    }
  }, [userParamsJSON]);

  /* ---------------- Action ---------------- */

  const executeSetupUserDetails = async () => {
    if (parsedUserParams && typeof parsedUserParams !== 'object') {
      Alert.alert('Validation Error', 'user parameters must be valid JSON');
      return;
    }

    try {
      const payload = parsedUserParams;
      // const res = await SDKManager.trackEvent(payload);
      const res = await SDKManager.setUserDetails(payload);
      setResult(res);
      setVisible(true);
      // reset form
      setUserParamsJSON('');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  // const executeSetupUserDetails = () => {
  //   if (
  //     !parsedUserParams ||
  //     typeof parsedUserParams !== 'object' ||
  //     Array.isArray(parsedUserParams)
  //   ) {
  //     openResultSheet('Invalid Input', {
  //       status: 'failed',
  //       reason: 'User params must be a valid JSON object',
  //       input: userParamsJSON,
  //     });
  //     return;
  //   }

  //   try {
  //     SDKManager.setUserDetails(parsedUserParams);

  //     openResultSheet('Set Custom User-Details Result:', {
  //       status: 'success',
  //       action: 'setUserDetails',
  //       payload: parsedUserParams,
  //       timestamp: new Date().toISOString(),
  //     });

  //     setUserParamsJSON('');
  //   } catch (e: any) {
  //     openResultSheet('Set Custom User-Details Result:', {
  //       status: 'failed',
  //       error: e?.message ?? 'Unknown error',
  //       payload: parsedUserParams,
  //     });
  //   }
  // };

  /* ---------------- UI ---------------- */

  return (
    <Accordion
      key={accordionId}
      title={title}
      description={subtitle}
      icon={icon}
      defaultExpanded={defaultExpanded}
    >
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        nestedScrollEnabled
      >
        {/* Attributes */}
        <CustomField label="Attributes (JSON)">
          <TextInput
            style={[styles.input, styles.jsonInput]}
            multiline
            placeholder='{"name":"John","email":"john@example.com", "mobile": "9889XXXXXX"}'
            placeholderTextColor={theme.colors.textSecondary}
            value={userParamsJSON}
            onChangeText={setUserParamsJSON}
          />
        </CustomField>

        {/* CTA */}
        <Pressable style={styles.button} onPress={executeSetupUserDetails}>
          <Text style={styles.buttonText}>Track Event</Text>
        </Pressable>

        <ResultBottomSheet
          visible={visible}
          title={resultTitle}
          result={result}
          onClose={() => setVisible(false)}
        />
      </ScrollView>
    </Accordion>
  );
  // return (
  //   <Accordion
  //     key={accordionId}
  //     title={title}
  //     description={subtitle}
  //     icon={icon}
  //     defaultExpanded={defaultExpanded}
  //   >
  //     <ScrollView
  //       style={styles.container}
  //       contentContainerStyle={styles.content}
  //       nestedScrollEnabled
  //     >
  //       <Text style={styles.label}>User Params (JSON)</Text>

  //       <TextInput
  //         style={styles.input}
  //         multiline
  //         value={userParamsJSON}
  //         placeholder='{"id":"123","email":"john@example.com"}'
  //         onChangeText={setUserParamsJSON}
  //         textAlignVertical="top"
  //         onBlur={() => {
  //           try {
  //             setUserParamsJSON(
  //               JSON.stringify(JSON.parse(userParamsJSON), null, 2),
  //             );
  //           } catch {
  //             // ignore formatting errors
  //           }
  //         }}
  //       />

  //       <Pressable
  //         style={styles.primaryButton}
  //         onPress={executeSetupUserDetails}
  //       >
  //         <Text style={styles.primaryButtonText}>
  //           Execute Setup User Details
  //         </Text>
  //       </Pressable>

  //       <ResultBottomSheet
  //         visible={visible}
  //         title={resultTitle}
  //         result={result}
  //         onClose={() => setVisible(false)}
  //       />
  //     </ScrollView>
  //   </Accordion>
  // );
};

export default SetupUserDetailsAccordion;

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.background,
  },

  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },

  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  half: {
    flex: 1,
  },

  label: {
    marginBottom: theme.spacing.xs,
    fontSize: theme.text.caption.fontSize,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.text.body.fontSize,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surface,
  },

  jsonInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },

  button: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },

  buttonText: {
    color: theme.colors.primaryText,
    fontWeight: '600',
    fontSize: theme.text.body.fontSize,
  },
});

const CustomField: React.FC<{
  label: string;
  children: React.ReactNode;
  style?: any;
}> = ({ label, children, style }) => (
  <View style={[{ marginBottom: theme.spacing.md }, style]}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

// // src/shared/components/SetupUserDetailsAccordion.tsx
// import React, { useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Pressable,
//   Alert,
// } from 'react-native';
// import SDKManager from '../../../sdk/SDKManager';
// import DebugLogger from '../../../debug/DebugLogger';
// import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
// import Accordion from '../Accordion/Accordion';
// import ResultBottomSheet from '../ResultBottomSheet';

// type CallbackResponse = Record<string, any> | null;

// type Props = {
//   accordionId?: string; // ✅ renamed
//   title?: string;
//   subtitle?: string;
//   icon?: React.ReactNode;
//   defaultExpanded?: boolean;
// };

// const SetupUserDetailsAccordion: React.FC<Props> = ({
//   accordionId,
//   title = '',
//   subtitle,
//   icon,
//   defaultExpanded = false,
// }) => {
//   const [userParamsJSON, setUserParamsJSON] = useState('{}');

//   const [result, setResult] = useState<any>(null);
//   const [visible, setVisible] = useState(false);
//   const [resultTitle, setResultTitle] = useState('SDK Result');

//   const [callbackResponse, setCallbackResponse] =
//     useState<CallbackResponse>(null);
//   const copyToClipboard = useCopyToClipboard();

//   const userParams = useMemo(() => {
//     try {
//       return JSON.parse(userParamsJSON);
//     } catch (e) {
//       return null;
//     }
//   }, [userParamsJSON]);

//   const executeSetupUserDetails = async () => {
//     if (userParams && typeof userParams !== 'object') {
//       Alert.alert('userParams must be a JSON object');
//       // throw new Error('attributes must be a JSON object');
//       return;
//     }

//     try {
//       SDKManager.setUserDetails(userParams);
//       setUserParamsJSON('{}');
//       // SDKManager.event(eventName, attributes, ltv, scope, (result: any) => {
//       //   setCallbackResponse(result);
//       //   DebugLogger.log('sdk_callback', 'Track Event Callback', result, true);
//       //   // logDebug({
//       //   //   type: 'TRACK_EVENT',
//       //   //   input: { eventName, attributes, ltv, scope },
//       //   //   output: result,
//       //   // });
//       // });
//     } catch (e: any) {
//       Alert.alert('Error', e.message);
//     }
//   };

//   return (
//     <Accordion
//       title={title}
//       key={accordionId}
//       subtitle={subtitle}
//       icon={icon}
//       defaultExpanded={defaultExpanded}
//     >
//       <ScrollView
//         style={styles.contentContainer}
//         contentContainerStyle={{ paddingVertical: 8 }}
//         nestedScrollEnabled
//       >
//         <Text style={styles.label}>User Params (JSON)</Text>
//         <TextInput
//           style={[styles.input, { minHeight: 100 }]}
//           multiline
//           placeholder='{"key":"value"}'
//           value={userParamsJSON}
//           onChangeText={setUserParamsJSON}
//         />

//         <Pressable
//           style={styles.executeButton}
//           onPress={executeSetupUserDetails}
//         >
//           <Text style={styles.executeButtonText}>
//             Execute Setup User Details
//           </Text>
//         </Pressable>
//         {/* ✅ ResultBottomSheet only opens when needed */}
//         <ResultBottomSheet
//           visible={visible}
//           title={resultTitle}
//           result={result}
//           onClose={() => setVisible(false)}
//         />

//         {/* {callbackResponse && (
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
//         )} */}
//       </ScrollView>
//     </Accordion>
//   );
// };

// export default SetupUserDetailsAccordion;

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 12,
//     backgroundColor: '#f0f0f0',
//     borderTopLeftRadius: 6,
//     borderTopRightRadius: 6,
//   },
//   headerText: { fontWeight: '600', fontSize: 16 },
//   collapseIndicator: { fontWeight: '600', fontSize: 16 },
//   contentContainer: { paddingHorizontal: 12 },
//   label: { marginTop: 12, marginBottom: 4, fontWeight: '500' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     padding: 8,
//     textAlignVertical: 'top',
//   },
//   executeButton: {
//     backgroundColor: '#0066cc',
//     paddingVertical: 12,
//     borderRadius: 6,
//     marginTop: 16,
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   executeButtonText: { color: '#fff', fontWeight: '600' },
//   callbackContainer: {
//     marginTop: 12,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 6,
//     backgroundColor: '#fafafa',
//   },
//   callbackTitle: { fontWeight: '600', marginBottom: 4 },
//   callbackText: { fontFamily: 'monospace', fontSize: 12, color: '#333' },
//   copyHint: { fontSize: 10, color: '#888', marginTop: 2 },
// });
