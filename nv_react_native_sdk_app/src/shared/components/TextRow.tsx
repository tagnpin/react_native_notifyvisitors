import { StyleSheet, Text, View } from 'react-native';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

type TextRowProps = {
  label: string;
  value?: string;
  multiline?: boolean;
  copyable?: boolean;
  mask?: boolean;
};

const maskValue = (v: string) =>
  v.length > 16 ? `${v.slice(0, 8)}…${v.slice(-6)}` : v;

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

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1} onPress={onCopy}>
        {value}
      </Text>
    </View>
  );
};

export default TextRow;

const styles = StyleSheet.create({
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
    width: '40%',
  },

  infoValue: {
    fontSize: 13,
    color: '#111827',
    width: '60%',
    textAlign: 'right',
  },
});
