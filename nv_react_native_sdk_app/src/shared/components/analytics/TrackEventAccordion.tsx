// src/shared/components/TrackEventAccordion.tsx

import React, { useState, useMemo } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  View,
} from 'react-native';

import SDKManager from '../../../sdk/SDKManager';
import Accordion from '../Accordion/Accordion';
import ResultBottomSheet from '../ResultBottomSheet';
import { theme } from '../../styles/theme';

type Props = {
  accordionId?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
};

const TrackEventAccordion: React.FC<Props> = ({
  accordionId = '',
  title = '',
  subtitle,
  icon,
  defaultExpanded = false,
}) => {
  const [eventName, setEventName] = useState('');
  const [attributesJSON, setAttributesJSON] = useState('');
  const [ltv, setLTV] = useState('7');
  const [scope, setScope] = useState('2');

  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [resultTitle] = useState('SDK Result');

  const attributes = useMemo(() => {
    try {
      return JSON.parse(attributesJSON);
    } catch {
      return null;
    }
  }, [attributesJSON]);

  const executeTrackEvent = async () => {
    if (!eventName.trim()) {
      Alert.alert('Validation Error', 'Event name is required');
      return;
    }

    if (attributes && typeof attributes !== 'object') {
      Alert.alert('Validation Error', 'Attributes must be valid JSON');
      return;
    }

    if (isNaN(Number(scope))) {
      Alert.alert('Validation Error', 'Scope must be numeric');
      return;
    }

    try {
      const payload = {
        eventName,
        attributes: attributes ?? {},
        ltv,
        scope,
      };

      const res = await SDKManager.trackEvent(payload);
      setResult(res);
      setVisible(true);

      // reset form
      setEventName('');
      setAttributesJSON('');
      setLTV('');
      setScope('');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

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
        {/* Event Name */}
        <Field label="Event Name">
          <TextInput
            style={styles.input}
            placeholder="e.g. purchase_completed"
            placeholderTextColor={theme.colors.textSecondary}
            value={eventName}
            onChangeText={setEventName}
          />
        </Field>

        {/* Attributes */}
        <Field label="Attributes (JSON)">
          <TextInput
            style={[styles.input, styles.jsonInput]}
            multiline
            placeholder='{"key":"value"}'
            placeholderTextColor={theme.colors.textSecondary}
            value={attributesJSON}
            onChangeText={setAttributesJSON}
          />
        </Field>

        {/* LTV + Scope */}
        <View style={styles.row}>
          <Field label="LTV" style={styles.half}>
            <TextInput style={styles.input} value={ltv} onChangeText={setLTV} />
          </Field>

          <Field label="Scope" style={styles.half}>
            <TextInput
              style={styles.input}
              value={scope}
              onChangeText={setScope}
              keyboardType="numeric"
            />
          </Field>
        </View>

        {/* CTA */}
        <Pressable style={styles.button} onPress={executeTrackEvent}>
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

export default TrackEventAccordion;

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

const Field: React.FC<{
  label: string;
  children: React.ReactNode;
  style?: any;
}> = ({ label, children, style }) => (
  <View style={[{ marginBottom: theme.spacing.md }, style]}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);
