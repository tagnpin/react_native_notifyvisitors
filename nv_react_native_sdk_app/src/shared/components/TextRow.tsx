// // src/shared/components/TextRow.tsx

import { StyleSheet, Text, View } from 'react-native';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { theme } from '../styles/theme';

const AUTO_MULTILINE_LENGTH = 35;

type TextRowProps = {
  label: string;
  value?: string;
  multiline?: boolean;
  copyable?: boolean;
  mask?: boolean;
};

const maskValue = (v: string) =>
  v.length > 16 ? `${v.slice(0, 8)}…${v.slice(-6)}` : v;

const shouldAutoMultiline = (value: unknown) => {
  if (typeof value !== 'string') return false;
  return value.length > AUTO_MULTILINE_LENGTH || value.includes('\n');
};

const TextRow: React.FC<TextRowProps> = ({
  label,
  value,
  multiline = false,
  copyable = false,
  mask = false,
}) => {
  if (!value) return null;

  const displayValue = mask ? maskValue(value) : value;
  const copy = useCopyToClipboard();

  const onCopy = () => copy(value);

  const isMultiline = multiline || shouldAutoMultiline(displayValue);
  // const shouldMultiline =
  //   displayValue.length > 35 || displayValue.includes('\n');

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text
        style={styles.infoValue}
        numberOfLines={isMultiline ? undefined : 1}
        onPress={copyable ? onCopy : undefined}
      >
        {displayValue}
      </Text>
    </View>
  );
};

export default TextRow;

const styles = StyleSheet.create({
  statusTitle: {
    fontSize: theme.text.caption.fontSize,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },

  infoLabel: {
    maxWidth: '45%',
    fontSize: theme.text.caption.fontSize,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
    flexShrink: 0,
  },

  infoValue: {
    flex: 1,
    fontSize: theme.text.body.fontSize,
    color: theme.colors.textPrimary,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
});
