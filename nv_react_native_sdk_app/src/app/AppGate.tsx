// src/app/AppGate.tsx

import React, { useEffect, useState } from 'react';
import { Alert, AppState } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import RootNavigator from '../navigation/RootNavigator';
import {
  loadQAGate,
  isQAEnabled,
  subscribeQAGate,
  getLastQAExpiryReason,
} from '../config/QAGateConfig';
import { NotificationBadgeProvider } from '../shared/store/NotificationBadgeContext';

const AppGate = () => {
  const [ready, setReady] = useState(false);
  const [showQA, setShowQA] = useState(false);

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    const init = async () => {
      await loadQAGate();
      setShowQA(isQAEnabled());
      setReady(true);
    };

    init();

    const unsub = subscribeQAGate(enabled => {
      setShowQA(enabled);

      if (!enabled && getLastQAExpiryReason() === 'expired') {
        Alert.alert(
          'QA Session Expired',
          'QA mode has expired and you were returned to Client mode.',
        );
      }
    });

    const appStateSub = AppState.addEventListener('change', async state => {
      if (state === 'active') {
        await loadQAGate();
        setShowQA(isQAEnabled());
      }
    });

    return () => {
      unsub();
      appStateSub.remove();
    };
  }, []);

  if (!ready) return null;

  return (
    <NotificationBadgeProvider>
      <RootNavigator showQA={showQA} />
    </NotificationBadgeProvider>
  );
  // return <RootNavigator showQA={showQA} />;
};

export default AppGate;
