// src/navigation/RootNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './NavigationTypes';

import ClientNavigator from './ClientNavigator';
import QANavigator from './QANavigator';

type RootNavigatorProps = {
  /**
   * Whether QA flow should be shown.
   * Decision is made outside (AppGate).
   */
  showQA: boolean;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC<RootNavigatorProps> = ({ showQA }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {showQA ? (
        <Stack.Screen name="QA" component={QANavigator} />
      ) : (
        <Stack.Screen name="Client" component={ClientNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
