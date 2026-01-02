// src/shared/components/ActionButton.tsx

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionButtonProps } from '../utils/types';
import { theme } from '../styles/theme';

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

  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, styles[variant], isIconOnly && styles.iconOnlyBase]}
    >
      <View style={styles.content}>
        {/* ICON LEFT */}
        {icon && iconPosition === 'left' && (
          <View style={styles.iconLeft}>{icon}</View>
        )}

        {/* TEXT (SKIPPED FOR ICON ONLY) */}
        {!isIconOnly && (
          <View style={styles.textContainer}>
            {title && (
              <Text style={isRow ? styles.titleRow : styles.titlePrimary}>
                {title}
              </Text>
            )}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
          <View style={styles.iconRight}>{icon}</View>
        )}

        {isRow && !isIconOnly && <Text style={styles.chevron}>›</Text>}
      </View>
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.sm,
  },

  /* ICON ONLY OVERRIDE */
  iconOnlyBase: {
    padding: 0, // ✅ no padding
    margin: 0, // ✅ no margin
    borderWidth: 0, // ✅ no border
    backgroundColor: 'transparent',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
  },

  /* Titles */
  titlePrimary: {
    color: '#fff',
    fontWeight: '600',
  },
  titleRow: {
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2,
    color: theme.colors.textSecondary,
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
  row: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
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
  iconLeft: { marginRight: theme.spacing.sm },
  iconRight: { marginLeft: theme.spacing.sm },

  chevron: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  },
});

// import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { ActionButtonProps } from '../utils/types';
// import { theme } from '../styles/theme';

// const ActionButton: React.FC<ActionButtonProps> = ({
//   title,
//   subtitle,
//   icon,
//   iconPosition = 'left',
//   badgeCount,
//   variant = 'primary',
//   onPress,
// }) => {
//   const isRow = variant === 'row';
//   const titleStyle = isRow ? styles.titleRow : styles.titlePrimary;

//   return (
//     <Pressable onPress={onPress} style={[styles.base, styles[variant]]}>
//       <View style={styles.content}>
//         {icon && iconPosition === 'left' && (
//           <View style={styles.iconLeft}>{icon}</View>
//         )}

//         <View style={styles.textContainer}>
//           {title && <Text style={titleStyle}>{title}</Text>}
//           {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
//         </View>

//         {badgeCount !== undefined && (
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{badgeCount}</Text>
//           </View>
//         )}

//         {icon && iconPosition === 'right' && (
//           <View style={styles.iconRight}>{icon}</View>
//         )}

//         {isRow && <Text style={styles.chevron}>›</Text>}
//       </View>
//     </Pressable>
//   );
// };

// export default ActionButton;

// const styles = StyleSheet.create({
//   base: {
//     paddingVertical: theme.spacing.sm,
//     paddingHorizontal: theme.spacing.md,
//     borderRadius: theme.radius.md,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: theme.spacing.sm,
//     marginBottom: theme.spacing.sm,
//   },

//   fullWidth: { width: '100%' },

//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },

//   titlePrimary: {
//     color: '#fff',
//     fontWeight: '600',
//   },

//   titleRow: {
//     color: theme.colors.textPrimary,
//     fontWeight: '500',
//   },

//   primary: { backgroundColor: theme.colors.primary },
//   secondary: { backgroundColor: theme.colors.secondary },
//   danger: { backgroundColor: theme.colors.danger },
//   ghost: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   row: {
//     backgroundColor: '#fff',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     color: theme.colors.textSecondary,
//   },

//   disabled: { opacity: 0.5 },

//   badge: {
//     position: 'absolute',
//     top: -6,
//     right: -6,
//     backgroundColor: theme.colors.danger,
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     minWidth: 18,
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   textContainer: {
//     flex: 1,
//   },

//   subtitle: {
//     fontSize: 13,
//     marginTop: 2,
//     color: theme.colors.textSecondary,
//   },

//   chevron: {
//     fontSize: 20,
//     color: theme.colors.textSecondary,
//     marginLeft: 8,
//   },

//   /* ICONS */
//   iconLeft: {
//     marginRight: theme.spacing.md,
//   },
//   iconRight: {
//     marginLeft: theme.spacing.md,
//   },
// });
