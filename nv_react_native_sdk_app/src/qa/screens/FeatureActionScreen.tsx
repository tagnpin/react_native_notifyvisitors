// src/qa/screens/FeatureActionScreen.tsx

import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { QAStackParamList } from '../../navigation/NavigationTypes';
import SectionHeader from '../../shared/components/SectionHeader';
import ActionButton from '../../shared/components/ActionButton';
import ClientSectionCard from '../../client/components/ClientSectionCard';
import TrackEventAccordion from '../../shared/components/analytics/TrackEventAccordion';

type Props = NativeStackScreenProps<QAStackParamList, 'FeatureList'>;

const FeatureActionScreen: React.FC<Props> = ({ route, navigation }) => {
  const { featureKey } = route.params;

  const actions = useMemo(() => {
    switch (featureKey) {
      case 'push':
        return [
          { key: 'requestPermission', title: 'Request Push Permission' },
          { key: 'getToken', title: 'Get Push Token' },
          { key: 'subscribe', title: 'Subscribe to Push' },
          { key: 'unsubscribe', title: 'Unsubscribe from Push' },
        ];

      case 'inAppMessages':
        return [
          { key: 'showMessage', title: 'Show In-App Message' },
          { key: 'dismissMessage', title: 'Dismiss In-App Message' },
        ];

      case 'inAppNudges':
        return [
          { key: 'showNudge', title: 'Show Nudge' },
          { key: 'hideNudge', title: 'Hide Nudge' },
        ];

      case 'analytics':
        return [
          { key: 'trackEvent', title: 'Track Event' },
          //{ key: 'setUserProperty', title: 'Set User Property' },
        ];

      default:
        return [];
    }
  }, [featureKey]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="Available Actions" />

      <ClientSectionCard>
        {actions.map(
          action => action.key === 'trackEvent' && <TrackEventAccordion />,

          // <ActionButton
          //   key={action.key}
          //   title={action.title}
          //   onPress={() =>
          //     navigation.navigate('ActionDetail', {
          //       featureKey,
          //       actionKey: action.key,
          //       title: action.title,
          //     })
          //   }
          // />
        )}

        {actions.length === 0 && (
          <Text style={styles.empty}>
            No QA actions available for this feature.
          </Text>
        )}
      </ClientSectionCard>
    </ScrollView>
  );
};

export default FeatureActionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  empty: {
    marginTop: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
