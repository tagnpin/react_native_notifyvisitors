// src/shared/components/ActionRow.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import ParameterRenderer from '../../qa/inputs/ParameterRenderer';
import ActionButton from './ActionButton';
import { FeatureActionProps } from '../types/actions';
import { hasParams } from '../types/params';
import { convertToRuntimeParam } from '../../shared/types/runtimeParam';

type ActionRowProps<TPayload = Record<string, any>> =
  FeatureActionProps<TPayload> & {
    actionVariant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'row';
  };

const ActionRow = <TPayload,>(props: ActionRowProps<TPayload>) => {
  const {
    title = '',
    description = '',
    execute,
    params,
    actionLabel = 'Execute',
    icon,
    iconPosition = 'right',
    actionVariant,
    actionBadgeCount = 0,
    layout = 'card',
    onParamChange,
  } = props;
  const isInline = layout === 'inline';
  const hasContent =
    Boolean(title) || Boolean(description) || hasParams(params);

  // INLINE MODE → Only button, no wrapper UI
  if (isInline) {
    return (
      <ActionButton
        title={actionLabel}
        icon={icon}
        iconPosition={iconPosition}
        variant={actionVariant}
        badgeCount={actionBadgeCount}
        onPress={() => {
          if (execute) {
            execute({} as TPayload);
          }
        }}
      />
    );
  }

  // CARD MODE → Full container
  return (
    <View style={styles.cardContainer}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {params &&
        Object.entries(params).map(([key, value]) => (
          <ParameterRenderer
            key={key}
            param={convertToRuntimeParam(key, value)}
            onChange={updated => {
              onParamChange?.({
                [updated.id]: {
                  type: updated.type,
                  default: updated.rawValue,
                  description: updated.description,
                },
              });
            }}
          />
        ))}

      <ActionButton
        title={actionLabel}
        icon={icon}
        iconPosition={iconPosition}
        variant={actionVariant}
        badgeCount={actionBadgeCount}
        onPress={() => {
          if (execute) {
            execute({} as TPayload);
          }
        }}
      />
    </View>
  );
};

export default ActionRow;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
  },
  title: {
    fontSize: theme.text.title.fontSize,
    fontWeight: theme.text.title.fontWeight,
    color: theme.colors.textPrimary,
  },
  description: {
    marginTop: theme.spacing.xs,
    fontSize: theme.text.caption.fontSize,
    color: theme.colors.textSecondary,
  },
});
