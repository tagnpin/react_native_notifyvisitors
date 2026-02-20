// src/shared/components/ResultBottomSheet.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { theme } from '../styles/theme';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { normalizeJSON } from '../utils/normalizeJSON';

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
  const { height } = useWindowDimensions();
  const copy = useCopyToClipboard();
  // const formatted = JSON.stringify(result, null, 2);
  const [copied, setCopied] = useState(false);
  const normalizedResult = normalizeJSON(result);
  const formattedJSON =
    typeof normalizedResult === 'string'
      ? normalizedResult
      : JSON.stringify(normalizedResult, null, 2);

  const maxHeight = Math.min(height * 0.85, 640);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { maxHeight }]}>
          <View style={styles.handle} />

          <Text style={styles.title}>{title}</Text>

          {/* CONTENT — FIXED */}
          <View style={styles.content}>
            <ScrollView
              showsVerticalScrollIndicator
              contentContainerStyle={styles.verticalContent}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator>
                <Text selectable style={styles.json}>
                  {formattedJSON}
                </Text>
              </ScrollView>
            </ScrollView>
          </View>

          {/* ACTIONS */}
          <View style={styles.actions}>
            <Pressable onPress={onClose}>
              <Text style={styles.secondaryAction}>Close</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                copy(formattedJSON);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              <Text style={styles.primaryAction}>
                {copied ? 'Copied ✓' : 'Copy'}
              </Text>
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
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  sheet: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    flexGrow: 0,
  },

  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },

  title: {
    fontSize: theme.text.title.fontSize ?? 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  content: {
    flexGrow: 1, // ✅ not flex:1
    minHeight: 0, // ✅ REQUIRED for Android ScrollView
    backgroundColor: theme.colors.surface ?? '#F9FAFB',
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
  },

  contentContainer: {
    paddingBottom: theme.spacing.lg,
  },

  verticalContent: {
    paddingBottom: theme.spacing.md,
  },
  json: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
    }),
    fontSize: theme.text.caption.fontSize ?? 12,
    lineHeight: theme.text.title.fontSize ?? 18,
    color: theme.colors.textPrimary,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },

  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },

  pressed: {
    opacity: 0.6,
  },

  primaryAction: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },

  secondaryAction: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});
