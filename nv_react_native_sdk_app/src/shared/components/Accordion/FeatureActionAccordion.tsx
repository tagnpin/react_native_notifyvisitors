// src/shared/components/Accordion/FeatureActionAccordion.tsx

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Accordion from './Accordion';
import { FeatureActionProps } from '../../types/actions';
import { normalizeParams } from '../../utils/normalizeParams';
import { parseParam } from '../../utils/parseParam';
import { validateNativeSafePayload } from '../../utils/validatePayload';
import { theme } from '../../styles/theme';

type Props = Omit<FeatureActionProps, 'key'> & {
  accordionId?: string;
  onExecuteActionButton?: (
    executor: (payload: any) => Promise<any> | void,
    payload: Record<string, any>,
  ) => Promise<any> | void;
};

export const FeatureActionAccordion: React.FC<Props> = props => {
  const {
    title,
    description,
    icon,
    actionLabel,
    inputParams,
    actionButtons,
    execute,
    accordionDefaultExpanded,
    onExecuteActionButton,
  } = props;

  const normalizedParams = useMemo(
    () => normalizeParams(inputParams),
    [inputParams],
  );

  const [values, setValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  /**
   * GROUP INPUTS
   */
  const groupedInputs = useMemo(() => {
    const groups: Record<string, any[]> = {};

    Object.entries(normalizedParams).forEach(([key, schema]) => {
      const group = schema.group ?? 'default';

      if (!groups[group]) groups[group] = [];

      groups[group].push({ key, schema });
    });

    return groups;
  }, [normalizedParams]);

  const setValue = (key: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * BUILD PAYLOAD
   */
  const buildPayload = () => {
    const payload: Record<string, any> = {};

    Object.entries(normalizedParams).forEach(([key, schema]) => {
      payload[key] = parseParam(values[key], schema);
    });

    validateNativeSafePayload(payload);

    return payload;
  };

  /**
   * EXECUTION HANDLER
   */
  const handleExecute = async (executor?: (payload: any) => any) => {
    try {
      const payload = buildPayload();

      setError(null);

      if (executor) {
        if (onExecuteActionButton) {
          await onExecuteActionButton(executor, payload);
        } else {
          await executor(payload);
        }
      } else {
        await execute?.(payload);
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  /**
   * INPUT RENDERER
   */
  const renderInput = (key: string, schema: any) => {
    const value = values[key];
    const label = schema.label ?? key;

    switch (schema.inputType) {
      case 'switch':
        return (
          <View style={styles.switchRow}>
            <Text style={styles.label}>{label}</Text>
            <Switch
              value={value ?? false}
              onValueChange={v => setValue(key, v)}
            />
          </View>
        );

      case 'textarea':
        return (
          <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
              style={[styles.input, styles.textarea]}
              multiline
              placeholder={schema.placeholder ?? ''}
              value={value ?? ''}
              onChangeText={v => setValue(key, v)}
            />
          </View>
        );

      default:
        return (
          <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
              style={styles.input}
              placeholder={schema.placeholder ?? ''}
              value={value ?? ''}
              onChangeText={v => setValue(key, v)}
              keyboardType={schema.type === 'number' ? 'numeric' : 'default'}
            />
          </View>
        );
    }
  };

  /**
   * GROUP RENDER
   */
  const renderGroup = (groupName: string, fields: any[]) => {
    const inline = fields.filter(f => f.schema.inline);
    const block = fields.filter(f => !f.schema.inline);

    const groupContent = (
      <>
        {groupName !== 'default' && (
          <>
            <Text style={styles.groupTitle}>{groupName}</Text>

            {fields[0]?.schema?.groupDescription && (
              <Text style={styles.groupDescription}>
                {fields[0].schema.groupDescription}
              </Text>
            )}
          </>
        )}

        {block.map(({ key, schema }) => (
          <View key={key}>{renderInput(key, schema)}</View>
        ))}

        {inline.length > 0 && (
          <View style={styles.inlineRow}>
            {inline.map(({ key, schema }) => (
              <View key={key} style={styles.inlineField}>
                {renderInput(key, schema)}
              </View>
            ))}
          </View>
        )}
      </>
    );

    if (groupName === 'default') {
      return (
        <View key={groupName} style={styles.group}>
          {groupContent}
        </View>
      );
    }

    return (
      <View key={groupName} style={styles.groupContainer}>
        {groupContent}
      </View>
    );
  };

  return (
    <>
      <Accordion
        key={'feature_actionAccordionId'}
        title={title}
        description={description}
        icon={icon}
        defaultExpanded={accordionDefaultExpanded}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View>
              {Object.entries(groupedInputs).map(([group, fields]) =>
                renderGroup(group, fields),
              )}

              {error && <Text style={styles.error}>{error}</Text>}

              {actionButtons && actionButtons.length > 0 ? (
                <View style={styles.buttonRow}>
                  {actionButtons.map((btn, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        btn.variant === 'secondary' && styles.buttonSecondary,
                        btn.variant === 'danger' && styles.buttonDanger,
                      ]}
                      onPress={() => handleExecute(btn.execute)}
                    >
                      <Text style={styles.buttonText}>{btn.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleExecute()}
                >
                  <Text style={styles.buttonText}>
                    {actionLabel ?? 'Execute'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Accordion>
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    marginBottom: theme.spacing.md,
  },

  groupTitle: {
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },

  groupDescription: {
    ...theme.text.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },

  field: {
    marginBottom: theme.spacing.sm,
  },

  label: {
    ...theme.text.caption,
    marginBottom: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },

  textarea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  inlineRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  inlineField: {
    flex: 1,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },

  buttonText: {
    color: theme.colors.primaryText,
    fontWeight: '500',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },

  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },

  buttonDanger: {
    backgroundColor: theme.colors.danger,
  },

  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },

  groupContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
