// src/navigation/QANavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QAStackParamList } from './NavigationTypes';
import { theme } from '../shared/styles/theme';

// QA Screens
import QAHomeScreen from '../qa/screens/QAHomeScreen';

import InputPlaygroundScreen from '../qa/screens/InputPlaygroundScreen';
// Debug Screens
import DebugLogListScreen from '../debug/screens/DebugLogListScreen';
import DebugLogDetailScreen from '../debug/screens/DebugLogDetailScreen';
import QAFeatureActionScreen from '../qa/screens/QAFeatureActionScreen';
import QALinkLandingScreen from '../qa/screens/QALinkLandingScreen';
import NavIconBellButton from '../shared/components/NavIconBellButton';

const Stack = createNativeStackNavigator<QAStackParamList>();

const renderHeaderRight = () => <NavIconBellButton />;

const QANavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="QAHome"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.primaryText,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: renderHeaderRight,
      }}
    >
      <Stack.Screen
        name="QAHome"
        component={QAHomeScreen}
        options={{
          title: 'NVECTA (RN) — QA Tools',
        }}
      />

      <Stack.Screen
        name="QAFeatureAction"
        component={QAFeatureActionScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'QA Action',
        })}
      />

      <Stack.Screen
        name="InputPlayground"
        component={InputPlaygroundScreen}
        options={{
          title: 'Input Playground',
        }}
      />

      <Stack.Screen
        name="DebugLogs"
        component={DebugLogListScreen}
        options={{
          title: 'Debug Logs',
        }}
      />

      <Stack.Screen
        name="DebugLogDetail"
        component={DebugLogDetailScreen}
        options={{
          title: 'Log Detail',
        }}
      />

      <Stack.Screen
        name="QALinkLanding"
        component={QALinkLandingScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Landing Page',
        })}
      />
    </Stack.Navigator>
  );
};

export default QANavigator;
