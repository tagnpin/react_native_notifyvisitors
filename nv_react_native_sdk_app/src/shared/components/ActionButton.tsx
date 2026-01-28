// src/shared/components/ActionButton.tsx

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';
import { ActionButtonProps } from '../types/actions';

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  subtitle,
  icon,
  iconPosition = 'left',
  badgeCount,
  variant = 'primary',
  layout = 'default',
  onPress,
}) => {
  const isRow = variant === 'row';
  const isIconOnly = layout === 'iconOnly';

  const showBadge = typeof badgeCount === 'number' && badgeCount > 0;
  const renderIcon = () => {
    return typeof icon === 'function' ? icon() : icon;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.base,
        styles[variant],
        isIconOnly && styles.iconOnlyBase,
        !onPress && { opacity: 0.5 },
      ]}
    >
      <View style={styles.content}>
        {/* ICON LEFT */}
        {icon && iconPosition === 'left' && (
          <View style={styles.iconLeft}>{renderIcon()}</View>
        )}
        {/* {icon && iconPosition === 'left' && (
          <View style={styles.iconLeft}>{icon()}</View>
        )} */}

        {/* TEXT (SKIPPED FOR ICON ONLY) */}
        {!isIconOnly && (
          <View style={styles.textContainer}>
            {/* {title && (
              <Text style={isRow ? styles.titleRow : styles.titlePrimary}>
                {title}
              </Text>
            )}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>} */}

            {title && (
              <Text
                style={[
                  isRow ? styles.titleRow : styles.titlePrimary,
                  styles.titleBase,
                ]}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={2}>
                {subtitle}
              </Text>
            )}
          </View>
        )}

        {/* BADGE */}
        {showBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}

        {/* ICON RIGHT */}
        {icon && iconPosition === 'right' && (
          <View style={styles.iconRight}>{renderIcon()}</View>
        )}
        {/* {icon && iconPosition === 'right' && (
          <View style={styles.iconRight}>{icon()}</View>
        )} */}

        {isRow && !isIconOnly && <Text style={styles.chevron}>›</Text>}
      </View>
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  // base: {
  //   paddingVertical: theme.spacing.sm,
  //   paddingHorizontal: theme.spacing.md,
  //   borderRadius: theme.radius.md,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginVertical: theme.spacing.sm,
  // },

  base: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginVertical: theme.spacing.sm,
  },

  /* ICON ONLY OVERRIDE */
  // iconOnlyBase: {
  //   padding: 0, // ✅ no padding
  //   margin: 0, // ✅ no margin
  //   borderWidth: 0, // ✅ no border
  //   backgroundColor: 'transparent',
  // },
  iconOnlyBase: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  // content: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  // textContainer: {
  //   flex: 1,
  // },

  textContainer: {
    flex: 1,
    flexShrink: 1,
  },

  /* Titles */
  titleBase: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: theme.text.body.fontSize,
  },

  // titlePrimary: {
  //   color: '#fff',
  //   fontWeight: '600',
  // },
  titlePrimary: {
    color: theme.colors.primaryText,
    fontWeight: '600',
  },

  // titleRow: {
  //   color: theme.colors.textPrimary,
  //   fontWeight: '500',
  // },

  titleRow: {
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },

  // subtitle: {
  //   fontSize: 13,
  //   marginTop: 2,
  //   color: theme.colors.textSecondary,
  // },

  subtitle: {
    fontSize: theme.text.caption.fontSize,
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
    flexWrap: 'wrap',
  },

  /* Variants */
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  danger: { backgroundColor: theme.colors.danger },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  // row: {
  //   backgroundColor: '#fff',
  //   paddingVertical: 14,
  //   paddingHorizontal: 16,
  //   borderWidth: 1,
  //   borderColor: theme.colors.border,
  // },

  row: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  /* Badge */
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: theme.colors.danger,
    borderRadius: 10,
    paddingHorizontal: 6,
    minWidth: 18,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },

  /* Icons */
  // iconLeft: { marginRight: theme.spacing.sm },
  iconLeft: {
    marginRight: theme.spacing.sm,
    flexShrink: 0,
  },

  // iconRight: { marginLeft: theme.spacing.sm },

  iconRight: {
    marginLeft: theme.spacing.sm,
    flexShrink: 0,
  },

  // chevron: {
  //   fontSize: 20,
  //   color: theme.colors.textSecondary,
  //   marginLeft: 8,
  // },
  chevron: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    flexShrink: 0,
  },
});
