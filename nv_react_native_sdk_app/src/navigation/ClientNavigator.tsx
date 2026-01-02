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
    var tabCountInfo = {
      label_one: 'tg1',
      name_one: 'Promotional',
      label_two: 'tg2',
      name_two: 'Transactional',
      label_three: 'others',
      name_three: 'Others',
    };
    // Notifyvisitors.getNotificationCenterCount(
    //   tabCountInfo,
    //   function (callback: any) {
    //     let callbackData = JSON.parse(callback);
    //     console.log(callbackData);
    //     let allCount: number = callbackData.totalCount;
    //     setNVCenterBadge(() => allCount);
    //   },
    // );
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="ClientHome"
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#005D99',
          //011926, 012433, 005D99, 50A8F9
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <React.Fragment>
            <ActionButton
              key={'bellIcon'}
              icon={<BellIcon size={24} color="#ffffff" />}
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
