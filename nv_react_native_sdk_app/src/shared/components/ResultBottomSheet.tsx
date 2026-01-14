// src/shared/components/ResultBottomSheet.tsx

import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { theme } from '../styles/theme';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

type Props = {
  visible: boolean;
  title: string;
  result: any;
  onClose: () => void;
};

const ResultBottomSheet: React.FC<Props> = ({
  visible,
  title,
  result,
  onClose,
}) => {
  const copy = useCopyToClipboard();
  const formatted = JSON.stringify(result, null, 2);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>

          <ScrollView style={styles.content}>
            <Text style={styles.json}>{formatted}</Text>
          </ScrollView>

          <View style={styles.actions}>
            <Pressable onPress={() => copy(formatted)}>
              <Text style={styles.action}>Copy</Text>
            </Pressable>

            <Pressable onPress={onClose}>
              <Text style={[styles.action, styles.close]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResultBottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    maxHeight: '75%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  content: {
    marginBottom: theme.spacing.md,
  },
  json: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: theme.colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  close: {
    color: theme.colors.textSecondary,
  },
});
