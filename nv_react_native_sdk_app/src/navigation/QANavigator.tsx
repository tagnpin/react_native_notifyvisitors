// src/navigation/QANavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QAStackParamList } from './NavigationTypes';

// QA Screens
import QAHomeScreen from '../qa/screens/QAHomeScreen';
import FeatureActionScreen from '../qa/screens/FeatureActionScreen';
import ActionDetailScreen from '../qa/screens/ActionDetailScreen';
import InputPlaygroundScreen from '../qa/screens/InputPlaygroundScreen';
import DeviceInfoScreen from '../qa/screens/DeviceInfoScreen';
import QAToolsScreen from '../qa/screens/QAToolsScreen';

// Debug Screens
import DebugLogListScreen from '../debug/screens/DebugLogListScreen';
import DebugLogDetailScreen from '../debug/screens/DebugLogDetailScreen';

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
        name="FeatureList"
        component={FeatureActionScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Feature',
        })}
      />

      <Stack.Screen
        name="ActionDetail"
        component={ActionDetailScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Action',
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
    </Stack.Navigator>
  );
};

export default QANavigator;
