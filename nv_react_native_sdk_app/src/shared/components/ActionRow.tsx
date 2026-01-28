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

      {/* {params?.map(param => (
        <ParameterRenderer
          key={param.id}
          param={param}
          onChange={updated => onParamChange?.(updated)}
        />
      ))} */}

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

// // src/shared/components/ActionRow.tsx

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { theme } from '../styles/theme';
// // import { InputParameter } from '../types/InputTypes';
// import ParameterRenderer from '../../qa/inputs/ParameterRenderer';
// import ActionButton from './ActionButton';
// import { ParamSchema } from '../types/params';

// type Props = {
//   title?: string;
//   description?: string;
//   // params?: InputParameter[];
//   params?: ParamSchema[];
//   actionLabel?: string;
//   actionIcon?: React.ReactNode;
//   actionIconPosition?: 'left' | 'right';
//   actionVariant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'row';
//   actionBadgeCount?: number;
//   layout?: 'card' | 'inline';
//   onParamChange?: (param: Record<string, ParamSchema>) => void;
//   // onParamChange?: (param: InputParameter) => void;
//   onPress: () => void;
// };

// const ActionRow: React.FC<Props> = ({
//   title = '',
//   description,
//   params,
//   actionLabel = 'Execute',
//   actionIcon,
//   actionVariant = 'primary',
//   actionIconPosition = 'right',
//   actionBadgeCount = 0,
//   layout = 'card',
//   onParamChange,
//   onPress,
// }) => {
//   const isInline = layout === 'inline';
//   const hasContent =
//     Boolean(title) || Boolean(description) || (params?.length ?? 0) > 0;

//   // INLINE MODE → Only button, no wrapper UI
//   if (isInline) {
//     return (
//       <ActionButton
//         title={actionLabel}
//         icon={actionIcon}
//         iconPosition={actionIconPosition}
//         variant={actionVariant}
//         badgeCount={actionBadgeCount}
//         onPress={onPress}
//       />
//     );
//   }

//   // CARD MODE → Full container
//   return (
//     <View style={styles.cardContainer}>
//       {title && <Text style={styles.title}>{title}</Text>}
//       {description && <Text style={styles.description}>{description}</Text>}

//       {params?.map(param => (
//         <ParameterRenderer
//           key={param.id}
//           param={param}
//           onChange={updated => onParamChange?.(updated)}
//         />
//       ))}

//       <ActionButton
//         title={actionLabel}
//         icon={actionIcon}
//         iconPosition={actionIconPosition}
//         variant={actionVariant}
//         onPress={onPress}
//       />
//     </View>
//   );
// };

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
