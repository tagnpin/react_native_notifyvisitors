// src/shared/components/ActionRow.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { InputParameter } from '../types/InputTypes';
import ParameterRenderer from '../../qa/inputs/ParameterRenderer';
import ActionButton from './ActionButton';

type Props = {
  title?: string;
  description?: string;
  params?: InputParameter[];
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  actionIconPosition?: 'left' | 'right';
  actionVariant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'row';
  actionBadgeCount?: number;
  layout?: 'card' | 'inline';
  onParamChange?: (param: InputParameter) => void;
  onPress: () => void;
};

const ActionRow: React.FC<Props> = ({
  title = '',
  description,
  params,
  actionLabel = 'Execute',
  actionIcon,
  actionVariant = 'primary',
  actionIconPosition = 'right',
  actionBadgeCount = 0,
  layout = 'card',
  onParamChange,
  onPress,
}) => {
  const isInline = layout === 'inline';
  const hasContent =
    Boolean(title) || Boolean(description) || (params?.length ?? 0) > 0;

  // INLINE MODE → Only button, no wrapper UI
  if (isInline) {
    return (
      <ActionButton
        title={actionLabel}
        icon={actionIcon}
        iconPosition={actionIconPosition}
        variant={actionVariant}
        badgeCount={actionBadgeCount}
        onPress={onPress}
      />
    );
  }

  // CARD MODE → Full container
  return (
    <View style={styles.cardContainer}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}

      {params?.map(param => (
        <ParameterRenderer
          key={param.id}
          param={param}
          onChange={updated => onParamChange?.(updated)}
        />
      ))}

      <ActionButton
        title={actionLabel}
        icon={actionIcon}
        iconPosition={actionIconPosition}
        variant={actionVariant}
        onPress={onPress}
      />
    </View>
  );

  // return (
  //   <View style={hasContent ? styles.container : undefined}>
  //     {title && <Text style={styles.title}>{title}</Text>}
  //     {description && <Text style={styles.description}>{description}</Text>}

  //     {params?.map(param => (
  //       <ParameterRenderer
  //         key={param.id}
  //         param={param}
  //         onChange={updated => onParamChange?.(updated)}
  //       />
  //     ))}

  //     <ActionButton
  //       title={actionLabel}
  //       icon={actionIcon}
  //       iconPosition={actionIconPosition}
  //       variant={actionVariant}
  //       onPress={onPress}
  //     />
  //   </View>
  // );
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
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
});
