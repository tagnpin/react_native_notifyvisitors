// src/shared/hooks/useCopyToClipboard.ts
import { useCallback } from 'react';
import { ToastAndroid, Platform, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

export const useCopyToClipboard = () => {
  const copy = useCallback((text: string) => {
    if (Platform.OS === 'android') {
      Clipboard.setString(text);
      ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    } else {
      // iOS fallback
      Clipboard.setString(text);
      Alert.alert('Copied', 'Copied to clipboard');
    }
  }, []);

  return copy;
};
