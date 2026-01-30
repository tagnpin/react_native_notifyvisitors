// src/shared/components/QAPinModal.tsx

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { theme } from '../styles/theme';

type Props = {
  visible: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  onCancel: () => void;
  onSubmit: (pin: string) => void;
};

const QAPinModal: React.FC<Props> = ({
  visible,
  title,
  description,
  confirmLabel,
  onCancel,
  onSubmit,
}) => {
  const [pin, setPin] = useState('');

  const handleSubmit = () => {
    onSubmit(pin);
    setPin('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.subtitle}>{description}</Text>}
          <TextInput
            value={pin}
            onChangeText={setPin}
            placeholder="Enter QA PIN"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="number-pad"
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.actions}>
            <Pressable onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit}
              style={[styles.confirmButton, !pin && styles.confirmDisabled]}
              disabled={!pin}
            >
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default QAPinModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: theme.colors.backdrop,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },

  card: {
    width: '100%',
    maxWidth: 360, // 👈 looks great on phones + tablets
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
  },

  title: {
    fontSize: theme.text.body.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: theme.text.caption.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.text.body.fontSize,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
  },

  cancelButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },

  cancelText: {
    fontSize: theme.text.body.fontSize,
    color: theme.colors.textSecondary,
  },

  confirmButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
  },

  confirmDisabled: {
    opacity: 0.5,
  },

  confirmText: {
    fontSize: theme.text.body.fontSize,
    fontWeight: '600',
    color: theme.colors.primaryText,
  },
});
