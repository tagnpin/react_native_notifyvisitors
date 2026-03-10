import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../styles/theme';

type Props = {
  label?: string;
  value?: any;
  onChange: (value: any) => void;
};

const JsonInput: React.FC<Props> = ({ label, value, onChange }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value !== undefined) {
      try {
        const formatted = JSON.stringify(value, null, 2);
        setText(formatted);
      } catch {
        setText('');
      }
    }
  }, [value]);

  const handleChange = (t: string) => {
    setText(t);

    try {
      const parsed = JSON.parse(t);
      setError(null);
      onChange(parsed);
    } catch {
      setError('Invalid JSON');
    }
  };

  const beautify = () => {
    try {
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);
      setText(formatted);
      setError(null);
      onChange(parsed);
    } catch {
      setError('Invalid JSON');
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={styles.input}
        multiline
        value={text}
        onChangeText={handleChange}
        placeholder='{"key":"value"}'
        placeholderTextColor={theme.colors.textSecondary}
      />

      <View style={styles.footer}>
        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.formatButton} onPress={beautify}>
          <Text style={styles.formatText}>Format</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default JsonInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    minHeight: 120,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.background,
    fontFamily: 'Courier',
  },

  footer: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  error: {
    color: theme.colors.error,
    fontSize: 12,
  },

  formatButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
  },

  formatText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
});
