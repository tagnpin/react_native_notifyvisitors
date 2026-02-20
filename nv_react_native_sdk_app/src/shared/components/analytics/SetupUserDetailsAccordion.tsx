// src/shared/components/SetupUserDetailsAccordion.tsx
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Alert,
} from 'react-native';

import Accordion from '../Accordion/Accordion';
import ResultBottomSheet from '../ResultBottomSheet';
import SDKManager from '../../../sdk/SDKManager';
import { theme } from '../../styles/theme';

type Props = {
  accordionId?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
};

const SetupUserDetailsAccordion: React.FC<Props> = ({
  accordionId = '',
  title = '',
  subtitle,
  icon,
  defaultExpanded = false,
}) => {
  const [userParamsJSON, setUserParamsJSON] = useState('');

  const [result, setResult] = useState<any>(null);
  const [resultTitle, setResultTitle] = useState('');
  const [visible, setVisible] = useState(false);

  /* ---------------- Helpers ---------------- */

  const parsedUserParams = useMemo(() => {
    try {
      return JSON.parse(userParamsJSON);
    } catch {
      return null;
    }
  }, [userParamsJSON]);

  /* ---------------- Action ---------------- */

  const executeSetupUserDetails = async () => {
    if (parsedUserParams && typeof parsedUserParams !== 'object') {
      Alert.alert('Validation Error', 'user parameters must be valid JSON');
      return;
    }

    try {
      const payload = parsedUserParams;
      // const res = await SDKManager.trackEvent(payload);
      const res = await SDKManager.setUserDetails(payload);
      setResult(res);
      setVisible(true);
      // reset form
      setUserParamsJSON('');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <Accordion
      key={accordionId}
      title={title}
      description={subtitle}
      icon={icon}
      defaultExpanded={defaultExpanded}
    >
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        nestedScrollEnabled
      >
        {/* Attributes */}
        <CustomField label="Attributes (JSON)">
          <TextInput
            style={[styles.input, styles.jsonInput]}
            multiline
            placeholder='{"name":"John","email":"john@example.com", "mobile": "9889XXXXXX"}'
            placeholderTextColor={theme.colors.textSecondary}
            value={userParamsJSON}
            onChangeText={setUserParamsJSON}
          />
        </CustomField>

        {/* CTA */}
        <Pressable style={styles.button} onPress={executeSetupUserDetails}>
          <Text style={styles.buttonText}>Track Event</Text>
        </Pressable>

        <ResultBottomSheet
          visible={visible}
          title={resultTitle}
          result={result}
          onClose={() => setVisible(false)}
        />
      </ScrollView>
    </Accordion>
  );
};

export default SetupUserDetailsAccordion;

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.background,
  },

  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },

  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  half: {
    flex: 1,
  },

  label: {
    marginBottom: theme.spacing.xs,
    fontSize: theme.text.caption.fontSize,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.text.body.fontSize,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surface,
  },

  jsonInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },

  button: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },

  buttonText: {
    color: theme.colors.primaryText,
    fontWeight: '600',
    fontSize: theme.text.body.fontSize,
  },
});

const CustomField: React.FC<{
  label: string;
  children: React.ReactNode;
  style?: any;
}> = ({ label, children, style }) => (
  <View style={[{ marginBottom: theme.spacing.md }, style]}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);
