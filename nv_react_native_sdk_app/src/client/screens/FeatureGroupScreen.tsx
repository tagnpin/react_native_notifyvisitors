// src/client/screens/FeatureGroupScreen.tsx

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ClientStackParamList } from '../../navigation/NavigationTypes';
import SectionHeader from '../../shared/components/SectionHeader';
import ClientSectionCard from '../components/ClientSectionCard';

import {
  sendPushActions,
  notificationCenterActions,
  inAppMessageActions,
  inAppNudgesActions,
  trackEventActions,
  userPropertyActions,
} from '../features/allFeatureActions';

import ActionRow from '../../shared/components/ActionRow';
import ResultBottomSheet from '../../shared/components/ResultBottomSheet';
import { filterActionsByPlatform } from '../../shared/utils/platformActionFilter';
import TrackEventAccordion from '../../shared/components/analytics/TrackEventAccordion';
import SetupUserDetailsAccordion from '../../shared/components/analytics/SetupUserDetailsAccordion';
import { theme } from '../../shared/styles/theme';
import { FeatureActionProps } from '../../shared/types/actions';
import { normalizeParams } from '../../shared/utils/normalizeParams';
import { buildPayloadFromSchema } from '../../shared/utils/buildPayload';
import { NotifyvisitorsNativeDisplay } from '../../../..';

type Props = NativeStackScreenProps<ClientStackParamList, 'FeatureGroup'>;

const FeatureGroupScreen: React.FC<Props> = ({ route }) => {
  const { featureKey } = route.params;

  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [resultTitle, setResultTitle] = useState('SDK Result');
  const [featureDescription, setFeatureDescription] = useState('');

  const actions = useMemo<FeatureActionProps[]>(() => {
    switch (featureKey) {
      case 'push':
        return filterActionsByPlatform(sendPushActions);
      case 'notificationCenter':
        return filterActionsByPlatform(notificationCenterActions);
      case 'inAppMessages':
        return filterActionsByPlatform(inAppMessageActions);
      case 'inAppNudges':
        return filterActionsByPlatform(inAppNudgesActions);
      case 'trackEvents':
        return filterActionsByPlatform(trackEventActions);
      case 'userProperties':
        return filterActionsByPlatform(userPropertyActions);
      default:
        return [];
    }
  }, [featureKey]);

  useEffect(() => {
    let featureDescText = '';

    switch (featureKey) {
      case 'push':
        featureDescText =
          'Build personalized user experiences across all mobile touchpoints - on and above your app';
        break;
      case 'notificationCenter':
        featureDescText =
          'Show a screen with the list of all push (excluding test push) sent to users';
        break;
      case 'inAppMessages':
        featureDescText =
          'Show real-time onsite notifications based on customer behaviour.';
        break;
      case 'inAppNudges':
        featureDescText =
          'Deliver personalized messages using in-app notifications and nudges.';
        break;
      case 'trackEvents':
        featureDescText =
          'Evaluate user actions, intentions, and behavior across channels.';
        break;
      case 'userProperties':
        featureDescText =
          'Create a unified user profile using custom user properties.';
        break;
      default:
        featureDescText = 'Example SDK calls for this feature.';
    }

    setFeatureDescription(featureDescText);
  }, [featureKey]);

  const executeAction = async <T,>(action: FeatureActionProps<T>) => {
    try {
      const schema = normalizeParams(action.params);
      const payload = buildPayloadFromSchema(schema) as T;

      const response = await action.execute?.(payload);

      if (action.showResult && response !== undefined) {
        setResult(response);
        setResultTitle(action.resultTitle ?? 'SDK Result');
        setVisible(true);
      }
    } catch (e: any) {
      setResult({ status: 'failed', message: e.message });
      setVisible(true);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{featureDescription}</Text>
        </View>

        <SectionHeader title="Actions" />

        <ClientSectionCard>
          {actions.map(action => {
            // ✅ Track Custom Events
            if (action.key === 'trackCustomEvents') {
              return (
                <React.Fragment key={action.key}>
                  <SectionHeader title="Advanced" />
                  <TrackEventAccordion
                    accordionId={'client_track_custom_event'}
                    title={action.title}
                    subtitle={action.description}
                    defaultExpanded={action.accordionDefaultExpanded}
                  />
                </React.Fragment>
              );
            }

            // ✅ Track Custom User Properties
            if (action.key === 'trackCustomUser') {
              return (
                <React.Fragment key={action.key}>
                  <SectionHeader title="Advanced" />
                  <SetupUserDetailsAccordion
                    accordionId={'client_create_custom_user'}
                    title={action.title}
                    subtitle={action.description}
                    defaultExpanded={action.accordionDefaultExpanded}
                  />
                </React.Fragment>
              );
            }

            // ✅ Native Display
            if (action.key === 'nativeDisplay') {
              return (
                <React.Fragment key={action.key}>
                  <SectionHeader
                    title={action.actionLabel || 'Native Display'}
                  />
                  <View style={styles.nativeDisplayContainer}>
                    <NotifyvisitorsNativeDisplay
                      propertyName="offers"
                      style={styles.nativeView}
                      onNudgeUiFinalized={(data: any) => {
                        try {
                          const parsedData = JSON.parse(data.response?.data);
                          console.log('Native Display Size:', parsedData?.size);
                        } catch (e) {
                          console.log('Native Display parse error', e);
                        }
                      }}
                    />
                  </View>
                </React.Fragment>
              );
            }

            // ✅ Default Action Row
            return (
              <ActionRow
                key={action.key}
                title={action.title}
                description={action.description}
                actionLabel={action.actionLabel}
                actionBadgeCount={action.actionBadgeCount}
                layout={action.layout}
                onPress={() => executeAction(action)}
              />
            );
          })}

          {actions.length === 0 && (
            <Text style={styles.emptyText}>
              No actions available for this feature.
            </Text>
          )}
        </ClientSectionCard>
      </ScrollView>

      <ResultBottomSheet
        visible={visible}
        title={resultTitle}
        result={result}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default FeatureGroupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  description: {
    marginBottom: 16,
  },
  descriptionText: {
    color: '#666',
    fontSize: 14,
  },
  emptyText: {
    marginTop: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  nativeDisplayContainer: {
    padding: 16,
    backgroundColor: theme.colors.background,
    minHeight: 220,
  },
  nativeView: {
    width: '100%',
    flex: 1,
  },
});

// import React, { useEffect, useMemo, useState } from 'react';
// import { ScrollView, View, StyleSheet, Text } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';

// import { ClientStackParamList } from '../../navigation/NavigationTypes';
// import SectionHeader from '../../shared/components/SectionHeader';
// import ClientSectionCard from '../components/ClientSectionCard';

// import {
//   sendPushActions,
//   notificationCenterActions,
//   inAppMessageActions,
//   inAppNudgesActions,
//   trackEventActions,
//   userPropertyActions,
// } from '../features/allFeatureActions';

// import ActionRow from '../../shared/components/ActionRow';
// import ResultBottomSheet from '../../shared/components/ResultBottomSheet';
// import { filterActionsByPlatform } from '../../shared/utils/platformActionFilter';
// import TrackEventAccordion from '../../shared/components/analytics/TrackEventAccordion';
// import SetupUserDetailsAccordion from '../../shared/components/analytics/SetupUserDetailsAccordion';
// import { theme } from '../../shared/styles/theme';
// import { FeatureActionProps } from '../../shared/types/actions';
// // import { ParamSchema } from '../../shared/types/params';
// // import { parseParam } from '../../shared/utils/parseParam';
// // import { resolveParams } from '../../shared/utils/resolveParams';
// import { normalizeParams } from '../../shared/utils/normalizeParams';
// import { buildPayloadFromSchema } from '../../shared/utils/buildPayload';
// import { NotifyvisitorsNativeDisplay } from '../../../..';

// type Props = NativeStackScreenProps<ClientStackParamList, 'FeatureGroup'>;

// const FeatureGroupScreen: React.FC<Props> = ({ route }) => {
//   const { featureKey } = route.params;

//   const [result, setResult] = useState<any>(null);
//   const [visible, setVisible] = useState(false);
//   const [resultTitle, setResultTitle] = useState('SDK Result');

//   const [featureDescription, setFeatureDescription] = useState('');

//   const actions = useMemo<FeatureActionProps[]>(() => {
//     switch (featureKey) {
//       case 'push':
//         return filterActionsByPlatform(sendPushActions);
//       case 'notificationCenter':
//         return filterActionsByPlatform(notificationCenterActions);
//       case 'inAppMessages':
//         return filterActionsByPlatform(inAppMessageActions);
//       case 'inAppNudges':
//         return filterActionsByPlatform(inAppNudgesActions);
//       case 'trackEvents':
//         return filterActionsByPlatform(trackEventActions);
//       case 'userProperties':
//         return filterActionsByPlatform(userPropertyActions);
//       default:
//         return [];
//     }
//   }, [featureKey]);

//   useEffect(() => {
//     let featureDescText = '';
//     console.log(`featureKey = ${featureKey}`);

//     switch (featureKey) {
//       case 'push':
//         featureDescText = `Build personalized user experiences across all mobile touchpoints - on and above your app`;
//         break;
//       case 'notificationCenter':
//         featureDescText =
//           'show a screen with the list all push (excluding test push) sent to the users';
//         break;
//       case 'inAppMessages':
//         featureDescText =
//           'Show real time onsite notifications based on customer behaviour. NotifyVisitors provide multiple templates to choose from.';
//         break;
//       case 'inAppNudges':
//         featureDescText = `Deliver personalized messages at the right moment using in-app notifications and nudges. Enhance your user experience with real- time, context-driven interactions.`;
//         break;
//       case 'trackEvents':
//         featureDescText = `Evaluate the actions performed by users, their intentions and behavior across all the marketing mediums and channels.`;
//         break;
//       case 'userProperties':
//         featureDescText = `Create a unique user profile by having a deeper understanding of a unique user based on the different user properties. Collect and integrate the user properties across various devices and channels to create a panoramic profile of individual users.`;
//         break;
//       default:
//         featureDescText = 'Example SDK calls for this feature.';
//         break;
//     }
//     setFeatureDescription(featureDescText);
//   }, [featureKey]);

//   const executeAction = async <T,>(action: FeatureActionProps<T>) => {
//     try {
//       const schema = normalizeParams(action.params);
//       const payload = buildPayloadFromSchema(schema) as T;

//       const response = await action.execute?.(payload);

//       if (action.showResult && response !== undefined) {
//         setResult(response);
//         setResultTitle(action.resultTitle ?? 'SDK Result');
//         setVisible(true);
//       }
//     } catch (e: any) {
//       setResult({ status: 'failed', message: e.message });
//       setVisible(true);
//     }
//   };

//   return (
//     <>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.description}>
//           <Text style={styles.descriptionText}>{featureDescription}</Text>
//         </View>

//         <SectionHeader title="Actions" />

//         <ClientSectionCard>
//           {actions.map(action =>
//             action.key === 'trackCustomEvents' ? (
//               <>
//                 {/* Advanced */}
//                 <SectionHeader title="Advanced" />
//                 <TrackEventAccordion
//                   key={action.key}
//                   title={action.title}
//                   subtitle={action.description}
//                   defaultExpanded={action.accordionDefaultExpanded}
//                 />
//               </>
//             ) : action.key === 'trackCustomUser' ? (
//               <>
//                 {/* Advanced */}
//                 <SectionHeader title="Advanced" />

//                 <SetupUserDetailsAccordion
//                   key={action.key}
//                   title={action.title}
//                   subtitle={action.description}
//                   defaultExpanded={action.accordionDefaultExpanded}
//                 />
//               </>
//             ) : action.key === 'nativeDisplay' ? (
//               <>
//                 <SectionHeader
//                   title={action.actionLabel || 'Native Display'}
//                   key={action.key}
//                 />
//                 <View style={styles.nativeDisplayContainer}>
//                   <NotifyvisitorsNativeDisplay
//                     propertyName="offers"
//                     style={styles.nativeView}
//                     onNudgeUiFinalized={(data: any) => {
//                       try {
//                         const payload = data.response;
//                         console.log('onNudgeUiFinalized payload:', payload);
//                         const parsedData = JSON.parse(payload.data);
//                         const height = parseInt(
//                           parsedData?.size?.height ?? '0',
//                           10,
//                         );
//                         const width = parseInt(
//                           parsedData?.size?.width ?? '0',
//                           10,
//                         );
//                         console.log(
//                           'onNudgeUiFinalized ====>>>> Height:',
//                           height,
//                           'Width:',
//                           width,
//                         );
//                       } catch (e) {
//                         console.log('onNudgeUiFinalized Parse error:', e);
//                       }
//                     }}
//                   />
//                 </View>
//               </>
//             ) : (
//               <ActionRow
//                 key={action.key}
//                 title={action.title}
//                 description={action.description}
//                 actionLabel={action.actionLabel}
//                 actionBadgeCount={action.actionBadgeCount}
//                 layout={action.layout}
//                 onPress={() => executeAction(action)}
//               />
//             ),
//           )}

//           {actions.length === 0 && (
//             <Text style={styles.emptyText}>
//               No actions available for this feature.
//             </Text>
//           )}
//         </ClientSectionCard>
//       </ScrollView>

//       {/* ✅ ResultBottomSheet only opens when needed */}
//       <ResultBottomSheet
//         visible={visible}
//         title={resultTitle}
//         result={result}
//         onClose={() => setVisible(false)}
//       />
//     </>
//   );
// };

// export default FeatureGroupScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   description: {
//     marginBottom: 16,
//   },
//   descriptionText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   emptyText: {
//     marginTop: 12,
//     color: '#999',
//     fontStyle: 'italic',
//   },
//   nativeDisplayContainer: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: theme.colors.background,
//     minHeight: 220,
//     maxHeight: Infinity,
//     maxWidth: Infinity,
//   },
//   nativeView: {
//     flex: 1,
//     width: '100%',
//   },
// });
