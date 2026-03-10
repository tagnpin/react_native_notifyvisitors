// src/navigation/QANavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QAStackParamList } from './NavigationTypes';

// QA Screens
import QAHomeScreen from '../qa/screens/QAHomeScreen';

import InputPlaygroundScreen from '../qa/screens/InputPlaygroundScreen';
import DeviceInfoScreen from '../qa/screens/DeviceInfoScreen';
import QAToolsScreen from '../qa/screens/QAToolsScreen';

// Debug Screens
import DebugLogListScreen from '../debug/screens/DebugLogListScreen';
import DebugLogDetailScreen from '../debug/screens/DebugLogDetailScreen';
import QAFeatureActionScreen from '../qa/screens/QAFeatureActionScreen';
import QALinkLandingScreen from '../qa/screens/QALinkLandingScreen';

const Stack = createNativeStackNavigator<QAStackParamList>();

const QANavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="QAHome"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="QAHome"
        component={QAHomeScreen}
        options={{
          title: 'QA Tools',
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
        name="DeviceInfo"
        component={DeviceInfoScreen}
        options={{
          title: 'Device & App Info',
        }}
      />

      <Stack.Screen
        name="QATools"
        component={QAToolsScreen}
        options={{
          title: 'QA Utilities',
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
