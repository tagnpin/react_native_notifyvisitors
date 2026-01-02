import React from 'react';
import { ScrollView } from 'react-native';
import TrackEventAccordion from '../components/analytics/TrackEventAccordion';

const AnalyticsQAScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <TrackEventAccordion />
    </ScrollView>
  );
};

export default AnalyticsQAScreen;
