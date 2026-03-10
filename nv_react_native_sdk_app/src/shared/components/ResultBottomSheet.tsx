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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../styles/theme';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { normalizeJSON } from '../utils/normalizeUtils';

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
  const insets = useSafeAreaInsets();
  const copy = useCopyToClipboard();
  // const formatted = JSON.stringify(result, null, 2);
  const [copied, setCopied] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const normalizedResult = normalizeJSON(result);
  const getFormattedJSON = (value: any): string => {
    if (typeof value === 'string') return value;
    const seen = new WeakSet<object>();
    try {
      return JSON.stringify(
        value,
        (_key, currentValue) => {
          if (typeof currentValue === 'bigint') {
            return currentValue.toString();
          }
          if (typeof currentValue === 'function') {
            return '[Function]';
          }
          if (typeof currentValue === 'symbol') {
            return currentValue.toString();
          }
          if (currentValue && typeof currentValue === 'object') {
            if (seen.has(currentValue)) return '[Circular]';
            seen.add(currentValue);
          }
          return currentValue;
        },
        2,
      );
    } catch {
      try {
        return String(value);
      } catch {
        return '[Unserializable Result]';
      }
    }
  };
  const formattedJSON = getFormattedJSON(normalizedResult);

  const maxHeight = Math.min(height * 0.9, 720);
  const footerInset = Math.max(insets.bottom, theme.spacing.sm);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { height: maxHeight }]}>
          <View style={styles.handle} />

          <Text style={styles.title}>{title}</Text>

          {/* CONTENT */}
          <View style={styles.content}>
            <ScrollView
              style={styles.verticalScroll}
              showsVerticalScrollIndicator
              contentContainerStyle={[
                styles.verticalContent,
                { paddingBottom: footerHeight + footerInset },
              ]}
              bounces={false}
              nestedScrollEnabled
            >
              <ScrollView
                horizontal
                style={styles.horizontalScroll}
                showsHorizontalScrollIndicator
              >
                <Text selectable style={styles.json}>
                  {formattedJSON}
                </Text>
              </ScrollView>
            </ScrollView>
          </View>

          {/* ACTIONS */}
          <View
            style={[styles.actions, { paddingBottom: footerInset }]}
            onLayout={event => setFooterHeight(event.nativeEvent.layout.height)}
          >
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
    paddingTop: theme.spacing.sm,
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
    flex: 1,
    minHeight: 0,
    backgroundColor: theme.colors.surface ?? '#F9FAFB',
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  contentContainer: {
    paddingBottom: theme.spacing.lg,
  },

  verticalContent: {
    paddingBottom: theme.spacing.xl,
  },
  verticalScroll: {
    flex: 1,
  },
  horizontalScroll: {
    flexGrow: 0,
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
    alignItems: 'center',
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
