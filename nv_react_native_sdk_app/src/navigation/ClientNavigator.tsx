// src/navigation/ClientNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ClientStackParamList } from './NavigationTypes';

// Client Screens
import ClientHomeScreen from '../client/screens/ClientHomeScreen';
import { theme } from '../shared/styles/theme';
import ClientFeatureActionScreen from '../client/screens/ClientFeatureActionScreen';
import ClientLinkLandingScreen from '../client/screens/ClientLinkLandingScreen';
import NavIconBellButton from '../shared/components/NavIconBellButton';

const Stack = createNativeStackNavigator<ClientStackParamList>();

const renderHeaderRight = () => <NavIconBellButton />;

const ClientNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientHome"
      screenOptions={{
        // headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: false,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          //011926, 012433, 005D99, 50A8F9
        },
        headerTintColor: theme.colors.primaryText,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: renderHeaderRight,
      }}
    >
      <Stack.Screen
        name="ClientHome"
        component={ClientHomeScreen}
        options={{
          title: 'NVECTA (React Native)',
        }}
      />

      {/* ClientFeatureAction */}
      <Stack.Screen
        name="ClientFeatureAction"
        component={ClientFeatureActionScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Action',
        })}
      />

      <Stack.Screen
        name="ClientLinkLanding"
        component={ClientLinkLandingScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Landing Page',
        })}
      />
    </Stack.Navigator>
  );
};

export default ClientNavigator;
