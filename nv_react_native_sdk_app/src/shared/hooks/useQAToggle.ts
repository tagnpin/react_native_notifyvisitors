import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

import {
  isQAEnabled,
  enableQA,
  disableQA,
  QA_PIN,
} from '../../config/QAGateConfig';

export const useQAToggle = () => {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const onSubmit = useCallback(async (pin: string) => {
    if (pin !== QA_PIN) {
      Alert.alert('Invalid PIN', 'QA access denied');
      return;
    }

    if (isQAEnabled()) {
      await disableQA();
      Alert.alert('QA Disabled', 'Returned to Client mode.');
    } else {
      await enableQA();
      Alert.alert('QA Enabled', 'QA mode is now active.');
    }

    close();
  }, []);

  return {
    modalVisible: visible,
    openModal: open,
    closeModal: close,
    onSubmit,
  };
};
