import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (pin: string) => void;
};

const QAPinModal: React.FC<Props> = ({ visible, onCancel, onSubmit }) => {
  const [pin, setPin] = useState('');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Enable QA Mode</Text>

          <TextInput
            value={pin}
            onChangeText={setPin}
            placeholder="Enter QA PIN"
            keyboardType="number-pad"
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.actions}>
            <Pressable onPress={onCancel}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onSubmit(pin);
                setPin('');
              }}
            >
              <Text style={styles.confirm}>Enable</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QAPinModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    color: '#999',
  },
  confirm: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
