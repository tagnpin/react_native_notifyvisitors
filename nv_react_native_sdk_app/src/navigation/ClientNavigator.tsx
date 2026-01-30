// src/navigation/ClientNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ClientStackParamList } from './NavigationTypes';

// Client Screens
import ClientHomeScreen from '../client/screens/ClientHomeScreen';
import ActionButton from '../shared/components/ActionButton';
import BellIcon from '../shared/components/icons/BellIcon';
import SDKManager from '../sdk/SDKManager';
import { theme } from '../shared/styles/theme';
import ClientFeatureActionScreen from '../client/screens/ClientFeatureActionScreen';
import { useNotificationBadge } from '../shared/store/NotificationBadgeContext';

const Stack = createNativeStackNavigator<ClientStackParamList>();

// type Props = {
//   nvCenterBadgeFromHomePage?: number;
// };

const ClientNavigator = () => {
  // const [nvCenterBadge, setNVCenterBadge] = useState(nvCenterBadgeFromHomePage);
  const { unreadCount, clearUnreadCount } = useNotificationBadge();

  const nvOpenNotificationCenter = () => {
    SDKManager.showStdNotificationCenter({});
    clearUnreadCount();
    // setNVCenterBadge(() => 0);
  };

  // useEffect(() => {
  //   const fetchUnreadCount = async () => {
  //     const unreadCountData = await SDKManager.getNotificationCenterUnreadCount(
  //       {},
  //     );
  //     let unreadCountJSON = JSON.parse(unreadCountData as string);
  //     let allCount: number = unreadCountJSON.totalCount;
  //     setNVCenterBadge(() => allCount);
  //   };
  //   fetchUnreadCount();
  // }, []);

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
        headerRight: () => (
          <React.Fragment>
            <ActionButton
              key={'bellIcon'}
              icon={() => (
                <BellIcon size={24} color={theme.colors.primaryText} />
              )}
              iconPosition="right"
              badgeCount={unreadCount}
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
    </Stack.Navigator>
  );
};

export default ClientNavigator;
