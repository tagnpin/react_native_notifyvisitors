// // src/shared/components/Accordion/Accordion.tsx

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { theme } from '../../styles/theme';
import { FeatureActionProps } from '../../types/actions';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type AccordionProps<TPayload = Record<string, any>> =
  FeatureActionProps<TPayload> & {
    defaultExpanded?: boolean;
    children: React.ReactNode;
  };

const Accordion = <TPayload,>(props: AccordionProps<TPayload>) => {
  const {
    title = '',
    description = '',
    icon,
    defaultExpanded = false,
    children,
  } = props;

  const [expanded, setExpanded] = useState(defaultExpanded);
  const rotateAnim = useRef(
    new Animated.Value(defaultExpanded ? 1 : 0),
  ).current;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);

    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const renderIcon = () => {
    return typeof icon === 'function' ? icon() : icon;
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggle} style={styles.header}>
        {icon && <View style={styles.icon}>{renderIcon()}</View>}

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          {description && (
            <Text
              style={styles.subtitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          )}
        </View>

        <Animated.Text
          style={[styles.chevron, { transform: [{ rotate }] }]}
          numberOfLines={1}
        >
          ›
        </Animated.Text>
      </Pressable>

      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.card,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  icon: {
    marginRight: theme.spacing.md,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: theme.text.body.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    marginTop: 2,
    fontSize: theme.text.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  chevron: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    flexShrink: 0,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
});
