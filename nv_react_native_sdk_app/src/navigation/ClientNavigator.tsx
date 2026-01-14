// src/navigation/ClientNavigator.tsx

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ClientStackParamList } from './NavigationTypes';

// Client Screens
import ClientHomeScreen from '../client/screens/ClientHomeScreen';
import FeatureGroupScreen from '../client/screens/FeatureGroupScreen';
import ActionButton from '../shared/components/ActionButton';
import BellIcon from '../shared/components/icons/BellIcon';
import SDKManager from '../sdk/SDKManager';
import { theme } from '../shared/styles/theme';
// import FeatureActionScreen from '../client/screens/FeatureActionScreen';

const Stack = createNativeStackNavigator<ClientStackParamList>();

type Props = {
  nvCenterBadgeFromHomePage?: number;
};

const ClientNavigator = ({ nvCenterBadgeFromHomePage }: Props) => {
  const [nvCenterBadge, setNVCenterBadge] = useState(nvCenterBadgeFromHomePage);

  const nvOpenNotificationCenter = () => {
    SDKManager.showStdNotificationCenter();
    setNVCenterBadge(() => 0);
  };

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const unreadCountData = await SDKManager.getNotificationCenterUnreadCount(
        {},
      );
      let unreadCountJSON = JSON.parse(unreadCountData);
      let allCount: number = unreadCountJSON.totalCount;
      setNVCenterBadge(() => allCount);
    };
    fetchUnreadCount();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="ClientHome"
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          //011926, 012433, 005D99, 50A8F9
        },
        headerTintColor: theme.colors.primaryText,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <React.Fragment>
            <ActionButton
              key={'bellIcon'}
              icon={<BellIcon size={24} color={theme.colors.primaryText} />}
              iconPosition="right"
              badgeCount={nvCenterBadge}
              layout="iconOnly"
              onPress={() => nvOpenNotificationCenter()}
            />
            {/* <Pressable onPress={onBtnPress}>
                  <BadgedIcon
                    name="notifications-sharp"
                    type="ionicon"
                    color="white"
                    containerStyle={styles.padRight}
                  />
                </Pressable> */}
          </React.Fragment>
        ),
      }}
    >
      <Stack.Screen
        name="ClientHome"
        component={ClientHomeScreen}
        options={{
          title: 'Notifyvisitors (React Native)',
        }}
      />

      <Stack.Screen
        name="FeatureGroup"
        component={FeatureGroupScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Feature',
        })}
      />

      {/* <Stack.Screen
        name="FeatureAction"
        component={FeatureActionScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Action',
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default ClientNavigator;
